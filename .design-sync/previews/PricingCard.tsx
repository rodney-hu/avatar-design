import React from 'react';
import { PricingCard, Badge, Button } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Tiers = () => (
  <Stage><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '2rem', alignItems: 'center' }}>
    <PricingCard
      tier={<Badge element="air" style={{ width: 'fit-content' }}>Initiate</Badge>}
      name="Air Nomad" price="$19"
      description="Essential bending tokens and basic components."
      features={['Core tokens', 'Buttons & forms', 'Community support']}
      action={<Button variant="outline" fullWidth>Start Free Trial</Button>}
    />
    <PricingCard
      featured
      ribbon={<Badge element="fire">Most Popular</Badge>}
      tier={<Badge element="fire" style={{ width: 'fit-content' }}>Fire Master</Badge>}
      name="Fire Nation Pro" price="$49"
      description="Full elemental component suite, glowing effects and the Tailwind v4 preset."
      features={['Every component', 'Glow & motion system', 'Priority support']}
      action={<Button fullWidth>Unlock Full Power</Button>}
    />
    <PricingCard
      tier={<Badge element="avatar" style={{ width: 'fit-content' }}>Avatar</Badge>}
      name="Avatar Enterprise" price="$149"
      description="Custom element styling and dedicated support."
      features={['Custom palettes', 'Design reviews', 'Dedicated channel']}
      action={<Button variant="outline" fullWidth>Contact White Lotus</Button>}
    />
  </div></Stage>
);
