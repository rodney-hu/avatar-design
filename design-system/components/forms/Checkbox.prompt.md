18px square checkbox with a fire accent-color tick.

```jsx
<Checkbox id="avatar-state" label="Enable Avatar State" defaultChecked />
```

## Micro-interactions
Checking springs the box from 0.8 to full size, fills it in the element color with a glow, and draws the tick in. Unchecking erases it quickly. `element` sets the color.

## Accessibility
The label wraps the box, so clicking the text toggles it. Pass an `id`, or a stable one is generated.
