import Link from "next/link";
import {
  Bath,
  Bed,
  ChefHat,
  Home,
  IndianRupee,
  LayoutGrid,
  Lock,
  MapPin,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import { getLeadImageUrl } from "@/utils/lead-image";
import { formatTimeAgo } from "@/utils/time-ago";
import type { PublicLead } from "@/types";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "Full Home": Home,
  Kitchen: ChefHat,
  Wardrobe: Shirt,
  Bedroom: Bed,
  Ceiling: LayoutGrid,
  Bathroom: Bath,
};

interface LiveLeadCardProps {
  lead: PublicLead;
}

export default function LiveLeadCard({ lead }: LiveLeadCardProps) {
  const ServiceIcon = SERVICE_ICONS[lead.service] ?? Home;

  return (
    <article className="live-lead-card group">
      <div className="live-lead-card-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getLeadImageUrl({ image: lead.image, service: lead.service })}
          alt={`${lead.service} interior project`}
          className="live-lead-card-img"
        />
        <div className="live-lead-card-image-gradient" aria-hidden />
        <span className="live-lead-category-badge">
          <ServiceIcon className="h-3 w-3 shrink-0" strokeWidth={2} />
          {lead.service.toUpperCase()}
        </span>
      </div>

      <div className="live-lead-card-body">
        <div className="live-lead-card-meta">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="live-lead-new-badge">
              <span className="live-lead-new-dot" aria-hidden />
              NEW LEAD
            </span>
            <span className="blur-sensitive truncate text-xs text-white/45">
              Client Name
            </span>
            <span className="text-white/25">·</span>
            <span className="shrink-0 text-xs text-white/45">
              {formatTimeAgo(lead.createdAt)}
            </span>
          </div>
          <span className="live-lead-locked-badge">
            <Lock className="h-3 w-3" strokeWidth={2} />
            Locked
          </span>
        </div>

        <div className="live-lead-card-divider" aria-hidden />

        <dl className="live-lead-details">
          <div className="live-lead-detail-row">
            <dt className="live-lead-detail-label">
              <MapPin className="h-4 w-4 text-accent" strokeWidth={1.75} />
              Location
            </dt>
            <dd>{lead.city}</dd>
          </div>
          <div className="live-lead-detail-row">
            <dt className="live-lead-detail-label">
              <IndianRupee className="h-4 w-4 text-accent" strokeWidth={1.75} />
              Budget
            </dt>
            <dd>{lead.budget}</dd>
          </div>
          <div className="live-lead-detail-row">
            <dt className="live-lead-detail-label">
              <Home className="h-4 w-4 text-accent" strokeWidth={1.75} />
              Property Type
            </dt>
            <dd>{lead.bhk}</dd>
          </div>
        </dl>

        <Link href="/register" className="live-lead-cta">
          <Lock className="h-3.5 w-3.5" strokeWidth={2} />
          Register to Unlock Details
        </Link>
      </div>
    </article>
  );
}
