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
          <Badge element="avatar" style={{ width: 'fit-content' }}>08. SaaS &amp; Landing Blocks</Badge>
          <h2>Pricing &amp; Testimonials</h2>
          <p>Pre-built landing page layouts designed for conversion.</p>
        </div>
        <div className="grid3" style={{ alignItems: 'center', gap: '2rem' }} data-stagger data-spotlight-group>
          <PricingCard
            tier={<Badge element="air" style={{ width: 'fit-content' }}>Initiate</Badge>}
            name="Air Starter" price="$19"
            description="Essential elemental tokens and basic components."
            action={<Button variant="outline" fullWidth>Start Free Trial</Button>}
          />
          <PricingCard
            featured
            ribbon={<Badge element="fire">Most Popular</Badge>}
            tier={<Badge element="fire" style={{ width: 'fit-content' }}>Fire Master</Badge>}
            name="Fire Pro" price="$49"
            description="Full elemental component suite, glowing effects and the Tailwind v4 preset."
            action={<Button fullWidth>Unlock Full Power</Button>}
          />
          <PricingCard
            tier={<Badge element="avatar" style={{ width: 'fit-content' }}>Elemental</Badge>}
            name="Elemental Enterprise" price="$149"
            description="Custom element styling and dedicated support."
            action={<Button variant="outline" fullWidth>Contact Sales</Button>}
          />
        </div>
        <TestimonialCard
          data-reveal
          quote="Water is the element of change. Earth is the element of substance. Fire is the element of power. Air is the element of freedom."
          author="Maya Ortiz" role="Studio Lead"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '4rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge element="fire" style={{ width: 'fit-content' }}>09. Installation Guide</Badge>
          <h2>How to Use in Any Tailwind v4 Project</h2>
          <p>One CSS file unlocks the entire elemental system.</p>
        </div>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} data-reveal>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Add this import to your project's main stylesheet:</p>
          <CodeBlock>{'@import "tailwindcss";\n@import "./path/to/elemental-design/src/index.css";'}</CodeBlock>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>For reveal, tilt, spotlight, edge light, click bursts and page transitions, also load the motion runtime:</p>
          <CodeBlock>{'<script src="./path/to/elemental-design/design-system/assets/motion.js"></script>'}</CodeBlock>
        </Card>
      </section>
    </main>
  );
}

