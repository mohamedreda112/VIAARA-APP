import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Team } from "@/components/sections/Team";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { Users, Globe, Heart, Zap, Shield, GitBranch } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — VIAARA Software Engineering" },
      {
        name: "description",
        content:
          "Meet the VIAARA team — senior software engineers, solution architects, product designers, and technology consultants building enterprise-grade digital products.",
      },
      { property: "og:title", content: "Team — VIAARA Software Engineering" },
      {
        property: "og:description",
        content:
          "Senior engineers, architects, and consultants dedicated to delivering high-quality software outcomes for every client engagement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

const values = [
  {
    icon: Zap,
    title: "Execution Over Perfection",
    desc: "We ship fast, iterate often, and improve continuously. Momentum matters more than waiting for perfect.",
    color: "var(--cyan)",
    colorRgb: "63,207,213",
  },
  {
    icon: Shield,
    title: "Quality by Default",
    desc: "Every line of code is reviewed, tested, and built to production standards from day one — not as an afterthought.",
    color: "var(--lime)",
    colorRgb: "168,208,58",
  },
  {
    icon: Globe,
    title: "Remote-First Culture",
    desc: "Our distributed team works asynchronously across time zones with clear communication rituals and shared tooling.",
    color: "var(--cyan)",
    colorRgb: "63,207,213",
  },
  {
    icon: Heart,
    title: "Client Partnership",
    desc: "We treat every engagement as a long-term partnership — transparent, accountable, and invested in your success.",
    color: "var(--lime)",
    colorRgb: "168,208,58",
  },
  {
    icon: GitBranch,
    title: "Open by Default",
    desc: "We contribute to open source, share knowledge through documentation, and believe in the power of shared learning.",
    color: "var(--cyan)",
    colorRgb: "63,207,213",
  },
  {
    icon: Users,
    title: "T-Shaped Expertise",
    desc: "Every engineer has deep domain expertise and broad cross-functional skills — enabling genuine full-stack delivery.",
    color: "var(--lime)",
    colorRgb: "168,208,58",
  },
];

function TeamPage() {
  const { t } = useTranslation();
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="relative">
        {/* Page Hero */}
        <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 50% at 50% 0%, rgba(168,208,58,0.07), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-lime/20 bg-lime/5 px-4 py-2">
                <Users size={13} className="text-lime" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
                  {t('teamPage.badge')}
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.04] md:text-7xl">
                {t('teamPage.title1')}
                <br />
                <span className="text-gradient">{t('teamPage.title2')}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('teamPage.desc')}
              </p>

              {/* Quick stats */}
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { value: "10+", label: t('teamPage.stats.engineers') },
                  { value: "5+", label: t('teamPage.stats.years') },
                  { value: "4", label: t('teamPage.stats.continents') },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-gradient">{s.value}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Leadership callout */}
        <section className="relative py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <div className="rounded-[2rem] border border-white/[0.07] p-6 md:p-10" style={{
                background: "linear-gradient(135deg, rgba(63,207,213,0.04) 0%, rgba(168,208,58,0.03) 100%)",
              }}>
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
                  <div className="flex-1">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                      {t('teamPage.leadership.badge')}
                    </p>
                    <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                      {t('teamPage.leadership.title1')}{" "}
                      <span className="text-gradient">{t('teamPage.leadership.title2')}</span>
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {t('teamPage.leadership.desc')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 md:flex-nowrap">
                    {[
                      { label: t('teamPage.leadership.stats.seniority'), value: "8+ yrs" },
                      { label: t('teamPage.leadership.stats.retention'), value: "94%" },
                      { label: t('teamPage.leadership.stats.delivery'), value: "98%" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/3 px-6 py-5 text-center min-w-[110px]"
                      >
                        <span className="font-display text-2xl font-bold text-gradient">
                          {m.value}
                        </span>
                        <span className="mt-1 font-mono text-[8.5px] uppercase tracking-wider text-muted-foreground">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Full team grid */}
        <Team />

        {/* Culture / Values section */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-black/10">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
                {t('teamPage.culture.badge')}
              </p>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-14">
                <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
                  {t('teamPage.culture.title1')}
                  <br />
                  <span className="text-gradient">{t('teamPage.culture.title2')}</span>
                </h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  {t('teamPage.culture.desc')}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Reveal key={v.title} delay={i * 0.07}>
                    <motion.div
                      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-card"
                      whileHover={{
                        boxShadow: `0 12px 30px -10px rgba(${v.colorRgb},0.2)`,
                      }}
                    >
                      <div
                        className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                        style={{
                          borderColor: `rgba(${v.colorRgb},0.25)`,
                          background: `rgba(${v.colorRgb},0.08)`,
                          color: v.color,
                        }}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <h3
                        className="mb-2 font-display text-lg font-bold text-foreground"
                        style={{}}
                      >
                        {t(`teamPage.culture.values.${['execution', 'quality', 'remote', 'partnership', 'open', 'expertise'][i]}.title`, v.title)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {t(`teamPage.culture.values.${['execution', 'quality', 'remote', 'partnership', 'open', 'expertise'][i]}.desc`, v.desc)}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABanner />
      </main>
    </>
  );
}
