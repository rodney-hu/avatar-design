Single-line text field with an uppercase micro-label.

```jsx
<Input id="name" label="Display Name" placeholder="e.g. Ember, Marin, Terra" />
<Input label="Member Name" required error="That name is already taken." />
```

Built on `Field`: `hint` adds muted help text, `error` shows a danger-red message and outline, and `required` marks the label with `*`.

Focus draws a 3px 20%-alpha halo in the chosen element and darkens the field to the base surface.

## Micro-interactions
Focus blooms (the ring expands past 3px and settles back), a glowing underline sweeps in from the left and the label tints, all in the `element` color (any element or status name). Turn off the underline with `underline={false}`. Textarea and Select share the same bloom, underline and label tint.

## Accessibility
`label` is always tied to the field: pass an `id`, or a stable one is generated. `hint` and `error` are linked with `aria-describedby`, and `error` sets `aria-invalid`.
