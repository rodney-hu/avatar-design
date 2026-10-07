import React from 'react';

export function SidebarItem({ active = false, icon, children, className = '', ...rest }) {
  return (
    <a className={['sidebar-item', active && 'sidebar-item-active', className].filter(Boolean).join(' ')} {...rest}>
      {icon}
      <span>{children}</span>
    </a>
  );
}
