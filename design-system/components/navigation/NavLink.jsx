import React from 'react';

export function NavLink({ active = false, children, className = '', ...rest }) {
  return (
    <a className={['nav-link', active && 'nav-link-active', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </a>
  );
}
