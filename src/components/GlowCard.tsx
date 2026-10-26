"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

// A glass panel that tilts a few degrees toward the pointer and lights its
// border where the pointer is. Flat on touch screens and for reduced motion.
export function GlowCard({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 220, damping: 22 });
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={`glow-card ${className ?? ""}`}
      // Same style on server and client (so hydration matches); reduced-motion
      // visitors simply never move the values, so the card stays flat.
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        if (!reduce) {
          px.set(x);
          py.set(y);
        }
        e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
        e.currentTarget.style.setProperty("--my", `${y * 100}%`);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </MotionTag>
  );
}
