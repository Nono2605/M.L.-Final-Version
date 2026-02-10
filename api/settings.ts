import type { VercelRequest, VercelResponse } from "@vercel/node";
import { updateSettingsSchema } from "@shared/schema";
import { storage } from "../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const settings = await storage.getSettings();
      return res.status(200).json(settings);
    }

    if (req.method === "PATCH") {
      const validated = updateSettingsSchema.parse(req.body);
      const settings = await storage.updateSettings(validated);
      return res.status(200).json(settings);
    }

    res.setHeader("Allow", "GET,PATCH");
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err: any) {
    return res.status(400).json({ error: err?.message ?? "Invalid request" });
  }
}
