"use client";

import { useEffect } from "react";

// Plays enter and exit animations for every element marked `data-anim`, each
// time it crosses into or out of view. New elements (after a filter change,
// for example) are picked up automatically.
export function ScrollAnimator() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("no-anim");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("is-in", e.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-anim]").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
