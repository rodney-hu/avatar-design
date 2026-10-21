import React from 'react';
import { Select } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Default = () => (
  <Stage><div style={col}>
    <Select id="sel-element" element="water" label="Primary Element" options={['Firebending', 'Waterbending', 'Earthbending', 'Airbending']} />
    <Select id="sel-nation" label="Home Nation" hint="Where your training began." options={['Fire Nation', 'Water Tribes', 'Earth Kingdom', 'Air Nomads']} />
  </div></Stage>
);

export const Invalid = () => (
  <Stage><div style={col}>
    <Select id="sel-err" label="Mentor" required error="Choose a mentor to continue." options={['Choose…', 'Iroh', 'Pakku', 'Bumi', 'Gyatso']} />
  </div></Stage>
);
