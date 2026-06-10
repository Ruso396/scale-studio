import { unstable_noStore as noStore } from "next/cache";
import { Radio } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { getPublicLeads } from "@/services/lead.service";
import LiveLeadCarousel from "@/components/home/LiveLeadCarousel";

export default async function LiveLeadFeed() {
  noStore();
  let leads: Awaited<ReturnType<typeof getPublicLeads>> = [];

  try {
    await connectDB();
    leads = await getPublicLeads(3);
  } catch {
    leads = [];
  }

  return (
    <section className="live-lead-section relative overflow-hidden py-24 sm:py-28">
      <div className="live-lead-section-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="live-lead-eyebrow mx-auto">
            <Radio className="h-3.5 w-3.5" strokeWidth={2} />
            <span>LIVE LEAD FEED</span>
          </div>

          <h2 className="live-lead-heading font-display mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Live Lead Feed
          </h2>

          <p className="live-lead-subtitle mt-5 text-sm leading-relaxed sm:text-base">
            Fresh verified leads added daily. Register to unlock full details.
          </p>

          <div className="live-lead-header-divider mx-auto mt-6" aria-hidden>
            <span className="live-lead-header-line" />
            <span className="live-lead-header-diamond" />
            <span className="live-lead-header-line" />
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="relative mx-auto mt-14 max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="live-lead-empty rounded-[1.75rem] border border-accent/15 bg-secondary/30 p-12 text-center">
            <p className="text-sm text-white/55">
              Leads will appear here once the database is connected. Run the
              seed script to populate sample data.
            </p>
          </div>
        </div>
      ) : (
        <LiveLeadCarousel leads={leads} />
      )}
    </section>
  );
}
