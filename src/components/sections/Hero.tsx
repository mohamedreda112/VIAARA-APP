import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Logo } from "../Logo";
import { FloatingTech } from "../FloatingTech";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Hero — VIAARA Software Engineering Agency"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      {/* layer 1 — background image */}
      <motion.div
        style={reduce ? undefined : { y: yBg }}
        className="absolute inset-0 -z-30"
        aria-hidden="true"
      >
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </motion.div>

      {/* layer 2 — grid */}
      <div className="grid-bg absolute inset-0 -z-20 opacity-60" aria-hidden="true" />

      {/* layer 3 — radial glow */}
      <div className="bg-gradient-glow absolute inset-0 -z-10" aria-hidden="true" />

      {/* layer 4 — floating chips (hidden on mobile for perf) */}
      <motion.div
        style={reduce ? undefined : { y: yMid }}
        className="absolute inset-0 -z-10 hidden sm:block"
        aria-hidden="true"
      >
        <FloatingTech />
      </motion.div>

      {/* layer 5 — content */}
      <motion.div
        style={reduce ? undefined : { y: yText, opacity }}
        className="relative mx-auto max-w-6xl px-5 text-center md:px-8"
      >
        {/* Badge */}
        <div className="mx-auto mb-6 flex items-center justify-center sm:mb-7">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-cyan sm:text-xs">
            <Sparkles size={12} className="text-lime flex-shrink-0" aria-hidden="true" />
            Expert Software House &amp; Tech Partner
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl lg:text-[7.5rem]">
          We engineer
          <br />
          <span className="text-gradient">high-performance systems</span>
          <br />
          &amp; custom apps.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-7 sm:max-w-2xl sm:text-base md:text-lg">
          VIAARA designs, codes, and launches robust web applications, mobile platforms,
          and enterprise solutions for ambitious enterprises worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_50px_-10px_var(--cyan)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_60px_-8px_var(--cyan)] sm:w-auto"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href="#about"
            className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-white/8 sm:w-auto"
          >
            Explore Our Work
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-12">
          {["50+ Projects Delivered", "20+ Happy Clients", "5+ Years Experience"].map((item) => (
            <span key={item} className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              <span className="h-1 w-1 rounded-full bg-cyan/60" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>

        {/* Logo watermark */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-24 -z-10 mx-auto flex justify-center opacity-[0.06]" aria-hidden="true">
          <div className="scale-[3]">
            <Logo size={120} withWord={false} />
          </div>
        </div>
      </motion.div>

      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40 animate-scan" />
      </div>

      {/* Bottom marquee */}
      <div className="marquee-mask absolute bottom-6 left-0 right-0 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-drift gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/60">
          {Array.from({ length: 2 }).flatMap((_, j) =>
            [
              "web development", "·", "mobile apps", "·", "enterprise systems", "·",
              "cloud engineering", "·", "devops & scale", "·", "custom erp", "·",
              "ui/ux design", "·", "ai integrations", "·",
            ].map((t, i) => <span key={`${j}-${i}`}>{t}</span>),
          )}
        </div>
      </div>
    </section>
  );
}
