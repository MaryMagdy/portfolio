import type { ReactNode } from "react";

export const TOTAL_SHEETS = 7;

const columns = ["1", "2", "3", "4", "5", "6"];
const rows = ["A", "B", "C", "D"];

// One drawing sheet: an outer border, the zone grid references in the margin,
// and a title block in the bottom-right corner naming what the sheet shows.
export function Sheet({
  id,
  number,
  title,
  heading,
  children,
  className,
}: {
  id: string;
  number: number;
  title: string;
  heading?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`sheet ${className ?? ""}`} aria-labelledby={`${id}-title`}>
      <div className="sheet__zones" aria-hidden="true">
        <div className="sheet__zones-row sheet__zones-row--top">
          {columns.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className="sheet__zones-col sheet__zones-col--left">
          {rows.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
        <div className="sheet__zones-col sheet__zones-col--right">
          {rows.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
        <div className="sheet__zones-row sheet__zones-row--bottom">
          {columns.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>

      <div className="sheet__frame">
        {heading ?? (
          <h2 id={`${id}-title`} className="sheet__heading">
            {title}
          </h2>
        )}
        {children}
        <TitleBlock title={title} number={number} />
      </div>
    </section>
  );
}

export function TitleBlock({ title, number }: { title: string; number: number }) {
  return (
    <dl className="title-block">
      <div className="title-block__cell title-block__cell--wide">
        <dt>Title</dt>
        <dd>{title}</dd>
      </div>
      <div className="title-block__cell">
        <dt>Drawn by</dt>
        <dd>M. Magdy</dd>
      </div>
      <div className="title-block__cell">
        <dt>Dwg no.</dt>
        <dd>MMG-{String(number).padStart(3, "0")}</dd>
      </div>
      <div className="title-block__cell">
        <dt>Sheet</dt>
        <dd>
          {number} of {TOTAL_SHEETS}
        </dd>
      </div>
      <div className="title-block__cell">
        <dt>Rev</dt>
        <dd>C</dd>
      </div>
    </dl>
  );
}
