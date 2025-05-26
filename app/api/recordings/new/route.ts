// app/api/recordings/new/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/config/auth';
import { prisma } from '@/lib/prisma';
import { generateFeedback } from '@/lib/openai'; // 👈 Add this

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const agentId = session.user.id;

  try {
    const body = await req.json();
    const { scenarioId, transcript } = body;

    if (!scenarioId || !Array.isArray(transcript)) {
      return NextResponse.json({ message: 'Missing or invalid data' }, { status: 400 });
    }
    const feedback = await generateFeedback(transcript); // 👈 Generate feedback

    const recording = await prisma.recording.create({
      data: {
        scenarioId,
        agentId,
        transcript,
        feedback,
      },
    });

    return NextResponse.json({ message: 'Recording saved', recording }, { status: 201 });
  } catch (error) {
    console.error('Error saving recording:', error);
    return NextResponse.json({ message: 'Failed to save recording' }, { status: 500 });
  }
}
