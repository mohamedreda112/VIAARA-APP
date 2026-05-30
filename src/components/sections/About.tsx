import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Reveal } from "../Reveal";

/* ─────────────────────────────────────────────────────────────
   3D Infrastructure Cube Visualization
   Pure SVG + Framer Motion — no external assets needed.
───────────────────────────────────────────── */
function InfraCube({ reduced }: { reduced: boolean }) {
  /* Slow continuous Y-axis rotation */
  const rotateY = useRef(0);
  const [ry, setRy] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, 360, {
      duration: 28,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (v) => {
        rotateY.current = v;
        setRy(v);
      },
    });
    return () => controls.stop();
  }, [reduced]);

  /* Isometric cube faces — top, left, right */
  const w = 200;
  const h = 116;

  /* Pulsing data nodes */
  const nodes = [
    { cx: 100, cy: 30,  color: "#3FCFD5", delay: 0 },
    { cx: 168, cy: 68,  color: "#A8D03A", delay: 0.6 },
    { cx: 32,  cy: 68,  color: "#3FCFD5", delay: 1.2 },
    { cx: 100, cy: 106, color: "#A8D03A", delay: 0.3 },
    { cx: 134, cy: 49,  color: "#3FCFD5", delay: 0.9 },
    { cx: 66,  cy: 49,  color: "#A8D03A", delay: 1.5 },
    { cx: 134, cy: 87,  color: "#3FCFD5", delay: 0.5 },
    { cx: 66,  cy: 87,  color: "#A8D03A", delay: 1.1 },
  ];

  /* Connection lines between nodes */
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3],
    [0, 4], [0, 5], [4, 6], [5, 7],
    [1, 4], [2, 5], [3, 6], [3, 7],
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        perspective: 900,
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Outer glow ring */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(63,207,213,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Rotating 3D wrapper */}
      <motion.div
        style={
          reduced
            ? undefined
            : { rotateY: ry, transformStyle: "preserve-3d" }
        }
        className="relative"
      >
        {/* Main SVG — isometric network graph */}
        <svg
          viewBox="0 0 200 136"
          width="100%"
          height="100%"
          className="w-full max-w-[340px]"
          aria-hidden="true"
        >
          <defs>
            {/* Cyan glow filter */}
            <filter id="glow-c" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Lime glow filter */}
            <filter id="glow-l" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Grid pattern */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(63,207,213,0.08)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          {/* Background grid */}
          <rect width="200" height="136" fill="url(#grid)" opacity="0.6" />

          {/* Isometric cube outline — top face */}
          <polygon
            points="100,10 168,48 100,86 32,48"
            fill="rgba(63,207,213,0.04)"
            stroke="rgba(63,207,213,0.25)"
            strokeWidth="0.8"
          />
          {/* Left face */}
          <polygon
            points="32,48 100,86 100,126 32,88"
            fill="rgba(63,207,213,0.03)"
            stroke="rgba(63,207,213,0.15)"
            strokeWidth="0.8"
          />
          {/* Right face */}
          <polygon
            points="168,48 100,86 100,126 168,88"
            fill="rgba(168,208,58,0.03)"
            stroke="rgba(168,208,58,0.15)"
            strokeWidth="0.8"
          />

          {/* Edge connections */}
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].cx}
              y1={nodes[a].cy}
              x2={nodes[b].cx}
              y2={nodes[b].cy}
              stroke={i % 2 === 0 ? "rgba(63,207,213,0.2)" : "rgba(168,208,58,0.18)"}
              strokeWidth="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
            />
          ))}

          {/* Data flow pulses along edges */}
          {!reduced &&
            [0, 3, 6, 9].map((edgeIdx, i) => {
              const [a, b] = edges[edgeIdx];
              return (
                <motion.circle
                  key={`pulse-${i}`}
                  r="1.5"
                  fill={i % 2 === 0 ? "#3FCFD5" : "#A8D03A"}
                  filter={i % 2 === 0 ? "url(#glow-c)" : "url(#glow-l)"}
                  animate={{
                    cx: [nodes[a].cx, nodes[b].cx, nodes[a].cx],
                    cy: [nodes[a].cy, nodes[b].cy, nodes[a].cy],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

          {/* Network nodes */}
          {nodes.map((n, i) => (
            <g key={i}>
              {/* Outer pulse ring */}
              {!reduced && (
                <motion.circle
                  cx={n.cx}
                  cy={n.cy}
                  r="5"
                  fill="none"
                  stroke={n.color}
                  strokeWidth="0.8"
                  animate={{ r: [4, 8, 4], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.8,
                    delay: n.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              {/* Core dot */}
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r="3"
                fill={n.color}
                filter={i % 2 === 0 ? "url(#glow-c)" : "url(#glow-l)"}
                animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2,
                  delay: n.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          ))}

          {/* Center label */}
          <text
            x="100"
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="6"
            fontFamily="monospace"
            fill="rgba(63,207,213,0.5)"
            letterSpacing="1"
          >
            VIAARA INFRA
          </text>
        </svg>
      </motion.div>

      {/* Corner scan line */}
      {!reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-[1px] opacity-20 animate-scan"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--cyan), transparent)",
          }}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Feature pillar card
───────────────────────────────────────────── */
function Pillar({
  title,
  desc,
  accent = "cyan",
}: {
  title: string;
  desc: string;
  accent?: "cyan" | "lime";
}) {
  return (
    <div
      className="border-l-2 pl-4 transition-all duration-300 hover:pl-5"
      style={{
        borderColor:
          accent === "cyan"
            ? "rgba(63,207,213,0.4)"
            : "rgba(168,208,58,0.4)",
      }}
    >
      <p className="font-display text-sm font-semibold text-foreground">
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating info card
───────────────────────────────────────────── */
function FloatCard({
  label,
  value,
  accent = "cyan",
  className = "",
}: {
  label: string;
  value: string;
  accent?: "cyan" | "lime";
  className?: string;
}) {
  return (
    <div
      className={`glass-strong hidden rounded-2xl p-4 md:block ${className}`}
    >
      <p
        className="font-mono text-[9px] uppercase tracking-[0.28em]"
        style={{ color: accent === "cyan" ? "var(--cyan)" : "var(--lime)" }}
      >
        {label}
      </p>
      <p className="mt-1.5 font-display text-lg font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yViz   = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yLabel = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  const pillars: [string, string, "cyan" | "lime"][] = [
    [
      "Scalable Architecture",
      "Systems designed to grow with your business — from early-stage products to high-traffic production environments.",
      "cyan",
    ],
    [
      "Dedicated Product Teams",
      "Senior engineers embedded in your workflow, aligned with your roadmap and accountable for delivery.",
      "lime",
    ],
    [
      "Secure Cloud Infrastructure",
      "Cloud-native deployments on AWS with automated failover, encrypted data layers, and compliance-ready configurations.",
      "cyan",
    ],
    [
      "Long-Term Technical Support",
      "Ongoing maintenance, performance monitoring, and iterative improvements well beyond the initial launch.",
      "lime",
    ],
  ];

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* Watermark — reduced opacity so it supports rather than competes */}
      <motion.span
        style={reduce ? undefined : { y: yLabel }}
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-8 select-none whitespace-nowrap font-display text-[14vw] font-bold uppercase leading-none tracking-tight text-white/[0.018] md:text-[9vw]"
      >
        About
      </motion.span>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">

        {/* ── Left — copy ── */}
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            01 — About
          </p>

          <h2
            id="about-heading"
            className="font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl"
          >
            Custom software built
            <br />
            <span className="text-gradient">for scale and reliability.</span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-[1.8] text-muted-foreground md:text-base md:leading-[1.8]">
            We design, build, and maintain production-grade software for companies
            that need more than a development agency — they need a technical partner.
            Since 2021, we've delivered web platforms, mobile applications, and
            enterprise systems across the MENA region and Europe, working directly
            with founders, CTOs, and product teams.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map(([title, desc, accent]) => (
              <Pillar key={title} title={title} desc={desc} accent={accent} />
            ))}
          </div>
        </Reveal>

        {/* ── Right — 3D visualization ── */}
        <Reveal delay={0.1}>
          <div className="relative">
            {/* Main visualization container */}
            <motion.div
              style={reduce ? {
                background: "linear-gradient(145deg, rgba(20,28,40,0.95) 0%, rgba(10,14,20,0.98) 100%)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 0 60px -20px rgba(63,207,213,0.2)",
              } : {
                y: yViz,
                background: "linear-gradient(145deg, rgba(20,28,40,0.95) 0%, rgba(10,14,20,0.98) 100%)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 0 60px -20px rgba(63,207,213,0.2)",
              }}
              className="relative overflow-hidden rounded-3xl border border-white/10"
            >
              {/* Inner grid background */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(63,207,213,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(63,207,213,0.08) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Status bar */}
              <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: "var(--lime)",
                      boxShadow: "0 0 8px var(--lime)",
                      animation: "pulse-glow 2.5s ease-in-out infinite",
                    }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Infrastructure · Active
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/25">
                  v2.14.1
                </span>
              </div>

              {/* 3D cube visualization */}
              <div className="relative px-6 py-8 md:px-8 md:py-10">
                <InfraCube reduced={!!reduce} />
              </div>

              {/* Bottom metrics row */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
                {[
                  { label: "Uptime", value: "99.99%", color: "var(--cyan)" },
                  { label: "Regions", value: "3+",    color: "var(--lime)" },
                  { label: "Response", value: "<50ms", color: "var(--cyan)" },
                ].map((m) => (
                  <div key={m.label} className="px-4 py-3 text-center">
                    <p
                      className="font-display text-base font-bold"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating card — bottom left */}
            <FloatCard
              label="Est. 2021"
              value="London · Dubai · Cairo"
              accent="lime"
              className="absolute -bottom-6 -left-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            />

            {/* Floating card — top right */}
            <FloatCard
              label="Cloud-native"
              value="Multi-region deploy"
              accent="cyan"
              className="absolute -right-5 -top-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
