KPI tile for dashboard headers.

```jsx
<StatCard element="fire" label="Fire Power Index" value="98.4%" delta="↑ +14.2% Comet boost" />
```

Neutral by default. `element` (any element or status name) tints the value, adds its text glow and lifts the border to a 30%-alpha element tint.

## Micro-interactions
- **Count-up:** numeric values count up from 0 the first time the card scrolls into view. Turn it off with `countUp={false}` for static reports.
- **Change:** when `value` changes, the figure rolls to the new number and the card flashes earth green (up) or fire red (down). `delta` nudges in the same direction. Turn off the flash with `flash={false}`.
- **Formatting:** pass values as display strings (`"$1,420"`, `"98.4%"`). Formatting is preserved.

## Accessibility
Value text reads the per-element text tokens, which pass contrast in both themes. With reduced motion on, the count-up and roll are skipped and the final value shows at once.
