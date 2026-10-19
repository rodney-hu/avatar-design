Row inside Sidebar; active and hover share one treatment.

```jsx
<SidebarItem active>Overview</SidebarItem>
```

Active/hover raises the background and adds a 3px fire left border. `icon` takes an optional leading node; the system ships no icon set.

## Accessibility
`active` sets `aria-current="page"`. Keyboard focus shows a 2px ring.
