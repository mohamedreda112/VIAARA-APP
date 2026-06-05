import { Reveal } from "../Reveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const faqs = [
  {
    q: "How long does a typical software project take?",
    a: "A typical MVP or web application takes between 4 to 8 weeks depending on complexity. Full-scale enterprise platforms, custom SaaS products, or cross-platform mobile applications generally require 10 to 16 weeks, based on scope, integrations, and required compliance.",
  },
  {
    q: "What technologies do you specialise in?",
    a: "Our core stack spans React and Next.js for frontend, Node.js, Python (FastAPI), and Laravel for backend services, Flutter for mobile, and PostgreSQL, MongoDB, and Redis for data management. Infrastructure is deployed on AWS using Docker and Kubernetes for container orchestration.",
  },
  {
    q: "Do you provide post-launch maintenance and support?",
    a: "Yes. Every project includes a structured post-launch support period to address any issues or refinements. We also offer ongoing retainer arrangements covering performance optimisation, security monitoring, infrastructure management, and feature development.",
  },
  {
    q: "Can you modernise or migrate an existing system?",
    a: "Yes. We regularly help organisations migrate legacy systems, refactor existing codebases, and redesign outdated interfaces — without disrupting ongoing operations. This includes database migrations, API modernisation, and platform re-architecturing.",
  },
  {
    q: "Do you build cross-platform mobile applications?",
    a: "Yes. We build cross-platform mobile applications using Flutter, which produces fully native iOS and Android experiences from a shared codebase. This includes offline capabilities, biometric authentication, push notifications, and real-time data synchronisation.",
  },
];

export function FAQ() {
  const { t } = useTranslation();
  const faqsRaw = t('faq.items', { returnObjects: true });
  const faqs = Array.isArray(faqsRaw) ? faqsRaw as { q: string; a: string }[] : [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="relative overflow-hidden py-10 md:py-16 bg-black/10">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            {t('faq.badge')}
          </p>
          <h2 className="text-center font-display text-4xl font-semibold leading-[1.05] md:text-6xl mb-8 md:mb-20">
            {t('faq.title1')}
            <br />
            <span className="text-gradient">{t('faq.title2')}</span>
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
                    className="flex w-full items-center justify-between p-5 text-start outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-inset sm:p-6"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-display text-sm font-bold text-foreground pe-4 sm:text-base">
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
