import React from 'react';

const VARIANTS = { fire: 'btn-fire', water: 'btn-water', earth: 'btn-earth', air: 'btn-air', avatar: 'btn-avatar', outline: 'btn-outline', ghost: 'btn-ghost' };
const SIZES = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

export function Button({ variant = 'fire', size = 'md', iconOnly = false, fullWidth = false, sheen = true, burst = true, as = 'button', children, className = '', style, ...rest }) {
  const Tag = as;
  const cls = ['btn', VARIANTS[variant], SIZES[size], iconOnly && 'btn-icon', !sheen && 'btn-no-sheen', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} style={fullWidth ? { width: '100%', ...style } : style} data-burst={burst ? undefined : 'off'} {...rest}>
      {children}
    </Tag>
  );
}
