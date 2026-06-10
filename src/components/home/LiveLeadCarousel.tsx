"use client";

import type { PublicLead } from "@/types";
import LiveLeadCard from "@/components/home/LiveLeadCard";

interface LiveLeadCarouselProps {
  leads: PublicLead[];
}

export default function LiveLeadCarousel({ leads }: LiveLeadCarouselProps) {
  return (
    <div className="live-lead-carousel">
      <div className="live-lead-track" role="list">
        {leads.map((lead) => (
          <div key={lead._id} className="live-lead-slide" role="listitem">
            <LiveLeadCard lead={lead} />
          </div>
        ))}
      </div>
    </div>
  );
}
