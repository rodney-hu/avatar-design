import React from 'react';
import { resolveElement, colorFromVariant } from '../elements.js';

export function Badge({ element, variant, children, className = '', ...rest }) {
  const el = resolveElement(colorFromVariant('Badge', variant, element).element, 'fire');
  return <span className={['badge', 'badge-' + el, className].filter(Boolean).join(' ')} {...rest}>{children}</span>;
}
