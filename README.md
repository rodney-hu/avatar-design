# 🔥💧🌍🌀 Elemental Design System — "Bending UI"

A premium, dark-first design system inspired by the Avatar: The Last Airbender universe. Built for modern web applications, landing pages, and SaaS tools using Tailwind CSS v4.

## Features

- **🔥 Fire Nation Primary**: Flame orange/crimson primary palette for bold actions, CTAs, and active states.
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
