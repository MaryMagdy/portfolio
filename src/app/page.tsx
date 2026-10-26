import { ArrowUp, ArrowUpRight, Download, Factory, Github, Linkedin, MapPin, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import { Contact } from "@/components/Contact";
import { GlowCard } from "@/components/GlowCard";
import { Nav } from "@/components/Nav";
import { NeuralMesh } from "@/components/NeuralMesh";
import { HeroMedia } from "@/components/HeroMedia";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { RoleTyper } from "@/components/RoleTyper";
import { SkillsOrbit } from "@/components/SkillsOrbit";
import { Toolbox } from "@/components/Toolbox";
import { Stats } from "@/components/Stats";
import { notes, orbitBrands, pillars, profile, projects, revisions, roles, skillCategories, skills, stats, techFilters } from "@/content";

const pillarIcon = { workflow: Workflow, data: Factory, rules: ShieldCheck, ai: Sparkles } as const;

function SectionHead({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <Reveal className="section__head">
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
      <ScrollAnimator />

      <main id="main">
        <section id="home" className="hero" aria-labelledby="home-title">
          <HeroMedia />
          <div className="hero__inner">
            <div className="hero__text">
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
              <div className="hero__meta">
                <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <span className="hero__where">
                  <MapPin size={15} aria-hidden="true" />
                  Currently in {profile.location}
                </span>
              </div>
            </div>
            <div className="hero__stats">
              <Stats stats={stats} />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="pillars-title" id="pillars">
          <SectionHead id="pillars-title" title="What I build" intro={notes[0]} />
          <ul className="pillars">
            {pillars.map((p, i) => {
              const Icon = pillarIcon[p.key];
              return (
                <Reveal as="li" key={p.key} delay={(i % 2) * 220} threshold={0.35} className={`pillar-reveal pillar-reveal--${i % 2 ? "right" : "left"}`}>
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
          <SectionHead id="projects-title" title="All projects" intro="Work and personal projects. Company repositories are private, so those are described rather than linked." />
          <Reveal>
            <ProjectGrid projects={projects} filters={techFilters} />
          </Reveal>
        </section>

        <section className="section skills-section" aria-labelledby="skills-title" id="skills">
          <div className="skills-section__visual">
            <Reveal>
              <SkillsOrbit items={orbitBrands} />
            </Reveal>
            <Reveal className="quote-card" delay={150}>
              <span className="quote-card__mark" aria-hidden="true">
                &ldquo;
              </span>
              <p>Tools change. Clear thinking and careful testing don&apos;t.</p>
            </Reveal>
          </div>
          <div className="skills-section__main">
            <Reveal className="skills-section__head">
              <p className="toolbox-pill">
                <Zap size={14} aria-hidden="true" /> My toolbox
              </p>
              <h2 id="skills-title" className="skills-section__title">
                Skills that build <span className="grad-text">real systems</span>
              </h2>
              <p className="section__intro">The technologies and tools I use to turn paper processes and plant data into working software.</p>
            </Reveal>
            <Reveal>
              <Toolbox skills={skills} categories={skillCategories} />
            </Reveal>
          </div>
        </section>

        <section className="section" aria-labelledby="experience-title" id="experience">
          <SectionHead id="experience-title" title="Experience" />
          <ol className="timeline">
            {revisions.map((r, i) => (
              <Reveal as="li" key={r.rev} className="timeline__item reveal--left" delay={i * 120}>
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
          <SectionHead id="contact-title" title="Let's talk" intro="Hiring for a full-stack role, or have something to build? Reach me on any of these." />
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
