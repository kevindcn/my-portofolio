"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 to 100)
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      // Check if user has scrolled past the hero section
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        // Show button once user scrolls past 70% of the hero section
        setIsVisible(scrollY > heroBottom * 0.7);
      } else {
        // Fallback for other pages without #home
        setIsVisible(scrollY > 400);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case the page is already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circular progress calculation (radius = 18, circumference = 2 * PI * 18 ≈ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.75, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0c0c12]/85 hover:bg-[#12121c] border border-white/10 hover:border-[#ff6b00]/60 shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,107,0,0.35)] backdrop-blur-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50"
        >
          {/* Subtle Circular Scroll Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
            viewBox="0 0 44 44"
          >
            {/* Track background */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-white/10 fill-none"
              strokeWidth="2"
            />
            {/* Active progress indicator */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-[#ff6b00] fill-none transition-[stroke-dashoffset] duration-150 ease-out"
              strokeWidth="2.2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Arrow Icon */}
          <ArrowUp
            size={18}
            strokeWidth={2.4}
            className="text-zinc-300 group-hover:text-white transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-[#ff6b00]"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
