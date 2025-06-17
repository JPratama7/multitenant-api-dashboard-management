import { NextRequest, NextResponse } from 'next/server';
import { isAdminUser } from '@/lib/admin-auth';
import * as db from '@/lib/models';

// GET /api/admin/client-meta/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = req.headers.get('x-user-id');
  if (!userId || !isAdminUser(userId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { id } = params;
  try {
    const clientMeta = await db.ClientMeta.findByPk(id);
    if (!clientMeta) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(clientMeta);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/admin/client-meta/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = req.headers.get('x-user-id');
  if (!userId || !isAdminUser(userId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { id } = params;
  try {
    const body = await req.json();
    const clientMeta = await db.ClientMeta.findByPk(id);
    if (!clientMeta) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    // Only allow updating model fields
    const updatableFields = ['approved', 'currentUsage', 'maxUsage', 'clientSecret', 'clientWebhook', 'userId'];
    for (const key of updatableFields) {
      if (key in body) {
        (clientMeta as any)[key] = body[key];
      }
    }
    await clientMeta.save();
    return NextResponse.json(clientMeta);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/admin/client-meta/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = req.headers.get('x-user-id');
  if (!userId || !isAdminUser(userId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { id } = params;
  try {
    const clientMeta = await db.ClientMeta.findByPk(id);
    if (!clientMeta) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    await clientMeta.destroy();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
