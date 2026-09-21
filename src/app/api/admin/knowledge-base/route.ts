import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdminRequest } from '@/lib/auth';
import { knowledgeRepo } from '@/lib/repository';

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const chunks = knowledgeRepo.getAll();
  return NextResponse.json(chunks);
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const created = knowledgeRepo.create({
      title: data.title,
      content: data.content,
      source_name: data.source_name || 'Official VDCET Document',
      category: data.category || 'General',
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create knowledge chunk' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Knowledge ID is required' }, { status: 400 });
    }

    const updated = knowledgeRepo.update(id, data);
    return NextResponse.json({ success: updated, id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update knowledge chunk' }, { status: 500 });
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

    const deleted = knowledgeRepo.delete(Number(idStr));
    return NextResponse.json({ success: deleted });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete knowledge chunk' }, { status: 500 });
  }
}
