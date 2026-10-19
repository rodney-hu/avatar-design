import React from 'react';
import { resolveElement } from '../elements.js';

export function Input({ label, element = 'fire', underline = true, className = '', id, ...rest }) {
  const autoId = React.useId();
  const inputId = id || autoId;
  const tint = 'field-' + resolveElement(element, 'fire');
  if (!label && !underline) return <input id={inputId} className={['input', tint, className].filter(Boolean).join(' ')} {...rest} />;
  const input = <input id={inputId} className={['input', className].filter(Boolean).join(' ')} {...rest} />;
  const control = underline ? <span className="field-control">{input}<span className="field-line" aria-hidden="true"></span></span> : input;
  return (
    <div className={['field', tint].join(' ')}>
      {label && <label htmlFor={inputId} className="field-label">{label}</label>}
      {control}
    </div>
  );
}
