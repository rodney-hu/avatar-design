import React from 'react';
import { Button } from '@ds/core/Button.jsx';
import { tweakCss } from './tweaks.js';

const BRANDS = ['fire', 'water', 'earth', 'air'];
const DENSITIES = ['compact', 'comfortable', 'editorial'];

function Segment({ value, options, onChange }) {
  return (
    <div className="tweaks-seg">
      {options.map((o) => (
        <Button key={o} size="sm" variant={value === o ? 'solid' : 'ghost'} burst={false} onClick={() => onChange(o)}>{o}</Button>
      ))}
    </div>
  );
}

export default function TweaksPanel() {
  const [open, setOpen] = React.useState(false);
  const [t, setT] = React.useState({ brand: 'fire', glow: 1, density: 'comfortable' });
  const set = (k) => (v) => setT((s) => ({ ...s, [k]: v }));
  const small = { fontSize: '0.6875rem' };

  return (
    <>
      <style>{tweakCss(t)}</style>
      <Button variant="outline" size="sm" burst={false} className="tweaks-toggle" aria-expanded={open} aria-controls="tweaks" onClick={() => setOpen(!open)}>Tweaks</Button>
      {open && (
        <div className="tweaks glass-thick border-gradient elevation-3" id="tweaks">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="stat-label">Tweaks</span>
            <Button variant="ghost" size="sm" burst={false} aria-label="Close tweaks" onClick={() => setOpen(false)}>×</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="stat-label" style={small}>Brand element</span>
            <Segment value={t.brand} options={BRANDS} onChange={set('brand')} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="tweak-glow" className="stat-label" style={{ ...small, display: 'flex', justifyContent: 'space-between' }}>
              <span>Glow intensity</span><span>{t.glow.toFixed(2)}</span>
            </label>
            <input id="tweak-glow" type="range" min="0" max="2" step="0.05" value={t.glow} onChange={(e) => set('glow')(parseFloat(e.target.value))} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="stat-label" style={small}>Density</span>
            <Segment value={t.density} options={DENSITIES} onChange={set('density')} />
          </div>
        </div>
      )}
    </>
  );
}
