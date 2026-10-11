import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const at = (p) => fileURLToPath(new URL(p, import.meta.url));

// The site lives in site/ but imports the design system's own components
// (design-system/components) and the one stylesheet source (src/index.css),
// so there is a single copy of each.
export default defineConfig({
  root: at('./site'),
  publicDir: false,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@ds': at('./design-system/components') } },
  server: { fs: { allow: [at('.')] } },
  build: { outDir: at('./dist'), emptyOutDir: true },
});
