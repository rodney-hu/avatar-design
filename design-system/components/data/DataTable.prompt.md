Dense record list; cells accept nodes so status columns can hold a Badge.

```jsx
<DataTable columns={['Master','Affiliation','Status']}
  rows={[['Ember Hale','Fire',<Badge element="fire">Lead</Badge>]]} />
```

Renders `.data-table` (`.table-elemental` still works as the old name). Rows raise their background on hover; the last row drops its bottom border. With no rows, the table shows `empty` (default "Nothing here yet.") in one centered row, so a filter that matches nothing still reads as a table.

## Accessibility
Header cells carry `scope="col"`. Pass a short `caption` so screen readers can name the table.
