import React from 'react';

const EXIT_MS = 450;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({ open = true, title, onClose, footer, glass = true, children, className = '', ...rest }) {
  const [mounted, setMounted] = React.useState(open);
  const [closing, setClosing] = React.useState(false);
  const dialogRef = React.useRef(null);
  const returnTo = React.useRef(null);
  const titleId = React.useId();

  React.useEffect(() => {
    if (open) { setMounted(true); setClosing(false); return undefined; }
    if (!mounted) return undefined;
    setClosing(true);
    const t = setTimeout(() => { setMounted(false); setClosing(false); }, EXIT_MS);
    return () => clearTimeout(t);
  }, [open]);

  // Focus moves into the dialog on open, stays there, and returns to the
  // element that opened it on close. The page behind does not scroll.
  React.useEffect(() => {
    if (!mounted || closing) return undefined;
    returnTo.current = document.activeElement;
    const dialog = dialogRef.current;
    const first = dialog && dialog.querySelector(FOCUSABLE);
    (first || dialog)?.focus();
    // Lock on <html>: its overflow is what the viewport scrolls by.
    const page = document.documentElement;
    const overflow = page.style.overflow;
    page.style.overflow = 'hidden';
    return () => {
      page.style.overflow = overflow;
      const el = returnTo.current;
      if (el && typeof el.focus === 'function' && document.contains(el)) el.focus();
    };
  }, [mounted, closing]);

  React.useEffect(() => {
    if (!mounted || closing) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape' && onClose) { onClose(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE));
      if (!items.length) { e.preventDefault(); return; }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, closing, onClose]);

  if (!mounted) return null;
  const state = closing ? 'closed' : 'open';
  const cls = ['modal', 'elevation-4', glass && 'glass-thick border-gradient', className];
  return (
    <div className="modal-backdrop" data-state={state} onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div ref={dialogRef} tabIndex={-1} className={cls.filter(Boolean).join(' ')} data-state={state} style={{ '--elevation-glow': 'var(--shadow-fire)' }} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} {...rest}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <h2 id={titleId} style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--fire-text)' }}>{title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontWeight: 700, fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: footer ? '1.5rem' : 0 }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>{footer}</div>}
      </div>
    </div>
  );
}
