A button that opens a short list of actions, for overflow actions on a card, row or toolbar. Built on the `.popover` surface.

```jsx
<Menu label="Scroll actions" items={[
  { label: 'Copy to archive', onSelect: copy },
  { label: 'Share with the Order', onSelect: share },
  { label: 'Burn (sealed)', disabled: true },
]} />
```

- `label` is the trigger text and the menu's name. The default trigger is an outline Button with a ▾.
- `items` are `{ label, onSelect, disabled }`. Choosing one closes the menu, returns focus to the trigger, then calls `onSelect`.
- `element` tints the trigger's hover and the items' hover (default fire).
- `side` opens it below (default) or above; `align` lines it up with the trigger's start (default) or end edge.
- `trigger` swaps in your own element; it receives the ARIA and event props.

Use it for actions, not navigation; for links, use NavLink or SidebarItem.

## Micro-interactions
The popover grows from the edge that touches the trigger and shrinks back on close.

## Accessibility
Follows the WAI-ARIA menu button pattern. The trigger has `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`; the list is `role="menu"` with `role="menuitem"` buttons. Enter, Space or ↓ opens it on the first item and ↑ on the last. Arrow keys move and wrap, Home and End jump to the ends, and Escape closes it and returns focus to the trigger. Tab closes it and moves on, and a click outside closes it. Disabled items are skipped by the arrow keys.
