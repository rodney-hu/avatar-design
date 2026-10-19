/* @ds-bundle: {"format":4,"namespace":"ElementalUIDesignSystem_5d6c38","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"ToggleSwitch","sourcePath":"components/forms/ToggleSwitch.jsx"},{"name":"Hero","sourcePath":"components/marketing/Hero.jsx"},{"name":"PricingCard","sourcePath":"components/marketing/PricingCard.jsx"},{"name":"TestimonialCard","sourcePath":"components/marketing/TestimonialCard.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"NavLink","sourcePath":"components/navigation/NavLink.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarItem","sourcePath":"components/navigation/SidebarItem.jsx"}],"sourceHashes":{"assets/motion.js":"eb2cf9df387b","components/core/Badge.jsx":"d68ad2a95557","components/core/Button.jsx":"280c68bef99e","components/core/Card.jsx":"4c4e5bcc14b0","components/data/DataTable.jsx":"06b660a24132","components/data/StatCard.jsx":"87b267459435","components/feedback/Alert.jsx":"cf1c2800dcad","components/feedback/Modal.jsx":"72818499cb9f","components/feedback/Tooltip.jsx":"43f5087774f0","components/forms/Checkbox.jsx":"0c85859147e0","components/forms/Input.jsx":"4408375cc85d","components/forms/Select.jsx":"42c952ce4eb4","components/forms/Textarea.jsx":"abb987539068","components/forms/ToggleSwitch.jsx":"ed10ea501732","components/marketing/Hero.jsx":"3a948a57ecba","components/marketing/PricingCard.jsx":"dae3e59ad024","components/marketing/TestimonialCard.jsx":"57244d1f07ea","components/navigation/Breadcrumb.jsx":"f0163fa80a68","components/navigation/NavLink.jsx":"019d2677f83a","components/navigation/Navbar.jsx":"863d128e3de9","components/navigation/Sidebar.jsx":"9293a43e364e","components/navigation/SidebarItem.jsx":"cb20ad7196e6","ui_kits/showcase/ComponentsScreen.jsx":"9f0d0594657f","ui_kits/showcase/DataScreen.jsx":"5b9b6d30613e","ui_kits/showcase/LandingBlocksScreen.jsx":"5605ac6bbc12","ui_kits/showcase/LandingScreen.jsx":"72aaad8e9ded","ui_kits/showcase/ShowcaseShell.jsx":"8af70855fa3e","ui_kits/showcase/TweakLayer.jsx":"73a186d2e151","ui_kits/showcase/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ElementalUIDesignSystem_5d6c38 = window.ElementalUIDesignSystem_5d6c38 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/motion.js
try { (() => {
/* Elemental UI — motion runtime.
   Vanilla, dependency-free, safe to load in any page that links styles.css.
   Drives: scroll reveal + stagger, halo bloom, parallax, magnetic tilt, spotlight,
   edge-light orbit, click bursts.
   Re-scans on DOM mutation so React-rendered screens are picked up. */
(function () {
  var root = document.documentElement;
  root.classList.add('motion-ready');
  var REVEAL = '[data-reveal],[data-stagger],[data-choreo]';
  var seenBy = {};
  /* One WeakSet per feature so a single element can register for several effects. */
  function once(el, key) {
    var s = seenBy[key] || (seenBy[key] = new WeakSet());
    if (s.has(el)) return false;
    s.add(el);
    return true;
  }
  var pendingReveal = [];

  /* ---- Scroll reveal + stagger ---- */
  function reveal(el) {
    el.classList.add('is-revealed');
    if (el.dataset.revealOnce !== 'false') revealIO.unobserve(el);
    var i = pendingReveal.indexOf(el);
    if (i > -1) pendingReveal.splice(i, 1);
  }
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) reveal(e.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  /* Anything the viewport has already moved PAST never gets a forward crossing
     of the threshold — anchor jumps, restored scroll, tab switches and fast
     scrolls all land there. Reveal those immediately so no section can stick
     at opacity 0. */
  function catchUp() {
    for (var i = pendingReveal.length - 1; i >= 0; i--) {
      var el = pendingReveal[i];
      var r = el.getBoundingClientRect();
      if (r.top <= 0 || r.bottom <= window.innerHeight * 0.92) reveal(el);
    }
  }

  /* ---- Halo bloom: --bloom tracks viewport crossing ---- */
  var bloomEls = [];
  function updateBloom() {
    var vh = window.innerHeight;
    for (var i = 0; i < bloomEls.length; i++) {
      var el = bloomEls[i];
      var r = el.getBoundingClientRect();
      var center = r.top + r.height / 2;
      /* 1 at viewport centre, easing to 0 by one viewport away */
      var d = Math.min(Math.abs(center - vh / 2) / (vh * 0.75), 1);
      el.style.setProperty('--bloom', (1 - d * d).toFixed(3));
    }
  }

  /* ---- Parallax ---- */
  var parallaxEls = [];
  function updateParallax() {
    var vh = window.innerHeight;
    for (var i = 0; i < parallaxEls.length; i++) {
      var el = parallaxEls[i];
      var depth = parseFloat(el.dataset.parallax) || 0.15;
      var r = el.getBoundingClientRect();
      var progress = (r.top + r.height / 2 - vh / 2) / vh; /* -1..1-ish */
      var range = parseFloat(getComputedStyle(el).getPropertyValue('--motion-parallax-range')) || 80;
      el.style.setProperty('--parallax-y', (-progress * depth * range).toFixed(2) + 'px');
    }
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateBloom();
      updateParallax();
      catchUp();
      ticking = false;
    });
  }

  /* ---- Magnetic tilt ---- */
  function bindTilt(el) {
    var max = parseFloat(getComputedStyle(el).getPropertyValue('--motion-tilt-max')) || 7;
    var strength = parseFloat(el.dataset.tilt) || 1;
    el.addEventListener('pointermove', function (ev) {
      var r = el.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width;
      var py = (ev.clientY - r.top) / r.height;
      el.classList.add('is-tilting');
      el.style.setProperty('--tilt-y', ((px - 0.5) * 2 * max * strength).toFixed(2) + 'deg');
      el.style.setProperty('--tilt-x', ((0.5 - py) * 2 * max * strength).toFixed(2) + 'deg');
      el.style.setProperty('--pointer-x', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--pointer-y', (py * 100).toFixed(1) + '%');
    });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('is-tilting');
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    });
  }

  /* ---- Cursor spotlight ----
     [data-spotlight] lights on its own hover. [data-spotlight-group] tracks the
     pointer across a whole grid so neighbouring cards' borders catch the light. */
  function setSpot(el, ev) {
    var r = el.getBoundingClientRect();
    el.style.setProperty('--pointer-x', (ev.clientX - r.left).toFixed(1) + 'px');
    el.style.setProperty('--pointer-y', (ev.clientY - r.top).toFixed(1) + 'px');
  }
  function bindSpotlight(el) {
    if (el.closest('[data-spotlight-group]')) return;
    el.addEventListener('pointermove', function (ev) {
      setSpot(el, ev);
      el.classList.add('is-lit');
      el.style.setProperty('--spot-on', '1');
    });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('is-lit');
      el.style.setProperty('--spot-on', '0');
    });
  }
  function bindSpotGroup(g) {
    g.addEventListener('pointermove', function (ev) {
      g.querySelectorAll('[data-spotlight]').forEach(function (el) {
        setSpot(el, ev);
        el.classList.add('is-lit');
        el.style.setProperty('--spot-on', '1');
      });
    });
    g.addEventListener('pointerleave', function () {
      g.querySelectorAll('[data-spotlight]').forEach(function (el) {
        el.classList.remove('is-lit');
        el.style.setProperty('--spot-on', '0');
      });
    });
  }

  /* ---- Edge light orbit: one rAF loop writes --edge-angle ---- */
  var edgeEls = [];
  function orbit(now) {
    for (var i = 0; i < edgeEls.length; i++) {
      var el = edgeEls[i];
      var d = parseFloat(getComputedStyle(el).getPropertyValue('--edge-light-duration')) || 6;
      el.style.setProperty('--edge-angle', (now / (d * 1000) * 360 % 360).toFixed(1) + 'deg');
    }
    requestAnimationFrame(orbit);
  }
  requestAnimationFrame(orbit);
  function scan() {
    document.querySelectorAll('[data-vt]').forEach(function (el) {
      el.style.viewTransitionName = el.dataset.vt;
    });
    document.querySelectorAll('.edge-light').forEach(function (el) {
      if (!once(el, 'f0')) return;
      edgeEls.push(el);
    });
    document.querySelectorAll('[data-spotlight-group]').forEach(function (el) {
      if (!once(el, 'f1')) return;
      bindSpotGroup(el);
    });
    document.querySelectorAll('[data-spotlight]').forEach(function (el) {
      if (!once(el, 'f2')) return;
      bindSpotlight(el);
    });
    document.querySelectorAll(REVEAL).forEach(function (el) {
      if (!once(el, 'f3')) return;
      if (el.hasAttribute('data-stagger')) {
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.setProperty('--i', i);
        });
      }
      revealIO.observe(el);
      pendingReveal.push(el);
    });
    document.querySelectorAll('[data-halo-bloom]').forEach(function (el) {
      if (!once(el, 'f4')) return;
      bloomEls.push(el);
    });
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      if (!once(el, 'f5')) return;
      parallaxEls.push(el);
    });
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      if (!once(el, 'f6')) return;
      bindTilt(el);
    });
    /* Specimen-card helper: loop a reveal so it is visible in a static frame. */
    document.querySelectorAll('[data-reveal-loop]').forEach(function (el) {
      if (!once(el, 'f7')) return;
      var period = parseInt(el.dataset.revealLoop, 10) || 2800;
      setInterval(function () {
        el.classList.remove('is-revealed');
        setTimeout(function () {
          el.classList.add('is-revealed');
        }, 220);
      }, period);
      setTimeout(function () {
        el.classList.add('is-revealed');
      }, 120);
    });
    onScroll();
  }
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  window.addEventListener('resize', onScroll);
  new MutationObserver(scan).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);else scan();

  /* ---- Click burst: element-flavoured particles from the press point ----
     .btn-fire embers rise · .btn-water droplets + ripple · .btn-earth chunks
     fall under gravity · .btn-air motes spiral out · .btn-avatar cyan ring.
     Opt out per button with data-burst="off". */
  var layer = null;
  function rgbVar(name) {
    return getComputedStyle(root).getPropertyValue(name).trim() || '224 16 16';
  }
  function dot(x, y, size, color, glow) {
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'em-burst-layer';
      document.body.appendChild(layer);
    }
    var d = document.createElement('i');
    d.style.cssText = 'width:' + size + 'px;height:' + size + 'px;margin:' + -size / 2 + 'px 0 0 ' + -size / 2 + 'px;background:' + color + ';box-shadow:0 0 ' + glow + 'px ' + color;
    d.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    layer.appendChild(d);
    return d;
  }
  function fly(d, frames, dur, ease, delay) {
    var a = d.animate(frames, {
      duration: dur,
      easing: ease,
      delay: delay || 0,
      fill: 'both'
    });
    a.onfinish = function () {
      d.remove();
    };
  }
  function R(a, b) {
    return a + Math.random() * (b - a);
  }
  var BURST = {
    fire: function (x, y) {
      var core = rgbVar('--fire-glow-rgb'),
        warm = rgbVar('--fire-400-rgb');
      for (var i = 0; i < 12; i++) {
        var ang = R(-160, -20) * Math.PI / 180,
          dist = R(18, 46),
          dx = Math.cos(ang) * dist,
          dy = Math.sin(ang) * dist;
        var col = 'rgb(' + (i % 3 ? warm : core) + ')';
        fly(dot(x, y, R(2.5, 5), col, 8), [{
          transform: 'translate(' + x + 'px,' + y + 'px) scale(1)',
          opacity: 1
        }, {
          transform: 'translate(' + (x + dx) + 'px,' + (y + dy) + 'px) scale(.9)',
          opacity: 1,
          offset: .35
        }, {
          transform: 'translate(' + (x + dx * 1.3 + R(-8, 8)) + 'px,' + (y + dy - R(24, 48)) + 'px) scale(.2)',
          opacity: 0
        }], R(560, 820), 'cubic-bezier(0.2,0.9,0.1,1)');
      }
    },
    water: function (x, y) {
      var c = rgbVar('--water-glow-rgb');
      var ring = dot(x, y, 10, 'transparent', 0);
      ring.style.border = '1.5px solid rgb(' + c + ')';
      ring.style.boxShadow = '0 0 10px rgb(' + c + ' / .6)';
      fly(ring, [{
        transform: 'translate(' + x + 'px,' + y + 'px) scale(.4)',
        opacity: .9
      }, {
        transform: 'translate(' + x + 'px,' + y + 'px) scale(7)',
        opacity: 0
      }], 900, 'cubic-bezier(0.37,0,0.63,1)');
      for (var i = 0; i < 9; i++) {
        var ang = i / 9 * Math.PI * 2 + R(-.2, .2),
          dist = R(26, 42);
        fly(dot(x, y, R(3, 5), 'rgb(' + c + ')', 6), [{
          transform: 'translate(' + x + 'px,' + y + 'px) scale(1)',
          opacity: 1
        }, {
          transform: 'translate(' + (x + Math.cos(ang) * dist) + 'px,' + (y + Math.sin(ang) * dist + 14) + 'px) scale(.3)',
          opacity: 0
        }], R(760, 980), 'cubic-bezier(0.37,0,0.63,1)', 60);
      }
    },
    earth: function (x, y) {
      var c = rgbVar('--earth-500-rgb'),
        g = rgbVar('--earth-glow-rgb');
      for (var i = 0; i < 8; i++) {
        var dx = R(-38, 38),
          up = R(16, 34),
          s = R(3.5, 6.5),
          rot = R(-200, 200);
        var d = dot(x, y, s, 'rgb(' + (i % 3 ? c : g) + ')', 3);
        d.style.borderRadius = '1px';
        fly(d, [{
          transform: 'translate(' + x + 'px,' + y + 'px) rotate(0deg)',
          opacity: 1
        }, {
          transform: 'translate(' + (x + dx * .55) + 'px,' + (y - up) + 'px) rotate(' + rot * .5 + 'deg)',
          opacity: 1,
          offset: .32,
          easing: 'cubic-bezier(0.5,0,0.75,0)'
        }, {
          transform: 'translate(' + (x + dx) + 'px,' + (y + R(30, 50)) + 'px) rotate(' + rot + 'deg)',
          opacity: 0
        }], R(620, 760), 'cubic-bezier(0.25,1,0.5,1)');
      }
    },
    air: function (x, y) {
      var c = rgbVar('--air-glow-rgb');
      for (var i = 0; i < 10; i++) {
        var a0 = i / 10 * 360,
          sweep = R(80, 140),
          r = R(28, 46),
          s = R(2.5, 4.5);
        var frames = [];
        for (var k = 0; k <= 6; k++) {
          var t = k / 6,
            ang = (a0 + sweep * t) * Math.PI / 180,
            rr = r * t;
          frames.push({
            transform: 'translate(' + (x + Math.cos(ang) * rr) + 'px,' + (y + Math.sin(ang) * rr - 10 * t) + 'px) scale(' + (1 - t * .7) + ')',
            opacity: k === 6 ? 0 : 1
          });
        }
        fly(dot(x, y, s, 'rgb(' + c + ')', 6), frames, R(820, 1000), 'cubic-bezier(0.16,1,0.3,1)');
      }
    },
    avatar: function (x, y) {
      var c = rgbVar('--avatar-glow-rgb');
      [0, 120].forEach(function (delay) {
        var ring = dot(x, y, 12, 'transparent', 0);
        ring.style.border = '1.5px solid rgb(' + c + ')';
        ring.style.boxShadow = '0 0 14px rgb(' + c + ' / .7)';
        fly(ring, [{
          transform: 'translate(' + x + 'px,' + y + 'px) scale(.3)',
          opacity: 1
        }, {
          transform: 'translate(' + x + 'px,' + y + 'px) scale(6)',
          opacity: 0
        }], 800, 'cubic-bezier(0.16,1,0.3,1)', delay);
      });
    }
  };
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest && e.target.closest('.btn');
    if (!b || b.disabled || b.getAttribute('aria-disabled') === 'true' || b.dataset.burst === 'off') return;
    var kind = ['fire', 'water', 'earth', 'air', 'avatar'].filter(function (k) {
      return b.classList.contains('btn-' + k);
    })[0];
    if (kind) BURST[kind](e.clientX, e.clientY);
  }, {
    passive: true
  });

  /* ---- Page transitions (View Transitions API, instant fallback) ---- */
  var canVT = typeof document.startViewTransition === 'function';
  if (canVT) root.classList.add('vt-supported');
  function transition(update) {
    var run = function () {
      if (window.ReactDOM && window.ReactDOM.flushSync) window.ReactDOM.flushSync(update);else update();
      scan();
    };
    if (!canVT) {
      run();
      return Promise.resolve();
    }
    return document.startViewTransition(run).finished.catch(function () {});
  }
  window.ElementalMotion = {
    scan: scan,
    transition: transition,
    burst: function (kind, x, y) {
      (BURST[kind] || BURST.fire)(x, y);
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/motion.js", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  fire: 'badge-fire',
  water: 'badge-water',
  earth: 'badge-earth',
  air: 'badge-air',
  avatar: 'badge-avatar'
};
function Badge({
  variant = 'fire',
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['badge', VARIANTS[variant], className].filter(Boolean).join(' ')
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  fire: 'btn-fire',
  water: 'btn-water',
  earth: 'btn-earth',
  air: 'btn-air',
  avatar: 'btn-avatar',
  outline: 'btn-outline',
  ghost: 'btn-ghost'
};
const SIZES = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg'
};
function Button({
  variant = 'fire',
  size = 'md',
  iconOnly = false,
  fullWidth = false,
  sheen = true,
  burst = true,
  as = 'button',
  children,
  className = '',
  style,
  ...rest
}) {
  const Tag = as;
  const cls = ['btn', VARIANTS[variant], SIZES[size], iconOnly && 'btn-icon', !sheen && 'btn-no-sheen', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    style: fullWidth ? {
      width: '100%',
      ...style
    } : style,
    "data-burst": burst ? undefined : 'off'
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  base: '',
  raised: 'card-raised',
  fire: 'card-fire',
  water: 'card-water',
  earth: 'card-earth',
  air: 'card-air',
  glass: 'card-glass glass border-gradient'
};
function Card({
  variant = 'base',
  elevation = 1,
  lift = false,
  spotlight = false,
  edgeLight = false,
  grain = false,
  element,
  children,
  className = '',
  style,
  ...rest
}) {
  const ring = edgeLight ? 'edge-light' : null;
  const cls = ['card', VARIANTS[variant], 'elevation-' + elevation, lift && 'elevation-lift', ring, grain && 'grain', element && 'element-' + element, className];
  const spot = spotlight && !edgeLight && variant !== 'glass' ? {
    'data-spotlight': ''
  } : {};
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls.filter(Boolean).join(' '),
    style: style
  }, spot, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DataTable({
  columns = [],
  rows = [],
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("table", _extends({
    className: ['table-elemental', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i
  }, typeof c === 'string' ? c : c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, r) => /*#__PURE__*/React.createElement("tr", {
    key: r
  }, row.map((cell, c) => /*#__PURE__*/React.createElement("td", {
    key: c
  }, cell))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TINT = {
  fire: 'var(--color-fire-500)',
  water: 'var(--color-water-500)',
  earth: 'var(--color-earth-500)',
  air: 'var(--color-air-500)',
  none: 'var(--color-text-primary)'
};
const GLOW = {
  fire: 'text-glow-fire',
  water: 'text-glow-water',
  earth: 'text-glow-earth',
  air: 'text-glow-air',
  none: ''
};
const BORDER = {
  fire: 'rgb(var(--fire-500-rgb) / 0.3)',
  water: 'rgb(var(--water-500-rgb) / 0.3)',
  earth: 'rgb(var(--earth-500-rgb) / 0.3)',
  air: 'rgb(var(--air-500-rgb) / 0.3)',
  none: 'var(--color-border-subtle)'
};

/* "1,420 L/s" -> { pre:'', n:1420, dec:0, comma:true, post:' L/s' } */
function parse(v) {
  if (typeof v === 'number') return {
    pre: '',
    n: v,
    dec: (String(v).split('.')[1] || '').length,
    comma: false,
    post: ''
  };
  if (typeof v !== 'string') return null;
  const m = v.match(/^([^\d-]*)(-?[\d,]*\.?\d+)([\s\S]*)$/);
  if (!m) return null;
  return {
    pre: m[1],
    n: parseFloat(m[2].replace(/,/g, '')),
    dec: (m[2].split('.')[1] || '').length,
    comma: m[2].includes(','),
    post: m[3]
  };
}
function fmt(p, n) {
  const s = p.comma ? n.toLocaleString('en-US', {
    minimumFractionDigits: p.dec,
    maximumFractionDigits: p.dec
  }) : n.toFixed(p.dec);
  return p.pre + s + p.post;
}
const easeOut = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
function StatCard({
  label,
  value,
  delta,
  element = 'none',
  countUp = true,
  flash = true,
  duration = 1100,
  className = '',
  style,
  ...rest
}) {
  const cardRef = React.useRef(null);
  const valRef = React.useRef(null);
  const prev = React.useRef(null);
  const raf = React.useRef(0);
  const parsed = parse(value);
  const run = (from, p, ms) => {
    cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - t0) / ms);
      if (valRef.current) valRef.current.textContent = fmt(p, from + (p.n - from) * easeOut(t));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  React.useLayoutEffect(() => {
    const p = parsed;
    const old = prev.current;
    prev.current = p;
    if (!p || !valRef.current) return;
    if (old === null) {
      if (!countUp) return;
      valRef.current.textContent = fmt(p, 0);
      const io = new IntersectionObserver(es => {
        if (es[0].isIntersecting) {
          io.disconnect();
          run(0, p, duration);
        }
      }, {
        threshold: 0.4
      });
      io.observe(cardRef.current);
      return () => io.disconnect();
    }
    if (old && old.n !== p.n) {
      run(old.n, p, duration * 0.64);
      if (flash && cardRef.current) {
        const el = cardRef.current;
        el.removeAttribute('data-flash');
        void el.offsetWidth;
        el.setAttribute('data-flash', p.n > old.n ? 'up' : 'down');
      }
    }
  }, [parsed ? parsed.n : value]);
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: cardRef,
    className: ['stat-card', className].filter(Boolean).join(' '),
    style: {
      borderColor: BORDER[element],
      ...style
    },
    onAnimationEnd: e => {
      if (e.target === cardRef.current) e.currentTarget.removeAttribute('data-flash');
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, label), /*#__PURE__*/React.createElement("span", {
    ref: valRef,
    className: ['stat-value', GLOW[element]].filter(Boolean).join(' '),
    style: {
      color: TINT[element]
    }
  }, parsed ? fmt(parsed, parsed.n) : value), delta && /*#__PURE__*/React.createElement("span", {
    className: "stat-delta",
    style: {
      display: 'block',
      fontSize: '0.75rem',
      color: element === 'none' ? 'var(--color-text-muted)' : TINT[element]
    }
  }, delta));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  fire: 'alert-fire',
  water: 'alert-water',
  earth: 'alert-earth',
  air: 'alert-air'
};
function Alert({
  variant = 'fire',
  icon,
  title,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['alert', VARIANTS[variant], className].filter(Boolean).join(' ')
  }, rest), icon, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: '0.875rem'
    }
  }, title), children && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: title ? '0.125rem 0 0' : 0,
      fontSize: title ? '0.75rem' : 'inherit',
      color: title ? 'var(--color-text-secondary)' : 'inherit'
    }
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const EXIT_MS = 450;
function Modal({
  open = true,
  title,
  onClose,
  footer,
  glass = true,
  children,
  className = '',
  ...rest
}) {
  const [mounted, setMounted] = React.useState(open);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return undefined;
    }
    if (!mounted) return undefined;
    setClosing(true);
    const t = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [open]);
  React.useEffect(() => {
    if (!mounted || closing || !onClose) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, closing, onClose]);
  if (!mounted) return null;
  const state = closing ? 'closed' : 'open';
  const cls = ['modal', 'elevation-4', glass && 'glass-thick border-gradient', className];
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    "data-state": state,
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: cls.filter(Boolean).join(' '),
    "data-state": state,
    style: {
      '--elevation-glow': 'var(--shadow-fire)'
    },
    role: "dialog",
    "aria-modal": "true"
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--color-border-subtle)',
      paddingBottom: '0.75rem',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.35rem',
      fontWeight: 700,
      color: 'var(--color-fire-500)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--color-text-muted)',
      fontWeight: 700,
      fontSize: '1.25rem',
      cursor: 'pointer',
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)',
      lineHeight: 1.6,
      marginBottom: footer ? '1.5rem' : 0
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  text,
  side = 'top',
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['tooltip', className].filter(Boolean).join(' '),
    "data-side": side
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "tooltip-text",
    role: "tooltip"
  }, text));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RGB = {
  fire: 'var(--fire-500-rgb)',
  water: 'var(--water-500-rgb)',
  earth: 'var(--earth-500-rgb)',
  air: 'var(--air-500-rgb)'
};
function Checkbox({
  label,
  id,
  element = 'fire',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.9375rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "check",
    style: {
      '--field-rgb': RGB[element]
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: "checkbox",
    className: ['checkbox', className].filter(Boolean).join(' ')
  }, rest)), /*#__PURE__*/React.createElement("svg", {
    className: "check-mark",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    pathLength: "1",
    d: "M3.5 8.5l3 3 6-7"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ELEMENT = {
  fire: '',
  water: 'input-water',
  earth: 'input-earth',
  air: 'input-air'
};
function Input({
  label,
  element = 'fire',
  underline = true,
  className = '',
  id,
  ...rest
}) {
  const input = /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    className: ['input', ELEMENT[element], className].filter(Boolean).join(' ')
  }, rest));
  const control = underline ? /*#__PURE__*/React.createElement("span", {
    className: "field-control"
  }, input, /*#__PURE__*/React.createElement("span", {
    className: "field-line",
    "aria-hidden": "true"
  })) : input;
  if (!label && !underline) return input;
  return /*#__PURE__*/React.createElement("div", {
    className: ['field', element !== 'fire' && 'field-' + element].filter(Boolean).join(' ')
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: "stat-label field-label",
    style: {
      fontSize: '0.75rem'
    }
  }, label), control);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  children,
  className = '',
  id,
  ...rest
}) {
  const field = /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    className: ['select', className].filter(Boolean).join(' ')
  }, rest), children || options.map(o => /*#__PURE__*/React.createElement("option", {
    key: typeof o === 'string' ? o : o.value,
    value: typeof o === 'string' ? o : o.value
  }, typeof o === 'string' ? o : o.label)));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: "stat-label",
    style: {
      fontSize: '0.75rem'
    }
  }, label), field);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  label,
  rows = 3,
  className = '',
  id,
  ...rest
}) {
  const field = /*#__PURE__*/React.createElement("textarea", _extends({
    id: id,
    rows: rows,
    className: ['textarea', className].filter(Boolean).join(' ')
  }, rest));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: "stat-label",
    style: {
      fontSize: '0.75rem'
    }
  }, label), field);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/forms/ToggleSwitch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ToggleSwitch({
  label,
  id,
  ...rest
}) {
  const control = /*#__PURE__*/React.createElement("label", {
    className: "toggle-switch"
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "toggle-slider"
  }));
  if (!label) return control;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--color-text-muted)'
    }
  }, label), control);
}
Object.assign(__ds_scope, { ToggleSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ToggleSwitch.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Hero.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HALOS = {
  fire: 'hero-fire',
  water: 'hero-water',
  earth: 'hero-earth',
  air: 'hero-air'
};
const GLOWS = {
  fire: 'text-glow-fire',
  water: 'text-glow-water',
  earth: 'text-glow-earth',
  air: 'text-glow-air'
};
function Hero({
  element = 'fire',
  eyebrow,
  title,
  subtitle,
  actions,
  glowTitle = true,
  parallaxHalo = false,
  children,
  className = '',
  ...rest
}) {
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      justifyContent: 'center'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: ['hero-title', glowTitle && GLOWS[element]].filter(Boolean).join(' '),
    style: {
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "hero-subtitle",
    style: {
      margin: 0
    }
  }, subtitle), children, actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'center'
    }
  }, actions));

  // parallaxHalo moves the radial halo off the section and onto its own layer so
  // the two can drift at different rates. Content rides at a fraction of the
  // halo's travel, which is what reads as depth.
  // The layer is offset by ABSOLUTE px, not a percentage height: a
  // `radial-gradient(circle …)` sizes its radius off its own box, so an
  // oversized layer pushes the fade-to-transparent outside the hero and the
  // wash reads as a solid slab. 40px top/bottom covers the max travel
  // (0.35 depth x 80px range = 28px) and leaves the radius essentially intact.
  if (parallaxHalo) {
    return /*#__PURE__*/React.createElement("section", _extends({
      className: ['hero', className].filter(Boolean).join(' ')
    }, rest), /*#__PURE__*/React.createElement("div", {
      className: HALOS[element],
      "data-parallax": "0.35",
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        top: -40,
        bottom: -40,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        zIndex: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      "data-parallax": "0.08",
      style: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'inherit',
        width: '100%'
      }
    }, content));
  }
  return /*#__PURE__*/React.createElement("section", _extends({
    className: ['hero', HALOS[element], className].filter(Boolean).join(' ')
  }, rest), content);
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PricingCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PricingCard({
  tier,
  name,
  price,
  period = '/mo',
  description,
  features = [],
  action,
  featured = false,
  ribbon,
  element = 'fire',
  spotlight = true,
  className = '',
  ...rest
}) {
  const glow = featured ? {
    color: 'var(--color-fire-500)'
  } : undefined;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['pricing-card', featured ? 'pricing-featured edge-light elevation-3' : 'elevation-1 elevation-lift', 'element-' + element, className].filter(Boolean).join(' ')
  }, spotlight && !featured ? {
    'data-spotlight': ''
  } : {}, rest), ribbon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-0.75rem',
      right: '1.5rem'
    }
  }, ribbon), tier, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      fontWeight: 700
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    className: ['pricing-price', featured && 'text-glow-fire'].filter(Boolean).join(' '),
    style: glow
  }, price, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: 'var(--color-text-muted)'
    }
  }, period)), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)'
    }
  }, description), features.length > 0 && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)'
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, f))), action);
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PricingCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TestimonialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: ['testimonial-card', className].filter(Boolean).join(' '),
    style: {
      margin: 0
    }
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    className: "testimonial-quote",
    style: {
      margin: 0
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    className: "testimonial-author"
  }, avatar, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: '0.9375rem'
    }
  }, author), role && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8125rem',
      color: 'var(--color-text-muted)'
    }
  }, role))));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Breadcrumb({
  items = [],
  separator = '/',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: ['breadcrumb', className].filter(Boolean).join(' '),
    "aria-label": "Breadcrumb"
  }, rest), items.map((item, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, separator), item.href && i < items.length - 1 ? /*#__PURE__*/React.createElement("a", {
    className: "breadcrumb-item",
    href: item.href
  }, item.label) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-primary)'
    }
  }, item.label))));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavLink({
  active = false,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    className: ['nav-link', active && 'nav-link-active', className].filter(Boolean).join(' ')
  }, rest), children);
}
Object.assign(__ds_scope, { NavLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavLink.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Navbar({
  brand,
  children,
  actions,
  glass = true,
  scrolled = false,
  className = '',
  ...rest
}) {
  const cls = ['navbar', glass && 'glass-thick', scrolled ? 'elevation-2' : 'navbar-edge', className];
  return /*#__PURE__*/React.createElement("header", _extends({
    className: cls.filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav-brand"
  }, brand), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }
  }, actions));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Sidebar({
  header,
  footer,
  children,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    className: ['sidebar', className].filter(Boolean).join(' '),
    style: style
  }, rest), header, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      flex: 1
    }
  }, children), footer);
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarItem({
  active = false,
  icon,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    className: ['sidebar-item', active && 'sidebar-item-active', className].filter(Boolean).join(' ')
  }, rest), icon, /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { SidebarItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarItem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showcase/ComponentsScreen.jsx
try { (() => {
const {
  Badge,
  Button,
  Card,
  Input,
  Select,
  Textarea,
  Checkbox,
  ToggleSwitch,
  Tooltip
} = window.ElementalUIDesignSystem_5d6c38;
function ComponentsScreen({
  onModal
}) {
  const elements = ['fire', 'water', 'earth', 'air', 'avatar'];
  return /*#__PURE__*/React.createElement("main", {
    className: "shell-main"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-halo-bloom": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "water",
    style: {
      width: 'fit-content'
    }
  }, "03. Buttons & Actions"), /*#__PURE__*/React.createElement("h2", null, "Bending Action Buttons"), /*#__PURE__*/React.createElement("p", null, "Elemental hover glows, tactile active states, and custom variants.")), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    "data-reveal": true
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "stat-label",
    style: {
      margin: '0 0 0.75rem'
    }
  }, "Elemental variants"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, elements.map(e => /*#__PURE__*/React.createElement(Button, {
    key: e,
    variant: e
  }, e[0].toUpperCase() + e.slice(1))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "stat-label",
    style: {
      margin: '0 0 0.75rem'
    }
  }, "Styles & sizes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, "Large Fire"), /*#__PURE__*/React.createElement(Button, null, "Medium Fire"), /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, "Small Fire"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Outline"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Ghost Link"), /*#__PURE__*/React.createElement(Button, {
    disabled: true
  }, "Disabled"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-halo-bloom": "earth"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "earth",
    style: {
      width: 'fit-content'
    }
  }, "04. Cards & Containers"), /*#__PURE__*/React.createElement("h2", null, "Layered Surfaces & Glass"), /*#__PURE__*/React.createElement("p", null, "Depth layers from #0a0a0a to elevated cards with glowing borders.")), /*#__PURE__*/React.createElement("div", {
    className: "grid3",
    "data-stagger": true
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "fire",
    elevation: 2,
    "data-tilt": true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "fire"
  }, "Fire Nation"), "            "), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 700
    }
  }, "Sun Warrior Temple"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)'
    }
  }, "The original source of firebending power, guarded by the dragons Ran and Shaw."), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    fullWidth: true
  }, "Enter Temple")), /*#__PURE__*/React.createElement(Card, {
    variant: "water",
    elevation: 2,
    "data-tilt": true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "water"
  }, "Northern Tribe"), "            "), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 700
    }
  }, "Spirit Oasis"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)'
    }
  }, "A sacred haven at the North Pole where Tui and La circle in eternal harmony."), /*#__PURE__*/React.createElement(Button, {
    variant: "water",
    size: "sm",
    fullWidth: true
  }, "Visit Sanctuary")), /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    elevation: 2,
    "data-tilt": true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "avatar"
  }, "Glassmorphism"), "            "), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 700
    }
  }, "Cosmic Energy Overlay"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)'
    }
  }, "Backdrop blur at 16px with glowing highlights."), /*#__PURE__*/React.createElement(Button, {
    variant: "avatar",
    size: "sm",
    fullWidth: true,
    onClick: onModal
  }, "Unlock Energy")))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-halo-bloom": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "fire",
    style: {
      width: 'fit-content'
    }
  }, "05. Forms & Inputs"), /*#__PURE__*/React.createElement("h2", null, "Form Controls"), /*#__PURE__*/React.createElement("p", null, "Inputs with elemental focus halos, custom toggles, and select menus.")), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem'
    },
    "data-reveal": true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    id: "avatar-name",
    label: "Avatar Name",
    defaultValue: "Aang",
    placeholder: "e.g. Aang, Korra, Roku"
  }), /*#__PURE__*/React.createElement(Select, {
    id: "primary-element",
    label: "Primary Element",
    options: ['Firebending', 'Waterbending', 'Earthbending', 'Airbending']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "scroll-notes",
    label: "Scroll Notes",
    placeholder: "Write ancient bending techniques..."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "avatar-state",
    label: "Enable Avatar State",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(ToggleSwitch, {
    id: "ember-glow",
    label: "Ember Glow",
    defaultChecked: true
  }))))));
}
Object.assign(window, {
  ComponentsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showcase/ComponentsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showcase/DataScreen.jsx
try { (() => {
const {
  Badge,
  StatCard,
  DataTable,
  Alert,
  Breadcrumb,
  Sidebar,
  SidebarItem
} = window.ElementalUIDesignSystem_5d6c38;
function DataScreen() {
  const [power, setPower] = React.useState(98.4);
  React.useEffect(() => {
    const t = setInterval(() => setPower(p => Math.round(Math.min(99.9, Math.max(94, p + (Math.random() - 0.45) * 3)) * 10) / 10), 4000);
    return () => clearInterval(t);
  }, []);
  return /*#__PURE__*/React.createElement("main", {
    className: "shell-main"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-halo-bloom": "water"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "water",
    style: {
      width: 'fit-content'
    }
  }, "06. Data & Dashboards"), /*#__PURE__*/React.createElement("h2", null, "Stats & Tables"), /*#__PURE__*/React.createElement("p", null, "Data components for SaaS dashboards and analytics screens.")), /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: 'Nations',
      href: '#'
    }, {
      label: 'Fire Nation',
      href: '#'
    }, {
      label: 'Caldera'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid4",
    "data-stagger": true
  }, /*#__PURE__*/React.createElement(StatCard, {
    element: "fire",
    label: "Fire Power Index",
    value: power.toFixed(1) + '%',
    delta: "\u2191 +14.2% Comet boost"
  }), /*#__PURE__*/React.createElement(StatCard, {
    element: "water",
    label: "Oceanic Flow Rate",
    value: "1,420 L/s",
    delta: "Full Moon Alignment"
  }), /*#__PURE__*/React.createElement(StatCard, {
    element: "earth",
    label: "Seismic Density",
    value: "840 MPa",
    delta: "Ground vibration stable"
  }), /*#__PURE__*/React.createElement(StatCard, {
    element: "air",
    label: "Air Velocity",
    value: "120 km/h",
    delta: "Glider lift optimal"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'flex-start'
    },
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Sidebar, {
    style: {
      height: 'auto',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(SidebarItem, {
    active: true
  }, "Fire Nation"), /*#__PURE__*/React.createElement(SidebarItem, null, "Water Tribe"), /*#__PURE__*/React.createElement(SidebarItem, null, "Earth Kingdom"), /*#__PURE__*/React.createElement(SidebarItem, null, "Air Nomads")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: ['Master', 'Affiliation', 'Specialty', 'Status'],
    rows: [[/*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--color-fire-400)'
      }
    }, "Zuko"), 'Fire Nation', 'Lightning Redirection', /*#__PURE__*/React.createElement(Badge, {
      variant: "fire"
    }, "Active Fire Lord")], [/*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--color-water-400)'
      }
    }, "Katara"), 'Southern Water Tribe', 'Bloodbending / Healing', /*#__PURE__*/React.createElement(Badge, {
      variant: "water"
    }, "Grandmaster")], [/*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--color-earth-400)'
      }
    }, "Toph Beifong"), 'Earth Kingdom', 'Metalbending Creator', /*#__PURE__*/React.createElement(Badge, {
      variant: "earth"
    }, "Chief of Police")], [/*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--color-air-400)'
      }
    }, "Aang"), 'Air Nomads', 'Energybending', /*#__PURE__*/React.createElement(Badge, {
      variant: "avatar"
    }, "Avatar State")]]
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-halo-bloom": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "fire",
    style: {
      width: 'fit-content'
    }
  }, "07. Feedback & Alerts"), /*#__PURE__*/React.createElement("h2", null, "Elemental Notifications"), /*#__PURE__*/React.createElement("p", null, "Status callouts themed after each element.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    "data-stagger": true
  }, /*#__PURE__*/React.createElement(Alert, {
    variant: "fire"
  }, /*#__PURE__*/React.createElement("b", null, "Fire Warning:"), " High thermal activity detected in the Caldera."), /*#__PURE__*/React.createElement(Alert, {
    variant: "water"
  }, /*#__PURE__*/React.createElement("b", null, "Water Info:"), " Tidal waves arriving at high tide tonight."), /*#__PURE__*/React.createElement(Alert, {
    variant: "earth"
  }, /*#__PURE__*/React.createElement("b", null, "Earth Success:"), " Defense walls fortified at Ba Sing Se."), /*#__PURE__*/React.createElement(Alert, {
    variant: "air"
  }, /*#__PURE__*/React.createElement("b", null, "Air Notice:"), " Tailwinds favorable for Northern Air Temple flight."))));
}
Object.assign(window, {
  DataScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showcase/DataScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showcase/LandingBlocksScreen.jsx
try { (() => {
const {
  Badge,
  Button,
  Card,
  PricingCard,
  TestimonialCard
} = window.ElementalUIDesignSystem_5d6c38;
function LandingBlocksScreen() {
  return /*#__PURE__*/React.createElement("main", {
    className: "shell-main"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-halo-bloom": "avatar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "avatar",
    style: {
      width: 'fit-content'
    }
  }, "08. SaaS & Landing Blocks"), /*#__PURE__*/React.createElement("h2", null, "Pricing & Testimonials"), /*#__PURE__*/React.createElement("p", null, "Pre-built landing page layouts designed for conversion.")), /*#__PURE__*/React.createElement("div", {
    className: "grid3",
    style: {
      alignItems: 'center',
      gap: '2rem'
    },
    "data-stagger": true,
    "data-spotlight-group": true
  }, /*#__PURE__*/React.createElement(PricingCard, {
    tier: /*#__PURE__*/React.createElement(Badge, {
      variant: "air",
      style: {
        width: 'fit-content'
      }
    }, "Initiate"),
    name: "Air Nomad",
    price: "$19",
    description: "Essential bending tokens and basic components.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      fullWidth: true
    }, "Start Free Trial")
  }), /*#__PURE__*/React.createElement(PricingCard, {
    featured: true,
    ribbon: /*#__PURE__*/React.createElement(Badge, {
      variant: "fire"
    }, "Most Popular"),
    tier: /*#__PURE__*/React.createElement(Badge, {
      variant: "fire",
      style: {
        width: 'fit-content'
      }
    }, "Fire Master"),
    name: "Fire Nation Pro",
    price: "$49",
    description: "Full elemental component suite, glowing effects and the Tailwind v4 preset.",
    action: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true
    }, "Unlock Full Power")
  }), /*#__PURE__*/React.createElement(PricingCard, {
    tier: /*#__PURE__*/React.createElement(Badge, {
      variant: "avatar",
      style: {
        width: 'fit-content'
      }
    }, "Avatar"),
    name: "Avatar Enterprise",
    price: "$149",
    description: "Custom element styling, dedicated support and source SVGs.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      fullWidth: true
    }, "Contact White Lotus")
  })), /*#__PURE__*/React.createElement(TestimonialCard, {
    "data-reveal": true,
    quote: "Water is the element of change. Earth is the element of substance. Fire is the element of power. Air is the element of freedom.",
    author: "Iroh",
    role: "Order of the White Lotus"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      borderTop: '1px solid var(--color-border-subtle)',
      paddingTop: '4rem'
    },
    "data-halo-bloom": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "fire",
    style: {
      width: 'fit-content'
    }
  }, "09. Installation Guide"), /*#__PURE__*/React.createElement("h2", null, "How to Use in Any Tailwind v4 Project"), /*#__PURE__*/React.createElement("p", null, "One CSS file unlocks the entire elemental system.")), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    "data-reveal": true
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)'
    }
  }, "Add this import to your project's main stylesheet:"), /*#__PURE__*/React.createElement("div", {
    className: "code-block"
  }, /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("code", null, '@import "tailwindcss";\n@import "./path/to/avatar-design/src/index.css";'))))));
}
Object.assign(window, {
  LandingBlocksScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showcase/LandingBlocksScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showcase/LandingScreen.jsx
try { (() => {
const {
  Hero,
  Badge,
  Button,
  Card
} = window.ElementalUIDesignSystem_5d6c38;
const RAMP = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const DARK_TEXT = {
  fire: [50, 100, 200, 300],
  water: [50, 100, 200, 300],
  earth: [50, 100, 200, 300, 400],
  air: [50, 100, 200, 300, 400, 500]
};

/* The palette specimen documents the TRUE ramps, so it reads literal hexes
   rather than the tokens — the Brand tweak repoints --color-fire-* and would
   otherwise make this section state the wrong values. Keep in sync with
   tokens/colors.css. */
const RAMPS = {
  fire: ['#fff2f2', '#ffd6d6', '#ffa3a3', '#f76d6d', '#dd3333', '#aa0000', '#8f0000', '#6e0000', '#4d0000', '#2e0000'],
  water: ['#f0f9ff', '#cce8ff', '#8ecfff', '#4db8ff', '#1aa3ff', '#0088e0', '#006db3', '#005289', '#003a63', '#00243d'],
  earth: ['#f0fff4', '#c6f6d5', '#88e8a0', '#4cd964', '#2ecc40', '#27ae34', '#1f8c2a', '#186b20', '#114e18', '#0a3010'],
  air: ['#fffef5', '#fff8cc', '#ffed8a', '#ffe048', '#ffd700', '#e6bf00', '#b89700', '#8a7100', '#5c4b00', '#3a3000']
};
function Ramp({
  family
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ramp10"
  }, RAMP.map((step, i) => /*#__PURE__*/React.createElement("div", {
    key: step
  }, /*#__PURE__*/React.createElement("div", {
    className: "swatch",
    style: {
      background: RAMPS[family][i],
      color: DARK_TEXT[family].includes(step) ? '#000' : '#fff',
      border: step === 50 ? '1px solid var(--color-border-subtle)' : undefined
    }
  }, step >= 200 ? step : ''), /*#__PURE__*/React.createElement("div", {
    className: "ckey"
  }, step, step === 500 && family === 'fire' ? ' (CTA)' : ''))));
}
function PaletteBlock({
  family,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    "data-reveal": true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 600
    }
  }, title)), /*#__PURE__*/React.createElement(Ramp, {
    family: family
  }));
}
function LandingScreen({
  onToast,
  onModal
}) {
  const [element, setElement] = React.useState('fire');
  const elements = ['fire', 'water', 'earth', 'air'];
  const labels = {
    fire: 'Fire Nation',
    water: 'Water Tribe',
    earth: 'Earth Kingdom',
    air: 'Air Nomads'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    element: element,
    parallaxHalo: true,
    className: "animate-fade-in-up",
    style: {
      borderBottom: '1px solid var(--color-border-subtle)'
    },
    eyebrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      variant: "fire"
    }, "Fire Primary"), /*#__PURE__*/React.createElement(Badge, {
      variant: "water"
    }, "Water"), /*#__PURE__*/React.createElement(Badge, {
      variant: "earth"
    }, "Earth"), /*#__PURE__*/React.createElement(Badge, {
      variant: "air"
    }, "Air"), /*#__PURE__*/React.createElement(Badge, {
      variant: "avatar"
    }, "Avatar State")),
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Harness the Elements", /*#__PURE__*/React.createElement("br", null), "in Your UI"),
    subtitle: "A complete dark-theme design system. Token-driven surfaces, elemental glows, and pre-built components for SaaS, landing pages, and web applications.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: element,
      size: "lg",
      className: "motion-gradient-drift-slow",
      onClick: onToast
    }, "Unleash Toast"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "lg",
      onClick: onModal
    }, "Open Bending Modal"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '0.5rem',
      background: 'var(--color-surface-raised)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-xl)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-label",
    style: {
      padding: '0 0.5rem',
      fontSize: '0.75rem'
    }
  }, "Theme preview"), elements.map(e => /*#__PURE__*/React.createElement(Button, {
    key: e,
    size: "sm",
    variant: element === e ? e : 'ghost',
    onClick: () => setElement(e)
  }, labels[e])))), /*#__PURE__*/React.createElement("main", {
    className: "shell-main"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    "data-halo-bloom": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "fire",
    style: {
      width: 'fit-content'
    }
  }, "01. Color Palette"), /*#__PURE__*/React.createElement("h2", null, "The Four Nations Palette"), /*#__PURE__*/React.createElement("p", null, "Deep dark surface system paired with vibrant elemental accents.")), /*#__PURE__*/React.createElement(PaletteBlock, {
    family: "fire",
    title: "Fire Nation (Primary Palette)"
  }), /*#__PURE__*/React.createElement(PaletteBlock, {
    family: "water",
    title: "Water Tribe (Secondary Palette)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem'
    },
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(PaletteBlock, {
    family: "earth",
    title: "Earth Kingdom"
  }), /*#__PURE__*/React.createElement(PaletteBlock, {
    family: "air",
    title: "Air Nomads"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-halo-bloom": "air"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "air",
    style: {
      width: 'fit-content'
    }
  }, "02. Typography"), /*#__PURE__*/React.createElement("h2", null, "Type Hierarchy"), /*#__PURE__*/React.createElement("p", null, "Inter for every headline, a brush face for standalone element headings and all interface copy, JetBrains Mono for code.")), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    "data-stagger": true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--color-border-subtle)',
      paddingBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ckey",
    style: {
      textAlign: 'left',
      margin: '0 0 4px'
    }
  }, "Display / Inter 800 / 80px"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(2.75rem,6.5vw,5rem)',
      lineHeight: 1.1,
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--color-fire-500)'
    }
  }, "The Fire Nation")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--color-border-subtle)',
      paddingBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ckey",
    style: {
      textAlign: 'left',
      margin: '0 0 4px'
    }
  }, "Heading LG / Inter 800 / 32px"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '2rem',
      letterSpacing: 'var(--tracking-display)'
    }
  }, "Master All Four Elements")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--color-border-subtle)',
      paddingBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ckey",
    style: {
      textAlign: 'left',
      margin: '0 0 4px'
    }
  }, "Body LG / Inter / 18px"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '1.125rem',
      color: 'var(--color-text-secondary)',
      lineHeight: 1.6
    }
  }, "Water is the element of change. Earth is the element of substance. Fire is the element of power. Air is the element of freedom.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ckey",
    style: {
      textAlign: 'left',
      margin: '0 0 4px'
    }
  }, "Code / JetBrains Mono / 14px"), /*#__PURE__*/React.createElement("code", {
    className: "code-block",
    style: {
      display: 'block',
      width: 'fit-content'
    }
  }, "const bendingMaster = new ElementalBender('Avatar Aang');"))))));
}
Object.assign(window, {
  LandingScreen,
  PaletteBlock
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showcase/LandingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showcase/ShowcaseShell.jsx
try { (() => {
const {
  Navbar,
  NavLink,
  Button,
  Modal,
  Alert
} = window.ElementalUIDesignSystem_5d6c38;
const TABS = [{
  id: 'colors',
  label: 'Colors'
}, {
  id: 'components',
  label: 'Components'
}, {
  id: 'data',
  label: 'Data'
}, {
  id: 'landing',
  label: 'Landing Blocks'
}];
function ShowcaseShell() {
  const [tab, setTab] = React.useState('colors');
  const [light, setLight] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => window.removeEventListener('scroll', on);
  }, []);
  React.useEffect(() => {
    document.body.classList.toggle('light', light);
  }, [light]);
  const fireToast = () => {
    const id = Date.now();
    setToasts(t => [...t, {
      id,
      closing: false
    }]);
    setTimeout(() => setToasts(t => t.map(x => x.id === id ? {
      ...x,
      closing: true
    } : x)), 3500);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4100);
  };
  const go = id => {
    if (id === tab) return;
    const swap = () => {
      setTab(id);
      window.scrollTo(0, 0);
    };
    if (window.ElementalMotion) window.ElementalMotion.transition(swap);else swap();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    scrolled: scrolled,
    brand: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        letterSpacing: '0.05em'
      }
    }, "ELEMENTAL ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-fire-500)',
        fontWeight: 800
      }
    }, "UI"))),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: () => setLight(!light)
    }, light ? 'Dark Mode' : 'Light Mode'), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => go('landing')
    }, "Get Presets"))
  }, TABS.map(t => /*#__PURE__*/React.createElement(NavLink, {
    key: t.id,
    href: "#",
    active: tab === t.id,
    onClick: e => {
      e.preventDefault();
      go(t.id);
    }
  }, t.label))), /*#__PURE__*/React.createElement("main", {
    "data-page": true,
    key: tab
  }, tab === 'colors' && /*#__PURE__*/React.createElement(LandingScreen, {
    onToast: fireToast,
    onModal: () => setModal(true)
  }), tab === 'components' && /*#__PURE__*/React.createElement(ComponentsScreen, {
    onModal: () => setModal(true)
  }), tab === 'data' && /*#__PURE__*/React.createElement(DataScreen, null), tab === 'landing' && /*#__PURE__*/React.createElement(LandingBlocksScreen, null)), /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, "Elemental UI Design System \u2014 dark-first, token-driven, four nations."), /*#__PURE__*/React.createElement(TweakLayer, null), /*#__PURE__*/React.createElement(Modal, {
    open: modal,
    title: "Firebending Scroll",
    onClose: () => setModal(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => setModal(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setModal(false)
    }, "Accept Flame"))
  }, "Fire is the element of power. Its people have desire and will, and the energy and drive to get what they want."), /*#__PURE__*/React.createElement("div", {
    className: "toast-stack"
  }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "toast-slot",
    "data-state": t.closing ? 'closed' : 'open'
  }, /*#__PURE__*/React.createElement("div", {
    className: "toast-slot-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toast-pad"
  }, /*#__PURE__*/React.createElement(Alert, {
    variant: "fire",
    className: "toast",
    title: "Fire Nation Power Unleashed"
  }, "Component action completed successfully.")))))));
}
Object.assign(window, {
  ShowcaseShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showcase/ShowcaseShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showcase/TweakLayer.jsx
try { (() => {
/* Tweak layer: the three controls that reshape the showcase's feel.
   Emits a single override <style> so every component in the kit follows. */

const BRANDS = {
  fire: {
    label: 'Fire',
    ramp: ['#fff2f2', '#ffd6d6', '#ffa3a3', '#f76d6d', '#dd3333', '#aa0000', '#8f0000', '#6e0000', '#4d0000', '#2e0000'],
    c500: '170 0 0',
    c400: '221 51 51',
    glow: '224 16 16',
    text: 300,
    lightText: 700
  },
  water: {
    label: 'Water',
    ramp: ['#f0f9ff', '#cce8ff', '#8ecfff', '#4db8ff', '#1aa3ff', '#0088e0', '#006db3', '#005289', '#003a63', '#00243d'],
    c500: '0 136 224',
    c400: '26 163 255',
    glow: '0 191 255',
    text: 300,
    lightText: 700
  },
  earth: {
    label: 'Earth',
    ramp: ['#f0fff4', '#c6f6d5', '#88e8a0', '#4cd964', '#2ecc40', '#27ae34', '#1f8c2a', '#186b20', '#114e18', '#0a3010'],
    c500: '39 174 52',
    c400: '46 204 64',
    glow: '57 255 20',
    text: 300,
    lightText: 700
  },
  air: {
    label: 'Air',
    ramp: ['#fffef5', '#fff8cc', '#ffed8a', '#ffe048', '#ffd700', '#e6bf00', '#b89700', '#8a7100', '#5c4b00', '#3a3000'],
    c500: '230 191 0',
    c400: '255 215 0',
    glow: '255 215 0',
    text: 400,
    lightText: 700
  }
};
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const DENSITY = {
  compact: {
    page: '2.5rem 1.5rem',
    section: '2.5rem',
    card: '1rem',
    grid: '0.75rem',
    hero: '3rem 1.5rem',
    heroGap: '1rem',
    h2: '1.5rem',
    body: '0.875rem',
    swatch: '44px'
  },
  comfortable: {
    page: '4rem 1.5rem',
    section: '4rem',
    card: '1.5rem',
    grid: '1.5rem',
    hero: '6rem 2rem',
    heroGap: '1.5rem',
    h2: '2rem',
    body: '1rem',
    swatch: '64px'
  },
  editorial: {
    page: '7rem 3rem',
    section: '7rem',
    card: '2.25rem',
    grid: '2.25rem',
    hero: '9rem 3rem',
    heroGap: '2.25rem',
    h2: '2.75rem',
    body: '1.0625rem',
    swatch: '88px'
  }
};

/* Alpha helper for surfaces not yet on --glow-strength. */
const a = (base, scale) => Math.round(base * scale * 1000) / 1000;

/* Glows, text glows and --shadow-* tokens all read --glow-strength from the
   design system, so the slider only sets that. Surfaces not yet on the glow
   system (halos, button/card hover, focus ring, featured pricing) still scale here. */
function glowCss(scale) {
  const s = scale;
  let css = `:root{--glow-strength:${s}}.light{--glow-strength:${a(0.8, s)}}`;
  const ELS = {
    fire: ['var(--fire-500-rgb)', 'var(--fire-glow-rgb)'],
    water: ['var(--water-500-rgb)', 'var(--water-glow-rgb)'],
    earth: ['var(--earth-500-rgb)', 'var(--earth-glow-rgb)'],
    air: ['var(--air-500-rgb)', 'var(--air-glow-rgb)'],
    avatar: ['var(--avatar-glow-rgb)', 'var(--avatar-glow-rgb)']
  };
  if (s === 1) return css;
  for (const [el, [core, glow]] of Object.entries(ELS)) {
    css += `.hero-${el}{background:radial-gradient(circle at 50% 20%,rgb(${core} / ${a(0.2, s)}) 0%,rgba(13,13,13,0) 70%)}`;
    css += `.bg-halo-${el}{background:radial-gradient(circle at 50% 0%,rgb(${core} / ${a(0.18, s)}) 0%,rgba(13,13,13,0) 70%)}`;
    css += `.card-${el}:hover{box-shadow:0 8px 30px rgba(0,0,0,${a(0.5, Math.max(s, 0.6))}),0 0 25px rgb(${core} / ${a(0.25, s)})}`;
    css += `.btn-${el}{box-shadow:0 4px 14px rgb(${core} / ${a(0.35, s)})}`;
    css += `.btn-${el}:hover{box-shadow:0 6px 20px rgb(${core} / ${a(0.55, s)}),0 0 30px rgb(${glow} / ${a(0.3, s)})}`;
  }
  css += `.pricing-featured{box-shadow:0 10px 40px rgb(var(--fire-500-rgb) / ${a(0.25, s)})}`;
  if (s === 0) css += `.animate-ember,.animate-avatar-state,.btn-avatar{animation:none}`;
  return css;
}
function brandCss(key) {
  const b = BRANDS[key];
  let css = ':root{';
  STEPS.forEach((step, i) => {
    css += `--color-fire-${step}:${b.ramp[i]};`;
  });
  css += `--color-fire-glow:${b.ramp[4]};--fire-500-rgb:${b.c500};--fire-400-rgb:${b.c400};--fire-glow-rgb:${b.glow};`;
  css += `--fire-text:var(--color-fire-${b.text});}`;
  css += `.light{--fire-text:var(--color-fire-${b.lightText})}`;
  /* The fire gradient buttons read the ramp, so they rebrand with it. */
  css += `.badge-fire{background:rgb(var(--fire-500-rgb) / 0.15);border-color:rgb(var(--fire-500-rgb) / 0.35)}`;
  return css;
}
function densityCss(key) {
  const d = DENSITY[key];
  return [`.shell-main{padding:${d.page};gap:${d.section}}`, `.card,.testimonial-card{padding:${d.card}}`, `.pricing-card{padding:calc(${d.card} * 1.4) ${d.card}}`, `.grid3,.grid4,.ramp10{gap:${d.grid}}`, `.hero{padding:${d.hero};gap:${d.heroGap}}`, `.sec-head h2{font-size:${d.h2}}`, `.sec-head p{font-size:${d.body}}`, `.swatch{height:${d.swatch}}`, `.footer{padding:${d.section}}`, key === 'editorial' ? `.hero-subtitle{font-size:1.5rem;max-width:760px}.sec-head{gap:12px}` : '', key === 'compact' ? `.hero-title{font-size:clamp(2rem,4vw,3rem)}.hero-subtitle{font-size:1rem}` : ''].join('');
}
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brand": "fire",
  "glow": 1,
  "density": "comfortable"
} /*EDITMODE-END*/;
function TweakLayer() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const css = brandCss(t.brand) + glowCss(t.glow) + densityCss(t.density);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand element"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Primary",
    value: t.brand,
    options: ['fire', 'water', 'earth', 'air'],
    onChange: v => setTweak('brand', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Glow"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Intensity",
    value: t.glow,
    min: 0,
    max: 2,
    step: 0.05,
    onChange: v => setTweak('glow', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Layout"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Density",
    value: t.density,
    options: ['compact', 'comfortable', 'editorial'],
    onChange: v => setTweak('density', v)
  })));
}
Object.assign(window, {
  TweakLayer,
  TWEAK_DEFAULTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showcase/TweakLayer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showcase/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showcase/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.ToggleSwitch = __ds_scope.ToggleSwitch;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.NavLink = __ds_scope.NavLink;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.SidebarItem = __ds_scope.SidebarItem;

})();
