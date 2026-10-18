"use client";

import { useEffect, useId, useRef, useState } from "react";
import { grammars, parse, type ParsedSegment } from "@/lib/tagGrammar";

const statusText: Record<ParsedSegment["status"], string> = {
  ok: "valid",
  typing: "in progress",
  error: "invalid",
  missing: "not entered",
  skipped: "optional",
};

export function TagParser() {
  const [grammarId, setGrammarId] = useState(grammars[0].id);
  const grammar = grammars.find((g) => g.id === grammarId) ?? grammars[0];
  const [value, setValue] = useState("");
  const touched = useRef(false);
  const inputId = useId();
  const statusId = useId();

  // One orchestrated moment on load: the example types itself in, so the
  // visitor sees the parse happen before they touch anything.
  useEffect(() => {
    const example = grammars[0].example;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(example);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (touched.current) return;
      i += 1;
      setValue(example.slice(0, i));
      if (i < example.length) timer = setTimeout(step, 85);
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, []);

  const result = parse(value, grammar);

  const switchGrammar = (id: string) => {
    touched.current = true;
    setGrammarId(id);
    // Keep what was typed, so the visitor sees one tag read by two formats.
    if (value.trim() === "") setValue(grammars.find((g) => g.id === id)?.example ?? "");
  };

  return (
    <div className="parser">
      <div className="parser__clients" role="radiogroup" aria-label="Tag format">
        {grammars.map((g) => (
          <button
            key={g.id}
            type="button"
            role="radio"
            aria-checked={g.id === grammarId}
            className="parser__client"
            onClick={() => switchGrammar(g.id)}
          >
            <span className="parser__client-name">{g.name}</span>
            <span className="parser__client-summary">{g.summary}</span>
          </button>
        ))}
      </div>

      <label className="parser__label" htmlFor={inputId}>
        Type a tag
      </label>
      <input
        id={inputId}
        className="parser__input"
        value={value}
        maxLength={40}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="characters"
        aria-describedby={statusId}
        placeholder={grammar.example}
        onFocus={() => (touched.current = true)}
        onChange={(e) => {
          touched.current = true;
          setValue(e.target.value.toUpperCase());
        }}
      />

      <ol className="parser__segments">
        {result.segments.map((s, i) => (
          <li key={s.level.key} className={`seg seg--${s.status}`}>
            <span className="seg__label">{s.level.label}</span>
            <span className="seg__value">{s.value || (s.status === "skipped" ? "none" : "?")}</span>
            <span className="seg__meaning">
              {s.meaning ?? <span className="visually-hidden">{statusText[s.status]}</span>}
            </span>
            {i < result.segments.length - 1 && (
              <span className="seg__sep" aria-hidden="true">
                {grammar.separator}
              </span>
            )}
          </li>
        ))}
      </ol>

      <p id={statusId} className={`parser__status ${result.valid ? "is-valid" : ""}`} aria-live="polite">
        {result.valid
          ? `Valid ${grammar.name} tag: ${result.segments
              .filter((s) => s.meaning)
              .map((s) => s.meaning)
              .join(", ")}.`
          : (result.problem ?? `Try ${grammar.example}.`)}
      </p>
    </div>
  );
}
