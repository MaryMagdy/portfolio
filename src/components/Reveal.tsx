"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

// Fades content up the first time it scrolls into view. The hidden starting
// state only applies once JavaScript has marked the page with `.js`, so the
// content is always readable without it.
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  threshold = 0.12,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  /** How much of the element must be visible before it appears. */
  threshold?: number;
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
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={`reveal ${className ?? ""}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
