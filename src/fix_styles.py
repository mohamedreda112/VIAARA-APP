import re

with open("d:/VIAARA/src/styles.css", "r", encoding="utf-8") as f:
    content = f.read()

# I will find all the duplicated text and corrupted pieces and fix them
# Let's just grab everything up to "/* ── Premium neon scrollbar — modal right panel ── */"
# Wait, the file is small enough, I'll just write the entire clean styles.css

clean_css = """@import "tailwindcss";
@import "./fonts.css";

/* ── Custom Theme Tokens ── */
@theme {
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));

  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));

  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));

  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));

  --color-cyan: var(--cyan);
  --color-lime: var(--lime);
  --color-purple: var(--purple);
  --color-magenta: var(--magenta);

  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --font-display: "ClashDisplay-Variable", "Inter", sans-serif;

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

/* ── Global Variables ── */
@layer base {
  :root {
    --background: 240 10% 4%;
    --foreground: 0 0% 98%;

    --card: 240 10% 6%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 6%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 4.8% 15%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 5% 15%;
    --muted-foreground: 240 5% 65%;

    --accent: 240 5% 15%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 5% 15%;
    --input: 240 5% 15%;
    --ring: 240 4.9% 83.9%;

    --radius: 0.75rem;

    /* VIAARA Brand Colors */
    --cyan: #3FCFD5;
    --lime: #A8D03A;
    --purple: #8B5CF6;
    --magenta: #D946EF;

    --gradient-brand: linear-gradient(135deg, var(--cyan) 0%, var(--lime) 100%);
    --gradient-glow: linear-gradient(135deg, rgba(63,207,213,0.15) 0%, rgba(168,208,58,0.15) 100%);
    
    --shadow-glow: 0 0 40px -10px var(--cyan);
    --shadow-lime: 0 0 40px -10px var(--lime);
  }

  /* ── Base elements ── */
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: var(--font-sans);
    overflow-x: hidden;
  }

  /* Text selection styling */
  ::selection {
    background-color: rgba(63, 207, 213, 0.3);
    color: white;
  }

  /* Webkit custom scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: hsl(var(--background)); }
  ::-webkit-scrollbar-thumb {
    background: color-mix(in oklab, var(--cyan) 30%, transparent);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: color-mix(in oklab, var(--cyan) 50%, transparent);
  }

  /* Focus visible styles — accessible but styled */
  :focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Smooth image rendering */
  img { display: block; max-width: 100%; }
}

@layer utilities {

  /* ── Global Typography Classes ── */
  .text-body {
    @apply text-[16px] md:text-[18px] leading-[1.8] text-muted-foreground max-w-[70ch];
  }

  /* ── Global Section Titles ── */
  .global-section-label {
    @apply font-mono text-[16px] font-semibold uppercase tracking-[0.25em] text-cyan;
  }

  .global-section-title {
    @apply font-display font-bold text-foreground;
    font-size: clamp(40px, 4vw, 56px);
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  /* ── Global Button Classes ── */
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[0_0_40px_-10px_var(--cyan)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_50px_-8px_var(--cyan)];
  }
  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:bg-white/10 hover:border-cyan/30;
  }

  /* ── Global Card Classes ── */
  .card-standard {
    @apply relative overflow-hidden rounded-[24px] border border-white/10 bg-card/40 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-2 hover:border-cyan/30 hover:bg-card/60 hover:shadow-[0_10px_40px_-15px_rgba(63,207,213,0.15)];
  }

  /* ── Text gradient ── */
  .text-gradient {
    background: var(--gradient-brand);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* ── Backgrounds ── */
  .bg-gradient-brand { background: var(--gradient-brand); }
  .bg-gradient-glow  { background: var(--gradient-glow); }

  /* ── Glassmorphism ── */
  .glass {
    background: color-mix(in oklab, var(--card) 60%, transparent);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border: 1px solid color-mix(in oklab, var(--cyan) 14%, transparent);
  }
  .glass-strong {
    background: color-mix(in oklab, var(--card) 80%, transparent);
    backdrop-filter: blur(22px) saturate(160%);
    -webkit-backdrop-filter: blur(22px) saturate(160%);
    border: 1px solid color-mix(in oklab, var(--cyan) 22%, transparent);
  }

  /* ── Glow shadows ── */
  .glow-cyan { box-shadow: var(--shadow-glow); }
  .glow-lime { box-shadow: var(--shadow-lime); }

  /* ── Grid background ── */
  .grid-bg {
    background-image:
      linear-gradient(color-mix(in oklab, var(--cyan) 12%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in oklab, var(--cyan) 12%, transparent) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }

  /* ── Noise texture ── */
  .noise {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.8 0 0 0 0 0.5 0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }

  /* ── Marquee fade mask ── */
  .marquee-mask {
    mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
  }

  /* ── Opacity utilities ── */
  .bg-white\/3  { background-color: rgba(255,255,255,0.03); }
  .bg-white\/4  { background-color: rgba(255,255,255,0.04); }
  .bg-white\/8  { background-color: rgba(255,255,255,0.08); }
  .border-white\/8 { border-color: rgba(255,255,255,0.08); }

  /* ── Hide scrollbar but keep scroll ── */
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-none::-webkit-scrollbar { display: none; }

  /* ── Premium neon scrollbar — modal right panel ── */
  .modal-right-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(63,207,213,0.35) transparent;
    scroll-behavior: smooth;
  }
  .modal-right-scroll::-webkit-scrollbar { width: 3px; }
  .modal-right-scroll::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
  }
  .modal-right-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      rgba(63,207,213,0.55) 0%,
      rgba(168,208,58,0.45) 50%,
      rgba(63,207,213,0.55) 100%
    );
    border-radius: 99px;
    box-shadow: 0 0 6px rgba(63,207,213,0.3);
  }
  .modal-right-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      180deg,
      rgba(63,207,213,0.85) 0%,
      rgba(168,208,58,0.75) 50%,
      rgba(63,207,213,0.85) 100%
    );
    box-shadow: 0 0 10px rgba(63,207,213,0.55);
  }

  /* ── Legacy modal-scroll ── */
  .modal-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(63,207,213,0.3) transparent;
  }
  .modal-scroll::-webkit-scrollbar { width: 3px; }
  .modal-scroll::-webkit-scrollbar-track { background: transparent; }
  .modal-scroll::-webkit-scrollbar-thumb {
    background: rgba(63,207,213,0.35);
    border-radius: 99px;
  }
  .modal-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(63,207,213,0.65);
  }

  /* ── Section spacing consistency ── */
  .section-pad { padding-top: 48px; padding-bottom: 48px; }
  @media (min-width: 768px) {
    .section-pad { padding-top: 64px; padding-bottom: 64px; }
  }
  @media (min-width: 1024px) {
    .section-pad { padding-top: 80px; padding-bottom: 80px; }
  }

  /* ── Overflow safety: prevent horizontal scroll on all pages ── */
  .page-root { overflow-x: clip; }
}
/* ── Keyframe animations ── */
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-22px); }
}
@keyframes float-slower {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-30px) rotate(3deg); }
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.06); }
}
@keyframes scan {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(2000%); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
@keyframes drift {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-float-slow    { animation: float-slow    9s  ease-in-out infinite; }
.animate-float-slower  { animation: float-slower  13s ease-in-out infinite; }
.animate-pulse-glow    { animation: pulse-glow    4s  ease-in-out infinite; }
.animate-scan          { animation: scan          6s  linear     infinite; }
.animate-drift         { animation: drift         40s linear     infinite; }
.animate-fade-in-up    { animation: fade-in-up    0.6s ease forwards; }

/* ── Reduced motion — disable all animations ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
"""

with open("d:/VIAARA/src/styles.css", "w", encoding="utf-8") as f:
    f.write(clean_css)
