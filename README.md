# Elemental Design System

A dark-first design system for web apps, landing pages and SaaS tools, themed on the four elements from *Avatar: The Last Airbender*. It is built for Tailwind CSS v4.

## What's included

- **Colors.** Fire is the primary color, a deep red (`#aa0000`). Water (blue), Earth (green) and Air (amber) are accents. Cyan is the "Avatar State" highlight.
- **Themes.** Dark by default. Add the `.light` class for a warm parchment theme.
- **Type.** Cinzel for the hero title. Inter for all other headings and body text. JetBrains Mono for code. The Avatar Airbender brush font for standalone headings.
- **Glows.** Colored halos instead of plain shadows, in four sizes, with one setting (`--glow-strength`) to make them stronger or softer.
- **Materials.** Elevation levels, glass panels, gradient borders, film grain, an orbiting edge light and a cursor spotlight.
- **Motion.** Scroll reveals, staggered entrances, page transitions and small touches like button sheens and click bursts.
- **21 React components** across six groups.

## Use it in your project

Add two imports to your main stylesheet:

```css
@import "tailwindcss";
@import "./path/to/avatar-design/src/index.css";
```

Vite, webpack and Next.js load the brush font automatically. With the Tailwind CLI, copy `src/fonts/` next to your compiled CSS as `fonts/`.

### Motion (optional)

The scroll and pointer effects need a small script. Load it in `<head>`:

```html
<script src="./path/to/avatar-design/showcase/motion.js"></script>
```

Turn effects on per element with data attributes such as `data-reveal`, `data-stagger`, `data-tilt` and `data-spotlight`. Without the script, nothing is hidden.

## Run the site

The site shows every part of the system. It is a Vite + React app.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # builds into dist/
npm run preview    # serves dist/ at http://localhost:4173
```

| Page | What it shows |
| --- | --- |
| `/` | Hero, colors, typography |
| `/components` | Buttons, cards, forms |
| `/data` | Stats, tables, alerts |
| `/landing` | Pricing, testimonials, install guide |
| `/classic/` | A plain HTML version of the showcase |

The site deploys to Vercel with `npm run build`.

## Project layout

| Path | What it is |
| --- | --- |
| `src/` | The Tailwind v4 stylesheets. `index.css` is the one file to import. |
| `src/fonts/` | The Avatar Airbender font and its licence. |
| `site/` | The React site. |
| `showcase/` | The plain HTML showcase and `motion.js`. |
| `design-system/` | React components, plain-CSS tokens and guideline pages. |
| `docs/SKILL.md` | Instructions for AI agents designing with the system. |

## Components

Each component lives in `design-system/components/` with a props file (`.d.ts`) and usage notes (`.prompt.md`).

| Group | Components |
| --- | --- |
| Core | Button, Badge, Card |
| Forms | Input, Select, Textarea, Checkbox, ToggleSwitch |
| Feedback | Alert, Modal, Tooltip |
| Navigation | Navbar, NavLink, Sidebar, SidebarItem, Breadcrumb |
| Marketing | Hero, PricingCard, TestimonialCard |
| Data | DataTable, StatCard |

## Change the colors

All colors live in `src/elemental-preset.css`. Each element has two matching sets of values:

1. **Hex values** in the `@theme` block, such as `--color-fire-500`. These power Tailwind classes like `bg-fire-500`.
2. **RGB values** in the `:root` block, such as `--fire-500-rgb`. These power the glows.

When you change a color, update both sets.

## Good to know

- **Fire text contrast.** Fire-colored text is hard to read on the dark background. Use it for large headings, badges and accents, not body text. The light theme uses a darker red that reads well.
- **Reduced motion.** The system does not turn off animation for people who ask their device to reduce motion.
- **Font licence.** The Avatar Airbender font is free for personal and commercial use. If you share the font file, credit FontGet.com and keep its licence file with it.
