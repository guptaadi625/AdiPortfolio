// Engine: smooth scroll, custom cursor, reveal observers, scroll progress
(function () {
  'use strict';

  // ---- Smooth scroll (Lenis-like) ----
  const isMobile = window.matchMedia('(max-width: 900px)').matches || ('ontouchstart' in window);
  const scrollRoot = document.getElementById('scroll-root');
  let targetY = 0;
  let currentY = 0;
  let docHeight = 0;
  let viewportH = 0;
  const ease = 0.085;

  function setSizes() {
    viewportH = window.innerHeight;
    docHeight = scrollRoot ? scrollRoot.getBoundingClientRect().height : 0;
    if (!isMobile) document.body.style.height = docHeight + 'px';
  }

  function onScroll() {
    targetY = window.scrollY || window.pageYOffset;
  }

  function tickSmooth() {
    if (!isMobile) {
      currentY += (targetY - currentY) * ease;
      if (Math.abs(targetY - currentY) < 0.05) currentY = targetY;
      scrollRoot.style.transform = 'translate3d(0,' + (-currentY) + 'px,0)';
    } else {
      currentY = window.scrollY;
    }
    // progress bar
    const max = Math.max(docHeight - viewportH, 1);
    const p = Math.min(1, Math.max(0, currentY / max));
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.transform = 'scaleX(' + p + ')';
    // parallax & reveal
    window.__scrollY = currentY;
    window.__progress = p;
    applyParallax();
    applyReveals();
    applyRail();
    requestAnimationFrame(tickSmooth);
  }

  function initSmooth() {
    if (!isMobile) {
      document.body.classList.add('smooth-scroll');
      document.body.style.cssText += 'overflow:auto;height:auto;';
      // We need the body to be scrollable; do not lock it.
      document.body.classList.remove('smooth-scroll');
    }
    setSizes();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setSizes);
    // re-measure when images / fonts settle
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setSizes);
    }
    setInterval(setSizes, 1500);
    requestAnimationFrame(tickSmooth);
  }

  // Use position:sticky-style: instead of fixed root + body height, transform the root and set body height to mirror.
  // Re-set CSS approach:
  function setupTransformScroll() {
    if (isMobile) return;
    Object.assign(scrollRoot.style, {
      position: 'fixed',
      top: '0', left: '0', right: '0',
      willChange: 'transform',
    });
    // body height mirrors content
    const ro = new ResizeObserver(setSizes);
    ro.observe(scrollRoot);
  }

  // ---- Parallax ----
  let parallaxEls = [];
  function collectParallax() {
    parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  }
  function applyParallax() {
    for (const el of parallaxEls) {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - viewportH / 2;
      const ty = -center * speed;
      el.style.transform = (el.dataset.baseTransform || '') + ' translate3d(0,' + ty.toFixed(2) + 'px,0)';
    }
  }

  // ---- Reveal observers ----
  let revealEls = [];
  function collectReveals() {
    revealEls = Array.from(document.querySelectorAll('[data-reveal]:not(.in)'));
  }
  function applyReveals() {
    if (!revealEls.length) return;
    const triggerY = viewportH * 0.85;
    const remaining = [];
    for (const el of revealEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerY) {
        el.classList.add('in');
      } else {
        remaining.push(el);
      }
    }
    revealEls = remaining;
  }

  // Re-collect when new content mounts
  const mo = new MutationObserver(() => {
    collectReveals();
    collectParallax();
    collectHoverables();
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // ---- Side rail active ----
  let sections = [];
  function collectSections() {
    sections = Array.from(document.querySelectorAll('[data-section]'));
  }
  function applyRail() {
    if (!sections.length) collectSections();
    const dots = document.querySelectorAll('#sectionRail .dot');
    if (!dots.length) return;
    const triggerY = viewportH * 0.4;
    let activeId = null;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= triggerY && r.bottom > triggerY) {
        activeId = s.dataset.section;
        break;
      }
    }
    dots.forEach(d => d.classList.toggle('active', d.dataset.target === activeId));
  }

  // ---- Custom cursor ----
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function tickCursor() {
    if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tickCursor);
  }
  if (!isMobile) tickCursor();

  // ---- Hoverables / magnetic ----
  let hoverables = [];
  function collectHoverables() {
    const els = document.querySelectorAll('[data-hover], a, button');
    hoverables = Array.from(els);
    els.forEach(el => {
      if (el.__bound) return;
      el.__bound = true;
      el.addEventListener('mouseenter', () => {
        if (ring) ring.classList.add('hover');
        if (el.dataset.cursor === 'text') {
          if (ring) ring.classList.add('text');
          if (dot) dot.classList.add('text');
        }
      });
      el.addEventListener('mouseleave', () => {
        if (ring) ring.classList.remove('hover');
        if (ring) ring.classList.remove('text');
        if (dot) dot.classList.remove('text');
        if (el.dataset.magnetic) {
          el.style.transform = '';
        }
      });
      if (el.dataset.magnetic) {
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = (e.clientX - cx) * 0.25;
          const dy = (e.clientY - cy) * 0.25;
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        });
      }
    });
  }

  // ---- Card spotlight ----
  document.addEventListener('mousemove', e => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => {
      const r = c.getBoundingClientRect();
      const inX = e.clientX - r.left;
      const inY = e.clientY - r.top;
      c.style.setProperty('--mx', inX + 'px');
      c.style.setProperty('--my', inY + 'px');
    });
  });

  // ---- Loader ----
  function runLoader() {
    const loader = document.getElementById('loader');
    const count = document.getElementById('loaderCount');
    const bar = document.getElementById('loaderBar');
    if (!loader) return Promise.resolve();
    return new Promise(resolve => {
      let p = 0;
      const start = performance.now();
      function step(t) {
        const elapsed = (t - start) / 1400;
        p = Math.min(1, elapsed);
        const v = Math.floor(p * 100);
        if (count) count.textContent = v.toString().padStart(2, '0');
        if (bar) bar.style.transform = 'scaleX(' + p + ')';
        if (p < 1) requestAnimationFrame(step);
        else {
          setTimeout(() => {
            loader.classList.add('gone');
            // trigger initial reveals
            document.body.classList.add('loaded');
            setTimeout(resolve, 600);
          }, 250);
        }
      }
      requestAnimationFrame(step);
    });
  }

  // ---- Boot ----
  window.addEventListener('load', () => {
    setupTransformScroll();
    initSmooth();
    collectReveals();
    collectParallax();
    collectHoverables();
    collectSections();
    runLoader().then(() => {
      // re-collect after app mounts
      collectReveals();
      collectParallax();
      collectSections();
    });
  });

  // Anchor smooth nav clicks
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = id === 'top' ? document.body : document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
    if (!target) return;
    e.preventDefault();
    const r = target.getBoundingClientRect();
    const y = (window.scrollY || window.pageYOffset) + r.top;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
})();
