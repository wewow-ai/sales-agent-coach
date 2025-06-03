// app/api/recordings/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Type 'params' as a Promise
) {
  try {
    const { id } = await params; // Await 'params' before destructuring

    const recording = await prisma.recording.findUnique({
      where: { id: id }, // Use the awaited 'id'
      include: {
        agent: {
          select: {
            name: true,
            email: true,
          },
        },
        scenario: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!recording) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: recording.id,
      createdAt: recording.createdAt,
      audioUrl: recording.audioUrl ?? null,
      transcript: recording.transcript ?? [],
      feedback: recording.feedback ?? null,
      agent: recording.agent,
      scenario: recording.scenario,
    });
  } catch (error) {
    console.error('Error fetching recording:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}