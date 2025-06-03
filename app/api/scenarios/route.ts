// app/api/admin/scenarios/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const scenarios = await prisma.scenario.findMany({
    include: {
      createdBy: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(scenarios)
}

