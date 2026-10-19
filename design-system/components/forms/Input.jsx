import React from 'react';
import { Field } from './Field.jsx';

export function Input({ label, hint, error, required, element = 'fire', underline = true, className = '', id, ...rest }) {
  return (
    <Field label={label} hint={hint} error={error} required={required} element={element} underline={underline} id={id}>
      <input className={['input', className].filter(Boolean).join(' ')} {...rest} />
    </Field>
  );
}
