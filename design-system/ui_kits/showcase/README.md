# UI kit — Elemental UI showcase site

A recreation of the one product surface the source repo ships: the documentation
showcase at `showcase/index.html` in [rodney-hu/avatar-design](https://github.com/rodney-hu/avatar-design).
Structure, section order, copy and component states follow that file; the
Tailwind utility markup is replaced by the design system's React components.

## Screens

| File | Source section |
| --- | --- |
| `ShowcaseShell.jsx` | navbar, theme toggle, modal, toast stack, footer (`showcase/main.js`) |
| `LandingScreen.jsx` | hero + element theme switcher, 01. Color Palette, 02. Typography |
| `ComponentsScreen.jsx` | 03. Buttons, 04. Cards, 05. Forms |
| `DataScreen.jsx` | 06. Data &amp; Dashboards, 07. Feedback &amp; Alerts |
| `LandingBlocksScreen.jsx` | 08. SaaS &amp; Landing Blocks, 09. Installation Guide |

## Interactions

Nav links switch sections. The Light Mode button toggles `.light` on `<body>`.
The hero's theme-preview row retints the halo, title glow and primary CTA per
element. "Unleash Toast" pushes an `Alert` into the fixed bottom-right stack for
3.5s; "Open Bending Modal" opens the fire-bordered dialog.

## Not recreated

The source's per-section copy-to-clipboard buttons are static here — the code
block renders, the copy affordance is omitted.
