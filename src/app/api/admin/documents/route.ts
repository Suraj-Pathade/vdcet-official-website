import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdminRequest } from '@/lib/auth';
import { documentRepo } from '@/lib/repository';

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const documents = documentRepo.getAll();
  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.file_url) {
      return NextResponse.json({ error: 'Title and file_url are required' }, { status: 400 });
    }

    const created = documentRepo.create({
      title: data.title,
      category: data.category || 'General',
      file_url: data.file_url,
      file_size: data.file_size || 'PDF',
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add document' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const idStr = searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    const deleted = documentRepo.delete(Number(idStr));
    return NextResponse.json({ success: deleted });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
