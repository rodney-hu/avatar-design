import React from 'react';
import { Tooltip, Button } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

// The bubble shows on hover or keyboard focus; autoFocus opens it statically.
export const Open = () => (
  <Stage><div style={{ ...row, justifyContent: 'center', padding: '3rem 1rem 1rem' }}>
    <Tooltip text="Secondary action, fire outline on hover"><Button variant="outline" autoFocus>Outline</Button></Tooltip>
  </div></Stage>
);

export const Bottom = () => (
  <Stage><div style={{ ...row, justifyContent: 'center', padding: '1rem 1rem 3rem' }}>
    <Tooltip side="bottom" text="Opens the archive in a new scroll"><Button element="water" autoFocus>Archive</Button></Tooltip>
  </div></Stage>
);
