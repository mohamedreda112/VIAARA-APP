import {
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
export interface ProjectData {
  title: string;
  type: string;
  category: string;
  year?: string;
  desc: string;
  longDesc?: string;
  keyFeatures?: string[];
  tech: string[];
  accentColor: string;      // rgba — glows / tints
  accentColorSolid: string; // hex  — borders / text
  icon: LucideIcon;
  mockup: ReactNode;
  screenshots?: ReactNode[];
  stats?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

interface Props {
  project: ProjectData | null;
  onClose: () => void;
}

/* ─────────────────────────────────────────────────────────────
   Neon border — draws itself on mount
───────────────────────────────────────────── */
function NeonBorder({ color }: { color: string }) {
  const grad90  = `linear-gradient(90deg,  transparent, ${color}, transparent)`;
  const grad180 = `linear-gradient(180deg, transparent, ${color}, transparent)`;
  const ease    = [0.22, 1, 0.36, 1] as const;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 rounded-[1.5rem] overflow-hidden"
    >
      <motion.span className="absolute inset-x-0 top-0 h-[1.5px]"
        style={{ background: grad90 }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease }} />
      <motion.span className="absolute inset-x-0 bottom-0 h-[1.5px]"
        style={{ background: grad90 }}
        initial={{ scaleX: 0, transformOrigin: "right" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.08, ease }} />
      <motion.span className="absolute inset-y-0- w-[1.5px]"
        style={{ background: grad180 }}
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.04, ease }} />
      <motion.span className="absolute inset-y-0- w-[1.5px]"
        style={{ background: grad180 }}
        initial={{ scaleY: 0, transformOrigin: "bottom" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.12, ease }} />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Carousel — left panel
───────────────────────────────────────────── */
function Carousel({ project }: { project: ProjectData }) {
  const slides: ReactNode[] = [project.mockup, ...(project.screenshots ?? [])];
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const total  = slides.length;

  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  /* ← → keyboard navigation */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next]);

  return (
    <div className="flex h-full flex-col gap-3">

      {/* ── Main slide ── */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950"
           style={{ minHeight: 200 }}>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={reduce ? undefined : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {slides[active]}
          </motion.div>
        </AnimatePresence>

        {/* bottom fade */}
        <div aria-hidden="true"
             className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-2xl"
             style={{ background: "linear-gradient(to top, rgba(8,12,18,0.85), transparent)" }} />

        {/* corner glow */}
        <div aria-hidden="true"
             className="pointer-events-none absolute end- -top-8 h-28 w-28 rounded-full blur-3xl opacity-25"
             style={{ background: project.accentColor }} />

        {/* counter + arrows row */}
        <div className="absolute bottom-3-- flex items-center justify-between">
          <span className="font-mono text-[11px] select-none text-white/40">
            <span className="font-semibold text-white/80">
              {String(active + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(total).padStart(2, "0")}
          </span>

          {total > 1 && (
            <div className="flex items-center gap-1.5">
              <NavBtn onClick={prev} label="Previous" icon={<ChevronLeft size={13} />} />
              <NavBtn onClick={next} label="Next"     icon={<ChevronRight size={13} />} />
            </div>
          )}
        </div>
      </div>

      {/* ── Thumbnails ── */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Screenshot ${i + 1}`}
              aria-pressed={i === active}
              className={[
                "relative h-[52px] w-[76px] flex-shrink-0 overflow-hidden rounded-xl border",
                "transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan",
                i === active
                  ? "border-cyan/50 opacity-100 shadow-[0_0_12px_-3px_var(--cyan)]"
                  : "border-white/[0.07] opacity-45 hover:opacity-75 hover:border-white/20",
              ].join(" ")}
            >
              <div className="absolute inset-0 scale-[1.08] pointer-events-none">{slide}</div>
              {/* active inset ring */}
              {i === active && (
                <span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${project.accentColorSolid}60` }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* tiny nav button */
function NavBtn({ onClick, label, icon }: { onClick: () => void; label: string; icon: ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/55 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {icon}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Modal
───────────────────────────────────────────── */
export function ProjectModal({ project, onClose }: Props) {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);

  /* ESC to close */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  /* Reset right panel scroll when project changes */
  useEffect(() => {
    if (project && rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
  }, [project?.title]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="bd"
            aria-hidden="true"
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          {/* ── Centering shell ── */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — project details`}
          >
            {/* ── Card ── */}
            <motion.div
              key="card"
              className="relative w-full"
              style={{ maxWidth: 900 }}
              initial={{ opacity: 0, scale: 0.91, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.91, y: 24 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Neon border trace */}
              <NeonBorder color={project.accentColorSolid} />

              {/* Outer ambient glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] blur-3xl opacity-[0.18]"
                style={{ background: `radial-gradient(ellipse at 35% 0%, ${project.accentColor}, transparent 65%)` }}
              />

              {/* ── Card surface ── */}
              <div
                className="relative overflow-hidden rounded-[1.5rem]"
                style={{
                  background: "linear-gradient(150deg, oklch(0.135 0.028 218) 0%, oklch(0.09 0.022 222) 100%)",
                  border: "1px solid rgba(255,255,255,0.055)",
                  boxShadow: "0 32px 80px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)",
                }}
              >
                {/* ── Top bar: category label + close ── */}
                <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-2">
                    <project.icon
                      size={12}
                      aria-hidden="true"
                      style={{ color: project.accentColorSolid }}
                    />
                    <span
                      className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em]"
                      style={{ color: project.accentColorSolid }}
                    >
                      {t(`projects.categories.${project.category}`, project.category)}
                    </span>
                  </div>

                  <motion.button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.16 }}
                  >
                    <X size={14} />
                  </motion.button>
                </div>

                {/* thin separator */}
                <div
                  aria-hidden="true"
                  className="mx-5 h-px sm:mx-6"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
                />

                {/* ── Two-column body ── */}
                <div className="flex flex-col md:flex-row md:items-stretch">

                  {/* LEFT — carousel */}
                  <motion.div
                    className="w-full p-4 sm:p-5 md:w-[52%] md:flex-shrink-0 md:p-6"
                    style={{ minHeight: 320 }}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Carousel project={project} />
                  </motion.div>

                  {/* vertical divider — desktop only */}
                  <div
                    aria-hidden="true"
                    className="hidden md:block w-px flex-shrink-0 my-5"
                    style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)" }}
                  />

                  {/* horizontal divider — mobile only */}
                  <div
                    aria-hidden="true"
                    className="mx-4 h-px flex-shrink-0 md:hidden"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
                  />

                  {/* RIGHT — details */}
                  <motion.div
                    ref={rightPanelRef}
                    className="modal-right-scroll flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5 md:p-6"
                    style={{ maxHeight: "min(74vh, 580px)" }}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.14, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Title block */}
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10"
                        style={{ background: project.accentColor }}
                      >
                        <project.icon size={18} className="text-foreground" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-display text-[1.15rem] font-bold leading-tight text-foreground sm:text-xl md:text-2xl">
                          {t(`projects.items.${project.title}.title`, project.title)}
                        </h2>
                        <p
                          className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                          style={{ color: project.accentColorSolid }}
                        >
                          {t(`projects.categories.${project.category}`, project.category)}
                        </p>
                      </div>
                    </div>

                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-2">
                      <MetaPill icon={<Layers size={9} />} label={t(`projects.categories.${project.type}`, project.type)} />
                      <MetaPill icon={<Tag size={9} />} label={t(`projects.categories.${project.category}`, project.category)} />
                      {project.year && <MetaPill icon={<Calendar size={9} />} label={project.year} />}
                    </div>

                    {/* Description */}
                    <p className="text-[13px] leading-[1.7] text-muted-foreground sm:text-sm">
                      {t(`projects.items.${project.title}.longDesc`, project.longDesc ?? project.desc)}
                    </p>

                    {/* Key Features */}
                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                      <div>
                        <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
                          {t('projectModal.keyFeatures')}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {(t(`projects.items.${project.title}.keyFeatures`, { returnObjects: true }) as string[] ?? project.keyFeatures).map((kf, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.16 + i * 0.04, duration: 0.25 }}
                              className="flex items-start gap-2 text-[13px] text-muted-foreground sm:text-sm"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                style={{ background: project.accentColorSolid }}
                                aria-hidden="true"
                              />
                              {kf}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
                        {t('projectModal.techUsed')}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, i) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.18 + i * 0.04, duration: 0.25 }}
                            className="flex items-center gap-1.5 rounded-lg border px-2.5 py-[5px] font-mono text-[11px] text-white/70 transition-colors duration-200 hover:text-white"
                            style={{
                              borderColor: i % 2 === 0 ? "rgba(63,207,213,0.2)"  : "rgba(168,208,58,0.2)",
                              background:  i % 2 === 0 ? "rgba(63,207,213,0.05)" : "rgba(168,208,58,0.05)",
                            }}
                          >
                            <span
                              className="h-[5px] w-[5px] flex-shrink-0 rounded-full"
                              style={{ background: i % 2 === 0 ? "var(--cyan)" : "var(--lime)" }}
                              aria-hidden="true"
                            />
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    {project.stats && project.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {project.stats.map((s, i) => (
                          <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.22 + i * 0.055, duration: 0.28 }}
                            className="rounded-xl border p-2.5 text-center sm:p-3"
                            style={{
                              borderColor: i % 2 === 0 ? "rgba(63,207,213,0.14)" : "rgba(168,208,58,0.14)",
                              background:  i % 2 === 0 ? "rgba(63,207,213,0.04)" : "rgba(168,208,58,0.04)",
                            }}
                          >
                            <p
                              className="font-display text-base font-bold leading-none sm:text-lg"
                              style={{ color: i % 2 === 0 ? "var(--cyan)" : "var(--lime)" }}
                            >
                              {s.value}
                            </p>
                            <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
                              {s.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    <motion.div
                      className="flex flex-col gap-2.5 sm:flex-row"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.34, duration: 0.3 }}
                    >
                      <ModalBtn
                        href={project.liveUrl ?? "#contact"}
                        label={t('projectModal.livePreview')}
                        icon={<ExternalLink size={13} aria-hidden="true" />}
                        variant="primary"
                        accentColor={project.accentColorSolid}
                      />
                      <ModalBtn
                        href={project.githubUrl ?? "#contact"}
                        label={t('projectModal.viewOnGithub')}
                        icon={<Github size={13} aria-hidden="true" />}
                        variant="ghost"
                        accentColor={project.accentColorSolid}
                      />
                    </motion.div>

                    {/* ESC hint */}
                    <p className="pb-1 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
                      {t('projectModal.press')}{" "}
                      <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[8px] text-white/35">
                        ESC
                      </kbd>{" "}
                      {t('projectModal.toClose')}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Meta pill
───────────────────────────────────────────── */
function MetaPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-[5px] font-mono text-[10px] text-white/45">
      {icon}
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Action button
───────────────────────────────────────────── */
function ModalBtn({
  href,
  label,
  icon,
  variant,
  accentColor,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  variant: "primary" | "ghost";
  accentColor: string;
}) {
  const isExternal = href.startsWith("http");
  const sharedProps = {
    href,
    target:  isExternal ? "_blank"           : undefined,
    rel:     isExternal ? "noopener noreferrer" : undefined,
  };

  if (variant === "primary") {
    return (
      <motion.a
        {...sharedProps}
        className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[oklch(0.09_0.022_222)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan sm:px-5"
        style={{
          background: "linear-gradient(135deg, var(--cyan) 0%, var(--lime) 100%)",
          boxShadow: `0 0 24px -8px ${accentColor}`,
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 0 36px -6px ${accentColor}`,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
      >
        {/* shimmer sweep */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[220%]"
        />
        {icon}
        {label}
      </motion.a>
    );
  }

  return (
    <motion.a
      {...sharedProps}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-white/70 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan sm:px-5"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      {icon}
      {label}
    </motion.a>
  );
}
