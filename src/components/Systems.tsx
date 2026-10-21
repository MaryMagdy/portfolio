"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Featured } from "@/content";
import { TerminalWindow } from "./TerminalWindow";

const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// The flagship systems as files in one console window: pick a tab and the
// write-up swaps in.
export function Systems({ items }: { items: Featured[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const c = items[i];

  return (
    <TerminalWindow title={`~/systems/${slug(c.title)}.md`} status={`${i + 1} of ${items.length}`} className="systems">
      <div className="systems__tabs" role="tablist" aria-label="Flagship systems">
        {items.map((s, n) => (
          <button
            key={s.title}
            id={`sys-tab-${n}`}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-controls="sys-panel"
            className="systems__tab"
            onClick={() => setI(n)}
          >
            {n === i && <motion.span layoutId="sys-tab-glow" className="systems__tab-glow" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="systems__tab-text">{slug(s.title)}.md</span>
          </button>
        ))}
      </div>

      <div id="sys-panel" role="tabpanel" aria-labelledby={`sys-tab-${i}`} className="systems__panel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={c.title}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <header className="systems__head">
              <h3 className="systems__title">{c.title}</h3>
              <p className="systems__meta">
                <span>{c.context}</span>
                <span className="systems__role">{c.role}</span>
              </p>
            </header>

            <dl className="systems__grid">
              {(
                [
                  ["Problem", c.problem],
                  ["Decision", c.decision],
                  ["Result", c.result],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <p className="systems__hard">
              <span className="systems__hard-label">The hard part</span>
              {c.hardPart}
            </p>

            <div className="systems__foot">
              <ul className="tags" aria-label="Built with">
                {c.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {c.link && (
                <a className="btn btn--ghost btn--sm" href={c.link.href} target="_blank" rel="noreferrer">
                  {c.link.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </TerminalWindow>
  );
}
