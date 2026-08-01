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
  const server = await startPreviewServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    for (const route of routes) {
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle' });
      const html   = await page.content();
      const outDir = route === '/' ? DIST : join(DIST, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, 'index.html'), html, 'utf-8');
      console.log(`prerendered ${route}`);
    }
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error('[prerender]', err);
  process.exit(1);
});
