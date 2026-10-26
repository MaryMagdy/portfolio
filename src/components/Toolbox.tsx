"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { depthLabel, type Skill, type SkillCategory } from "@/content";
import { GlowCard } from "./GlowCard";
import { SkillIcon } from "./SkillIcon";

type Filter = "All" | SkillCategory;
const PREVIEW = 12;

// The skills grid: category chips, a count, and one card per tool. Each bar
// shows how often I use the tool (daily, regular, when needed), not a score.
export function Toolbox({ skills, categories }: { skills: Skill[]; categories: SkillCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // "All" leads with what I use every day, then regularly, then occasionally.
  const matching = filter === "All" ? [...skills].sort((a, b) => b.depth - a.depth) : skills.filter((s) => s.category === filter);
  const visible = filter === "All" && !expanded ? matching.slice(0, PREVIEW) : matching;

  const pick = (f: Filter) => {
    setFilter(f);
    setExpanded(false);
  };

  return (
    <div ref={ref} className={`toolbox ${seen ? "is-seen" : ""}`}>
      <div className="toolbox__chips" role="group" aria-label="Filter skills by category">
        {(["All", ...categories] as Filter[]).map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => pick(c)}>
            {filter === c && <motion.span layoutId="toolbox-chip" className="chip__glow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="chip__text">{c}</span>
          </button>
        ))}
      </div>

      <p className="toolbox__count" aria-live="polite">
        Showing {visible.length} of {matching.length}
        {filter === "All" ? " skills" : ` ${filter.toLowerCase()} skills`}
        <span className="toolbox__legend">
          <i className="bar bar--3" aria-hidden="true" />
          daily
          <i className="bar bar--2" aria-hidden="true" />
          regular
          <i className="bar bar--1" aria-hidden="true" />
          when needed
        </span>
      </p>

      <ul className="skill-cards" key={`${filter}-${expanded}`}>
        {visible.map((s, i) => (
          <GlowCard as="li" key={s.name} className="skill-card">
            <div className="skill-card__in" style={{ animationDelay: `${Math.min(i, 14) * 40}ms` }}>
              <span className="skill-card__icon">
                <SkillIcon icon={s.icon} />
              </span>
              <div className="skill-card__row">
                <span className="skill-card__name">{s.name}</span>
                <span className="skill-card__depth">{depthLabel[s.depth]}</span>
              </div>
              <span className="skill-card__track" role="img" aria-label={`Used ${depthLabel[s.depth].toLowerCase()}`}>
                <span className={`skill-card__fill skill-card__fill--${s.depth}`} style={{ transitionDelay: `${200 + Math.min(i, 14) * 50}ms` }} />
              </span>
              <span className="skill-card__cat">{s.category}</span>
            </div>
          </GlowCard>
        ))}
      </ul>

      {filter === "All" && matching.length > PREVIEW && (
        <button type="button" className="btn btn--ghost btn--sm toolbox__more" onClick={() => setExpanded((e) => !e)}>
          <Wrench size={16} aria-hidden="true" />
          {expanded ? "Show fewer" : `Show all ${matching.length} skills`}
        </button>
      )}
    </div>
  );
}
