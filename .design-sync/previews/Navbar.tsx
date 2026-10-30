import React from 'react';
import { Navbar, NavLink, Button } from '@elemental-ui/design-system';

const brand = <span style={{ letterSpacing: 'var(--tracking-brand)' }}>AVATAR <span style={{ color: 'var(--fire-link)', fontWeight: 800 }}>DESIGN</span></span>;
const bg: React.CSSProperties = { background: 'var(--color-surface-void)', fontFamily: 'var(--font-body)', paddingBottom: '1.5rem' };

const Bar = ({ scrolled = false }: { scrolled?: boolean }) => (
  <div style={bg}>
    <Navbar
      scrolled={scrolled}
      brand={brand}
      actions={<>
        <Button variant="outline" size="sm">Light Mode</Button>
        <Button size="sm">Get Presets</Button>
      </>}
    >
      <NavLink href="#" active>Overview</NavLink>
      <NavLink href="#">Components</NavLink>
      <NavLink href="#">Data</NavLink>
      <NavLink href="#">Landing</NavLink>
    </Navbar>
  </div>
);

export const Default = () => <Bar />;
export const Scrolled = () => <Bar scrolled />;
