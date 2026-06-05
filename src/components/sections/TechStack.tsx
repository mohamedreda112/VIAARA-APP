import { Reveal } from "../Reveal";
import { motion } from "framer-motion";

const technologies = [
  {
    name: "React",
    category: "Frontend",
    glow: "rgba(63,207,213,0.25)",
    color: "#3FCFD5",
    desc: "Component-driven SPA & interactive dashboard user interfaces.",
    logo: (
      <svg className="h-9 w-9" viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
        <circle r="2.05" fill="#3FCFD5"/>
        <g fill="none" stroke="#3FCFD5" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Frontend",
    glow: "rgba(255,255,255,0.15)",
    color: "#ffffff",
    desc: "Server-side rendering, static site generation, and routing solutions.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle cx="90" cy="90" r="90" fill="transparent" stroke="#ffffff" strokeWidth="6"/>
        <path d="M140 140L80 60h-10v60h10V75l50 65z" fill="#ffffff"/>
        <path d="M120 60h10v60h-10z" fill="#ffffff"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Backend",
    glow: "rgba(131,205,41,0.25)",
    color: "#83CD29",
    desc: "Event-driven asynchronous backend runtime for rapid microservices.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 256 284" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L24.4 60v120l103.6 60.1 103.6-60.1V60L128 0zm79 161.4c-6.8 5-16.1 7.4-27.9 7.4-15 0-26.6-4.1-34.7-12.4-7.1-7.2-10.7-17.7-10.7-31.5 0-14.3 3.6-25 10.7-32.3 8.1-8.3 19.8-12.4 35-12.4 12.1 0 21.3 2.6 27.6 7.7 5.1 4.2 8.3 10.3 9.4 18.2h-21.7c-.9-4.8-3.9-7.2-9-7.2-4.1 0-7.3 1.4-9.6 4.3-2.9 3.5-4.3 9.3-4.3 17.4s1.4 13.9 4.3 17.4c2.3 2.9 5.5 4.3 9.6 4.3 5.4 0 8.6-2.5 9.7-7.6h21.4c-1.3 8.4-4.8 14.6-9.8 18.9zm.6-94.8V53.1h20.7v13.5H208v16.2H182.2z" fill="#83CD29"/>
      </svg>
    ),
  },
  {
    name: "Laravel",
    category: "Backend",
    glow: "rgba(255,45,32,0.25)",
    color: "#FF2D20",
    desc: "Robust, secure MVC framework for rapid complex api architectures.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 256 270" xmlns="http://www.w3.org/2000/svg">
        <path d="M239.5 73.1L128 8.6 16.5 73.1v123.8L128 261.4l111.5-64.5V73.1zm-19.5 112.5L128 238.1l-92-52.5V84.4L128 31.9l92 52.5v101.2z" fill="#FF2D20"/>
        <path d="M128 65.6v132.8M72.2 97.8l55.8-32.2 55.8 32.2" stroke="#FF2D20" strokeWidth="8" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Backend / AI",
    glow: "rgba(55,115,166,0.25)",
    color: "#3773A6",
    desc: "Advanced data pipelines, machine learning modules, and analytics scripts.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
        <path d="M55 2C25.7 2 27.6 14.6 27.6 14.6h11.2s10.3-.1 10.3 10.1v7.6h31.8s12.1-1.3 12.1-29.2S78.8 2 55 2zm20.8 7.3c1.9 0 3.4 1.5 3.4 3.4s-1.5 3.4-3.4 3.4-3.4-1.5-3.4-3.4 1.5-3.4 3.4-3.4zM55 108c29.3 0 27.4-12.6 27.4-12.6H71.2s-10.3.1-10.3-10.1v-7.6H29.1s-12.1 1.3-12.1 29.2S31.2 108 55 108zm-20.8-7.3c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4z" fill="#3773A6"/>
      </svg>
    ),
  },
  {
    name: "Flutter",
    category: "Mobile",
    glow: "rgba(2.4,169,244,0.25)",
    color: "#02A9F4",
    desc: "Single codebase solutions compiling native iOS and Android apps.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 256 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L24.4 103.6h51.8L128 51.8l51.8 51.8h51.8L128 0zm51.8 155.4L128 207.2l-51.8-51.8H24.4l103.6 103.6 103.6-103.6H179.8z" fill="#02A9F4"/>
      </svg>
    ),
  },
  {
    name: "Firebase",
    category: "Databases / Cloud",
    glow: "rgba(255,202,40,0.25)",
    color: "#FFCA28",
    desc: "Real-time key-value storages, auth layers, and analytics telemetry.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 256 350" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 282.9l16.1-125.7L116.3 325 0 282.9zm128-275L91.8 77l72.4 137.9L128 7.9zm111.9 275l-16.1-125.7L111.9 14.8l128 268.1z" fill="#FFCA28"/>
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "Databases",
    glow: "rgba(71,162,72,0.25)",
    color: "#47A248",
    desc: "Flexible, document-based NoSQL database for modern rapid models.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 110 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M54.3 0c-4 5.3-12.2 22.8-16 39C23.6 97.4 20 128.5 20 156.4c0 36.4 13.3 58.7 30 76.5l4.3 4.5 4.3-4.5c16.7-17.8 30-40.1 30-76.5 0-27.9-3.6-59-18.3-117.4-3.8-16.2-12-33.7-16-39z" fill="#47A248"/>
      </svg>
    ),
  },
  {
    name: "MySQL",
    category: "Databases",
    glow: "rgba(0,117,143,0.25)",
    color: "#00758F",
    desc: "Structured, ACID-compliant relational databases supporting massive tables.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M49 10c-15 0-27 10-27 22s12 22 27 22 27-10 27-22-12-22-27-22zm0 38c-10 0-18-7-18-16s8-16 18-16 18 7 18 16-8 16-18 16z" fill="#00758F"/>
        <path d="M49 18c-6 0-11 4-11 10s5 10 11 10 11-4 11-10-5-10-11-10z" fill="#00758F" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "AWS Cloud",
    category: "Cloud & Devops",
    glow: "rgba(255,153,0,0.25)",
    color: "#FF9900",
    desc: "Elastic server clustering, edge distributions, and zero-downtime CI/CD.",
    logo: (
      <svg className="h-9 w-9" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M117.4 69.1v76.8h21.2v-76.8h-21.2zm64.8 0v76.8h21.2v-76.8h-21.2zm-129.6 0v76.8h21.2v-76.8H52.6zm64.8-31.2h21.2v10.6h-21.2V37.9zm64.8 0h21.2v10.6h-21.2V37.9zM52.6 37.9h21.2v10.6H52.6V37.9zm171.6 156.4c-22.3 12.8-57.2 15.6-85.9 10.1-3-.6-3.9-2.7-1.1-4.3 17.6-8.6 41.8-12 66.3-11.7 19.5.2 26.5 4.3 20.7 5.9zm6.3-8.6c-1.6-1.9-7-.1-10.6.8-2.3.6-3.5-.8-2-2.3 4.7-5.1 12.1-11.3 15.6-10.5 3.5.8 1.6 9.4-1.6 14.5-1.6 1.9-2.3 1.1-1.4-.7z" fill="#FF9900"/>
      </svg>
    ),
  },
];

export function TechStack() {
  const categories = ["Frontend", "Backend", "Backend / AI", "Mobile", "Databases", "Databases / Cloud", "Cloud & Devops"];
  
  return (
    <section id="techstack" className="relative overflow-hidden py-10 md:py-16 bg-black/10">
      {/* Background neon elements */}
      <div className="absolute top-1/4 -z-10 h-72 w-72 rounded-full bg-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -z-10 h-72 w-72 rounded-full bg-lime/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            10 — Tech Stack
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-20">
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              Cutting-edge tools,
              <br />
              <span className="text-gradient">battle-tested stack.</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              We leverage modern platforms and language structures that provide unmatched architectural speed, heavy security, and continuous scalability.
            </p>
          </div>
        </Reveal>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <motion.div
                className="group relative flex flex-col justify-between h-48 rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-card overflow-hidden"
                whileHover={{
                  y: -5,
                  boxShadow: `0 10px 25px -10px ${t.glow}`,
                }}
              >
                {/* Radial Glow Backdrop */}
                <div
                  className="pointer-events-none absolute end- -top-8 h-20 w-20 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                  style={{ backgroundColor: t.glow }}
                />

                {/* Logo Header */}
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-950/60 border border-white/5 group-hover:border-white/10 group-hover:bg-zinc-950 transition-all duration-300">
                    {t.logo}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground bg-white/5 border border-white/5 rounded px-2 py-0.5">
                    {t.category.split(" ")[0]}
                  </span>
                </div>

                {/* Tech Details */}
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-white transition-colors">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/80 line-clamp-2">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
