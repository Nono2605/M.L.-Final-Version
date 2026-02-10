// /api/settings.ts
import { updateSettingsSchema } from '@shared/schema';
import { storage } from '@/server/storage';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const settings = await storage.getSettings();
      res.status(200).json(settings);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const validatedData = updateSettingsSchema.parse(req.body);
      const settings = await storage.updateSettings(validatedData);
      res.status(200).json(settings);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
