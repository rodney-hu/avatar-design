import React from 'react';

const VARIANTS = { fire: 'badge-fire', water: 'badge-water', earth: 'badge-earth', air: 'badge-air', avatar: 'badge-avatar' };

export function Badge({ variant = 'fire', children, className = '', ...rest }) {
  return <span className={['badge', VARIANTS[variant], className].filter(Boolean).join(' ')} {...rest}>{children}</span>;
}
