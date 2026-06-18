import { Router, Request, Response } from 'express';
import db from '../db';
import { telegramAuth, adminAuth, simpleAdminAuth } from '../middleware';

const router = Router();

router.get('/', simpleAdminAuth, (req: Request, res: Response) => {
  const totalRevenue = (db.prepare("SELECT SUM(c.price) as total FROM orders o JOIN courses c ON o.course_id=c.id WHERE o.status='approved'").get() as any)?.total || 0;
  const totalBuyers = (db.prepare("SELECT COUNT(DISTINCT telegram_id) as count FROM orders WHERE status='approved'").get() as any)?.count || 0;
  const pendingCount = (db.prepare("SELECT COUNT(*) as count FROM orders WHERE status='pending'").get() as any)?.count || 0;
  const approvedCount = (db.prepare("SELECT COUNT(*) as count FROM orders WHERE status='approved'").get() as any)?.count || 0;
  const rejectedCount = (db.prepare("SELECT COUNT(*) as count FROM orders WHERE status='rejected'").get() as any)?.count || 0;

  const revenueByCourseFull = db.prepare(`
    SELECT c.title, SUM(c.price) as revenue, COUNT(*) as sales
    FROM orders o JOIN courses c ON o.course_id=c.id
    WHERE o.status='approved'
    GROUP BY c.id
    ORDER BY revenue DESC
  `).all();

  res.json({
    totalRevenue,
    totalBuyers,
    pendingCount,
    approvedCount,
    rejectedCount,
    revenueByCourse: revenueByCourseFull
  });
});

export default router;
