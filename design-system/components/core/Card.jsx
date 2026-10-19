import React from 'react';
import { resolveElement, colorFromVariant } from '../elements.js';

const VARIANTS = { base: '', raised: 'card-raised', glass: 'card-glass glass border-gradient' };

/* Neutral by default. element adds the colored border and scopes the
   edge light, glows and motion personality to that element. */
export function Card({ element, variant = 'base', elevation = 1, lift = false, spotlight = false, edgeLight = false, grain = false, children, className = '', style, ...rest }) {
  const legacy = colorFromVariant('Card', variant, element);
  const look = legacy.variant || 'base';
  const el = resolveElement(legacy.element, null);
  const ring = edgeLight ? 'edge-light' : null;
  const cls = ['card', VARIANTS[look], el && look !== 'glass' && 'card-' + el, el && 'element-' + el, 'elevation-' + elevation, lift && 'elevation-lift', ring, grain && 'grain', className];
  const spot = spotlight && !edgeLight && look !== 'glass' ? { 'data-spotlight': '' } : {};
  return (
    <div className={cls.filter(Boolean).join(' ')} style={style} {...spot} {...rest}>
      {children}
    </div>
  );
}
