import React from 'react';
import { resolveElement } from '../elements.js';

export function Textarea({ label, element = 'fire', rows = 3, className = '', id, ...rest }) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const tint = 'field-' + resolveElement(element, 'fire');
  const field = <textarea id={fieldId} rows={rows} className={['textarea', !label && tint, className].filter(Boolean).join(' ')} {...rest} />;
  if (!label) return field;
  return (
    <div className={['field', tint].join(' ')}>
      <label htmlFor={fieldId} className="field-label">{label}</label>
      {field}
    </div>
  );
}
