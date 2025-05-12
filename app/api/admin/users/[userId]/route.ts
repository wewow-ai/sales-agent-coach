// app/api/admin/users/[userId]/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // Update path as needed
import { Role } from '@prisma/client'

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { name, email, role } = await req.json()

  if (email && typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (role && !Object.values(Role).includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: {
        name: name ?? undefined,
        email: email ?? undefined,
        role: role ?? undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}
