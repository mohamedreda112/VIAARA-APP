import { Reveal } from "../Reveal";
import { useTranslation } from "react-i18next";

const technologies = [
  "React",
  "Next.js",
  "Flutter",
  "Node.js",
  "Python",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Laravel",
  "Kubernetes",
  "Redis",
  "TensorFlow",
  "FastAPI",
  "MongoDB",
  "TypeScript",
  "Figma",
];

export function Clients() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden py-14 border-y border-white/5 bg-black/10">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-7 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/60">
            {t('clients.title')}
          </p>
        </Reveal>

        <div className="marquee-mask relative overflow-hidden py-2">
          <div className="flex w-max animate-drift gap-8 whitespace-nowrap">
            {Array.from({ length: 4 }).flatMap((_, j) =>
              technologies.map((name, i) => (
                <span
                  key={`${j}-${i}-${name}`}
                  className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-5 py-2 font-mono text-xs font-medium text-muted-foreground/50 transition-all duration-300 hover:border-cyan/30 hover:text-cyan/80 hover:bg-cyan/5 hover:scale-105 cursor-default"
                >
                  {name}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
