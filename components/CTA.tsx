"use client";

import { useState } from "react";
import { Send, ShieldCheck, Award, Sparkles } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: hubungkan ke penyedia email (Resend/Formspree/dsb).
    setSent(true);
  }

  return (
    <section id="contact" className="section-pad py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface2 via-surface to-ink p-10 text-center sm:p-16">
        <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
        <div className="relative">
          <span className="eyebrow">Get in Touch</span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Have a Project in Mind?{" "}
            <span className="text-primary">Let&apos;s Discuss</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Drop your email below and I will get back to you within 24 hours to
            schedule an introductory call.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full rounded-full border border-border bg-ink px-5 py-3 text-sm text-ice outline-none placeholder:text-muted focus:border-primary"
            />
            <button type="submit" className="btn-primary justify-center whitespace-nowrap">
              Send <Send size={16} />
            </button>
          </form>
          {sent && (
            <p className="mt-3 text-xs text-primary">
              Thank you! Your message has been received. I will reply shortly.
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-muted">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-primary" /> 4.9/5 Client Rating
            </span>
            <span className="flex items-center gap-2">
              <Award size={14} className="text-primary" /> 10+ Projects &amp; Designs
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary" /> Transparent Contracts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
