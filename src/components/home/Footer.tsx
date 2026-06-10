import Link from "next/link";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/constants";
import { ArrowRight, Check, Mail } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const BRAND_HIGHLIGHTS = [
  "500+ Verified Leads",
  "Premium Interior Projects",
  "Pan India Coverage",
] as const;

const SOCIAL_LINKS = [
  {
    href: "mailto:hello@scalestudio.com",
    label: "Email Scale Studio",
    icon: Mail,
    external: false,
  },
  {
    href: "https://www.linkedin.com",
    label: "LinkedIn",
    icon: LinkedInIcon,
    external: true,
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    icon: InstagramIcon,
    external: true,
  },
] as const;

export default function Footer() {
  return (
    <footer id="footer" className="footer-section relative overflow-hidden">
      <div className="footer-glass-layer" aria-hidden />
      <div className="footer-glow footer-glow-logo" aria-hidden />
      <div className="footer-glow footer-glow-right" aria-hidden />

      <div className="footer-separator" aria-hidden>
        <div className="footer-separator-glow" />
        <div className="footer-separator-line" />
      </div>

      <div className="footer-inner relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="footer-grid grid gap-12 sm:gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-16 xl:gap-x-20">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="footer-logo-wrap">
              <Logo size="lg" showTagline />
            </div>

            <p className="footer-brand-desc mt-6 max-w-md text-[0.9375rem] leading-relaxed text-white/60">
              India&apos;s premium B2B lead generation platform for interior
              designers. Connect with verified clients and grow your business.
            </p>

            <ul className="mt-7 space-y-3">
              {BRAND_HIGHLIGHTS.map((item) => (
                <li key={item} className="footer-highlight flex items-center gap-2.5">
                  <span className="footer-highlight-icon flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/5">
                    <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-white/70">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="footer-social-link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Account */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:col-start-8 lg:gap-14 lg:pt-1">
            <div>
              <h4 className="footer-heading font-display text-base font-semibold tracking-wide text-foreground">
                Quick Links
              </h4>
              <div className="footer-heading-line" aria-hidden />
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-heading font-display text-base font-semibold tracking-wide text-foreground">
                Account
              </h4>
              <div className="footer-heading-line" aria-hidden />
              <ul className="mt-5 space-y-3">
                <li>
                  <Link href="/login" className="footer-link">
                    Designer Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="footer-link">
                    Register Free
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="footer-link">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="footer-cta">
          <div className="footer-cta-inner">
            <div className="footer-cta-copy">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Ready to Grow Your Interior Business?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 sm:text-[0.9375rem]">
                Join India&apos;s premium network of interior designers and
                access verified leads.
              </p>
            </div>
            <Link href="/register" className="shrink-0">
              <Button
                variant="premium"
                size="lg"
                className="footer-cta-btn group w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* Copyright — full-width bottom strip */}
      <div className="footer-bottom relative z-10">
        <div className="footer-bottom-divider" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-white/45">
            &copy; {new Date().getFullYear()} Scale Studio &bull; Crafted for
            Premium Interior Designers
          </p>
        </div>
      </div>
    </footer>
  );
}
