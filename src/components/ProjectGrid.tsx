"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Project, Tech } from "@/content";
import { GlowCard } from "./GlowCard";

type Filter = "All" | Tech;

// Every project as a glowing card, filterable by technology. Changing the
// filter replays a short staggered entrance so the visitor sees what changed.
export function ProjectGrid({ projects, filters }: { projects: Project[]; filters: Tech[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const options: Filter[] = ["All", ...filters];
  const visible = filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.tech.includes(f)).length);

  return (
    <div>
      <div className="seg-tabs seg-tabs--wrap" role="group" aria-label="Filter projects by technology">
        {options.map((f) => (
          <button key={f} type="button" className="seg-tabs__btn" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {filter === f && <motion.span layoutId="proj-filter" className="seg-tabs__glow" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="seg-tabs__text">
              {f}
              <span className="seg-tabs__count">{count(f)}</span>
            </span>
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <ul className="cards" key={filter}>
        {visible.map((p, i) => (
          <GlowCard key={p.title} as="li" className="card">
            <div className="card__in" data-anim="flip" style={{ ["--d" as string]: `${(i % 6) * 70}ms` }}>
              <div className="card__top">
                <span className={`badge badge--${p.status.replace(" ", "-").toLowerCase()}`}>{p.status}</span>
                <span className="card__client">{p.client}</span>
              </div>
              <h3 className="card__title">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer">
                    {p.title}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="card__desc">{p.description}</p>
              <p className="card__stack">{p.stack}</p>
            </div>
          </GlowCard>
        ))}
      </ul>
    </div>
  );
}
