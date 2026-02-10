// /api/admin.ts
import { storage } from '@/server/storage';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { password } = req.body;
      const settings = await storage.getSettings();
      if (password === settings.adminPassword) {
        res.status(200).json({ valid: true });
      } else {
        res.status(200).json({ valid: false });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error verifying password' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
