import type { ReactNode } from "react";

// Window chrome around any block that should read as a console: traffic-light
// dots, a title, and an optional status on the right.
export function TerminalWindow({
  title,
  status,
  children,
  className,
}: {
  title: string;
  status?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`term ${className ?? ""}`}>
      <div className="term__bar">
        <span className="term__dots" aria-hidden="true">
          <i className="dot dot--red" />
          <i className="dot dot--yellow" />
          <i className="dot dot--green" />
        </span>
        <span className="term__title">{title}</span>
        {status && (
          <span className="term__status">
            <i className="pulse" aria-hidden="true" />
            {status}
          </span>
        )}
      </div>
      <div className="term__body">{children}</div>
    </div>
  );
}
