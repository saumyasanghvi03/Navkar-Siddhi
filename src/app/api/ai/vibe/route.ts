import { NextRequest, NextResponse } from 'next/server';
import { dailyVibeFlow } from '@/ai/flows';

export async function POST(_request: NextRequest) {
  try {
    const vibe = await dailyVibeFlow();
    return NextResponse.json({ vibe });
  } catch (err) {
    console.error('[ai/vibe]', err);
    return NextResponse.json(
      { error: 'AI service unavailable. Please ensure GOOGLE_GENAI_API_KEY is configured.' },
      { status: 503 }
    );
  }
}
