import React from 'react';

export function Breadcrumb({ items = [], separator = '/', className = '', ...rest }) {
  return (
    <nav className={['breadcrumb', className].filter(Boolean).join(' ')} aria-label="Breadcrumb" {...rest}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden="true">{separator}</span>}
          {item.href && i < items.length - 1
            ? <a className="breadcrumb-item" href={item.href}>{item.label}</a>
            : <span style={{ color: 'var(--color-text-primary)' }} aria-current={i === items.length - 1 ? 'page' : undefined}>{item.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
