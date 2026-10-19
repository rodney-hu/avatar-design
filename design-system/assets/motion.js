/* avatar-design — motion runtime.
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
  function once(el, key) { var s = seenBy[key] || (seenBy[key] = new WeakSet()); if (s.has(el)) return false; s.add(el); return true; }
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
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

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
    requestAnimationFrame(function () { updateBloom(); updateParallax(); catchUp(); ticking = false; });
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
    el.addEventListener('pointermove', function (ev) { setSpot(el, ev); el.classList.add('is-lit'); el.style.setProperty('--spot-on', '1'); });
    el.addEventListener('pointerleave', function () { el.classList.remove('is-lit'); el.style.setProperty('--spot-on', '0'); });
  }
  function bindSpotGroup(g) {
    g.addEventListener('pointermove', function (ev) {
      g.querySelectorAll('[data-spotlight]').forEach(function (el) { setSpot(el, ev); el.classList.add('is-lit'); el.style.setProperty('--spot-on', '1'); });
    });
    g.addEventListener('pointerleave', function () {
      g.querySelectorAll('[data-spotlight]').forEach(function (el) { el.classList.remove('is-lit'); el.style.setProperty('--spot-on', '0'); });
    });
  }

  /* ---- Edge light orbit: one rAF loop writes --edge-angle ---- */
  var edgeEls = [];
  function orbit(now) {
    for (var i = 0; i < edgeEls.length; i++) {
      var el = edgeEls[i];
      var d = parseFloat(getComputedStyle(el).getPropertyValue('--edge-light-duration')) || 6;
      el.style.setProperty('--edge-angle', ((now / (d * 1000)) * 360 % 360).toFixed(1) + 'deg');
    }
    requestAnimationFrame(orbit);
  }
  requestAnimationFrame(orbit);

  function scan() {
    document.querySelectorAll('[data-vt]').forEach(function (el) { el.style.viewTransitionName = el.dataset.vt; });
    document.querySelectorAll('.edge-light').forEach(function (el) {
      if (!once(el, 'f0')) return; edgeEls.push(el);
    });
    document.querySelectorAll('[data-spotlight-group]').forEach(function (el) {
      if (!once(el, 'f1')) return; bindSpotGroup(el);
    });
    document.querySelectorAll('[data-spotlight]').forEach(function (el) {
      if (!once(el, 'f2')) return; bindSpotlight(el);
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
      if (!once(el, 'f4')) return; bloomEls.push(el);
    });
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      if (!once(el, 'f5')) return; parallaxEls.push(el);
    });
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      if (!once(el, 'f6')) return; bindTilt(el);
    });
    /* Specimen-card helper: loop a reveal so it is visible in a static frame. */
    document.querySelectorAll('[data-reveal-loop]').forEach(function (el) {
      if (!once(el, 'f7')) return;
      var period = parseInt(el.dataset.revealLoop, 10) || 2800;
      setInterval(function () {
        el.classList.remove('is-revealed');
        setTimeout(function () { el.classList.add('is-revealed'); }, 220);
      }, period);
      setTimeout(function () { el.classList.add('is-revealed'); }, 120);
    });
    onScroll();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();

  /* ---- Click burst: element-flavoured particles from the press point ----
     .btn-fire embers rise · .btn-water droplets + ripple · .btn-earth chunks
     fall under gravity · .btn-air motes spiral out · .btn-avatar cyan ring.
     Opt out per button with data-burst="off". */
  var layer = null;
  function rgbVar(name) { return getComputedStyle(root).getPropertyValue(name).trim() || '224 16 16'; }
  function dot(x, y, size, color, glow) {
    if (!layer) { layer = document.createElement('div'); layer.className = 'em-burst-layer'; document.body.appendChild(layer); }
    var d = document.createElement('i');
    d.style.cssText = 'width:' + size + 'px;height:' + size + 'px;margin:' + (-size / 2) + 'px 0 0 ' + (-size / 2) + 'px;background:' + color + ';box-shadow:0 0 ' + glow + 'px ' + color;
    d.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    layer.appendChild(d); return d;
  }
  function fly(d, frames, dur, ease, delay) {
    var a = d.animate(frames, { duration: dur, easing: ease, delay: delay || 0, fill: 'both' });
    a.onfinish = function () { d.remove(); };
  }
  function R(a, b) { return a + Math.random() * (b - a); }
  var BURST = {
    fire: function (x, y) {
      var core = rgbVar('--fire-glow-rgb'), warm = rgbVar('--fire-400-rgb');
      for (var i = 0; i < 12; i++) {
        var ang = R(-160, -20) * Math.PI / 180, dist = R(18, 46), dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
        var col = 'rgb(' + (i % 3 ? warm : core) + ')';
        fly(dot(x, y, R(2.5, 5), col, 8), [
          { transform: 'translate(' + x + 'px,' + y + 'px) scale(1)', opacity: 1 },
          { transform: 'translate(' + (x + dx) + 'px,' + (y + dy) + 'px) scale(.9)', opacity: 1, offset: .35 },
          { transform: 'translate(' + (x + dx * 1.3 + R(-8, 8)) + 'px,' + (y + dy - R(24, 48)) + 'px) scale(.2)', opacity: 0 }
        ], R(560, 820), 'cubic-bezier(0.2,0.9,0.1,1)');
      }
    },
    water: function (x, y) {
      var c = rgbVar('--water-glow-rgb');
      var ring = dot(x, y, 10, 'transparent', 0); ring.style.border = '1.5px solid rgb(' + c + ')'; ring.style.boxShadow = '0 0 10px rgb(' + c + ' / .6)';
      fly(ring, [{ transform: 'translate(' + x + 'px,' + y + 'px) scale(.4)', opacity: .9 }, { transform: 'translate(' + x + 'px,' + y + 'px) scale(7)', opacity: 0 }], 900, 'cubic-bezier(0.37,0,0.63,1)');
      for (var i = 0; i < 9; i++) {
        var ang = (i / 9) * Math.PI * 2 + R(-.2, .2), dist = R(26, 42);
        fly(dot(x, y, R(3, 5), 'rgb(' + c + ')', 6), [
          { transform: 'translate(' + x + 'px,' + y + 'px) scale(1)', opacity: 1 },
          { transform: 'translate(' + (x + Math.cos(ang) * dist) + 'px,' + (y + Math.sin(ang) * dist + 14) + 'px) scale(.3)', opacity: 0 }
        ], R(760, 980), 'cubic-bezier(0.37,0,0.63,1)', 60);
      }
    },
    earth: function (x, y) {
      var c = rgbVar('--earth-500-rgb'), g = rgbVar('--earth-glow-rgb');
      for (var i = 0; i < 8; i++) {
        var dx = R(-38, 38), up = R(16, 34), s = R(3.5, 6.5), rot = R(-200, 200);
        var d = dot(x, y, s, 'rgb(' + (i % 3 ? c : g) + ')', 3); d.style.borderRadius = '1px';
        fly(d, [
          { transform: 'translate(' + x + 'px,' + y + 'px) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + (x + dx * .55) + 'px,' + (y - up) + 'px) rotate(' + rot * .5 + 'deg)', opacity: 1, offset: .32, easing: 'cubic-bezier(0.5,0,0.75,0)' },
          { transform: 'translate(' + (x + dx) + 'px,' + (y + R(30, 50)) + 'px) rotate(' + rot + 'deg)', opacity: 0 }
        ], R(620, 760), 'cubic-bezier(0.25,1,0.5,1)');
      }
    },
    air: function (x, y) {
      var c = rgbVar('--air-glow-rgb');
      for (var i = 0; i < 10; i++) {
        var a0 = (i / 10) * 360, sweep = R(80, 140), r = R(28, 46), s = R(2.5, 4.5);
        var frames = [];
        for (var k = 0; k <= 6; k++) {
          var t = k / 6, ang = (a0 + sweep * t) * Math.PI / 180, rr = r * t;
          frames.push({ transform: 'translate(' + (x + Math.cos(ang) * rr) + 'px,' + (y + Math.sin(ang) * rr - 10 * t) + 'px) scale(' + (1 - t * .7) + ')', opacity: k === 6 ? 0 : 1 });
        }
        fly(dot(x, y, s, 'rgb(' + c + ')', 6), frames, R(820, 1000), 'cubic-bezier(0.16,1,0.3,1)');
      }
    },
    avatar: function (x, y) {
      var c = rgbVar('--avatar-glow-rgb');
      [0, 120].forEach(function (delay) {
        var ring = dot(x, y, 12, 'transparent', 0); ring.style.border = '1.5px solid rgb(' + c + ')'; ring.style.boxShadow = '0 0 14px rgb(' + c + ' / .7)';
        fly(ring, [{ transform: 'translate(' + x + 'px,' + y + 'px) scale(.3)', opacity: 1 }, { transform: 'translate(' + x + 'px,' + y + 'px) scale(6)', opacity: 0 }], 800, 'cubic-bezier(0.16,1,0.3,1)', delay);
      });
    }
  };
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest && e.target.closest('.btn');
    if (!b || b.disabled || b.getAttribute('aria-disabled') === 'true' || b.dataset.burst === 'off') return;
    var kind = ['fire', 'water', 'earth', 'air', 'avatar'].filter(function (k) { return b.classList.contains('btn-' + k); })[0];
    if (kind) BURST[kind](e.clientX, e.clientY);
  }, { passive: true });

  /* ---- Page transitions (View Transitions API, instant fallback) ---- */
  var canVT = typeof document.startViewTransition === 'function';
  if (canVT) root.classList.add('vt-supported');
  function transition(update) {
    var run = function () {
      if (window.ReactDOM && window.ReactDOM.flushSync) window.ReactDOM.flushSync(update); else update();
      scan();
    };
    if (!canVT) { run(); return Promise.resolve(); }
    return document.startViewTransition(run).finished.catch(function () {});
  }

  window.ElementalMotion = { scan: scan, transition: transition, burst: function (kind, x, y) { (BURST[kind] || BURST.fire)(x, y); } };
})();
