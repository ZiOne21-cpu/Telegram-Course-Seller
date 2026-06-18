import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import coursesRouter from './routes/courses';
import ordersRouter from './routes/orders';
import settingsRouter from './routes/settings';
import statsRouter from './routes/stats';
import { getBot } from './bot';

const app = express();
const PORT = process.env.PORT || 3001;

// Allow both frontend and admin URLs in production
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  process.env.ADMIN_URL || 'http://localhost:5174',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: '*', // Allow all origins temporarily to fix CORS
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-id'],
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../data/uploads')));
app.use('/thumbnails', express.static(path.join(__dirname, '../../data/thumbnails')));

app.use('/api/courses', coursesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/stats', statsRouter);

app.get('/health', (req, res) => res.json({ ok: true }));

// Initialize bot (skip if placeholder or dev bypass)
const botToken = process.env.BOT_TOKEN || '';
if (botToken && botToken !== 'your_bot_token_here') {
  try {
    getBot();
    console.log('✅ Telegram bot started');
  } catch (e) {
    console.warn('⚠️  Bot failed to start (check BOT_TOKEN):', (e as Error).message);
  }
} else {
  console.log('ℹ️  Bot skipped (no valid BOT_TOKEN) — running in dev mode');
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
