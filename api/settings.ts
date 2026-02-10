import { NextRequest, NextResponse } from 'next/server';
import { db } from '../server/db';
import { settings, updateSettingsSchema } from '@shared/schema';

export async function GET() {
  const [current] = await db.select().from(settings).limit(1);
  return NextResponse.json(current);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const validated = updateSettingsSchema.parse(body);
  const [existing] = await db.select().from(settings).limit(1);

  const [updated] = await db.update(settings)
    .set({ ...validated, updatedAt: new Date() })
    .where(existing ? { id: existing.id } : undefined)
    .returning();

  return NextResponse.json(updated || {});
}
