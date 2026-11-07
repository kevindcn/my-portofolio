"use client";

import { motion } from "framer-motion";
import { Code2, LayoutTemplate, Rocket } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="section-pad py-20 md:py-24 relative overflow-hidden bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-[#ff6b00]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-40 w-[450px] h-[450px] bg-[#ff6b00]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl z-10 relative">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-10 md:mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
              WHAT I DO
            </span>
            <h2 className="mt-2.5 font-heebo text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Core <span className="text-[#ff6b00]">Services</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-zinc-400 md:text-right">
            My focus is crafting digital products that are not only visually compelling,
            but also robust, performant, and future-proof.
          </p>
        </div>

        {/* Proportional Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* 1. Left Large Card: UI & UX Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 group relative rounded-[26px] border border-[#ff6b00]/50 bg-[#0c0c11] shadow-[0_0_35px_rgba(255,107,0,0.12)] hover:shadow-[0_0_55px_rgba(255,107,0,0.2)] transition-all duration-500 overflow-hidden p-6 sm:p-7 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] lg:min-h-[330px]"
          >
            {/* Top Icon Badge: Dark Squircle with </> */}
            <div className="relative z-10">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#23150d] border border-[#ff6b00]/30 text-[#ff6b00] shadow-inner">
                <Code2 size={20} strokeWidth={2.4} />
              </div>
            </div>

            {/* Middle Content + Wireframe Mockup */}
            <div className="relative z-10 my-2 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-1">
              {/* Text Left */}
              <div className="max-w-[250px] sm:max-w-[270px] space-y-2 z-10 shrink-0">
                <h3 className="font-heebo text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  UI &amp; UX Design
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                  Translating ideas and user needs into visually engaging, intuitive, and
                  industry-standard user interface designs.
                </p>
              </div>

              {/* Wireframe Perspective Graphic Right */}
              <div className="relative flex-1 flex items-center justify-center md:justify-end overflow-visible md:-mr-4 lg:-mr-3">
                {/* Vertical Orange Ambient Glow behind left curve of wireframe */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 w-32 h-36 bg-[#ff6b00]/25 rounded-full blur-[40px] pointer-events-none" />

                {/* Precision Oblique Wireframe SVG */}
                <svg
                  viewBox="0 0 440 310"
                  className="w-full max-w-[320px] sm:max-w-[360px] h-auto drop-shadow-2xl overflow-visible select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
                  fill="none"
                >
                  <defs>
                    {/* Glow filter for highlighted middle card */}
                    <filter id="middleCardGlow" x="-25%" y="-25%" width="150%" height="150%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Gradient for wireframe left glowing border */}
                    <linearGradient id="windowEdgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.85" />
                      <stop offset="35%" stopColor="#ff6b00" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
                    </linearGradient>
                  </defs>

                  {/* Sheared 2.5D Oblique Group */}
                  <g transform="matrix(1, -0.16, 0, 1, 0, 60)">
                    {/* 1. Main Window Container */}
                    <rect
                      x="16"
                      y="18"
                      width="384"
                      height="246"
                      rx="16"
                      fill="#121218"
                      fillOpacity="0.85"
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="1.2"
                    />

                    {/* Left and Top-Left Glowing Rim Accent */}
                    <path
                      d="M 120 18 L 32 18 A 16 16 0 0 0 16 34 L 16 248 A 16 16 0 0 0 32 264 L 70 264"
                      stroke="url(#windowEdgeGlow)"
                      strokeWidth="1.6"
                      fill="none"
                    />

                    {/* Window Top Bar: Address Search Pill & 3 Menu Dashes */}
                    <rect
                      x="34"
                      y="34"
                      width="82"
                      height="16"
                      rx="5"
                      fill="rgba(255, 255, 255, 0.03)"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1"
                    />
                    <line x1="250" y1="42" x2="278" y2="42" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="2" strokeLinecap="round" />
                    <line x1="290" y1="42" x2="318" y2="42" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="2" strokeLinecap="round" />
                    <line x1="330" y1="42" x2="368" y2="42" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="2" strokeLinecap="round" />

                    {/* 2. Hero Box (with full X cross) */}
                    <rect
                      x="34"
                      y="64"
                      width="348"
                      height="92"
                      rx="8"
                      fill="rgba(255, 255, 255, 0.02)"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1.2"
                    />
                    <line x1="34" y1="64" x2="382" y2="156" stroke="rgba(255, 255, 255, 0.13)" strokeWidth="1.2" />
                    <line x1="382" y1="64" x2="34" y2="156" stroke="rgba(255, 255, 255, 0.13)" strokeWidth="1.2" />

                    {/* 3. Bottom Grid: 3 Columns */}
                    {/* Column 1: Left Card + Skeleton Lines */}
                    <g>
                      <rect
                        x="34"
                        y="170"
                        width="104"
                        height="52"
                        rx="6"
                        fill="rgba(255, 255, 255, 0.02)"
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="1.2"
                      />
                      <line x1="34" y1="170" x2="138" y2="222" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                      <line x1="138" y1="170" x2="34" y2="222" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                      
                      {/* 3 skeleton lines */}
                      <line x1="34" y1="233" x2="118" y2="233" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="34" y1="240" x2="94" y2="240" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="34" y1="247" x2="68" y2="247" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="2" strokeLinecap="round" />
                    </g>

                    {/* Column 2: Middle Card (HIGHLIGHTED ORANGE WITH GLOW + SKELETON LINES) */}
                    <g>
                      <rect
                        x="152"
                        y="164"
                        width="112"
                        height="58"
                        rx="8"
                        fill="#ff6b00"
                        fillOpacity="0.08"
                        stroke="#ff6b00"
                        strokeWidth="2"
                        filter="url(#middleCardGlow)"
                      />
                      <line x1="152" y1="164" x2="264" y2="222" stroke="#ff6b00" strokeOpacity="0.65" strokeWidth="1.5" />
                      <line x1="264" y1="164" x2="152" y2="222" stroke="#ff6b00" strokeOpacity="0.65" strokeWidth="1.5" />
                      
                      {/* 3 skeleton lines */}
                      <line x1="152" y1="233" x2="246" y2="233" stroke="rgba(255, 255, 255, 0.24)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="152" y1="240" x2="218" y2="240" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="152" y1="247" x2="188" y2="247" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" strokeLinecap="round" />
                    </g>

                    {/* Column 3: Right Card + Skeleton Lines */}
                    <g>
                      <rect
                        x="278"
                        y="170"
                        width="104"
                        height="52"
                        rx="6"
                        fill="rgba(255, 255, 255, 0.02)"
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="1.2"
                      />
                      <line x1="278" y1="170" x2="382" y2="222" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                      <line x1="382" y1="170" x2="278" y2="222" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                      
                      {/* 3 skeleton lines */}
                      <line x1="278" y1="233" x2="362" y2="233" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="278" y1="240" x2="338" y2="240" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="278" y1="247" x2="308" y2="247" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* 2. Right Column (Two Proportional Stacked Cards) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
            
            {/* Top Stacked Card: Prototyping & Testing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="group relative rounded-[22px] sm:rounded-[24px] border border-white/10 hover:border-white/20 bg-[#0c0c11] p-5 sm:p-6 flex flex-col justify-center flex-1 overflow-hidden transition-all duration-300 shadow-xl min-h-[145px]"
            >
              {/* Curved Spline Graph with Glowing Orange Nodes in Top Right */}
              <div className="absolute top-3.5 right-4 sm:right-6 w-36 h-12 pointer-events-none select-none">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 160 50">
                  {/* Spline Path */}
                  <path
                    d="M 10 32 Q 40 32 55 42 T 95 38 T 130 18 L 155 18"
                    fill="none"
                    stroke="#ff6b00"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                  />
                  {/* Subtle dots */}
                  <circle cx="20" cy="32" r="2.5" fill="#ff6b00" opacity="0.4" />
                  <circle cx="55" cy="42" r="3" fill="#ff6b00" opacity="0.6" />
                  <circle cx="75" cy="45.7" r="2.5" fill="#ff6b00" opacity="0.5" />
                  <circle cx="95" cy="38" r="3.5" fill="#ff6b00" opacity="0.8" />
                  <circle cx="115" cy="26.5" r="3.5" fill="#ff6b00" opacity="0.9" />
                  
                  {/* Glowing Peak Node */}
                  <circle
                    cx="135"
                    cy="18"
                    r="5"
                    fill="#ff6b00"
                    className="filter drop-shadow-[0_0_8px_#ff6b00]"
                  />
                  <circle
                    cx="135"
                    cy="18"
                    r="9"
                    fill="none"
                    stroke="#ff6b00"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Icon & Content */}
              <div className="relative z-10">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#23150d] border border-[#ff6b00]/30 text-[#ff6b00] shadow-inner mb-3">
                  <LayoutTemplate size={20} strokeWidth={2.2} />
                </div>
                <h3 className="font-heebo text-lg font-bold text-white tracking-tight">
                  Prototyping &amp; Testing
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-400 max-w-sm">
                  Building interactive prototypes to validate design concepts and conduct
                  user acceptance testing (UAT).
                </p>
              </div>
            </motion.div>

            {/* Bottom Stacked Card: Frontend & AI Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="group relative rounded-[22px] sm:rounded-[24px] border border-white/10 hover:border-white/20 bg-[#0c0c11] p-5 sm:p-6 flex flex-col justify-center flex-1 overflow-hidden transition-all duration-300 shadow-xl min-h-[145px]"
            >
              {/* Faint Glowing Matrix / Binary Rain Graphic on Right */}
              <div
                className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none select-none flex items-center justify-end pr-4 overflow-hidden opacity-25 group-hover:opacity-45 transition-opacity duration-500"
                style={{
                  maskImage: "radial-gradient(ellipse at right center, black 30%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse at right center, black 30%, transparent 80%)",
                }}
              >
                <div className="font-mono text-[9px] leading-3.5 text-[#ff6b00] tracking-widest text-right select-none whitespace-pre font-semibold">
                  {`1 0 1 0 0 1 0 1\n0 1 1 0 1 0 1 0\n1 0 0 1 0 1 1 0\n0 1 0 1 1 0 1 0\n1 1 0 0 1 0 0 1\n0 0 1 0 1 1 0 1`}
                </div>
              </div>

              {/* Icon & Content */}
              <div className="relative z-10">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#23150d] border border-[#ff6b00]/30 text-[#ff6b00] shadow-inner mb-3">
                  <Rocket size={20} strokeWidth={2.2} />
                </div>
                <h3 className="font-heebo text-lg font-bold text-white tracking-tight">
                  Frontend &amp; AI Integration
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-400 max-w-sm">
                  Bringing designs to life with clean code (HTML/CSS) and leveraging
                  Gen AI technologies to streamline the creative workflow.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
