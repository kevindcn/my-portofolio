import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, User, Briefcase, Clock, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";

export async function generateStaticParams() {
  const slugs = projects.map((project) => ({
    slug: project.slug,
  }));
  slugs.push({ slug: "klinik-laundry-logo" });
  return slugs;
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const currentIndex = projects.findIndex(
    (p) =>
      p.slug === params.slug ||
      (params.slug === "klinik-laundry-logo" && p.slug === "kinka-laundry-logo")
  );
  const project = projects[currentIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(currentIndex + 1) % projects.length];
  const isDesign = project.category === "Design";

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        
        {/* Navigation & Flow Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors text-sm font-medium group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Featured Work</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors border border-border bg-surface/50 hover:border-primary/50 px-3 py-1.5 rounded-full"
            >
              <span>View All Archive ({projects.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff6b00] font-bold">
                  CASE STUDY {project.caseNumber || "01"}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                  <Clock size={12} className="text-[#ff6b00]" />
                  <span>{project.readTime || "6 min Read"}</span>
                </span>
                <span className="text-zinc-600">•</span>
                <span className="font-mono text-xs uppercase text-zinc-400">
                  {project.category}
                </span>
              </div>

              <h1 className="font-heebo text-3xl font-extrabold sm:text-5xl text-white tracking-tight leading-tight">
                {project.title}
              </h1>
              {project.hook && (
                <p className="mt-3 text-lg sm:text-xl text-zinc-400 font-normal">
                  {project.hook}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={project.liveUrl || project.linkHref}
                target="_blank"
                rel="noreferrer"
                className="btn-primary shrink-0 flex items-center gap-2"
              >
                <span>{project.linkText}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Main Image Banner */}
        <div className="relative w-full h-[320px] sm:h-[450px] md:h-[540px] rounded-3xl overflow-hidden mb-16 border border-white/10 bg-[#0d0d12] shadow-2xl">
          <Image
            src={project.detailImage || project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Grid (Left: Details, Right: Sticky Data) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column - Main Details */}
          <div className="md:col-span-8 space-y-12">
            <section>
              <h2 className="font-heebo text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ff6b00]" />
                About the Project
              </h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {project.longDescription || project.desc}
              </p>
            </section>

            {project.processFlow && (
              <section>
                <h2 className="font-heebo text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff6b00]" />
                  Process &amp; Workflow
                </h2>
                <div className="space-y-6">
                  {project.processFlow.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff6b00]/10 text-[#ff6b00] font-mono text-sm border border-[#ff6b00]/30 shrink-0 font-bold">
                          {idx + 1}
                        </div>
                        {idx !== project.processFlow.length - 1 && (
                          <div className="w-px h-full bg-border mt-2" />
                        )}
                      </div>
                      <p className="text-zinc-300 pt-1 pb-4 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="md:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#111116]/80 p-6 md:p-8 backdrop-blur-md space-y-8 shadow-xl">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <User size={14} className="text-[#ff6b00]" /> Client
                </p>
                <p className="font-medium text-white">{project.client || "Personal"}</p>
              </div>
              
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Briefcase size={14} className="text-[#ff6b00]" /> My Role
                </p>
                <p className="font-medium text-white">{project.role || "Designer & Developer"}</p>
              </div>

              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Calendar size={14} className="text-[#ff6b00]" /> Year
                </p>
                <p className="font-medium text-white">{project.year || "2024"}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-4">Tech Stack &amp; Tools</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(t => (
                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-zinc-300 bg-white/[0.04]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase Section */}
        {project.showcaseImages && project.showcaseImages.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/10">
            <div className="text-center mb-12">
              <span className="eyebrow">Gallery</span>
              <h2 className="mt-3 font-heebo text-3xl font-bold text-white">
                Showcase &amp; Visual Artifacts
              </h2>
            </div>
            
            <div className={isDesign 
              ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
              : "flex flex-col gap-10"}>
              {project.showcaseImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d12] ${
                    isDesign ? "aspect-square" : "h-[400px] md:h-[650px]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} Showcase ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Project & Return Flow Section */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff6b00] font-semibold flex items-center gap-2">
              <Sparkles size={14} /> Next In Line
            </span>
            <Link
              href="/#portfolio"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Return to Featured Work ↑
            </Link>
          </div>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block rounded-3xl border border-white/10 bg-[#111116] p-6 sm:p-10 transition-all duration-300 hover:border-[#ff6b00]/60 hover:shadow-[0_15px_40px_rgba(255,107,0,0.18)]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  CASE STUDY {nextProject.caseNumber || "Next"} • {nextProject.category}
                </p>
                <h3 className="font-heebo text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#ff6b00] transition-colors">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                  {nextProject.hook || nextProject.desc}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-white group-hover:text-[#ff6b00] transition-colors hidden sm:inline">
                  Read Case Study
                </span>
                <div className="h-12 w-12 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:bg-[#ff6b00] group-hover:border-[#ff6b00] transition-all">
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
