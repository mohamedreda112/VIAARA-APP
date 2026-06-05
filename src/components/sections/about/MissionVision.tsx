import { Reveal } from "@/components/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MissionVision() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-10 md:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
          
          {/* Mission Card */}
          <Reveal>
            <motion.div 
              className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 md:p-12 backdrop-blur-sm transition-all duration-500 hover:border-cyan/30 hover:bg-card"
              whileHover={reduce ? undefined : { y: -5 }}
            >
              {/* Decorative Glow */}
              <div className="absolute -top-24-end- h-48 w-48 rounded-full bg-cyan/10 blur-[80px] transition-all duration-500 group-hover:bg-cyan/20" aria-hidden="true" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-[0_0_30px_-6px_var(--cyan)]">
                  <Target size={24} />
                </div>
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                  {t('missionVision.mission.badge')}
                </h3>
                <p className="font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl lg:text-4xl">
                  {t('missionVision.mission.title1')} <span className="text-gradient">{t('missionVision.mission.title2')}</span>.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t('missionVision.mission.desc')}
                </p>
              </div>
            </motion.div>
          </Reveal>

          {/* Vision Card */}
          <Reveal delay={0.1}>
            <motion.div 
              className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 md:p-12 backdrop-blur-sm transition-all duration-500 hover:border-lime/30 hover:bg-card"
              whileHover={reduce ? undefined : { y: -5 }}
            >
              {/* Decorative Glow */}
              <div className="absolute -bottom-24-start- h-48 w-48 rounded-full bg-lime/10 blur-[80px] transition-all duration-500 group-hover:bg-lime/20" aria-hidden="true" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-lime/30 bg-lime/10 text-lime shadow-[0_0_30px_-6px_var(--lime)]">
                  <Eye size={24} />
                </div>
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
                  {t('missionVision.vision.badge')}
                </h3>
                <p className="font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl lg:text-4xl">
                  {t('missionVision.vision.title1')} <span className="text-gradient" style={{ backgroundImage: "linear-gradient(to right, var(--lime), #fff)" }}>{t('missionVision.vision.title2')}</span> {t('missionVision.vision.title3')}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t('missionVision.vision.desc')}
                </p>
              </div>
            </motion.div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
