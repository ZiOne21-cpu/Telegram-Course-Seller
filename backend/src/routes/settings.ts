import { Router, Request, Response } from 'express';
import db from '../db';
import { telegramAuth, adminAuth } from '../middleware';

const router = Router();

// Public: get payment settings (for buyer checkout)
router.get('/payment', telegramAuth, (req: Request, res: Response) => {
  const rows = db.prepare("SELECT key, value FROM settings WHERE key IN ('cbe_account','cbe_name','telebirr_account','telebirr_name','payment_instructions')").all() as { key: string; value: string }[];
  const result: Record<string, string> = {};
  rows.forEach(r => { result[r.key] = r.value; });
  res.json(result);
});

// Admin: update settings
router.put('/', telegramAuth, adminAuth, (req: Request, res: Response) => {
  const allowed = ['cbe_account', 'cbe_name', 'telebirr_account', 'telebirr_name', 'payment_instructions'];
  const updates = req.body as Record<string, string>;

  const upsert = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
  const updateMany = db.transaction((data: Record<string, string>) => {
    for (const [key, value] of Object.entries(data)) {
      if (allowed.includes(key)) {
        upsert.run(key, value);
      }
    }
  });
  updateMany(updates);
  res.json({ message: 'Settings updated' });
});

export default router;
