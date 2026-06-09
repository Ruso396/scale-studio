import { unstable_noStore as noStore } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { getPublicLeads } from "@/services/lead.service";
import { getLeadImageUrl } from "@/utils/lead-image";
import Badge from "@/components/ui/Badge";
import { MapPin, IndianRupee, Home, Lock } from "lucide-react";

export default async function LiveLeadFeed() {
  noStore();
  let leads: Awaited<ReturnType<typeof getPublicLeads>> = [];

  try {
    await connectDB();
    leads = await getPublicLeads(6);
  } catch {
    leads = [];
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Live Lead Feed
          </h2>
          <p className="mt-4 text-muted">
            Fresh verified leads added daily. Register to unlock full details.
          </p>
        </div>

        {leads.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-muted">
              Leads will appear here once the database is connected.
              Run the seed script to populate sample data.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leads.map((lead) => (
              <div
                key={lead._id}
                className="card-hover overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-44 overflow-hidden bg-secondary/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getLeadImageUrl({
                      image: lead.image,
                      service: lead.service,
                    })}
                    alt={lead.service}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <Badge variant="accent" className="absolute right-3 top-3">
                    {lead.service}
                  </Badge>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-accent" />
                    <span className="blur-sensitive text-sm font-medium">
                      Client Name Hidden
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <MapPin className="h-4 w-4 text-accent" />
                      {lead.city}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <IndianRupee className="h-4 w-4 text-accent" />
                      {lead.budget}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Home className="h-4 w-4 text-accent" />
                      {lead.bhk}
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-secondary/50 px-3 py-2">
                    <span className="blur-sensitive text-xs text-muted">
                      +91 ••••• •••••
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
