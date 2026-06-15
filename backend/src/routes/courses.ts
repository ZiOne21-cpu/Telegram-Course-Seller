import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../db';
import { telegramAuth, adminAuth } from '../middleware';

const router = Router();

// Thumbnail upload storage
const thumbDir = path.join(__dirname, '../../../data/thumbnails');
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

const thumbStorage = multer.diskStorage({
  destination: thumbDir,
  filename: (req, file, cb) => {
    cb(null, `thumb-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const uploadThumb = multer({ storage: thumbStorage, limits: { fileSize: 5 * 1024 * 1024 } });

// Helper: extract channel ID from a Telegram link or return as-is if already numeric
function resolveChannelId(input: string): string {
  // Already a numeric ID like -1001234567890
  if (/^-?\d+$/.test(input.trim())) return input.trim();
  // t.me/+hash or t.me/joinchat/hash  → store the link directly; bot uses it via username
  // t.me/username → @username format for bot
  const usernameMatch = input.match(/t\.me\/([^/?+]+)/);
  if (usernameMatch) return `@${usernameMatch[1]}`;
  // Fallback: return as-is (e.g. @channelname)
  return input.trim();
}

// Thumbnail upload endpoint (admin only)
router.post('/upload-thumbnail', telegramAuth, adminAuth, uploadThumb.single('thumbnail'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  res.json({ url: `/thumbnails/${req.file.filename}` });
});

// Public: list active courses
router.get('/', telegramAuth, (req: Request, res: Response) => {
  const courses = db.prepare('SELECT id, title, description, price, thumbnail_url FROM courses WHERE active = 1 ORDER BY created_at DESC').all();
  res.json(courses);
});

// Admin: list all courses
router.get('/all', telegramAuth, adminAuth, (req: Request, res: Response) => {
  const courses = db.prepare('SELECT * FROM courses ORDER BY created_at DESC').all();
  res.json(courses);
});

// Admin: create course
router.post('/', telegramAuth, adminAuth, (req: Request, res: Response) => {
  const { title, description, price, thumbnail_url, channel_id } = req.body;
  if (!title || !description || !price || !channel_id) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  const resolvedId = resolveChannelId(channel_id);
  const result = db.prepare(
    'INSERT INTO courses (title, description, price, thumbnail_url, channel_id) VALUES (?, ?, ?, ?, ?)'
  ).run(title, description, Number(price), thumbnail_url || '', resolvedId);
  res.json({ id: result.lastInsertRowid, message: 'Course created' });
});

// Admin: update course
router.put('/:id', telegramAuth, adminAuth, (req: Request, res: Response) => {
  const { title, description, price, thumbnail_url, channel_id, active } = req.body;
  const resolvedId = resolveChannelId(channel_id);
  db.prepare(
    'UPDATE courses SET title=?, description=?, price=?, thumbnail_url=?, channel_id=?, active=? WHERE id=?'
  ).run(title, description, Number(price), thumbnail_url || '', resolvedId, active ? 1 : 0, req.params.id);
  res.json({ message: 'Course updated' });
});

// Admin: delete course
router.delete('/:id', telegramAuth, adminAuth, (req: Request, res: Response) => {
  db.prepare('DELETE FROM courses WHERE id=?').run(req.params.id);
  res.json({ message: 'Course deleted' });
});

export default router;
