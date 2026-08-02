import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const DIST      = join(ROOT, 'dist');
const PORT      = 4173;
const BASE_URL  = `http://localhost:${PORT}`;

async function getRoutes() {
  const index = JSON.parse(await readFile(join(ROOT, 'src/data/patterns/index.json'), 'utf-8'));
  const categories = [...new Set(index.patterns.map(p => p.category))];
  const routes = ['/', '/catalog', '/patterns', '/roadmap', '/about', ...categories.map(c => `/patterns/${c}`)];

  for (const p of index.patterns) {
    if (p.status === 'available') routes.push(`/patterns/${p.category}/${p.slug}`);
  }
  return routes;
}

function waitForServer(timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const req = http.get(BASE_URL, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() > deadline) {
          reject(new Error(`timed out waiting for preview server on ${BASE_URL}`));
        } else {
          setTimeout(tryOnce, 300);
        }
      });
    };
    tryOnce();
  });
}

async function startPreviewServer() {
  const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  proc.stdout.on('data', (data) => process.stdout.write(data));
  proc.stderr.on('data', (data) => process.stderr.write(data));

  let exited = false;
  let exitError = null;
  proc.on('exit', (code) => {
    exited = true;
    exitError = new Error(`vite preview exited with code ${code}`);
  });

  try {
    await waitForServer(30000);
  } catch (err) {
    if (exited) throw exitError;
    proc.kill();
    throw err;
  }
  if (exited) throw exitError;
  return proc;
}

async function main() {
  const routes = await getRoutes();
  console.log(`[prerender] ${routes.length} routes to render`);

  const server = await startPreviewServer();
  console.log('[prerender] preview server ready');

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  console.log('[prerender] browser launched');

  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(15000);
  await page.addInitScript(() => {
    window.__navigated = false;
    window.addEventListener('app:navigated', () => { window.__navigated = true; });
  });

  let failures = 0;
  for (const route of routes) {
    try {
      await page.goto(BASE_URL + route, { waitUntil: 'load' });
      await page.waitForFunction(() => window.__navigated === true);
      // main.js injects global chrome (a11y widget, scroll-to-top button) at
      // runtime via insertAdjacentHTML. If baked into the static snapshot,
      // the real page load re-inserts a second copy on top with no listeners
      // attached (getElementById binds to the first/dead one), so the widget
      // becomes visually present but permanently unresponsive. Strip it here
      // so the client-side insertion stays the single source of truth.
      await page.evaluate(() => {
        document.getElementById('a11y-dock')?.remove();
        document.getElementById('a11y-panel')?.remove();
        document.getElementById('scroll-top-btn')?.remove();
      });
      const html   = await page.content();
      const outDir = route === '/' ? DIST : join(DIST, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, 'index.html'), html, 'utf-8');
      console.log(`prerendered ${route}`);
    } catch (err) {
      failures++;
      console.error(`[prerender] failed to render ${route}: ${err.message}`);
    }
  }

  console.log(`[prerender] done, ${failures} failure(s)`);
  server.kill();
  // Headless Chromium can hang on close() inside CI containers; the process
  // tree gets torn down by the runner anyway, so exit instead of waiting.
  process.exit(failures > 0 ? 1 : 0);
}

const watchdog = setTimeout(() => {
  console.error('[prerender] watchdog: exceeded 3 minutes, aborting');
  process.exit(1);
}, 3 * 60 * 1000);
watchdog.unref();

main().catch((err) => {
  console.error('[prerender]', err);
  process.exit(1);
});
