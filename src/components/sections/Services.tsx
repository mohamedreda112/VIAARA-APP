import { Reveal } from "../Reveal";
import { Globe, Smartphone, Palette, Layers, ShoppingBag, Brain, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const services: { icon: LucideIcon; title: string; body: string; tag: string }[] = [
  { icon: Globe, title: "Web Development", body: "High-performance web applications built with modern frameworks for ultimate speed, security, and scale.", tag: "01" },
  { icon: Smartphone, title: "Mobile App Development", body: "Immersive iOS & Android applications crafted natively or cross-platform with seamless experiences.", tag: "02" },
  { icon: Palette, title: "UI/UX Design", body: "Intuitive user interfaces and interactive design systems built around customer needs and user research.", tag: "03" },
  { icon: Layers, title: "ERP Systems", body: "Custom business management suites to automate operations, inventory, human resources, and workflows.", tag: "04" },
  { icon: ShoppingBag, title: "E-Commerce Solutions", body: "Fast, secure headless commerce architectures that scale to millions of monthly shoppers.", tag: "05" },
  { icon: Brain, title: "AI & Automation", body: "Smart agent orchestration, machine learning integration, and smart workflows that cut operational costs.", tag: "06" },
  { icon: ShieldCheck, title: "Technical Support", body: "Reliable 24/7 technical assistance, active monitoring, security audits, and continuous performance tuning.", tag: "07" },
];

export function Services() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yWord = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const yGrid = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yGlow = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} id="services" className="relative overflow-hidden py-16 md:py-24">
      <motion.div style={reduce ? undefined : { y: yGrid }} className="grid-bg absolute inset-0 opacity-40" />
      <motion.div style={reduce ? undefined : { y: yGlow }} className="bg-gradient-glow absolute inset-x-0 top-0 h-96" />

      <motion.span
        style={reduce ? undefined : { y: yWord }}
        className="pointer-events-none absolute -right-6 top-20 select-none whitespace-nowrap font-display text-[16vw] font-bold uppercase leading-none tracking-tight text-white/[0.025] md:text-[11vw]"
      >
        Capabilities
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">02 — Capabilities</p>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              Seven disciplines.
              <br />
              <span className="text-gradient">One unified agency.</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              We deliver custom end-to-end solutions designed to scale your business, optimize operations, and elevate customer experiences.
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

function ServiceCard({ s, index }: { s: (typeof services)[number]; index: number }) {
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
