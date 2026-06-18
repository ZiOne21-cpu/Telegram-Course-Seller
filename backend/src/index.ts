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

// CORS configuration - allow all origins for now
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-id'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests explicitly
app.options('*', cors());

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
