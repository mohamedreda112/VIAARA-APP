import { useEffect, useState, useCallback } from "react";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Portfolio" },
  { href: "#process", label: "Workflow" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = links.map((l) => l.href.replace("#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll detection for navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionMap = new Map<string, number>();

    const updateActive = () => {
      let maxRatio = 0;
      let current = "";
      sectionMap.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          current = id;
        }
      });
      setActiveSection(current);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          sectionMap.set(id, entry.intersectionRatio);
          updateActive();
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -20% 0px" },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLinkClick = useCallback(() => setOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "py-5"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <a href="#top" aria-label="VIAARA — Back to top" className="relative z-10 flex-shrink-0">
          <Logo size={scrolled ? 38 : 52} />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul
            className={`flex items-center gap-0.5 rounded-full px-2 py-1.5 text-sm transition-all duration-500 ${
              scrolled ? "glass-strong" : "glass"
            }`}
          >
            {links.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/8 border border-cyan/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--cyan)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-6px_var(--cyan)] md:inline-flex items-center gap-2"
        >
          Start Your Project
        </a>

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="glass rounded-full p-2.5 md:hidden transition-all duration-200 hover:bg-white/10"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mt-3 md:hidden"
          >
            <div className="glass-strong rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <ul className="flex flex-col gap-1">
                {links.map((l, i) => {
                  const isActive = activeSection === l.href.replace("#", "");
                  return (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <a
                        onClick={handleLinkClick}
                        href={l.href}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-cyan/10 text-foreground border border-cyan/20"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        }`}
                      >
                        {l.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.04, duration: 0.25 }}
                  className="mt-1 pt-1 border-t border-white/5"
                >
                  <a
                    onClick={handleLinkClick}
                    href="#contact"
                    className="flex items-center justify-center rounded-xl bg-gradient-brand px-4 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px_var(--cyan)] transition-transform active:scale-[0.98]"
                  >
                    Start Your Project
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
