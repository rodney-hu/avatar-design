import React from 'react';

const ELEMENT = { fire: '', water: 'input-water', earth: 'input-earth', air: 'input-air' };

export function Input({ label, element = 'fire', underline = true, className = '', id, ...rest }) {
  const input = <input id={id} className={['input', ELEMENT[element], className].filter(Boolean).join(' ')} {...rest} />;
  const control = underline ? <span className="field-control">{input}<span className="field-line" aria-hidden="true"></span></span> : input;
  if (!label && !underline) return input;
  return (
    <div className={['field', element !== 'fire' && 'field-' + element].filter(Boolean).join(' ')}>
      {label && <label htmlFor={id} className="stat-label field-label" style={{ fontSize: '0.75rem' }}>{label}</label>}
      {control}
    </div>
  );
}
