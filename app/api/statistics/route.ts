import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust if your Prisma client is elsewhere
import { startOfDay } from "date-fns";

export async function GET() {
  // Group by day (or week/month if you prefer)
  const recordings = await prisma.recording.findMany({
    include: {
      agent: true,
    },
  });

  const byDate: Record<string, number> = {};
  const byUser: Record<string, { nameOrEmail: string; count: number }> = {};

  for (const rec of recordings) {
    const date = startOfDay(new Date(rec.createdAt)).toISOString().split("T")[0];

    byDate[date] = (byDate[date] || 0) + 1;

    const id = rec.agentId;
    const nameOrEmail = rec.agent?.name || rec.agent?.email || "Unknown";

    if (!byUser[id]) {
      byUser[id] = { nameOrEmail, count: 0 };
    }
    byUser[id].count += 1;
  }

  return NextResponse.json({
    recordingsByDate: Object.entries(byDate).map(([date, count]) => ({ date, count })),
    recordingsByUser: Object.entries(byUser).map(([userId, val]) => ({
      userId,
      nameOrEmail: val.nameOrEmail,
      count: val.count,
    })),
  });
}
