"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const capabilities = [
  {
    title: "User-Centered Thinking",
    desc: "Designing interfaces based on real user needs.",
  },
  {
    title: "Thoughtful UI Craft",
    desc: "Creating clean, intuitive, and consistent designs.",
  },
  {
    title: "Design to Development",
    desc: "Bridging design and development for better results.",
  },
  {
    title: "Continuous Exploration",
    desc: "Always learning and exploring new ideas.",
  },
];

export default function WhyHireMe() {
  return (
    <section
      id="why-choose-me"
      className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#070709] py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.04]"
    >
      {/* 
        Centered Block with exact proportions matching the reference:
        Total width ~1020px-1080px centered in viewport.
        Left Column: ~58% (col-span-7) for large prominent typography.
        Right Column: ~42% (col-span-5) for capabilities, divider, stats & button.
      */}
      <div className="relative mx-auto w-full max-w-[1020px] xl:max-w-[1080px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center z-10">

        {/* ======================================================== */}
        {/* LEFT COLUMN: Eyebrow, Giant Heading, and Description      */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-400 select-none mb-3 sm:mb-4 font-medium">
            WHY CHOOSE ME
          </span>

          {/* Large Headline matching reference */}
          <h2 className="font-heebo font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] leading-[1.05] tracking-tight text-white select-none">
            <div>What I Bring</div>
            <div>to Every Project.</div>
          </h2>

          {/* Description Paragraph */}
          <p className="mt-5 sm:mt-6 max-w-[440px] font-heebo text-sm sm:text-base leading-relaxed text-zinc-400">
            I combine design thinking, technical skills, and a passion for creating
            meaningful digital experiences.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: 4 Capabilities, Divider, Stats & Button     */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="lg:col-span-5 flex flex-col justify-center w-full"
        >
          {/* 4 Capabilities List */}
          <div className="space-y-4 sm:space-y-5">
            {capabilities.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 sm:gap-4 group">
                {/* Circular Check Icon matching reference */}
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full border border-zinc-500/80 text-white mt-0.5 transition-colors group-hover:border-[#ff6b00] group-hover:text-[#ff6b00]">
                  <Check size={13} strokeWidth={2.4} />
                </div>
                {/* Title and Description */}
                <div>
                  <h3 className="font-heebo text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 font-heebo text-xs text-zinc-400 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Divider Line */}
          <div className="my-6 sm:my-7 h-px w-full bg-zinc-800" />

          {/* Stats Row */}
          <div className="flex items-center gap-8 sm:gap-12">
            <div>
              <p className="font-heebo font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                5+
              </p>
              <p className="mt-0.5 font-heebo text-xs text-zinc-400">
                Projects &amp; Designs
              </p>
            </div>

            {/* Vertical Divider between stats */}
            <div className="h-9 sm:h-10 w-px bg-zinc-800" />

            <div>
              <p className="font-heebo font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                4+
              </p>
              <p className="mt-0.5 font-heebo text-xs text-zinc-400">
                Work &amp; Intern Roles
              </p>
            </div>
          </div>

          {/* Action CTA Button matching reference */}
          <div className="mt-6 sm:mt-7">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6b00] px-6 py-3 sm:px-7 sm:py-3.5 font-heebo text-xs sm:text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,107,0,0.5)] transition-all duration-300 hover:bg-[#ea580c] hover:shadow-[0_0_32px_rgba(255,107,0,0.7)] hover:gap-3 active:scale-95"
            >
              <span>Work With Me</span>
              <span className="text-sm sm:text-base">→</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
