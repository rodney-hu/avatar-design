import React from 'react';

export function DataTable({ columns = [], rows = [], className = '', ...rest }) {
  return (
    <table className={['table-elemental', className].filter(Boolean).join(' ')} {...rest}>
      <thead>
        <tr>{columns.map((c, i) => <th key={i}>{typeof c === 'string' ? c : c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
