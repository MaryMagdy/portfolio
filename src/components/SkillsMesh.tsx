"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { depthLabel, type SkillGroup } from "@/content";

// Skills grouped by area. Instead of invented percentages, each skill shows
// how often I actually use it: daily, regularly, or when the job needs it.
// The three-segment meters fill in when the panel comes into view.
export function SkillsMesh({ groups }: { groups: SkillGroup[] }) {
  const [key, setKey] = useState(groups[0].key);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const group = groups.find((g) => g.key === key) ?? groups[0];

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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`mesh-skills ${seen ? "is-seen" : ""}`}>
      <div className="seg-tabs" role="tablist" aria-label="Skill areas">
        {groups.map((g) => (
          <button key={g.key} type="button" role="tab" aria-selected={g.key === key} className="seg-tabs__btn" onClick={() => setKey(g.key)}>
            {g.key === key && <motion.span layoutId="skill-tab" className="seg-tabs__glow" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="seg-tabs__text">{g.label}</span>
          </button>
        ))}
      </div>

      <p className="legend">
        <span>
          <i className="meter meter--3" aria-hidden="true">
            <b />
            <b />
            <b />
          </i>
          Daily
        </span>
        <span>
          <i className="meter meter--2" aria-hidden="true">
            <b />
            <b />
            <b />
          </i>
          Regular
        </span>
        <span>
          <i className="meter meter--1" aria-hidden="true">
            <b />
            <b />
            <b />
          </i>
          When needed
        </span>
      </p>

      <ul className="skills" role="tabpanel" key={key}>
        {group.skills.map((s, i) => (
          <li key={s.name} className="skill" style={{ animationDelay: `${i * 50}ms` }}>
            <span className="skill__name">{s.name}</span>
            <span className={`meter meter--${s.depth}`} role="img" aria-label={`Used ${depthLabel[s.depth].toLowerCase()}`}>
              <b style={{ transitionDelay: `${i * 60}ms` }} />
              <b style={{ transitionDelay: `${i * 60 + 90}ms` }} />
              <b style={{ transitionDelay: `${i * 60 + 180}ms` }} />
            </span>
            <span className="skill__depth">{depthLabel[s.depth]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
