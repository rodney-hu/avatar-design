44x24 pill switch for instant-effect settings.

```jsx
<ToggleSwitch id="ember" label="Ember Glow" defaultChecked />
```

Checked state fills fire-600 with a 10px fire glow and slides the knob 1.2rem.

## Micro-interactions
The knob slides on `--ease-spring` and stretches 28% while pressed.

## Accessibility
Renders `role="switch"`, so screen readers announce it as on or off. The `label` text names it; with no visible label, pass `aria-label`. Space toggles it, and a 2px focus ring shows on keyboard focus.
