import React from 'react';
import { resolveElement, colorFromVariant } from '../elements.js';

/* onDismiss adds a close button; the caller removes the alert. */
export function Alert({ element, variant, icon, title, role = 'status', onDismiss, children, className = '', ...rest }) {
  const el = resolveElement(colorFromVariant('Alert', variant, element).element, 'fire');
  return (
    <div className={['alert', 'alert-' + el, className].filter(Boolean).join(' ')} role={role} {...rest}>
      {icon}
      <div className="alert-content">
        {title && <p className="alert-title">{title}</p>}
        {children && <p className="alert-body">{children}</p>}
      </div>
      {onDismiss && <button type="button" className="alert-close" aria-label="Dismiss" onClick={onDismiss}>×</button>}
    </div>
  );
}
