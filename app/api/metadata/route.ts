import { NextResponse } from 'next/server';
import { createClientMeta, getClientMeta, getAllClientMeta, getClientMetaByUserId } from '@/lib/clientMetaCrud';
import { ZodError } from 'zod';
import {ClientSchema} from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');

  if (id) {
    const clientMeta = await getClientMeta(id);
    if (clientMeta) {
      return NextResponse.json(clientMeta);
    } else {
      return new NextResponse('ClientMeta not found', { status: 404 });
    }
  } else if (userId) {
    const clientMeta = await getClientMetaByUserId(userId);
    if (clientMeta) {
      return NextResponse.json(clientMeta);
    } else {
      return new NextResponse('ClientMeta not found for this user', { status: 404 });
    }
  } else {
    const allClientMeta = await getAllClientMeta();
    return NextResponse.json(allClientMeta);
  }
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const data = ClientSchema.parse(raw);
    const newClientMeta = await createClientMeta(data);
    return NextResponse.json(newClientMeta, { status: 201 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    } else {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
}