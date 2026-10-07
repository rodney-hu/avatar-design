import React from 'react';

const HALOS = { fire: 'hero-fire', water: 'hero-water', earth: 'hero-earth', air: 'hero-air' };
const GLOWS = { fire: 'text-glow-fire', water: 'text-glow-water', earth: 'text-glow-earth', air: 'text-glow-air' };

export function Hero({ element = 'fire', eyebrow, title, subtitle, actions, glowTitle = true, parallaxHalo = false, children, className = '', ...rest }) {
  const content = (
    <>
      {eyebrow && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>{eyebrow}</div>}
      <h1 className={['hero-title', glowTitle && GLOWS[element]].filter(Boolean).join(' ')} style={{ margin: 0 }}>{title}</h1>
      {subtitle && <p className="hero-subtitle" style={{ margin: 0 }}>{subtitle}</p>}
      {children}
      {actions && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>{actions}</div>}
    </>
  );

  // parallaxHalo moves the radial halo off the section and onto its own layer so
  // the two can drift at different rates. Content rides at a fraction of the
  // halo's travel, which is what reads as depth.
  // The layer is offset by ABSOLUTE px, not a percentage height: a
  // `radial-gradient(circle …)` sizes its radius off its own box, so an
  // oversized layer pushes the fade-to-transparent outside the hero and the
  // wash reads as a solid slab. 40px top/bottom covers the max travel
  // (0.35 depth x 80px range = 28px) and leaves the radius essentially intact.
  if (parallaxHalo) {
    return (
      <section className={['hero', className].filter(Boolean).join(' ')} {...rest}>
        <div className={HALOS[element]} data-parallax="0.35" aria-hidden="true"
          style={{ position: 'absolute', top: -40, bottom: -40, left: 0, right: 0, pointerEvents: 'none', zIndex: 0 }} />
        <div data-parallax="0.08"
          style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'inherit', width: '100%' }}>
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className={['hero', HALOS[element], className].filter(Boolean).join(' ')} {...rest}>
      {content}
    </section>
  );
}
