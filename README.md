# 🔥💧🌍🌀 Elemental Design System — "Bending UI"

A premium, dark-first design system inspired by the Avatar: The Last Airbender universe. Built for modern web applications, landing pages, and SaaS tools using Tailwind CSS v4.

> **Cardinal Red variant** — this branch (`red-theme`) swaps the default flame-orange Fire Nation palette for a deep cardinal red anchored at `#aa0000`. See [Theming](#theming) for how to retune it.

## Features

- **🔥 Fire Nation Primary**: Deep cardinal red primary palette for bold actions, CTAs, and active states.
- **💧 Water Tribe Accent**: Deep oceanic blue and ice cyan palette for fluid interactions and secondary actions.
- **🌍 Earth Kingdom Accent**: Emerald green and jade palette for stability, success states, and grounded elements.
- **🌀 Air Nomad Accent**: Amber gold and sunburst yellow palette for warning states, highlights, and floating accents.
- **⚡ Avatar State**: Multi-elemental animated glow effects combining all four elements.
- **Dark-First Surface Depth**: Layered surface system (`#0a0a0a` to `#2f2f2f`) with glowing borders and ambient halos.
- **Warm Parchment Light Mode**: Clean, warm earth-toned light mode variant.
- **Typography**: Eastern-inspired `Cinzel` display serif + `Inter` body + `JetBrains Mono` code accents.
- **Tailwind CSS v4 CSS-First Preset**: Powered by `@theme` directives — copy one CSS file into any project to unlock all tokens and components.
- **Custom Elemental Icons**: Handcrafted SVG symbols for Fire, Water, Earth, Air, and the Avatar State.

## Installation & Usage

### 1. In any Tailwind v4 Project
Copy `src/index.css` (or `@import` it) into your project's stylesheet:

```css
@import "tailwindcss";
@import "./path/to/elemental-ds/src/index.css";
```

### 2. Live Showcase
To run the visual showcase locally:

```bash
git clone https://github.com/rodney-hu/avatar-design.git
cd avatar-design
npm install
npm run build:showcase
npx serve showcase
```

Then open `http://localhost:3000` in your browser.

## File Structure

- `src/index.css`: Main bundle importing all tokens, animations, utilities, and components.
- `src/elemental-preset.css`: CSS-first token definitions (`@theme`).
- `src/elemental-animations.css`: Keyframes for ember pulses, water flows, earth rumbles, and air floats.
- `src/elemental-utilities.css`: Glow utilities, text glows, and elemental background gradients.
- `src/elemental-components.css`: Pre-built UI components (Buttons, Cards, Inputs, Navbars, Modals, Heroes, Pricing, etc.).
- `src/icons/`: SVG symbols for all four elements + Avatar emblem.
- `showcase/`: Complete interactive HTML showcase demo.

## Theming

The fire palette is fully token-driven. Every glow, tint, halo, and gradient reads from the tokens in `src/elemental-preset.css`, so retuning the primary brand color means editing that one file.

Two things define it:

1. **The hex ramp** (inside `@theme`) — `--color-fire-50` through `--color-fire-900` plus `--color-fire-glow`. These drive Tailwind utilities like `bg-fire-500` and `text-fire-400`.
2. **The RGB channels** (in the `:root` block below `@theme`) — `--fire-500-rgb`, `--fire-400-rgb`, and `--fire-glow-rgb`, written as space-separated channels so they can be composited with alpha:

```css
box-shadow: 0 0 20px rgb(var(--fire-500-rgb) / 0.4);
```

The channels live outside `@theme` on purpose: they're referenced only from hand-written CSS, never from a generated utility, and Tailwind v4 tree-shakes theme variables it doesn't see used.

**To retune the palette**, change the hex ramp and update the three channel tokens to match the new `300`/`400`/`500` and glow values. Keep the pairs in sync — they describe the same colors in two formats.

**Contrast caveat:** where a fire step is used as *text* (`.badge-fire`, `.alert-fire`), it references `--color-fire-300`. This variant's `400` (`#dd3333`) only reaches 3.85:1 on the dark surface and fails WCAG AA, so the lighter step is used deliberately. If you re-anchor the ramp, re-check those two rules.
