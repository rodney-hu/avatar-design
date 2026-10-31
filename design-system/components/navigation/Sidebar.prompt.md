App navigation rail for dashboard layouts; fill it with SidebarItem rows.

```jsx
<Sidebar header={<div className="nav-brand">ELEMENTAL DESIGN</div>}>
  <SidebarItem active>Overview</SidebarItem>
</Sidebar>
```

Fixed 260px wide, 100vh tall, 24px/16px padding. `header` sits at the top and `footer` is pinned to the bottom (account, settings).

## Accessibility
Renders an `<aside>` by default. When the rail is navigation, or when it sits inside `<main>`, use `as="nav"` with an `aria-label`. The active item gets `aria-current="page"`.
