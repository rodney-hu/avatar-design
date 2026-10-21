// Builds the package the design-sync converter reads (cfg.buildCmd).
// The repo ships no dist/: components are plain .jsx with sibling .d.ts files
// in design-system/components/<group>/, and the CSS is Tailwind v4 source.
// This writes .design-sync/.cache/pkg/ with:
//   index.js / index.d.ts  barrels re-exporting every component (+ elements.js)
//   elemental.css          src/index.css compiled by Tailwind exactly as the site
//                          does it (site/src/styles.css, which @source's the
//                          components so on-demand utilities like text-glow-* emit)
//   fonts/                 src/fonts/, next to the CSS so its ./fonts/ url resolves
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('..', import.meta.url));
const out = join(repo, '.design-sync/.cache/pkg');
const comps = join(repo, 'design-system/components');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = readdirSync(comps, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) => readdirSync(join(comps, d.name))
    .filter((f) => f.endsWith('.jsx'))
    .map((f) => join(comps, d.name, f.replace(/\.jsx$/, ''))))
  .sort();
const rel = (p) => './' + relative(out, p).split('\\').join('/');

writeFileSync(join(out, 'index.js'), files.map((p) => `export * from ${JSON.stringify(rel(p) + '.jsx')};`).join('\n') + '\n');
writeFileSync(join(out, 'index.d.ts'), files.map((p) => `export * from ${JSON.stringify(rel(p))};`).join('\n') + '\n');
writeFileSync(join(out, 'package.json'), JSON.stringify({
  name: '@elemental-ui/design-system',
  version: JSON.parse(execFileSync('node', ['-p', 'JSON.stringify(require("./package.json").version)'], { cwd: repo, encoding: 'utf8' })),
  private: true,
  module: 'index.js',
  types: 'index.d.ts',
}, null, 2));

execFileSync('npx', ['@tailwindcss/cli', '-i', 'site/src/styles.css', '-o', join(out, 'elemental.css')], { cwd: repo, stdio: 'inherit' });
cpSync(join(repo, 'src/fonts'), join(out, 'fonts'), { recursive: true });

// docs/<Name>.md: each component's own <Name>.prompt.md (cfg.docsDir binds by
// basename, which .prompt.md doesn't match), with its folder as the category
// so the cards keep the repo's Core / Forms / Navigation ... grouping.
mkdirSync(join(out, 'docs'));
for (const p of files) {
  const group = basename(dirname(p));
  const body = readFileSync(p + '.prompt.md', 'utf8');
  // Named for each exported component, not the file (Toast.jsx exports ToastStack).
  const names = [...readFileSync(p + '.jsx', 'utf8').matchAll(/^export function ([A-Z]\w*)/gm)].map((m) => m[1]);
  for (const name of names) {
    writeFileSync(join(out, 'docs', name + '.md'), `---\ncategory: ${group[0].toUpperCase() + group.slice(1)}\n---\n${body}`);
  }
}
console.log(`pkg: ${files.length} components -> ${relative(repo, out)}`);
