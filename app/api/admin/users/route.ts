// app/api/admin/users/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'
import { prisma } from '@/lib/prisma' 
import { Role } from '@prisma/client'


export async function GET() {
  const session = await getServerSession(authConfig)
  console.log('Session bla bla bla:', session)  // Log session to check if role is present


  // // Optional: Only allow admins
  // if (!session || session.user.role !== 'ADMIN') {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    console.log(users, "looging users")  // Log the users to inspect the role field

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error.message)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const { name, email, role } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  if (role && !Object.values(Role).includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role: role ?? Role.SALES_AGENT, // Default role if not provided
      },
    })

    return NextResponse.json(newUser)
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
