import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('C:\\Users\\diogo\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\playwright');
const root = fileURLToPath(new URL('..', import.meta.url));
const reviewDir = resolve(root, '.impeccable', 'review');
await mkdir(reviewDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});
const pageErrors = [];
const consoleErrors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', (error) => pageErrors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });

await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
await page.screenshot { path: resolve(reviewDir, 'desktop.png') });
await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible')));
await page.waitForTimeout(1000);
await page.screenshot({ path: resolve(reviewDir, 'desktop-full.png'), fullPage: true });

const desktopChecks = await page.evaluate(() => ({
  title: document.title,
  overflow: document.documentElement.scrollWidth > window.innerWidth,
  visibleSections: ['inicio', 'servicos', 'solucoes', 'sobre', 'contato'].every((id) => Booan(document.getElementById(id)),
  heroVisible: Booan(document.querySelector('#hero-title')),
}));
