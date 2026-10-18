"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// The scalloped outline a checker draws around a change on a drawing. Built as
// a path of outward arcs that follows the wrapped element's measured size.
function cloudPath(w: number, h: number, r: number): string {
  const side = (len: number) => Math.max(1, Math.round(len / (r * 2)));
  const nx = side(w);
  const ny = side(h);
  const sx = w / nx;
  const sy = h / ny;
  const rx = (sx / 2) * 1.15;
  const ry = (sy / 2) * 1.15;
  let d = `M 0 0`;
  for (let i = 1; i <= nx; i++) d += ` A ${rx} ${rx} 0 0 1 ${i * sx} 0`;
  for (let i = 1; i <= ny; i++) d += ` A ${ry} ${ry} 0 0 1 ${w} ${i * sy}`;
  for (let i = nx - 1; i >= 0; i--) d += ` A ${rx} ${rx} 0 0 1 ${i * sx} ${h}`;
  for (let i = ny - 1; i >= 0; i--) d += ` A ${ry} ${ry} 0 0 1 0 ${i * sy}`;
  return d + " Z";
}

export function RevisionCloud({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pad = 10;
  return (
    <div ref={ref} className={`cloud ${className ?? ""}`}>
      {size && (
        <svg
          className="cloud__line"
          aria-hidden="true"
          width={size.w + pad * 2}
          height={size.h + pad * 2}
          viewBox={`${-pad} ${-pad} ${size.w + pad * 2} ${size.h + pad * 2}`}
          style={{ left: -pad, top: -pad }}
        >
          <path d={cloudPath(size.w, size.h, 13)} />
        </svg>
      )}
      {children}
    </div>
  );
}
