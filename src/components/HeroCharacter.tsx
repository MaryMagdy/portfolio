"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The 3D scene is loaded on the client only, after the rest of the hero, so
// three.js never delays the first paint. Without WebGL the frame shows a
// short text fallback instead of an empty box.
const DeveloperScene = dynamic(() => import("./DeveloperScene"), {
  ssr: false,
  loading: () => <Placeholder text="Loading the workspace" />,
});

function Placeholder({ text }: { text: string }) {
  return (
    <div className="dev3d__placeholder">
      <span className="dev3d__spinner" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroCharacter() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => setWebgl(hasWebGL()), []);

  return (
    <figure className="dev3d" role="img" aria-label="3D illustration of a software developer with headphones and glasses typing at a laptop, surrounded by floating code panels">
      <div className="dev3d__glow" aria-hidden="true" />
      {webgl === null && <Placeholder text="Loading the workspace" />}
      {webgl === false && <Placeholder text="Your browser can't show 3D here, but everything else on the page works." />}
      {webgl && <DeveloperScene />}
      <figcaption className="dev3d__caption" aria-hidden="true">
        <i className="pulse" />
        mary@cairo <span>building something</span>
      </figcaption>
    </figure>
  );
}
