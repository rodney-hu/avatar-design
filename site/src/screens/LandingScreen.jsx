import React from "react";
import { Hero } from "@ds/marketing/Hero.jsx";
import { Badge } from "@ds/core/Badge.jsx";
import { Button } from "@ds/core/Button.jsx";
import { Card } from "@ds/core/Card.jsx";

const RAMP = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const DARK_TEXT = { fire: [50, 100, 200, 300], water: [50, 100, 200, 300], earth: [50, 100, 200, 300, 400], air: [50, 100, 200, 300, 400, 500] };

/* The palette specimen documents the TRUE ramps, so it reads literal hexes
   rather than the tokens — the Brand tweak repoints --color-fire-* and would
   otherwise make this section state the wrong values. Keep in sync with
   tokens/colors.css. */
const RAMPS = {
  fire:  ['#fff2f2','#ffd6d6','#ffa3a3','#f76d6d','#dd3333','#aa0000','#8f0000','#6e0000','#4d0000','#2e0000'],
  water: ['#f0f9ff','#cce8ff','#8ecfff','#4db8ff','#1aa3ff','#0088e0','#006db3','#005289','#003a63','#00243d'],
  earth: ['#f0fff4','#c6f6d5','#88e8a0','#4cd964','#2ecc40','#27ae34','#1f8c2a','#186b20','#114e18','#0a3010'],
  air:   ['#fffef5','#fff8cc','#ffed8a','#ffe048','#ffd700','#e6bf00','#b89700','#8a7100','#5c4b00','#3a3000'],
};

function Ramp({ family }) {
  return (
    <div className="ramp10">
      {RAMP.map((step, i) => (
        <div key={step}>
          <div className="swatch" style={{
            background: RAMPS[family][i],
            color: DARK_TEXT[family].includes(step) ? '#000' : '#fff',
            border: step === 50 ? '1px solid var(--color-border-subtle)' : undefined,
          }}>{step >= 200 ? step : ''}</div>
          <div className="ckey">{step}{step === 500 && family === 'fire' ? ' (CTA)' : ''}</div>
        </div>
      ))}
    </div>
  );
}

function PaletteBlock({ family, title }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} data-reveal>
      <h3 className="brush" style={{ margin: 0, fontSize: '1.75rem' }}>{title}</h3>
      <Ramp family={family} />
    </div>
  );
}

export default function LandingScreen({ onToast, onModal }) {
  const [element, setElement] = React.useState('fire');
  const elements = ['fire', 'water', 'earth', 'air'];
  const labels = { fire: 'Fire Nation', water: 'Water Tribe', earth: 'Earth Kingdom', air: 'Air Nomads' };

  return (
    <>
      <Hero
        element={element}
        parallaxHalo
        className="animate-fade-in-up"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        eyebrow={<>
          <Badge variant="fire">Fire Primary</Badge>
          <Badge variant="water">Water</Badge>
          <Badge variant="earth">Earth</Badge>
          <Badge variant="air">Air</Badge>
          <Badge variant="avatar">Avatar State</Badge>
        </>}
        title={<>Harness the Elements<br />in Your UI</>}
        subtitle="A complete dark-theme design system. Token-driven surfaces, elemental glows, and pre-built components for SaaS, landing pages, and web applications."
        actions={<>
          <Button variant={element} size="lg" className="motion-gradient-drift-slow" onClick={onToast}>Unleash Toast</Button>
          <Button variant="outline" size="lg" onClick={onModal}>Open Bending Modal</Button>
        </>}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.5rem', background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-xl)' }}>
          <span className="stat-label" style={{ padding: '0 0.5rem', fontSize: '0.75rem' }}>Theme preview</span>
          {elements.map((e) => (
            <Button key={e} size="sm" variant={element === e ? e : 'ghost'} onClick={() => setElement(e)}>
              {labels[e]}
            </Button>
          ))}
        </div>
      </Hero>

      <main className="shell-main">
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} data-halo-bloom>
          <div className="sec-head" data-reveal>
            <Badge variant="fire" style={{ width: 'fit-content' }}>01. Color Palette</Badge>
            <h2>The Four Nations Palette</h2>
            <p>Deep dark surface system paired with vibrant elemental accents.</p>
          </div>
          <PaletteBlock family="fire" title="Fire Nation (Primary Palette)" />
          <PaletteBlock family="water" title="Water Tribe (Secondary Palette)" />
          <div className="grid2" data-reveal>
            <PaletteBlock family="earth" title="Earth Kingdom" />
            <PaletteBlock family="air" title="Air Nomads" />
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="air">
          <div className="sec-head" data-reveal>
            <Badge variant="air" style={{ width: 'fit-content' }}>02. Typography</Badge>
            <h2>Type Hierarchy</h2>
            <p>Cinzel for the hero, Inter for body copy and headings, the Avatar Airbender brush face for standalone single-line headings, JetBrains Mono for code.</p>
          </div>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-stagger>
            <div style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
              <p className="ckey" style={{ textAlign: 'left', margin: '4px 0' }}>Display XL / Cinzel 800 / 72px</p>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-hero)', fontWeight: 800, fontSize: 'var(--text-hero)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-display)', color: 'var(--color-fire-500)' }}>The Fire Nation</h1>
            </div>
            <div style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
              <p className="ckey" style={{ textAlign: 'left', margin: '4px 0' }}>Brush heading / Avatar Airbender / 40px</p>
              <h2 className="brush" style={{ margin: 0, fontSize: '2.5rem', color: 'var(--color-water-500)' }}>Waterbending</h2>
            </div>
            <div style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
              <p className="ckey" style={{ textAlign: 'left', margin: '4px 0' }}>Heading LG / Inter 800 / 32px</p>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', letterSpacing: 'var(--tracking-display)' }}>Master All Four Elements</h2>
            </div>
            <div style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
              <p className="ckey" style={{ textAlign: 'left', margin: '4px 0' }}>Body LG / Inter / 18px</p>
              <p style={{ margin: 0, fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Water is the element of change. Earth is the element of substance. Fire is the element of power. Air is the element of freedom.</p>
            </div>
            <div>
              <p className="ckey" style={{ textAlign: 'left', margin: '4px 0' }}>Code / JetBrains Mono / 14px</p>
              <code className="code-block" style={{ display: 'block', width: 'fit-content' }}>const bendingMaster = new ElementalBender('Avatar Aang');</code>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}

