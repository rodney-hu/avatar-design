import React from "react";
import { Badge } from "@ds/core/Badge.jsx";
import { Button } from "@ds/core/Button.jsx";
import { Card } from "@ds/core/Card.jsx";
import CodeBlock from "../CodeBlock.jsx";
import { PricingCard } from "@ds/marketing/PricingCard.jsx";
import { TestimonialCard } from "@ds/marketing/TestimonialCard.jsx";

export default function LandingBlocksScreen() {
  return (
    <main className="shell-main">
      <h1 className="sr-only">Landing blocks</h1>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="avatar">
        <div className="sec-head" data-reveal>
          <Badge variant="avatar" style={{ width: 'fit-content' }}>08. SaaS &amp; Landing Blocks</Badge>
          <h2>Pricing &amp; Testimonials</h2>
          <p>Pre-built landing page layouts designed for conversion.</p>
        </div>
        <div className="grid3" style={{ alignItems: 'center', gap: '2rem' }} data-stagger data-spotlight-group>
          <PricingCard
            tier={<Badge variant="air" style={{ width: 'fit-content' }}>Initiate</Badge>}
            name="Air Nomad" price="$19"
            description="Essential bending tokens and basic components."
            action={<Button variant="outline" fullWidth>Start Free Trial</Button>}
          />
          <PricingCard
            featured
            ribbon={<Badge variant="fire">Most Popular</Badge>}
            tier={<Badge variant="fire" style={{ width: 'fit-content' }}>Fire Master</Badge>}
            name="Fire Nation Pro" price="$49"
            description="Full elemental component suite, glowing effects and the Tailwind v4 preset."
            action={<Button fullWidth>Unlock Full Power</Button>}
          />
          <PricingCard
            tier={<Badge variant="avatar" style={{ width: 'fit-content' }}>Avatar</Badge>}
            name="Avatar Enterprise" price="$149"
            description="Custom element styling and dedicated support."
            action={<Button variant="outline" fullWidth>Contact White Lotus</Button>}
          />
        </div>
        <TestimonialCard
          data-reveal
          quote="Water is the element of change. Earth is the element of substance. Fire is the element of power. Air is the element of freedom."
          author="Iroh" role="Order of the White Lotus"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '4rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge variant="fire" style={{ width: 'fit-content' }}>09. Installation Guide</Badge>
          <h2>How to Use in Any Tailwind v4 Project</h2>
          <p>One CSS file unlocks the entire elemental system.</p>
        </div>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} data-reveal>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Add this import to your project's main stylesheet:</p>
          <CodeBlock>{'@import "tailwindcss";\n@import "./path/to/avatar-design/src/index.css";'}</CodeBlock>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>For reveal, tilt, spotlight, edge light, click bursts and page transitions, also load the motion runtime:</p>
          <CodeBlock>{'<script src="./path/to/avatar-design/design-system/assets/motion.js"></script>'}</CodeBlock>
        </Card>
      </section>
    </main>
  );
}

