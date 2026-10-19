import React from 'react';
import { Button } from '../core/Button.jsx';
import { resolveElement } from '../elements.js';

const EXIT_MS = 150;

/* Menu button: a trigger that opens a .popover list of actions.
   Keyboard follows the WAI-ARIA menu button pattern: Enter, Space or
   ArrowDown opens on the first item, ArrowUp on the last; arrows, Home and
   End move; Escape closes and returns focus; Tab closes and moves on. */
export function Menu({ label, items = [], element, side = 'bottom', align = 'start', trigger, className = '', ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const wrapRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  const focusOnOpen = React.useRef('first');
  const menuId = React.useId();
  const el = element ? resolveElement(element, 'fire') : null;

  React.useEffect(() => {
    if (open) { setMounted(true); return undefined; }
    const t = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [open]);

  const enabled = () => itemRefs.current.filter((n, i) => n && !items[i]?.disabled);
  React.useEffect(() => {
    if (!open || !mounted) return;
    const list = enabled();
    (focusOnOpen.current === 'last' ? list[list.length - 1] : list[0])?.focus();
  }, [open, mounted]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Found through the wrapper, so any trigger works without forwarding a ref.
  const triggerEl = () => wrapRef.current?.querySelector('[aria-haspopup="menu"]');
  const close = (refocus) => { setOpen(false); if (refocus) triggerEl()?.focus(); };
  const openAt = (where) => { focusOnOpen.current = where; setOpen(true); };

  const onTriggerKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); openAt('first'); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); openAt('last'); }
  };
  const onMenuKey = (e) => {
    const list = enabled();
    const i = list.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length]?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length]?.focus(); }
    else if (e.key === 'Home') { e.preventDefault(); list[0]?.focus(); }
    else if (e.key === 'End') { e.preventDefault(); list[list.length - 1]?.focus(); }
    else if (e.key === 'Escape') { e.preventDefault(); close(true); }
    else if (e.key === 'Tab') close(false);
  };
  const select = (item) => { if (item.disabled) return; close(true); item.onSelect?.(); };

  const triggerProps = {
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': mounted ? menuId : undefined,
    onClick: () => (open ? close(false) : openAt('first')),
    onKeyDown: onTriggerKey,
  };
  const triggerNode = trigger
    ? React.cloneElement(trigger, triggerProps)
    : <Button variant="outline" element={element} {...triggerProps}>{label} <span aria-hidden="true">▾</span></Button>;

  return (
    <div ref={wrapRef} className={['menu', el && 'element-' + el, className].filter(Boolean).join(' ')} {...rest}>
      {triggerNode}
      {mounted && (
        <div id={menuId} role="menu" aria-label={typeof label === 'string' ? label : undefined} className="popover"
          data-side={side} data-align={align} data-state={open ? 'open' : 'closed'} onKeyDown={onMenuKey}>
          {items.map((item, i) => (
            <button key={i} type="button" role="menuitem" tabIndex={-1} className="popover-item"
              ref={(n) => { itemRefs.current[i] = n; }} aria-disabled={item.disabled || undefined} onClick={() => select(item)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
