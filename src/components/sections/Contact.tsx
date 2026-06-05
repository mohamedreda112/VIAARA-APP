import { Reveal } from "../Reveal";
import { Logo } from "../Logo";
import { ArrowRight, Mail, MapPin, Github, Twitter, Linkedin, Phone } from "lucide-react";
import orb from "@/assets/orb-2.jpg";
import { useState, useRef, type FormEvent } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

/* ── Footer quick links ── */
const getFooterLinks = (t: any) => [
  { label: t('nav.about'),     href: "#about" },
  { label: t('nav.services'),  href: "#services" },
  { label: t('nav.portfolio'), href: "#projects" },
  { label: t('nav.pricing'),   href: "#pricing" },
  { label: t('nav.contact'),   href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com",   icon: Github },
  { label: "Twitter",  href: "https://twitter.com",  icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

/* ── Form field ── */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
        {required && <span className="ms-0.5 text-cyan" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={error ? "true" : undefined}
        className={`w-full rounded-xl border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:bg-background/60 ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-cyan focus:shadow-[0_0_0_3px_rgba(63,207,213,0.1)]"
        }`}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Main section ── */
export function Contact() {
  const { t } = useTranslation();
  const FOOTER_LINKS = getFooterLinks(t);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yOrb   = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const rotOrb  = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const scaleOrb = useTransform(scrollYProgress, [0, 1], [0.9, 1.15]);

  const validate = (form: HTMLFormElement): Record<string, string> => {
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    const name  = (data.get("name")  as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const desc  = (data.get("description") as string)?.trim();

    if (!name)  errs.name  = t('contact.form.errors.name');
    if (!email) errs.email = t('contact.form.errors.email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = t('contact.form.errors.emailInvalid');
    if (!desc)  errs.description = t('contact.form.errors.desc');
    else if (desc.length < 20)
      errs.description = t('contact.form.errors.descLength');

    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus first error field
      const firstKey = Object.keys(errs)[0];
      form.querySelector<HTMLElement>(`#${firstKey}`)?.focus();
      return;
    }
    setErrors({});
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden pt-24 md:pt-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Contact card ── */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/40 p-6 sm:p-10 md:p-16">
          <motion.img
            src={orb}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            style={reduce ? undefined : { y: yOrb, rotate: rotOrb, scale: scaleOrb }}
            className="pointer-events-none absolute ltr:right-0 rtl:left-0 -top-32 h-[500px] w-[500px] rounded-full object-cover opacity-40 md:h-[700px] md:w-[700px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent rtl:bg-gradient-to-l" />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
            {/* Left — info */}
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
                {t('contact.badge')}
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {t('contact.title1')}
                <br />
                <span className="text-gradient">{t('contact.title2')}</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {t('contact.description')}
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <a
                  href="mailto:info@viaara-tech.com"
                  className="group flex items-center gap-3 text-foreground transition-colors hover:text-cyan"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full glass transition-all duration-200 group-hover:border-cyan/30">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  <span>info@viaara-tech.com</span>
                </a>
                <div className="group flex items-start gap-3 text-foreground transition-colors hover:text-cyan">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full glass transition-all duration-200 group-hover:border-cyan/30">
                    <Phone size={16} aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+201000843003" className="hover:underline">+20 1000 843 003</a>
                    <a href="tel:+201000615819" className="hover:underline">+20 1000 615 819</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground pt-2">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full glass">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <span>London · Dubai · Cairo</span>
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.1}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project inquiry form"
                className="glass-strong rounded-2xl p-5 md:p-8"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full min-h-[320px] flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground glow-lime">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="mt-5 font-display text-2xl font-semibold">{t('contact.form.successTitle')}</p>
                    <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                      {t('contact.form.successDesc')}
                    </p>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); formRef.current?.reset(); }}
                      className="mt-6 font-mono text-xs uppercase tracking-wider text-cyan underline-offset-4 hover:underline"
                    >
                      {t('contact.form.sendAnother')}
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label={t('contact.form.name')} name="name" placeholder={t('contact.form.namePlaceholder')} error={errors.name} />
                      <Field label={t('contact.form.email')} name="email" type="email" placeholder={t('contact.form.emailPlaceholder')} error={errors.email} />
                    </div>
                    <Field label={t('contact.form.company')} name="company" placeholder={t('contact.form.companyPlaceholder')} required={false} />
                    <div>
                      <label
                        htmlFor="description"
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
                      >
                        {t('contact.form.projectDesc')}
                        <span className="ms-0.5 text-cyan" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        placeholder={t('contact.form.projectDescPlaceholder')}
                        aria-describedby={errors.description ? "description-error" : undefined}
                        aria-invalid={errors.description ? "true" : undefined}
                        className={`w-full resize-none rounded-xl border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:bg-background/60 ${
                          errors.description
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-cyan focus:shadow-[0_0_0_3px_rgba(63,207,213,0.1)]"
                        }`}
                      />
                      {errors.description && (
                        <p id="description-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-12px_var(--cyan)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_50px_-10px_var(--cyan)] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin me-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <ArrowRight size={16} className="transition-transform rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-muted-foreground/50">
                      {t('contact.form.privacy')}
                    </p>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer
          aria-label="Site footer"
          className="mt-16 border-t border-white/5 pb-8 pt-10"
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Logo size={80} />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {t('footer.description')}
              </p>
              <div className="mt-5 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`VIAARA on ${label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-200 hover:border-cyan/30 hover:bg-cyan/10 hover:text-cyan"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
                {t('footer.quickLinks')}
              </p>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
                {t('footer.getInTouch')}
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:info@viaara-tech.com" className="transition-colors hover:text-cyan">
                    info@viaara-tech.com
                  </a>
                </li>
                <li className="flex flex-col gap-1 mt-1 mb-2">
                  <a href="tel:+201000843003" className="transition-colors hover:text-cyan">+20 1000 843 003</a>
                  <a href="tel:+201000615819" className="transition-colors hover:text-cyan">+20 1000 615 819</a>
                </li>
                <li>London · Dubai · Cairo</li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                  {t('footer.available')}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} VIAARA Tech Solutions Ltd. {t('footer.rights')}</p>
            <div className="flex items-center gap-4">
              <a href="#" className="transition-colors hover:text-foreground">{t('footer.privacy')}</a>
              <a href="#" className="transition-colors hover:text-foreground">{t('footer.terms')}</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
