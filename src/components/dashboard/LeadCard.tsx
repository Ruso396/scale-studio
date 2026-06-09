"use client";

import { useState } from "react";
import {
  MapPin,
  Lock,
  Unlock,
  Phone,
  User,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ServiceIcon from "@/components/shared/ServiceIcon";
import LeadImage from "@/components/shared/LeadImage";
import { apiFetch } from "@/utils/api";
import { toast } from "sonner";
import { cn } from "@/utils/cn";
import type { PublicLead } from "@/types";

interface LeadCardProps {
  lead: PublicLead;
  onUnlock?: (lead: PublicLead) => void;
}

export default function LeadCard({ lead, onUnlock }: LeadCardProps) {
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(lead.isUnlocked ?? false);
  const [leadData, setLeadData] = useState(lead);

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const res = await apiFetch<PublicLead>("/api/leads/unlock", {
        method: "POST",
        body: JSON.stringify({ leadId: lead._id }),
      });
      setUnlocked(true);
      setLeadData(res.data!);
      onUnlock?.(res.data!);
      toast.success("Lead unlocked — client details revealed!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to unlock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      className={cn(
        "glass-card card-hover group overflow-hidden rounded-2xl p-0",
        unlocked && "ring-1 ring-emerald-500/25"
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <LeadImage
          image={lead.image}
          service={lead.service}
          alt={lead.service}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/40 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge variant="accent">{lead.service}</Badge>
          {unlocked && <Badge variant="success">Unlocked</Badge>}
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold">{lead.city}</span>
          </div>
          <div className="rounded-lg bg-accent px-3 py-1.5 shadow-lg shadow-accent/20">
            <span className="text-xs font-bold text-background">{lead.budget}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-center gap-3">
          <ServiceIcon service={lead.service} className="h-9 w-9" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
              Configuration
            </p>
            <p className="text-sm font-semibold">{lead.bhk}</p>
          </div>
        </div>

        {unlocked ? (
          <div className="mb-4 space-y-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2.5">
              <User className="h-4 w-4 text-accent" />
              <span className="font-semibold">{leadData.clientName}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-accent" />
              <span className="font-medium tracking-wide">{leadData.phone}</span>
            </div>
          </div>
        ) : (
          <div className="mb-4 rounded-xl border border-border/50 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Contact Locked
              </span>
            </div>
            <p className="blur-sensitive mt-2 text-sm">Client Name Hidden</p>
            <p className="blur-sensitive mt-1 text-xs text-muted">
              +91 ••••• •••••
            </p>
          </div>
        )}

        {!unlocked && (
          <Button
            variant="premium"
            className="w-full"
            onClick={handleUnlock}
            loading={loading}
          >
            <Unlock className="h-4 w-4" />
            <Sparkles className="h-3.5 w-3.5" />
            Unlock Lead · 1 Credit
          </Button>
        )}
      </div>
    </article>
  );
}
