import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';

// ---- Animated text utilities ----
function SplitChars({ text, delay = 0, stagger = 24, className = '' }) {
  return (
    <span className={`reveal-char-group ${className}`}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="reveal-char"
          data-reveal
          style={{ '--d': `${delay + i * stagger}ms` }}
        >
          <span>{ch === ' ' ? '\u00A0' : ch}</span>
        </span>
      ))}
    </span>
  );
}

function RevealLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`reveal-line ${className}`} data-reveal style={{ '--d': `${delay}ms` }}>
      <span>{children}</span>
    </span>
  );
}

function FadeUp({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  return (
    <Tag className={`fade-up ${className}`} data-reveal style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

// ---- Live clock (IST) ----
function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
  return <span>{fmt.format(now)} IST</span>;
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <section className="hero" data-section="hero" id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" data-parallax="0.15" />
        <div className="orb orb-2" data-parallax="-0.1" />
        <FloatingMarks />
      </div>

      <div className="hero-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 72, flexWrap: 'wrap', gap: 16 }}>
          <FadeUp delay={200}>
            <span className="status-pill">
              <span className="dot" />
              <span>Available — Feb 2026</span>
            </span>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="label" style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <span>NOIDA · IN</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <LiveClock />
            </div>
          </FadeUp>
        </div>

        <h1>
          <RevealLine delay={400}>Software</RevealLine>
          <br/>
          <RevealLine delay={520}><em>engineer</em>,</RevealLine>
          <br/>
          <RevealLine delay={640}>building at</RevealLine>
          <br/>
          <RevealLine delay={760}>the seams.</RevealLine>
        </h1>

        <div className="hero-meta">
          <FadeUp className="hero-tag" delay={1100}>
            <span className="label" style={{ display: 'block', marginBottom: 12 }}>— Currently</span>
            Co-founding a <em style={{ color: 'var(--accent)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>stealth HRMS SaaS</em>, building secure multi-tenant infrastructure for enterprise teams of 300+. Previously hardened security and shipped CI/CD for Saitec.
          </FadeUp>
          <FadeUp className="scroll-hint" delay={1400}>
            <span>Scroll</span>
            <span className="line" />
            <span>01 / 06</span>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function FloatingMarks() {
  // Small floating decorative marks
  return (
    <>
      <div data-parallax="0.4" style={{ position: 'absolute', top: '18%', left: '8%', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.16em' }}>
        ◢ 28.6139° N
      </div>
      <div data-parallax="0.55" style={{ position: 'absolute', top: '42%', right: '6%', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.16em' }}>
        77.2090° E ◣
      </div>
      <div data-parallax="0.3" style={{ position: 'absolute', top: '28%', right: '14%', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--accent)', opacity: 0.6 }}>
        ✦
      </div>
      <div data-parallax="0.5" style={{ position: 'absolute', top: '60%', left: '22%', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--fg-dim)', opacity: 0.4 }}>
        ✺
      </div>
    </>
  );
}

// ============================================================
// MARQUEE
// ============================================================
function Marquee({ words, reverse }) {
  const content = (
    <span>
      {words.join(' ')}
    </span>
  );
  return (
    <div className={`marquee ${reverse ? 'reverse' : ''}`}>
      <div className="marquee-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>{words.map((w, j) => <React.Fragment key={j}>{w}</React.Fragment>).reduce((acc, el, i) => i === 0 ? [el] : [...acc, ' · ', el], [])}</span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  return (
    <section data-section="about" id="about">
      <div className="wrap">
        <div className="grid-12" style={{ rowGap: 80 }}>
          <div style={{ gridColumn: 'span 4' }}>
            <FadeUp className="eyebrow">— 01 / About</FadeUp>
            <div style={{ marginTop: 60 }}>
              <FadeUp delay={100} className="label" style={{ display: 'block', marginBottom: 12 }}>Identity</FadeUp>
              <FadeUp delay={150} style={{ fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1.2 }}>
                Aditya Kumar Gupta
              </FadeUp>
              <FadeUp delay={200} style={{ marginTop: 4, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.1em' }}>
                est. 2003 · neko_oni
              </FadeUp>

              <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <FadeUp delay={250}>
                  <div className="label" style={{ marginBottom: 6 }}>Location</div>
                  <div style={{ fontSize: 14 }}>Noida, IN</div>
                </FadeUp>
                <FadeUp delay={300}>
                  <div className="label" style={{ marginBottom: 6 }}>Role</div>
                  <div style={{ fontSize: 14 }}>Co-founder / SDE</div>
                </FadeUp>
                <FadeUp delay={350}>
                  <div className="label" style={{ marginBottom: 6 }}>Edu</div>
                  <div style={{ fontSize: 14 }}>B.E. CS, CU '25</div>
                </FadeUp>
                <FadeUp delay={400}>
                  <div className="label" style={{ marginBottom: 6 }}>Focus</div>
                  <div style={{ fontSize: 14 }}>Systems · UX · Security</div>
                </FadeUp>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: 'span 8' }}>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 84px)' }}>
              <RevealLine>I build the boring,</RevealLine><br/>
              <RevealLine delay={120}>load-bearing parts of</RevealLine><br/>
              <RevealLine delay={240}><em>software products</em> —</RevealLine><br/>
              <RevealLine delay={360}>so the magic on top</RevealLine><br/>
              <RevealLine delay={480}>doesn't collapse.</RevealLine>
            </h2>

            <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <FadeUp delay={300}>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--fg-dim)', textWrap: 'pretty' }}>
                  I'm a full-stack engineer working primarily in <span style={{ color: 'var(--fg)' }}>ASP.NET Core, React, and SQL Server</span>. The work I'm proudest of doesn't show up in screenshots — it's the credential-leak we patched at 2am, the CI/CD pipeline that holds 99.9% uptime, the licensing module that quietly secured every binary we ship.
                </p>
              </FadeUp>
              <FadeUp delay={400}>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--fg-dim)', textWrap: 'pretty' }}>
                  My favourite problems live where <span style={{ color: 'var(--fg)' }}>security, performance and human workflows</span> intersect. Reverse-engineering a hostile banking client. Integrating biometric hardware. Making payroll feel obvious. Production code, real consequences, no demos.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={500} style={{ marginTop: 64, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a className="btn primary" href="#contact" data-hover data-magnetic>
                Start a project
                <span className="arrow">→</span>
              </a>
              <a className="btn" href="#work" data-hover data-magnetic>
                See selected work
                <span className="arrow">↓</span>
              </a>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STACK
// ============================================================
const STACK = [
  {
    cat: 'Core',
    items: ['System Design', 'Distributed Systems', 'Microservices', 'Secure Architecture', 'DSA', 'OOP', 'DBMS']
  },
  {
    cat: 'Languages',
    items: ['C++', 'C#', 'TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL']
  },
  {
    cat: 'Frontend',
    items: ['React', 'React Native', 'TailwindCSS', 'Vite', 'HTML5', 'CSS3']
  },
  {
    cat: 'Backend',
    items: ['ASP.NET Core', 'Node.js', 'Laravel', 'Django', 'Flask', 'Entity Framework']
  },
  {
    cat: 'Infra · DevOps',
    items: ['Docker', 'CI/CD', 'IIS Server', 'Git', 'Postman', 'SSMS']
  },
  {
    cat: 'Integrations',
    items: ['ZKTeco SDK', 'Google Drive API', 'PDF.js', 'ExcelJS']
  },
];

function Stack() {
  return (
    <section data-section="stack" id="stack" style={{ paddingBlock: 180 }}>
      <div className="wrap">
        <div className="grid-12" style={{ alignItems: 'end', marginBottom: 80 }}>
          <div style={{ gridColumn: 'span 6' }}>
            <FadeUp className="eyebrow">— 02 / Toolkit</FadeUp>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 7vw, 120px)', marginTop: 24 }}>
              <RevealLine>The <em>stack</em>,</RevealLine><br/>
              <RevealLine delay={120}>laid bare.</RevealLine>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 5 / -1' }}>
            <FadeUp delay={200} style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--fg-dim)', maxWidth: 480 }}>
              Tools I reach for daily, ranked by how often they're open on my desktop. <span style={{ color: 'var(--accent)' }}>Knight</span> on LeetCode (rating 2078, top 3%). 5⭑ HackerRank in C and C++.
            </FadeUp>
          </div>
        </div>

        <div className="grid-12" style={{ gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
          {STACK.map((s, i) => (
            <StackCell key={s.cat} group={s} index={i} />
          ))}
        </div>

        {/* Skill marquee */}
        <div style={{ marginTop: 80 }}>
          <Marquee words={['Production-grade', 'Pixel-careful', 'Security-first', 'Type-safe', 'Distributed', 'Resilient']} />
        </div>
      </div>
    </section>
  );
}

function StackCell({ group, index }) {
  return (
    <FadeUp delay={index * 80} style={{ gridColumn: 'span 4', background: 'var(--bg)', padding: 36, minHeight: 280, display: 'flex', flexDirection: 'column' }}>
      <div className="label">{String(index + 1).padStart(2, '0')} · {group.cat}</div>
      <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {group.items.map(item => (
          <span key={item} className="stack-chip">
            {item}
          </span>
        ))}
      </div>
    </FadeUp>
  );
}

// ============================================================
// WORK / PROJECTS
// ============================================================
const PROJECTS = [
  {
    no: '01',
    title: 'HRMS SaaS Platform',
    tag: 'Stealth Co-founder',
    year: '2026',
    role: 'Architecture · Full Stack',
    stack: ['ASP.NET Core', 'React', 'SQL Server', 'Docker'],
    description: 'Enterprise-grade multi-tenant HRMS managing payroll, leave, biometric attendance for organizations of 300+. Architected from scratch as sole technical co-founder.',
    impact: ['10×', 'scale of prior systems', '70%', 'reduction in HR overhead'],
    accent: 'oklch(0.74 0.17 55)',
    shape: 'grid',
  },
  {
    no: '02',
    title: 'Saitec Security Hardening',
    tag: 'Software Developer Intern',
    year: '2025',
    role: 'Backend · Security',
    stack: ['ASP.NET', 'IIS', 'ZKTeco SDK', 'PDF.js'],
    description: 'Decoupled raw DB credentials from client binaries into a token-authenticated REST API. Built automated provisioning, CI/CD, biometric integration, and a universal licensing module.',
    impact: ['0', 'credential-exposure incidents', '99.9%', 'uptime sustained'],
    accent: 'oklch(0.7 0.16 200)',
    shape: 'lock',
  },
  {
    no: '03',
    title: 'Codecraft',
    tag: 'Personal Project',
    year: '2025',
    role: 'Systems',
    stack: ['C++', 'Python', 'Docker'],
    description: 'Distributed code execution platform. Microservices-routed multi-language runtime, Docker-sandboxed to neutralize RCE surface area.',
    impact: ['3 langs', 'isolated runtimes', 'RCE-safe', 'workload isolation'],
    tag: 'EdTech',
    year: '2024',
    role: 'Full Stack',
    stack: ['React', 'Node.js', 'Docker'],
    description: 'An online coding platform designed to provide a sandbox environment for algorithmic problem solving and real-time execution.',
    impact: ['Real', 'time execution', 'Isolated', 'docker sandboxes'],
    accent: 'oklch(0.7 0.16 140)',
    shape: 'circuit',
    detailedSummary: 'Codecraft is a scalable online coding platform tailored for competitive programming and education. It features a robust frontend code editor powered by Monaco (VS Code\'s editor), supporting syntax highlighting and autocomplete. The backend utilizes isolated Docker containers to safely compile and execute user-submitted code in multiple languages (C++, Python, Java), preventing malicious operations and returning real-time console outputs.',
    liveLink: 'https://codecraft-demo.vercel.app',
    repoLink: 'https://github.com/guptaadi625/codecraft'
  },
  {
    no: '04',
    title: 'Cloud Notes',
    tag: 'Productivity',
    year: '2024',
    role: 'Frontend',
    stack: ['React', 'TypeScript', 'WebSockets'],
    description: 'A Notion-like productivity platform featuring a block-based rich text editor and local-first cloud synchronization architecture.',
    impact: ['Block', 'based editor', 'Local', 'first sync'],
    accent: 'oklch(0.7 0.16 100)',
    shape: 'pages',
    detailedSummary: 'A modern, block-based note-taking application highly inspired by Notion. Unlike traditional apps that lock user data into proprietary databases, this platform operates on a local-first architecture, meaning all data is stored directly on the user\'s personal cloud storage providers (Google Drive, OneDrive). It features a custom rich text editor, drag-and-drop block management, and seamless cross-device synchronization.',
    liveLink: 'https://cloudnotes.vercel.app',
    repoLink: 'https://github.com/guptaadi625/cloud-notes'
  },
  {
    no: '05',
    title: 'MindEase',
    tag: 'HealthTech',
    year: '2024',
    role: 'Mobile Dev',
    stack: ['React Native', 'Firebase', 'OpenAI'],
    description: 'A mental health companion app offering AI-driven conversational therapy, daily check-ins, and actionable wellness insights.',
    impact: ['AI', 'driven chatbot', 'iOS/Android', 'deployed'],
    accent: 'oklch(0.7 0.16 30)',
    shape: 'wave',
    detailedSummary: 'MindEase is a cross-platform mobile application built with React Native aimed at making mental health support more accessible. It incorporates an AI-driven conversational agent trained to provide cognitive behavioral therapy (CBT) techniques and immediate emotional support. The app also features mood tracking, journaling, and a dashboard for actionable wellness insights powered by Firebase analytics.',
    liveLink: '#',
    repoLink: 'https://github.com/guptaadi625/mindease'
  },
  {
    no: '06',
    title: 'Cabotel',
    tag: 'Web Application',
    year: '2024',
    role: 'Frontend',
    stack: ['JavaScript', 'HTML', 'CSS'],
    description: 'A modern, responsive web application hosted on Vercel, focusing on clean UI/UX and solid frontend architecture.',
    impact: ['100%', 'responsive', 'Vercel', 'deployed'],
    accent: 'oklch(0.7 0.16 200)',
    shape: 'compass',
    detailedSummary: 'Cabotel is a modern booking and travel platform application. The frontend was built with a strong focus on clean architecture and responsive design, ensuring a seamless experience across desktop and mobile devices. It features advanced search filtering, dynamic availability calendars, and a highly optimized asset delivery pipeline hosted on Vercel.',
    liveLink: 'https://cabotel.vercel.app',
    repoLink: 'https://github.com/guptaadi625/cabotel'
  },
  {
    no: '07',
    title: 'Daily-News',
    tag: 'News Aggregator',
    year: '2025',
    role: 'Frontend',
    stack: ['JavaScript', 'REST API'],
    description: 'A live news aggregator that interfaces with newsapi.org to fetch and display breaking news and daily updates in real-time.',
    impact: ['Live', 'API integration', 'Real-time', 'updates'],
    accent: 'oklch(0.74 0.15 300)',
    shape: 'broadcast',
    detailedSummary: 'A dynamic Indian news platform that acts as a real-time aggregator for breaking news across the country. It interfaces directly with the NewsAPI REST services to fetch, categorize, and cache articles. The application features live category filtering, a responsive masonry layout for articles, and robust error handling for API rate limits.',
    liveLink: 'https://daily-news-app.vercel.app',
    repoLink: 'https://github.com/guptaadi625/daily-news'
  },
  {
    no: '08',
    title: 'Rythmonex',
    tag: 'Mobile App',
    year: '2024',
    role: 'Android Developer',
    stack: ['Kotlin', 'Android SDK'],
    description: 'A native Android application built with Kotlin, focusing on mobile performance and seamless user experiences.',
    impact: ['Native', 'performance', 'Mobile', 'UI'],
    accent: 'oklch(0.72 0.15 140)',
    shape: 'equalizer',
    detailedSummary: 'Rythmonex is a fully native Android music application developed in Kotlin. It interacts directly with the Android MediaStore to manage local music libraries and provides a highly performant playback engine utilizing ExoPlayer. The UI is designed using Material Design principles, featuring smooth transitions, background playback capabilities, and lock-screen media controls.',
    liveLink: '#',
    repoLink: 'https://github.com/guptaadi625/rythmonex'
  },
  {
    no: '09',
    title: 'Neko OS',
    tag: 'Interactive Web OS',
    year: '2026',
    role: 'Full Stack · UI',
    stack: ['React', 'TypeScript', 'Firebase'],
    description: 'A highly interactive web-based OS inspired by desktop environments, featuring a custom window manager, games (Snake, Chess, Multiplayer Ludo, Minesweeper), and a unique cat-themed aesthetic.',
    impact: ['Desktop', 'experience', 'Real-time', 'multiplayer'],
    accent: 'oklch(0.75 0.18 30)',
    shape: 'cat-terminal',
    detailedSummary: 'Neko OS is an ambitious, interactive web-based Operating System inspired by retro desktop environments but built with modern web technologies. It features a fully functional custom window management system (draggable, resizable, z-index managed windows), an app launcher, and persistent state. The OS includes fully playable embedded games such as a React+TypeScript Minesweeper, a multiplayer Ludo game synchronized via Firebase, and a cat-chasing-yarn Snake game—all wrapped in a cohesive cat-themed UI/UX.',
    liveLink: 'https://neko-os.vercel.app',
    repoLink: 'https://github.com/guptaadi625/neko-os'
  },
  {
    no: '10',
    title: 'Company Provisioning',
    tag: 'Enterprise Infrastructure',
    year: '2026',
    role: 'Backend · DevOps',
    stack: ['.NET', 'React', 'SQL Server'],
    description: 'An automated provisioning platform that generates company-specific databases, handles billing management, and orchestrates deployment infrastructure on the fly.',
    impact: ['Automated', 'provisioning', 'Multi', 'tenant'],
    accent: 'oklch(0.68 0.16 260)',
    shape: 'server-stack',
    detailedSummary: 'An enterprise infrastructure service that automates the provisioning of applications and databases for new B2B clients. Built with a React admin dashboard and a robust .NET backend, the system programmatically spins up isolated SQL Server databases and configures environments upon company creation. It also handles automated billing cycles and is currently being expanded to support programmatic domain mapping and DNS record management.',
    liveLink: '#',
    repoLink: 'https://github.com/guptaadi625/company-provisioning'
  },
  {
    no: '11',
    title: 'Developer Portfolio',
    tag: 'Premium Web UI',
    year: '2026',
    role: 'Design · Frontend',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    description: 'A personal portfolio redesign focused on a premium, Apple-inspired minimalist aesthetic. Built with cinematic animations and a bespoke, non-generic design language.',
    impact: ['Premium', 'aesthetics', 'Fluid', 'motion'],
    accent: 'oklch(0.70 0.12 100)',
    shape: 'minimal-canvas',
    detailedSummary: 'This very portfolio! A premium, Apple-inspired minimalist web experience designed to break away from generic template layouts. It features bespoke scroll-triggered animations (via IntersectionObserver), a custom floating Tweaks Panel for live theme injection, and dynamic SVG glyphs. The architecture utilizes a dual-mount React pattern to separate the global tweaks shell from the main content pipeline, resulting in a buttery-smooth, cinematic presentation.',
    liveLink: 'https://aditya-portfolio.vercel.app',
    repoLink: 'https://github.com/guptaadi625/portfolio-v2'
  },
];

function Work({ setActiveProject }) {
  return (
    <section data-section="work" id="work" style={{ paddingBlock: 180 }}>
      <div className="wrap">
        <div className="grid-12" style={{ alignItems: 'end', marginBottom: 100 }}>
          <div style={{ gridColumn: 'span 7' }}>
            <FadeUp className="eyebrow">— 03 / Selected Work</FadeUp>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 7vw, 120px)', marginTop: 24 }}>
              <RevealLine>Things I've</RevealLine><br/>
              <RevealLine delay={120}><em>actually shipped.</em></RevealLine>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 4 / -1' }}>
            <FadeUp delay={200} style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--fg-dim)' }}>
              Eleven projects, in chronological order of "I cannot believe this is in production." Click any card for detail.
            </FadeUp>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.no} project={p} index={i} setActiveProject={setActiveProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index, setActiveProject }) {
  const [hover, setHover] = useState(false);
  const rowRef = useRef(null);

  return (
    <div
      ref={rowRef}
      className="project-row"
      data-reveal
      data-hover
      onClick={() => setActiveProject(project)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer',
        '--accent-row': project.accent,
        '--d': `${index * 80}ms`,
      }}
    >
      <div className="project-bar" style={{ background: hover ? project.accent : 'transparent' }} />

      <div className="project-inner">
        <div className="project-meta">
          <div className="label" style={{ color: hover ? project.accent : 'var(--muted)', transition: 'color 0.4s' }}>{project.no}</div>
          <div className="label" style={{ marginTop: 6 }}>{project.year}</div>
        </div>

        <div className="project-headline">
          <div className="label" style={{ marginBottom: 12 }}>{project.tag}</div>
          <h3 className="display" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', transition: 'transform 0.6s var(--ease-out), color 0.4s', transform: hover ? 'translateX(20px)' : 'none' }}>
            {project.title}
            <span style={{ color: project.accent, marginLeft: 16, fontStyle: 'italic', opacity: hover ? 1 : 0, transition: 'opacity 0.4s' }}>↗</span>
          </h3>
        </div>

        <div className="project-detail">
          <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--fg-dim)', marginBottom: 20 }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {project.stack.map(s => (
              <span key={s} className="stack-chip small">{s}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div className="display" style={{ fontSize: 36, color: project.accent }}>{project.impact[0]}</div>
              <div className="label" style={{ marginTop: 4 }}>{project.impact[1]}</div>
            </div>
            <div>
              <div className="display" style={{ fontSize: 36, color: project.accent }}>{project.impact[2]}</div>
              <div className="label" style={{ marginTop: 4 }}>{project.impact[3]}</div>
            </div>
          </div>
        </div>

        <div className="project-glyph">
          <ProjectGlyph shape={project.shape} accent={project.accent} hover={hover} />
        </div>
      </div>
    </div>
  );
}

function ProjectGlyph({ shape, accent, hover }) {
  // Abstract animated SVG glyph per project
  const s = 160;
  const common = { width: s, height: s, viewBox: '0 0 160 160', xmlns: 'http://www.w3.org/2000/svg' };
  if (shape === 'grid') {
    return (
      <svg {...common}>
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <rect key={`${r}-${c}`} x={10 + c * 24} y={10 + r * 24} width="20" height="20"
              fill={hover && (r + c) % 2 === 0 ? accent : 'none'}
              stroke={accent} strokeWidth="1"
              style={{ transition: `fill 0.4s ${(r + c) * 30}ms ease` }}
              opacity={0.8}
            />
          ))
        )}
      </svg>
    );
  }
  if (shape === 'lock') {
    return (
      <svg {...common}>
        <circle cx="80" cy="80" r="64" fill="none" stroke={accent} strokeWidth="1" strokeDasharray={hover ? '0' : '4 4'} style={{ transition: 'all 0.6s' }} />
        <circle cx="80" cy="80" r="44" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        <rect x="62" y="68" width="36" height="32" rx="4" fill="none" stroke={accent} strokeWidth="1.5" />
        <path d="M68 68 V58 a12 12 0 0 1 24 0 V68" fill="none" stroke={accent} strokeWidth="1.5" />
        <circle cx="80" cy="84" r="3" fill={accent} />
      </svg>
    );
  }
  if (shape === 'circuit') {
    return (
      <svg {...common}>
        <path d="M10 80 H50 V40 H90 V120 H150" fill="none" stroke={accent} strokeWidth="1.5"
          strokeDasharray={hover ? '0' : '200'} strokeDashoffset={hover ? '0' : '200'} style={{ transition: 'all 1.2s' }} />
        <circle cx="10" cy="80" r="4" fill={accent} />
        <circle cx="50" cy="40" r="4" fill={accent} />
        <circle cx="90" cy="120" r="4" fill={accent} />
        <circle cx="150" cy="120" r="4" fill={accent} />
        <rect x="70" y="70" width="20" height="20" fill="none" stroke={accent} strokeWidth="1" />
      </svg>
    );
  }
  if (shape === 'pages') {
    return (
      <svg {...common}>
        <rect x="20" y="30" width="100" height="120" fill="none" stroke={accent} strokeWidth="1" />
        <rect x="35" y="20" width="100" height="120" fill={hover ? `${accent}` : 'transparent'} fillOpacity="0.08" stroke={accent} strokeWidth="1" style={{ transition: 'all 0.5s' }} />
        <rect x="50" y="10" width="100" height="120" fill="none" stroke={accent} strokeWidth="1.5" />
        <line x1="60" y1="30" x2="140" y2="30" stroke={accent} strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="40" x2="140" y2="40" stroke={accent} strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="50" x2="120" y2="50" stroke={accent} strokeWidth="1" opacity="0.4" />
      </svg>
    );
  }
  if (shape === 'wave') {
    return (
      <svg {...common}>
        {[0, 1, 2, 3].map(i => (
          <path key={i} d={`M 0 80 Q 40 ${40 + i * 10}, 80 80 T 160 80`} fill="none" stroke={accent} strokeWidth="1" opacity={0.8 - i * 0.2}
            style={{ transform: hover ? `translateY(${i * 4}px)` : 'none', transition: `transform 0.6s ${i * 60}ms` }}
          />
        ))}
      </svg>
    );
  }
  if (shape === 'compass') {
    return (
      <svg {...common}>
        <circle cx="80" cy="80" r="50" fill="none" stroke={accent} strokeWidth="1" strokeDasharray={hover ? '2 6' : '0'} style={{ transition: 'all 0.8s ease' }} />
        <circle cx="80" cy="80" r="30" fill="none" stroke={accent} strokeWidth="1.5" opacity={hover ? 0.8 : 0.4} style={{ transition: 'opacity 0.4s' }} />
        <path d="M80 20 L90 70 L140 80 L90 90 L80 140 L70 90 L20 80 L70 70 Z" fill={hover ? accent : 'none'} stroke={accent} strokeWidth="1.5" fillOpacity="0.1" style={{ transform: hover ? 'rotate(45deg)' : 'none', transformOrigin: '80px 80px', transition: 'transform 0.8s ease-out' }} />
        <circle cx="80" cy="80" r="4" fill={accent} />
      </svg>
    );
  }
  if (shape === 'broadcast') {
    return (
      <svg {...common}>
        <circle cx="80" cy="120" r="8" fill={accent} />
        {[1, 2, 3].map(i => (
          <path key={i} d={`M ${80 - i * 24} 120 A ${i * 24} ${i * 24} 0 0 1 ${80 + i * 24} 120`} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeDasharray={hover ? '0' : '100'} strokeDashoffset={hover ? '0' : '100'} style={{ transition: `all 0.6s ${i * 100}ms ease-out` }} />
        ))}
        <rect x="78" y="120" width="4" height="30" fill={accent} />
      </svg>
    );
  }
  if (shape === 'equalizer') {
    return (
      <svg {...common}>
        {[0, 1, 2, 3, 4].map(i => {
          const h = hover ? [40, 80, 120, 60, 90][i] : [10, 10, 10, 10, 10][i];
          return (
            <rect key={i} x={30 + i * 24} y={120 - h} width="12" height={h} rx="6" fill={accent} fillOpacity="0.8" style={{ transition: `all 0.5s ${i * 50}ms cubic-bezier(0.17, 0.67, 0.3, 1.33)` }} />
          );
        })}
      </svg>
    );
  }
  if (shape === 'cat-terminal') {
    return (
      <svg {...common}>
        <rect x="20" y="40" width="120" height="90" rx="8" fill="none" stroke={accent} strokeWidth="1.5" />
        <path d="M20 56 L140 56" stroke={accent} strokeWidth="1.5" />
        <circle cx="34" cy="48" r="3" fill={accent} />
        <circle cx="48" cy="48" r="3" fill={accent} opacity="0.5" />
        <path d="M40 75 L55 90 L40 105" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: hover ? 'translateX(10px)' : 'none', transition: 'all 0.4s' }} />
        <path d="M65 105 L85 105" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.4s 0.2s' }} />
        {/* Cat ears */}
        <path d="M30 40 L40 20 L55 40 M105 40 L120 20 L130 40" fill="none" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" style={{ transform: hover ? 'translateY(-4px)' : 'none', transition: 'transform 0.4s' }} />
      </svg>
    );
  }
  if (shape === 'server-stack') {
    return (
      <svg {...common}>
        {[0, 1, 2].map(i => (
          <g key={i} style={{ transform: hover ? `translateY(${i * 12 - 12}px)` : 'none', transition: `transform 0.5s ${i * 50}ms ease` }}>
            <rect x="30" y={40 + i * 30} width="100" height="20" rx="4" fill={hover ? accent : 'none'} fillOpacity={hover ? 0.05 : 0} stroke={accent} strokeWidth="1.5" style={{ transition: 'all 0.5s' }} />
            <circle cx="45" cy={50 + i * 30} r="3" fill={accent} />
            <circle cx="60" cy={50 + i * 30} r="3" fill={accent} opacity="0.4" />
            <line x1="110" y1={50 + i * 30} x2="120" y2={50 + i * 30} stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity={hover ? 1 : 0.3} style={{ transition: 'opacity 0.5s' }} />
          </g>
        ))}
        <path d="M80 120 V140 M50 140 H110" stroke={accent} strokeWidth="1.5" />
      </svg>
    );
  }
  if (shape === 'minimal-canvas') {
    return (
      <svg {...common}>
        <rect x="20" y="20" width="120" height="120" fill="none" stroke={accent} strokeWidth="1" strokeDasharray={hover ? '120' : '4 8'} style={{ transition: 'stroke-dasharray 0.8s ease' }} />
        <circle cx="80" cy="80" r={hover ? "40" : "20"} fill="none" stroke={accent} strokeWidth="1" opacity={0.6} style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        <circle cx="80" cy="80" r={hover ? "20" : "40"} fill="none" stroke={accent} strokeWidth="1" opacity={0.3} style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        <circle cx="80" cy="80" r="4" fill={accent} style={{ transform: hover ? 'scale(1.5)' : 'scale(1)', transformOrigin: '80px 80px', transition: 'all 0.8s' }} />
      </svg>
    );
  }
  return null;
}

// ============================================================
// EXPERIENCE
// ============================================================
const EXP = [
  {
    role: 'Lead Architect',
    company: 'MA Business Services',
    period: 'Jan 2026 — Present',
    location: 'Noida, IN',
    points: [
      'Architected enterprise HRMS 10× the scale of prior systems; onboarded a 300-employee client in first deployment cycle.',
      'Designed multi-tenant microservices with RBAC and end-to-end encrypted data pipelines for enterprise data isolation.',
      'Engineered automated payroll, leave management, and biometric attendance — ~70% reduction in HR overhead.',
      'Sole technical co-founder driving the full product lifecycle: system design → cloud infra → onboarding → post-sale.',
    ],
  },
  {
    role: 'Junior Developer',
    company: 'Saitec International',
    period: 'Sep 2025 — Present',
    location: 'Noida, IN',
    points: [
      'Identified critical credential-exposure flaw in client binaries; decoupled DB logic into token-authenticated REST APIs.',
      'Engineered end-to-end CI/CD on IIS for multi-project deployments, sustaining 99.9% uptime in production.',
      'Refactored a failing HRMS into a production-grade system live for Tiranga Group; integrated ZKTeco biometric hardware via SDK.',
      'Cut HR manual data entry by 80% via automated salary-crediting (PDF.js) and bulk onboarding (ExcelJS) modules.',
      'Reverse-engineered a banking client\'s Loan Management System; surgically removed vulnerabilities and unauthorized tracking scripts.',
    ],
  },
];

function Experience() {
  return (
    <section data-section="exp" id="exp" style={{ paddingBlock: 180, background: 'var(--bg-2)' }}>
      <div className="wrap">
        <div className="grid-12" style={{ marginBottom: 100 }}>
          <div style={{ gridColumn: 'span 12' }}>
            <FadeUp className="eyebrow">— 04 / Experience</FadeUp>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 7vw, 120px)', marginTop: 24 }}>
              <RevealLine>Where the</RevealLine>{' '}<RevealLine delay={100}><em>work</em>'s</RevealLine>{' '}<RevealLine delay={200}>been done.</RevealLine>
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {EXP.map((e, i) => <ExperienceItem key={i} item={e} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ item, index }) {
  return (
    <div className="exp-row" data-reveal style={{ '--d': `${index * 100}ms` }}>
      <div className="exp-side">
        <div className="exp-num display">{String(index + 1).padStart(2, '0')}</div>
        <div className="label" style={{ marginTop: 16 }}>{item.period}</div>
        <div className="label" style={{ marginTop: 6, color: 'var(--fg-dim)' }}>{item.location}</div>
      </div>
      <div className="exp-main">
        <h3 className="display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', marginBottom: 8 }}>
          {item.role}
        </h3>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--accent)', marginBottom: 32 }}>
          @ {item.company}
          {item.company === 'MA Business Services' && (
            <a href="https://mabusinessservices.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginLeft: 12, fontSize: 16, fontFamily: 'var(--sans)', color: 'var(--fg-dim)', fontStyle: 'normal', textDecoration: 'underline', textUnderlineOffset: 4 }}>
              mabusinessservices.com ↗
            </a>
          )}
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {item.points.map((p, j) => (
            <li key={j} style={{ display: 'flex', gap: 16, fontSize: 16, lineHeight: 1.55, color: 'var(--fg-dim)', textWrap: 'pretty' }}>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 4, flexShrink: 0 }}>{String(j + 1).padStart(2, '0')}</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================================================
// STATS / ACHIEVEMENTS
// ============================================================
function Stats() {
  return (
    <section data-section="stats" id="stats" style={{ paddingBlock: 160 }}>
      <div className="wrap">
        <div className="grid-12" style={{ alignItems: 'end', marginBottom: 80 }}>
          <div style={{ gridColumn: 'span 8' }}>
            <FadeUp className="eyebrow">— 05 / By the numbers</FadeUp>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 96px)', marginTop: 24 }}>
              <RevealLine>Receipts,</RevealLine>{' '}<RevealLine delay={120}>not just</RevealLine>{' '}<RevealLine delay={240}><em>résumé prose.</em></RevealLine>
            </h2>
          </div>
        </div>

        <div className="grid-12" style={{ rowGap: 1, columnGap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          <StatTile big="2078" label="LeetCode rating · Knight" suffix="Top 3% globally" col={4} />
          <StatTile big="500+" label="Problems solved" suffix="DP · Graphs · System Design" col={4} />
          <StatTile big="5⭑" label="HackerRank C / C++" suffix="Gold badge" col={4} />
          <StatTile big="99.9%" label="Production uptime" suffix="Saitec CI/CD pipelines" col={3} />
          <StatTile big="300+" label="Employees onboarded" suffix="HRMS first deployment" col={3} />
          <StatTile big="80%" label="Manual entry reduced" suffix="HR automation modules" col={3} />
          <StatTile big="0" label="Credential leaks since fix" suffix="Architectural remediation" col={3} />
        </div>
      </div>
    </section>
  );
}

function StatTile({ big, label, suffix, col }) {
  return (
    <FadeUp style={{ gridColumn: `span ${col}`, background: 'var(--bg)', padding: '40px 32px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="display" style={{ fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: 1 }}>
        {big.includes('%') || big.includes('+') || big === '0' || big.includes('⭑') ?
          big : <CountUp end={parseInt(big)} />
        }
      </div>
      <div>
        <div style={{ fontSize: 14 }}>{label}</div>
        <div className="label" style={{ marginTop: 6 }}>{suffix}</div>
      </div>
    </FadeUp>
  );
}

function CountUp({ end, duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        function step(t) {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(eased * end));
          if (p < 1) requestAnimationFrame(step);
          else setVal(end);
        }
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}</span>;
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  return (
    <section data-section="contact" id="contact" style={{ paddingBlock: 160, position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <FadeUp className="eyebrow">— 06 / Get in touch</FadeUp>

        <h2 className="display" style={{ fontSize: 'clamp(80px, 16vw, 280px)', marginTop: 40, lineHeight: 0.9 }}>
          <RevealLine>Let's</RevealLine><br/>
          <RevealLine delay={120}><em>make</em></RevealLine><br/>
          <RevealLine delay={240}>something.</RevealLine>
        </h2>

        <div className="grid-12" style={{ marginTop: 120, alignItems: 'end', rowGap: 60 }}>
          <div style={{ gridColumn: 'span 6' }}>
            <FadeUp className="label" delay={100}>Email</FadeUp>
            <FadeUp delay={200}>
              <a href="mailto:guptaadi625@gmail.com" className="display contact-link" data-hover data-magnetic data-cursor="text" style={{ fontSize: 'clamp(28px, 4vw, 56px)', display: 'inline-block', marginTop: 12 }}>
                guptaadi625@gmail.com
              </a>
            </FadeUp>
          </div>
          <div style={{ gridColumn: 'span 6' }}>
            <FadeUp className="label" delay={150}>Phone</FadeUp>
            <FadeUp delay={250}>
              <a href="tel:+917417016484" className="display contact-link" data-hover data-magnetic style={{ fontSize: 'clamp(28px, 4vw, 56px)', display: 'inline-block', marginTop: 12 }}>
                +91 74170 16484
              </a>
            </FadeUp>
          </div>

          <div style={{ gridColumn: 'span 12', borderTop: '1px solid var(--line)', paddingTop: 48, marginTop: 24 }}>
            <FadeUp className="label" style={{ marginBottom: 24 }}>Find me elsewhere</FadeUp>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <SocialLink label="LinkedIn" href="https://linkedin.com/in/guptaadi625" handle="@guptaadi625" />
              <SocialLink label="GitHub" href="https://github.com/guptaadi625" handle="@guptaadi625" />
              <SocialLink label="LeetCode" href="https://leetcode.com/u/neko_oni/" handle="@neko_oni" />
              <SocialLink label="Portfolio" href="https://guptaadi625.github.io" handle="guptaadi625.github.io" />
              <SocialLink label="Blog" href="https://guptaadi625.hashnode.dev" handle="guptaadi625.hashnode.dev" />
            </div>
          </div>
        </div>
      </div>

      {/* Big background type */}
      <div aria-hidden style={{
        position: 'absolute', bottom: -80, left: 0, right: 0,
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 'clamp(120px, 28vw, 520px)',
        color: 'rgba(240, 235, 225, 0.025)',
        lineHeight: 0.85, whiteSpace: 'nowrap', pointerEvents: 'none',
        textAlign: 'center', letterSpacing: '-0.04em',
      }} data-parallax="0.15">
        Aditya
      </div>
    </section>
  );
}

function SocialLink({ label, href, handle }) {
  return (
    <FadeUp>
      <a href={href} target="_blank" rel="noreferrer" className="social-link" data-hover data-magnetic>
        <span className="label">{label}</span>
        <span className="handle">{handle}</span>
        <span className="arrow">↗</span>
      </a>
    </FadeUp>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="grid-12" style={{ alignItems: 'end' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <div className="label" style={{ marginBottom: 8 }}>Aditya Kumar Gupta © {new Date().getFullYear()}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Designed & built by hand. No templates harmed.</div>
          </div>
          <div style={{ gridColumn: 'span 4', textAlign: 'center' }}>
            <div className="label" style={{ marginBottom: 8 }}>Local time</div>
            <div style={{ fontSize: 13 }}><LiveClock /></div>
          </div>
          <div style={{ gridColumn: 'span 4', textAlign: 'right' }}>
            <a href="#hero" className="label" data-hover style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
              <span>Back to top</span>
              <span>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// PROJECT MODAL
// ============================================================
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: 'rgba(10,10,12,0.85)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(16px); } }
        @keyframes modalUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      
      <div 
        style={{
          position: 'absolute', inset: 0, cursor: 'pointer'
        }}
        onClick={onClose}
      />
      
      <div style={{
        position: 'relative', width: '100%', maxWidth: 800,
        maxHeight: '90vh', overflowY: 'auto',
        background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24, padding: '48px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        animation: 'modalUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column', gap: 32
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: 24, right: 24,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', border: 'none',
            color: 'var(--fg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          ✕
        </button>

        <div>
          <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>
            {project.no} — {project.tag}
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 16 }}>
            {project.title}
          </h2>
          <div style={{ display: 'flex', gap: 16, color: 'var(--fg-dim)', fontFamily: 'var(--mono)', fontSize: 13 }}>
            <span>{project.year}</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span>{project.role}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.stack.map(s => (
            <span key={s} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 40, fontSize: 12 }}>
              {s}
            </span>
          ))}
        </div>

        <div style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg)', marginTop: 8 }}>
          {project.detailedSummary}
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', padding: '12px 24px', background: 'var(--fg)', color: 'var(--bg)',
              borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: 'none'
            }}>
              View Live Project ↗
            </a>
          )}
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', padding: '12px 24px', background: 'transparent', color: 'var(--fg)', border: '1px solid var(--line)',
              borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: 'none'
            }}>
              GitHub Repository
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ============================================================
// APP
// ============================================================
function App() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeProject]);

  return (
    <>
      <Hero />
      <div style={{ background: 'var(--bg-2)' }}>
        <Marquee words={['SDE · Full Stack', 'Production Code', 'Available Feb 2026', 'Noida → Worldwide', 'Currently Building HRMS SaaS']} />
      </div>
      <About />
      <Stack />
      <Work setActiveProject={setActiveProject} />
      <Experience />
      <Stats />
      <Contact />
      <Footer />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}

export default App;
