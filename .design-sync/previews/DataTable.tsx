import React from 'react';
import { DataTable, Badge } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;

export const BendingMasters = () => (
  <Stage>
  <DataTable
    caption="Bending masters"
    columns={['Master', 'Affiliation', 'Specialty', 'Status']}
    rows={[
      [<span style={{ fontWeight: 600, color: 'var(--fire-text)' }}>Zuko</span>, 'Fire Nation', 'Lightning Redirection', <Badge element="fire">Active Fire Lord</Badge>],
      [<span style={{ fontWeight: 600, color: 'var(--water-text)' }}>Katara</span>, 'Southern Water Tribe', 'Bloodbending / Healing', <Badge element="water">Grandmaster</Badge>],
      [<span style={{ fontWeight: 600, color: 'var(--earth-text)' }}>Toph Beifong</span>, 'Earth Kingdom', 'Metalbending Creator', <Badge element="earth">Chief of Police</Badge>],
      [<span style={{ fontWeight: 600, color: 'var(--air-text)' }}>Aang</span>, 'Air Nomads', 'Energybending', <Badge element="avatar">Avatar State</Badge>],
    ]}
  />
  </Stage>
);

export const Empty = () => (
  <Stage>
  <DataTable
    caption="Pending scrolls"
    columns={['Scroll', 'Nation', 'Requested by']}
    rows={[]}
    empty="No scrolls awaiting review."
  />
  </Stage>
);
