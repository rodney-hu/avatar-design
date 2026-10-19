Top-level site chrome; pair with NavLink children and Button actions.

```jsx
<Navbar brand={<span>AVATAR <b>DESIGN</b></span>}
        actions={<Button size="sm">Get Presets</Button>}>
  <NavLink href="#colors" active>Colors</NavLink>
</Navbar>
```

Sticks to the top at z-index 50 with a 12px backdrop blur.

## Small screens
Below 900px the `children` and `actions` fold into a panel under the bar, opened by a Menu toggle (three bars that turn into an ×). Links stack full width and the actions wrap underneath. The panel closes when a link is chosen, on Escape, or when the window grows past 900px. Nothing to configure; at 900px and up the bar is unchanged. The brand links to `brandHref` (default `/`).

## Materials
Default is thick glass with a 1px top highlight. Toggle `scrolled` once `window.scrollY > 8` to drop an elevation-2 shadow.

## Accessibility
Renders as a `<header>` landmark with a `<nav>` inside. Mark the current link with `active` so it gets `aria-current="page"`. On small screens the toggle is a button named "Menu" with `aria-expanded` and `aria-controls` pointing at the panel (the disclosure pattern); Escape closes the panel and returns focus to the toggle.
