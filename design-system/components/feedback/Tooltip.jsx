import React from 'react';

export function Tooltip({ text, side = 'top', children, className = '', ...rest }) {
  return (
    <span className={['tooltip', className].filter(Boolean).join(' ')} data-side={side} {...rest}>
      {children}
      <span className="tooltip-text" role="tooltip">{text}</span>
    </span>
  );
}
