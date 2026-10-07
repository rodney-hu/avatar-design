import React from 'react';

export function PricingCard({ tier, name, price, period = '/mo', description, features = [], action, featured = false, ribbon, element = 'fire', spotlight = true, className = '', ...rest }) {
  const glow = featured ? { color: 'var(--color-fire-500)' } : undefined;
  return (
    <div className={['pricing-card', featured ? 'pricing-featured edge-light elevation-3' : 'elevation-1 elevation-lift', 'element-' + element, className].filter(Boolean).join(' ')} {...(spotlight && !featured ? { 'data-spotlight': '' } : {})} {...rest}>
      {ribbon && <div style={{ position: 'absolute', top: '-0.75rem', right: '1.5rem' }}>{ribbon}</div>}
      {tier}
      <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>{name}</h3>
      <div className={['pricing-price', featured && 'text-glow-fire'].filter(Boolean).join(' ')} style={glow}>
        {price} <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>{period}</span>
      </div>
      {description && <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{description}</p>}
      {features.length > 0 && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}
      {action}
    </div>
  );
}
