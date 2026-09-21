import { NextRequest, NextResponse } from 'next/server';
import { noticeRepo } from '@/lib/repository';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const notices = noticeRepo.getPublished(category);
    return NextResponse.json(notices);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}
