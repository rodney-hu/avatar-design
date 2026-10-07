import React from 'react';

const VARIANTS = { base: '', raised: 'card-raised', fire: 'card-fire', water: 'card-water', earth: 'card-earth', air: 'card-air', glass: 'card-glass glass border-gradient' };

export function Card({ variant = 'base', elevation = 1, lift = false, spotlight = false, edgeLight = false, grain = false, element, children, className = '', style, ...rest }) {
  const ring = edgeLight ? 'edge-light' : null;
  const cls = ['card', VARIANTS[variant], 'elevation-' + elevation, lift && 'elevation-lift', ring, grain && 'grain', element && 'element-' + element, className];
  const spot = spotlight && !edgeLight && variant !== 'glass' ? { 'data-spotlight': '' } : {};
  return (
    <div className={cls.filter(Boolean).join(' ')} style={style} {...spot} {...rest}>
      {children}
    </div>
  );
}
