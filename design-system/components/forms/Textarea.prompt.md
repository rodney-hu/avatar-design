Multi-line field for notes and longer copy.

```jsx
<Textarea id="notes" label="Scroll Notes" placeholder="Write ancient bending techniques..." />
```

Shares the input's surface, border and focus halo. Built on `Field`, like Input: `element` sets the halo, underline and label tint (default fire), and it takes `hint`, `error`, `required` and `underline` (default true). `rows` sets the visible height (default 3).

## Accessibility
`label` is always tied to the field: pass an `id`, or a stable one is generated. `hint` and `error` are linked with `aria-describedby`, and `error` sets `aria-invalid`.
