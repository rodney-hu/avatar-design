Hover and focus label; wrap a single focusable trigger.

```jsx
<Tooltip text="Avatar State cycles all four elements"><Button element="avatar" size="sm">Avatar</Button></Tooltip>
```

Always positioned above the trigger, single line (`white-space: nowrap`) — keep the text short.

## Motion
There's a 120ms hover delay before the label enters, and it leaves immediately. Use `side="bottom"` when there's no room above. The label also shows on keyboard focus.

## Accessibility
The label is linked to the trigger with `aria-describedby`, so screen readers read it as the trigger's description. Escape hides it until the pointer or focus leaves. Wrap one focusable element (a Button or link); plain text is made focusable for you. Keep essential information out of tooltips.
