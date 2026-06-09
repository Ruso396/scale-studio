"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import LeadCard from "@/components/dashboard/LeadCard";
import EmptyState from "@/components/ui/EmptyState";
import { Search } from "lucide-react";
import { apiFetch } from "@/utils/api";
import type { PublicLead, UserDocument } from "@/types";

export default function BrowseLeadsPage() {
  const [leads, setLeads] = useState<PublicLead[]>([]);
  const [profile, setProfile] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [leadsRes, profileRes] = await Promise.all([
        apiFetch<PublicLead[]>("/api/leads"),
        apiFetch<UserDocument>("/api/designer/me"),
      ]);
      setLeads(leadsRes.data ?? []);
      setProfile(profileRes.data ?? null);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner label="Loading leads" />;

  const firstName = profile?.name.split(" ")[0] ?? "Designer";

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        greeting={`Hello, ${firstName} 👋`}
        title="Browse Premium Leads"
        description="Discover verified interior design clients. Unlock for 1 credit and get permanent access to contact details."
        credits={profile?.credits}
        showTopBar={false}
      />

      {leads.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No leads available"
          description="Check back soon for new verified leads in your area."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {leads.map((lead) => (
            <LeadCard
              key={lead._id}
              lead={lead}
              onUnlock={() => {
                apiFetch<UserDocument>("/api/designer/me").then((res) => {
                  if (res.data) setProfile(res.data);
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
