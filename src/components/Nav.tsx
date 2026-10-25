"use client";

import { Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content";

const links = [
  { href: "#home", label: "Home" },
  { href: "#pillars", label: "Pillars" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// Floating glass deck. Marks the section being read, condenses once the page
// scrolls, and folds into a menu on small screens.
export function Nav() {
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter((s): s is Element => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`deck ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <a className="deck__brand" href="#home" onClick={() => setOpen(false)}>
        <span className="deck__mark" aria-hidden="true">
          MM
        </span>
        <span className="deck__name">Mary Magdy</span>
        <span className="pill pill--green">
          <i className="pulse" aria-hidden="true" />
          Open to work
        </span>
      </a>

      <nav id="deck-links" aria-label="Sections" className="deck__links">
        {links.map((l) => (
          <a key={l.href} href={l.href} aria-current={active === l.href ? "true" : undefined} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="deck__actions">
        <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a className="btn btn--glow btn--sm" href="#contact">
          Get in touch
        </a>
        <button
          type="button"
          className="icon-btn deck__menu"
          aria-expanded={open}
          aria-controls="deck-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
