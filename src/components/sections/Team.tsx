import { Reveal } from "../Reveal";
import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Abdullah Essam",
    role: "Founder & CTO",
    bio: "Ex-Stripe platform lead. 10+ years engineering secure cloud scaling, redundant clustering, and transaction gateways.",
    socials: { github: "#", twitter: "#", linkedin: "#" },
    glow: "var(--cyan)",
    avatar: (
      <svg className="h-full w-full object-cover" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="url(#avatar-grad-1)"/>
        {/* Abstract cyber face overlay */}
        <circle cx="50" cy="45" r="18" stroke="#3FCFD5" strokeWidth="2" fill="none" opacity="0.8"/>
        <path d="M26 78 C 30 60, 70 60, 74 78" stroke="#3FCFD5" strokeWidth="2" fill="none" opacity="0.8"/>
        <circle cx="50" cy="50" r="32" stroke="#A8D03A" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6"/>
        <defs>
          <radialGradient id="avatar-grad-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" transform="translate(50 50) rotate(90) scale(50)">
            <stop stopColor="rgba(63,207,213,0.3)"/>
            <stop offset="1" stopColor="rgba(20,24,33,0.95)"/>
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Mohamed Reda",
    role: "Head of UI/UX",
    bio: "Award-winning interface designer. Specialized in structural design systems, responsive accessibility, and interactive prototypes.",
    socials: { github: "#", twitter: "#", linkedin: "#" },
    glow: "var(--lime)",
    avatar: (
      <svg className="h-full w-full object-cover" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="url(#avatar-grad-2)"/>
        {/* Abstract cyber face overlay */}
        <rect x="36" y="32" width="28" height="28" rx="4" stroke="#A8D03A" strokeWidth="2" fill="none" opacity="0.8"/>
        <path d="M22 80 C 30 65, 70 65, 78 80" stroke="#A8D03A" strokeWidth="2" fill="none" opacity="0.8"/>
        <circle cx="50" cy="50" r="36" stroke="#3FCFD5" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.6"/>
        <defs>
          <radialGradient id="avatar-grad-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" transform="translate(50 50) rotate(90) scale(50)">
            <stop stopColor="rgba(168,208,58,0.3)"/>
            <stop offset="1" stopColor="rgba(20,24,33,0.95)"/>
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Jordan Vance",
    role: "Lead Software Architect",
    bio: "System scaling guru. Specialized in high-throughput Go/Rust backend frameworks, database replication, and edge cache networks.",
    socials: { github: "#", twitter: "#", linkedin: "#" },
    glow: "var(--cyan)",
    avatar: (
      <svg className="h-full w-full object-cover" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="url(#avatar-grad-3)"/>
        {/* Abstract cyber face overlay */}
        <polygon points="50,26 66,54 34,54" stroke="#3FCFD5" strokeWidth="2" fill="none" opacity="0.8"/>
        <path d="M24 76 C 30 62, 70 62, 76 76" stroke="#3FCFD5" strokeWidth="2" fill="none" opacity="0.8"/>
        <circle cx="50" cy="50" r="28" stroke="#A8D03A" strokeWidth="1" strokeDasharray="2 4" fill="none" opacity="0.6"/>
        <defs>
          <radialGradient id="avatar-grad-3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" transform="translate(50 50) rotate(90) scale(50)">
            <stop stopColor="rgba(63,207,213,0.25)"/>
            <stop offset="1" stopColor="rgba(20,24,33,0.95)"/>
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Sarah Chen",
    role: "AI & Data Engineer",
    bio: "Data optimization scientist. Ph.D. in CS. Expert in custom embeddings tuning, large language models integrations, and neural pipelines.",
    socials: { github: "#", twitter: "#", linkedin: "#" },
    glow: "var(--lime)",
    avatar: (
      <svg className="h-full w-full object-cover" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="url(#avatar-grad-4)"/>
        {/* Abstract cyber face overlay */}
        <ellipse cx="50" cy="42" rx="16" ry="12" stroke="#A8D03A" strokeWidth="2" fill="none" opacity="0.8"/>
        <path d="M26 82 C 30 66, 70 66, 74 82" stroke="#A8D03A" strokeWidth="2" fill="none" opacity="0.8"/>
        <circle cx="50" cy="50" r="30" stroke="#3FCFD5" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6"/>
        <defs>
          <radialGradient id="avatar-grad-4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" transform="translate(50 50) rotate(90) scale(50)">
            <stop stopColor="rgba(168,208,58,0.25)"/>
            <stop offset="1" stopColor="rgba(20,24,33,0.95)"/>
          </radialGradient>
        </defs>
      </svg>
    ),
  },
];

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-16 md:py-24 bg-black/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-lime">
            08 — The Core Team
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12 md:mb-20">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              Elite developers,
              <br />
              <span className="text-gradient">creative builders.</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              A highly specialized squad of senior programmers, UI architects, and systems strategists operating under clean, collaborative environments.
            </p>
          </div>
        </Reveal>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <motion.article
                className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-card/45 p-6 backdrop-blur transition-all duration-300 hover:border-cyan/35 hover:bg-card flex flex-col justify-between"
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* Avatar Container */}
                  <div className="relative aspect-square w-full rounded-2xl border border-white/5 bg-zinc-950/40 overflow-hidden mb-6 flex items-center justify-center p-8">
                    {/* Generative Tech Avatar */}
                    <div className="w-full h-full rounded-full overflow-hidden border border-white/10 group-hover:border-cyan/30 group-hover:scale-105 transition-all duration-500 shadow-inner">
                      {m.avatar}
                    </div>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-cyan bg-cyan/5 border border-cyan/15 rounded px-2.5 py-0.5">
                    {m.role}
                  </span>
                  <h3 className="mt-3.5 font-display text-xl font-bold text-foreground transition-colors group-hover:text-cyan">
                    {m.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>
                </div>

                {/* Social icons bottom */}
                <div className="mt-8 border-t border-white/5 pt-4 flex gap-4 text-muted-foreground">
                  <a
                    href={m.socials.github}
                    className="hover:text-cyan transition-colors"
                    aria-label={`${m.name} on GitHub`}
                  >
                    <Github size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={m.socials.twitter}
                    className="hover:text-cyan transition-colors"
                    aria-label={`${m.name} on Twitter`}
                  >
                    <Twitter size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={m.socials.linkedin}
                    className="hover:text-cyan transition-colors"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    <Linkedin size={16} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
