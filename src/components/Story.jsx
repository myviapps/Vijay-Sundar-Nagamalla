import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '../data/resume';
import {
  storyProjects,
  storyBuilds,
  storyDeploys,
  milestones,
  manifesto,
  marquee,
} from '../data/story';
import { useTypewriter } from '../hooks/useTypewriter';
import { DOTS, DOT_COLS, DOT_ROWS, clamp01, smoothstep, hostOf, dotRanks } from '../lib/story-math';

const COUNT_MS = 6000; // learner counter + dot field fill
const MARQUEE_REPEAT = 6; // even, so the -50% loop seam is invisible

/** Make a div behave like a button for keyboard users. */
const clickable = (onActivate, label) => ({
  role: 'button',
  tabIndex: 0,
  'aria-label': label,
  onClick: (e) => onActivate(e.currentTarget),
  onKeyDown: (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate(e.currentTarget);
    }
  },
});

function Preview({ project, className = 'st-embed' }) {
  if (project.embed) {
    return (
      <iframe
        src={project.embed}
        title={`${project.name} preview`}
        loading="lazy"
        tabIndex={-1}
        // Decorative preview of a third-party page: scripts so SPAs render,
        // but no top-level navigation away from the portfolio.
        sandbox="allow-scripts allow-same-origin"
        className={className}
      />
    );
  }
  if (project.shots) {
    return (
      <div className="st-shots" data-shots>
        {project.shots.map((src) => (
          <img key={src} src={src} alt={`${project.name} interface`} loading="lazy" />
        ))}
      </div>
    );
  }
  return <div className="st-slot">{project.slot}</div>;
}

/** Overlay gallery: one screen at a time, arrow keys and dots. */
function Carousel({ shots, name }) {
  const [i, setI] = useState(0);
  const go = useCallback((step) => setI((n) => (n + step + shots.length) % shots.length), [shots.length]);

  useEffect(() => {
    if (shots.length < 2) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, shots.length]);

  return (
    <div className="st-carousel">
      <div className="st-carousel-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {shots.map((src) => (
          <img key={src} src={src} alt={`${name} interface`} />
        ))}
      </div>
      {shots.length > 1 && (
        <>
          <button type="button" className="st-car-nav st-car-prev" onClick={() => go(-1)} aria-label="Previous screen">
            ‹
          </button>
          <button type="button" className="st-car-nav st-car-next" onClick={() => go(1)} aria-label="Next screen">
            ›
          </button>
          <div className="st-car-dots">
            {shots.map((src, n) => (
              <button
                key={src}
                type="button"
                className={n === i ? 'st-car-dot is-on' : 'st-car-dot'}
                onClick={() => setI(n)}
                aria-label={`Screen ${n + 1} of ${shots.length}`}
                aria-current={n === i}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Story() {
  const typed = useTypewriter(profile.typedPhrases, {
    typeSpeed: 60,
    deleteSpeed: 60,
    pauseMs: 1080,
  });

  // `ms` = milestones revealed, `pi` = which build is in front.
  const [ms, setMs] = useState(0);
  const [pi, setPi] = useState(0);
  const [overlay, setOverlayState] = useState({ open: null, phase: 'from', rect: null });

  // Scroll work runs outside React, so it reads these refs rather than state.
  const msRef = useRef(0);
  const piRef = useRef(0);
  const overlayRef = useRef(overlay);
  const swapping = useRef(false);
  const frameRef = useRef(() => {});

  const barRef = useRef(null);
  const chapRef = useRef(null);
  const heroRef = useRef(null);
  const manRef = useRef(null);
  const learnRef = useRef(null);
  const countRef = useRef(null);
  const canvasRef = useRef(null);
  const projRef = useRef(null);
  const ptRef = useRef(null);
  const depRef = useRef(null);
  const trackRef = useRef(null);
  const mqRef = useRef(null);

  const setOverlay = useCallback((next) => {
    overlayRef.current = typeof next === 'function' ? next(overlayRef.current) : next;
    setOverlayState(overlayRef.current);
  }, []);

  const openProject = useCallback(
    (id, el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      setOverlay({ open: id, phase: 'from', rect: { l: r.left, t: r.top, w: r.width, h: r.height } });
      document.body.style.overflow = 'hidden';
      // Two frames: one to paint at the card's position, one to start the grow.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setOverlay((s) => (s.open ? { ...s, phase: 'to' } : s)))
      );
    },
    [setOverlay]
  );

  const close = useCallback(() => {
    const s = overlayRef.current;
    if (!s.open || s.phase === 'from') return; // mid-open; let it finish
    setOverlay({ ...s, phase: 'from' });
    setTimeout(() => {
      setOverlay({ open: null, phase: 'from', rect: null });
      document.body.style.overflow = '';
    }, 800);
  }, [setOverlay]);

  useEffect(() => {
    const rank = dotRanks();
    let raf = 0;
    let manifestoShown = false;
    let teachStart = 0;
    let lastLit = -1;

    const inView = (el, k) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * k && r.bottom > window.innerHeight * (1 - k);
    };

    // How far through a tall sticky section we are, 0 → 1.
    const progress = (el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return clamp01(-r.top / (r.height - window.innerHeight));
    };

    const draw = (lit) => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = window.devicePixelRatio || 1;
      const W = c.clientWidth;
      const H = c.clientHeight;
      if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
        lastLit = -1; // size changed, force a repaint
      }
      if (lit === lastLit) return;
      lastLit = lit;

      const ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const gap = Math.min(W / DOT_COLS, H / DOT_ROWS);
      const r = gap * 0.28;
      const ox = (W - gap * DOT_COLS) / 2 + gap / 2;
      const oy = (H - gap * DOT_ROWS) / 2 + gap / 2;

      for (let i = 0; i < DOTS; i++) {
        const on = rank[i] < lit;
        const fresh = on && rank[i] > lit - 12; // the last 12 flare brighter
        ctx.beginPath();
        ctx.arc(
          ox + (i % DOT_COLS) * gap,
          oy + Math.floor(i / DOT_COLS) * gap,
          fresh ? r * 1.5 : r,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = on ? (fresh ? '#ffd2b8' : '#ff7a3d') : '#262522';
        ctx.fill();
      }
    };

    // Cross-fade the chapter-02 copy when the front window changes.
    const swapTo = (idx) => {
      if (swapping.current) return;
      swapping.current = true;
      const el = ptRef.current;
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
      }
      setTimeout(() => {
        piRef.current = idx;
        setPi(idx);
        swapping.current = false;
        requestAnimationFrame(() => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
          frameRef.current();
        });
      }, 200);
    };

    const autoplay = () => {
      if (!manifestoShown && inView(manRef.current, 0.75)) {
        manifestoShown = true;
        manRef.current.querySelectorAll('[data-card]').forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }, i * 160);
        });
      }

      if (teachStart) return;
      draw(0); // keeps the canvas sized before the counter starts

      if (!inView(learnRef.current, 0.6)) return;
      teachStart = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - teachStart) / COUNT_MS);
        const eased = 1 - Math.pow(1 - t, 2);
        if (countRef.current) {
          countRef.current.textContent =
            Math.round(50000 * eased).toLocaleString('en-US') + (t >= 1 ? '+' : '');
        }
        draw(Math.round(DOTS * eased));
        const revealed = Math.min(milestones.length - 1, Math.floor(t * 4.4));
        if (revealed !== msRef.current) {
          msRef.current = revealed;
          setMs(revealed);
        }
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const frame = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;

      const docH = document.documentElement.scrollHeight - vh;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${docH > 0 ? (y / docH).toFixed(4) : 0})`;
      }

      // Hero drifts up and dissolves over its first screenful.
      if (heroRef.current) {
        const k = Math.min(1, y / vh);
        heroRef.current.style.transform = `translateY(${-k * 18}vh) scale(${1 - k * 0.08})`;
        heroRef.current.style.opacity = String(1 - k * 1.1);
      }

      autoplay();

      // Chapter 02: windows slide up and stack, each pushing the last back.
      const proj = projRef.current;
      if (proj) {
        const t = progress(proj) * 2.5;
        const entered = [1, clamp01((t - 0.4) / 0.7), clamp01((t - 1.4) / 0.7)].map(smoothstep);
        proj.querySelectorAll('[data-win]').forEach((win, i) => {
          let depth = 0;
          for (let j = i + 1; j < entered.length; j++) depth += entered[j];
          win.style.transform = `translateY(${(1 - entered[i]) * vh * 1.05 - depth * 28}px) scale(${
            1 - depth * 0.06
          })`;
          win.style.pointerEvents = depth > 0.5 ? 'none' : 'auto';
          const dim = win.querySelector('[data-dim]');
          if (dim) dim.style.opacity = String(Math.min(0.7, depth * 0.45));
        });
        const front = entered[2] > 0.5 ? 2 : entered[1] > 0.5 ? 1 : 0;
        if (front !== piRef.current) swapTo(front);
      }

      // Stills pan inside their frame once it reaches the viewport, so a tall
      // screenshot reads like scrolling the real app.
      document.querySelectorAll('[data-shots]').forEach((stack) => {
        const frameEl = stack.parentElement;
        const travel = stack.scrollHeight - frameEl.clientHeight;
        if (travel <= 0) return;
        const r = frameEl.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        if (!stack.dataset.from) stack.dataset.from = String(y);
        const p = clamp01((y - Number(stack.dataset.from)) / (vh * 1.6));
        stack.style.transform = `translateY(${-p * travel}px)`;
      });

      // Chapter 03: vertical scroll drives the horizontal track.
      if (depRef.current && trackRef.current) {
        const dist = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
        trackRef.current.style.transform = `translateX(${-progress(depRef.current) * dist}px)`;
      }

      // Header chapter label = last section whose top has passed mid-screen.
      const sections = [
        ['Intro', null],
        ['Teach', learnRef.current],
        ['Build', proj],
        ['Deploy', depRef.current],
        ['Contact', mqRef.current],
      ];
      let label = 'Intro';
      sections.forEach(([name, el]) => {
        if (el && el.getBoundingClientRect().top < vh * 0.5) label = name;
      });
      if (chapRef.current && chapRef.current.textContent !== label) {
        chapRef.current.textContent = label;
      }
    };

    frameRef.current = frame;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        frame();
      });
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('keydown', onKey);

    frame();
    const settle = setTimeout(frame, 400); // after fonts land and heights settle

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [close]);

  const builds = storyBuilds.map((id) => storyProjects[id]);
  const current = builds[pi];
  const { open, phase, rect } = overlay;
  const scene = open ? storyProjects[open] : null;

  const box =
    phase === 'to' || !rect
      ? { left: 0, top: 0, width: '100vw', height: '100vh', borderRadius: 0 }
      : { left: rect.l, top: rect.t, width: rect.w, height: rect.h, borderRadius: 10 };
  const grown = phase === 'to';

  const magnetMove = (e) => {
    const t = e.currentTarget;
    const b = t.getBoundingClientRect();
    const dx = (e.clientX - b.left - b.width / 2) * 0.35;
    const dy = (e.clientY - b.top - b.height / 2) * 0.35;
    t.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  return (
    <>
      <header className="st-header">
        <span>Vijay Sundar N.</span>
        <span className="st-chap" ref={chapRef}>
          Intro
        </span>
        <a href={profile.calLink}>Book a call ↗</a>
      </header>
      <div className="st-progress" ref={barRef} aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="st-hero">
        <div className="st-hero-inner" ref={heroRef}>
          <div className="st-hero-eyebrow">Open to FDE &amp; Applied AI roles</div>
          <h1 className="st-hero-h1">
            <span className="st-hero-line">
              <span className="st-rise">Vijay Sundar</span>
            </span>
            <span className="st-hero-line">
              <i className="st-rise st-rise--late">Nagamalla</i>
            </span>
          </h1>
          <div className="st-hero-foot">
            <div className="st-typed">
              <span className="st-prompt">&gt; </span>
              {typed}
              <span className="st-caret">▌</span>
            </div>
            <div className="st-scroll-hint">Scroll · the story is below ↓</div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────── */}
      <section className="st-man" ref={manRef}>
        <div className="st-man-grid">
          <div className="st-card st-card--hero" data-card>
            <div className="st-mono">For eight years</div>
            <div className="st-years">
              8<span> years</span>
            </div>
            <div className="st-card-quote">
              I have stood in front of <i>classrooms.</i>
            </div>
          </div>

          <div className="st-card" data-card>
            <div className="st-mono">More than</div>
            <div>
              <div className="st-stat-num">{manifesto.learners}</div>
              <div className="st-stat-cap">learners</div>
            </div>
          </div>

          <div className="st-card st-card--light" data-card>
            <div className="st-mono">Across</div>
            <div>
              <div className="st-stat-num">{manifesto.colleges}</div>
              <div className="st-stat-cap">colleges</div>
            </div>
          </div>

          <div className="st-card st-card--wide" data-card>
            <div className="st-mono">Teaching</div>
            <div className="st-pills">
              {manifesto.teaching.map((subject) => (
                <span className="st-pill" key={subject}>
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div className="st-card st-card--cta" data-card>
            <div className="st-cta-text">
              Along the way I started building the tools those classrooms were <i>missing.</i>
            </div>
            <div className="st-cta-note">The story continues ↓</div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 01 · TEACH ───────────────────────────────────────── */}
      <section className="st-learn" ref={learnRef}>
        <div className="st-learn-col">
          <div className="st-chapter">Chapter 01 · Teach</div>
          <div>
            <div className="st-count" ref={countRef}>
              0
            </div>
            <div className="st-count-cap">Learners trained · each dot is 100</div>
          </div>

          <div className="st-bars" aria-hidden="true">
            {milestones.map((m, i) => (
              <span
                className="st-bar-seg"
                key={m.year}
                style={{ background: i <= ms ? '#ff7a3d' : '#2a2926' }}
              />
            ))}
          </div>

          <div className="st-ms-list">
            {milestones.slice(0, ms + 1).map((m) => (
              <div className="st-ms" key={m.year}>
                <span className="st-ms-year">{m.year}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="st-ms-head">
                    <span className="st-ms-org">{m.org}</span>
                    <span className="st-ms-role">{m.role}</span>
                  </div>
                  <p className="st-ms-text">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="st-canvas-wrap">
          <canvas ref={canvasRef} aria-label="50,000 learners, one dot per 100" role="img" />
        </div>
      </section>

      {/* ── CHAPTER 02 · BUILD ───────────────────────────────────────── */}
      <section className="st-proj" ref={projRef}>
        <div className="st-proj-sticky">
          <div className="st-proj-text" ref={ptRef}>
            <div className="st-chapter">
              Chapter 02 · Build · 0{pi + 1} / 0{builds.length}
            </div>
            <h2 className="st-proj-h2">{current.name}</h2>
            <div className="st-proj-tag">{current.tag}</div>
            <p className="st-proj-impact">{current.impact}</p>
            <div className="st-proj-actions">
              <button
                type="button"
                className="st-btn"
                onClick={() =>
                  openProject(storyBuilds[pi], projRef.current?.querySelectorAll('[data-win]')[pi])
                }
              >
                Open the full story
              </button>
              <span className="st-status">{current.status}</span>
            </div>
          </div>

          <div className="st-win-stack">
            {builds.map((p, i) => (
              <div
                className="st-win"
                data-win
                key={p.name}
                {...clickable((el) => openProject(storyBuilds[i], el), `Open ${p.name}`)}
              >
                <div className="st-win-bar">
                  <i className="st-win-dot" />
                  <i className="st-win-dot" />
                  <i className="st-win-dot" />
                  <span className="st-win-host">{hostOf(p.link)}</span>
                  <span className="st-win-open">Click to open ↗</span>
                </div>
                <div className="st-win-body">
                  <Preview project={p} />
                </div>
                <div className="st-win-dim" data-dim />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 03 · DEPLOY ──────────────────────────────────────── */}
      <section className="st-dep" ref={depRef}>
        <div className="st-dep-sticky">
          <div className="st-track" ref={trackRef}>
            <div className="st-dep-intro">
              <div className="st-chapter">Chapter 03 · Deploy</div>
              <h2 className="st-dep-h2">
                In use <i style={{ color: '#ff7a3d' }}>today.</i>
              </h2>
              <p className="st-dep-lede">
                Tools running now, from classroom analytics and Salesforce tracking to open-source
                local AI. Keep scrolling →
              </p>
            </div>

            {storyDeploys.map((id) => {
              const p = storyProjects[id];
              return (
                <div
                  className="st-dep-card"
                  key={id}
                  {...clickable((el) => openProject(id, el), `Open ${p.name}`)}
                >
                  <div className="st-dep-frame">
                    <Preview project={p} />
                  </div>
                  <div className="st-dep-meta">
                    <div style={{ minWidth: 0 }}>
                      <div className="st-dep-name">{p.name}</div>
                      <div className="st-dep-tag">{p.tag}</div>
                    </div>
                    <span className="st-dep-status">{p.status} ↗</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TOOLKIT ──────────────────────────────────────────────────── */}
      <section className="st-mq" ref={mqRef} aria-label="Toolkit">
        <div className="st-mq-label">The toolkit</div>
        <div className="st-mq-row">{marquee.row1.repeat(MARQUEE_REPEAT)}</div>
        <div className="st-mq-row st-mq-row--alt">{marquee.row2.repeat(MARQUEE_REPEAT)}</div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section className="st-contact">
        <div className="st-chapter">Final chapter</div>
        <h2 className="st-contact-h2">
          Let&apos;s build
          <br />
          <i style={{ color: '#ff7a3d' }}>something together.</i>
        </h2>
        <div className="st-contact-row">
          <p className="st-contact-p">{profile.contactDesc}</p>
          <a
            className="st-magnet"
            href={profile.calLink}
            onMouseMove={magnetMove}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
            }}
          >
            Book a call ↗
          </a>
        </div>
        <div className="st-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin}>LinkedIn ↗</a>
          <a href={profile.github}>GitHub ↗</a>
          <a href={profile.resumePdf}>Résumé PDF ↗</a>
        </div>
      </section>

      {/* ── PROJECT OVERLAY ──────────────────────────────────────────── */}
      {scene && (
        <div
          className="st-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={scene.title}
          style={{
            left: typeof box.left === 'number' ? `${box.left}px` : box.left,
            top: typeof box.top === 'number' ? `${box.top}px` : box.top,
            width: typeof box.width === 'number' ? `${box.width}px` : box.width,
            height: typeof box.height === 'number' ? `${box.height}px` : box.height,
            borderRadius: `${box.borderRadius}px`,
          }}
        >
          <div
            className="st-overlay-scroll"
            style={{ opacity: grown ? 1 : 0, transitionDelay: grown ? '.55s' : '0s' }}
          >
            <div className="st-overlay-inner">
              <div className="st-overlay-head">
                <span className="st-overlay-status">{scene.status}</span>
                <button type="button" className="st-close" onClick={close}>
                  Close ✕
                </button>
              </div>
              <h2 className="st-overlay-h2">{scene.title}</h2>
              <p className="st-overlay-impact">{scene.impact}</p>

              <div className="st-overlay-cols">
                <div className="st-overlay-frame">
                  <div className="st-overlay-frame-bar">{hostOf(scene.link)}</div>
                  {scene.embed ? (
                    <div className="st-overlay-frame-body">
                      <iframe src={scene.embed} title={`${scene.name} live`} />
                    </div>
                  ) : scene.shots ? (
                    <Carousel key={scene.name} shots={scene.shots} name={scene.name} />
                  ) : (
                    <div className="st-overlay-frame-body">
                      <div className="st-slot">{scene.slot}</div>
                    </div>
                  )}
                </div>

                <div className="st-overlay-side">
                  <ul className="st-bullets">
                    {scene.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="st-stack-label">Stack</div>
                  <div className="st-stack">{scene.stack}</div>
                  {scene.link && (
                    <a className="st-visit" href={scene.link} target="_blank" rel="noreferrer">
                      Visit project ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
