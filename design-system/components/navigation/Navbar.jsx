import React from 'react';

const NARROW = '(max-width: 899.98px)';

/* Below 900px the links and actions fold into a panel behind a Menu toggle
   (disclosure pattern). Escape, choosing a link, or widening the window
   past the breakpoint closes it. */
export function Navbar({ brand, brandHref = '/', children, actions, glass = true, scrolled = false, className = '', ...rest }) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();
  const toggleRef = React.useRef(null);

  React.useEffect(() => {
    if (!open || typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(NARROW);
    const onChange = () => { if (!mq.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open]);

  const onKeyDown = (e) => {
    if (open && e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
  };
  const onPanelClick = (e) => { if (e.target.closest('a')) setOpen(false); };

  const cls = ['navbar', glass && 'glass-thick', scrolled ? 'elevation-2' : 'navbar-edge', className];
  return (
    <header className={cls.filter(Boolean).join(' ')} onKeyDown={onKeyDown} {...rest}>
      <a href={brandHref} className="nav-brand">{brand}</a>
      <button ref={toggleRef} type="button" className="navbar-toggle" aria-label="Menu" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
        <span className="navbar-toggle-bar" aria-hidden="true"></span>
        <span className="navbar-toggle-bar" aria-hidden="true"></span>
        <span className="navbar-toggle-bar" aria-hidden="true"></span>
      </button>
      <div id={panelId} className="navbar-panel" data-open={open || undefined} onClick={onPanelClick}>
        <nav className="navbar-links">{children}</nav>
        <div className="navbar-actions">{actions}</div>
      </div>
    </header>
  );
}
