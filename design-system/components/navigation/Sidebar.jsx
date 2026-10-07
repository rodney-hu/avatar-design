import React from 'react';

export function Sidebar({ header, footer, children, className = '', style, ...rest }) {
  return (
    <aside className={['sidebar', className].filter(Boolean).join(' ')} style={style} {...rest}>
      {header}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>{children}</div>
      {footer}
    </aside>
  );
}
