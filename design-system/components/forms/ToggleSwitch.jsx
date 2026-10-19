import React from 'react';
import { resolveElement } from '../elements.js';

/* One <label> wraps the input, slider and text, so the visible text is the
   switch's accessible name. role="switch" makes it announce as on/off. */
export function ToggleSwitch({ label, element = 'fire', id, className = '', ...rest }) {
  const autoId = React.useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={['toggle-field', className].filter(Boolean).join(' ')}>
      {label && <span className="toggle-label">{label}</span>}
      <span className={'toggle-switch field-' + resolveElement(element, 'fire')}>
        <input id={inputId} type="checkbox" role="switch" {...rest} />
        <span className="toggle-slider" aria-hidden="true"></span>
      </span>
    </label>
  );
}
