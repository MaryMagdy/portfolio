"use client";

import { useEffect, useRef } from "react";

// Full-page background: drifting nodes that link to their neighbours, and lean
// toward the pointer. Pauses when the tab is hidden; draws one still frame
// for reduced-motion visitors.
export function NeuralMesh() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let frame = 0;
    type Node = { x: number; y: number; vx: number; vy: number; violet: boolean };
    let nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        violet: Math.random() < 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const link = 140;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.16 * (1 - d / link)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < 180) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.35 * (1 - pd / 180)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
        ctx.fillStyle = a.violet ? "rgba(167, 139, 250, 0.8)" : "rgba(103, 232, 249, 0.8)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 180 && d > 1) {
          n.vx += (dx / d) * 0.004;
          n.vy += (dy / d) * 0.004;
        }
        n.vx = Math.max(-0.5, Math.min(0.5, n.vx * 0.995));
        n.vy = Math.max(-0.5, Math.min(0.5, n.vy * 0.995));
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduce) frame = requestAnimationFrame(step);
    };

    resize();
    if (reduce) draw();
    else frame = requestAnimationFrame(step);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="mesh" aria-hidden="true" />;
}
