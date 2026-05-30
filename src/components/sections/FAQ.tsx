import { Reveal } from "../Reveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long does a typical software project take?",
    a: "A typical Minimum Viable Product (MVP) or custom landing page takes between 3 to 6 weeks. More complex enterprise applications, full-scale SaaS platforms, or dual cross-platform mobile applications can take between 8 to 14 weeks depending on the database schemas and third-party integrations required.",
  },
  {
    q: "What modern technologies do you specialize in?",
    a: "Our core engineering ecosystem revolves around high-performance frameworks and runtimes. For frontend, we use React and Next.js. For backend microservices, we leverage Node.js, Python (FastAPI), and Laravel. Mobile solutions are built on Flutter, and databases are structured in PostgreSQL, MongoDB, and AWS clusters.",
  },
  {
    q: "Do you provide post-launch maintenance & support?",
    a: "Absolutely. Every project includes a complimentary 30 to 90-day support SLA to fix bugs and address launch issues. Afterward, we offer structured monthly retainer plans covering continuous performance optimization, security audits, database cleanups, and scaling.",
  },
  {
    q: "Can you modernize or redesign our existing system?",
    a: "Yes. We frequently help companies migrate their legacy database tables, clean up bloated architectures, and completely redesign obsolete user interfaces into modern, fast, and accessible SaaS platforms without interrupting active operations.",
  },
  {
    q: "Do you build cross-platform mobile applications?",
    a: "Yes, we specialize in high-end mobile engineering utilizing Flutter. This compiles into fully native iOS and Android experiences with absolute fluid rendering, 60fps animations, local biometric authentications, and offline sync.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="relative overflow-hidden py-16 md:py-24 bg-black/10">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.3em] text-lime">
            11 — Client Queries
          </p>
          <h2 className="text-center font-display text-4xl font-semibold leading-[1.05] md:text-6xl mb-12 md:mb-20">
            Frequently asked
            <br />
            <span className="text-gradient">questions & answers.</span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const btnId   = `faq-btn-${i}`;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="rounded-[1.5rem] border border-white/10 bg-card/45 backdrop-blur overflow-hidden transition-colors hover:border-cyan/30">
                  <button
                    id={btnId}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-inset sm:p-6"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-display text-sm font-bold text-foreground pr-4 sm:text-base">
                      {f.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-cyan"
                      aria-hidden="true"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
