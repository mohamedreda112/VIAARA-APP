import { Reveal } from "../Reveal";
import { Code2, Globe, Smartphone, Palette, Cloud, GitBranch, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const getServices = (t: any): { icon: LucideIcon; title: string; body: string; tag: string }[] => [
  {
    icon: Code2,
    title: t('services.list.0.title'),
    body: t('services.list.0.body'),
    tag: "01",
  },
  {
    icon: Globe,
    title: t('services.list.1.title'),
    body: t('services.list.1.body'),
    tag: "02",
  },
  {
    icon: Smartphone,
    title: t('services.list.2.title'),
    body: t('services.list.2.body'),
    tag: "03",
  },
  {
    icon: Palette,
    title: t('services.list.3.title'),
    body: t('services.list.3.body'),
    tag: "04",
  },
  {
    icon: Cloud,
    title: t('services.list.4.title'),
    body: t('services.list.4.body'),
    tag: "05",
  },
  {
    icon: GitBranch,
    title: t('services.list.5.title'),
    body: t('services.list.5.body'),
    tag: "06",
  },
  {
    icon: Brain,
    title: t('services.list.6.title'),
    body: t('services.list.6.body'),
    tag: "07",
  },
];

export function Services() {
  const { t } = useTranslation();
  const services = getServices(t);
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yWord = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const yGrid = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yGlow = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} id="services" className="relative overflow-hidden py-10 md:py-16">
      <motion.div style={reduce ? undefined : { y: yGrid }} className="grid-bg absolute inset-0 opacity-40" />
      <motion.div style={reduce ? undefined : { y: yGlow }} className="bg-gradient-glow absolute inset-x-0 top-0 h-96" />

      <motion.span
        style={reduce ? undefined : { y: yWord }}
        className="pointer-events-none absolute end-0 top-20 select-none whitespace-nowrap font-display text-[16vw] font-bold uppercase leading-none tracking-tight text-white/[0.025] md:text-[11vw]"
      >
        Services
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">{t('services.badge')}</p>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              {t('services.title1')}
              <br />
              <span className="text-gradient">{t('services.title2')}</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              {t('services.description')}
            </p>
          </div>
        </Reveal>


        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <ServiceCard s={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, index }: { s: ReturnType<typeof getServices>[number]; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${(index % 3) * 6 + 6}%`, `${-((index % 3) * 6 + 6)}%`]);

  return (
    <motion.article
      ref={ref}
      style={reduce ? undefined : { y }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/40 hover:bg-card"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--x,50%) var(--y,0%), color-mix(in oklab, var(--cyan) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-[0_0_30px_-10px_var(--cyan)]">
          <s.icon size={20} />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{s.tag}</span>
      </div>
      <h3 className="mt-7 font-display text-xl font-semibold">{s.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-cyan/30 via-lime/30 to-transparent" />
    </motion.article>
  );
}
