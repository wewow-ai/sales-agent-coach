// app/api/admin/users/[userId]/role/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
  const body = await req.json()
  const { role } = body

  if (!['ADMIN', 'USER', 'AGENT'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: { role },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: 'User not found or update failed' }, { status: 500 })
  }
}
