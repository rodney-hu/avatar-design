import React from 'react';
import { Button } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };

export const Elements = () => (
  <Stage>
  <div style={row}>
    <Button element="fire">Fire</Button>
    <Button element="water">Water</Button>
    <Button element="earth">Earth</Button>
    <Button element="air">Air</Button>
    <Button element="avatar">Avatar</Button>
  </div>
  </Stage>
);

export const Styles = () => (
  <Stage>
  <div style={row}>
    <Button>Enter Temple</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost Link</Button>
    <Button element="danger" variant="outline">Delete scroll</Button>
  </div>
  </Stage>
);

export const Sizes = () => (
  <Stage>
  <div style={row}>
    <Button size="lg">Large Fire</Button>
    <Button>Medium Fire</Button>
    <Button size="sm">Small Fire</Button>
  </div>
  </Stage>
);

export const States = () => (
  <Stage>
  <div style={row}>
    <Button loading>Save Profile</Button>
    <Button disabled>Disabled</Button>
    <Button element="water" fullWidth>Visit Sanctuary</Button>
  </div>
  </Stage>
);
