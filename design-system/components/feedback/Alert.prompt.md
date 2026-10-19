Inline status callout — also the toast body (the showcase reuses `.alert` inside its toast stack).

```jsx
<Alert element="earth" title="Defenses fortified">Walls held at Ba Sing Se.</Alert>
```

Use status names for meaning: `success` (earth), `warning` (air), `info` (water) and `danger` (its own tokens, fire by default). Any element works too, including `avatar`. `icon` takes an optional leading node (the system ships no icon set). `variant` is the old name for `element` and is deprecated. For a toast, render it fixed bottom-right with `animate-scale-in`.

## As a toast
Use the stack structure so neighbours glide when toasts arrive or leave:
```jsx
<div className="toast-stack">
  {toasts.map(t => (
    <div key={t.id} className="toast-slot" data-state={t.closing ? 'closed' : 'open'}>
      <div className="toast-slot-inner"><div className="toast-pad">
        <Alert className="toast" element="fire" title="Saved">Changes stored.</Alert>
      </div></div>
    </div>
  ))}
</div>
```
To dismiss, set `closing`, then remove it after 600ms.

## Accessibility
Alerts render `role="status"` by default, so screen readers announce new ones without interrupting. Pass `role="alert"` only for urgent errors. Wrap a toast stack in `role="region" aria-label="Notifications"` so it sits in a landmark.
