import React from 'react';
import { Card, Badge, Button } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.25rem' };
const body: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.75rem' };
const h3: React.CSSProperties = { margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 };
const p: React.CSSProperties = { margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' };

export const ElementCards = () => (
  <Stage><div style={grid}>
    <Card element="fire" elevation={2} style={body}>
      <Badge element="fire" style={{ width: 'fit-content' }}>Fire Nation</Badge>
      <h3 style={h3}>Sun Warrior Temple</h3>
      <p style={p}>The original source of firebending power, guarded by the dragons Ran and Shaw.</p>
      <Button size="sm" fullWidth>Enter Temple</Button>
    </Card>
    <Card element="water" elevation={2} style={body}>
      <Badge element="water" style={{ width: 'fit-content' }}>Northern Tribe</Badge>
      <h3 style={h3}>Spirit Oasis</h3>
      <p style={p}>A sacred haven at the North Pole where Tui and La circle in eternal harmony.</p>
      <Button element="water" size="sm" fullWidth>Visit Sanctuary</Button>
    </Card>
    <Card variant="glass" elevation={2} style={body}>
      <Badge element="avatar" style={{ width: 'fit-content' }}>Glassmorphism</Badge>
      <h3 style={h3}>Cosmic Energy Overlay</h3>
      <p style={p}>Backdrop blur at 16px with glowing highlights.</p>
      <Button element="avatar" size="sm" fullWidth>Unlock Energy</Button>
    </Card>
  </div></Stage>
);

export const Elevation = () => (
  <Stage><div style={{ ...grid, gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
    {([0, 1, 2, 3, 4] as const).map((e) => (
      <Card key={e} elevation={e} style={body}><span className="stat-label">Elevation {e}</span><p style={p}>Ba Sing Se ring {e + 1}</p></Card>
    ))}
  </div></Stage>
);

export const Materials = () => (
  <Stage><div style={grid}>
    <Card edgeLight style={body}><h3 style={h3}>Edge light</h3><p style={p}>An orbiting light traces the border.</p></Card>
    <Card grain style={body}><h3 style={h3}>Film grain</h3><p style={p}>Subtle texture over the surface.</p></Card>
    <Card variant="raised" spotlight style={body}><h3 style={h3}>Raised</h3><p style={p}>A lighter surface for nested panels.</p></Card>
  </div></Stage>
);
