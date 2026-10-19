Dense record list; cells accept nodes so status columns can hold a Badge.

```jsx
<DataTable columns={['Master','Affiliation','Status']}
  rows={[['Zuko','Fire Nation',<Badge variant="fire">Fire Lord</Badge>]]} />
```

Rows raise their background on hover; the last row drops its bottom border.

## Accessibility
Header cells carry `scope="col"`. Pass a short `caption` so screen readers can name the table.
