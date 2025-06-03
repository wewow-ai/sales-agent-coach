// app/api/admin/scenarios/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'

export async function GET() {
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

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

export async function POST(req: Request) {

  const session = await getServerSession(authConfig)

  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const data = await req.json()

  const newScenario = await prisma.scenario.create({
    data: {
      title: data.title,
      description: data.description,
      transcript: data.transcript ?? '',
      breakdown: data.breakdown ?? '',
      createdById: session.user.id ?? '',
    },
  })

  return NextResponse.json(newScenario)
}


