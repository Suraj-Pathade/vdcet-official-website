import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdminRequest } from '@/lib/auth';
import { noticeRepo } from '@/lib/repository';

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const notices = noticeRepo.getAllAdmin();
  return NextResponse.json(notices);
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.content || !data.date) {
      return NextResponse.json({ error: 'Title, content, and date are required' }, { status: 400 });
    }

    const created = noticeRepo.create({
      title: data.title,
      category: data.category || 'General',
      content: data.content,
      pdf_url: data.pdf_url || null,
      status: data.status || 'Published',
      date: data.date,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Notice ID is required' }, { status: 400 });
    }

    const updated = noticeRepo.update(id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Notice not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
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

    const deleted = noticeRepo.delete(Number(idStr));
    return NextResponse.json({ success: deleted });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}
