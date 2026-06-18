import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../db';
import { telegramAuth, adminAuth, simpleAdminAuth } from '../middleware';
import { sendInviteLink, sendRejectionMessage, generateInviteLink, sendInviteLinkSafe, sendRejectionSafe } from '../bot';

const router = Router();

const uploadDir = path.join(__dirname, '../../../data/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Buyer: submit order with screenshot
router.post('/', telegramAuth, upload.single('screenshot'), async (req: Request, res: Response) => {
  const user = (req as any).telegramUser;
  const { course_id, full_name, phone } = req.body;

  if (!course_id || !full_name || !phone) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const course = db.prepare('SELECT id FROM courses WHERE id=? AND active=1').get(course_id);
  if (!course) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }

  const existing = db.prepare("SELECT id FROM orders WHERE course_id=? AND telegram_id=? AND status != 'rejected'").get(course_id, String(user.id));
  if (existing) {
    res.status(409).json({ error: 'You already have a pending or approved order for this course' });
    return;
  }

  const screenshotPath = req.file ? req.file.filename : null;

  const result = db.prepare(
    'INSERT INTO orders (course_id, telegram_id, telegram_username, full_name, phone, screenshot_path) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(course_id, String(user.id), user.username || '', full_name, phone, screenshotPath);

  res.json({ id: result.lastInsertRowid, message: 'Order submitted successfully' });
});

// Buyer: get my orders
router.get('/mine', telegramAuth, (req: Request, res: Response) => {
  const user = (req as any).telegramUser;
  const orders = db.prepare(`
    SELECT o.*, c.title as course_title, c.price as course_price 
    FROM orders o 
    JOIN courses c ON o.course_id = c.id 
    WHERE o.telegram_id = ? 
    ORDER BY o.created_at DESC
  `).all(String(user.id));
  res.json(orders);
});

// Admin: get all orders with optional status filter
router.get('/all', simpleAdminAuth, (req: Request, res: Response) => {
  const { status } = req.query;
  let query = `
    SELECT o.*, c.title as course_title, c.price as course_price, c.channel_id
    FROM orders o 
    JOIN courses c ON o.course_id = c.id
  `;
  const params: any[] = [];
  if (status && status !== 'all') {
    query += ' WHERE o.status = ?';
    params.push(status);
  }
  query += ' ORDER BY o.created_at DESC';
  const orders = db.prepare(query).all(...params);
  res.json(orders);
});

// Admin: approve order
router.post('/:id/approve', simpleAdminAuth, async (req: Request, res: Response) => {
  const order = db.prepare(`
    SELECT o.*, c.title as course_title, c.channel_id 
    FROM orders o JOIN courses c ON o.course_id = c.id 
    WHERE o.id = ?
  `).get(req.params.id) as any;

  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  if (order.status === 'approved') {
    res.status(400).json({ error: 'Already approved' });
    return;
  }

  try {
    const inviteLink = await generateInviteLink(order.channel_id);
    db.prepare("UPDATE orders SET status='approved', invite_link=?, updated_at=datetime('now') WHERE id=?")
      .run(inviteLink, order.id);
    await sendInviteLinkSafe(order.telegram_id, order.course_title, inviteLink);
    res.json({ message: 'Order approved', invite_link: inviteLink });
  } catch (err: any) {
    res.status(500).json({ error: `Failed to generate invite link: ${err.message}` });
  }
});

// Admin: reject order
router.post('/:id/reject', simpleAdminAuth, async (req: Request, res: Response) => {
  const { note } = req.body;
  const order = db.prepare(`
    SELECT o.*, c.title as course_title 
    FROM orders o JOIN courses c ON o.course_id = c.id 
    WHERE o.id = ?
  `).get(req.params.id) as any;

  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }

  db.prepare("UPDATE orders SET status='rejected', reject_note=?, updated_at=datetime('now') WHERE id=?")
    .run(note || '', order.id);

  try {
    await sendRejectionSafe(order.telegram_id, order.course_title, note || '');
  } catch (err) {
    console.error('Failed to send rejection message:', err);
  }

  res.json({ message: 'Order rejected' });
});

export default router;
