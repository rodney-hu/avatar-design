import React from 'react';
import { Checkbox } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Elements = () => (
  <Stage><div style={col}>
    <Checkbox id="cb-fire" label="Ember Glow" defaultChecked />
    <Checkbox id="cb-avatar" element="avatar" label="Enable Avatar State" defaultChecked />
    <Checkbox id="cb-water" element="water" label="Sync with the tides" />
  </div></Stage>
);

export const Disabled = () => (
  <Stage><div style={col}>
    <Checkbox id="cb-dis" label="Sealed by the Order" disabled defaultChecked />
  </div></Stage>
);
