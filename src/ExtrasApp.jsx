// extras.jsx — Tweaks panel + accent/background wiring
// Mounts independently into #tweaks-root so it doesn't conflict with the main App tree.

import React, { useEffect } from 'react';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSlider, TweakToggle, TweakButton } from './tweaks-panel.jsx';
  

  const DEFAULTS = window.TWEAK_DEFAULTS;

  const ACCENT_OPTIONS = [
    '#FFA94D', // amber (default)
    '#5AD675', // green
    '#7EC8FF', // blue
    '#FF7EE0', // magenta
    '#E0FF7E', // lime
  ];

  const BG_OPTIONS = ['deep', 'noir', 'plum'];
  const BG_MAP = {
    deep:  { bg: '#0a0a0a', bg2: '#111110', line: '#1f1d1a', line2: '#2a2723' },
    noir:  { bg: '#080808', bg2: '#0d0d0d', line: '#181818', line2: '#222222' },
    plum:  { bg: '#0c0a12', bg2: '#13101a', line: '#1d1828', line2: '#27213a' },
  };

  function hexToOklch(hex) {
    // Best-effort: just return hex for direct accent; gradients use it raw.
    return hex;
  }

  export default function ExtrasApp() {
    const [t, setTweak] = useTweaks(DEFAULTS);

    // Apply CSS variables when tweaks change
    useEffect(() => {
      const root = document.documentElement;
      root.style.setProperty('--accent', t.accent);
      root.style.setProperty('--accent-soft', t.accent + '26');
      const bg = BG_MAP[t.background] || BG_MAP.deep;
      root.style.setProperty('--bg', bg.bg);
      root.style.setProperty('--bg-2', bg.bg2);
      root.style.setProperty('--line', bg.line);
      root.style.setProperty('--line-2', bg.line2);

      // Cursor on/off
      if (t.cursor) {
        document.body.style.cursor = 'none';
        const d = document.getElementById('cursorDot');
        const r = document.getElementById('cursorRing');
        if (d) d.style.display = '';
        if (r) r.style.display = '';
      } else {
        document.body.style.cursor = 'auto';
        const d = document.getElementById('cursorDot');
        const r = document.getElementById('cursorRing');
        if (d) d.style.display = 'none';
        if (r) r.style.display = 'none';
      }

      // Grain
      const grain = document.querySelector('.grain');
      if (grain) grain.style.opacity = t.grain ? '0.04' : '0';

      // Marquee speed
      document.querySelectorAll('.marquee-track').forEach(el => {
        el.style.animationDuration = t.marqueeSpeed + 's';
      });
    }, [t]);

    return (
      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakRadio
          label="Background"
          value={t.background}
          options={BG_OPTIONS}
          onChange={(v) => setTweak('background', v)}
        />



        <TweakSection label="Secrets & Easter Eggs" />
        <div style={{ padding: '8px 0 12px', fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>
          <div>• Press <b style={{color:'#fff'}}>⌘K</b> or <b style={{color:'#fff'}}>Ctrl+K</b> for command palette</div>
          <div>• Type <b style={{color:'#fff'}}>"neko"</b> anywhere on the page</div>
          <div>• <b style={{color:'#fff'}}>Triple-click</b> the top-left brand logo</div>
          <div>• Enter the <b style={{color:'#fff'}}>Konami Code</b> on your keyboard</div>
        </div>
      </TweaksPanel>
    );
  }

  // Mount when DOM ready (this script loads after the React app)
  
