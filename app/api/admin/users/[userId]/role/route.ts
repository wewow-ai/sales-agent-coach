// app/api/admin/users/[userId]/role/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Corrected PATCH function signature for Next.js 15
export async function PATCH(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const body = await req.json()
  const { role } = body

  // AWAIT params here!
  const { userId } = await params;

  if (!['ADMIN', 'TEAM_LEAD', 'SALES_AGENT'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Use the awaited userId
      data: { role },
    })
    return NextResponse.json(updatedUser)
  } catch (error) { // Added error parameter for better logging/debugging
    console.error("Error updating user role:", error); // Log the actual error
    return NextResponse.json({ error: 'User not found or update failed' }, { status: 500 })
  }
}