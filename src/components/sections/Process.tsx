import { Reveal } from "../Reveal";
import { Search, Map, Palette, Terminal, ShieldAlert, Rocket, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    icon: Search,
    desc: "We analyze your business targets, map user needs, and explore technical constraints to lay a bulletproof project foundation.",
  },
  {
    num: "02",
    title: "Planning",
    icon: Map,
    desc: "We construct rigorous system wireframes, define modular database schemas, and outline a realistic milestone schedule.",
  },
  {
    num: "03",
    title: "UI/UX Design",
    icon: Palette,
    desc: "We engineer intuitive user flows and high-end interactive mockups, shaping a premium visual identity custom to your brand.",
  },
  {
    num: "04",
    title: "Development",
    icon: Terminal,
    desc: "Our senior software developers code scalable architectures, writing highly optimized clean code utilizing modern tech stacks.",
  },
  {
    num: "05",
    title: "Testing",
    icon: ShieldAlert,
    desc: "We perform heavy automated unit testing, end-to-end integration reviews, and security auditing to ensure absolute reliability.",
  },
  {
    num: "06",
    title: "Deployment",
    icon: Rocket,
    desc: "We launch your ecosystem to secure cloud infrastructures (AWS/Vercel) with redundant cluster failovers and zero-downtime.",
  },
  {
    num: "07",
    title: "Support",
    icon: HeartHandshake,
    desc: "We provide round-the-clock maintenance, proactive telemetry monitoring, speed optimizations, and future feature planning.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-16 md:py-24">
      {/* Background decoration grid */}
      <div className="grid-bg absolute inset-0 opacity-20 -z-10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            06 — Operational Workflow
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-24">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              From initial spark,
              <br />
              <span className="text-gradient">to scale in production.</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              A comprehensive, zero-waste developmental pipeline that keeps stakeholders in the loop while prioritizing speed, security, and elite code quality.
            </p>
          </div>
        </Reveal>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical Connecting line (hidden on mobile, visible on desktop) */}
          <div className="absolute left-[36px] top-6 bottom-6 hidden w-[2px] bg-gradient-to-b from-cyan via-lime to-transparent md:block opacity-35" />

          <div className="space-y-12">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="relative flex flex-col md:flex-row md:gap-14">
                  {/* Left Column: Glowing Icon Marker */}
                  <div className="relative z-10 mb-4 flex items-center gap-4 md:mb-0">
                    <motion.div
                      className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-2xl border border-cyan/20 bg-zinc-950 shadow-[0_0_20px_rgba(63,207,213,0.15)] text-cyan"
                      whileHover={{
                        scale: 1.05,
                        borderColor: "rgba(168,208,58,0.4)",
                        color: "var(--lime)",
                        boxShadow: "0 0 25px rgba(168,208,58,0.25)",
                      }}
                    >
                      <s.icon size={26} />
                    </motion.div>

                    {/* Numeric chip beside icon on mobile */}
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-lime md:hidden">
                      {s.num}
                    </span>
                  </div>

                  {/* Right Column: Content Card */}
                  <motion.div
                    className="flex-1 rounded-[2rem] border border-white/10 bg-card/50 p-6 md:p-8 backdrop-blur hover:border-cyan/35 hover:bg-card/75 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {s.title}
                      </h3>
                      {/* Numeric chip inside card on desktop */}
                      <span className="hidden rounded-full border border-cyan/20 bg-cyan/5 px-3.5 py-1 font-mono text-xs text-cyan md:inline-block">
                        Step {s.num}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-4xl">
                      {s.desc}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
