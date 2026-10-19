Uppercase pill for status, section numbers and nation labels.

```jsx
<Badge element="water">Grandmaster</Badge>
```

Always renders uppercase at 12px/600 with a tinted 15% fill and 35% border. `element` takes any element or status name (`success`, `warning`, `info`, `danger`). Text reads the `--<element>-text` tokens, so it stays legible in both themes. `variant` is the old name for `element` and is deprecated.
