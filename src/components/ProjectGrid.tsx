"use client";

import { useState } from "react";
import type { Project, Tech } from "@/content";

type Filter = "All" | Tech;

// Every project as a small drawing card, filterable by technology. Changing
// the filter replays a short staggered entrance so the visitor sees what
// changed.
export function ProjectGrid({ projects, filters }: { projects: Project[]; filters: Tech[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [run, setRun] = useState(0);
  const options: Filter[] = ["All", ...filters];
  const visible = filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));

  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.tech.includes(f)).length);

  return (
    <div>
      <div className="filters" role="group" aria-label="Filter projects by technology">
        {options.map((f) => (
          <button
            key={f}
            type="button"
            className="filters__btn"
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setRun((r) => r + 1);
            }}
          >
            {f}
            <span className="filters__count">{count(f)}</span>
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <ul className="cards" key={run}>
        {visible.map((p, i) => (
          <li key={p.title} className="card" style={{ animationDelay: `${Math.min(i, 10) * 45}ms` }}>
            <div className="card__top">
              <span className={`status status--${p.status.replace(" ", "-").toLowerCase()}`}>{p.status}</span>
              <span className="card__client">{p.client}</span>
            </div>
            <h3 className="card__title">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer">
                  {p.title}
                </a>
              ) : (
                p.title
              )}
            </h3>
            <p className="card__desc">{p.description}</p>
            <p className="card__stack">{p.stack}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
