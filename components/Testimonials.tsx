"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Internal Team",
    role: "PT. Delta Indonesia Group",
    text: "Kevin successfully optimized our website's look and feel while delivering promotional content with exceptional quality and efficiency.",
  },
  {
    name: "Project Manager",
    role: "Pustekinfo Setjen DPR RI",
    text: "His proficiency in designing interactive prototypes and detailing UAT scenarios proved invaluable for evaluating our internal applications.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface2 p-8 sm:p-14">
        <div className="relative">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <span className="eyebrow">Client Testimonials</span>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold sm:text-4xl">
            Work That <span className="text-primary">Speaks Volumes</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card relative p-7"
            >
              <Quote className="text-primary/40" size={28} />
              <p className="mt-4 text-sm leading-relaxed text-ice">{t.text}</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
