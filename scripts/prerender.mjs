import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const DIST      = join(ROOT, 'dist');
const PORT      = 4173;
const BASE_URL  = `http://localhost:${PORT}`;

async function getRoutes() {
  const index = JSON.parse(await readFile(join(ROOT, 'src/data/patterns/index.json'), 'utf-8'));
  const categories = [...new Set(index.patterns.map(p => p.category))];
  const routes = ['/', '/catalog', '/patterns', '/about', ...categories.map(c => `/patterns/${c}`)];

  for (const p of index.patterns) {
    if (p.status === 'available') routes.push(`/patterns/${p.category}/${p.slug}`);
  }
  return routes;
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let resolved = false;
    proc.stdout.on('data', (data) => {
      if (!resolved && data.toString().includes('Local:')) {
        resolved = true;
        resolve(proc);
      }
    });
    proc.stderr.on('data', (data) => process.stderr.write(data));
    proc.on('error', reject);
    proc.on('exit', (code) => { if (!resolved) reject(new Error(`vite preview exited with code ${code}`)); });
  });
}

async function main() {
  const routes = await getRoutes();
  console.log(`[prerender] ${routes.length} routes to render`);

  const server = await startPreviewServer();
  console.log('[prerender] preview server ready');

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('[prerender] browser launched');

  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(15000);

  let failures = 0;
  try {
    for (const route of routes) {
      try {
        await page.goto(BASE_URL + route, { waitUntil: 'load' });
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
  } finally {
    await browser.close();
    server.kill();
  }

  if (failures > 0) {
    throw new Error(`${failures}/${routes.length} routes failed to prerender`);
  }
}

const watchdog = setTimeout(() => {
  console.error('[prerender] watchdog: exceeded 3 minutes, aborting');
  process.exit(1);
}, 3 * 60 * 1000);
watchdog.unref();

main()
  .then(() => clearTimeout(watchdog))
  .catch((err) => {
    console.error('[prerender]', err);
    process.exit(1);
  });
