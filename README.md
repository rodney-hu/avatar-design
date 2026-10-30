# Elemental Design

A dark-first design system for web apps, landing pages and SaaS tools, themed on four elements: fire, water, earth and air. It is built for Tailwind CSS v4.

## What's included

- **Colors.** Fire is the primary color, a deep red (`#aa0000`). Water (blue), Earth (green) and Air (amber) are accents. Cyan is the "Elemental State" highlight (its code key is still `avatar`).
- **Themes.** Dark by default. Add the `.light` class for a warm parchment theme.
- **Type.** Cinzel for the hero title. Inter for all other headings and body text. JetBrains Mono for code. The Elemental Brush font for standalone headings.
- **Glows.** Colored halos instead of plain shadows, in four sizes, with one setting (`--glow-strength`) to make them stronger or softer.
- **Materials.** Elevation levels, glass panels, gradient borders, film grain, an orbiting edge light and a cursor spotlight.
- **Motion.** Scroll reveals, staggered entrances, page transitions and small touches like button sheens and click bursts.
- **24 React components** across six groups. Every one takes its color the same way: `element="water"`, or a status name like `element="success"` or `element="danger"`.

## Use it in your project

Add two imports to your main stylesheet:

```css
@import "tailwindcss";
@import "./path/to/elemental-design/src/index.css";
```

Vite, webpack and Next.js load the brush font automatically. With the Tailwind CLI, copy `src/fonts/` next to your compiled CSS as `fonts/`.

### Motion (optional)

The scroll and pointer effects need a small script. Load it in `<head>`:

```html
<script src="./path/to/elemental-design/design-system/assets/motion.js"></script>
```

Turn effects on per element with data attributes such as `data-reveal`, `data-stagger`, `data-tilt` and `data-spotlight`. Without the script, nothing is hidden.

## Run the site

The site shows every part of the system. It is a Vite + React app.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # builds into dist/
npm run preview    # serves dist/ at http://localhost:4173
npm run build:ds   # rebuilds the bundle the component preview cards use
npm run check:a11y # accessibility scan of every page (run after build)
npm run sync:brand # copy web-ready brand files from ../../05 Brand assets into site/src/brand (commit the result)
```

`npm run build` first checks that the two copies of the tokens (`src/` and `design-system/tokens/`) match and that every component prop is documented, and stops if not. GitHub Actions runs the build and the accessibility scan on every push and pull request.

| Page | What it shows |
| --- | --- |
| `/` | Hero, colors, typography |
| `/components` | Buttons, cards, forms |
| `/data` | Stats, tables, alerts |
| `/landing` | Pricing, testimonials, install guide |
| `/brand` | Rodney Hu brand system: logo, rules, profile set, usage. Files come from `05 Brand assets/` via `npm run sync:brand` |

The site deploys to Vercel with `npm run build`.

## Project layout

| Path | What it is |
| --- | --- |
| `src/` | The Tailwind v4 stylesheets. `index.css` is the one file to import. |
| `src/fonts/` | The brush font and its licence. |
| `site/` | The React site. |
| `design-system/` | React components, plain-CSS tokens, guideline pages and `motion.js`. |
| `docs/SKILL.md` | Instructions for AI agents designing with the system. |

## Components

Each component lives in `design-system/components/` with a props file (`.d.ts`) and usage notes (`.prompt.md`).

| Group | Components |
| --- | --- |
| Core | Button, Badge, Card |
| Forms | Field, Input, Select, Textarea, Checkbox, ToggleSwitch |
| Feedback | Alert, Toast, Modal, Tooltip |
| Navigation | Navbar, NavLink, Menu, Sidebar, SidebarItem, Breadcrumb |
| Marketing | Hero, PricingCard, TestimonialCard |
| Data | DataTable, StatCard |

## Change the colors

All colors live in `src/elemental-preset.css`. Each element has two matching sets of values:

1. **Hex values** in the `@theme` block, such as `--color-fire-500`. These power Tailwind classes like `bg-fire-500`.
2. **RGB values** in the `:root` block, such as `--fire-500-rgb`. These power the glows.

When you change a color, update both sets.

## Good to know

- **Accessibility.** Every page passes an automated WCAG 2.1 AA check in both themes, and CI fails if one stops passing. Fire text uses a lighter red (fire-300) on dark, like the other elements, because the deep brand red is too dark to read there. Keyboard focus is always visible, the modal keeps focus inside it, and the menu works fully from the keyboard.
- **Reduced motion.** When someone asks their device for less motion, content appears at once and nothing moves with scroll or the pointer.
- **Font licence.** The brush font (released as Avatar Airbender by FontGet.com) is free for personal and commercial use. If you share the font file, credit FontGet.com and keep its licence file with it.
