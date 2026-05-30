import { Reveal } from "../Reveal";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$4.9k",
    period: "avg / project",
    desc: "Perfect for validation, early MVPs, sleek landing pages, and interactive prototypes.",
    features: [
      "Custom UI/UX Design (Figma)",
      "High-Performance Web App (Next.js/React)",
      "Basic Database Integration",
      "SEO & Speed Optimization",
      "30 Days Post-Launch Support",
      "Standard Communication Channel",
    ],
    recommended: false,
    cta: "Validate Your Idea",
  },
  {
    name: "Business",
    price: "$12.5k",
    period: "avg / project",
    desc: "Designed for scaling brands, custom secure SaaS, and native cross-platform mobile apps.",
    features: [
      "Everything in Starter",
      "iOS & Android Mobile App (Flutter)",
      "Complex Database Integration (Postgre/NoSQL)",
      "Admin Control Panel & Dashboard Analytics",
      "Dedicated Project Manager",
      "90 Days Post-Launch Maintenance",
      "Direct Private Slack Channel",
    ],
    recommended: true,
    cta: "Launch Your Platform",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact for quote",
    desc: "For customized multi-tenant SaaS, complex internal ERP suites, and heavy high-volume architectures.",
    features: [
      "Everything in Business",
      "Custom ERP & System Automation Integrations",
      "High-Load Cloud Scale (AWS/Kubernetes)",
      "Strict HIPAA / SOC2 Compliance Alignment",
      "Bi-Weekly Strategy & Code Audit Sessions",
      "24/7 Priority Emergency Support SLA",
      "Dedicated Full-Stack Developer Pods",
    ],
    recommended: false,
    cta: "Scale Your Business",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-16 md:py-24">
      {/* Glow shapes */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            09 — Pricing Structures
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12 md:mb-24">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              Predictable models,
              <br />
              <span className="text-gradient">engineered to deliver.</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              Transparent, value-driven structures aligned with your engineering scope. No hidden fees, clear milestones, and clean delivery.
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
                  <div className="absolute right-8 top-0 -translate-y-1/2 rounded-full bg-gradient-brand px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-primary-foreground shadow-[0_0_20px_rgba(63,207,213,0.4)]">
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
