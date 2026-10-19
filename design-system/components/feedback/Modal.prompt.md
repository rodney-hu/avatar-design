Centered dialog over a blurred black backdrop — the system's only overlay surface.

```jsx
<Modal open={open} title="Firebending Scroll" onClose={close}
  footer={<><Button variant="ghost" size="sm" onClick={close}>Cancel</Button><Button size="sm">Accept Flame</Button></>}>
  Fire is the element of power.
</Modal>
```

540px max width, 12px radius, fire border with the fire shadow; enters with `animate-scale-in`.

## Materials
Default is thick glass (28px blur) with a lit gradient edge, elevation 4 and the fire glow. Pass `glass={false}` for a solid elevated surface when the content behind is busy.

## Motion
On open, the backdrop fades in, the surface rises 16px and scales from 0.97, and the header, body and footer follow one beat apart. Setting `open={false}` plays the exit (expo-in, about 350ms) before unmounting, so keep the component mounted and toggle `open`. Don't conditionally render it. Escape closes it.

## Accessibility
On open, focus moves to the first control inside the dialog and Tab / Shift+Tab stay inside it. The page behind stops scrolling. On close, focus returns to the element that opened it. The `title` names the dialog; with no title, pass `aria-label`.
