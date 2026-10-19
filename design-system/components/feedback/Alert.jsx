import React from 'react';
import { resolveElement, colorFromVariant } from '../elements.js';

export function Alert({ element, variant, icon, title, role = 'status', children, className = '', ...rest }) {
  const el = resolveElement(colorFromVariant('Alert', variant, element).element, 'fire');
  return (
    <div className={['alert', 'alert-' + el, className].filter(Boolean).join(' ')} role={role} {...rest}>
      {icon}
      <div>
        {title && <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem' }}>{title}</p>}
        {children && <p style={{ margin: title ? '0.125rem 0 0' : 0, fontSize: title ? '0.75rem' : 'inherit', color: title ? 'var(--color-text-secondary)' : 'inherit' }}>{children}</p>}
      </div>
    </div>
  );
}
