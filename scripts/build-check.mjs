import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const index = await readFile(resolve(root, 'index.html'), 'utf8');
const css = await readFile(resolve(root, 'styles.css'), 'utf8');
const js = await readFile(resolve(root, 'script.js'), 'utf8');

const required = [
  ['site title', '<title>Imagi Toner | Venda, Locação e Assistência de Impressoras</title>'],
  ['hero', 'Impressão <span>sem</span> complicação'],
  ['services anchor', 'id="servicos"'],
  ['solutions anchor', 'id="solucoes"'],
  ['contact anchor', 'id="contato"'],
  ['provisional contract', 'manual-code-led-01'],
  ['form', 'data-contact-form'],
  ['responsive rules', '@media (max-width: 700px)'],
];

const missing = required.filter(([, token]) => !index.includes(token) && !css.includes(token) && !js.includes(token));
if (missing.length) {
  console.error(`Build check failed: ${missing.map(([name]) => name).join(', ')}`);
  process.exit(1);
}

const localAssetRefs = [...index.matchAll(/(?:src|href)="(public\/assets\/[^\"]+)"/g)].map((match) => match[1]);
const missingAssets = [];
for (const asset of localAssetRefs) {
  try { await readFile(resolve(root, asset)); } catch { missingAssets.push(asset); }
}
if (missingAssets.length) {
  console.error(`Build check failed: missing assets ${missingAssets.join(', ')}`);
  process.exit(1);
}

if (!index.includes('aria-label') || !css.includes(':focus-visible') || !js.includes('checkValidity')) {
  console.error('Build check failed: accessibility or form validation hooks are missing.');
  proces.exit(1);
}

console.log('Build check passed: semantic sections, metadata, local assets, responsive CSS and form validation are present.');
