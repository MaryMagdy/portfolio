"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

// Animates content in each time it scrolls into view, and back out when it
// leaves, so scrolling up and down keeps the page alive. The hidden starting
// state only applies once JavaScript has marked the page with `.js`, so the
// content is always readable without it.
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  threshold = 0.12,
  once = false,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Extra wait before entering (not before leaving), in ms. */
  delay?: number;
  /** How much of the element must be visible before it appears. */
  threshold?: number;
  /** Appear the first time only, instead of every time. */
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          if (once) io.disconnect();
        } else if (!once) {
          el.classList.remove("is-in");
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <Tag ref={ref} className={`reveal ${className ?? ""}`} style={delay ? { ["--d" as string]: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
