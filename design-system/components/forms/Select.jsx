import React from 'react';
import { Field } from './Field.jsx';

export function Select({ label, hint, error, required, element = 'fire', underline = true, options = [], children, className = '', id, ...rest }) {
  return (
    <Field label={label} hint={hint} error={error} required={required} element={element} underline={underline} id={id}>
      <select className={['select', className].filter(Boolean).join(' ')} {...rest}>
        {children || options.map((o) => (
          <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
            {typeof o === 'string' ? o : o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
