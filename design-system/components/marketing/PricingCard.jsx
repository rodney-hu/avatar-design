import React from 'react';
import { resolveElement } from '../elements.js';

/* A featured card takes its border, shadow and price color from `element`
   through the .element-<el> scope. No danger style: danger resolves to fire. */
export function PricingCard({ tier, name, price, period = '/mo', description, features = [], action, featured = false, ribbon, element: elementProp = 'fire', spotlight = true, className = '', ...rest }) {
  const element = resolveElement(elementProp, 'fire', false);
  return (
    <div className={['pricing-card', featured ? 'pricing-featured edge-light elevation-3' : 'elevation-1 elevation-lift', 'element-' + element, className].filter(Boolean).join(' ')} {...(spotlight && !featured ? { 'data-spotlight': '' } : {})} {...rest}>
      {ribbon && <div className="pricing-ribbon">{ribbon}</div>}
      {tier}
      <h3 className="pricing-name">{name}</h3>
      <div className={['pricing-price', featured && 'text-glow-' + element].filter(Boolean).join(' ')}>
        {price} <span className="pricing-period">{period}</span>
      </div>
      {description && <p className="pricing-desc">{description}</p>}
      {features.length > 0 && (
        <ul className="pricing-features">
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}
      {action}
    </div>
  );
}
