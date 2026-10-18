// A tiny tag-grammar engine. A grammar is data: a separator plus an ordered list
// of levels, each with a full pattern, a partial pattern (what is still valid
// while someone is typing), and an optional function that explains a value.
// The same parse() reads any grammar, so supporting a new client's tag format
// means adding a grammar object, never a new code branch.

export type Level = {
  key: string;
  label: string;
  /** Matches a complete, valid value for this level. */
  pattern: RegExp;
  /** Matches any value that could still become valid with more typing. */
  partial: RegExp;
  /** Shown when the value is wrong, so it says what is expected. */
  expects: string;
  optional?: boolean;
  explain?: (value: string) => string;
};

export type Grammar = {
  id: string;
  name: string;
  summary: string;
  separator: string;
  example: string;
  levels: Level[];
};

export type SegmentStatus = "ok" | "typing" | "error" | "missing" | "skipped";

export type ParsedSegment = {
  level: Level;
  value: string | undefined;
  status: SegmentStatus;
  meaning?: string;
  message?: string;
};

export type ParseResult = {
  segments: ParsedSegment[];
  /** Segments typed beyond the last level of the grammar. */
  extra: string[];
  valid: boolean;
  /** The first problem to show the person, or undefined when there is none. */
  problem?: string;
};

export function parse(rawInput: string, grammar: Grammar): ParseResult {
  const input = rawInput.trim().toUpperCase();
  const parts = input === "" ? [] : input.split(grammar.separator);
  const lastIndex = parts.length - 1;

  const segments: ParsedSegment[] = grammar.levels.map((level, i) => {
    const value = parts[i];

    if (value === undefined) {
      return { level, value, status: level.optional ? "skipped" : "missing" };
    }
    if (level.pattern.test(value)) {
      return { level, value, status: "ok", meaning: level.explain?.(value) };
    }
    // Only the segment under the cursor gets the benefit of the doubt.
    if (i === lastIndex && level.partial.test(value)) {
      return { level, value, status: "typing", message: `${level.label}: ${level.expects}` };
    }
    return {
      level,
      value,
      status: "error",
      message: value === "" ? `${level.label} is empty. Expected ${level.expects}.` : `${level.label} "${value}" doesn't fit. Expected ${level.expects}.`,
    };
  });

  const extra = parts.slice(grammar.levels.length);
  const firstError = segments.find((s) => s.status === "error");
  const firstMissing = segments.find((s) => s.status === "missing");
  const typing = segments.find((s) => s.status === "typing");

  let problem: string | undefined;
  if (firstError) problem = firstError.message;
  else if (extra.length > 0) problem = `Too many parts. This format ends after ${grammar.levels[grammar.levels.length - 1].label.toLowerCase()}.`;
  else if (typing) problem = typing.message;
  else if (firstMissing && parts.length > 0) problem = `Next: ${firstMissing.level.label.toLowerCase()}, ${firstMissing.level.expects}.`;

  const valid = parts.length > 0 && !firstError && !firstMissing && !typing && extra.length === 0;
  return { segments, extra, valid, problem };
}

const equipmentClasses: Record<string, string> = {
  P: "Pump",
  V: "Vessel",
  E: "Heat exchanger",
  K: "Compressor",
  T: "Tank",
  C: "Column",
};

const measuredVariable: Record<string, string> = {
  F: "Flow",
  L: "Level",
  P: "Pressure",
  T: "Temperature",
};

const instrumentFunction: Record<string, string> = {
  I: "indicator",
  C: "controller",
  T: "transmitter",
  V: "valve",
  A: "alarm",
  S: "switch",
};

export const grammars: Grammar[] = [
  {
    id: "equipment",
    name: "Client A",
    summary: "Equipment tag: plant, unit, class, number",
    separator: "-",
    example: "PL1-U200-P-101A",
    levels: [
      {
        key: "plant",
        label: "Plant",
        pattern: /^PL\d$/,
        partial: /^(P|PL|PL\d)?$/,
        expects: "PL and one digit, like PL1",
        explain: (v) => `Plant ${v.slice(2)}`,
      },
      {
        key: "unit",
        label: "Unit",
        pattern: /^U\d{3}$/,
        partial: /^(U\d{0,3})?$/,
        expects: "U and three digits, like U200",
        explain: (v) => `Unit ${Number(v.slice(1))}`,
      },
      {
        key: "class",
        label: "Class",
        pattern: /^[PVEKTC]$/,
        partial: /^[PVEKTC]?$/,
        expects: "one of P, V, E, K, T or C",
        explain: (v) => equipmentClasses[v],
      },
      {
        key: "number",
        label: "Number",
        pattern: /^\d{3}[A-Z]?$/,
        partial: /^(\d{0,3}|\d{3}[A-Z])$/,
        expects: "three digits and an optional train letter, like 101A",
        explain: (v) => (v.length === 4 ? `No. ${v.slice(0, 3)}, train ${v[3]}` : `No. ${v}`),
      },
    ],
  },
  {
    id: "instrument",
    name: "Client B",
    summary: "Instrument tag: area, function, loop, suffix",
    separator: ".",
    example: "30.PIC.1205.B",
    levels: [
      {
        key: "area",
        label: "Area",
        pattern: /^\d{2}$/,
        partial: /^\d{0,2}$/,
        expects: "two digits, like 30",
        explain: (v) => `Area ${v}`,
      },
      {
        key: "function",
        label: "Function",
        pattern: /^[FLPT][ICTVAS]{1,3}$/,
        partial: /^([FLPT][ICTVAS]{0,3})?$/,
        expects: "a variable (F, L, P, T) then up to three functions (I, C, T, V, A, S)",
        explain: (v) =>
          `${measuredVariable[v[0]]} ${v
            .slice(1)
            .split("")
            .map((c) => instrumentFunction[c])
            .join(" ")}`,
      },
      {
        key: "loop",
        label: "Loop",
        pattern: /^\d{4}$/,
        partial: /^\d{0,4}$/,
        expects: "four digits, like 1205",
        explain: (v) => `Loop ${v}`,
      },
      {
        key: "suffix",
        label: "Suffix",
        optional: true,
        pattern: /^[A-Z]$/,
        partial: /^[A-Z]?$/,
        expects: "one letter for a duplicate instrument",
        explain: (v) => `Instrument ${v}`,
      },
    ],
  },
];
