import { NextRequest, NextResponse } from 'next/server';
import { isAdminUser } from '@/lib/admin-auth';
import { generateApiKey } from '@/lib/generate-api-key';
import * as db from '@/lib/models';
import { ClientMetaCreateSchema } from '@/lib/request/client-meta-schema';

export async function POST(req: NextRequest) {
  // Admin authentication
  const userId = req.headers.get('x-user-id');
  if (!userId || !isAdminUser(userId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await ClientMetaCreateSchema.parseAsync(req.json());
  const { maxUsage, userId: clientId, clientSecret, clientWebhook } = body;

  try {
    const apiKey = await generateApiKey();
    const created = await db.ClientMeta.create({
      userId: clientId,
      maxUsage,
      apiKey,
      approved: false,
      clientSecret,
      clientWebhook,
      currentUsage: 0,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin authentication
  const userId = req.headers.get('x-user-id');
  if (!userId || !isAdminUser(userId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Basic pagination: ?page=1&limit=20
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await db.ClientMeta.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
    return NextResponse.json({ data: rows, total: count, page, limit });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
