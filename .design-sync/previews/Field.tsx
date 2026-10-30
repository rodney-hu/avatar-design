import React from 'react';
import { Field } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Default = () => (
  <Stage><div style={col}>
    <Field id="f-date" label="Ceremony Date" hint="Days start at dawn." required>
      <input type="date" className="input" defaultValue="2026-10-21" />
    </Field>
    <Field id="f-count" label="Students" element="water">
      <input type="number" className="input" defaultValue={12} />
    </Field>
  </div></Stage>
);

export const Invalid = () => (
  <Stage><div style={col}>
    <Field id="f-err" label="Ceremony Date" error="The comet passes before this date." required>
      <input type="date" className="input" defaultValue="2026-08-01" />
    </Field>
  </div></Stage>
);
