import { ArrowUp, ArrowUpRight, Download, Factory, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Contact } from "@/components/Contact";
import { GlowCard } from "@/components/GlowCard";
import { Nav } from "@/components/Nav";
import { NeuralMesh } from "@/components/NeuralMesh";
import { HeroCharacter } from "@/components/HeroCharacter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { RoleTyper } from "@/components/RoleTyper";
import { SkillsMesh } from "@/components/SkillsMesh";
import { Stats } from "@/components/Stats";
import { notes, pillars, profile, projects, revisions, roles, skillGroups, stats, techFilters } from "@/content";

const pillarIcon = { workflow: Workflow, data: Factory, rules: ShieldCheck, ai: Sparkles } as const;

function SectionHead({ id, kicker, title, intro }: { id: string; kicker: string; title: string; intro?: string }) {
  return (
    <Reveal className="section__head">
      <p className="kicker">
        <span className="kicker__path">~/{kicker}</span>
      </p>
      <h2 id={id} className="section__title">
        {title}
      </h2>
      {intro && <p className="section__intro">{intro}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <NeuralMesh />
      <div className="glows" aria-hidden="true" />
      <Nav />

      <main id="main">
        <section id="home" className="hero" aria-labelledby="home-title">
          <div className="hero__text">
            <p className="hero__status">
              <i className="pulse" aria-hidden="true" />
              Status: open to full-stack roles <span className="hero__status-sep">{"//"}</span> {profile.location}
            </p>
            <h1 id="home-title" className="hero__title">
              <span className="hero__hello">Hello, I&apos;m</span>
              <span className="hero__name">{profile.name}</span>
            </h1>
            <RoleTyper roles={roles} />
            <p className="hero__statement">{profile.statement}</p>
            <div className="actions">
              <a className="btn btn--glow" href="#projects">
                Explore my projects
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href={profile.cv} download>
                <Download size={18} aria-hidden="true" />
                Download CV (PDF)
              </a>
            </div>
          </div>
          <HeroCharacter />
          <div className="hero__stats">
            <Stats stats={stats} />
          </div>
        </section>

        <section className="section" aria-labelledby="pillars-title" id="pillars">
          <SectionHead id="pillars-title" kicker="pillars" title="What I build" intro={notes[0]} />
          <ul className="pillars">
            {pillars.map((p, i) => {
              const Icon = pillarIcon[p.key];
              return (
                <Reveal as="li" key={p.key} delay={i * 120}>
                  <GlowCard className={`pillar pillar--${p.key}`}>
                    <span className="pillar__icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <h3 className="pillar__title">{p.title}</h3>
                    <p className="pillar__body">{p.body}</p>
                    <ul className="tags">
                      {p.tools.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </GlowCard>
                </Reveal>
              );
            })}
          </ul>
        </section>

        <section className="section" aria-labelledby="projects-title" id="projects">
          <SectionHead id="projects-title" kicker="projects" title="All projects" intro="Work and personal projects. Company repositories are private, so those are described rather than linked." />
          <Reveal>
            <ProjectGrid projects={projects} filters={techFilters} />
          </Reveal>
        </section>

        <section className="section" aria-labelledby="skills-title" id="skills">
          <SectionHead
            id="skills-title"
            kicker="skills"
            title="Skills, by how often I use them"
            intro="No made-up percentages. Each meter shows whether a tool is part of my daily work, something I use regularly, or one I reach for when a job needs it."
          />
          <Reveal>
            <SkillsMesh groups={skillGroups} />
          </Reveal>
        </section>

        <section className="section" aria-labelledby="experience-title" id="experience">
          <SectionHead id="experience-title" kicker="experience" title="Experience" />
          <ol className="timeline">
            {revisions.map((r, i) => (
              <Reveal as="li" key={r.rev} className="timeline__item" delay={i * 100}>
                <span className="timeline__node" aria-hidden="true" />
                <p className="timeline__dates">{r.dates}</p>
                <h3 className="timeline__title">{r.title}</h3>
                <p className="timeline__org">{r.org}</p>
                <p className="timeline__desc">{r.description}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="section" aria-labelledby="contact-title" id="contact">
          <SectionHead id="contact-title" kicker="contact" title="Let's talk" intro="Hiring for a full-stack role, or have something to build? Reach me on any of these." />
          <Reveal>
            <Contact />
          </Reveal>
        </section>
      </main>

      <footer className="foot">
        <p>
          <i className="pulse" aria-hidden="true" /> © 2026 Mary Magdy Geady. Built with Next.js, TypeScript and Framer Motion.
        </p>
        <a className="icon-btn" href="#home" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      </footer>
    </>
  );
}
