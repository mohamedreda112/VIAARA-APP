import { Reveal } from "../Reveal";
import { ArrowUpRight, Eye, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ProjectModal, type ProjectData } from "../ProjectModal";
import { projects } from "@/data/projects";
import { useTranslation } from "react-i18next";

const featured = projects.slice(0, 3);

export function FeaturedProjects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const openModal = useCallback((p: ProjectData) => setSelectedProject(p), []);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section id="featured-projects" className="relative overflow-hidden py-10 md:py-16">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -start-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
              {t('projects.badge')}
            </p>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-6">
              <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
                {t('featuredProjects.title1')}
                <br />
                <span className="text-gradient">{t('featuredProjects.title2')}</span>
              </h2>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-cyan transition-all duration-200 hover:gap-3 shrink-0"
                aria-label="View all projects"
              >
                {t('featuredProjects.viewAll')}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {featured.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FeaturedCard p={p} onOpen={openModal} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-foreground backdrop-blur transition-all duration-300 hover:border-cyan/30 hover:bg-cyan/5 hover:text-cyan"
              >
                {t('featuredProjects.exploreAll')}
                <ArrowRight
                  size={15}
                  className="transition-all duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={closeModal} />
    </>
  );
}

/* ─── Card ─── */
function FeaturedCard({ p, onOpen }: { p: ProjectData; onOpen: (p: ProjectData) => void }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-card/40 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-cyan/40 hover:bg-card"
      whileHover={reduce ? undefined : { boxShadow: `0 20px 40px -12px ${p.accentColor}` }}
    >
      {/* Mockup header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-zinc-950/60">
        {p.mockup}

        {/* Category & Type pills */}
        <div className="absolute ltr:left-4 rtl:right-4 top-4 flex flex-col gap-1.5 items-start">
          <div className="rounded-full glass px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-cyan">
            {t(`projects.categories.${p.type}`, p.type)}
          </div>
          <div className="rounded-full glass px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-white/70">
            {t(`projects.categories.${p.category}`, p.category)}
          </div>
        </div>

        {/* Eye hover button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={() => onOpen(p)}
            aria-label={`Preview ${p.title}`}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground opacity-0 shadow-[0_0_30px_-6px_var(--cyan)] transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            whileHover={reduce ? undefined : { scale: 1.12 }}
            whileTap={reduce ? undefined : { scale: 0.93 }}
            initial={{ scale: 0.75, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-cyan/20 opacity-0 group-hover:opacity-100 animate-ping"
              style={{ animationDuration: "1.6s" }}
            />
            <Eye size={22} aria-hidden="true" />
          </motion.button>
        </div>

        <div className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
            style={{ background: p.accentColor, color: "var(--foreground)" }}
          >
            <p.icon size={16} aria-hidden="true" />
          </div>
          <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-cyan md:text-xl">
            {t(`projects.items.${p.title}.title`, p.title)}
          </h3>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{t(`projects.items.${p.title}.desc`, p.desc)}</p>

        {/* Tech badges */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[9.5px] text-muted-foreground transition-all duration-300 group-hover:border-cyan/15 group-hover:bg-cyan/5 group-hover:text-cyan/80"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-6 border-t border-white/5 pt-5 grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpen(p)}
            className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-white transition-colors hover:bg-cyan/10 hover:text-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            aria-label={`View details for ${p.title}`}
          >
            {t('projects.viewDetails')}
          </button>
          <a
            href={p.liveUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-cyan/30 hover:text-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            aria-label={`Live preview of ${p.title}`}
          >
            {t('projects.livePreview')}
          </a>
          <a
            href={p.githubUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            aria-label={`GitHub repo for ${p.title}`}
          >
            {t('projects.github')}
          </a>
        </div>
      </div>
    </motion.article>
  );
}
