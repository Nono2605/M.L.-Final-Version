import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertQuoteSchema, updateQuoteSchema } from "../server/schema";
import { storage } from "../server/storage";
import { transporter } from "../server/mailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "POST") {
      const validated = insertQuoteSchema.parse(req.body);

      // 1) Enregistrer en base
      const quote = await storage.createQuote(validated);

      // 2) Envoyer email admin (best-effort: ne bloque pas si ça échoue)
      try {
        const to = process.env.ADMIN_EMAIL || process.env.SMTP_USER || "info@suissetoiture.ch";
        const fromUser = process.env.SMTP_USER || "info@suissetoiture.ch";

        await transporter.sendMail({
          from: `"SuisseToiture" <${fromUser}>`,
          to,
          subject: `Nouveau devis #${quote.id} - ${quote.service}`,
          html: `
            <h2>Nouveau devis reçu</h2>
            <p><strong>Nom:</strong> ${quote.prenom ?? ""} ${quote.nom ?? ""}</p>
            <p><strong>Email:</strong> ${quote.email ?? "-"}</p>
            <p><strong>Téléphone:</strong> ${quote.telephone ?? "-"}</p>
            <p><strong>WhatsApp:</strong> ${quote.whatsapp ?? "-"}</p>
            <hr />
            <p><strong>Type:</strong> ${quote.projectType}</p>
            <p><strong>Service:</strong> ${quote.service}</p>
            <p><strong>Superficie:</strong> ${quote.superficie} m²</p>
            <p><strong>Adresse:</strong> ${quote.adresse ?? "-"}</p>
          `,
        });
      } catch (e) {
        console.error("SMTP email failed:", e);
      }

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
    return res.status(400).json({ error: err?.message ?? "Invalid request" });
  }
}
