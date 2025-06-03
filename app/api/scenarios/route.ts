// app/api/admin/scenarios/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'

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

