// app/api/admin/users/[userId]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Role, User } from '@prisma/client'; // Make sure to import 'User' and 'Role' for typing

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> } // params is a Promise in Next.js 15
) {
  const { userId } = await params; // AWAIT params here!

  // Explicitly type the user variable
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      // ADD THESE MISSING FIELDS:
      emailVerified: true,
      image: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Explicitly type the response to ensure consistency
  return NextResponse.json<User>(user);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const { name, email, role } = await req.json();

  if (email && typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (role && !Object.values(Role).includes(role as Role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    const dataToUpdate: Partial<User> = {
      name: name ?? undefined,
      email: email ?? undefined,
      role: role ?? undefined,
    };

    const updatedUser: User = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // Make sure you select these fields here too if you want the full User type returned
        emailVerified: true,
        image: true,
      },
    });

    return NextResponse.json<User>(updatedUser);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    let errorMessage = 'Failed to update user';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: string }).message === 'string') {
      errorMessage = (err as { message: string }).message;
    }
    console.error('Error updating user:', errorMessage, err);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}