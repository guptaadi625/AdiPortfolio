// Easter eggs for Aditya's portfolio
(function () {
  'use strict';

  // ============================================================
  // 1. CONSOLE ART for devs who inspect
  // ============================================================
  const css1 = 'color:#FFA94D;font-family:monospace;font-size:14px;font-weight:bold';
  const css2 = 'color:#c8c2b6;font-family:monospace;font-size:12px';
  const css3 = 'color:#5ad675;font-family:monospace;font-size:12px';
  const css4 = 'color:#FFA94D;font-family:monospace;font-size:11px;background:#0a0a0a;padding:4px 8px;border-radius:4px';

  console.log('%c\n' +
    '   █████  ██   ██  ██████   \n' +
    '  ██   ██ ██  ██  ██        \n' +
    '  ███████ █████   ██   ███  \n' +
    '  ██   ██ ██  ██  ██    ██  \n' +
    '  ██   ██ ██   ██  ██████   \n', css1);
  console.log('%cAditya Kumar Gupta · Full Stack Engineer · Noida, IN', css2);
  console.log('%c→ guptaadi625@gmail.com  /  +91 74170 16484', css2);
  console.log('%c→ linkedin.com/in/guptaadi625', css2);
  console.log('%c→ leetcode.com/u/neko_oni  (Knight · 2078)', css2);
  console.log('');
  console.log('%c✦ Curious? Try the Konami code on the page.', css3);
  console.log('%c✦ Or press Cmd/Ctrl + K to open the command palette.', css3);
  console.log('');
  console.log('%cP.S. — I\'m looking for SDE roles. If you\'re hiring, let\'s talk.', css4);
  console.log('');

  // ============================================================
  // 2. SPARKLE TRAIL on click
  // ============================================================
  function spawnSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 6px; height: 6px;
      pointer-events: none;
      z-index: 9996;
      transform: translate(-50%, -50%);
    `;
    sparkle.innerHTML = `<svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="var(--accent, #FFA94D)"/></svg>`;
    document.body.appendChild(sparkle);

    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 40;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const rot = (Math.random() - 0.5) * 360;
    const scale = 0.6 + Math.random() * 0.8;

    sparkle.animate(
      [
        { transform: `translate(-50%, -50%) scale(0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * 0.5}px), calc(-50% + ${dy * 0.5}px)) scale(${scale}) rotate(${rot * 0.5}deg)`, opacity: 1, offset: 0.3 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(0.16,1,0.3,1)' }
    ).onfinish = () => sparkle.remove();
  }

  document.addEventListener('click', (e) => {
    // Skip on links and buttons to avoid distraction during navigation
    if (e.target.closest('a[href^="http"], a[href^="mailto"], a[href^="tel"]')) return;
    if (window.__nekoMode || Math.random() < 0.6) {
      const count = window.__nekoMode ? 6 : 2;
      for (let i = 0; i < count; i++) {
        setTimeout(() => spawnSparkle(e.clientX, e.clientY), i * 40);
      }
    }
  });

  // ============================================================
  // 3. KONAMI CODE → NEKO MODE (cat-themed dev's signature)
  // ============================================================
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kIdx = 0;
  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konami[kIdx]) {
      kIdx++;
      if (kIdx === konami.length) {
        toggleNekoMode();
        kIdx = 0;
      }
    } else {
      kIdx = key === konami[0] ? 1 : 0;
    }
  });

  // Type "neko" anywhere
  let typeBuffer = '';
  window.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key.length !== 1) return;
    typeBuffer = (typeBuffer + e.key.toLowerCase()).slice(-10);
    if (typeBuffer.endsWith('neko')) toggleNekoMode();
  });

  function toggleNekoMode() {
    window.__nekoMode = !window.__nekoMode;
    document.documentElement.classList.toggle('neko-mode', window.__nekoMode);
    showToast(window.__nekoMode ? '✦ Neko mode unlocked — nya~' : '✦ Back to normal');

    // Burst sparkles
    if (window.__nekoMode) {
      for (let i = 0; i < 24; i++) {
        setTimeout(() => spawnSparkle(window.innerWidth / 2 + (Math.random() - 0.5) * 200, window.innerHeight / 2 + (Math.random() - 0.5) * 200), i * 30);
      }
      // Send falling paws across the screen
      for (let i = 0; i < 8; i++) {
        setTimeout(() => fallingPaw(), i * 250);
      }
    }
  }

  function fallingPaw() {
    const paw = document.createElement('div');
    paw.style.cssText = `
      position: fixed;
      top: -40px;
      left: ${Math.random() * 100}vw;
      font-size: ${16 + Math.random() * 20}px;
      pointer-events: none;
      z-index: 9995;
      color: var(--accent, #FFA94D);
      opacity: 0.85;
      filter: drop-shadow(0 0 8px var(--accent, #FFA94D));
    `;
    paw.textContent = ['🐾', '✦', '✺', '◆'][Math.floor(Math.random() * 4)];
    document.body.appendChild(paw);
    paw.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
        { transform: `translateY(50vh) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.3 },
        { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ],
      { duration: 4000 + Math.random() * 2000, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' }
    ).onfinish = () => paw.remove();
  }

  // ============================================================
  // 4. TOAST
  // ============================================================
  function showToast(text) {
    const old = document.querySelector('.egg-toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.className = 'egg-toast';
    t.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--bg-2, #111);
      color: var(--fg, #f0ebe1);
      border: 1px solid var(--line-2, #2a2723);
      padding: 14px 22px;
      border-radius: 999px;
      font-family: var(--mono, monospace);
      font-size: 12px;
      letter-spacing: 0.1em;
      z-index: 99999;
      opacity: 0;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 30px var(--accent, #FFA94D);
      pointer-events: none;
    `;
    t.textContent = text;
    document.body.appendChild(t);
    t.animate(
      [
        { opacity: 0, transform: 'translateX(-50%) translateY(20px)' },
        { opacity: 1, transform: 'translateX(-50%) translateY(0)', offset: 0.15 },
        { opacity: 1, transform: 'translateX(-50%) translateY(0)', offset: 0.85 },
        { opacity: 0, transform: 'translateX(-50%) translateY(-10px)' },
      ],
      { duration: 2600, easing: 'cubic-bezier(0.16,1,0.3,1)' }
    ).onfinish = () => t.remove();
  }
  window.__toast = showToast;

  // ============================================================
  // 5. COMMAND PALETTE (Cmd/Ctrl + K)
  // ============================================================
  const COMMANDS = [
    { label: 'Go to Hero',          hint: 'Top of page',     run: () => jumpTo('hero') },
    { label: 'Go to About',         hint: 'Section 01',      run: () => jumpTo('about') },
    { label: 'Go to Stack',         hint: 'Section 02',      run: () => jumpTo('stack') },
    { label: 'Go to Work',          hint: 'Section 03',      run: () => jumpTo('work') },
    { label: 'Go to Experience',    hint: 'Section 04',      run: () => jumpTo('exp') },
    { label: 'Go to Stats',         hint: 'Section 05',      run: () => jumpTo('stats') },
    { label: 'Go to Contact',       hint: 'Section 06',      run: () => jumpTo('contact') },
    { label: 'Email me',            hint: 'guptaadi625@gmail.com', run: () => location.href = 'mailto:guptaadi625@gmail.com' },
    { label: 'LinkedIn',            hint: '@guptaadi625',    run: () => window.open('https://linkedin.com/in/guptaadi625', '_blank') },
    { label: 'GitHub',              hint: '@guptaadi625',    run: () => window.open('https://github.com/guptaadi625', '_blank') },
    { label: 'LeetCode (neko_oni)', hint: 'Knight · 2078',   run: () => window.open('https://leetcode.com/u/neko_oni/', '_blank') },
    { label: 'Blog (Hashnode)',     hint: 'guptaadi625.hashnode.dev', run: () => window.open('https://guptaadi625.hashnode.dev', '_blank') },
    { label: 'sudo hire-aditya',    hint: '⌘ secret',        run: () => { showToast('Request received. Check your email.'); setTimeout(() => location.href = 'mailto:guptaadi625@gmail.com?subject=Let\'s%20talk', 800); } },
    { label: 'neko --activate',     hint: '⌘ secret · enable neko mode', run: toggleNekoMode },
    { label: 'cat about',           hint: 'unix-style intro', run: () => showToast('Aditya · SDE · stealth HRMS · LeetCode Knight') },
    { label: 'whoami',              hint: 'guess',           run: () => showToast('A senior dev waiting for a callback.') },
    { label: 'Open résumé',         hint: 'PDF',             run: () => window.open('uploads/Aditya_Kumar_Gupta_Resume_1.pdf', '_blank') },
  ];

  function jumpTo(id) {
    const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const y = window.scrollY + r.top;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Render command palette using vanilla DOM
  const palette = document.createElement('div');
  palette.id = 'cmdk';
  palette.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    display: none;
    background: rgba(10,10,10,0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    align-items: flex-start; justify-content: center;
    padding-top: 18vh;
  `;
  palette.innerHTML = `
    <div class="cmdk-box" style="
      width: min(560px, 92vw);
      background: #111110;
      border: 1px solid #2a2723;
      border-radius: 16px;
      box-shadow: 0 20px 80px rgba(0,0,0,0.7), 0 0 40px rgba(255,169,77,0.08);
      overflow: hidden;
      transform: scale(0.96);
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
    ">
      <div style="display:flex;align-items:center;gap:12px;padding:18px 22px;border-bottom:1px solid #1f1d1a;">
        <span style="font-family:Geist Mono,monospace;font-size:11px;color:#6b665d;letter-spacing:0.16em;text-transform:uppercase;">⌘ K</span>
        <input id="cmdk-input" type="text" placeholder="Type a command, section, or 'sudo'..." style="
          flex:1; background: transparent; border: none; outline: none;
          font: 400 16px/1 Geist, sans-serif;
          color: #f0ebe1; caret-color: #FFA94D;
        " />
        <span style="font-family:Geist Mono,monospace;font-size:10px;color:#6b665d;letter-spacing:0.16em;text-transform:uppercase;">esc</span>
      </div>
      <div id="cmdk-list" style="max-height: 50vh; overflow-y: auto; padding: 8px;"></div>
      <div style="border-top:1px solid #1f1d1a;padding:10px 22px;display:flex;justify-content:space-between;font-family:Geist Mono,monospace;font-size:10px;color:#6b665d;letter-spacing:0.14em;text-transform:uppercase;">
        <span>↑↓ navigate</span><span>⏎ select</span><span>portfolio · v1</span>
      </div>
    </div>
  `;
  document.body.appendChild(palette);

  const input = palette.querySelector('#cmdk-input');
  const list = palette.querySelector('#cmdk-list');
  const box = palette.querySelector('.cmdk-box');
  let filtered = COMMANDS.slice();
  let selected = 0;

  function renderList() {
    list.innerHTML = filtered.map((c, i) => `
      <div class="cmdk-item" data-i="${i}" style="
        display:flex; align-items:center; justify-content:space-between;
        padding: 12px 14px; border-radius: 10px; cursor: none;
        background: ${i === selected ? '#1a1814' : 'transparent'};
        border: 1px solid ${i === selected ? '#2a2723' : 'transparent'};
        transition: background 0.15s;
      ">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font:400 14px/1 Geist;color:#f0ebe1">${c.label}</span>
        </div>
        <span style="font-family:Geist Mono,monospace;font-size:11px;color:${i === selected ? '#FFA94D' : '#6b665d'};letter-spacing:0.08em;">${c.hint || ''}</span>
      </div>
    `).join('');
    list.querySelectorAll('.cmdk-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        selected = parseInt(el.dataset.i, 10);
        renderList();
      });
      el.addEventListener('click', () => {
        const cmd = filtered[parseInt(el.dataset.i, 10)];
        closePalette();
        setTimeout(() => cmd.run(), 200);
      });
    });
  }

  function filter(q) {
    q = q.trim().toLowerCase();
    if (!q) filtered = COMMANDS.slice();
    else filtered = COMMANDS.filter(c => (c.label + ' ' + (c.hint || '')).toLowerCase().includes(q));
    selected = 0;
    renderList();
  }

  function openPalette() {
    palette.style.display = 'flex';
    requestAnimationFrame(() => {
      box.style.transform = 'scale(1)';
      box.style.opacity = '1';
    });
    input.value = '';
    filter('');
    setTimeout(() => input.focus(), 60);
  }
  function closePalette() {
    box.style.transform = 'scale(0.96)';
    box.style.opacity = '0';
    setTimeout(() => { palette.style.display = 'none'; }, 220);
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.style.display === 'flex') closePalette();
      else openPalette();
    } else if (palette.style.display === 'flex') {
      if (e.key === 'Escape') closePalette();
      else if (e.key === 'ArrowDown') { e.preventDefault(); selected = (selected + 1) % filtered.length; renderList(); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); selected = (selected - 1 + filtered.length) % filtered.length; renderList(); }
      else if (e.key === 'Enter')     { e.preventDefault(); const cmd = filtered[selected]; if (cmd) { closePalette(); setTimeout(() => cmd.run(), 200); } }
    }
  });
  input.addEventListener('input', e => filter(e.target.value));
  palette.addEventListener('click', e => {
    if (e.target === palette) closePalette();
  });

  // ============================================================
  // 6. Triple-click brand logo -> matrix-style name scramble
  // ============================================================
  let clickCount = 0;
  let clickTimer = null;
  document.addEventListener('click', (e) => {
    const brand = e.target.closest('.brand');
    if (!brand) return;
    e.preventDefault();
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 600);
    if (clickCount >= 3) {
      clickCount = 0;
      scrambleBrand(brand);
    }
  });

  function scrambleBrand(el) {
    const original = el.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let frame = 0;
    const target = 'A.K.G/ENGINEER©';
    const queue = [];
    for (let i = 0; i < Math.max(original.length, target.length); i++) {
      const from = original[i] || '';
      const to = target[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 30);
      queue.push({ from, to, start, end });
    }
    function update() {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let char = '';
        if (frame >= end) { complete++; char = to; }
        else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28) queue[i].char = chars[Math.floor(Math.random() * chars.length)];
          char = queue[i].char;
        } else {
          char = from;
        }
        output += char;
      }
      el.textContent = output;
      if (complete === queue.length) {
        setTimeout(() => { el.textContent = original; }, 2500);
      } else {
        requestAnimationFrame(update);
        frame++;
      }
    }
    update();
    showToast('✦ Easter egg #3');
  }

  // ============================================================
  // 7. NEKO MODE STYLE INJECTION
  // ============================================================
  const nekoStyles = document.createElement('style');
  nekoStyles.textContent = `
    .neko-mode {
      --accent: oklch(0.78 0.18 330);
      --accent-soft: oklch(0.78 0.18 330 / 0.15);
    }
    .neko-mode .cursor-dot { background: oklch(0.78 0.18 330); }
    .neko-mode .cursor-ring { border-color: oklch(0.78 0.18 330); }
    .neko-mode .marquee-track > span::after { content: "🐾"; }
    .neko-mode .marquee-track > span::before { content: "✦ "; }
    .neko-mode .hero h1::after {
      content: "  ฅ";
      color: oklch(0.78 0.18 330);
      font-style: normal;
    }
  `;
  document.head.appendChild(nekoStyles);

})();
