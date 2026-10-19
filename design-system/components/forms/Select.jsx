import React from 'react';
import { resolveElement } from '../elements.js';

export function Select({ label, element = 'fire', options = [], children, className = '', id, ...rest }) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const tint = 'field-' + resolveElement(element, 'fire');
  const field = (
    <select id={fieldId} className={['select', !label && tint, className].filter(Boolean).join(' ')} {...rest}>
      {children || options.map((o) => (
        <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
          {typeof o === 'string' ? o : o.label}
        </option>
      ))}
    </select>
  );
  if (!label) return field;
  return (
    <div className={['field', tint].join(' ')}>
      <label htmlFor={fieldId} className="field-label">{label}</label>
      {field}
    </div>
  );
}
