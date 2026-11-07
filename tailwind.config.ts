import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09090b",        // zinc-950
        surface: "#18181b",    // zinc-900
        surface2: "#27272a",   // zinc-800
        border: "#27272a",     // subtle dark borders
        primary: {
          DEFAULT: "#ff6b00",  // Vibrant Orange matching Hero
          light: "#ff8533",
          dark: "#ea580c",
        },
        cyan: {
          DEFAULT: "#a1a1aa",  // Zinc-400 (neutralized)
        },
        ice: "#fafafa",        // Zinc-50
        muted: "#a1a1aa",      // Zinc-400
      },
      fontFamily: {
        heebo: ["var(--font-heebo)", "sans-serif"],
        display: ["var(--font-heebo)", "var(--font-barlow)", "sans-serif"],
        body: ["var(--font-barlow)", "var(--font-heebo)", "sans-serif"],
        mono: ["var(--font-barlow)", "monospace"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at 50% -20%, rgba(255, 107, 0, 0.15) 0%, rgba(234, 88, 12, 0.05) 10%, transparent 25%)",
      },
      boxShadow: {
        glow: "0 0 35px rgba(255, 107, 0, 0.35)",
        "glow-cyan": "0 0 25px rgba(255, 107, 0, 0.2)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulseSlow 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
