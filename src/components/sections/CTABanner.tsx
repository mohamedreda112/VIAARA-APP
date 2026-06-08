import { Reveal } from "../Reveal";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function CTABanner() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-card/80 via-card/45 to-transparent px-6 py-8 md:p-20 text-center mx-auto w-[92%] max-w-[420px] md:w-full md:max-w-none">
            {/* Background elements */}
            <div className="bg-gradient-glow absolute inset-0 -z-20 opacity-30" />
            <div className="absolute -start-1/4 top-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-cyan/10 blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute -start-1/4 top-1/3 -z-10 h-64 w-64 rounded-full bg-lime/10 blur-3xl pointer-events-none animate-pulse-glow" />

            {/* Content */}
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-4 md:mb-4">
              {t('cta.badge')}
            </p>
            <h2 className="mx-auto max-w-[340px] md:max-w-4xl font-display text-[clamp(32px,8vw,42px)] md:text-6xl font-bold md:font-semibold leading-[1.05] md:leading-[1.02] tracking-tight text-center text-balance md:text-wrap">
              {t('cta.title1')}
              <span className="md:hidden"> </span>
              <br className="hidden md:block" />
              <span className="text-gradient">{t('cta.title2')}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[300px] md:max-w-xl text-[16px] md:text-base leading-[1.8] text-muted-foreground text-center">
              {t('cta.description')}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-4 md:mt-8">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 rounded-2xl md:rounded-full bg-gradient-brand w-full max-w-[320px] md:w-auto h-[52px] md:h-auto md:px-8 md:py-4 text-xs font-mono uppercase tracking-wider font-bold text-primary-foreground shadow-[0_0_40px_-10px_var(--cyan)] transition-transform hover:scale-[1.04]"
              >
                {t('cta.button1')}
                <ArrowRight size={14} className="transition-transform rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5 rtl:rotate-180" />
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 rounded-2xl md:rounded-full border border-white/15 bg-white/5 w-full max-w-[320px] md:w-auto h-[52px] md:h-auto md:px-8 md:py-4 text-xs font-mono uppercase tracking-wider font-bold text-foreground transition-all duration-300 hover:bg-white/10"
              >
                <Calendar size={14} className="text-lime" />
                {t('cta.button2')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
