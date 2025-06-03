// app/api/admin/scenarios/[id]/route.ts

import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Scenario } from '@prisma/client' // Import Scenario type for better typing

// Define the expected type for the context object
interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(req: Request, context: RouteContext) { // Changed { params } to context: RouteContext
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const { id } = context.params; // Destructure id from context.params

  const scenario: Scenario | null = await prisma.scenario.findUnique({ // Explicitly type scenario
    where: { id: id }, // Use the destructured id
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

  return NextResponse.json<Scenario>(scenario) // Explicitly type the response
}

export async function PATCH(req: Request, context: RouteContext) { // Changed { params } to context: RouteContext
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const { id } = context.params; // Destructure id from context.params
  const data = await req.json();

  // Validate incoming data if necessary (e.g., check for types)
  // Ensure the data fields match your Prisma schema for Scenario
  const updated: Scenario = await prisma.scenario.update({ // Explicitly type updated
    where: { id: id }, // Use the destructured id
    data: {
      title: data.title,
      description: data.description,
      transcript: data.transcript, // Assuming these types match Prisma's expectation
      breakdown: data.breakdown, // Assuming these types match Prisma's expectation
    },
  })

  return NextResponse.json<Scenario>(updated) // Explicitly type the response
}


export async function DELETE(req: Request, context: RouteContext) { // Changed { params } to context: RouteContext
  const session = await getServerSession(authConfig)
  if (session?.user?.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const { id } = context.params; // Destructure id from context.params

  await prisma.scenario.delete({
    where: { id: id }, // Use the destructured id
  })

  return new NextResponse(null, { status: 204 })
}