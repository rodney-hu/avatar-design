import React from 'react';
import { Sidebar, SidebarItem } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const States = () => (
  <Stage>
    <Sidebar style={{ height: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
      <SidebarItem active>Overview (active)</SidebarItem>
      <SidebarItem>Scrolls</SidebarItem>
      <SidebarItem>Masters</SidebarItem>
    </Sidebar>
  </Stage>
);
