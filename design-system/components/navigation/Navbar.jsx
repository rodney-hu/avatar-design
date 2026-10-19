import React from 'react';

export function Navbar({ brand, brandHref = '/', children, actions, glass = true, scrolled = false, className = '', ...rest }) {
  const cls = ['navbar', glass && 'glass-thick', scrolled ? 'elevation-2' : 'navbar-edge', className];
  return (
    <header className={cls.filter(Boolean).join(' ')} {...rest}>
      <a href={brandHref} className="nav-brand">{brand}</a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>{children}</nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>{actions}</div>
    </header>
  );
}
