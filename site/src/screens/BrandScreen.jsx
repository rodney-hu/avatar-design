import React from 'react';
import { Hero } from '@ds/marketing/Hero.jsx';
import { Badge } from '@ds/core/Badge.jsx';
import { Button } from '@ds/core/Button.jsx';
import { Card } from '@ds/core/Card.jsx';
import CodeBlock from '../CodeBlock.jsx';

/* Files are copied from 05 Brand assets by `npm run sync:brand`. Colors, type
   and effects come from the tokens (CSS variables), never restated here. */
const FILES = import.meta.glob('../brand/*.{svg,jpg}', { eager: true, query: '?url', import: 'default' });
const url = (name) => FILES[`../brand/${name}`];

const Tile = ({ bg, src, alt, caption, className = '' }) => (
  <figure className="brand-fig" data-reveal>
    <div className={`brand-tile ${className}`} style={{ background: bg }}>
      <img src={url(src)} alt={alt} />
    </div>
    <figcaption className="ckey">{caption}</figcaption>
  </figure>
);

const VOID = 'var(--color-surface-void)';
const PAPER = 'var(--color-surface-light-void)';
const FIRE = 'var(--color-fire-500)';

const PROFILES = [
  { key: 'fire', label: 'Fire', note: 'Default. LinkedIn, email, bios, proposals, resume.' },
  { key: 'water', label: 'Water', note: 'Series accent on posts and carousels.' },
  { key: 'earth', label: 'Earth', note: 'Series accent on posts and carousels.' },
  { key: 'air', label: 'Air', note: 'Series accent on posts and carousels.' },
  { key: 'light', label: 'Light', note: 'Formal documents, print, parchment pages.' },
];

const USAGE = [
  ['Horizontal logo', 'Default everywhere: site, deck, email, banners', 'Under 120 px wide (use the icon mark)'],
  ['Icon mark (HU)', 'Favicon, watermark bug, small sizes', 'Next to the full wordmark'],
  ['Fire profile', 'Any profile photo slot', 'Replacing the logo'],
  ['Water, Earth, Air profiles', 'Series accents inside content', 'The main profile photo'],
  ['Light profile', 'Formal documents, print', 'Dark-mode interfaces'],
];

const NAMING = `rodney-hu-{category}-{descriptor}[-{variant}][-{color|element}][-{size}].ext

rodney-hu-logo-horizontal-white.svg
rodney-hu-icon-square-fire.svg
rodney-hu-profile-elemental-fire-1x1.png

05 Brand assets/
  Logos/            horizontal  icon  favicon  source
  Profile pics/     Photo  Elemental  Social crops
  Guidelines/       one-pager PDF, references (never published)`;

export default function BrandScreen({ onNavigate }) {
  return (
    <main>
      <Hero
        element="fire"
        className="animate-fade-in-up"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        eyebrow={<Badge element="fire">Brand</Badge>}
        title={<>Rodney Hu<br />brand system</>}
        subtitle="The logo, the profile set and the rules for using them. Colors, type and effects live in the design system, so they are linked here, not repeated."
        actions={<Button variant="outline" size="lg" onClick={() => onNavigate?.('/')}>See the design system</Button>}
      >
        <picture className="brand-hero-logo">
          <img className="brand-img-dark" src={url('rodney-hu-logo-horizontal-full-color-dark.svg')} alt="RODNEY HU wordmark" />
          <img className="brand-img-light" src={url('rodney-hu-logo-horizontal-full-color-light.svg')} alt="" aria-hidden="true" />
        </picture>
      </Hero>

      <div className="shell-main">
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} data-halo-bloom>
          <div className="sec-head" data-reveal>
            <Badge element="fire" style={{ width: 'fit-content' }}>01. Logo</Badge>
            <h2>One wordmark, four colorways</h2>
            <p>The red block is fire-500 from the design system. Pick the colorway by the background it sits on.</p>
          </div>
          <div className="grid4">
            <Tile bg={VOID} src="rodney-hu-logo-horizontal-full-color-dark.svg" alt="Horizontal logo, full color for dark backgrounds" caption="full-color-dark" />
            <Tile bg={PAPER} src="rodney-hu-logo-horizontal-full-color-light.svg" alt="Horizontal logo, full color for light backgrounds" caption="full-color-light" />
            <Tile bg={FIRE} src="rodney-hu-logo-horizontal-white.svg" alt="Horizontal logo, all white" caption="white" />
            <Tile bg={PAPER} src="rodney-hu-logo-horizontal-black.svg" alt="Horizontal logo, all black" caption="black" />
          </div>
          <div className="grid4 brand-icons">
            {['fire', 'water', 'earth', 'air', 'white', 'black'].map((c) => (
              <Tile key={c} bg={c === 'black' ? PAPER : VOID} src={`rodney-hu-icon-square-${c}.svg`} alt={`HU icon mark, ${c}`} caption={`icon-square-${c}`} className="icon" />
            ))}
            <Tile bg={VOID} src="rodney-hu-icon-block-fire.svg" alt="HU icon mark, original proportions" caption="icon-block-fire" className="icon" />
          </div>
          <p className="brand-note">Water, earth and air tints belong to the icon mark only, for color-coding a content series. The wordmark stays fire, white or black.</p>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} data-halo-bloom="water">
          <div className="sec-head" data-reveal>
            <Badge element="water" style={{ width: 'fit-content' }}>02. Rules</Badge>
            <h2>Space, size and what not to do</h2>
            <p>Keep clear space equal to the cap height of the H on every side. Minimum width is 120 px on screen and 30 mm in print.</p>
          </div>
          <div className="grid2">
            <figure className="brand-fig" data-reveal>
              <div className="brand-tile clear" style={{ background: VOID }}>
                <div className="clear-box"><img src={url('rodney-hu-logo-horizontal-full-color-dark.svg')} alt="Logo inside its clear-space boundary" /></div>
              </div>
              <figcaption className="ckey">Clear space = cap height of the H</figcaption>
            </figure>
            <figure className="brand-fig" data-reveal>
              <div className="brand-tile" style={{ background: VOID, gap: '1.5rem', flexDirection: 'column' }}>
                <img src={url('rodney-hu-logo-horizontal-full-color-dark.svg')} alt="Logo at 240 px wide" style={{ width: 240 }} />
                <img src={url('rodney-hu-logo-horizontal-full-color-dark.svg')} alt="Logo at the 120 px minimum width" style={{ width: 120 }} />
              </div>
              <figcaption className="ckey">240 px and the 120 px minimum</figcaption>
            </figure>
          </div>
          <div className="grid4">
            {[
              ['dont-stretch', 'Don’t stretch'],
              ['dont-rotate', 'Don’t rotate'],
              ['dont-glow', 'Don’t add effects'],
              ['dont-recolor', 'Don’t recolor'],
            ].map(([cls, label]) => (
              <figure className="brand-fig" key={cls} data-reveal>
                <div className="brand-tile" style={{ background: VOID }}>
                  <img className={cls} src={url('rodney-hu-logo-horizontal-full-color-dark.svg')} alt="" />
                </div>
                <figcaption className="ckey brand-dont">{label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="brand-note">Color, type and effects come from the <a href="/" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }}>design system</a>. Red is a fill, not a text color on dark; use the lighter fire for text there.</p>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} data-halo-bloom="earth">
          <div className="sec-head" data-reveal>
            <Badge element="earth" style={{ width: 'fit-content' }}>03. Profile set</Badge>
            <h2>Elemental profile set</h2>
            <p>One photo, built from the design system’s halo, glow and grain. Fire is the default; the other elements color-code a content series.</p>
          </div>
          <div className="brand-profiles">
            {PROFILES.map((p) => (
              <figure className="brand-fig" key={p.key} data-reveal>
                <img className="brand-profile" src={url(`rodney-hu-profile-elemental-${p.key}-800.jpg`)} alt={`Rodney Hu profile photo, ${p.label.toLowerCase()} treatment`} />
                <figcaption><strong>{p.label}</strong><span className="ckey" style={{ display: 'block', textAlign: 'left' }}>{p.note}</span></figcaption>
              </figure>
            ))}
            <figure className="brand-fig" data-reveal>
              <img className="brand-profile round" src={url('rodney-hu-profile-elemental-fire-800.jpg')} alt="Fire profile in a circular crop" />
              <figcaption><strong>Circular crop</strong><span className="ckey" style={{ display: 'block', textAlign: 'left' }}>Face stays centered at 400 px.</span></figcaption>
            </figure>
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="air">
          <div className="sec-head" data-reveal>
            <Badge element="air" style={{ width: 'fit-content' }}>04. Where each asset goes</Badge>
            <h2>Use, and don’t use</h2>
          </div>
          <Card data-reveal style={{ overflowX: 'auto' }}>
            <table className="brand-table">
              <thead><tr><th scope="col">Asset</th><th scope="col">Use for</th><th scope="col">Don’t use for</th></tr></thead>
              <tbody>
                {USAGE.map(([a, u, d]) => (<tr key={a}><th scope="row">{a}</th><td>{u}</td><td>{d}</td></tr>))}
              </tbody>
            </table>
          </Card>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom>
          <div className="sec-head" data-reveal>
            <Badge element="fire" style={{ width: 'fit-content' }}>05. Files and names</Badge>
            <h2>Finding and naming assets</h2>
            <p>Finished assets live in <code>05 Brand assets/</code>. This page shows a synced copy (<code>npm run sync:brand</code>).</p>
          </div>
          <div data-reveal><CodeBlock>{NAMING}</CodeBlock></div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="water">
          <div className="sec-head" data-reveal>
            <Badge element="water" style={{ width: 'fit-content' }}>06. In one line</Badge>
            <h2>What the brand says</h2>
          </div>
          <Card variant="glass" grain data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="brand-statement">I share what I’m learning about thinking clearly, using useful tools, and building a more intentional life, for entrepreneurs and business leaders who want to do the same.</p>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}><strong>Content anchors:</strong> inner clarity, capability experiments, visible progress.</p>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}><strong>Format:</strong> what I was struggling with, what I tried, what happened, what I learned, one experiment you could adapt.</p>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}><strong>Imagery:</strong> the elements and alchemy are a creative language for growth, used for visuals and the occasional metaphor.</p>
          </Card>
        </section>
      </div>
    </main>
  );
}
