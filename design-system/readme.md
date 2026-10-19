# Elemental Design System — "Bending UI"

A premium, dark-first design system for web applications, landing pages and SaaS tools, themed on the four elements: Fire (primary), Water, Earth, Air, plus a cyan "Avatar State" accent. This project is the design-agent form of the **Elemental UI** CSS package — the tokens, glow system, component library and showcase site have been re-authored here as CSS custom properties, React components and specimen cards.

## Sources

Everything here was read from one repository:

- **https://github.com/rodney-hu/avatar-design** (branch `main`, package `@elemental-ui/design-system` v1.0.0). Key files: `src/elemental-preset.css` (tokens), `src/elemental-components.css` (component classes), `src/elemental-utilities.css` (glows, gradients, halos), `src/elemental-animations.css` (keyframes), `showcase/index.html` + `showcase/main.js` (the product surface). The repo README documents how to retune the fire palette.

Read that repository directly for anything this system abbreviates — it is the ground truth, and its comments explain several decisions (why the fire RGB channels live outside `@theme`, why `--fire-text` flips per theme) in more detail than is repeated here.

**Upstream is Tailwind CSS v4.** The source ships `@theme` and `@utility` blocks. This project keeps the same names and the same exact values but rewrites them as plain CSS (`:root` custom properties and ordinary classes) so the system works with no build step. Numeric values were copied, never rounded.

**No logo exists in the source.** The repo has no wordmark or brand file — the showcase renders its brand lockup as the element glyph plus the plain type "ELEMENTAL UI". This system does the same. Nothing was drawn or invented.

## Content fundamentals

The voice is confident, in-world, and slightly theatrical. Product nouns are replaced by element nouns: buttons "unleash", palettes belong to "nations", sections are "scrolls".

- **Casing.** The hero title is set in Cinzel; every other headline is Inter. Use title case or sentence case ("Harness the Elements in Your UI", "The Fire Nation") — never with a brush word mixed in. Section headings are title case in Inter ("Layered Surfaces & Glass"). Uppercase is reserved for small type: labels, badges and table headers, at 0.05em tracking.
- **Person.** Copy addresses the reader as *you* implicitly, usually by imperative: "Unleash Fire Toast", "Enter Temple", "Unlock Full Power", "Contact White Lotus". First person never appears.
- **Sentence shape.** Section subtitles are single declarative fragments, no period-heavy paragraphs: "Deep dark surface system paired with vibrant elemental accents." Feature blurbs run one or two sentences.
- **Numbers and units.** Stats carry real units and a direction: "98.4%", "1,420 L/s", "840 MPa", "↑ +14.2% Comet boost".
- **Naming.** Every variant is named for its element, not its semantics: `btn-fire` is the primary CTA, `alert-earth` is success, `alert-air` is a notice. Write new component names the same way.
- **Emoji.** The source uses element emoji (🔥💧🌍🌀⚡) freely in labels and copy. **This system does not**, and it ships no icon set in their place — element identity comes from color, glow and the standalone brush headings.
- **In-world examples.** Sample data leans on the fiction (Zuko, Katara, Toph, Aang; Ba Sing Se; the Spirit Oasis). Keep placeholder copy in that register so mocks read as a set.

## Visual foundations

**Color.** Four ten-step ramps plus a glow step each. Fire is the brand and the only CTA color, anchored at `#aa0000` (500) with `#e01010` as its glow. Water (`#0088e0`) is secondary and informational, Earth (`#27ae34`) is success, Air (`#e6bf00`) is warning/highlight. `--color-avatar-glow` (`#00ffff`) is reserved for one hero moment per view. Primary aliases (`--color-primary-*`) point at the fire ramp, so a rebrand is a single-file edit.

**Surfaces.** Dark-first, five near-black layers: void `#0a0a0a` → base `#0d0d0d` → raised `#1a1a1a` → elevated `#252525` → overlay `#2f2f2f`. A second theme, `.light`, swaps them for warm parchment (`#f5f0eb` → `#ffffff`) with earth-toned borders. Two background colors per screen is the practical limit: void for the page, base or raised for cards.

**Type.** Three faces plus mono. **Cinzel** (800, `--font-hero`) is the Display XL hero title only (`.hero-title`, `--type-hero`). **Inter** (300–800) is every other headline tier — section headings, card titles, stat values, prices and the brand lockup, set at 700–800 with `--tracking-display` (-0.02em), plus all interface copy at a 15px base. **Avatar Airbender** (brush, one weight, no italic) appears only where it is specifically referenced — as a standalone single-line heading or section, e.g. an element name heading a block — applied with `.brush` to the whole element, at 1.75rem and up. It is never mixed into an Inter line as an accent; that breaks the flow. **JetBrains Mono** is code, token names and numeric keys. Body prose runs 1.6 line-height; brush runs 1.18 (its strokes overhang). Never set a subhead, label, numeral or body string in brush, and never put a brush span inside an Inter heading.

**Type divergence from source.** Upstream uses Cinzel for all display type. Cinzel is now kept for the hero title only; Inter carries every other headline tier; the brush face is reserved for standalone headings where it is specifically referenced. The token name `--font-display` was kept so consuming code does not break.

**Backgrounds.** No photography, no illustration, no repeating texture, no grain. Depth comes from two devices only: flat layered surfaces, and top-anchored radial halos at 18–20% alpha (`.bg-halo-*`, `.hero-*`) that fade to transparent by 70%. Gradients exist but are restricted — 135° two-stop fills on buttons, three-stop `.gradient-*` for decorative blocks, and one four-stop `gradient-avatar` spanning all four elements.

**Glows instead of shadows.** The system's signature. Every elevation cue is a two-stop colored halo: a \~20px core at 35–40% alpha plus a \~50–60px ambient bloom at 15%. Hover raises both (25px/60px at 50%/20%). Black shadows appear only as a secondary depth layer under hovered cards (`0 8px 30px rgba(0,0,0,0.5)`) and under filled buttons at rest (`0 4px 14px` in the element's tint). Text glows (`.text-glow-*`) are reserved for hero titles and stat values — never body copy.

**Borders.** Almost everything has a 1px border. Neutral weights are `--color-border-subtle #1f1f1f`, `default #2a2a2a`, `strong #3a3a3a`. Elemental containers border at 30% alpha of their element and brighten to 70% on hover. Filled buttons carry a `rgba(255,255,255,0.15)` inner-light border. Left-border accents appear in exactly one place — `.sidebar-item` active state (3px fire) — and nowhere else.

**Corner radii.** Deliberately tight: 4px (sm), 6px (md — buttons, inputs), 8px (lg — cards, tables), 12px (xl — modals, pricing cards), and full pills only for badges and the toggle switch. Nothing is more rounded than 12px except pills.

**Cards.** Base surface, 1px subtle border, 8px radius, 24px padding, no shadow at rest, `overflow: hidden`, `position: relative`. Elemental variants add a tinted border and gain both the black depth shadow and a 25px element glow on hover. `card-glass` is the one translucent variant: `rgba(26,26,26,0.65)` with `blur(16px)` and an 8% white hairline.

**Transparency and blur.** Blur is used in three places only: the navbar (85% base + `blur(12px)`), glass cards (`blur(16px)`), and the modal backdrop (80% black + `blur(8px)`). Alpha tints follow a consistent ladder: 8% for hover washes, 10–15% for badge and alert fills, 30–40% for borders.

**Animation.** Easing is `cubic-bezier(0.16,1,0.3,1)` for interactions (0.2s) and `ease` for glows (0.25s). Ambient loops are slow and never jumpy: `ember-pulse` 3s, `air-float` 4s (8px rise), `water-flow` 6s (background position), `avatar-state-cycle` 8s linear (border and glow cycle through all four elements). `earth-rumble` is a 0.3s hover-only shake. Entrances: `fade-in-up` 0.4s (16px rise) and `scale-in` 0.25s (0.95 → 1). No bounce, no spring.

**Motion (scroll and pointer choreography).** A second, richer motion layer sits on top of those ambient loops — `tokens/motion.css` plus the runtime in `assets/motion.js`. It is tuned *cinematic*: 700ms base duration, 40px reveal travel, the same expo-out easing as the rest of the system, and no bounce or spring anywhere. Five effects, each opt-in via a data attribute:

- **Scroll reveal** — `data-reveal` fades an element up 40px on viewport entry (12% threshold, fires once). `data-stagger` on a container does the same to its children with a 90ms cascade, so grids arrive as a wave.
- **Halo bloom** — `data-halo-bloom` drives a `--bloom` channel from 0 to 1 as the element crosses the viewport centre; the section's radial halo rides it in both alpha (peak 0.26) and scale, so a section ignites as it arrives. Pass an element name (`data-halo-bloom="water"`) to retint.
- **Parallax layers** — `data-parallax="0.35"` separates halo from content by depth over an 80px range. Transform only; never `top` or margin.
- **Magnetic tilt** — `data-tilt` rotates a card up to ±7° toward the pointer and tracks a 420px specular sheen across it. 90ms linear while tracking, 320ms expo on release.
- **Gradient drift** — `.motion-gradient-drift` crawls an oversized elemental gradient over 18s (32s for the `-slow` variant), giving ambient life with no visible loop point.

The runtime adds `.motion-ready` to `<html>`, so nothing is hidden if the script fails to load, and it re-scans on DOM mutation so React-rendered screens are picked up automatically. Per direction, `prefers-reduced-motion` is **not** honoured — see Caveats below if that needs revisiting.

**Motion restraint.** The brand reads premium because motion is slow and sparse. One bloom per section, one reveal per content block, tilt on card grids only. Do not stack reveal, tilt and drift on the same element.

**Hover and press.** Filled buttons translate `-1px` and brighten their glow; the active state returns to `0` and drops the glow to `0 2px 10px`. Outline buttons switch border to fire-500, text to fire-400 and gain a 15px fire halo. Ghost buttons fill with the raised surface. Nav links move to fire-400 over an 8% fire wash. Nothing scales on hover except `btn-avatar` (`translateY(-2px) scale(1.02)`). Disabled is 45% opacity with no glow.

**Layout.** Content maxes at 80rem centered with 1.5rem gutters, sections separated by 6rem. The navbar is `position: sticky; top: 0; z-index: 50`; the sidebar is a fixed 260px, 100vh. Modals sit at z-index 100. Heroes are centered columns with 6rem/2rem padding and a 1.5rem gap.

**Contrast note.** `--color-fire-400` (`#dd3333`) reaches only 3.85:1 on the dark base and fails WCAG AA as text. Fire-as-text therefore reads from `--fire-text`, which is fire-500 on dark (by design direction, ~2.5:1, so headline-scale type, badges and accents only) and fire-700 on parchment. If you re-anchor the fire ramp, re-check `.badge-fire` and `.alert-fire`.

**Divergence: alpha surfaces flip per theme.** Upstream hardcodes three translucent fills inside its component rules — the navbar (`rgba(13,13,13,0.85)`), the glass card (`rgba(26,26,26,0.65)`) and the modal backdrop (`rgba(0,0,0,0.8)`) — so they stay dark when `.light` is applied and the navbar's own text becomes unreadable. This system moves them to `--surface-nav`, `--surface-glass`, `--surface-glass-border` and `--surface-scrim`, which the `.light` block re-points at parchment equivalents. Same values as the source in dark mode; readable in both. For the same reason, badge and alert text for water, earth, air and avatar now read from `--water-text` / `--earth-text` / `--air-text` / `--avatar-text` (the source's own light steps on dark, 700 steps on parchment) rather than hardcoded hexes.

## Motion system

`tokens/motion.css`.

- **Durations are chosen by distance travelled:** instant 120ms (color/opacity), fast 200ms (hover, press, focus), base 320ms (toggles, tooltips, dropdowns), moderate 500ms (cards, modals, toasts), slow 700ms (section reveals, the cinematic default), slower 1100ms (hero entrances), ambient 6s (idle loops). Exits run at `--duration-exit-ratio` (0.7×) of their enter duration.
- **Four easings:** `--ease-enter` (expo-out, for arrivals), `--ease-exit` (expo-in, for departures), `--ease-standard` (in-out, for on-screen moves) and `--ease-spring` (`linear()` overshoot and settle). Don't write raw `ease` or `.3s`. `--ease-out-expo` and `--motion-*` remain as aliases.
- **Exits:** `.animate-scale-out` and `.animate-fade-out-down` mirror their enter animations.

### Element personalities

Each `.element-*` scope, plus `.btn-<el>` and `.card-<el>`, retunes the shared channels (`--motion-duration`, `--motion-ease`, `--motion-rise`, `--motion-stagger`, `--ui-duration`, `--ui-ease`, `--ui-lift`, `--ui-press`, `--ui-press-scale`). Reveals, hovers and presses inside a scope then move in character.

- **Fire:** 560ms, expo-out, 28px rise, 160ms snappy UI, presses to 0.97. Idle: ember flicker.
- **Water:** 950ms sine, 44px rise, 420ms UI, 2px lift. Idle: tide.
- **Earth:** 620ms quart-out, 14px rise, no hover lift, presses sink 2px with a rumble. No idle.
- **Air:** 900ms spring, 56px rise, 480ms spring UI, 4px lift. Idle: float.

Add `.ui-motion` to any custom interactive surface to inherit the personality. Add `.element-idle` for the element's idle signature (hero marks and featured surfaces only).

## Micro-interactions

`tokens/interactions.css` and `assets/motion.js`. All timing comes from the motion tokens and the element personality channels.

- **Buttons:** a sheen sweeps across on hover. Presses use `--ui-press-scale`. Element buttons fire a particle burst from the press point (needs motion.js): fire embers rise, water ripples, earth chunks fall under gravity, air motes spiral, avatar rings. Turn it off per button with `data-burst="off"`.
- **Fields:** focus blooms past the 3px ring and settles. `.field-line` sweeps a glowing underline in from the left. The label tints. `--field-rgb` sets the color, retinted by `.input-<el>` and `.field-<el>`.
- **Checkbox:** a custom box that springs in, fills in the element color and draws its tick in with a stroke animation.
- **Toggle:** the knob slides on the spring easing and stretches while pressed.
- **Data:** stat values use tabular figures. `StatCard` counts up when it scrolls into view. On change it rolls to the new figure and flashes `[data-flash="up|down"]` (earth green for up, fire red for down).

### Choreography

`tokens/transitions.css`. Mark a container with `data-choreo` and tag its pieces with `data-choreo-role`. They arrive in order: **surface** (0), **heading** (1), **body** and **media** (2), then **action** (3). Beats are `--choreo-step` apart (1.5× the active element's stagger). The container reveals on scroll and needs `assets/motion.js`.

- **Travel by size:** `--travel-xs` 4px (tooltips, badges, popovers), `-sm` 8px (buttons, inputs, text lines), `-md` 16px (cards, toasts, modals), `-lg` 32px (sections, media), `-xl` 56px (hero).
- **Concurrency:** at most three groups in motion per viewport, one hero moment per view, one or two idle loops visible.
- **Never animate:** the navbar, text while it's being read, table rows on sort or filter (flash the changed cell instead), the focus ring's position.

### Exits & overlays

Exits use `--ease-exit` at 0.7× of the enter duration and never stagger. Components flip `data-state="open"` to `"closed"`, wait, then unmount.

- **Modal:** the backdrop fades and the surface rises 16px and scales from 0.97. The header, body and footer follow one beat apart. With `open={false}`, it scales out over about 350ms before unmounting. Escape closes it.
- **Tooltip:** there's a 120ms hover delay before entry, and it leaves immediately. It slides 4px toward the trigger. Use `side="top|bottom"`.
- **Popover / dropdown:** `.popover` with `data-side` and `data-align` grows from the edge that touches its trigger. Use `.popover-item` for rows.
- **Toast stack:** use `.toast-stack > .toast-slot[data-state] > .toast-slot-inner > .toast-pad > .alert.toast`. Slot heights animate, so neighbours glide to make room and close the gap. Remove a toast 600ms after setting `closed`.

### Page transitions

- **Same page:** wrap the state change in `ElementalMotion.transition(fn)`, which uses View Transitions and flushes React synchronously. The old page lifts out and the new one rises in.
- **Between pages:** same-origin page loads crossfade automatically through `@view-transition`.
- **Shared elements:** give the matching element on both pages the same `data-vt="name"` (unique per page) and it morphs between positions. The navbar and the active nav link are shared by default, so the active pill slides between tabs.
- **Fallback:** in browsers without View Transitions, a keyed `[data-page]` wrapper fades in on mount.

## Glow system

`tokens/effects.css` and `tokens/shadows.css`. Every glow is a tight core halo in the element's **glow** step plus a wide ambient bloom in its **500** step. All color values come from `--<el>-500-rgb` and `--<el>-glow-rgb` in `colors.css`, with no hardcoded colors left.

- **Size:** `.glow-sm`, `-md` (default), `-lg` and `-xl` scale the blur radii (0.5×, 1×, 1.6×, 2.4×).
- **Strength:** `--glow-strength` is one alpha multiplier for every glow, text glow and `--shadow-*` token. It's 1 on dark and 0.8 on `.light`.
- **Scoped:** `.glow` and `.text-glow` take their color from the nearest `.element-*` scope.
- **Light theme:** halos turn into soft colored drop shadows, because neon looks muddy on parchment.
- **Change from upstream:** fire's core halo now uses fire-glow (`#e01010`) instead of fire-500, so it follows the same rule as the other elements.

## Materials & depth

`tokens/materials.css`. All of it is opt-in by class or data attribute.

- **Elevation `0–4`** (`.elevation-n`). Each level stacks a soft ambient shadow, a sharper key shadow and a 1px top highlight (`--edge-highlight`). The levels are 0 flat, 1 resting card, 2 hover/raised, 3 popover/dropdown, 4 modal. Add an element glow without losing depth: `style="--elevation-glow:var(--shadow-fire)"`. `.elevation-lift` moves 1→3 on hover. Light theme swaps in warm brown shadows.
- **Glass tiers.** `.glass-thin` (8px blur, tooltips and chips), `.glass` (16px, cards and nav) and `.glass-thick` (28px, modals and sheets). Each adds saturation to the blur. Pair with `.border-gradient` for a 1px edge that's brightest at the top.
- **Grain** (`.grain`). A film-grain overlay at 7% opacity, overlay blend on dark and multiply on light. Use it on hero panels and large glass, not on small UI.
- **Edge light** (`.edge-light`). An element-colored comet orbits the border every 6s with a blurred trail. Use it on **one featured surface per view** at most, such as the popular pricing tier.
- **Spotlight** (`[data-spotlight]`, needs `assets/motion.js`). Light pools under the cursor and brightens the nearest border. Wrap a grid in `[data-spotlight-group]` so neighbouring cards catch the light too. The tint follows `.element-*`.
- **Conflicts.** `.border-gradient`, `.edge-light` and `[data-spotlight]` all draw with `::before`, so use only one per element. `[data-spotlight]` sets `background-image`, so put it on solid-fill surfaces, not `.gradient-*`.

## Iconography

**The system ships no icons.** The five element glyphs (fire, water, earth, air, avatar) that came from the source repo were removed at the user's direction, along with the `ElementIcon` component and `assets/icons/`. Element identity is carried by color, glow and the brush-face element headings instead.

- **No icon font, no sprite, no SVG or PNG icons, no CDN library.** Components that accept a leading node (`Alert icon`, `SidebarItem icon`, `TestimonialCard avatar`) still take one, but nothing in the system fills it.
- **Text stands in where a glyph would be:** the modal close is a text `×`; stat deltas use the unicode arrows `↑`/`↓`; buttons are label-only. There are no icon-only buttons.
- **Emoji:** used in the source, not used here.
- If a future design needs icons, ask before introducing a set — nothing in the system sanctions one.

## Index

Root manifest:

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry — `@import` list only. Consumers link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `surfaces.css`, `typography.css`, `spacing.css`, `radii.css`, `shadows.css`, `animations.css`, `motion.css`, `transitions.css`, `interactions.css`, `effects.css`, `materials.css`, `components.css` |
| `components/` | React primitives, grouped by concern (below) |
| `guidelines/` | 42 foundation specimen cards (Colors, Type, Spacing, Brand, Materials, Motion) |
| `assets/fonts/` | Avatar Airbender brush face + licence |
| `assets/motion.js` | Motion runtime — reveal, stagger, bloom, parallax, tilt |
| `SKILL.md` | Agent Skills entry point |
| `github.md` | Source repository association and sync record |

### Components

`components/core/` — **Button**, **Badge**, **Card** `components/forms/` — **Input**, **Textarea**, **Select**, **Checkbox**, **ToggleSwitch** `components/navigation/` — **Navbar**, **NavLink**, **Sidebar**, **SidebarItem**, **Breadcrumb** `components/data/` — **StatCard**, **DataTable** `components/feedback/` — **Alert**, **Modal**, **Tooltip** `components/marketing/` — **Hero**, **PricingCard**, **TestimonialCard**

Every component has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when, usage example, variants). Each directory has one card HTML showing its states.

The inventory maps 1:1 onto the component families defined in `src/elemental-components.css`: buttons, cards/surfaces, forms & inputs, checkbox, toggle, navbar, nav link, sidebar, breadcrumb, stat card, badge, table, alert/toast, modal, tooltip, hero, pricing card, testimonial card.

### Intentional additions

- **`tokens/spacing.css` and the type-scale tokens** — the source relies on Tailwind's default scale. These name the values its own components already use; no new values were introduced.
- **`tokens/motion.css` + `assets/motion.js`** — the source has no scroll or pointer motion at all. This layer was authored to the brand's existing easing and glow vocabulary rather than imported from anywhere.

### Showcase site

The UI kit screens now live in `site/src/screens/` (`LandingScreen.jsx`, `ComponentsScreen.jsx`, `DataScreen.jsx`, `LandingBlocksScreen.jsx`) with the shell in `site/src/App.jsx`; Vite builds them against `components/` here, and `npm run dev` serves them. The site is click-through: nav switches sections, the hero's element switcher retints halo/glow/CTA, the theme toggle flips to parchment, and the toast and modal demos work. Routes are `/`, `/components`, `/data` and `/landing`.

No slide template exists in the source, so no sample slides were authored.

## Caveats

- **`prefers-reduced-motion` is deliberately ignored**, per direction. Users who set that OS preference will still get the full reveal, bloom, parallax and tilt choreography. If this system ships to a public audience, add a `@media (prefers-reduced-motion: reduce)` block to `tokens/motion.css` that zeroes `--motion-rise` and `--motion-parallax-range` and disables the drift animation — that keeps the fades and drops all movement, which is the usual compromise.
- **Fonts.** Cinzel, Inter and JetBrains Mono load from the Google CDN. **Avatar Airbender** is vendored in `assets/fonts/`; it is free for personal and commercial use, with a FontGet.com credit required if the font file is redistributed (`assets/fonts/LICENSE-AvatarAirbender.txt`). It is a display face with limited glyph coverage, so check any new brush string at size.
- **No logo exists**, so the brand lockup is plain Inter type.
