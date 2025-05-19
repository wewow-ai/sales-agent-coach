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
        agent: true,
        scenario: true,
      },
    });

    if (!recording) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(recording);
  } catch (error) {
    console.error('Error fetching recording:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
