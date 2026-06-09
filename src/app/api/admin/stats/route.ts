import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-helpers";
import { getLeadStats, getRecentLeads } from "@/services/lead.service";
import { countActiveDesigners, getTopDesigners } from "@/services/designer.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const auth = requireAuth(request, "admin");
    if (auth instanceof Response) return auth;

    const [leadStats, activeDesigners, recentLeads, topDesigners] =
      await Promise.all([
        getLeadStats(),
        countActiveDesigners(),
        getRecentLeads(12),
        getTopDesigners(5),
      ]);

    return apiSuccess({
      stats: {
        totalLeads: leadStats.totalLeads,
        publishedToday: leadStats.publishedToday,
        totalSold: leadStats.totalSold,
        activeDesigners,
      },
      recentLeads: recentLeads.map((l) => ({
        _id: l._id.toString(),
        clientName: l.clientName,
        city: l.city,
        service: l.service,
        budget: l.budget,
        bhk: l.bhk,
        status: l.status,
        createdAt: l.createdAt.toISOString(),
      })),
      topDesigners,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch stats";
    return apiError(message, 500);
  }
}
