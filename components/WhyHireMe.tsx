"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Intuitive and engaging interactive designs compliant with modern UX standards",
  "Fast adaptability with bleeding-edge workflows like Generative AI",
  "Strong problem-solving mindset spanning from user research to testing",
  "Practical coding foundation (HTML/CSS/JS) ensuring seamless developer handoff",
];

export default function WhyHireMe() {
  return (
    <section className="section-pad py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 rounded-3xl border border-border bg-surface/60 p-8 sm:p-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/25 to-primary/5 shadow-glow sm:h-72 sm:w-72"
        >
          <div className="font-display text-6xl font-bold text-primary">{"</>"}</div>
          <span className="absolute -top-4 -left-4 rounded-xl border border-border bg-surface px-3 py-2 font-mono text-xs text-ice shadow-glow-cyan">
            99.9% uptime
          </span>
          <span className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-surface px-3 py-2 font-mono text-xs text-primary shadow-glow">
            &lt; 1s load time
          </span>
        </motion.div>

        <div>
          <span className="eyebrow">Why Choose Me</span>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Reasons to <span className="text-primary">Collaborate</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            I combine deep user research, UI craft, and rapid prototyping to ensure
            every digital product truly solves real problems with analytical precision.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-ice">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-10">
            <div>
              <p className="font-display text-3xl font-semibold text-ice">10+</p>
              <p className="text-xs text-muted">Projects &amp; Designs</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-ice">4+</p>
              <p className="text-xs text-muted">Work &amp; Intern Roles</p>
            </div>
          </div>

          <a href="#contact" className="btn-primary mt-8">
            Work With Me
          </a>
        </div>
      </div>
    </section>
  );
}
