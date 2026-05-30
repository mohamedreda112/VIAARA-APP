import { Reveal } from "../Reveal";
import { Counter } from "../Counter";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects completed" },
  { value: 20, suffix: "+", label: "Happy clients" },
  { value: 5, suffix: "+", label: "Years experience" },
  { value: 10, suffix: "+", label: "Expert developers" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yGlow = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const yWord = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const scaleGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.8]);

  return (
    <section ref={ref} id="stats" className="relative overflow-hidden py-16 md:py-24">
      <motion.div
        style={reduce ? undefined : { y: yGlow, scale: scaleGlow }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 50%, color-mix(in oklab, var(--cyan) 22%, transparent), transparent 70%)",
          }}
        />
      </motion.div>

      <motion.span
        style={reduce ? undefined : { y: yWord }}
        className="pointer-events-none absolute inset-x-0 top-0 select-none text-center font-display text-[18vw] font-bold uppercase leading-none tracking-tight text-white/[0.03] md:text-[14vw]"
      >
        Impact
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.3em] text-cyan">07 — Impact</p>
          <h2 className="mx-auto max-w-3xl text-center font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            Numbers that compound,
            <br />
            <span className="text-gradient">work that endures.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:mt-20 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatCell key={s.label} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ s, index }: { s: (typeof stats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${8 + index * 2}%`, `${-(8 + index * 2)}%`]);

  return (
    <Reveal delay={index * 0.08}>
      <motion.div ref={ref} style={reduce ? undefined : { y }} className="bg-card/60 p-6 backdrop-blur md:p-12">
        <p className="font-display text-4xl font-semibold leading-none text-gradient md:text-7xl">
          <Counter to={s.value} suffix={s.suffix} />
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground md:mt-4">{s.label}</p>
      </motion.div>
    </Reveal>
  );
}
