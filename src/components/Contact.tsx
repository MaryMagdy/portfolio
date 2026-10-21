"use client";

import { Check, Copy, FileText, Github, Languages, Linkedin, Mail, MapPin, Briefcase, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { facts, profile } from "@/content";
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
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const channels = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
    { icon: Linkedin, label: "LinkedIn", value: "mary-magdy-55666b77", href: profile.linkedin, copy: profile.linkedin },
    { icon: Github, label: "GitHub", value: "MaryMagdy", href: profile.github, copy: profile.github },
    { icon: FileText, label: "CV", value: "Mary_Magdy_Geady_CV.pdf", href: profile.cv, download: true },
  ];

  // Static site, no server: the form composes an email in the visitor's own
  // mail app instead of sending anything itself.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

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

        <form className="panel form" onSubmit={submit}>
          <h3 className="panel__title">Write to me</h3>
          <label className="field">
            <span>Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
          </label>
          <button type="submit" className="btn btn--glow">
            <Send size={16} aria-hidden="true" />
            Open in email app
          </button>
          <p className="form__note">This opens your own email app with the message filled in.</p>
        </form>
      </div>
    </div>
  );
}
