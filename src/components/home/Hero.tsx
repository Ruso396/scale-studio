import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";

const STATS = [
  { value: "500+", label: "Verified Leads" },
  { value: "200+", label: "Interior Designers" },
  { value: "5+", label: "Major Cities" },
];

const TRUST_ITEMS = [
  "Verified Clients",
  "Premium Projects",
  "High Budget Leads",
  "Secure Platform",
];

const SHOWCASE_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=1120&fit=crop&q=85";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="hero-bg-image absolute inset-0" aria-hidden />
      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="hero-vignette absolute inset-0" aria-hidden />
      <div
        className="hero-light-glow pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-0 lg:translate-x-1/4"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          {/* Left — content unchanged */}
          <div className="hero-left text-center lg:text-left">
            <h1 className="hero-fade-in hero-title font-display text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
              Verified Interior Design Leads That{" "}
              <span className="hero-headline-accent">Grow Your Business</span>
            </h1>

            <p className="hero-fade-in hero-fade-delay-1 mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg sm:leading-relaxed lg:mx-0">
              Connect with genuine homeowners and access premium interior
              projects across India&apos;s top cities.
            </p>

            <div className="hero-fade-in hero-fade-delay-2 hero-stats mx-auto mt-12 flex max-w-lg flex-col items-stretch justify-center gap-8 sm:mt-14 sm:flex-row sm:items-center sm:gap-0 lg:mx-0 lg:max-w-none">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="hero-stat-item flex flex-1 flex-col items-center px-4 lg:items-start lg:px-5"
                >
                  <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="hero-fade-in hero-fade-delay-3 mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row lg:justify-start">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="premium"
                  size="lg"
                  className="hero-cta-primary group w-full sm:w-auto"
                >
                  Start Getting Leads
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="hero-cta-secondary w-full sm:w-auto"
                >
                  Explore Leads
                </Button>
              </Link>
            </div>

            <div className="hero-fade-in hero-fade-delay-4 hero-trust mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:mt-14 lg:mx-0 lg:justify-start">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="hero-trust-item inline-flex items-center gap-2"
                >
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm text-white/65">{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right — premium showcase image */}
          <div className="hero-showcase-col hidden lg:flex lg:items-center lg:justify-end">
            <div className="hero-fade-in hero-fade-delay-5 hero-showcase">
              <div className="hero-showcase-glow" aria-hidden />
              <div className="hero-showcase-accent" aria-hidden />
              <div className="hero-showcase-frame group">
                <Image
                  src={SHOWCASE_IMAGE}
                  alt="Luxury modern interior design"
                  width={900}
                  height={1120}
                  priority
                  className="hero-showcase-img"
                />
                <div className="hero-showcase-overlay" aria-hidden />
                <div className="hero-showcase-inner-frame" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
