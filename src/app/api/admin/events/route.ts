import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdminRequest } from '@/lib/auth';
import { eventRepo } from '@/lib/repository';

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const events = eventRepo.getAllAdmin();
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.date || !data.description) {
      return NextResponse.json({ error: 'Title, date, and description are required' }, { status: 400 });
    }

    const created = eventRepo.create({
      title: data.title,
      date: data.date,
      location: data.location || 'VDCET Campus',
      description: data.description,
      image_url: data.image_url || null,
      status: data.status || 'Published',
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const updated = eventRepo.update(id, data);
    return NextResponse.json({ success: updated, id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
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

    const deleted = eventRepo.delete(Number(idStr));
    return NextResponse.json({ success: deleted });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
