"use client";

import { useEffect, useState } from "react";

// Page-wide motion in one place: sheets draw their frames and reveal their
// content as they scroll into view, the nav marks the sheet being read, and a
// back-to-top control appears once the cover is out of sight.
export function PageEffects() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sheets = Array.from(document.querySelectorAll<HTMLElement>(".sheet"));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".bar__nav a"));

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    sheets.forEach((s) => reveal.observe(s));

    const active = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          for (const a of links) {
            if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sheets.forEach((s) => active.observe(s));

    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      reveal.disconnect();
      active.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a href="#top" className="to-top" data-show={showTop} aria-label="Back to top" tabIndex={showTop ? 0 : -1}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}
