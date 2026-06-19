import { Request, Response, NextFunction } from 'express';
import { validateTelegramWebApp, extractTelegramUser } from './auth';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_IDS || '').split(',').map(s => s.trim()).filter(Boolean);

export function telegramAuth(req: Request, res: Response, next: NextFunction): void {
  const initData = req.headers['x-telegram-init-data'] as string;

  if (!initData) {
    // Dev mode bypass
    if (process.env.NODE_ENV === 'development' && process.env.DEV_BYPASS_AUTH === 'true') {
      (req as any).telegramUser = { id: '387957921', username: 'devuser', first_name: 'Dev' };
      return next();
    }
    res.status(401).json({ error: 'Missing Telegram init data' });
    return;
  }

  if (!validateTelegramWebApp(initData, BOT_TOKEN)) {
    res.status(401).json({ error: 'Invalid Telegram signature' });
    return;
  }

  const user = extractTelegramUser(initData);
  if (!user) {
    res.status(401).json({ error: 'Could not extract user' });
    return;
  }

  (req as any).telegramUser = user;
  next();
}

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const user = (req as any).telegramUser;
  if (!user || !ADMIN_IDS.includes(String(user.id))) {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
}

// Simple admin auth for admin panel (doesn't use Telegram WebApp)
export function simpleAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const adminId = req.headers['x-admin-id'] as string;
  
  // TEMPORARY FIX: Allow if admin ID matches expected ID
  if (adminId && adminId.trim() === '387957921') {
    next();
    return;
  }
  
  // Fallback: check against environment variable list
  if (!adminId) {
    res.status(401).json({ error: 'Missing admin ID' });
    return;
  }
  
  if (ADMIN_IDS.length > 0 && !ADMIN_IDS.includes(adminId.trim())) {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  
  // If ADMIN_IDS is empty, allow any request (dev mode)
  next();
}
