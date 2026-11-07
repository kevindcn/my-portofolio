const skills = [
  "UI Design",
  "UX Design",
  "Figma",
  "Visual Paradigm",
  "Prototyping",
  "HTML & CSS",
  "JavaScript",
  "AI Video Ad Generator",
  "AI Prompting"
];

export default function SkillsMarquee() {
  // Repeat 3 times to ensure each track is wider than ultra-wide displays (> 3500px)
  const items = [...skills, ...skills, ...skills];

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-4 select-none">
      {/* Smooth left & right gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-surface to-transparent z-10" />

      {/* Two identical tracks moving seamlessly with translateX(-100%) */}
      <div className="flex">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-10 pr-10 animate-marquee">
          {items.map((s, i) => (
            <span
              key={`t1-${i}`}
              className="flex items-center gap-3 font-display text-sm uppercase tracking-wider text-muted whitespace-nowrap"
            >
              {s}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>

        {/* Track 2 (Clone) */}
        <div className="flex shrink-0 items-center gap-10 pr-10 animate-marquee" aria-hidden="true">
          {items.map((s, i) => (
            <span
              key={`t2-${i}`}
              className="flex items-center gap-3 font-display text-sm uppercase tracking-wider text-muted whitespace-nowrap"
            >
              {s}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
