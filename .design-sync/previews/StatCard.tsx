import React from 'react';
import { StatCard } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Dashboard = () => (
  <Stage><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
    <StatCard element="fire" label="Fire Power Index" value="98.4%" delta="↑ +14.2% Comet boost" countUp={false} />
    <StatCard element="water" label="Oceanic Flow Rate" value="1,420 L/s" delta="Full Moon Alignment" countUp={false} />
    <StatCard element="earth" label="Seismic Density" value="840 MPa" delta="Ground vibration stable" countUp={false} />
    <StatCard element="air" label="Air Velocity" value="120 km/h" delta="Glider lift optimal" countUp={false} />
  </div></Stage>
);

export const Single = () => (
  <Stage><div style={{ maxWidth: 280 }}>
    <StatCard element="avatar" label="Spirit World Visits" value="37" delta="↑ 3 this moon" countUp={false} />
  </div></Stage>
);
