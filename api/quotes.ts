import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertQuoteSchema, updateQuoteSchema } from "../shared/schema";
import { storage } from "../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "POST") {
      const validated = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validated);
      return res.status(200).json(quote);
    }

    if (req.method === "GET") {
      const quotes = await storage.getAllQuotes();
      return res.status(200).json(quotes);
    }

    if (req.method === "PATCH") {
      const id = Number(req.query.id);
      if (!Number.isFinite(id)) return res.status(400).json({ message: "ID invalide" });

      const validated = updateQuoteSchema.parse(req.body);
      const quote = await storage.updateQuote(id, validated);
      if (!quote) return res.status(404).json({ message: "Devis non trouvé" });

      return res.status(200).json(quote);
    }

    res.setHeader("Allow", "GET,POST,PATCH");
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err: any) {
    // Zod errors etc.
    return res.status(400).json({ error: err?.message ?? "Invalid request" });
  }
}
