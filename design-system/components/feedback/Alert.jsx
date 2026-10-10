import React from 'react';

const VARIANTS = { fire: 'alert-fire', water: 'alert-water', earth: 'alert-earth', air: 'alert-air' };

export function Alert({ variant = 'fire', icon, title, children, className = '', ...rest }) {
  return (
    <div className={['alert', VARIANTS[variant], className].filter(Boolean).join(' ')} {...rest}>
      {icon}
      <div>
        {title && <h4 style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem' }}>{title}</h4>}
        {children && <p style={{ margin: title ? '0.125rem 0 0' : 0, fontSize: title ? '0.75rem' : 'inherit', color: title ? 'var(--color-text-secondary)' : 'inherit' }}>{children}</p>}
      </div>
    </div>
  );
}
