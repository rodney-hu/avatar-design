Muted 14px trail above a page title.

```jsx
<Breadcrumb items={[{label:'Nations',href:'#'},{label:'Fire'},]} />
```

The last item is never a link and renders in primary text. `separator` replaces the default `/` with any node.

## Accessibility
Renders a `<nav aria-label="Breadcrumb">`; the last item gets `aria-current="page"`.
