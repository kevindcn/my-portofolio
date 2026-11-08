"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, Code2, Pencil } from "lucide-react";
import Image from "next/image";
import { useDotBackground } from "@/hooks/useDotBackground";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  useDotBackground(heroRef, { mode: "float" });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative overflow-hidden bg-ink pb-20 pt-36 sm:pt-40 lg:pt-44 section-pad"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-[#ff6b00]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative mx-auto grid max-w-6xl xl:max-w-7xl items-center gap-12 lg:gap-14 xl:gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Column: Heading, Sparks, Toggle Button 'o', Text-i, and Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col"
        >
          {/* Main Title matching reference */}
          <h1 className="font-heebo font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[94px] xl:text-[102px] tracking-tight leading-[1.04] select-none">
            {/* Line 1: Creative with 3 orange spark accents floating above-right of 'e' */}
            <div className="flex items-center text-white">
              <span>Creativ</span>
              <span className="relative inline-block">
                e
                {/* Orange Tanda Kutip Component (PNG) */}
                <span className="absolute top-[0.04em] left-[76%] w-[0.38em] pointer-events-none select-none">
                  <Image
                    src="/projects/tanda-kutip.png"
                    alt="Tanda Kutip"
                    width={52}
                    height={56}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </span>
              </span>
            </div>

            {/* Line 2: Product with togglebutton as 'o' */}
            <div className="flex items-center text-[#ff6b00]">
              <span>Pr</span>
              <span className="inline-flex items-center mx-[0.04em] self-center">
                <Image
                  src="/projects/togglebutton.png"
                  alt="o"
                  width={155}
                  height={74}
                  className="h-[0.74em] w-auto object-contain inline-block align-middle drop-shadow-[0_4px_16px_rgba(255,107,0,0.35)] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  priority
                />
              </span>
              <span>duct</span>
            </div>

            {/* Line 3: Designer with text-i as 'i' */}
            <div id="hero-designer-heading" className="flex items-center text-white">
              <span>Des</span>
              <span className="inline-flex items-center ml-[0.055em] mr-[0.045em] translate-y-[0.02em] self-center">
                <Image
                  src="/projects/text-i.png"
                  alt="i"
                  width={24}
                  height={93}
                  className="h-[0.73em] w-auto object-contain inline-block cursor-pointer hover:scale-105 transition-transform"
                  priority
                />
              </span>
              <span>gner</span>
            </div>
          </h1>

          {/* Bio paragraph description */}
          <p className="mt-8 max-w-xl font-heebo text-base sm:text-lg leading-relaxed text-zinc-400">
            UI/UX practitioner with a deep passion for UI Design, UX Design, and Prototyping &amp; Testing, supported by practical HTML, CSS, and JavaScript skills.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6b00] px-8 py-3.5 sm:py-4 font-heebo text-sm sm:text-base font-semibold text-white shadow-[0_0_30px_rgba(255,107,0,0.4)] transition-all duration-300 hover:bg-[#ea580c] hover:shadow-[0_0_40px_rgba(255,107,0,0.6)] active:scale-95"
            >
              View Portfolio <ArrowUpRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-8 py-3.5 sm:py-4 font-heebo text-sm sm:text-base font-medium text-white transition-all duration-300 hover:border-[#ff6b00]/60 hover:text-[#ff6b00]"
            >
              Let&apos;s Collaborate
            </a>
          </div>
        </motion.div>

        {/* Right Column: Decorative Dot Matrix, Badges, Figma Icon, & Profile in Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-end pt-10 sm:pt-14"
        >
          {/* Decorative Dot Matrix in top-right */}
          <div className="absolute top-2 right-2 sm:right-8 grid grid-cols-8 gap-2.5 sm:gap-3 opacity-25 pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-white" />
            ))}
          </div>

          {/* Orange ambient glow behind shape */}
          <div className="absolute w-[85%] h-[85%] rounded-full bg-[#ff6b00]/20 blur-[100px] pointer-events-none -z-10" />

          {/* Frame Container with Photo & Badges (Static - no floating animation) */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[450px] aspect-[515/582]">
            {/* Orange Frame as Backdrop */}
            <div className="relative w-full h-full z-0">
              <Image
                src="/projects/kommponen-orange.png"
                alt="Orange Creative Frame"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 450px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(255,107,0,0.3)]"
              />
            </div>

            {/* Profile Photo - Proportional size with subtle 3D pop-out */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[86%] sm:w-[88%] h-[110%] z-10 pointer-events-none">
              <Image
                src="/profile-tight.png"
                alt="Kevin Daniel Photo"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 500px"
                className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
              />
            </div>

            {/* 3D White Arrow Pointer */}
            <div className="absolute top-[14%] right-8 sm:right-12 z-20 rotate-[-15deg] filter drop-shadow-[0_4px_8px_rgba(255,255,255,0.4)] pointer-events-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z" />
              </svg>
            </div>

            {/* Floating Badge 1: Frontend Developer (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -left-4 sm:-left-12 top-[42%] -translate-y-1/2 z-20"
            >
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#18181c]/90 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#ea580c] to-[#ff7a1a] text-white shadow-[0_2px_8px_rgba(234,88,12,0.5)]">
                  <Monitor size={14} strokeWidth={2.2} />
                </div>
                <span className="font-heebo text-xs sm:text-sm font-medium text-white whitespace-nowrap">
                  Frontend Developer
                </span>
              </div>
            </motion.div>

            {/* Floating Badge 2: UI/UX Designer (Top Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -right-4 sm:-right-12 top-[24%] z-20"
            >
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#18181c]/90 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#ea580c] to-[#ff7a1a] text-white shadow-[0_2px_8px_rgba(234,88,12,0.5)]">
                  <Code2 size={14} strokeWidth={2.4} />
                </div>
                <span className="font-heebo text-xs sm:text-sm font-medium text-white whitespace-nowrap">
                  UI/UX Designer
                </span>
              </div>
            </motion.div>

            {/* Floating Badge 3: Product Designer (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -right-3 sm:-right-10 top-[60%] z-20"
            >
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#18181c]/90 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#ea580c] to-[#ff7a1a] text-white shadow-[0_2px_8px_rgba(234,88,12,0.5)]">
                  <Pencil size={13} strokeWidth={2.4} />
                </div>
                <span className="font-heebo text-xs sm:text-sm font-medium text-white whitespace-nowrap">
                  Product Designer
                </span>
              </div>
            </motion.div>

            {/* Bottom Right: Figma 3D Card & Orange Asterisk */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-0 right-1 sm:right-3 z-20 flex items-center"
            >
              {/* Orange Asterisk Star */}
              <div className="absolute -top-5 -right-4 z-0 animate-pulseSlow pointer-events-none">
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 2V34M2 18H34M6.7 6.7L29.3 29.3M6.7 29.3L29.3 6.7"
                    stroke="#ff6b00"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* White 3D Figma Card */}
              <div className="relative z-10 rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_16px_36px_rgba(0,0,0,0.55)] border border-white/20 -rotate-6 hover:rotate-0 transition-transform">
                <svg
                  width="28"
                  height="42"
                  viewBox="0 0 38 57"
                  fill="none"
                  className="w-7 h-10 sm:w-8 sm:h-11"
                >
                  <path
                    d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
                    fill="#1ABCFE"
                  />
                  <path
                    d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
                    fill="#0ACF83"
                  />
                  <path
                    d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
                    fill="#FF7262"
                  />
                  <path
                    d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
                    fill="#F24E1E"
                  />
                  <path
                    d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
                    fill="#A259FF"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
