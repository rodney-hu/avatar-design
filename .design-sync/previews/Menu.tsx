import React from 'react';
import { Menu } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

const items = [
  { label: 'Copy to archive', onSelect: () => {} },
  { label: 'Share with the Order', onSelect: () => {} },
  { label: 'Burn (sealed)', disabled: true },
];

// Opens the menu on mount by clicking its own trigger, so the card shows the list.
const OpenOnMount = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { ref.current?.querySelector<HTMLButtonElement>('button[aria-expanded]')?.click(); }, []);
  return <div ref={ref} style={{ minHeight: 220 }}>{children}</div>;
};

export const Open = () => (
  <Stage><OpenOnMount><Menu label="Scroll actions" items={items} /></OpenOnMount></Stage>
);

export const Closed = () => (
  <Stage><div style={row}>
    <Menu label="Scroll actions" items={items} />
    <Menu label="Water rites" element="water" items={items} />
  </div></Stage>
);
