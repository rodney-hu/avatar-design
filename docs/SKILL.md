---
name: elemental-design
description: Use this skill to generate well-branded interfaces and assets for Elemental Design, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read `design-system/readme.md` (visual foundations, motion and glow systems, content rules, caveats) and the repo `README.md`, then explore the other files:

- `design-system/tokens/` — plain-CSS tokens; the source of truth for values.
- `design-system/components/` — reference components: `.d.ts` (props API), `.jsx` (reference implementation), `.prompt.md` (usage rules).
- `design-system/guidelines/` — specimen pages; open them in a browser.
- `src/` — the production Tailwind v4 preset and component classes.
- `site/` — the React site (Vite + `design-system/components`, routes `/`, `/components`, `/data`, `/landing`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, use the classes and tokens in `src/` and follow the rules in the design-system docs.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
