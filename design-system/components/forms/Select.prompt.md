Native dropdown styled to match Input.

```jsx
<Select id="el" label="Primary Element" options={['Firebending','Waterbending','Earthbending','Airbending']} />
```

Uses the browser's own menu — no custom popover exists in this system.

## Accessibility
`label` is always tied to the field: pass an `id`, or a stable one is generated.
