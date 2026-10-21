"use client";

import { useEffect, useState } from "react";

// Types each role out, holds it, erases it, moves to the next. The first role
// is rendered on the server, so the line is never empty without JavaScript.
export function RoleTyper({ roles }: { roles: string[] }) {
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let chars = roles[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (deleting) {
        chars -= 1;
        if (chars === 0) {
          deleting = false;
          index = (index + 1) % roles.length;
        }
      } else {
        chars += 1;
      }
      setText(roles[index].slice(0, chars));
      const done = !deleting && chars === roles[index].length;
      if (done) deleting = true;
      timer = setTimeout(tick, done ? 2200 : deleting ? 35 : 70);
    };

    timer = setTimeout(tick, 3000);
    return () => clearTimeout(timer);
  }, [roles]);

  return (
    <p className="hero__role">
      <span className="visually-hidden">{roles.join(", ")}</span>
      <span aria-hidden="true">
        <span className="hero__role-prompt">&gt;_</span> <span className="typer">{text}</span>
        <span className="caret" />
      </span>
    </p>
  );
}
