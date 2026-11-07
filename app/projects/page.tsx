"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, categories } from "@/lib/data";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeFilter === "All" ? true : project.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <section className="section-pad">
        <div className="mx-auto max-w-6xl">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <Link href="/#portfolio" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </motion.div>

          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end min-h-[4rem]">
            <div>
              <span className="eyebrow">All Works</span>
              <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                Project <span className="text-primary">Archive</span>
              </h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mt-4 md:mt-0"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none border ${
                    activeFilter === cat
                      ? "border-primary/50 text-white"
                      : "border-border text-muted hover:text-white hover:border-border/80"
                  }`}
                >
                  {activeFilter === cat && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_rgba(255,107,0,0.5)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </motion.div>
          </div>

          <div className="mt-14 min-h-[500px] relative">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full"
              >
                {filteredProjects.map((p, index) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.04,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="flex flex-col"
                  >
                    <Link
                      href={`/projects/${p.slug}`}
                      className="card group overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/60 flex flex-col hover:shadow-[0_0_30px_rgba(255,107,0,0.2)] bg-surface/40 h-full block"
                    >
                      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-surface2 to-ink border-b border-border">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        
                        <div
                          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-ink/80 text-ice opacity-0 transition-opacity group-hover:opacity-100 hover:bg-primary"
                        >
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan">
                            {p.category}
                          </p>
                          <h3 className="mt-2 font-display text-xl font-semibold text-white group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                            {p.desc}
                          </p>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-border px-3 py-1 text-[11px] text-muted bg-surface/50"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </section>
    </div>
  );
}
