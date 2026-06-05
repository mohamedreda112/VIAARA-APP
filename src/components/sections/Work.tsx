/**
 * Work.tsx — "Infrastructure Engineered for Scale"
 * Replaces the old "Selected Work" section with a cinematic
 * enterprise architecture visualization.
 */
import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Reveal } from "../Reveal";
import {
  Globe,
  Smartphone,
  Server,
  Database,
  Cloud,
  Shield,
  GitBranch,
  Activity,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Architecture layer data
───────────────────────────────────────────── */
const LAYERS = [
  {
    id: "frontend",
    label: "Frontend Layer",
    color: "#3FCFD5",
    colorRgb: "63,207,213",
    icon: Globe,
    nodes: [
      { name: "React", sub: "SPA / Dashboards" },
      { name: "Next.js", sub: "SSR / SSG" },
      { name: "Flutter", sub: "iOS & Android" },
    ],
  },
  {
    id: "backend",
    label: "Backend Layer",
    color: "#A8D03A",
    colorRgb: "168,208,58",
    icon: Server,
    nodes: [
      { name: "Node.js", sub: "Microservices" },
      { name: "Laravel", sub: "REST / MVC" },
      { name: "Python", sub: "AI / FastAPI" },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    color: "#3FCFD5",
    colorRgb: "63,207,213",
    icon: Cloud,
    nodes: [
      { name: "Kubernetes", sub: "Orchestration" },
      { name: "Docker", sub: "Containers" },
      { name: "AWS", sub: "Cloud / CDN" },
    ],
  },
  {
    id: "data",
    label: "Data Layer",
    color: "#A8D03A",
    colorRgb: "168,208,58",
    icon: Database,
    nodes: [
      { name: "PostgreSQL", sub: "Relational DB" },
      { name: "Redis", sub: "Cache / Pub-Sub" },
      { name: "MongoDB", sub: "Document Store" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Security",
    color: "#3FCFD5",
    colorRgb: "63,207,213",
    icon: Shield,
    nodes: [
      { name: "CI/CD", sub: "GitHub Actions" },
      { name: "Monitoring", sub: "Grafana / OTel" },
      { name: "Security", sub: "WAF / Vault" },
    ],
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Live metrics ticker
───────────────────────────────────────────── */
const METRICS = [
  { label: "Uptime SLA",      value: "99.99%",   color: "#3FCFD5" },
  { label: "API Latency",     value: "<50ms",    color: "#A8D03A" },
  { label: "Auto-Scaling",    value: "Enabled",  color: "#3FCFD5" },
  { label: "CDN Regions",     value: "38+",      color: "#A8D03A" },
  { label: "Deploy Freq",     value: "~40/day",  color: "#3FCFD5" },
  { label: "MTTR",            value: "<2 min",   color: "#A8D03A" },
];

/* ─────────────────────────────────────────────────────────────
   Fake deployment log lines
───────────────────────────────────────────── */
const LOG_LINES = [
  { t: "00:00:01", msg: "▶  pipeline triggered — branch: main",         c: "#3FCFD5" },
  { t: "00:00:03", msg: "✓  unit tests passed (312/312)",                c: "#A8D03A" },
  { t: "00:00:07", msg: "✓  docker image built — sha256:a3f9c1",        c: "#A8D03A" },
  { t: "00:00:09", msg: "⟳  pushing to registry.viaara.tech",           c: "#3FCFD5" },
  { t: "00:00:12", msg: "✓  image pushed successfully",                  c: "#A8D03A" },
  { t: "00:00:14", msg: "⟳  rolling update — k8s cluster: prod-eu-1",   c: "#3FCFD5" },
  { t: "00:00:18", msg: "✓  3/3 pods healthy — zero downtime",          c: "#A8D03A" },
  { t: "00:00:20", msg: "✓  health checks passing — latency: 34ms",     c: "#A8D03A" },
  { t: "00:00:22", msg: "✓  deployment complete — v2.14.1 live",        c: "#3FCFD5" },
];

/* ─────────────────────────────────────────────────────────────
   Animated SVG connection lines between layers
───────────────────────────────────────────── */
function ConnectionLines({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lg-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3FCFD5" stopOpacity="0" />
          <stop offset="50%" stopColor="#3FCFD5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3FCFD5" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lg-lime" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A8D03A" stopOpacity="0" />
          <stop offset="50%" stopColor="#A8D03A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#A8D03A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* horizontal connector lines at 20%, 40%, 60%, 80% height */}
      {[20, 40, 60, 80].map((pct, i) => (
        <motion.line
          key={pct}
          x1="0%" y1={`${pct}%`} x2="100%" y2={`${pct}%`}
          stroke={i % 2 === 0 ? "url(#lg-cyan)" : "url(#lg-lime)"}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 + i * 0.2, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Single architecture node card
───────────────────────────────────────────── */
function ArchNode({
  name,
  sub,
  color,
  colorRgb,
  delay,
}: {
  name: string;
  sub: string;
  color: string;
  colorRgb: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative flex cursor-default flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-center transition-all duration-300"
      style={{
        borderColor: hovered ? `${color}50` : "rgba(255,255,255,0.07)",
        background: hovered
          ? `rgba(${colorRgb},0.08)`
          : "rgba(255,255,255,0.03)",
        boxShadow: hovered ? `0 0 20px -6px rgba(${colorRgb},0.4)` : "none",
      }}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={reduce ? undefined : { y: -3 }}
    >
      {/* status dot */}
      <span
        className="absolute top-2.5 h-1.5 w-1.5 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 6px ${color}`,
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <p className="font-display text-[13px] font-bold text-foreground">{name}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{sub}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Architecture layer row
───────────────────────────────────────────── */
function ArchLayer({
  layer,
  index,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
}) {
  const Icon = layer.icon;
  return (
    <Reveal delay={index * 0.08}>
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        {/* Layer label */}
        <div className="flex w-full items-center gap-3 sm:w-44 sm:flex-shrink-0 sm:flex-col sm:items-start sm:gap-1.5">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border"
            style={{
              borderColor: `rgba(${layer.colorRgb},0.25)`,
              background: `rgba(${layer.colorRgb},0.08)`,
              color: layer.color,
            }}
          >
            <Icon size={16} aria-hidden="true" />
          </div>
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[0.25em] font-semibold"
              style={{ color: layer.color }}
            >
              {layer.label}
            </p>
          </div>
        </div>

        {/* Connector arrow */}
        <div
          className="hidden h-px flex-1 sm:block"
          style={{
            background: `linear-gradient(90deg, rgba(${layer.colorRgb},0.4), rgba(${layer.colorRgb},0.1))`,
            maxWidth: 32,
          }}
          aria-hidden="true"
        />

        {/* Nodes */}
        <div className="grid flex-1 grid-cols-3 gap-2.5 sm:gap-3">
          {layer.nodes.map((node, ni) => (
            <ArchNode
              key={node.name}
              name={node.name}
              sub={node.sub}
              color={layer.color}
              colorRgb={layer.colorRgb}
              delay={index * 0.06 + ni * 0.05}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated deployment terminal
───────────────────────────────────────────── */
function DeployTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= LOG_LINES.length) return;
    const t = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 400 : 600 + Math.random() * 400,
    );
    return () => clearTimeout(t);
  }, [started, visibleLines]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-white/[0.07]"
      style={{ background: "rgba(6,10,16,0.9)" }}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ms- font-mono text-[10px] text-white/30">
          viaara-ci — deploy pipeline
        </span>
        <span
          className="ms- flex items-center gap-1.5 font-mono text-[9px]"
          style={{ color: "#A8D03A" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#A8D03A", animation: "pulse-glow 2s ease-in-out infinite" }}
            aria-hidden="true"
          />
          LIVE
        </span>
      </div>

      {/* Log lines */}
      <div className="space-y-1.5 p-4 font-mono text-[11px]">
        <AnimatePresence initial={false}>
          {LOG_LINES.slice(0, visibleLines).map((line) => (
            <motion.div
              key={line.t}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <span className="flex-shrink-0 text-white/25">{line.t}</span>
              <span style={{ color: line.c }}>{line.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* blinking cursor */}
        {visibleLines < LOG_LINES.length && (
          <div className="flex items-center gap-3">
            <span className="text-white/25">
              {LOG_LINES[visibleLines]?.t ?? ""}
            </span>
            <span
              className="inline-block h-3.5 w-[7px] rounded-sm"
              style={{
                background: "#3FCFD5",
                animation: "pulse-glow 1s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Live metrics strip
───────────────────────────────────────────── */
function MetricsStrip() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
      {METRICS.map((m, i) => (
        <Reveal key={m.label} delay={i * 0.06}>
          <div
            className="group relative overflow-hidden rounded-2xl border px-4 py-3.5 text-center transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: `rgba(${m.color === "#3FCFD5" ? "63,207,213" : "168,208,58"},0.15)`,
              background: `rgba(${m.color === "#3FCFD5" ? "63,207,213" : "168,208,58"},0.04)`,
            }}
          >
            <p
              className="font-display text-xl font-bold leading-none"
              style={{ color: m.color }}
            >
              {m.value}
            </p>
            <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/35">
              {m.label}
            </p>
            {/* hover glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, rgba(${m.color === "#3FCFD5" ? "63,207,213" : "168,208,58"},0.12), transparent 70%)`,
              }}
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating data-flow particles (decorative)
───────────────────────────────────────────── */
function DataParticles({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: `${(i * 57 + 5) % 96}%`,
    y: `${(i * 41 + 8) % 90}%`,
    size: i % 3 === 0 ? 3 : 2,
    color: i % 2 === 0 ? "var(--cyan)" : "var(--lime)",
    delay: i * 0.35,
    dur: 4 + (i % 4),
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.4, 1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main section export
───────────────────────────────────────────── */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yWord = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const yGlow = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Technical Architecture — Our Engineering Foundation"
      className="relative overflow-hidden py-10 md:py-16"
    >
      {/* ── Background layers ── */}
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <motion.div
        style={reduce ? undefined : { y: yGlow }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 40% at 50% 60%, rgba(63,207,213,0.07), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Watermark word */}
      <motion.span
        style={reduce ? undefined : { y: yWord }}
        aria-hidden="true"
        className="pointer-events-none absolute end- top-16 select-none whitespace-nowrap font-display text-[14vw] font-bold uppercase leading-none tracking-tight text-white/[0.022] md:text-[10vw]"
      >
        Architecture
      </motion.span>

      {/* Floating particles */}
      <DataParticles reduced={!!reduce} />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Section header */}
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-lime">
            04 — Enterprise Architecture
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.04] md:text-6xl">
              Infrastructure built
              <br />
              <span className="text-gradient">for every stage of growth.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              Cloud-native, distributed architectures with automated CI/CD, enterprise-grade security, and multi-region reliability — built to scale alongside your business.
            </p>
          </div>
        </Reveal>

        {/* ── Main architecture diagram ── */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            {/* Diagram container */}
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] p-5 sm:p-7 md:p-10"
              style={{
                background:
                  "linear-gradient(150deg, rgba(20,28,40,0.95) 0%, rgba(10,14,20,0.98) 100%)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px -20px rgba(0,0,0,0.6)",
              }}
            >
              {/* SVG connection lines */}
              <ConnectionLines reduced={!!reduce} />

              {/* Corner accent glows */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute start- -top-16 h-48 w-48 rounded-full blur-3xl opacity-20"
                style={{ background: "var(--cyan)" }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16-end- h-48 w-48 rounded-full blur-3xl opacity-15"
                style={{ background: "var(--lime)" }}
              />

              {/* Diagram header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{ background: "rgba(63,207,213,0.12)", border: "1px solid rgba(63,207,213,0.2)" }}
                  >
                    <Cpu size={15} style={{ color: "var(--cyan)" }} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                    System Architecture — Production Stack
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: "var(--lime)",
                      boxShadow: "0 0 8px var(--lime)",
                      animation: "pulse-glow 2s ease-in-out infinite",
                    }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--lime)" }}>
                    All Systems Operational
                  </span>
                </div>
              </div>

              {/* Architecture layers */}
              <div className="relative flex flex-col gap-5 md:gap-6">
                {LAYERS.map((layer, i) => (
                  <ArchLayer key={layer.id} layer={layer} index={i} />
                ))}
              </div>

              {/* Bottom scan line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 h-[1px] opacity-15 animate-scan"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--cyan), transparent)",
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* ── Two-column: terminal + feature list ── */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2">

          {/* LEFT — deployment terminal */}
          <Reveal delay={0.05}>
            <DeployTerminal />
          </Reveal>

          {/* RIGHT — capability list */}
          <Reveal delay={0.1}>
            <div
              className="flex flex-col justify-between gap-5 rounded-2xl border border-white/[0.07] p-6 md:p-7"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div>
                <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.28em] text-white/30">
                  Engineering Capabilities
                </p>
                <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                  Built for performance
                  <br />
                  <span className="text-gradient">& resilience.</span>
                </h3>
              </div>

              <ul className="space-y-3">
                {[
                  { icon: Zap,         text: "Sub-50ms API response times with edge caching" },
                  { icon: Layers,      text: "Multi-region deployments with automatic failover" },
                  { icon: GitBranch,   text: "Zero-downtime CI/CD with automated rollback" },
                  { icon: Shield,      text: "SOC2 / HIPAA compliant security architecture" },
                  { icon: Activity,    text: "Real-time observability with distributed tracing" },
                  { icon: CheckCircle2,text: "99.99% uptime SLA with 24/7 incident response" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={text}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                      style={{
                        background: i % 2 === 0 ? "rgba(63,207,213,0.1)" : "rgba(168,208,58,0.1)",
                        color: i % 2 === 0 ? "var(--cyan)" : "var(--lime)",
                      }}
                    >
                      <Icon size={11} aria-hidden="true" />
                    </span>
                    {text}
                  </motion.li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan transition-all duration-200 hover:gap-3"
              >
                Discuss your architecture
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Live metrics strip ── */}
        <div className="mt-10 md:mt-12">
          <Reveal>
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
              Live System Metrics
            </p>
          </Reveal>
          <MetricsStrip />
        </div>

      </div>
    </section>
  );
}
