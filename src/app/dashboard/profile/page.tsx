"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { formatDate } from "@/utils/format";
import { apiFetch } from "@/utils/api";
import type { UserDocument } from "@/types";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Coins,
  Shield,
  type LucideIcon,
} from "lucide-react";

type InfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  fullWidth?: boolean;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<UserDocument>("/api/designer/me")
      .then((res) => setProfile(res.data ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading profile" />;

  if (!profile) return null;

  const infoItems: InfoItem[] = [
    {
      icon: Mail,
      label: "Email Address",
      value: profile.email.toLowerCase(),
      fullWidth: true,
    },
    { icon: Phone, label: "Phone Number", value: profile.phone },
    { icon: MapPin, label: "City", value: profile.city },
    {
      icon: Calendar,
      label: "Member Since",
      value: formatDate(profile.createdAt),
    },
    {
      icon: Shield,
      label: "Account Status",
      value: profile.status,
    },
  ];

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        greeting="Account Settings"
        title="Your Profile"
        description="Manage your designer account, view credits balance and account information."
        credits={profile.credits}
        showTopBar={false}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1" hover>
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full p-1 ring-2 ring-accent/40">
              <Avatar name={profile.name} size="lg" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold">
              {profile.name}
            </h2>
            <Badge variant="accent" className="mt-3">
              Interior Designer
            </Badge>

            <div className="credit-wallet mt-8 w-full rounded-2xl p-6">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Coins className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Credit Balance
                </span>
              </div>
              <p className="mt-2 font-display text-5xl font-bold text-accent">
                {profile.credits}
              </p>
              <p className="mt-1 text-xs text-muted">1 credit = 1 lead unlock</p>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2" hover>
          <CardTitle>Account Information</CardTitle>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className={`glass-card flex h-full min-w-0 items-center gap-4 rounded-xl p-4 ${
                  item.fullWidth ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl stat-icon-gold">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    {item.label}
                  </p>
                  <p
                    title={item.fullWidth ? item.value : undefined}
                    className={`mt-1 font-semibold ${
                      item.fullWidth
                        ? "overflow-x-auto whitespace-nowrap text-sm sm:text-base"
                        : ""
                    } ${item.label === "Account Status" ? "capitalize" : ""} ${
                      item.label === "Phone Number" ? "tabular-nums" : ""
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
