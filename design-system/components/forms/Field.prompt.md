Wrapper that gives any form control a label, hint, error message and focus underline, with the ids wired for screen readers. Input, Select and Textarea are built on it, so reach for those first; use `Field` directly to wrap your own control.

```jsx
<Field label="Ceremony Date" hint="Days start at dawn." error={dateError} required>
  <input type="date" className="input" />
</Field>
```

- `label` sits above the control and is tied to it with `htmlFor`.
- `hint` is muted help text under the control.
- `error` shows a danger-red message, outlines the control in danger red and sets `aria-invalid`. While an error shows, it overrides `element`.
- `required` passes the native attribute to the control and adds a visual `*` to the label.
- `element` tints the focus bloom, underline and label (default fire). `underline` adds the glowing focus underline (default false here; Input, Select and Textarea turn it on).
- `id` names the control. It falls back to the child's own id, then a generated one.

With no label, hint, error or underline, `Field` returns the control alone.

## Accessibility
The control gets `aria-describedby` pointing at the hint and the error, so screen readers read them after the label. Errors set `aria-invalid="true"`; screen readers announce the field as invalid. The required `*` is `aria-hidden`; the native `required` attribute does the announcing. Show errors after the person leaves the field or submits, not on every keystroke.
