Native dropdown styled to match Input.

```jsx
<Select id="el" label="Primary Element" options={['Fire','Water','Earth','Air']} />
```

Uses the browser's own menu — no custom popover exists in this system. Built on `Field`, like Input: `element` sets the focus bloom, underline and label tint (default fire), and it takes `hint`, `error`, `required` and `underline` (default true).

## Accessibility
`label` is always tied to the field: pass an `id`, or a stable one is generated. `hint` and `error` are linked with `aria-describedby`, and `error` sets `aria-invalid`.
