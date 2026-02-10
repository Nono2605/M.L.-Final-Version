import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { password } = req.body ?? {};
    const settings = await storage.getSettings();
    return res.status(200).json({ valid: password === settings.adminPassword });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error verifying password" });
  }
}
