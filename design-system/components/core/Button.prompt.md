The action control. A solid fire button is the single primary CTA on a view; use `variant="outline"` or `"ghost"` for everything secondary.

```jsx
<Button size="lg" onClick={start}>Unleash Fire</Button>
<Button element="water">Visit Sanctuary</Button>
<Button element="danger" variant="outline">Delete scroll</Button>
```

`element` picks the color: fire (default), water, earth, air, avatar (animated cyan cycle — reserve for one hero moment), or a status name (success, warning, info, danger). `variant` picks the style: `solid` (default), `outline` (takes the element color on hover) or `ghost`. Sizes sm/md/lg. Buttons are label-only — the system ships no icons, so avoid `iconOnly`. Solid buttons lift 1px on hover and settle on active.

`variant="water"` (a color in `variant`) is the old API. It still works but warns once; use `element`.

## Micro-interactions
- **Sheen:** every button gets a light sweep on hover. It's faint on outline and ghost and brighter on air. Turn it off with `sheen={false}`.
- **Press:** buttons shrink using the element personality (fire 0.97, water 0.99, earth sinks 2px with a rumble).
- **Burst:** element buttons emit particles from the press point when `assets/motion.js` is loaded: fire embers rise, water ripples, earth chunks fall, air motes spiral, avatar rings. Turn it off with `burst={false}`, or call `ElementalMotion.burst('water', x, y)` manually. Keep bursts for meaningful confirmations; don't use them on every icon button in a toolbar.

## Accessibility
Keyboard focus shows a 2px fire ring. Icon-only buttons (`iconOnly`) must have an `aria-label`; the component warns in the console when one is missing.
