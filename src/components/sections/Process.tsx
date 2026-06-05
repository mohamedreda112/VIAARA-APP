import { Reveal } from "../Reveal";
import { Search, Map, Palette, Terminal, ShieldAlert, Rocket, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const getSteps = (t: any) => [
  {
    num: "01",
    title: t('process.steps.0.title'),
    icon: Search,
    desc: t('process.steps.0.desc'),
  },
  {
    num: "02",
    title: t('process.steps.1.title'),
    icon: Map,
    desc: t('process.steps.1.desc'),
  },
  {
    num: "03",
    title: t('process.steps.2.title'),
    icon: Palette,
    desc: t('process.steps.2.desc'),
  },
  {
    num: "04",
    title: t('process.steps.3.title'),
    icon: Terminal,
    desc: t('process.steps.3.desc'),
  },
  {
    num: "05",
    title: t('process.steps.4.title'),
    icon: ShieldAlert,
    desc: t('process.steps.4.desc'),
  },
  {
    num: "06",
    title: t('process.steps.5.title'),
    icon: Rocket,
    desc: t('process.steps.5.desc'),
  },
  {
    num: "07",
    title: t('process.steps.6.title'),
    icon: HeartHandshake,
    desc: t('process.steps.6.desc'),
  },
];

export function Process() {
  const { t } = useTranslation();
  const steps = getSteps(t);

  return (
    <section id="process" className="relative overflow-hidden py-10 md:py-16">
      {/* Background decoration grid */}
      <div className="grid-bg absolute inset-0 opacity-20 -z-10" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            {t('process.badge')}
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              {t('process.title1')}
              <br />
              <span className="text-gradient">{t('process.title2')}</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              {t('process.description')}
            </p>
          </div>
        </Reveal>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical Connecting line (hidden on mobile, visible on desktop) */}
          <div className="absolute rtl:right-[36px] ltr:left-[36px] top-6 bottom-6 hidden w-[2px] bg-gradient-to-b from-cyan via-lime to-transparent md:block opacity-35" />

          <div className="space-y-12">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="relative flex flex-col md:flex-row md:gap-8">
                  {/* Left Column: Glowing Icon Marker */}
                  <div className="relative z-10 mb-4 flex items-center gap-4 md:mb-0">
                    <motion.div
                      className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-2xl border border-cyan/20 bg-zinc-950 shadow-[0_0_20px_rgba(63,207,213,0.15)] text-cyan"
                      whileHover={{
                        scale: 1.05,
                        borderColor: "rgba(168,208,58,0.4)",
                        color: "var(--lime)",
                        boxShadow: "0 0 25px rgba(168,208,58,0.25)",
                      }}
                    >
                      <s.icon size={26} />
                    </motion.div>

                    {/* Numeric chip beside icon on mobile */}
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-lime md:hidden">
                      {s.num}
                    </span>
                  </div>

                  {/* Right Column: Content Card */}
                  <motion.div
                    className="flex-1 rounded-[2rem] border border-white/10 bg-card/50 p-6 md:p-8 backdrop-blur hover:border-cyan/35 hover:bg-card/75 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {s.title}
                      </h3>
                      {/* Numeric chip inside card on desktop */}
                      <span className="hidden rounded-full border border-cyan/20 bg-cyan/5 px-3.5 py-1 font-mono text-xs text-cyan md:inline-block">
                        {t('process.stepPrefix')} {s.num}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-4xl">
                      {s.desc}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
