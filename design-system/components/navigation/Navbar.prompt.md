Top-level site chrome; pair with NavLink children and Button actions.

```jsx
<Navbar brand={<span>AVATAR <b>DESIGN</b></span>}
        actions={<Button size="sm">Get Presets</Button>}>
  <NavLink href="#colors" active>Colors</NavLink>
</Navbar>
```

Sticks to the top at z-index 50 with a 12px backdrop blur. The brand links to `brandHref` (default `/`).

## Materials
Default is thick glass with a 1px top highlight. Toggle `scrolled` once `window.scrollY > 8` to drop an elevation-2 shadow.

## Accessibility
Renders as a `<header>` landmark with a `<nav>` inside. Mark the current link with `active` so it gets `aria-current="page"`.
