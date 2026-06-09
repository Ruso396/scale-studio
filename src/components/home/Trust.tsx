import { TRUST_ITEMS } from "@/constants";
import { Shield, Star, Globe, Lock } from "lucide-react";

const icons = [Shield, Star, Globe, Lock];

export default function Trust() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Trusted by Interior Designers
          </h2>
          <p className="mt-4 text-muted">
            Built for professionals who demand quality leads
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
