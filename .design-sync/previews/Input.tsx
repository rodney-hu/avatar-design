import React from 'react';
import { Input } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 360 };

export const Default = () => (
  <Stage>
  <div style={col}>
    <Input id="avatar-name" label="Avatar Name" defaultValue="Aang" placeholder="e.g. Aang, Korra, Roku" />
    <Input id="avatar-empty" label="Successor" placeholder="e.g. Aang, Korra, Roku" />
  </div>
  </Stage>
);

export const Elements = () => (
  <Stage>
  <div style={col}>
    <Input id="in-water" element="water" label="Tribe (focused)" defaultValue="Southern Water Tribe" autoFocus />
    <Input id="in-earth" element="earth" label="City" defaultValue="Ba Sing Se" />
    <Input id="in-air" element="air" label="Temple" defaultValue="Northern Air Temple" />
  </div>
  </Stage>
);

export const Validation = () => (
  <Stage>
  <div style={col}>
    <Input id="bender-name" label="Bender Name" required defaultValue="Zuko" error="That name is already taken." />
    <Input id="bender-title" label="Title" hint="Shown under your name on the roster." placeholder="Fire Lord" />
  </div>
  </Stage>
);

export const Plain = () => (
  <Stage>
  <div style={col}>
    <Input id="in-plain" underline={false} label="Search scrolls" placeholder="Search the archive…" />
    <Input id="in-disabled" label="Nation" defaultValue="Fire Nation" disabled />
  </div>
  </Stage>
);
