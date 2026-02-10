import { NextRequest, NextResponse } from 'next/server';
import { db } from '../server/db';
import { settings } from '@shared/schema';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const [current] = await db.select().from(settings).limit(1);
  return NextResponse.json({ valid: password === current?.adminPassword });
}
