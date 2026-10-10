# Source repository

repo: rodney-hu/avatar-design
branch: main
path: src, showcase

## Last sync

date: 2026-09-15T11:19:10Z

### Updated in this project

- Ported the Tailwind v4 `@theme` tokens to plain CSS custom properties in `tokens/`.
- Rebuilt all 18 component families from `elemental-components.css` as 22 React components.
- Recreated the showcase site as an interactive UI kit.

## Screen map

| Project screen / file | Repo source |
| --- | --- |
| `tokens/colors.css`, `surfaces.css`, `typography.css`, `radii.css`, `shadows.css` | `src/elemental-preset.css`, `src/index.css` |
| `tokens/animations.css` | `src/elemental-animations.css` |
| `tokens/effects.css` | `src/elemental-utilities.css` |
| `tokens/components.css` | `src/elemental-components.css`, `showcase/main.css` |
| `components/**` | `src/elemental-components.css` |
| `ui_kits/showcase/*` | `showcase/index.html`, `showcase/main.js` |
| `readme.md` | `README.md` |
