# Elemental Design System

A premium, dark-first design system inspired by the Avatar: The Last Airbender universe. Built for modern web applications, landing pages, and SaaS tools using Tailwind CSS v4.

> **Cardinal Red variant** — the Fire Nation primary palette is a deep cardinal red anchored at `#aa0000`. See [Theming](#theming) for how to retune it.

## Features

- **Fire Nation primary**: deep cardinal red for bold actions, CTAs and active states.
- **Water, Earth and Air accents**: oceanic blue, emerald and amber ramps for secondary actions, success and notice states.
- **Avatar State**: a cyan accent and a multi-element animated glow.
- **Dark-first surfaces**: a layered depth system (`#0a0a0a` to `#2f2f2f`) with a warm parchment light theme (`.light`).
- **Typography**: Inter 700–800 with negative tracking for headlines, Cinzel 800 for the Display XL hero (72px), Inter for body copy, JetBrains Mono for code, and the Takashi Japan brush face for standalone one- or two-word element accents only.
- **Glow system**: core halo + ambient bloom per element, four sizes, a global `--glow-strength`, scoped by `.element-*`, soft drop shadows on light.
- **Materials**: elevation 0–4, three glass tiers, lit gradient borders, film grain, an orbiting edge light and a cursor spotlight.
- **Motion**: one duration and easing scale, element motion personalities, choreography, exit animations, view-transition page changes and micro-interactions (button sheen, click bursts, focus bloom, checkbox draw-in, stat count-up).
- **Tailwind CSS v4 CSS-first preset**: `@theme` tokens and `@utility` glows — import one CSS file to get everything.

## Installation & Usage

### 1. In any Tailwind v4 project

```css
@import "tailwindcss";
@import "./path/to/elemental-ds/src/index.css";
```

`src/index.css` loads the brush face from `src/fonts/` with a relative URL. Bundlers that rebase CSS URLs (Vite, webpack, Next.js) pick this up automatically; the Tailwind CLI does not, so copy `src/fonts/` next to your compiled CSS as `fonts/` (the showcase build does this).

### 2. Motion runtime (optional)

Scroll reveal, stagger, halo bloom, parallax, tilt, cursor spotlight, edge-light orbit, click bursts and page transitions are driven by a small vanilla script. Load it in `<head>` so reveals arm before first paint:

```html
<script src="./path/to/elemental-ds/showcase/motion.js"></script>
```

Every effect is opt-in by data attribute (`data-reveal`, `data-stagger`, `data-choreo`, `data-halo-bloom`, `data-parallax`, `data-tilt`, `data-spotlight`, `data-spotlight-group`, `data-vt`) or class (`.edge-light`, `.btn-<element>` for bursts). Without the script nothing is hidden. Wrap same-document state changes in `ElementalMotion.transition(fn)` to get a view-transition crossfade.

### 3. Live showcase

```bash
git clone https://github.com/rodney-hu/avatar-design.git
cd avatar-design
npm install
npm run build
npx serve showcase
```

Then open `http://localhost:3000`.

## File Structure

- `src/index.css`: main bundle — imports, `@font-face`, the `.light` theme and base styles.
- `src/elemental-preset.css`: tokens (`@theme static`) plus non-theme tokens (RGB channels, text and surface tokens, spacing, weights).
- `src/elemental-animations.css`: keyframes and `.animate-*` classes, including exit variants.
- `src/elemental-utilities.css`: glow and text-glow utilities, gradients, backdrop halos, `.element-*` scopes.
- `src/elemental-components.css`: component classes (buttons, cards, forms, navigation, data, alerts, modal, tooltip, hero, pricing, testimonials).
- `src/elemental-materials.css`: elevation, glass, gradient border, grain, edge light, spotlight and micro-interactions.
- `src/elemental-motion.css`: motion tokens, choreography, exits, toasts, popovers, page transitions, scroll/pointer effects and element personalities. **Must load last.**
- `src/fonts/`: Takashi Japan brush face (see licence note below).
- `showcase/`: interactive showcase (`index.html`, `main.js`, `main.css`, `motion.js`).
- `design-system/`: reference export from the design project — plain-CSS tokens, reference React components with props (`.d.ts`) and usage rules (`.prompt.md`), guideline specimens (`guidelines/*.html`) and the showcase UI kit. It is the source of truth for values; it is not part of the build.
- `docs/SKILL.md`: agent skill for designing with the system.

## Components

22 components in six groups. Each has a reference implementation and API in `design-system/components/`; in this repo they are class recipes.

| Group | Components |
| --- | --- |
| Core | Button, Badge, Card |
| Forms | Input, Select, Textarea, Checkbox, ToggleSwitch |
| Feedback | Alert, Modal, Tooltip |
| Navigation | Navbar, NavLink, Sidebar, SidebarItem, Breadcrumb |
| Marketing | Hero, PricingCard, TestimonialCard |
| Data | DataTable, StatCard |

Overlays use `data-state="open|closed"`: keep the element mounted, flip the state, and remove it after the exit (0.7× the enter duration).

## Theming

Every glow, tint, halo and material reads from the tokens in `src/elemental-preset.css`, so retuning an element means editing that one file:

1. **The hex ramp** (inside `@theme`) — `--color-<element>-50` through `-900` plus `--color-<element>-glow`. These drive Tailwind utilities like `bg-fire-500`.
2. **The RGB channels** (in the `:root` block) — `--<element>-500-rgb` and `--<element>-glow-rgb` (plus `--fire-400-rgb`), written as space-separated channels so they composite with alpha:

```css
box-shadow: 0 0 20px rgb(var(--fire-500-rgb) / 0.4);
```

Keep the pairs in sync — they describe the same colors in two formats.

**Glow strength.** `--glow-strength` multiplies every glow's alpha: 1 on dark, 0.8 on `.light`. Override it on any scope to calm or intensify glows.

**Contrast caveat.** `--fire-text` (used by `.badge-fire`, `.alert-fire` and code blocks) is `fire-500` on dark by design direction. That is ~2.5:1 on the dark base and fails WCAG AA for body copy, so reserve fire text for headline-scale type, badges and accents. On `.light` it flips to `fire-700` (~9.9:1).

## Known risks

- **Font licence.** Takashi Japan is a freeware demo font for non-commercial use. A commercial licence is required before public release.
- **Reduced motion.** `prefers-reduced-motion` is deliberately not handled, per the brand spec. This is an accessibility risk.
