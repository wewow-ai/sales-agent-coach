// app/api/admin/scenarios/[id]/route.ts

import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Scenario } from '@prisma/client' // Keep this import

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const { id } = await params;

  // Include all fields required by the Scenario type, or adjust the type.
  const scenario: Scenario | null = await prisma.scenario.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      description: true,
      transcript: true,
      breakdown: true,
      // ADD THESE MISSING FIELDS:
      createdById: true,
      createdAt: true,
      // If you need relations like 'recordings', you'd include them here too
    },
  })

  if (!scenario) {
    return new NextResponse('Not found', { status: 404 })
  }

  return NextResponse.json<Scenario>(scenario)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) { // params is now a Promise
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const { id } = await params; // AWAIT params here!
  const data = await req.json();

  const updated: Scenario = await prisma.scenario.update({
    where: { id: id },
    data: {
      title: data.title,
      description: data.description,
      transcript: data.transcript,
      breakdown: data.breakdown,
    },
  })

  return NextResponse.json<Scenario>(updated)
}


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) { // params is now a Promise
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const { id } = await params; // AWAIT params here!

  await prisma.scenario.delete({
    where: { id: id },
  })

  return new NextResponse(null, { status: 204 })
}