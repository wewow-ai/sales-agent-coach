import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recording = await prisma.recording.findUnique({
      where: { id: params.id },
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
