"use client";

import { useEffect, useState } from "react";
import { TerminalWindow } from "./TerminalWindow";

type Line = { key: string; value: string | string[] };

const lines: Line[] = [
  { key: "name", value: "Mary Magdy Geady" },
  { key: "role", value: "Full-stack developer" },
  { key: "experience", value: "9+ years" },
  { key: "front_end", value: ["React", "Angular", "TypeScript"] },
  { key: "back_end", value: ["ASP.NET Core", "Node.js", "NestJS"] },
  { key: "data", value: ["PostgreSQL", "SQL Server"] },
  { key: "domain", value: "Oil and gas enterprise software" },
  { key: "status", value: "open_to_work" },
];

function render(l: Line) {
  const v = Array.isArray(l.value) ? `[${l.value.map((x) => `"${x}"`).join(", ")}]` : `"${l.value}"`;
  return { key: `"${l.key}"`, v };
}

// `cat profile.json`, typed out line by line. All lines are in the HTML from
// the start (screen readers and no-JS visitors get the whole thing); the
// animation only reveals them in order.
export function ProfileTerminal() {
  const [shown, setShown] = useState(lines.length + 2);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    let n = 0;
    const timer = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= lines.length + 2) clearInterval(timer);
    }, 260);
    return () => clearInterval(timer);
  }, []);

  return (
    <TerminalWindow title="mary@cairo: ~/profile" status="online" className="hero__term">
      <pre className="code" aria-label="Profile summary">
        <span className="code__line">
          <span className="c-prompt">$</span> cat profile.json
        </span>
        <span className={`code__line ${shown >= 1 ? "is-on" : ""}`}>{"{"}</span>
        {lines.map((l, i) => {
          const r = render(l);
          return (
            <span key={l.key} className={`code__line code__line--indent ${shown >= i + 2 ? "is-on" : ""}`}>
              <span className="c-key">{r.key}</span>: <span className={l.key === "status" ? "c-ok" : "c-str"}>{r.v}</span>
              {i < lines.length - 1 ? "," : ""}
            </span>
          );
        })}
        <span className={`code__line ${shown >= lines.length + 2 ? "is-on" : ""}`}>
          {"}"}
          <span className="caret" aria-hidden="true" />
        </span>
      </pre>
    </TerminalWindow>
  );
}
