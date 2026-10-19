import React from 'react';

export function DataTable({ columns = [], rows = [], caption, empty = 'Nothing here yet.', className = '', ...rest }) {
  return (
    <table className={['data-table', className].filter(Boolean).join(' ')} {...rest}>
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr>{columns.map((c, i) => <th key={i} scope="col">{typeof c === 'string' ? c : c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.length === 0
          ? <tr><td className="data-table-empty" colSpan={Math.max(columns.length, 1)}>{empty}</td></tr>
          : rows.map((row, r) => (
            <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>
          ))}
      </tbody>
    </table>
  );
}
