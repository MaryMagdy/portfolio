import { Sheet } from "@/components/Sheet";
import { TagParser } from "@/components/TagParser";
import { RevisionCloud } from "@/components/RevisionCloud";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RoleTyper } from "@/components/RoleTyper";
import { Stats } from "@/components/Stats";
import { Crosshair } from "@/components/Crosshair";
import { ProjectGrid } from "@/components/ProjectGrid";
import { PageEffects } from "@/components/PageEffects";
import { bom, featured, notes, profile, projects, revisions, roles, stats, techFilters } from "@/content";

const nav = [
  { href: "#notes", label: "Notes" },
  { href: "#cases", label: "Case studies" },
  { href: "#register", label: "All projects" },
  { href: "#revisions", label: "Experience" },
  { href: "#materials", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="bar">
        <a className="bar__name" href="#top">
          Mary Magdy
        </a>
        <nav aria-label="Sections" className="bar__nav">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </header>

      <main id="main">
        <Sheet id="top" number={1} title="Cover sheet" heading={<span id="top-title" className="visually-hidden">Cover sheet</span>} className="sheet--cover">
          <Crosshair />
          <div className="cover__glow" aria-hidden="true" />
          <div className="cover">
            <div className="cover__text">
              <h1 className="cover__name">{profile.name}</h1>
              <RoleTyper roles={roles} suffix={`in ${profile.location}`} />
              <p className="cover__statement">{profile.statement}</p>
              <RevisionCloud className="cover__cloud">
                <p className="cover__cloud-text">
                  <strong>Rev C.</strong> {profile.lookingFor}.
                </p>
              </RevisionCloud>
              <div className="actions">
                <a className="btn btn--solid" href={profile.cv} download>
                  Download CV
                </a>
                <a className="btn" href={`mailto:${profile.email}`}>
                  Email me
                </a>
              </div>
            </div>

            <div className="cover__demo">
              <h2 className="cover__demo-title">Read a plant tag</h2>
              <p className="cover__demo-intro">
                Every plant names its equipment differently. This small parser reads a tag against a format that is data, not code. Type your own, or switch client and watch the same tag fail.
              </p>
              <TagParser />
            </div>
          </div>
          <Stats stats={stats} />
        </Sheet>

        <Sheet id="notes" number={2} title="General notes">
          <ol className="notes">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
        </Sheet>

        <Sheet id="cases" number={3} title="Case studies">
          <div className="cases">
            {featured.map((c) => (
              <article key={c.title} className="case">
                <header className="case__head">
                  <h3 className="case__title">{c.title}</h3>
                  <p className="case__context">
                    {c.context}. <span className="case__role">{c.role}</span>
                  </p>
                </header>
                <dl className="case__body">
                  <div>
                    <dt>Problem</dt>
                    <dd>{c.problem}</dd>
                  </div>
                  <div>
                    <dt>Decision</dt>
                    <dd>{c.decision}</dd>
                  </div>
                  <div>
                    <dt>Result</dt>
                    <dd>{c.result}</dd>
                  </div>
                  <div>
                    <dt>The hard part</dt>
                    <dd>{c.hardPart}</dd>
                  </div>
                </dl>
                <ul className="chips" aria-label="Built with">
                  {c.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {c.link && (
                  <a className="case__link" href={c.link.href} target="_blank" rel="noreferrer">
                    {c.link.label}
                  </a>
                )}
              </article>
            ))}
          </div>
        </Sheet>

        <Sheet id="register" number={4} title="Drawing register">
          <ProjectGrid projects={projects} filters={techFilters} />
        </Sheet>

        <Sheet id="revisions" number={5} title="Revision history">
          <ol className="revs">
            {revisions.map((r) => (
              <li key={r.rev} className="rev">
                <svg className="rev__mark" viewBox="0 0 40 36" role="img" aria-label={`Revision ${r.rev}`}>
                  <polygon points="20,2 38,34 2,34" />
                  <text x="20" y="29" textAnchor="middle">
                    {r.rev}
                  </text>
                </svg>
                <div>
                  <h3 className="rev__title">{r.title}</h3>
                  <p className="rev__org">
                    {r.org}, {r.dates}
                  </p>
                  <p className="rev__desc">{r.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Sheet>

        <Sheet id="materials" number={6} title="Bill of materials">
          <div className="bom">
            {bom.map((g) => (
              <section key={g.use} className="bom__group">
                <h3>{g.use}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Sheet>

        <Sheet id="contact" number={7} title="Contact">
          <div className="contact">
            <p className="contact__lead">Hiring for a full-stack role, or have something to build? Write to me and I'll reply.</p>
            <ul className="contact__list">
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.cv} download>
                  Download CV (PDF)
                </a>
              </li>
            </ul>
          </div>
        </Sheet>
      </main>

      <PageEffects />
      <footer className="foot">Mary Magdy Geady, Cairo. Built with Next.js and TypeScript.</footer>
    </>
  );
}
