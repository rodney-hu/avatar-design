// Elemental Design System — showcase interactions.
// Visual motion (reveal, tilt, spotlight, edge light, bursts, view transitions)
// lives in motion.js; this file wires the showcase's own state. It loads at
// the end of <body>, so the DOM it needs is already parsed.

const motion = window.ElementalMotion;
const transition = (fn) => (motion ? motion.transition(fn) : fn());

// 1. Dark / Light mode
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggleBtn.textContent = document.body.classList.contains('light') ? 'Dark Mode' : 'Light Mode';
});

// 2. Navbar shadows once the page scrolls
const navbar = document.getElementById('navbar');
const onScroll = () => {
  const scrolled = window.scrollY > 8;
  navbar.classList.toggle('elevation-2', scrolled);
  navbar.classList.toggle('navbar-edge', !scrolled);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 3. Screens: each tab is a <template>; switching mounts a fresh copy inside a
// view transition (crossfade + shared nav indicator), so reveals replay.
const navLinks = document.querySelectorAll('.nav-link[data-tab-link]');
let currentTab = null;
const mountTab = (id) => {
  const page = document.getElementById(`page-${id}`).content.firstElementChild.cloneNode(true);
  const current = document.querySelector('#page-mount > [data-page]');
  if (current) current.replaceWith(page); else document.getElementById('page-mount').appendChild(page);
  currentTab = id;
  navLinks.forEach((l) => l.classList.toggle('nav-link-active', l.dataset.tabLink === id));
  initStats(page);
};
const showTab = (id) => {
  if (id === currentTab) return;
  transition(() => {
    mountTab(id);
    window.scrollTo(0, 0);
  });
};
document.querySelectorAll('[data-tab-link]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showTab(el.dataset.tabLink);
  });
});

// 4. Hero theme preview: retints the halo, title glow and primary CTA
const ELEMENTS = ['fire', 'water', 'earth', 'air'];
const setHeroElement = (btn) => {
  const el = btn.dataset.element;
  const hero = btn.closest('.hero');
  hero.querySelectorAll('[data-element]').forEach((b) => {
    b.classList.remove(...ELEMENTS.map((x) => `btn-${x}`), 'btn-ghost');
    b.classList.add(b === btn ? `btn-${el}` : 'btn-ghost');
  });
  hero.querySelector('#hero-halo').className = `hero-${el}`;
  const title = hero.querySelector('#hero-title');
  title.classList.remove(...ELEMENTS.map((x) => `text-glow-${x}`));
  title.classList.add(`text-glow-${el}`);
  const cta = hero.querySelector('#trigger-toast-btn');
  cta.classList.remove(...ELEMENTS.map((x) => `btn-${x}`));
  cta.classList.add(`btn-${el}`);
};

// 5. Modal: stays mounted; data-state plays the enter/exit, Escape closes
const EXIT_MS = 450;
const backdrop = document.getElementById('modal-backdrop');
const modal = backdrop.querySelector('.modal');
let closeTimer = 0;
const setModalState = (state) => {
  backdrop.dataset.state = state;
  modal.dataset.state = state;
};
const openModal = () => {
  clearTimeout(closeTimer);
  backdrop.hidden = false;
  setModalState('open');
};
const closeModal = () => {
  if (backdrop.hidden || backdrop.dataset.state === 'closed') return;
  setModalState('closed');
  closeTimer = setTimeout(() => { backdrop.hidden = true; }, EXIT_MS);
};
backdrop.querySelectorAll('[data-close-modal]').forEach((b) => b.addEventListener('click', closeModal));
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// 6. Toast stack: slots glide open, close 3.5s later, unmount after the exit
const stack = document.getElementById('toast-stack');
const fireToast = () => {
  const slot = document.createElement('div');
  slot.className = 'toast-slot';
  slot.dataset.state = 'open';
  slot.innerHTML = `
    <div class="toast-slot-inner"><div class="toast-pad">
      <div class="alert alert-fire toast">
        <div>
          <h4 class="m-0 font-bold text-[0.875rem]">Fire Nation Power Unleashed</h4>
          <p class="m-0 mt-0.5 text-xs text-text-secondary">Component action completed successfully.</p>
        </div>
      </div>
    </div></div>`;
  stack.appendChild(slot);
  setTimeout(() => { slot.dataset.state = 'closed'; }, 3500);
  setTimeout(() => slot.remove(), 4100);
};

// 7. Stat cards: count up on first view, flash + recount on change
const easeOut = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const parse = (v) => {
  const m = v.match(/^([^\d-]*)(-?[\d,]*\.?\d+)([\s\S]*)$/);
  if (!m) return null;
  return { pre: m[1], n: parseFloat(m[2].replace(/,/g, '')), dec: (m[2].split('.')[1] || '').length, comma: m[2].includes(','), post: m[3] };
};
const fmt = (p, n) => p.pre + (p.comma
  ? n.toLocaleString('en-US', { minimumFractionDigits: p.dec, maximumFractionDigits: p.dec })
  : n.toFixed(p.dec)) + p.post;
const runCount = (valEl, p, from, ms) => {
  cancelAnimationFrame(valEl._raf);
  const t0 = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - t0) / ms);
    valEl.textContent = fmt(p, from + (p.n - from) * easeOut(t));
    if (t < 1) valEl._raf = requestAnimationFrame(tick);
  };
  valEl._raf = requestAnimationFrame(tick);
};
const COUNT_MS = 1100;
function initStats(scope) {
  scope.querySelectorAll('[data-count-up]').forEach((card) => {
    const valEl = card.querySelector('.stat-value');
    const p = parse(valEl.textContent.trim());
    if (!p) return;
    card._stat = p;
    valEl.textContent = fmt(p, 0);
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { io.disconnect(); runCount(valEl, p, 0, COUNT_MS); }
    }, { threshold: 0.4 });
    io.observe(card);
    card.addEventListener('animationend', (e) => { if (e.target === card) card.removeAttribute('data-flash'); });
  });
}
setInterval(() => {
  const powerCard = document.getElementById('stat-power');
  const old = powerCard?._stat;
  if (!old) return;
  const n = Math.round(Math.min(99.9, Math.max(94, old.n + (Math.random() - 0.45) * 3)) * 10) / 10;
  if (n === old.n) return;
  const next = { ...old, n };
  powerCard._stat = next;
  runCount(powerCard.querySelector('.stat-value'), next, old.n, COUNT_MS * 0.64);
  powerCard.removeAttribute('data-flash');
  void powerCard.offsetWidth;
  powerCard.setAttribute('data-flash', n > old.n ? 'up' : 'down');
}, 4000);

// 8. Copy code snippets
const copyCode = (btn) => {
  const codeElement = document.getElementById(btn.dataset.codeTarget);
  if (!codeElement) return;
  navigator.clipboard.writeText(codeElement.innerText.trim()).then(() => {
    const originalText = btn.innerText;
    btn.innerText = 'Copied!';
    btn.classList.add('text-earth-400');
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('text-earth-400');
    }, 2000);
  });
};

// Clicks inside mounted screens are delegated, since screens remount.
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-element], [data-open-modal], #trigger-toast-btn, .copy-btn');
  if (!t) return;
  if (t.matches('[data-element]')) setHeroElement(t);
  else if (t.matches('[data-open-modal]')) openModal();
  else if (t.matches('#trigger-toast-btn')) fireToast();
  else copyCode(t);
});

// 9. Tweak layer: emits one override <style> so every component follows
const BRANDS = {
  fire:  { ramp: ['#fff2f2', '#ffd6d6', '#ffa3a3', '#f76d6d', '#dd3333', '#aa0000', '#8f0000', '#6e0000', '#4d0000', '#2e0000'], c500: '170 0 0',   c400: '221 51 51',  glow: '224 16 16', text: 500, lightText: 700 },
  water: { ramp: ['#f0f9ff', '#cce8ff', '#8ecfff', '#4db8ff', '#1aa3ff', '#0088e0', '#006db3', '#005289', '#003a63', '#00243d'], c500: '0 136 224', c400: '26 163 255', glow: '0 191 255', text: 300, lightText: 700 },
  earth: { ramp: ['#f0fff4', '#c6f6d5', '#88e8a0', '#4cd964', '#2ecc40', '#27ae34', '#1f8c2a', '#186b20', '#114e18', '#0a3010'], c500: '39 174 52', c400: '46 204 64',  glow: '57 255 20', text: 300, lightText: 700 },
  air:   { ramp: ['#fffef5', '#fff8cc', '#ffed8a', '#ffe048', '#ffd700', '#e6bf00', '#b89700', '#8a7100', '#5c4b00', '#3a3000'], c500: '230 191 0', c400: '255 215 0',  glow: '255 215 0', text: 400, lightText: 700 },
};
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const DENSITY = {
  compact:     { page: '2.5rem 1.5rem', section: '2.5rem', card: '1rem',    grid: '0.75rem', hero: '3rem 1.5rem', heroGap: '1rem',    h2: '1.5rem',  body: '0.875rem',  swatch: '44px' },
  comfortable: { page: '4rem 1.5rem',   section: '4rem',   card: '1.5rem',  grid: '1.5rem',  hero: '6rem 2rem',   heroGap: '1.5rem',  h2: '2rem',    body: '1rem',      swatch: '64px' },
  editorial:   { page: '7rem 3rem',     section: '7rem',   card: '2.25rem', grid: '2.25rem', hero: '9rem 3rem',   heroGap: '2.25rem', h2: '2.75rem', body: '1.0625rem', swatch: '88px' },
};
const a = (base, scale) => Math.round(base * scale * 1000) / 1000;

// Glows, text glows and --shadow-* all read --glow-strength, so the slider
// sets that. Surfaces not on the glow system yet still scale here.
const glowCss = (s) => {
  let css = `:root{--glow-strength:${s}}.light{--glow-strength:${a(0.8, s)}}`;
  if (s === 1) return css;
  const ELS = { fire: ['var(--fire-500-rgb)', 'var(--fire-glow-rgb)'], water: ['var(--water-500-rgb)', 'var(--water-glow-rgb)'], earth: ['var(--earth-500-rgb)', 'var(--earth-glow-rgb)'], air: ['var(--air-500-rgb)', 'var(--air-glow-rgb)'], avatar: ['var(--avatar-glow-rgb)', 'var(--avatar-glow-rgb)'] };
  for (const [el, [core, glow]] of Object.entries(ELS)) {
    css += `.hero-${el}{background:radial-gradient(circle at 50% 20%,rgb(${core} / ${a(0.2, s)}) 0%,rgba(13,13,13,0) 70%)}`;
    css += `.bg-halo-${el}{background:radial-gradient(circle at 50% 0%,rgb(${core} / ${a(0.18, s)}) 0%,rgba(13,13,13,0) 70%)}`;
    css += `.card-${el}:hover{box-shadow:0 8px 30px rgba(0,0,0,${a(0.5, Math.max(s, 0.6))}),0 0 25px rgb(${core} / ${a(0.25, s)})}`;
    css += `.btn-${el}{box-shadow:0 4px 14px rgb(${core} / ${a(0.35, s)})}`;
    css += `.btn-${el}:hover{box-shadow:0 6px 20px rgb(${core} / ${a(0.55, s)}),0 0 30px rgb(${glow} / ${a(0.3, s)})}`;
  }
  css += `.pricing-featured{box-shadow:0 10px 40px rgb(var(--fire-500-rgb) / ${a(0.25, s)})}`;
  if (s === 0) css += '.animate-ember,.animate-avatar-state,.btn-avatar{animation:none}';
  return css;
};
const brandCss = (key) => {
  const b = BRANDS[key];
  let css = ':root{';
  STEPS.forEach((step, i) => { css += `--color-fire-${step}:${b.ramp[i]};`; });
  css += `--color-fire-glow:${b.ramp[4]};--fire-500-rgb:${b.c500};--fire-400-rgb:${b.c400};--fire-glow-rgb:${b.glow};`;
  css += `--fire-text:var(--color-fire-${b.text});}`;
  css += `.light{--fire-text:var(--color-fire-${b.lightText})}`;
  return css;
};
const densityCss = (key) => {
  const d = DENSITY[key];
  return [
    `.shell-main{padding:${d.page};gap:${d.section}}`,
    `.card,.testimonial-card{padding:${d.card}}`,
    `.pricing-card{padding:calc(${d.card} * 1.4) ${d.card}}`,
    `.grid2,.grid3,.grid4,.ramp10{gap:${d.grid}}`,
    `.hero{padding:${d.hero};gap:${d.heroGap}}`,
    `.sec-head h2{font-size:${d.h2}}`,
    `.sec-head p{font-size:${d.body}}`,
    `.swatch{height:${d.swatch}}`,
    `.footer{padding:${d.section}}`,
    key === 'editorial' ? '.hero-subtitle{font-size:1.5rem;max-width:760px}.sec-head{gap:12px}' : '',
    key === 'compact' ? '.hero-title{font-size:clamp(2rem,4vw,3rem)}.hero-subtitle{font-size:1rem}' : '',
  ].join('');
};

const tweaks = { brand: 'fire', glow: 1, density: 'comfortable' };
const tweakStyle = document.getElementById('tweak-style');
const applyTweaks = () => {
  // Comfortable is the stylesheet default; only emit density overrides when it changes.
  tweakStyle.textContent = brandCss(tweaks.brand) + glowCss(tweaks.glow)
    + (tweaks.density === 'comfortable' ? '' : densityCss(tweaks.density));
};
document.querySelectorAll('[data-tweak]').forEach((seg) => {
  seg.querySelectorAll('[data-value]').forEach((btn) => {
    btn.addEventListener('click', () => {
      tweaks[seg.dataset.tweak] = btn.dataset.value;
      seg.querySelectorAll('[data-value]').forEach((b) => {
        b.classList.toggle('btn-fire', b === btn);
        b.classList.toggle('btn-ghost', b !== btn);
      });
      applyTweaks();
    });
  });
});
const glowInput = document.getElementById('tweak-glow');
const glowVal = document.getElementById('tweak-glow-val');
glowInput.addEventListener('input', () => {
  tweaks.glow = parseFloat(glowInput.value);
  glowVal.textContent = tweaks.glow.toFixed(2);
  applyTweaks();
});

const tweaksPanel = document.getElementById('tweaks');
const tweaksToggle = document.getElementById('tweaks-toggle');
const setTweaksOpen = (open) => {
  tweaksPanel.hidden = !open;
  tweaksToggle.setAttribute('aria-expanded', String(open));
};
tweaksToggle.addEventListener('click', () => setTweaksOpen(tweaksPanel.hidden));
tweaksPanel.querySelector('[data-close-tweaks]').addEventListener('click', () => setTweaksOpen(false));

mountTab('colors');
