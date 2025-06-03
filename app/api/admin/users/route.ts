// app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/config/auth'; // Assuming this path is correct based on your config
import { prisma } from '@/lib/prisma';
import { Role, User } from '@prisma/client'; // Import User type

export async function GET() {
  const session = await getServerSession(authConfig);
  // console.log('Session bla bla bla:', session); // Log session to check if role is present

  // // Optional: Only allow admins - uncomment and use if desired
  // if (!session || session.user.role !== 'ADMIN') {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const users: User[] = await prisma.user.findMany({ // Explicitly type users as User[]
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    // console.log(users, "looging users"); // Log the users to inspect the role field

    return NextResponse.json(users);
  } catch (error: unknown) { // Type 'error' as 'unknown' or 'Error'
    let errorMessage = 'Failed to fetch users';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error fetching users:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { name, email, role } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  if (role && !Object.values(Role).includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role: role ?? Role.SALES_AGENT, // Default role if not provided
      },
    });

    return NextResponse.json(newUser);
  } catch (err: unknown) { // Change err: any to err: unknown
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2002') { // Check if 'code' exists on 'err'
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    let errorMessage = 'Failed to create user';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
        errorMessage = err.message;
    }
    console.error('Error creating user:', errorMessage); // Add more context to logging
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}