/* Accessibility gate: serves the built site (run `npm run build` first) and
   runs axe-core (WCAG 2.1 A/AA + best practices) on every page in both
   themes, plus the open modal, a toast, an open menu and the phone-width
   navbar menu. Exits 1 on any
   violation. Run with `npm run check:a11y`; CI runs it on every push. */
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const PORT = Number(process.env.A11Y_PORT || 4179);
const BASE = `http://localhost:${PORT}`;
const ROUTES = ['/', '/components', '/data', '/landing', '/brand'];

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
const stop = () => server.kill();

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(BASE)).ok) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`vite preview did not start on ${BASE}`);
}

const failures = [];
let scans = 0;

async function scan(page, label) {
  // Scroll through so scroll-revealed content is visible when axe looks.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  await page.addScriptTag({ content: AXE });
  const violations = await page.evaluate(async () => (await window.axe.run(document, {
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  })).violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) })));
  scans++;
  console.log(`${violations.length ? '✗' : '✓'} ${label}${violations.length ? '  ' + violations.map((v) => v.id).join(', ') : ''}`);
  for (const v of violations) failures.push(`${label}: ${v.id} [${v.impact}] ${v.help}\n      ${v.nodes.join('\n      ')}`);
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const theme of ['dark', 'light']) {
    const open = async (route) => {
      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      if (theme === 'light') await page.evaluate(() => document.body.classList.add('light'));
    };
    for (const route of ROUTES) { await open(route); await scan(page, `${theme} ${route}`); }
    await open('/');
    await page.getByRole('button', { name: 'Unleash Toast' }).click();
    await page.getByRole('button', { name: 'Open Modal' }).click();
    await page.waitForTimeout(600);
    await scan(page, `${theme} modal + toast`);
    await open('/components');
    await page.getByRole('button', { name: /Scroll actions/ }).click();
    await page.waitForTimeout(300);
    await scan(page, `${theme} open menu`);
    // Phone width: the Navbar folds into its menu panel.
    await page.setViewportSize({ width: 390, height: 844 });
    await open('/');
    await page.locator('.navbar-toggle').click();
    await page.waitForTimeout(300);
    await scan(page, `${theme} 390px nav menu`);
    await page.setViewportSize({ width: 1280, height: 900 });
  }
  await browser.close();
} catch (err) {
  stop();
  console.error(err);
  process.exit(1);
}
stop();

if (failures.length) {
  console.error(`\nAccessibility: ${failures.length} violation(s) in ${scans} scans\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nAccessibility: ${scans} scans, 0 violations.`);
