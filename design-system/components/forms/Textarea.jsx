import React from 'react';
import { Field } from './Field.jsx';

export function Textarea({ label, hint, error, required, element = 'fire', underline = true, rows = 3, className = '', id, ...rest }) {
  return (
    <Field label={label} hint={hint} error={error} required={required} element={element} underline={underline} id={id}>
      <textarea rows={rows} className={['textarea', className].filter(Boolean).join(' ')} {...rest} />
    </Field>
  );
}
