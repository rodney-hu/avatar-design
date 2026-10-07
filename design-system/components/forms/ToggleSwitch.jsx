import React from 'react';

export function ToggleSwitch({ label, id, ...rest }) {
  const control = (
    <label className="toggle-switch">
      <input id={id} type="checkbox" {...rest} />
      <span className="toggle-slider"></span>
    </label>
  );
  if (!label) return control;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</span>
      {control}
    </span>
  );
}
