import React from 'react';
import { resolveElement } from '../elements.js';

/* Hero has no danger style: danger resolves to fire. */
export function Hero({ element: elementProp = 'fire', eyebrow, title, subtitle, actions, glowTitle = true, parallaxHalo = false, children, className = '', ...rest }) {
  const element = resolveElement(elementProp, 'fire', false);
  const halo = 'hero-' + element;
  const content = (
    <>
      {eyebrow && <div className="hero-eyebrow">{eyebrow}</div>}
      <h1 className={['hero-title', glowTitle && 'text-glow-' + element].filter(Boolean).join(' ')}>{title}</h1>
      {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      {children}
      {actions && <div className="hero-actions">{actions}</div>}
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
        <div className={'hero-halo-layer ' + halo} data-parallax="0.35" aria-hidden="true" />
        <div className="hero-content-layer" data-parallax="0.08">
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className={['hero', halo, className].filter(Boolean).join(' ')} {...rest}>
      {content}
    </section>
  );
}
