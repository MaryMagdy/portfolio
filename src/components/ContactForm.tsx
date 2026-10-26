"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile } from "@/content";

// Sends the visitor's message straight to my inbox through Web3Forms, a
// form-to-email service, since this is a static site with no server of its
// own. The access key is public by design (it can only deliver mail to the
// address it was issued for), and comes from NEXT_PUBLIC_WEB3FORMS_KEY.
// Without a key, the form falls back to opening the visitor's email app.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const mailto = () => {
    const subject = encodeURIComponent(`Portfolio message from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n${name}${email ? ` <${email}>` : ""}`);
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: real visitors never see or fill this field; bots usually do.
    const trap = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (trap) return;

    if (!ACCESS_KEY) {
      window.location.href = mailto();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${name}`,
          from_name: "Mary Magdy portfolio",
          name,
          email,
          replyto: email,
          message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) throw new Error(data.message || `The service answered ${res.status}.`);
      setStatus({ kind: "sent" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "The message could not be sent." });
    }
  };

  if (status.kind === "sent") {
    return (
      <div className="panel form form--done" role="status">
        <CheckCircle2 size={40} aria-hidden="true" className="form__done-icon" />
        <h3 className="panel__title">Message sent</h3>
        <p className="form__note">Thank you. It&apos;s in my inbox, and I&apos;ll reply to the email you gave.</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus({ kind: "idle" })}>
          Write another message
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form className="panel form" onSubmit={submit} noValidate={false}>
      <h3 className="panel__title">Write to me</h3>
      <label className="field">
        <span>Your name</span>
        <input name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required maxLength={100} disabled={sending} />
      </label>
      <label className="field">
        <span>Your email</span>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          maxLength={200}
          disabled={sending}
        />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required maxLength={5000} disabled={sending} />
      </label>

      {/* Honeypot, hidden from people and screen readers */}
      <input type="checkbox" name="botcheck" className="form__trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button type="submit" className="btn btn--glow" disabled={sending}>
        {sending ? <Loader2 size={16} aria-hidden="true" className="spin" /> : <Send size={16} aria-hidden="true" />}
        {sending ? "Sending…" : ACCESS_KEY ? "Send message" : "Open in email app"}
      </button>

      {status.kind === "error" ? (
        <p className="form__error" role="alert">
          <AlertCircle size={16} aria-hidden="true" />
          <span>
            {status.message} Please try again, or{" "}
            <a href={mailto()}>send it from your email app</a> instead.
          </span>
        </p>
      ) : (
        <p className="form__note">
          {ACCESS_KEY ? "Your message goes straight to my inbox, and I'll reply to the email you give." : "This opens your own email app with the message filled in."}
        </p>
      )}
    </form>
  );
}
