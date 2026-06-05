import { Reveal } from "@/components/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function WhoWeAre() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-16">
      {/* Background elements */}
      <div className="pointer-events-none absolute top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-cyan/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20 items-start">
          
          {/* Left Column: Heading */}
          <Reveal>
            <div>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                {t('whoWeAre.badge')}
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl">
                {t('whoWeAre.title1')} <br className="hidden md:block" />
                <span className="text-gradient">{t('whoWeAre.title2')}</span>
              </h2>
            </div>
          </Reveal>

          {/* Right Column: Content */}
          <Reveal delay={0.15}>
            <div className="relative">
              {/* Premium structural border */}
              <div 
                className="absolute start- top-0 h-full w-[2px] bg-gradient-to-b from-cyan/40 via-cyan/10 to-transparent hidden md:block"
                aria-hidden="true" 
              />
              
              <div className="space-y-6 text-base leading-[1.8] text-muted-foreground md:text-lg">
                <p>
                  <strong className="font-semibold text-foreground">{t('whoWeAre.p1_1')}</strong>{t('whoWeAre.p1_2')}
                </p>
                <p>
                  {t('whoWeAre.p2')}
                </p>
              </div>

              {/* Decorative Tech Nodes */}
              <div className="mt-10 flex gap-4 hidden sm:flex">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-8 rounded-full bg-white/10"
                    animate={reduce ? undefined : { backgroundColor: ["rgba(255,255,255,0.1)", "rgba(63,207,213,0.4)", "rgba(255,255,255,0.1)"] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
