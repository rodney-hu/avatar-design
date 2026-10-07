const { Navbar, NavLink, Button, Modal, Alert } = window.ElementalUIDesignSystem_5d6c38;

const TABS = [
  { id: 'colors', label: 'Colors' },
  { id: 'components', label: 'Components' },
  { id: 'data', label: 'Data' },
  { id: 'landing', label: 'Landing Blocks' },
];

function ShowcaseShell() {
  const [tab, setTab] = React.useState('colors');
  const [light, setLight] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle('light', light);
  }, [light]);

  const fireToast = () => {
    const id = Date.now();
    setToasts((t) => [...t, { id, closing: false }]);
    setTimeout(() => setToasts((t) => t.map((x) => (x.id === id ? { ...x, closing: true } : x))), 3500);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4100);
  };
  const go = (id) => {
    if (id === tab) return;
    const swap = () => { setTab(id); window.scrollTo(0, 0); };
    if (window.ElementalMotion) window.ElementalMotion.transition(swap); else swap();
  };

  return (
    <>
      <Navbar scrolled={scrolled}
        brand={<><span style={{ letterSpacing: '0.05em' }}>ELEMENTAL <span style={{ color: 'var(--color-fire-500)', fontWeight: 800 }}>UI</span></span></>}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => setLight(!light)}>{light ? 'Dark Mode' : 'Light Mode'}</Button>
          <Button size="sm" onClick={() => go('landing')}>Get Presets</Button>
        </>}
      >
        {TABS.map((t) => (
          <NavLink key={t.id} href="#" active={tab === t.id} onClick={(e) => { e.preventDefault(); go(t.id); }}>{t.label}</NavLink>
        ))}
      </Navbar>

      <main data-page key={tab}>
        {tab === 'colors' && <LandingScreen onToast={fireToast} onModal={() => setModal(true)} />}
        {tab === 'components' && <ComponentsScreen onModal={() => setModal(true)} />}
        {tab === 'data' && <DataScreen />}
        {tab === 'landing' && <LandingBlocksScreen />}
      </main>

      <footer className="footer">Elemental UI Design System — dark-first, token-driven, four nations.</footer>

      <TweakLayer />

      <Modal open={modal} title="Firebending Scroll" onClose={() => setModal(false)}
        footer={<>
          <Button variant="ghost" size="sm" onClick={() => setModal(false)}>Cancel</Button>
          <Button size="sm" onClick={() => setModal(false)}>Accept Flame</Button>
        </>}>
        Fire is the element of power. Its people have desire and will, and the energy and drive to get what they want.
      </Modal>

      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className="toast-slot" data-state={t.closing ? 'closed' : 'open'}>
            <div className="toast-slot-inner"><div className="toast-pad">
              <Alert variant="fire" className="toast" title="Fire Nation Power Unleashed">Component action completed successfully.</Alert>
            </div></div>
          </div>
        ))}
      </div>
    </>
  );
}

Object.assign(window, { ShowcaseShell });
