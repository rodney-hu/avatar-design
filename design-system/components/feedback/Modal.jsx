import React from 'react';

const EXIT_MS = 450;

export function Modal({ open = true, title, onClose, footer, glass = true, children, className = '', ...rest }) {
  const [mounted, setMounted] = React.useState(open);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (open) { setMounted(true); setClosing(false); return undefined; }
    if (!mounted) return undefined;
    setClosing(true);
    const t = setTimeout(() => { setMounted(false); setClosing(false); }, EXIT_MS);
    return () => clearTimeout(t);
  }, [open]);
  React.useEffect(() => {
    if (!mounted || closing || !onClose) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, closing, onClose]);
  if (!mounted) return null;
  const state = closing ? 'closed' : 'open';
  const cls = ['modal', 'elevation-4', glass && 'glass-thick border-gradient', className];
  return (
    <div className="modal-backdrop" data-state={state} onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className={cls.filter(Boolean).join(' ')} data-state={state} style={{ '--elevation-glow': 'var(--shadow-fire)' }} role="dialog" aria-modal="true" {...rest}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-fire-500)' }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontWeight: 700, fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: footer ? '1.5rem' : 0 }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>{footer}</div>}
      </div>
    </div>
  );
}
