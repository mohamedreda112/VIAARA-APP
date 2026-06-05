import { Reveal } from "../Reveal";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { team } from "@/data/team";
import { useTranslation } from "react-i18next";
import { TeamCard } from "./TeamCard";
import "@/styles/team.css";

interface TeamProps {
  preview?: boolean;
}

export function Team({ preview = false }: TeamProps) {
  const { t } = useTranslation();
  const displayed = preview ? team.slice(0, 3) : team;

  return (
    <section id="team" className="relative overflow-hidden py-10 md:py-16 bg-black/10">
      <div className="mx-auto max-w-7xl xl:max-w-[1440px] px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
              {t('team.badge')}
            </p>
            <h2 className="font-display text-4xl font-semibold leading-[1.15] md:text-5xl text-foreground">
              {t('team.title1')} <span className="text-gradient">{t('team.title2')}</span>
            </h2>
            <div className="mt-4 h-[2px] w-12 bg-gradient-brand rounded-full" />
            <p className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {t('team.description')}
            </p>
          </div>
        </Reveal>

        {/* Team Grid */}
        <div className="team-grid-container mt-10">
          {displayed.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>

        {/* Preview bottom CTA */}
        {preview && (
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center">
              <Link
                to="/team"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-foreground backdrop-blur transition-all duration-300 hover:border-lime/30 hover:bg-lime/5 hover:text-lime"
              >
                {t('team.meetFull')}
                <ArrowRight
                  size={15}
                  className="transition-all duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
