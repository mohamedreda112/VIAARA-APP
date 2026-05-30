import { Reveal } from "../Reveal";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-card/80 via-card/45 to-transparent p-10 md:p-20 text-center">
            {/* Background elements */}
            <div className="bg-gradient-glow absolute inset-0 -z-20 opacity-30" />
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-cyan/10 blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute right-1/4 top-1/3 -z-10 h-64 w-64 rounded-full bg-lime/10 blur-3xl pointer-events-none animate-pulse-glow" />

            {/* Content */}
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-6">
              Launch Your Product
            </p>
            <h2 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
              Let’s build your next
              <br />
              <span className="text-gradient">digital system together.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
              Partner with a dedicated engineering pod of senior developers and designers focused on launching premium code, secure databases, and flawless UX.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-xs font-mono uppercase tracking-wider font-bold text-primary-foreground shadow-[0_0_40px_-10px_var(--cyan)] transition-transform hover:scale-[1.04]"
              >
                Start Your Project
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-xs font-mono uppercase tracking-wider font-bold text-foreground transition-all duration-300 hover:bg-white/10"
              >
                <Calendar size={14} className="text-lime" />
                Schedule a Consultation
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
