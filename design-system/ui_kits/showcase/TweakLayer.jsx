/* Tweak layer: the three controls that reshape the showcase's feel.
   Emits a single override <style> so every component in the kit follows. */

const BRANDS = {
  fire:  { label: 'Fire',  ramp: ['#fff2f2','#ffd6d6','#ffa3a3','#f76d6d','#dd3333','#aa0000','#8f0000','#6e0000','#4d0000','#2e0000'], c500: '170 0 0',    c400: '221 51 51',  glow: '224 16 16', text: 300, lightText: 700 },
  water: { label: 'Water', ramp: ['#f0f9ff','#cce8ff','#8ecfff','#4db8ff','#1aa3ff','#0088e0','#006db3','#005289','#003a63','#00243d'], c500: '0 136 224',  c400: '26 163 255', glow: '0 191 255', text: 300, lightText: 700 },
  earth: { label: 'Earth', ramp: ['#f0fff4','#c6f6d5','#88e8a0','#4cd964','#2ecc40','#27ae34','#1f8c2a','#186b20','#114e18','#0a3010'], c500: '39 174 52',  c400: '46 204 64',  glow: '57 255 20', text: 300, lightText: 700 },
  air:   { label: 'Air',   ramp: ['#fffef5','#fff8cc','#ffed8a','#ffe048','#ffd700','#e6bf00','#b89700','#8a7100','#5c4b00','#3a3000'], c500: '230 191 0',  c400: '255 215 0',  glow: '255 215 0', text: 400, lightText: 700 },
};
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const DENSITY = {
  compact:     { page: '2.5rem 1.5rem', section: '2.5rem', card: '1rem',    grid: '0.75rem', hero: '3rem 1.5rem',   heroGap: '1rem',    h2: '1.5rem',  body: '0.875rem', swatch: '44px' },
  comfortable: { page: '4rem 1.5rem',   section: '4rem',   card: '1.5rem',  grid: '1.5rem',  hero: '6rem 2rem',     heroGap: '1.5rem',  h2: '2rem',    body: '1rem',     swatch: '64px' },
  editorial:   { page: '7rem 3rem',     section: '7rem',   card: '2.25rem', grid: '2.25rem', hero: '9rem 3rem',     heroGap: '2.25rem', h2: '2.75rem', body: '1.0625rem',swatch: '88px' },
};

/* Alpha helper for surfaces not yet on --glow-strength. */
const a = (base, scale) => Math.round(base * scale * 1000) / 1000;

/* Glows, text glows and --shadow-* tokens all read --glow-strength from the
   design system, so the slider only sets that. Surfaces not yet on the glow
   system (halos, button/card hover, focus ring, featured pricing) still scale here. */
function glowCss(scale) {
  const s = scale;
  let css = `:root{--glow-strength:${s}}.light{--glow-strength:${a(0.8, s)}}`;
  const ELS = { fire: ['var(--fire-500-rgb)', 'var(--fire-glow-rgb)'], water: ['var(--water-500-rgb)', 'var(--water-glow-rgb)'], earth: ['var(--earth-500-rgb)', 'var(--earth-glow-rgb)'], air: ['var(--air-500-rgb)', 'var(--air-glow-rgb)'], avatar: ['var(--avatar-glow-rgb)', 'var(--avatar-glow-rgb)'] };
  if (s === 1) return css;
  for (const [el, [core, glow]] of Object.entries(ELS)) {
    css += `.hero-${el}{background:radial-gradient(circle at 50% 20%,rgb(${core} / ${a(0.2, s)}) 0%,rgba(13,13,13,0) 70%)}`;
    css += `.bg-halo-${el}{background:radial-gradient(circle at 50% 0%,rgb(${core} / ${a(0.18, s)}) 0%,rgba(13,13,13,0) 70%)}`;
    css += `.card-${el}:hover{box-shadow:0 8px 30px rgba(0,0,0,${a(0.5, Math.max(s, 0.6))}),0 0 25px rgb(${core} / ${a(0.25, s)})}`;
    css += `.btn-${el}{box-shadow:0 4px 14px rgb(${core} / ${a(0.35, s)})}`;
    css += `.btn-${el}:hover{box-shadow:0 6px 20px rgb(${core} / ${a(0.55, s)}),0 0 30px rgb(${glow} / ${a(0.3, s)})}`;
  }
    css += `.pricing-featured{box-shadow:0 10px 40px rgb(var(--fire-500-rgb) / ${a(0.25, s)})}`;
  if (s === 0) css += `.animate-ember,.animate-avatar-state,.btn-avatar{animation:none}`;
  return css;
}

function brandCss(key) {
  const b = BRANDS[key];
  let css = ':root{';
  STEPS.forEach((step, i) => { css += `--color-fire-${step}:${b.ramp[i]};`; });
  css += `--color-fire-glow:${b.ramp[4]};--fire-500-rgb:${b.c500};--fire-400-rgb:${b.c400};--fire-glow-rgb:${b.glow};`;
  css += `--fire-text:var(--color-fire-${b.text});}`;
  css += `.light{--fire-text:var(--color-fire-${b.lightText})}`;
  /* The fire gradient buttons read the ramp, so they rebrand with it. */
  css += `.badge-fire{background:rgb(var(--fire-500-rgb) / 0.15);border-color:rgb(var(--fire-500-rgb) / 0.35)}`;
  return css;
}

function densityCss(key) {
  const d = DENSITY[key];
  return [
    `.shell-main{padding:${d.page};gap:${d.section}}`,
    `.card,.testimonial-card{padding:${d.card}}`,
    `.pricing-card{padding:calc(${d.card} * 1.4) ${d.card}}`,
    `.grid3,.grid4,.ramp10{gap:${d.grid}}`,
    `.hero{padding:${d.hero};gap:${d.heroGap}}`,
    `.sec-head h2{font-size:${d.h2}}`,
    `.sec-head p{font-size:${d.body}}`,
    `.swatch{height:${d.swatch}}`,
    `.footer{padding:${d.section}}`,
    key === 'editorial' ? `.hero-subtitle{font-size:1.5rem;max-width:760px}.sec-head{gap:12px}` : '',
    key === 'compact' ? `.hero-title{font-size:clamp(2rem,4vw,3rem)}.hero-subtitle{font-size:1rem}` : '',
  ].join('');
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brand": "fire",
  "glow": 1,
  "density": "comfortable"
}/*EDITMODE-END*/;

function TweakLayer() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const css = brandCss(t.brand) + glowCss(t.glow) + densityCss(t.density);
  return (
    <>
      <style>{css}</style>
      <TweaksPanel>
        <TweakSection label="Brand element" />
        <TweakRadio label="Primary" value={t.brand} options={['fire', 'water', 'earth', 'air']}
          onChange={(v) => setTweak('brand', v)} />
        <TweakSection label="Glow" />
        <TweakSlider label="Intensity" value={t.glow} min={0} max={2} step={0.05}
          onChange={(v) => setTweak('glow', v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density} options={['compact', 'comfortable', 'editorial']}
          onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </>
  );
}

Object.assign(window, { TweakLayer, TWEAK_DEFAULTS });
