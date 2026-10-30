import React from 'react';
import { Badge } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Elements = () => (
  <Stage><div style={row}>
    <Badge element="fire">Fire Nation</Badge>
    <Badge element="water">Water Tribe</Badge>
    <Badge element="earth">Earth Kingdom</Badge>
    <Badge element="air">Air Nomads</Badge>
    <Badge element="avatar">Avatar State</Badge>
  </div></Stage>
);

export const StatusNames = () => (
  <Stage><div style={row}>
    <Badge element="success">Success</Badge>
    <Badge element="warning">Warning</Badge>
    <Badge element="info">Info</Badge>
    <Badge element="danger">Danger</Badge>
  </div></Stage>
);
