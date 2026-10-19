/* Fails when the two token sources drift: every custom property defined in
   src/*.css (the Tailwind build) must have the same value under the same
   selector in design-system/tokens/*.css (the plain-CSS export), and the
   :root and .light sets must match in both directions.
   Also fails on a literal color (hex, rgb(), rgba()) used directly in a
   property in src/*.css: colors are defined once as tokens and used through
   var(). CSS masks are exempt, since a mask reads only alpha.
   Runs before every build. */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const cssIn = (dir) => readdirSync(join(root, dir)).filter((f) => f.endsWith('.css')).map((f) => join(root, dir, f));

function props(files) {
  const out = new Map();
  for (const file of files) {
    const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const [, sel, body] of css.matchAll(/([^{};]+)\{([^{}]*)\}/g)) {
      const selectors = sel.replace(/@theme( static| inline)*/, '').trim().replace(/\s+/g, ' ').split(',').map((s) => s.trim() || ':root');
      for (const decl of body.split(';')) {
        const i = decl.indexOf(':');
        const name = decl.slice(0, i).trim();
        if (i < 0 || !name.startsWith('--')) continue;
        const value = decl.slice(i + 1).replace(/\s+/g, ' ').replace(/\s*([,/])\s*/g, '$1').trim();
        for (const s of selectors) out.set(`${s} { ${name} }`, value);
      }
    }
  }
  return out;
}

const src = props(cssIn('src'));
const ds = props(cssIn('design-system/tokens'));
const problems = [];
for (const [key, value] of src) {
  if (ds.has(key) && ds.get(key) !== value) problems.push(`${key}\n    src/:            ${value}\n    design-system/:  ${ds.get(key)}`);
}
const themed = (k) => k.startsWith(':root {') || k.startsWith('.light {');
for (const k of src.keys()) if (themed(k) && !ds.has(k)) problems.push(`${k} is in src/ but missing from design-system/tokens/`);
for (const k of ds.keys()) if (themed(k) && !src.has(k)) problems.push(`${k} is in design-system/tokens/ but missing from src/`);

// Literal colors outside token definitions.
for (const file of cssIn('src')) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [, prop, value] of css.matchAll(/(?<=[{;\n])\s*([a-zA-Z-]+)\s*:\s*([^;{}]+)/g)) {
    if (prop.startsWith('--') || prop.includes('mask')) continue;
    for (const [c] of value.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\((?!\s*var\()[^)]*\)/g)) {
      problems.push(`${file.slice(root.length)}: \`${prop}: ${c}\` is a literal color; define a token and use var()`);
    }
  }
}

if (problems.length) {
  console.error(`Token check: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Tokens in sync (${[...src.keys()].filter((k) => ds.has(k)).length} shared properties), no literal colors.`);
