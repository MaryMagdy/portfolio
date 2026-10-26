"use client";

import { motion } from "framer-motion";
import { useState, type PointerEvent } from "react";
import type { Skill, SkillCategory } from "@/content";
import { SkillIcon } from "./SkillIcon";

type Filter = "All" | SkillCategory;

// The skills grid: category chips and one icon tile per tool. Hovering a tile
// lifts it, lights its border, bounces the logo, and shows a small ring that
// follows the pointer.
export function Toolbox({ skills, categories }: { skills: Skill[]; categories: SkillCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  // "All" leads with what I use every day, then regularly, then occasionally.
  const visible = filter === "All" ? [...skills].sort((a, b) => b.depth - a.depth) : skills.filter((s) => s.category === filter);

  const track = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  return (
    <div className="toolbox">
      <div className="toolbox__chips" role="group" aria-label="Filter skills by category">
        {(["All", ...categories] as Filter[]).map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {filter === c && <motion.span layoutId="toolbox-chip" className="chip__glow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="chip__text">{c}</span>
          </button>
        ))}
      </div>

      <p className="toolbox__count" aria-live="polite">
        {visible.length} {filter === "All" ? "skills" : `${filter.toLowerCase()} skills`}
      </p>

      <ul className="skill-tiles" key={filter}>
        {visible.map((s, i) => (
          <li key={s.name} className="skill-tile" data-anim="zoom" style={{ ["--d" as string]: `${(i % 5) * 60}ms` }} onPointerMove={track}>
            <span className="skill-tile__cursor" aria-hidden="true" />
            <span className="skill-tile__icon">
              <SkillIcon icon={s.icon} size={34} />
            </span>
            <span className="skill-tile__name">{s.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
