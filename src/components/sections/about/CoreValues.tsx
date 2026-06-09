import { Reveal } from "@/components/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import { Lightbulb, ShieldCheck, Handshake, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const VALUES = [
  {
    title: "Innovation",
    desc: "Constantly exploring new technologies and better solutions to keep our clients ahead of the curve.",
    icon: Lightbulb,
    accent: "cyan"
  },
  {
    title: "Quality",
    desc: "Unwavering commitment to engineering excellence, scalable architectures, and long-term reliability.",
    icon: ShieldCheck,
    accent: "lime"
  },
  {
    title: "Integrity",
    desc: "Transparent communication, honest timelines, and building trusted partnerships based on mutual respect.",
    icon: Handshake,
    accent: "cyan"
  },
  {
    title: "Agility",
    desc: "Rapid adaptation to changing business requirements and market dynamics without sacrificing quality.",
    icon: Zap,
    accent: "lime"
  }
];

export function CoreValues() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-10 md:py-16 bg-background/50">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
              {t('coreValues.badge')}
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-5xl">
              {t('coreValues.title1')} <span className="text-gradient">{t('coreValues.title2')}</span>
            </h2>
            <p className="mt-5 text-sm text-muted-foreground md:text-base">
              {t('coreValues.desc')}
            </p>
          </div>
        </Reveal>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, idx) => {
            const isCyan = val.accent === "cyan";
            return (
              <Reveal key={val.title} delay={idx * 0.1}>
                <motion.div
                  className={`group relative h-full rounded-2xl border bg-card/20 p-8 transition-all duration-300 hover:bg-card/60 ${
                    isCyan 
                      ? "border-white/5 hover:border-cyan/30" 
                      : "border-white/5 hover:border-lime/30"
                  }`}
                  whileHover={reduce ? undefined : { y: -4 }}
                >
                  <div 
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl glass transition-colors duration-300 ${
                      isCyan ? "group-hover:bg-cyan/10 group-hover:text-cyan" : "group-hover:bg-lime/10 group-hover:text-lime"
                    }`}
                  >
                    <val.icon size={20} className={isCyan ? "text-cyan" : "text-lime"} />
                  </div>
                  
                  <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                    {t(`coreValues.items.${idx}.title`, val.title)}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {t(`coreValues.items.${idx}.desc`, val.desc)}
                  </p>

                  {/* Decorative corner accent */}
                  <div 
                    className={`absolute bottom-0- h-16 w-16 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
                      isCyan ? "bg-cyan/30" : "bg-lime/30"
                    }`} 
                    aria-hidden="true" 
                  />
                </motion.div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
