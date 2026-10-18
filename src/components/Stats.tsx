"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content";

// The real numbers are in the HTML from the start. The count-up only runs once
// the row is on screen, so a blocked script or a missed observer can never
// leave a visitor looking at zeros.
export function Stats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [shown, setShown] = useState(stats.map((s) => s.value));

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(stats.map((s) => Math.round(s.value * eased)));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stats]);

  return (
    <dl ref={ref} className="stats">
      {stats.map((s, i) => (
        <div key={s.label} className="stats__item">
          <dt className="stats__label">{s.label}</dt>
          <dd className="stats__value">
            <span aria-hidden="true">
              {shown[i]}
              {s.suffix}
            </span>
            <span className="visually-hidden">
              {s.value}
              {s.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
