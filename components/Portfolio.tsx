"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, Project } from "@/lib/data";

interface FeaturedCardProps {
  project: Project;
  layout: "hero" | "grid";
  caseNumber: string;
  insight?: {
    title: string;
    stat1: string;
    desc1: string;
    stat2?: string;
    desc2?: string;
  };
}

function FeaturedCard({ project, layout, caseNumber, insight }: FeaturedCardProps) {
  const liveLink =
    project.liveUrl ||
    (project.linkHref.startsWith("http") ? project.linkHref : null);

  const isHero = layout === "hero";
  const images =
    project.carouselImages && project.carouselImages.length > 1
      ? project.carouselImages
      : [project.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl border border-white/10 bg-[#0d0d12] overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#ff6b00]/60 hover:shadow-[0_20px_60px_rgba(255,107,0,0.18)] flex flex-col justify-between"
    >
      {/* 1. Top Ribbon Ticker / Marquee Bar */}
      <div className="relative w-full overflow-hidden border-b border-white/10 bg-black/70 py-2.5 backdrop-blur-md select-none flex">
        <div className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap animate-marquee">
          {Array.from({ length: isHero ? 8 : 5 }).map((_, i) => (
            <span
              key={`t1-${i}`}
              className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400"
            >
              <span className="text-[#ff6b00] font-bold">✦</span>
              <span>{project.readTime}</span>
              <span className="text-zinc-600">•</span>
              <span>{project.category} Case Study</span>
              <span className="text-zinc-600">•</span>
              <span>{project.year}</span>
            </span>
          ))}
        </div>

        <div
          className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap animate-marquee"
          aria-hidden="true"
        >
          {Array.from({ length: isHero ? 8 : 5 }).map((_, i) => (
            <span
              key={`t2-${i}`}
              className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400"
            >
              <span className="text-[#ff6b00] font-bold">✦</span>
              <span>{project.readTime}</span>
              <span className="text-zinc-600">•</span>
              <span>{project.category} Case Study</span>
              <span className="text-zinc-600">•</span>
              <span>{project.year}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Main Visual Mockup Stage */}
      <div
        className={`relative w-full overflow-hidden bg-[#111118] ${
          isHero
            ? "h-[320px] sm:h-[440px] md:h-[500px] lg:h-[540px]"
            : "h-[260px] sm:h-[340px] md:h-[380px]"
        }`}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="relative block w-full h-full cursor-pointer"
          aria-label={`View Case Study: ${project.title}`}
        >
          {/* Ambient lighting inside stage */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6b00]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Mockup Image Container */}
          <div
            className={`relative w-full h-full flex items-center justify-center ${
              isHero ? "p-4 sm:p-8 md:p-12" : "p-4 sm:p-6 md:p-8"
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={images[currentIndex]}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${project.title} - Showcase ${currentIndex + 1}`}
                    fill
                    priority={isHero && currentIndex === 0}
                    sizes={
                      isHero
                        ? "(max-width: 768px) 100vw, 1200px"
                        : "(max-width: 768px) 100vw, 600px"
                    }
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Carousel Indicators & Controls (if multiple images) */}
              {images.length > 1 && (
                <>
                  {/* Top Right Mini Pill: Slide dots & indicator */}
                  <div
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-xl select-none"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 font-medium">
                      {currentIndex + 1} / {images.length}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentIndex(idx);
                          }}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`transition-all duration-300 rounded-full h-1.5 ${
                            currentIndex === idx
                              ? "w-5 bg-[#ff6b00] shadow-[0_0_10px_rgba(255,107,0,0.8)]"
                              : "w-1.5 bg-white/40 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Left & Right Arrow Navigation (Hover visible) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      );
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </Link>

        {/* Insight / Impact Badge (Bottom Left of Visual Mockup) */}
        {insight && (
          <div className="absolute bottom-4 left-4 z-20 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 p-3 sm:p-4 max-w-[220px] hidden sm:block shadow-2xl pointer-events-none">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#ff6b00] font-bold block mb-1">
              {insight.title}
            </span>
            <p className="text-xs font-semibold text-white leading-tight">
              {insight.stat1}
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5 leading-snug">
              {insight.desc1}
            </p>
            {insight.stat2 && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <p className="text-xs font-semibold text-white leading-tight">
                  {insight.stat2}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-snug">
                  {insight.desc2}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Floating Action Pills (Bottom Right of Mockup Stage) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2.5">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-black/80 hover:bg-black text-white text-xs sm:text-sm font-medium px-4 py-2 border border-white/20 hover:border-white/40 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 group/live"
            >
              <span>Live {project.category === "Frontend" || project.category === "Fullstack" ? "Demo" : "Prototype"}</span>
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
              />
            </a>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="rounded-full bg-white/90 hover:bg-white text-black text-xs sm:text-sm font-semibold px-4 py-2 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Case Study</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* 3. Bottom Information & Details Section */}
      <div
        className={`border-t border-white/10 bg-[#0d0d12] flex flex-col justify-between flex-grow ${
          isHero ? "p-6 sm:p-8 md:p-10" : "p-6 sm:p-7 md:p-8"
        }`}
      >
        <div>
          {/* Eyebrow / Case Number & Client */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff6b00] font-bold shrink-0">
                CASE STUDY {caseNumber}
              </span>
              <span className="text-zinc-600 shrink-0">•</span>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 truncate">
                {project.client}
              </span>
            </div>

            <span className="rounded-full border border-border bg-surface2/60 px-3 py-0.5 font-mono text-[11px] text-zinc-400 shrink-0">
              {project.role}
            </span>
          </div>

          {/* Headline matching reference style: [Title] — [Hook/Subtitle] */}
          <Link href={`/projects/${project.slug}`} className="block group/title">
            <h3
              className={`font-heebo font-extrabold text-white group-hover/title:text-[#ff6b00] transition-colors leading-snug ${
                isHero
                  ? "text-2xl sm:text-3xl md:text-4xl"
                  : "text-xl sm:text-2xl"
              }`}
            >
              <span>{project.title}</span>
              <span className="font-normal text-zinc-400 text-base sm:text-xl md:text-2xl font-sans block sm:inline mt-1 sm:mt-0">
                {" "}— {project.hook}
              </span>
            </h3>
          </Link>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-4xl">
            {project.desc}
          </p>
        </div>

        {/* Bottom Meta & Action Button matching reference */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Bullet Tags list matching reference layout */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-zinc-300">
            {project.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5">
                <span className="text-[#ff6b00] font-bold">•</span>
                <span className="uppercase tracking-wider">{tag}</span>
              </span>
            ))}
          </div>

          {/* Direct CTA to Case Study matching reference pill */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#ff6b00] text-black hover:text-white px-6 py-2.5 font-heebo text-xs sm:text-sm font-bold shadow-lg hover:shadow-[0_0_25px_rgba(255,107,0,0.45)] transition-all duration-300 shrink-0 group/btn self-start sm:self-auto"
          >
            <span>View Case Study</span>
            <ArrowRight
              size={15}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const total = projects.length;

  // 1. First featured: CUI Unity Parallax & Docs (swapped per user request)
  const featuredHero =
    projects.find((p) => p.slug === "cui-unity-parallax-docs") || projects[0];

  // 2. Second featured: STELA Redesign (per user request)
  const featuredStela =
    projects.find((p) => p.slug === "stela-pustekinfo-redesign") || projects[1];

  // 3. Third featured: CUI Unity Design System (swapped per user request)
  const featuredThird =
    projects.find((p) => p.slug === "cui-unity-design-system") || projects[2];

  return (
    <section
      id="portfolio"
      className="section-pad py-24 md:py-28 relative overflow-hidden bg-background"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#ff6b00]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#ff6b00]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl z-10 relative">
        {/* Header Section: Title, Rotating Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#ff6b00] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff6b00] font-semibold">
                Selected Case Studies • 3 Featured
              </span>
            </div>

            <h2 className="font-heebo font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-[0.95] select-none">
              Featured Work
            </h2>
          </div>

          {/* Right Header: Rotating Circular Badge linking to All Projects */}
          <div className="self-end md:self-auto">
            <Link
              href="/projects"
              className="relative flex items-center justify-center shrink-0 group cursor-pointer"
              title="Explore All Projects"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full animate-[spin_20s_linear_infinite] group-hover:animate-[spin_7s_linear_infinite] transition-all"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8.5px] uppercase tracking-[0.22em] fill-zinc-400 font-mono font-medium">
                    <textPath href="#circlePath">
                      • FEATURED WORK • EXPLORE ALL • ARCHIVE •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 m-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface2/80 border border-border flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Layout Grid: 1 Full-Width Top Card + 2 Equal Columns Below */}
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Card 1: CUI Unity Parallax & Docs (Full Width) */}
          <FeaturedCard
            project={featuredHero}
            layout="hero"
            caseNumber="01"
          />

          {/* Row 2: 2-Column Grid for Card 2 (STELA) & Card 3 (CUI Unity Design System) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <FeaturedCard
              project={featuredStela}
              layout="grid"
              caseNumber="02"
              insight={{
                title: "INSIGHTS",
                stat1: "40K+ Active Users",
                desc1: "DPR RI Secretariat Staff Accessibility",
                stat2: "98% Usability Score",
                desc2: "High-Fidelity Interactive Prototype",
              }}
            />

            <FeaturedCard
              project={featuredThird}
              layout="grid"
              caseNumber="03"
              insight={{
                title: "DESIGN SYSTEM",
                stat1: "150+ Master Components",
                desc1: "Tokens, Figma variants & atomic architecture",
                stat2: "Multi-Platform",
                desc2: "Web & mobile unified guidelines",
              }}
            />
          </div>
        </div>

        {/* Bottom Section: Explore All Archive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 md:mt-24 rounded-3xl border border-white/10 bg-gradient-to-r from-surface/60 via-surface2/40 to-surface/60 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#ff6b00]/10 rounded-full blur-[80px] pointer-events-none" />

          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff6b00] font-semibold">
            Complete Portfolio
          </span>
          <h3 className="mt-3 font-heebo text-2xl sm:text-4xl font-extrabold text-white">
            Looking for more digital work?
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
            Explore the comprehensive archive including brand identities,
            fullstack web applications, and frontend engineering projects.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#ff6b00] px-8 py-4 font-heebo text-base font-semibold text-white shadow-[0_0_30px_rgba(255,107,0,0.35)] transition-all duration-300 hover:bg-[#ea580c] hover:shadow-[0_0_45px_rgba(255,107,0,0.55)] hover:scale-105 active:scale-95"
            >
              <span>Explore All Archive ({total}+ Projects)</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
