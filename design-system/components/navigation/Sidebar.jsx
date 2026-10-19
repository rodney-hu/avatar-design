import React from 'react';

export function Sidebar({ as: Tag = 'aside', header, footer, children, className = '', style, ...rest }) {
  return (
    <Tag className={['sidebar', className].filter(Boolean).join(' ')} style={style} {...rest}>
      {header}
      <div className="sidebar-body">{children}</div>
      {footer}
    </Tag>
  );
}
