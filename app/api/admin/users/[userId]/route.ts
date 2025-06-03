// app/api/admin/users/[userId]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Role, User } from '@prisma/client'; // Make sure to import 'User' for typing

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> } // Change: params is now a Promise
) {
  const { userId } = await params; // Change: AWAIT params here!

  // Explicitly type the user variable
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId }, // Use the awaited userId
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
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
  { params }: { params: Promise<{ userId: string }> } // Change: params is now a Promise
) {
  const { userId } = await params; // Change: AWAIT params here!
  const { name, email, role } = await req.json();

  if (email && typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Ensure 'role' is a valid Role enum value if provided
  if (role && !Object.values(Role).includes(role as Role)) { // Cast role to Role to satisfy TypeScript
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    // Explicitly type the data object for clarity, though Prisma often infers well
    const dataToUpdate: Partial<User> = {
      name: name ?? undefined,
      email: email ?? undefined,
      role: role ?? undefined,
    };

    const updatedUser: User = await prisma.user.update({ // Explicitly type updatedUser
      where: { id: userId }, // Use the awaited userId
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Explicitly type the response
    return NextResponse.json<User>(updatedUser);
  } catch (err: unknown) { // Change 'err: any' to 'err: unknown' for better type safety
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    // Default error message
    let errorMessage = 'Failed to update user';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: string }).message === 'string') {
      errorMessage = (err as { message: string }).message;
    }
    console.error('Error updating user:', errorMessage, err); // Log full error for debugging

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}