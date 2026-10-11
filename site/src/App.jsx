import React from 'react';
import { flushSync } from 'react-dom';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@ds/navigation/Navbar.jsx';
import { NavLink } from '@ds/navigation/NavLink.jsx';
import { Button } from '@ds/core/Button.jsx';
import { Modal } from '@ds/feedback/Modal.jsx';
import { Alert } from '@ds/feedback/Alert.jsx';
import LandingScreen from './screens/LandingScreen.jsx';
import ComponentsScreen from './screens/ComponentsScreen.jsx';
import DataScreen from './screens/DataScreen.jsx';
import LandingBlocksScreen from './screens/LandingBlocksScreen.jsx';
import TweaksPanel from './TweaksPanel.jsx';

const TABS = [
  { path: '/', label: 'Colors' },
  { path: '/components', label: 'Components' },
  { path: '/data', label: 'Data' },
  { path: '/landing', label: 'Landing Blocks' },
];

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [light, setLight] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
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

  // Route changes run inside a view transition (crossfade + shared nav
  // indicator). flushSync makes React commit before the "after" snapshot.
  const go = (path) => {
    if (path === pathname) return;
    const swap = () => flushSync(() => { navigate(path); window.scrollTo(0, 0); });
    // A hidden document can't run view transitions (they abort), so swap directly.
    if (window.ElementalMotion && !document.hidden) window.ElementalMotion.transition(swap); else swap();
  };
  const onNavClick = (path) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(path);
  };

  return (
    <>
      <Navbar
        scrolled={scrolled}
        onClick={(e) => { if (e.target.closest('.nav-brand')) onNavClick('/')(e); }}
        brand={<span style={{ letterSpacing: 'var(--tracking-brand)' }}>ELEMENTAL <span style={{ color: 'var(--color-fire-500)', fontWeight: 800 }}>UI</span></span>}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => setLight(!light)}>{light ? 'Dark Mode' : 'Light Mode'}</Button>
          <Button size="sm" onClick={() => go('/landing')}>Get Presets</Button>
        </>}
      >
        {TABS.map((t) => (
          <NavLink key={t.path} href={t.path} active={pathname === t.path} onClick={onNavClick(t.path)}>{t.label}</NavLink>
        ))}
      </Navbar>

      <div data-page key={pathname}>
        <Routes>
          <Route path="/" element={<LandingScreen onToast={fireToast} onModal={() => setModal(true)} />} />
          <Route path="/components" element={<ComponentsScreen onModal={() => setModal(true)} />} />
          <Route path="/data" element={<DataScreen />} />
          <Route path="/landing" element={<LandingBlocksScreen />} />
          <Route path="*" element={<LandingScreen onToast={fireToast} onModal={() => setModal(true)} />} />
        </Routes>
      </div>

      <footer className="footer">Elemental UI Design System — dark-first, token-driven, four nations.</footer>

      <TweaksPanel />

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
