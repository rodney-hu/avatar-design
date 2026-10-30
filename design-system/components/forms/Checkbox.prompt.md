18px square checkbox. Checked, it fills with the `element` color (default fire, any element or status name).

```jsx
<Checkbox id="elemental-state" label="Enable Elemental State" defaultChecked />
```

## Micro-interactions
Checking springs the box from 0.8 to full size, fills it in the element color with a glow, and draws the tick in. Unchecking erases it quickly. `element` sets the color, e.g. `element="avatar"`.

## Accessibility
The label wraps the box, so clicking the text toggles it. Pass an `id`, or a stable one is generated.
