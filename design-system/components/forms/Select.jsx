import React from 'react';

export function Select({ label, options = [], children, className = '', id, ...rest }) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const field = (
    <select id={fieldId} className={['select', className].filter(Boolean).join(' ')} {...rest}>
      {children || options.map((o) => (
        <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
          {typeof o === 'string' ? o : o.label}
        </option>
      ))}
    </select>
  );
  if (!label) return field;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <label htmlFor={fieldId} className="stat-label" style={{ fontSize: '0.75rem' }}>{label}</label>
      {field}
    </div>
  );
}
