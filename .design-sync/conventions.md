# Elemental UI (avatar-design): how to build with it

Dark-first system themed on four elements: **fire** (primary, cardinal red), **water**, **earth**, **air**, plus a cyan **avatar** accent. Copy and sample data stay in-world (Zuko, Katara, Toph, Aang; Ba Sing Se; the Spirit Oasis).

## Setup
- No provider or wrapper is needed. Components are styled by global classes from `styles.css`.
- Put every screen on the dark surface: `background: var(--color-surface-void)` with `color: var(--color-text-primary)`. Without it, outline/ghost buttons, labels and secondary text are near-invisible on white.
- Light theme: add `className="light"` on a root element. Surfaces and text tokens flip to warm parchment.
- Glow intensity: set `--glow-strength` (default 1) on any ancestor, 0 to turn glows off.
- Motion runtime is **not** loaded in designs. Don't rely on `data-reveal`, `data-tilt`, `data-stagger`, `data-parallax`, or Card `spotlight`; static glows, gradients and CSS hover states all work.

## Component API: one color vocabulary
- `element` sets color on every component: `fire | water | earth | air | avatar`, or status aliases `success` (earth), `warning` (air), `info` (water), `danger`.
- `variant` sets style, never color. Button: `solid | outline | ghost`. Card: `base | raised | glass`.
- One solid fire `Button` per view is the primary CTA. Use `variant="outline"` or `"ghost"` for the rest.
- Forms (`Input`, `Select`, `Textarea`, `Field`) take `label`, `hint`, `error`, `required`. `Field` wraps a raw control: `<Field label="Date"><input type="date" className="input" /></Field>`.
- Overlays: `Modal` (`open`, `title`, `footer`, `onClose`), `ToastStack` + `useToasts()`, `Menu` (`label`, `items=[{label, onSelect, disabled}]`), `Tooltip` (`text`, wraps one element).

## Styling idiom: tokens plus a small class vocabulary
Use `var(--*)` tokens for your own layout glue. Never use literal hexes.

| Family | Names |
|---|---|
| Surfaces | `--color-surface-void`, `-base`, `-raised`, `-elevated`; border `--color-border-subtle` |
| Text | `--color-text-primary`, `-secondary`, `-muted`; element text `--fire-text`, `--water-text`, `--earth-text`, `--air-text`; link `--fire-link` |
| Ramps | `--color-{fire,water,earth,air}-{50..900}` (fire-500 is the CTA red) |
| Type | `--font-display` / `--font-body` (Inter), `--font-hero` (Cinzel, hero only), `--font-brush` (Avatar Airbender, single-line standalone headings only), `--font-mono`; `--text-hero`, `--tracking-display` |
| Space / shape | `--space-1` through `--space-24`, `--radius-lg`, `--radius-xl` |
| Classes | `stat-label` (small uppercase label), `brush` (brush heading), `code-block`, `glass`, `glass-thick`, `elevation-0`…`elevation-4`, `glow-{element}` plus `glow-sm/lg/xl`, `text-glow-{element}`, `gradient-{element}`, `element-{element}` (scopes an element accent to a subtree) |

Read `styles.css` → `_ds_bundle.css` for the full class list, and each `components/<group>/<Name>/<Name>.prompt.md` for usage.

## Example
```jsx
<div style={{ background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', padding: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
  <Card element="water" elevation={2} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <Badge element="water" style={{ width: 'fit-content' }}>Northern Tribe</Badge>
    <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700 }}>Spirit Oasis</h3>
    <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Tui and La circle in eternal harmony.</p>
    <Button element="water" size="sm" fullWidth>Visit Sanctuary</Button>
  </Card>
</div>
```
