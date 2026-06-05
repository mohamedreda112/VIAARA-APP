import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/sections/Projects";
import { CTABanner } from "@/components/sections/CTABanner";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — VIAARA Software Engineering" },
      {
        name: "description",
        content:
          "Explore VIAARA's portfolio of custom software projects spanning web platforms, mobile apps, enterprise ERP systems, and AI-powered digital products.",
      },
      { property: "og:title", content: "Projects — VIAARA Software Engineering" },
      {
        property: "og:description",
        content:
          "Client engagements spanning web platforms, mobile apps, enterprise systems and AI solutions — built to specification and delivered at scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useTranslation();
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="relative">
        {/* Page Hero */}
        <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
          {/* Background */}
          <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 50% at 50% 0%, rgba(63,207,213,0.08), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2">
                <Layers size={13} className="text-cyan" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                  {t('projectsPage.badge')}
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.04] md:text-7xl">
                {t('projectsPage.title1')}
                <br />
                <span className="text-gradient">{t('projectsPage.title2')}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('projectsPage.desc')}
              </p>

              {/* Stats row */}
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { value: "50+", label: t('projectsPage.stats.delivered') },
                  { value: "6", label: t('projectsPage.stats.verticals') },
                  { value: "99.9%", label: t('projectsPage.stats.uptime') },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-gradient">
                      {s.value}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full projects grid */}
        <Projects />

        {/* CTA */}
        <CTABanner />
      </main>
    </>
  );
}
