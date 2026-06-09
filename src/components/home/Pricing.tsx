import Link from "next/link";
import { PRICING_PLANS } from "@/constants";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-muted">
            Start free with 5 credits. Scale as your business grows.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "card-hover relative rounded-2xl border p-8",
                plan.highlighted
                  ? "border-accent bg-card shadow-xl shadow-accent/10"
                  : "border-border bg-card"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-background">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-accent">
                  {plan.price}
                </span>
                {"period" in plan && plan.period && (
                  <span className="text-muted">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-accent font-medium">{plan.credits}</p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register" className="mt-8 block">
                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
