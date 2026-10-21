import React from 'react';
import { Textarea } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Default = () => (
  <Stage><div style={col}>
    <Textarea id="ta-notes" element="earth" label="Scroll Notes" placeholder="Write ancient bending techniques..." />
    <Textarea id="ta-filled" label="Mission Log" rows={3} defaultValue="Crossed the Serpent's Pass at dawn. The fog lifted by midday." hint="Visible to the whole Order." />
  </div></Stage>
);

export const Invalid = () => (
  <Stage><div style={col}>
    <Textarea id="ta-err" label="Oath" required error="The oath cannot be empty." rows={3} />
  </div></Stage>
);
