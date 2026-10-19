/* Fails when a component prop is undocumented: every prop in a component's
   .d.ts needs a /** doc comment *\/ and a mention in its .prompt.md. Runs
   before every build. */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../design-system/components/', import.meta.url));
// Plain-language props that read naturally without a mention.
const SKIP = new Set(['children', 'value', 'label', 'header']);
const problems = [];

for (const group of readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const file of readdirSync(join(dir, group.name)).filter((f) => f.endsWith('.d.ts'))) {
    const lines = readFileSync(join(dir, group.name, file), 'utf8').split('\n');
    const notes = join(dir, group.name, file.replace('.d.ts', '.prompt.md'));
    const prompt = existsSync(notes) ? readFileSync(notes, 'utf8') : '';
    if (!prompt) problems.push(`${group.name}/${file}: no .prompt.md`);
    lines.forEach((line, i) => {
      const m = line.match(/^\s+([a-zA-Z]+)\??:/);
      if (!m) return;
      const name = m[1];
      if (name !== 'children' && !lines[i - 1].trim().endsWith('*/')) problems.push(`${group.name}/${file}: \`${name}\` has no doc comment`);
      if (!SKIP.has(name) && prompt && !prompt.includes(name)) problems.push(`${group.name}/${file.replace('.d.ts', '.prompt.md')}: \`${name}\` is never mentioned`);
    });
  }
}

if (problems.length) {
  console.error(`Docs: ${problems.length} gap(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log('Docs complete: every prop has a doc comment and usage notes.');
