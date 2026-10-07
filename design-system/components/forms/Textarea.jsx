import React from 'react';

export function Textarea({ label, rows = 3, className = '', id, ...rest }) {
  const field = <textarea id={id} rows={rows} className={['textarea', className].filter(Boolean).join(' ')} {...rest} />;
  if (!label) return field;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <label htmlFor={id} className="stat-label" style={{ fontSize: '0.75rem' }}>{label}</label>
      {field}
    </div>
  );
}
