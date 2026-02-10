import { NextRequest, NextResponse } from 'next/server';
import { db } from '../server/db';
import { insertQuoteSchema, quotes } from '@shared/schema';
import { desc } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const validated = insertQuoteSchema.parse(body);
    const [quote] = await db.insert(quotes).values(validated).returning();
    return NextResponse.json(quote);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET() {
  const allQuotes = await db.select().from(quotes).orderBy(desc(quotes.createdAt));
  return NextResponse.json(allQuotes);
}
