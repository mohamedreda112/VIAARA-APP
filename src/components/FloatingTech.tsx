/**
 * Floating tech particles — code snippets, glowing nodes, holographic lines.
 * Pure CSS/SVG, GPU-friendly, decorative only.
 */
export function FloatingTech() {
  const snippets = [
    "{ code: 'clean' }",
    "<App />",
    "npm run deploy",
    "git commit",
    "docker-compose",
    "// scale to ∞",
    "system.build()",
    "pixels → code",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* glowing nodes */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={`n-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 41) % 100}%`,
            background: i % 3 === 0 ? "var(--lime)" : "var(--cyan)",
            boxShadow: i % 3 === 0
              ? "0 0 18px var(--lime)"
              : "0 0 18px var(--cyan)",
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {/* code snippet chips */}
      {snippets.map((s, i) => (
        <span
          key={s}
          className="absolute rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono text-[10px] tracking-tight text-cyan/80 backdrop-blur-sm animate-float-slow"
          style={{
            left: `${(i * 53 + 8) % 90}%`,
            top: `${(i * 37 + 12) % 80}%`,
            color: i % 2 ? "color-mix(in oklab, var(--lime) 90%, white)" : "color-mix(in oklab, var(--cyan) 90%, white)",
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${8 + (i % 5)}s`,
          }}
        >
          {s}
        </span>
      ))}
      {/* holographic horizontal lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`l-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${30 + i * 22}%`,
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--cyan) 60%, transparent), transparent)",
          }}
        />
      ))}
    </div>
  );
}
