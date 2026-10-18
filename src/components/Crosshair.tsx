"use client";

import { useEffect, useRef } from "react";

// A CAD-style crosshair that follows the pointer across the cover sheet, with
// a live coordinate readout. Mouse and trackpad only; touch screens and
// reduced-motion visitors never see it.
export function Crosshair() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const readout = el.querySelector<HTMLSpanElement>(".crosshair__readout");
    let frame = 0;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        const x = Math.round(e.clientX - r.left);
        const y = Math.round(e.clientY - r.top);
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
        if (readout) readout.textContent = `X ${String(x).padStart(4, "0")}  Y ${String(y).padStart(4, "0")}`;
        el.dataset.flip = String(x > r.width - 140);
        el.dataset.on = "true";
      });
    };
    const leave = () => {
      el.dataset.on = "false";
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="crosshair" aria-hidden="true" data-on="false">
      <span className="crosshair__h" />
      <span className="crosshair__v" />
      <span className="crosshair__readout" />
    </div>
  );
}
