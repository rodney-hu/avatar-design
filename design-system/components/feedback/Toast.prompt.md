Short confirmations that stack in the bottom-right corner and leave on their own. Built from `Alert`, so they take the same `element` colors and status names.

```jsx
const { toasts, push, dismiss } = useToasts();

<Button onClick={() => push({ element: 'success', title: 'Scroll saved', message: 'Copied to the archive.' })}>Save</Button>
<ToastStack toasts={toasts} onDismiss={dismiss} />
```

- `useToasts({ duration })` holds the list. `push(toast)` adds one and returns its id; each toast closes after `duration` ms (default 4000). A toast's own `duration` overrides it, and `0` keeps it until dismissed.
- A toast takes `element`, `title`, `message`, `duration` and an optional `id`; the hook manages `closing`.
- `dismiss(id)` plays the exit animation, then removes the toast.
- `ToastStack` renders the stack. Pass `onDismiss={dismiss}` to give each toast a close button.

Render one `ToastStack` per app, near the root. Keep toasts for confirmations of what the person just did; put errors that need action in an inline `Alert` instead.

## Micro-interactions
New toasts slide in from the right while the rows above glide up to make room. On close, the toast slides out and the gap closes behind it.

## Accessibility
The stack is a `role="region"` landmark named "Notifications", and each toast is an Alert with `role="status"`, so screen readers announce it politely. The close button is labelled "Dismiss". Toasts leave on their own, so never put the only copy of important information in one. With reduced motion on, toasts appear and leave without sliding.
