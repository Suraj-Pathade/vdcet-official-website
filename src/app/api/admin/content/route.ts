import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdminRequest } from '@/lib/auth';
import { contentRepo } from '@/lib/repository';

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const content = contentRepo.getAll();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.key || data.value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    contentRepo.set(data.key, data.value);
    return NextResponse.json({ success: true, key: data.key, value: data.value });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
