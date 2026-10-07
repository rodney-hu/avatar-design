import React from 'react';

const RGB = { fire: 'var(--fire-500-rgb)', water: 'var(--water-500-rgb)', earth: 'var(--earth-500-rgb)', air: 'var(--air-500-rgb)' };

export function Checkbox({ label, id, element = 'fire', className = '', ...rest }) {
  return (
    <label htmlFor={id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9375rem' }}>
      <span className="check" style={{ '--field-rgb': RGB[element] }}>
        <input id={id} type="checkbox" className={['checkbox', className].filter(Boolean).join(' ')} {...rest} />
        <svg className="check-mark" viewBox="0 0 16 16" aria-hidden="true"><path pathLength="1" d="M3.5 8.5l3 3 6-7"></path></svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
