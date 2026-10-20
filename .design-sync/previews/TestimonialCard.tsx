import React from 'react';
import { TestimonialCard } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Quote = () => (
  <Stage><div style={{ maxWidth: 720 }}>
    <TestimonialCard
      quote="Water is the element of change. Earth is the element of substance. Fire is the element of power. Air is the element of freedom."
      author="Iroh" role="Order of the White Lotus"
    />
  </div></Stage>
);
