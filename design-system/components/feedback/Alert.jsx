import React from 'react';
import { resolveElement, colorFromVariant } from '../elements.js';

export function Alert({ element, variant, icon, title, role = 'status', children, className = '', ...rest }) {
  const el = resolveElement(colorFromVariant('Alert', variant, element).element, 'fire');
  return (
    <div className={['alert', 'alert-' + el, className].filter(Boolean).join(' ')} role={role} {...rest}>
      {icon}
      <div>
        {title && <p className="alert-title">{title}</p>}
        {children && <p className="alert-body">{children}</p>}
      </div>
    </div>
  );
}
