import React from 'react';
import { resolveElement, colorFromVariant } from '../elements.js';

const SIZES = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

/* element = color, variant = style. A solid button is filled with its element;
   outline and ghost stay quiet and carry the element as a scope, so the
   outline hover color and the press motion follow it.
   loading keeps the button focusable and its label readable (aria-busy, label
   turned transparent under a spinner) and ignores clicks, including form
   submits, until it clears. */
export function Button({ element, variant = 'solid', size = 'md', iconOnly = false, fullWidth = false, loading = false, sheen = true, burst = true, as = 'button', children, className = '', style, onClick, ...rest }) {
  const Tag = as;
  if (iconOnly && !rest['aria-label'] && !rest['aria-labelledby'] && typeof console !== 'undefined') {
    console.warn('Button: iconOnly buttons need an aria-label or aria-labelledby.');
  }
  const legacy = colorFromVariant('Button', variant, element);
  const look = legacy.variant || 'solid';
  const el = resolveElement(legacy.element, 'fire');
  const face = look === 'outline' || look === 'ghost' ? ['btn-' + look, 'element-' + el] : ['btn-' + el];
  const cls = ['btn', ...face, SIZES[size], iconOnly && 'btn-icon', !sheen && 'btn-no-sheen', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} style={fullWidth ? { width: '100%', ...style } : style} data-burst={burst ? undefined : 'off'}
      aria-busy={loading || undefined} onClick={loading ? (e) => e.preventDefault() : onClick} {...rest}>
      {loading ? <><span className="btn-label">{children}</span><span className="btn-spinner" aria-hidden="true"></span></> : children}
    </Tag>
  );
}
