import { Reveal } from "../Reveal";
import {
  ArrowUpRight, ShoppingBag, Layers, Smartphone,
  Brain, ShieldAlert, Home, Eye,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { ProjectModal, type ProjectData } from "../ProjectModal";

type Category = "All" | "Web Apps" | "Mobile Apps" | "AI Solutions" | "ERP Systems";
const CATEGORIES: Category[] = ["All", "Web Apps", "Mobile Apps", "AI Solutions", "ERP Systems"];

/* ─── Mockup JSX helpers (kept identical to original) ─── */
const AuraCommerceMockup = (
  <div className="relative h-full w-full bg-slate-950 p-4 font-mono text-[9px] text-cyan/70 select-none overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
      <span className="text-[10px] font-bold text-foreground">AURASHOP</span>
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-lg border border-cyan/20 bg-cyan/5 p-2 flex flex-col justify-between h-20">
        <span>Prod_01_Mesh</span>
        <span className="text-xs font-bold text-foreground font-sans">$89.00</span>
      </div>
      <div className="rounded-lg border border-lime/20 bg-lime/5 p-2 flex flex-col justify-between h-20">
        <span>Prod_02_Lumen</span>
        <span className="text-xs font-bold text-foreground font-sans">$120.00</span>
      </div>
    </div>
    <div className="mt-2.5 rounded-lg border border-white/5 bg-white/5 p-2 flex items-center justify-between">
      <span className="text-[8px] text-muted-foreground">🛒 Checkout completed</span>
      <span className="text-lime font-bold font-sans">+$209.00</span>
    </div>
    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-cyan/15 blur-xl pointer-events-none" />
  </div>
);

const CoreERPMockup = (
  <div className="relative h-full w-full bg-zinc-950 p-4 font-mono text-[9px] text-lime/70 select-none overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
      <span className="text-[10px] font-bold text-foreground">ERP_CORE_LOGS</span>
      <span className="rounded bg-lime/10 px-1 text-[8px] text-lime uppercase font-bold tracking-wider">Sync Active</span>
    </div>
    <div className="space-y-1.5 text-[8px]">
      <div className="flex items-center justify-between py-1 border-b border-white/5">
        <span>📦 DB_WHAREHOUSE_1</span><span className="text-foreground">94.8% Cap</span>
      </div>
      <div className="flex items-center justify-between py-1 border-b border-white/5">
        <span>📊 FINANCIALS_SYNC</span><span className="text-lime font-bold">100% OK</span>
      </div>
      <div className="flex items-center justify-between py-1 border-b border-white/5">
        <span>🚚 FREIGHT_AUTO_ROUT</span><span className="text-foreground">12 En Route</span>
      </div>
    </div>
    <div className="mt-3 flex items-center gap-1">
      <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
      <span className="text-[7.5px] text-muted-foreground">Worker loop status: idle_waiting</span>
    </div>
    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-lime/15 blur-xl pointer-events-none" />
  </div>
);

const DelivgoMockup = (
  <div className="relative h-full w-full bg-slate-950 flex justify-center items-center select-none overflow-hidden p-2">
    <div className="w-[110px] h-[140px] rounded-2xl border-4 border-white/10 bg-black/60 relative overflow-hidden flex flex-col p-1.5">
      <div className="w-10 h-1.5 bg-white/10 rounded-full mx-auto mb-1.5" />
      <div className="flex-1 rounded-lg bg-zinc-950 border border-white/5 relative overflow-hidden flex flex-col p-1.5">
        <span className="text-[7px] text-muted-foreground font-mono">MAPS_NAV</span>
        <div className="flex-1 border border-dashed border-cyan/20 rounded-md relative flex justify-center items-center mt-1">
          <svg className="absolute inset-0 w-full h-full stroke-cyan/35 stroke-[1.5] fill-none" viewBox="0 0 100 80" aria-hidden="true">
            <path d="M10 70 Q 50 10, 90 60" />
            <path d="M10 70 Q 30 50, 70 30" strokeDasharray="3 3" className="stroke-lime" />
          </svg>
          <span className="absolute left-2 bottom-4 h-2 w-2 rounded-full bg-cyan animate-ping" />
          <span className="absolute left-2 bottom-4 h-2 w-2 rounded-full bg-cyan" />
          <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-lime" />
          <span className="text-[6px] font-sans bg-black/80 text-foreground px-1 py-0.5 rounded absolute bottom-1">Courier: 2.1km</span>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-cyan/15 blur-xl pointer-events-none" />
  </div>
);

const InsightAIMockup = (
  <div className="relative h-full w-full bg-zinc-950 p-4 font-mono text-[9px] text-cyan/70 select-none overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
      <span className="text-[10px] font-bold text-foreground">MODEL_TRAINING</span>
      <span className="text-[8px] text-lime">Epoch 48/100</span>
    </div>
    <div className="h-14 w-full flex items-end gap-1.5 border-b border-l border-white/10 pb-1 pl-1">
      <div className="w-full h-1/3 bg-gradient-to-t from-cyan/30 to-transparent rounded-sm" />
      <div className="w-full h-1/2 bg-gradient-to-t from-cyan/40 to-transparent rounded-sm" />
      <div className="w-full h-2/3 bg-gradient-to-t from-cyan/50 to-transparent rounded-sm" />
      <div className="w-full h-5/6 bg-gradient-to-t from-cyan/60 to-transparent rounded-sm relative">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[6px] text-lime">Peak</span>
      </div>
    </div>
    <div className="mt-2.5 grid grid-cols-2 gap-2 text-[7.5px] text-muted-foreground">
      <span>Accuracy: <span className="text-foreground">98.4%</span></span>
      <span>Loss rate: <span className="text-foreground">0.012</span></span>
    </div>
    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-lime/15 blur-xl pointer-events-none" />
  </div>
);

const CareFlowMockup = (
  <div className="relative h-full w-full bg-slate-950 p-4 font-mono text-[9px] text-cyan/70 select-none overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
      <span className="text-[10px] font-bold text-foreground">CARE_STREAM_SECURE</span>
      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      <div className="col-span-2 rounded-lg border border-white/10 bg-black/40 h-16 relative overflow-hidden flex items-center justify-center">
        <svg className="w-full h-6 stroke-cyan stroke-[1.5] fill-none" viewBox="0 0 80 30" aria-hidden="true">
          <path d="M 0 15 L 20 15 L 25 5 L 30 25 L 35 15 L 55 15 L 60 5 L 65 25 L 70 15 L 80 15" />
        </svg>
        <span className="absolute left-1 top-1 text-[6.5px] text-lime">ECG Live</span>
      </div>
      <div className="rounded-lg border border-white/10 bg-cyan/5 h-16 flex flex-col justify-center items-center text-center">
        <span className="text-xs font-bold text-foreground font-sans">74</span>
        <span className="text-[6.5px] text-muted-foreground uppercase font-sans">BPM</span>
      </div>
    </div>
    <div className="mt-2.5 rounded-lg border border-white/5 bg-white/5 p-1.5 flex items-center justify-between text-[7.5px] text-muted-foreground">
      <span>🩺 Consult: Dr. Adams</span>
      <span className="text-lime font-bold">CONNECTED</span>
    </div>
    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-cyan/15 blur-xl pointer-events-none" />
  </div>
);

const AcreEdgeMockup = (
  <div className="relative h-full w-full bg-zinc-950 p-4 font-mono text-[9px] text-lime/70 select-none overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
      <span className="text-[10px] font-bold text-foreground">ACRE_VALUATION</span>
      <span className="text-cyan font-bold text-[8px] font-sans">MAPBOX API</span>
    </div>
    <div className="grid grid-cols-2 gap-2 h-14">
      <div className="rounded-lg border border-white/5 bg-white/5 p-1.5 flex flex-col justify-between">
        <span className="text-[7.5px] text-muted-foreground">Premium Villa</span>
        <span className="text-[9px] text-foreground font-bold font-sans">$1.2M Val</span>
      </div>
      <div className="rounded-lg border border-dashed border-lime/30 bg-lime/5 p-1.5 flex flex-col justify-center items-center">
        <span className="text-[12px]">🏠</span>
        <span className="text-[7px] text-muted-foreground mt-0.5">Plot_X9</span>
      </div>
    </div>
    <div className="mt-2 rounded-lg border border-white/5 bg-white/5 p-1.5 flex justify-between items-center text-[7.5px] text-muted-foreground">
      <span>🗺️ Coordinates: 52.5200, 13.4050</span>
      <span className="text-lime font-bold">100% Valid</span>
    </div>
    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-lime/15 blur-xl pointer-events-none" />
  </div>
);

/* ─── Full project data with modal fields ─── */
const projects: ProjectData[] = [
  {
    title: "AuraCommerce",
    category: "Web Apps",
    year: "2024",
    desc: "A high-performance headless commerce ecosystem built around Next.js and Shopify APIs, optimized for sub-100ms LCP.",
    longDesc: "AuraCommerce is a fully headless, API-first e-commerce platform engineered for extreme performance. Built on Next.js 14 with React Server Components, it achieves sub-100ms Largest Contentful Paint scores. The checkout pipeline integrates Stripe's Payment Intents API with 3D Secure support, while a custom GraphQL layer aggregates product data from multiple Shopify storefronts in real time.",
    tech: ["Next.js", "Stripe", "GraphQL", "Tailwind", "Shopify API", "Vercel Edge"],
    accentColor: "rgba(63,207,213,0.25)",
    accentColorSolid: "#3FCFD5",
    icon: ShoppingBag,
    mockup: AuraCommerceMockup,
    screenshots: [CoreERPMockup, InsightAIMockup, DelivgoMockup, AcreEdgeMockup],
    stats: [
      { label: "LCP Score", value: "<100ms" },
      { label: "Conversion", value: "+34%" },
      { label: "Uptime", value: "99.99%" },
      { label: "Monthly Users", value: "120k+" },
    ],
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "CoreERP",
    category: "ERP Systems",
    year: "2023",
    desc: "A custom multi-tenant enterprise suite consolidating finances, automated inventories, HR workflows, and active logistics.",
    longDesc: "CoreERP is a battle-tested multi-tenant SaaS platform built for global supply chain operations. It unifies financial ledgers, warehouse inventory, HR payroll, and freight routing into a single real-time dashboard. The system processes over $50M in annual transactions with millisecond-level database synchronization via PostgreSQL logical replication and Redis pub/sub event streaming.",
    tech: ["Laravel", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS RDS"],
    accentColor: "rgba(168,208,58,0.25)",
    accentColorSolid: "#A8D03A",
    icon: Layers,
    mockup: CoreERPMockup,
    screenshots: [AuraCommerceMockup, InsightAIMockup, CareFlowMockup],
    stats: [
      { label: "Transactions/yr", value: "$50M+" },
      { label: "Sync Latency", value: "<5ms" },
      { label: "Modules", value: "12" },
      { label: "Active Users", value: "800+" },
    ],
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "Delivgo Mobile",
    category: "Mobile Apps",
    year: "2024",
    desc: "A real-time cross-platform food delivery mobile application equipped with precise live geolocation tracking APIs.",
    longDesc: "Delivgo is a production-grade Flutter application delivering a seamless food ordering experience on both iOS and Android from a single codebase. It features real-time courier tracking via Mapbox Navigation SDK, Firebase Realtime Database for order state sync, push notifications through FCM, and an offline-first architecture with local SQLite caching for low-connectivity environments.",
    tech: ["Flutter", "Firebase", "Node.js", "Mapbox", "FCM", "SQLite"],
    accentColor: "rgba(63,207,213,0.25)",
    accentColorSolid: "#3FCFD5",
    icon: Smartphone,
    mockup: DelivgoMockup,
    screenshots: [AuraCommerceMockup, CoreERPMockup, InsightAIMockup],
    stats: [
      { label: "Platforms", value: "iOS + Android" },
      { label: "Tracking", value: "Real-time" },
      { label: "App Rating", value: "4.8 ★" },
      { label: "Daily Orders", value: "5k+" },
    ],
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "InsightAI Dashboard",
    category: "AI Solutions",
    year: "2024",
    desc: "An intelligent operations dashboard that processes autonomous model metrics and GPU/CPU training loads in real-time.",
    longDesc: "InsightAI is a full-stack MLOps observability platform that streams live training telemetry from PyTorch and TensorFlow workloads. A FastAPI WebSocket server pushes GPU utilization, loss curves, and accuracy metrics to a React dashboard in under 50ms. Custom embedding visualizations and automated anomaly detection alerts help data science teams catch training regressions before they compound.",
    tech: ["React", "Python", "FastAPI", "PyTorch", "WebSocket", "TensorFlow"],
    accentColor: "rgba(168,208,58,0.25)",
    accentColorSolid: "#A8D03A",
    icon: Brain,
    mockup: InsightAIMockup,
    screenshots: [AuraCommerceMockup, CoreERPMockup, DelivgoMockup],
    stats: [
      { label: "Latency", value: "<50ms" },
      { label: "Model Accuracy", value: "98.4%" },
      { label: "GPU Clusters", value: "16" },
      { label: "Data Points/s", value: "10k+" },
    ],
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "CareFlow Telehealth",
    category: "Web Apps",
    year: "2023",
    desc: "A secure HIPAA-compliant telehealth patient portal integrating real-time WebRTC audio-visual streaming and patient files.",
    longDesc: "CareFlow is a HIPAA-compliant telehealth platform enabling secure doctor-patient video consultations via WebRTC peer connections with TURN/STUN relay fallback. Patient records, prescriptions, and ECG data are encrypted at rest with AES-256 and in transit via TLS 1.3. The system integrates with HL7 FHIR APIs for EHR interoperability and supports real-time biometric streaming from connected medical devices.",
    tech: ["Next.js", "WebRTC", "FastAPI", "MongoDB", "FHIR API", "AES-256"],
    accentColor: "rgba(63,207,213,0.25)",
    accentColorSolid: "#3FCFD5",
    icon: ShieldAlert,
    mockup: CareFlowMockup,
    screenshots: [InsightAIMockup, CoreERPMockup, AuraCommerceMockup],
    stats: [
      { label: "Compliance", value: "HIPAA" },
      { label: "Encryption", value: "AES-256" },
      { label: "Consultations", value: "2k+/mo" },
      { label: "Uptime SLA", value: "99.95%" },
    ],
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "AcreEdge Real Estate",
    category: "Web Apps",
    year: "2024",
    desc: "An intelligent property listing platform leveraging interactive geospatial maps and automated evaluations.",
    longDesc: "AcreEdge is a next-generation real estate intelligence platform combining interactive Mapbox GL JS maps with an AI-powered automated valuation model (AVM). Property listings are enriched with geospatial data layers including school districts, flood zones, and transit scores. The valuation engine uses a gradient-boosted regression model trained on 2M+ historical transactions to generate instant price estimates with confidence intervals.",
    tech: ["React", "Node.js", "MongoDB", "Mapbox GL", "Python ML", "AWS S3"],
    accentColor: "rgba(168,208,58,0.25)",
    accentColorSolid: "#A8D03A",
    icon: Home,
    mockup: AcreEdgeMockup,
    screenshots: [AuraCommerceMockup, DelivgoMockup, InsightAIMockup, CareFlowMockup],
    stats: [
      { label: "Listings", value: "50k+" },
      { label: "Valuation Accuracy", value: "96.2%" },
      { label: "Map Layers", value: "18" },
      { label: "Monthly Searches", value: "200k+" },
    ],
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
];

/* ─── Main section ─── */
export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filtered = useMemo(
    () => activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  const openModal = useCallback((p: ProjectData) => setSelectedProject(p), []);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section id="projects" className="relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
              05 — Portfolio Showcase
            </p>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-10">
              <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
                Featured projects,
                <br />
                <span className="text-gradient">engineered to scale.</span>
              </h2>
              <p className="max-w-md text-muted-foreground">
                A curated collection of highly robust websites, high-availability mobile apps, and custom enterprise tools developed for our elite global partners.
              </p>
            </div>
          </Reveal>

          {/* Category Filters */}
          <Reveal delay={0.1}>
            <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className={`relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === cat
                      ? "bg-gradient-brand text-primary-foreground shadow-[0_0_20px_-6px_var(--cyan)]"
                      : "border border-white/10 bg-white/5 text-muted-foreground hover:border-cyan/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard p={p} onOpen={openModal} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Modal portal */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </>
  );
}

/* ─── Project card ─── */
function ProjectCard({
  p,
  onOpen,
}: {
  p: ProjectData;
  onOpen: (p: ProjectData) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-card/40 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-cyan/40 hover:bg-card"
      whileHover={reduce ? undefined : { boxShadow: `0 20px 40px -12px ${p.accentColor}` }}
    >
      {/* Mockup header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-zinc-950/60">
        {p.mockup}

        {/* Category pill */}
        <div className="absolute left-4 top-4 rounded-full glass px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-cyan">
          {p.category}
        </div>

        {/* Eye button — clickable, with pulse ring */}
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
            {/* Pulse rings */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-cyan/20 opacity-0 group-hover:opacity-100 animate-ping"
              style={{ animationDuration: "1.6s" }}
            />
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full border border-cyan/20 opacity-0 group-hover:opacity-100 animate-ping"
              style={{ animationDuration: "2.2s", animationDelay: "0.3s" }}
            />
            <Eye size={22} aria-hidden="true" />
          </motion.button>
        </div>

        {/* Dark overlay on hover */}
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
            {p.title}
          </h3>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {p.desc}
        </p>

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

        {/* Footer row */}
        <div className="mt-6 border-t border-white/5 pt-5 flex items-center justify-between">
          <button
            onClick={() => onOpen(p)}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-cyan focus-visible:outline-none focus-visible:text-cyan"
            aria-label={`View case study for ${p.title}`}
          >
            View Case Study
          </button>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.article>
  );
}
