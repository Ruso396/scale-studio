import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  IndianRupee,
  Home,
  Lock,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const STATS = [
  { value: "500+", label: "Verified Leads" },
  { value: "200+", label: "Designers" },
  { value: "5 Cities", label: "Coverage" },
];

const FLOATING_LEADS = [
  {
    city: "Mumbai",
    service: "Full Home Design",
    budget: "₹8–12L",
    bhk: "3 BHK",
    tag: "Verified",
    offset: "top-8 left-4",
    delay: "hero-float-1",
  },
  {
    city: "Bangalore",
    service: "Modular Kitchen",
    budget: "₹3–5L",
    bhk: "2 BHK",
    tag: "New",
    offset: "top-44 right-0",
    delay: "hero-float-2",
  },
  {
    city: "Pune",
    service: "Living Room Makeover",
    budget: "₹2–4L",
    bhk: "2 BHK",
    tag: "Hot",
    offset: "bottom-28 left-12",
    delay: "hero-float-3",
  },
];

const ACTIVITY_ITEMS = [
  {
    name: "Priya S.",
    action: "unlocked a premium lead",
    city: "Mumbai",
    time: "2m ago",
    offset: "top-24 right-8",
    delay: "hero-float-2",
  },
  {
    name: "Arjun M.",
    action: "joined Scale Studio",
    city: "Hyderabad",
    time: "Just now",
    offset: "bottom-16 right-16",
    delay: "hero-float-1",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen overflow-hidden pt-20"
    >
      <div className="hero-bg-image absolute inset-0" />
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-ambient-glow pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full" />
      <div className="hero-ambient-glow pointer-events-none absolute -left-24 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          {/* Left — copy & CTAs */}
          <div className="hero-content-left max-w-xl lg:max-w-none">
            <div className="hero-badge mb-8 inline-flex items-center gap-2.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
              <span>India&apos;s Premium Lead Platform</span>
            </div>

            <h1 className="font-display text-[2.75rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              Get Verified
              <br />
              <span className="hero-headline-accent">Interior Design</span>
              <br />
              Leads
            </h1>

            <p className="hero-subheadline mt-6 max-w-lg text-lg leading-relaxed text-white/75 sm:text-xl">
              Grow Your Studio With Premium Homeowners.
              <span className="mt-2 block text-base text-muted sm:text-lg">
                Unlock high-intent, verified clients across India&apos;s top
                cities — built exclusively for interior designers.
              </span>
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="premium"
                  size="lg"
                  className="hero-cta-primary group w-full sm:w-auto"
                >
                  Join Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="hero-cta-secondary w-full sm:w-auto"
                >
                  Browse Leads
                </Button>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="hero-stat-glass">
                  <p className="font-display text-xl font-bold text-accent sm:text-2xl lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating visual composition */}
          <div className="relative mx-auto hidden w-full max-w-lg lg:block lg:max-w-none lg:min-h-[620px]">
            <div className="hero-visual-ring pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

            {FLOATING_LEADS.map((lead) => (
              <div
                key={`${lead.city}-${lead.service}`}
                className={`hero-float-card absolute w-[260px] ${lead.offset} ${lead.delay}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="hero-lead-tag">{lead.tag}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted">
                    <Lock className="h-3 w-3" />
                    Locked
                  </span>
                </div>
                <p className="font-display text-base font-semibold leading-snug">
                  {lead.service}
                </p>
                <div className="mt-3 space-y-1.5 text-xs text-muted">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 shrink-0 text-accent/80" />
                    {lead.city}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <IndianRupee className="h-3 w-3 shrink-0 text-accent/80" />
                    {lead.budget}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Home className="h-3 w-3 shrink-0 text-accent/80" />
                    {lead.bhk}
                  </p>
                </div>
              </div>
            ))}

            {ACTIVITY_ITEMS.map((item) => (
              <div
                key={item.name}
                className={`hero-activity-card absolute w-[240px] ${item.offset} ${item.delay}`}
              >
                <div className="flex items-start gap-3">
                  <div className="hero-activity-avatar flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                    <UserCheck className="h-4 w-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{item.action}</p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-accent/80">
                      <TrendingUp className="h-3 w-3" />
                      {item.city} · {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="hero-live-pill absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              12 leads added today
            </div>
          </div>

          {/* Mobile visual preview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {FLOATING_LEADS.slice(0, 2).map((lead) => (
              <div key={`mobile-${lead.city}`} className="hero-float-card">
                <div className="mb-2 flex items-center justify-between">
                  <span className="hero-lead-tag">{lead.tag}</span>
                  <Lock className="h-3 w-3 text-muted" />
                </div>
                <p className="font-display text-sm font-semibold">
                  {lead.service}
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                  <MapPin className="h-3 w-3 text-accent/80" />
                  {lead.city} · {lead.budget}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
