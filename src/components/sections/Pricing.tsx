import { Reveal } from "../Reveal";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$4.9k",
    period: "avg / project",
    desc: "For early-stage products, MVPs, and standalone web applications that need quality engineering from the start.",
    features: [
      "Custom UI/UX Design (Figma)",
      "High-Performance Web Application (Next.js/React)",
      "Database Design & Integration",
      "SEO & Performance Optimisation",
      "30 Days Post-Launch Support",
      "Dedicated Communication Channel",
    ],
    recommended: false,
    cta: "Start Your Project",
  },
  {
    name: "Business",
    price: "$12.5k",
    period: "avg / project",
    desc: "For growing businesses building scalable SaaS platforms, enterprise tools, or cross-platform mobile products.",
    features: [
      "Everything in Starter",
      "iOS & Android Mobile App (Flutter)",
      "Complex Database Architecture (PostgreSQL/NoSQL)",
      "Admin Dashboard & Analytics Panel",
      "Dedicated Project Manager",
      "90 Days Post-Launch Maintenance",
      "Direct Communication Channel",
    ],
    recommended: true,
    cta: "Scale Your Product",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact for quote",
    desc: "For complex multi-tenant platforms, enterprise integrations, high-volume systems, and regulated industry requirements.",
    features: [
      "Everything in Business",
      "Custom Enterprise Systems & Workflow Automation",
      "High-Availability Cloud Infrastructure (AWS/Kubernetes)",
      "HIPAA / SOC2 Compliance Alignment",
      "Bi-Weekly Strategy & Architecture Reviews",
      "24/7 Priority Support SLA",
      "Dedicated Full-Stack Engineering Team",
    ],
    recommended: false,
    cta: "Request a Proposal",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-10 md:py-16">
      {/* Glow shapes */}
      <div className="absolute -start-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            11 — Pricing
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-8 md:mb-24">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              Transparent investment,
              <br />
              <span className="text-gradient">structured for delivery.</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              Clear, value-driven engagement models aligned to your project scope. No hidden fees, defined milestones, and accountable delivery at every stage.
            </p>
          </div>
        </Reveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <motion.article
                className={`relative flex flex-col justify-between rounded-[2rem] p-7 md:p-10 backdrop-blur transition-all duration-500 h-full ${
                  p.recommended
                    ? "glass-strong border-2 border-cyan/40 shadow-[0_0_50px_-10px_rgba(63,207,213,0.25)] lg:scale-[1.03]"
                    : "glass border border-white/10 bg-card/30 hover:border-white/20 hover:bg-card/50"
                }`}
                whileHover={{ y: p.recommended ? -6 : -4 }}
              >
                {/* Recommended Float */}
                {p.recommended && (
                  <div className="absolute top-0 -translate-y-1/2 rounded-full bg-gradient-brand px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-primary-foreground shadow-[0_0_20px_rgba(63,207,213,0.4)]">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>

                  {/* Price display */}
                  <div className="mt-8 border-b border-white/5 pb-8 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold text-gradient leading-none">
                      {p.price}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      / {p.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="mt-8 space-y-4">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3.5 text-xs text-muted-foreground">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.recommended ? "bg-cyan/10 text-cyan" : "bg-white/5 text-lime"}`}>
                          <Check size={12} />
                        </span>
                        <span className="leading-normal">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-12">
                  <a
                    href="#contact"
                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 ${
                      p.recommended
                        ? "bg-gradient-brand text-primary-foreground shadow-md hover:scale-[1.01]"
                        : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
                    }`}
                  >
                    {p.cta}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
