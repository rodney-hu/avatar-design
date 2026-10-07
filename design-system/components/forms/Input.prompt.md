Single-line text field with an uppercase micro-label.

```jsx
<Input id="name" label="Avatar Name" placeholder="e.g. Aang, Korra, Roku" />
```

Focus draws a 3px 20%-alpha halo in the chosen element and darkens the field to the base surface.

## Micro-interactions
Focus blooms (the ring expands past 3px and settles back), a glowing underline sweeps in from the left and the label tints, all in the `element` color. Turn off the underline with `underline={false}`. Textarea and Select get the bloom only.
