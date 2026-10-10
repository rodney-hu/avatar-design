CSS-only hover label; wrap the trigger.

```jsx
<Tooltip text="Avatar State cycles all four elements"><Button variant="avatar" size="sm">Avatar</Button></Tooltip>
```

Always positioned above the trigger, single line (`white-space: nowrap`) — keep the text short.

## Motion
There's a 120ms hover delay before the label enters, and it leaves immediately. Use `side="bottom"` when there's no room above. The label also shows on keyboard focus.
