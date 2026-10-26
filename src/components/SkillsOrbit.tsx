"use client";

import { useEffect, useRef } from "react";
import { brands, type BrandKey } from "@/lib/brands";
import { SkillIcon } from "./SkillIcon";

// A slowly spinning globe with logo tiles travelling round it on a tilted
// orbit. Tiles behind the globe shrink and dim and pass under it; tiles in
// front grow and pass over it. Runs only while on screen; holds still for
// reduced motion.
export function SkillsOrbit({ items }: { items: BrandKey[] }) {
  const box = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;
    let t = 0.6;
    let last = performance.now();

    const place = () => {
      const w = el.clientWidth;
      const rx = w * 0.42;
      const ry = w * 0.3;
      const cx = w / 2;
      const cy = w * 0.5;
      tiles.current.forEach((tile, i) => {
        if (!tile) return;
        const a = t + (i / items.length) * Math.PI * 2;
        const depth = (Math.sin(a) + 1) / 2; // 0 = far side, 1 = near side
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * ry - w * 0.02;
        const s = 0.68 + depth * 0.42;
        tile.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s.toFixed(3)})`;
        tile.style.opacity = (0.45 + depth * 0.55).toFixed(2);
        tile.style.zIndex = depth > 0.5 ? "4" : "1";
        tile.style.filter = depth > 0.5 ? "none" : `blur(${((0.5 - depth) * 2.4).toFixed(2)}px)`;
      });
    };

    const frame = (now: number) => {
      t += ((now - last) / 1000) * 0.22;
      last = now;
      place();
      if (running) raf = requestAnimationFrame(frame);
    };

    place();
    if (reduce) {
      const ro = new ResizeObserver(place);
      ro.observe(el);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div ref={box} className="orbit" role="img" aria-label={`A globe orbited by the tools I use most: ${items.map((k) => brands[k].title).join(", ")}`}>
      <svg className="orbit__rings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="50" cy="48" rx="42" ry="30" />
        <ellipse cx="50" cy="48" rx="47.5" ry="35" className="orbit__ring-outer" />
      </svg>

      <div className="globe" aria-hidden="true">
        <div className="globe__grid" />
        <div className="globe__shade" />
        <p className="globe__words">
          <span>Build</span>
          <span>Configure</span>
          <span>Test</span>
          <span>Ship</span>
        </p>
      </div>

      {items.map((k, i) => (
        <div
          key={k}
          ref={(n) => {
            tiles.current[i] = n;
          }}
          className="orbit__tile"
          aria-hidden="true"
        >
          <span className="orbit__icon">
            <SkillIcon icon={{ brand: k }} size={34} />
          </span>
          <span className="orbit__label">{brands[k].title}</span>
        </div>
      ))}
    </div>
  );
}
