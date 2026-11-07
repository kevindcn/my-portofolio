"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    company: "PT. Delta Indonesia Group",
    period: "Jul 2025 — Present",
    role: "IT Support — Contract",
    desc: "Redesigned, optimized, and developed multiple websites. Created AI-driven marketing content and provided comprehensive IT troubleshooting.",
  },
  {
    company: "Pustekinfo Setjen DPR RI",
    period: "Sep 2024 — Jan 2025",
    role: "UI & UX Designer — Internship",
    desc: "Redesigned the STELA platform and conducted User Acceptance Testing (UAT) on interactive prototypes and internal applications.",
  },
  {
    company: "PT. Pertamina Geothermal Energy",
    period: "Feb 2024 — Jul 2024",
    role: "IT Solution — Internship",
    desc: "Developed design standardizations and reusable CSS template libraries to facilitate cross-feature adoption and developer collaboration.",
  },
  {
    company: "PT. Nose Herbalindo",
    period: "Jul 2023 — Sep 2023",
    role: "Marketing — Internship",
    desc: "Managed brand social media marketing and exhibition media content.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-pad py-24">
      <div className="mx-auto max-w-4xl text-center">
        <span className="eyebrow">Career Journey</span>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Work <span className="text-primary">Experience</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent sm:left-1/2" />

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className={`relative flex flex-col gap-2 pl-8 sm:w-1/2 sm:pl-0 sm:pr-10 ${
                i % 2 === 0
                  ? "sm:mr-auto sm:text-right"
                  : "sm:ml-auto sm:pl-10 sm:pr-0 sm:text-left"
              }`}
            >
              <span
                className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-ink sm:top-1.5 ${
                  i % 2 === 0 ? "sm:-right-2 sm:left-auto" : "sm:-left-2"
                }`}
              />
              <p className="font-mono text-xs text-cyan">{item.period}</p>
              <h3 className="font-display text-lg font-semibold text-ice">
                {item.role}
              </h3>
              <p className="text-sm font-medium text-primary">{item.company}</p>
              <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
