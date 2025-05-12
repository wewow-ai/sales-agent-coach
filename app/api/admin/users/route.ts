// admin/users/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'
import { prisma } from '@/lib/prisma' 

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
