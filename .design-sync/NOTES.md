# design-sync notes: avatar-design → Claude Design "Avatar Design"

Project: https://claude.ai/design/p/5d6c385b-bb5d-49cd-b538-585a4db873e5

## How this repo is synced
- Shape is `package`, with no Storybook. The repo ships no `dist/`: components are plain `.jsx` with sibling `.d.ts` and `.prompt.md` in `design-system/components/<group>/`.
- `buildCmd` (`node .design-sync/make-entry.mjs`) writes `.design-sync/.cache/pkg/` (gitignored). It contains:
  - `index.js` and `index.d.ts`: barrels over every component.
  - `elemental.css`: `site/src/styles.css` compiled with the Tailwind CLI, the same CSS the live site ships, including the on-demand `text-glow-*` utilities.
  - `fonts/`: copied from `src/fonts/`.
  - `docs/<Export>.md`: each `<Name>.prompt.md` with a `category:` frontmatter taken from its folder.
- `cfg.entry` points the converter at that barrel. `cfg.cssEntry` / `cfg.docsDir` are relative to it.
- `docs/<Export>.md` is named per *exported* component: `Toast.jsx` exports `ToastStack` (+ the `useToasts` hook).
- `guidelinesGlob: []` stops the converter copying the generated `docs/*.md` as guidelines. The project's hand-made `guidelines/*.html` cards are kept, not managed by this sync.
- `.design-sync/node_modules` → `../.ds-sync/node_modules`. This symlink is gitignored; recreate it per clone. It's how ts-morph finds `@types/react`, which the repo doesn't install.
- Run commands from the repo root:
  - build: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle`
  - validate: `node .ds-sync/package-validate.mjs ./ds-bundle`
- Playwright: `.ds-sync` uses playwright@1.60.0 to match the cached chromium-1223 in `~/Library/Caches/ms-playwright`. The repo's own playwright pins 1194; don't use it.

## Previews
- All 24 components are authored in `.design-sync/previews/` and graded good on 2026-10-20.
- The card harness paints `body` white, but this DS is dark-first. Every preview wraps stories in a local `Stage` on `--color-surface-void`. That's preview-only; designs get the dark body from the DS CSS.
- Overlays: `Modal` and `ToastStack` use `cardMode: single` with a viewport. `Menu`'s `Open` story clicks its own trigger on mount. `Tooltip` stories use `autoFocus`, because `:focus-within` shows the bubble.
- Wide components use `cardMode: column`: Hero, Navbar, PricingCard, Card, StatCard, DataTable.

## Known render warns
- None after authoring.
- `Checkbox` `Disabled`: the DS CSS doesn't dim a disabled checkbox. That's real DS behavior, not a preview bug.

## First sync (2026-10-20)
- The project was re-adopted, not created. It was originally hand-built in Claude Design and exported into `design-system/` (commit f2ef664).
- Before uploading, sampled project files (Button, Navbar, Alert, Hero `.jsx`, `tokens/radii.css`) were byte-identical to that export. No project-only edits were found.
- Old flat files `components/<group>/<Name>.{jsx,d.ts,prompt.md}` and `<group>.card.html` were deleted, superseded by the per-component layout.
- The old `tokens/*.css` (a plain-CSS port) are left in place but are no longer imported by `styles.css`.
- Kept untouched: `ui_kits/`, `guidelines/*.html`, `assets/`, `uploads/`, `SKILL.md`, `github.md`, `readme.md`, `design_handoff_avatar_design_system/`.

## Re-sync risks
- `make-entry.mjs` reads `site/src/styles.css`. If the site's stylesheet entry moves or gains page-only CSS, the synced CSS changes with it.
- The motion runtime (`design-system/assets/motion.js`) is not in the bundle. Reveal, tilt, parallax, spotlight and click bursts don't run in designs, and `conventions.md` says so. If you want them, add the runtime via `extraEntries` and update the header.
- Google Fonts (Inter, Cinzel, JetBrains Mono) load from a remote `@import` (`[FONT_REMOTE]`). Only Avatar Airbender ships as a file.
- `elemental.css` depends on the installed Tailwind version (4.3.x at sync time).
- `design-system/_ds_bundle.js` (the repo's own `npm run build:ds` output) is unrelated to the uploaded bundle. Don't hand-copy it to the project.
