import { NextRequest, NextResponse } from 'next/server';
import { askVDCETAI } from '@/lib/rag';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question string is required' },
        { status: 400 }
      );
    }

    const result = await askVDCETAI(question);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in AI Chat route:', error);
    return NextResponse.json(
      {
        answer:
          "I couldn't find this information in the official VDCET knowledge base. Please contact the college office.",
        sources: [],
        grounded: false,
      },
      { status: 500 }
    );
  }
}
