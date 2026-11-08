"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

export default function CTA() {
  const [isEmailCooldown, setIsEmailCooldown] = useState(false);

  // Mencegah trigger ganda / duplicate event ketika tombol diklik
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isEmailCooldown) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setIsEmailCooldown(true);
    setTimeout(() => {
      setIsEmailCooldown(false);
    }, 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#070709] pt-24 sm:pt-32 pb-8 px-6 sm:px-10 border-t border-white/[0.04]"
    >
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.12)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />

      {/* Main Centered Content */}
      <div className="relative z-10 my-auto mx-auto w-full max-w-3xl flex flex-col items-center text-center">
        {/* Badge: "Let's Connect" with glowing dot & subtle horizontal accent line */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center mb-6 sm:mb-8"
        >
          {/* Subtle horizontal line behind pill */}
          <div className="absolute w-72 sm:w-96 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          {/* Pill Badge */}
          <div className="relative z-10 inline-flex items-center gap-2.5 rounded-full border border-zinc-800/90 bg-[#121215] px-4 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b00] shadow-[0_0_10px_#ff6b00]" />
            <span className="font-heebo text-xs sm:text-sm font-medium text-zinc-200 tracking-wide">
              Let&apos;s Connect
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heebo font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.12] tracking-tight text-white select-none"
        >
          <div>Have a Project in Mind?</div>
          <div>
            Let&apos;s <span className="text-[#ff6b00]">Discuss</span>
          </div>
        </motion.h2>

        {/* Subtitle / Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heebo mt-5 sm:mt-6 max-w-md text-base sm:text-lg text-zinc-400 leading-relaxed mx-auto"
        >
          I&apos;m always open for new opportunities, collaborations, or just a friendly chat.
        </motion.p>

        {/* Two Centered Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* Button 1: Connect on LinkedIn */}
          <a
            href="https://www.linkedin.com/in/kevin-daniel-christio/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-[#121215] px-6 sm:px-7 py-3.5 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:bg-[#1c1c22] hover:border-zinc-700 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* LinkedIn Rounded Square Icon */}
            <svg
              className="w-[18px] h-[18px] fill-current text-white shrink-0 pointer-events-none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.55a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
            </svg>
            <span className="pointer-events-none">Connect on LinkedIn</span>
            <ExternalLink
              size={16}
              className="text-zinc-400 group-hover:text-white transition-colors shrink-0 pointer-events-none"
            />
          </a>

          {/* Button 2: Send me an Email (Dengan Display Name agar Outlook tidak mengulang nama alamat email) */}
          <a
            href="mailto:Kevin%20Daniel%20Christio%20%3Ckevindanielnainggolan@gmail.com%3E"
            onClick={handleEmailClick}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ff6b00] px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_0_25px_rgba(255,107,0,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.65)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail size={18} className="text-white shrink-0 pointer-events-none" />
            <span className="pointer-events-none">Send me an Email</span>
            <ExternalLink
              size={16}
              className="text-white/80 group-hover:text-white transition-colors shrink-0 pointer-events-none"
            />
          </a>
        </motion.div>
      </div>

      {/* Long Horizontal Divider Line & Name at Bottom-Left (Replacing Footer) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20 sm:mt-24 pt-6 pb-2">
        <div className="w-full border-t border-zinc-800/80 pt-6 flex items-center justify-between">
          <p className="font-heebo font-bold text-sm sm:text-base text-zinc-400 tracking-tight select-none">
            Kevin Daniel Christio.
          </p>
        </div>
      </div>
    </section>
  );
}
