import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const scenario = await prisma.scenario.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      description: true,
      transcript: true,
      breakdown: true,
    },
  })

  if (!scenario) {
    return new NextResponse('Not found', { status: 404 })
  }

  return NextResponse.json(scenario)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const data = await req.json()

  const updated = await prisma.scenario.update({
    where: { id: params.id },
    data: {
      title: data.title,
      description: data.description,
      transcript: data.transcript,
      breakdown: data.breakdown,
    },
  })

  return NextResponse.json(updated)
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  await prisma.scenario.delete({
    where: { id: params.id },
  })

  return new NextResponse(null, { status: 204 })
}
