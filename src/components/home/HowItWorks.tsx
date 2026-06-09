import { HOW_IT_WORKS } from "@/constants";
import { UserPlus, Coins, Unlock } from "lucide-react";

const icons = [UserPlus, Coins, Unlock];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-muted">
            Start receiving premium leads in three simple steps
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.step} className="relative text-center">
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute left-[calc(50%+40px)] top-10 hidden h-px w-[calc(100%-80px)] bg-border md:block" />
                )}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <div className="mt-2 text-sm font-bold text-accent">
                  Step {item.step}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
