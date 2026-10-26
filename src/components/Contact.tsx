"use client";

import { Check, Copy, FileText, Github, Languages, Linkedin, Mail, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import { facts, profile } from "@/content";
import { ContactForm } from "./ContactForm";
import { GlowCard } from "./GlowCard";

const factIcon = { location: MapPin, open: Briefcase, languages: Languages } as const;

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="icon-btn icon-btn--sm"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard can be blocked; the link next to it still works.
        }
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

export function Contact() {
  const channels = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
    { icon: Linkedin, label: "LinkedIn", value: "mary-magdy-55666b77", href: profile.linkedin, copy: profile.linkedin },
    { icon: Github, label: "GitHub", value: "MaryMagdy", href: profile.github, copy: profile.github },
    { icon: FileText, label: "CV", value: "Mary_Magdy_Geady_CV.pdf", href: profile.cv, download: true },
  ];

  return (
    <div className="contact">
      <ul className="facts">
        {facts.map((f) => {
          const Icon = factIcon[f.key as keyof typeof factIcon];
          return (
            <GlowCard as="li" key={f.key} className="fact">
              <Icon size={20} aria-hidden="true" className="fact__icon" />
              <span className="fact__label">{f.label}</span>
              <span className="fact__value">{f.value}</span>
            </GlowCard>
          );
        })}
      </ul>

      <div className="contact__grid">
        <div className="panel">
          <h3 className="panel__title">Channels</h3>
          <ul className="channels">
            {channels.map((c) => (
              <li key={c.label} className="channel">
                <c.icon size={18} aria-hidden="true" className="channel__icon" />
                <span className="channel__label">{c.label}</span>
                <a className="channel__value" href={c.href} {...(c.download ? { download: true } : { target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" })}>
                  {c.value}
                </a>
                {c.copy && <CopyButton value={c.copy} label={c.label} />}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
