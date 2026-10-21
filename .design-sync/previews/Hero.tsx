import React from 'react';
import { Hero, Badge, Button } from '@elemental-ui/design-system';

const bg: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' };

export const Landing = () => (
  <div style={bg}>
    <Hero
      element="fire"
      eyebrow={<>
        <Badge element="fire">Fire Primary</Badge>
        <Badge element="water">Water</Badge>
        <Badge element="earth">Earth</Badge>
        <Badge element="air">Air</Badge>
        <Badge element="avatar">Avatar State</Badge>
      </>}
      title={<>Harness the Elements<br />in Your UI</>}
      subtitle="A complete dark-theme design system. Token-driven surfaces, elemental glows, and pre-built components for SaaS, landing pages, and web applications."
      actions={<>
        <Button size="lg">Unleash Toast</Button>
        <Button variant="outline" size="lg">Open Bending Modal</Button>
      </>}
    />
  </div>
);

export const Water = () => (
  <div style={bg}>
    <Hero
      element="water"
      title="Flow Like the Tides"
      subtitle="Every element ships its own halo, glow and accent ramp."
      actions={<Button element="water" size="lg">Enter the Oasis</Button>}
    />
  </div>
);
