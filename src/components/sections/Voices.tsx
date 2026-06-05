import { Reveal } from "../Reveal";
import { Quote } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const voices = [
  { quote: "The engineering standards are outstanding. They delivered our high-scale commerce platform three weeks ahead of schedule with clean, well-documented, and highly maintainable code.", name: "Sarah Jenkins", role: "CEO, NovaShop International" },
  { quote: "They helped us migrate our legacy infrastructure to a modern enterprise platform. Their technical expertise in system integration and process automation is genuinely world-class.", name: "Marcus Thorne", role: "Director of Operations, Apex Logistics" },
  { quote: "Exceptional post-launch support and clear, responsive communication throughout. From UI/UX design to mobile application delivery, the team exceeded every milestone and expectation.", name: "Elena Rostova", role: "Product Lead, MedConnect Health" },
];

export function Voices() {
  const { t } = useTranslation();
  const voices = t('voices.items', { returnObjects: true }) as { quote: string; name: string; role: string }[];
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yWord = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <section ref={ref} id="voices" className="relative overflow-hidden py-10 md:py-16">
      <motion.span
        style={reduce ? undefined : { y: yWord }}
        className="pointer-events-none absolute start-0 bottom-10 select-none whitespace-nowrap font-display text-[16vw] font-bold uppercase leading-none tracking-tight text-white/[0.025] md:text-[12vw]"
      >
        Voices
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-lime">{t('voices.badge')}</p>
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            {t('voices.title1')}
            <br />
            <span className="text-gradient">{t('voices.title2')}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {voices.map((v, i) => (
            <VoiceCard key={v.name} v={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceCard({ v, index }: { v: { quote: string; name: string; role: string }; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const offsets = [10, -8, 6];
  const y = useTransform(scrollYProgress, [0, 1], [`${offsets[index % 3]}%`, `${-offsets[index % 3]}%`]);

  return (
    <Reveal delay={index * 0.1}>
      <motion.figure
        ref={ref}
        style={reduce ? undefined : { y }}
        className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/40"
      >
        <Quote className="absolute ltr:left-6 rtl:right-6 top-6 text-cyan/30 transform rtl:scale-x-[-1]" size={32} />
        <blockquote className="font-display text-lg leading-relaxed text-foreground">"{v.quote}"</blockquote>
        <figcaption className="mt-8 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-semibold text-primary-foreground">
            {v.name.split(" ").map((n) => n[0]).join("")}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{v.name}</p>
            <p className="text-xs text-muted-foreground">{v.role}</p>
          </div>
        </figcaption>
      </motion.figure>
    </Reveal>
  );
}
