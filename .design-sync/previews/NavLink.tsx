import React from 'react';
import { NavLink } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const States = () => (
  <Stage><nav style={{ ...row, gap: '1.5rem' }}>
    <NavLink href="#" active>Overview</NavLink>
    <NavLink href="#">Components</NavLink>
    <NavLink href="#">Data</NavLink>
    <NavLink href="#">Landing</NavLink>
  </nav></Stage>
);
