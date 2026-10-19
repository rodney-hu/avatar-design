import React from 'react';
import { resolveElement } from '../elements.js';

/* Text reads the per-element text tokens, which pass contrast in both themes. */
const TINT = { fire: 'var(--fire-text)', water: 'var(--water-text)', earth: 'var(--earth-text)', air: 'var(--air-text)', avatar: 'var(--avatar-text)', danger: 'var(--danger-text)', none: 'var(--color-text-primary)' };
const GLOW = { fire: 'text-glow-fire', water: 'text-glow-water', earth: 'text-glow-earth', air: 'text-glow-air', avatar: 'text-glow-avatar', danger: 'text-glow-fire', none: '' };
const BORDER = { fire: 'rgb(var(--fire-500-rgb) / 0.3)', water: 'rgb(var(--water-500-rgb) / 0.3)', earth: 'rgb(var(--earth-500-rgb) / 0.3)', air: 'rgb(var(--air-500-rgb) / 0.3)', avatar: 'rgb(var(--avatar-glow-rgb) / 0.3)', danger: 'rgb(var(--danger-500-rgb) / 0.3)', none: 'var(--color-border-subtle)' };

/* "1,420 L/s" -> { pre:'', n:1420, dec:0, comma:true, post:' L/s' } */
function parse(v) {
  if (typeof v === 'number') return { pre: '', n: v, dec: (String(v).split('.')[1] || '').length, comma: false, post: '' };
  if (typeof v !== 'string') return null;
  const m = v.match(/^([^\d-]*)(-?[\d,]*\.?\d+)([\s\S]*)$/);
  if (!m) return null;
  return { pre: m[1], n: parseFloat(m[2].replace(/,/g, '')), dec: (m[2].split('.')[1] || '').length, comma: m[2].includes(','), post: m[3] };
}
function fmt(p, n) {
  const s = p.comma ? n.toLocaleString('en-US', { minimumFractionDigits: p.dec, maximumFractionDigits: p.dec }) : n.toFixed(p.dec);
  return p.pre + s + p.post;
}
const easeOut = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function StatCard({ label, value, delta, element: elementProp, countUp = true, flash = true, duration = 1100, className = '', style, ...rest }) {
  /* Neutral unless an element is given. */
  const element = resolveElement(elementProp, 'none');
  const cardRef = React.useRef(null);
  const valRef = React.useRef(null);
  const prev = React.useRef(null);
  const raf = React.useRef(0);
  const parsed = parse(value);

  const run = (from, p, ms) => {
    cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / ms);
      if (valRef.current) valRef.current.textContent = fmt(p, from + (p.n - from) * easeOut(t));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  React.useLayoutEffect(() => {
    const p = parsed;
    const old = prev.current;
    prev.current = p;
    if (!p || !valRef.current) return;
    if (old === null) {
      if (!countUp || reducedMotion()) return;
      valRef.current.textContent = fmt(p, 0);
      const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { io.disconnect(); run(0, p, duration); } }, { threshold: 0.4 });
      io.observe(cardRef.current);
      return () => io.disconnect();
    }
    if (old && old.n !== p.n) {
      if (reducedMotion()) valRef.current.textContent = fmt(p, p.n); else run(old.n, p, duration * 0.64);
      if (flash && cardRef.current) {
        const el = cardRef.current;
        el.removeAttribute('data-flash'); void el.offsetWidth;
        el.setAttribute('data-flash', p.n > old.n ? 'up' : 'down');
      }
    }
  }, [parsed ? parsed.n : value]);
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div ref={cardRef} className={['stat-card', className].filter(Boolean).join(' ')} style={{ borderColor: BORDER[element], ...style }} onAnimationEnd={(e) => { if (e.target === cardRef.current) e.currentTarget.removeAttribute('data-flash'); }} {...rest}>
      <span className="stat-label">{label}</span>
      <span ref={valRef} className={['stat-value', GLOW[element]].filter(Boolean).join(' ')} style={{ color: TINT[element] }}>{parsed ? fmt(parsed, parsed.n) : value}</span>
      {delta && <span className="stat-delta" style={element === 'none' ? undefined : { color: TINT[element] }}>{delta}</span>}
    </div>
  );
}
