"use client";

import { useEffect, useRef } from "react";

// The hero photo, with light animation layered exactly over the things in it.
// Every overlay is positioned in percent of the image (1916 x 821), inside a
// frame that keeps the image's aspect ratio, so the steam stays on the mug and
// the glow stays on the monitors at any screen size.

// Window lights that twinkle, as [x%, y%] of the image.
const cityLights: [number, number][] = [
  [64.4, 7.2],
  [65.2, 16],
  [84.1, 10.5],
  [96.2, 21.5],
  [93.6, 26],
  [56.2, 24],
  [61.4, 20.5],
  [70.3, 25.5],
  [88.2, 33],
  [99, 36],
  [91, 41],
  [94.6, 47],
  [85.3, 37.5],
  [67.2, 29.5],
  [53.6, 18],
  [78.6, 30],
];

// Fixed pseudo-random particles, so server and client render the same markup.
// Integer hashing only: Math.sin and friends can differ in the last digit
// between Node and some browsers, which would break hydration.
const particles = Array.from({ length: 22 }, (_, i) => {
  const r = (n: number) => {
    let h = Math.imul(i + 1, 2654435761) ^ Math.imul(n + 7, 1597334677);
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h ^= h >>> 13;
    return (h >>> 0) / 4294967296;
  };
  // Rounded so the style strings are short and identical everywhere.
  const q = (v: number) => Math.round(v * 10) / 10;
  return { x: q(30 + r(1) * 70), delay: q(r(2) * 14), dur: q(10 + r(3) * 10), size: q(2 + r(4) * 3), drift: q((r(5) - 0.5) * 60) };
});

export function HeroMedia() {
  const frame = useRef<HTMLDivElement>(null);

  // Gentle parallax toward the pointer.
  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <div ref={frame} className="hero-media__frame">
        <div className="hero-media__layer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-media__img" src="/hero-developer.webp" alt="" width={1916} height={821} fetchPriority="high" decoding="async" />

          {/* Monitors: glow, a refresh sweep, and code being typed */}
          <div className="screen screen--left">
            <span className="screen__sweep" />
            <span className="screen__typing">
              <i style={{ ["--w" as string]: "46%" }} />
              <i style={{ ["--w" as string]: "62%" }} />
              <i style={{ ["--w" as string]: "34%" }} />
            </span>
            <span className="screen__cursor" />
          </div>
          <div className="screen screen--right">
            <span className="screen__sweep" />
          </div>

          <span className="keyglow" />

          <span className="steam">
            <i />
            <i />
            <i />
          </span>

          {cityLights.map(([x, y], i) => (
            <span key={i} className="citylight" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i * 0.73) % 5}s` }} />
          ))}
        </div>
        <div className="hero-media__edge" />

        {particles.map((p, i) => (
          <span
            key={i}
            className="mote"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              ["--drift" as string]: `${p.drift}px`,
            }}
          />
        ))}

        <div className="glass-card glass-card--now">
          <span className="glass-card__kicker">{"// now building"}</span>
          <span className="glass-card__text">Document control for industrial plants</span>
        </div>
        <div className="glass-card glass-card--mind">
          <span className="glass-card__kicker">{"// mindset"}</span>
          <span className="glass-card__text">Configure, don&apos;t hard-code. Test the edges. Write it down.</span>
        </div>
      </div>
      <div className="hero-media__fade" />
    </div>
  );
}
