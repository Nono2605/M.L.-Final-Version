// /api/quotes.ts
import { insertQuoteSchema } from '@shared/schema';
import { storage } from '@/server/storage';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.status(200).json(quote);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  } else if (req.method === 'GET') {
    try {
      const quotes = await storage.getAllQuotes();
      res.status(200).json(quotes);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch quotes' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
