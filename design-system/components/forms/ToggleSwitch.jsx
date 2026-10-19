import React from 'react';

/* One <label> wraps the input, slider and text, so the visible text is the
   switch's accessible name. role="switch" makes it announce as on/off. */
export function ToggleSwitch({ label, id, className = '', ...rest }) {
  const autoId = React.useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={['toggle-field', className].filter(Boolean).join(' ')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
      {label && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</span>}
      <span className="toggle-switch">
        <input id={inputId} type="checkbox" role="switch" {...rest} />
        <span className="toggle-slider" aria-hidden="true"></span>
      </span>
    </label>
  );
}
