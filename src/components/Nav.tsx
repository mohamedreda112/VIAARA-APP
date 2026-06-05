import { useEffect, useState, useCallback } from "react";
import { Logo } from "./Logo";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

/* ─────────────────────────────────────────────
   Page-level nav links (use router Link)
───────────────────────────────────────────── */
const getPageLinks = (t: any) => [
  { to: "/" as const, label: t('nav.home'), exact: true },
  { to: "/about" as const, label: t('nav.about'), exact: false },
  { to: "/projects" as const, label: t('nav.portfolio'), exact: false },
  { to: "/team" as const, label: t('nav.team'), exact: false },
];

/* ─────────────────────────────────────────────
   Homepage anchor links (only visible on /)
───────────────────────────────────────────── */
const getAnchorLinks = (t: any) => [
  { href: "#services", label: t('nav.services') },
  { href: "#process", label: t('nav.workflow') },
  { href: "#faq", label: t('nav.faq') },
];

const anchorIds = ["services", "process", "faq"];

export function Nav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string>("");
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isHomePage = currentPath === "/";

  const pageLinks = getPageLinks(t);
  const anchorLinks = getAnchorLinks(t);

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection (only on homepage)
  useEffect(() => {
    if (!isHomePage) {
      setActiveAnchor("");
      return;
    }
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
      setActiveAnchor(current);
    };

    anchorIds.forEach((id) => {
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
  }, [isHomePage]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  const handleLinkClick = useCallback(() => setOpen(false), []);

  const isPageActive = (to: string, exact: boolean) => {
    if (exact) return currentPath === to;
    return currentPath.startsWith(to);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "py-3"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex w-[auto] md:w-[15%] lg:w-[20%] items-center justify-start">
          <Link
            to="/"
            aria-label="VIAARA — Home"
            className="relative z-10 flex-shrink-0 transition-transform duration-300 hover:opacity-80"
            onClick={handleLinkClick}
          >
            <Logo size={scrolled ? 42 : 56} />
          </Link>
        </div>

        {/* Center: Desktop nav */}
        <nav aria-label="Main navigation" className="hidden flex-1 md:flex items-center justify-center">
          <ul
            className={`flex items-center gap-0.5 rounded-full px-2 py-1.5 text-sm transition-all duration-500 ${
              scrolled ? "glass-strong" : "glass"
            }`}
          >
            {/* Page-level links */}
            {pageLinks.map((l) => {
              const active = isPageActive(l.to, l.exact);
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] lg:text-sm rtl:text-[14px] rtl:font-medium xl:px-4 transition-all duration-300 ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/8 border border-cyan/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* Divider */}
            <li aria-hidden="true" className="h-4 w-px bg-white/10 mx-1" />

            {/* Anchor links */}
            {anchorLinks.map((l) => {
              const sectionId = l.href.replace("#", "");
              const active = isHomePage && activeAnchor === sectionId;
              return (
                <li key={l.href}>
                  <a
                    href={isHomePage ? l.href : `/${l.href}`}
                    className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] lg:text-sm rtl:text-[14px] rtl:font-medium xl:px-4 transition-all duration-300 ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {active && (
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

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex w-[auto] md:w-[15%] lg:w-[20%] items-center justify-end gap-2 lg:gap-3">
          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden whitespace-nowrap rounded-full bg-gradient-brand px-4 xl:px-6 py-2.5 text-[12px] lg:text-[13px] rtl:text-[13px] rtl:font-bold font-semibold tracking-wide text-primary-foreground shadow-[0_0_30px_-8px_var(--cyan)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-6px_var(--cyan)] md:inline-flex items-center justify-center"
          >
            {t('nav.contact')}
          </a>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="glass rounded-full p-2.5 transition-all duration-200 hover:bg-white/10 outline-none">
                <Globe size={18} className="text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card/90 backdrop-blur-md border-white/10 w-32 mt-2">
              <DropdownMenuItem onClick={() => switchLanguage('en')} className="cursor-pointer focus:bg-white/10 focus:text-cyan">
                🇺🇸 {t('nav.en')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('ar')} className="cursor-pointer focus:bg-white/10 focus:text-cyan">
                🇸🇦 {t('nav.ar')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile toggle */}
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
                {/* Page links */}
                {pageLinks.map((l, i) => {
                  const active = isPageActive(l.to, l.exact);
                  return (
                    <motion.li
                      key={l.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        to={l.to}
                        onClick={handleLinkClick}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                          active
                            ? "bg-cyan/10 text-foreground border border-cyan/20"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        }`}
                      >
                        {l.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-cyan" />}
                      </Link>
                    </motion.li>
                  );
                })}

                {/* Divider */}
                <li className="my-1 border-t border-white/5" aria-hidden="true" />

                {/* Anchor links */}
                {anchorLinks.map((l, i) => {
                  const sectionId = l.href.replace("#", "");
                  const active = isHomePage && activeAnchor === sectionId;
                  return (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (pageLinks.length + 1 + i) * 0.04,
                        duration: 0.25,
                      }}
                    >
                      <a
                        onClick={handleLinkClick}
                        href={isHomePage ? l.href : `/${l.href}`}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                          active
                            ? "bg-cyan/10 text-foreground border border-cyan/20"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        }`}
                      >
                        {l.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-cyan" />}
                      </a>
                    </motion.li>
                  );
                })}

                {/* CTA */}
                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: (pageLinks.length + anchorLinks.length + 1) * 0.04,
                    duration: 0.25,
                  }}
                  className="mt-1 pt-1 border-t border-white/5"
                >
                  <a
                    onClick={handleLinkClick}
                    href="#contact"
                    className="flex items-center justify-center rounded-xl bg-gradient-brand px-4 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px_var(--cyan)] transition-transform active:scale-[0.98]"
                  >
                    {t('nav.contact')}
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
