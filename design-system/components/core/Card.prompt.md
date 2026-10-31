The default container for grouped content — panels, feature tiles, form blocks.

```jsx
<Card element="fire">
  <Badge element="fire">Fire</Badge>
  <h3>Ember Temple</h3>
</Card>
```

Cards are neutral by default. `element` (any element or status name) adds a 30% tinted border that brightens to 70% on hover with a depth shadow plus a 25px element glow, and scopes the edge light, spotlight and motion personality. `variant` is the surface: `base` (default), `raised`, or `glass`, a blurred 65% overlay for content floating above imagery. A color passed as `variant` still works but is deprecated.

## Materials
- `elevation` 0–4 (default 1). Use 2 for hover/raised, `lift` for clickable cards.
- `variant="glass"` uses the regular glass tier plus a lit gradient edge.
- `spotlight` for card grids. Wrap the grid in `<div data-spotlight-group>` so the light spans cards.
- `edgeLight`: one featured card per view at most. It can't be combined with `spotlight` or `data-tilt` (they share pseudo-elements).
- `grain` only on large hero panels.
