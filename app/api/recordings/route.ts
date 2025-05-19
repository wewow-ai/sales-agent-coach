// app/api/recordings/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const recordings = await prisma.recording.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        agent: true,
        scenario: true,
      },
    });

    return NextResponse.json(recordings);
  } catch (error) {
    console.error('Error fetching recordings:', error);
    return NextResponse.json({ message: 'Failed to fetch recordings' }, { status: 500 });
  }
}
