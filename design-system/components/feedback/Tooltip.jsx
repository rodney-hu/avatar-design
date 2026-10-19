import React from 'react';

/* The bubble is linked to its trigger with aria-describedby, shows on hover
   and keyboard focus, and Escape hides it until the pointer or focus leaves. */
export function Tooltip({ text, side = 'top', children, className = '', ...rest }) {
  const tipId = React.useId();
  const [dismissed, setDismissed] = React.useState(false);
  const single = React.isValidElement(children);
  const trigger = single
    ? React.cloneElement(children, { 'aria-describedby': [children.props['aria-describedby'], tipId].filter(Boolean).join(' ') })
    : <span tabIndex={0} aria-describedby={tipId}>{children}</span>;
  return (
    <span
      className={['tooltip', className].filter(Boolean).join(' ')}
      data-side={side}
      data-dismissed={dismissed ? '' : undefined}
      onKeyDown={(e) => { if (e.key === 'Escape') setDismissed(true); }}
      onMouseLeave={() => setDismissed(false)}
      onBlur={() => setDismissed(false)}
      {...rest}
    >
      {trigger}
      <span className="tooltip-text" role="tooltip" id={tipId}>{text}</span>
    </span>
  );
}
