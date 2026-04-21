import { Router } from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Admin: list all users with order counts
router.get('/', requireAuth, requireAdmin, async (_req, res, next) => {
  try {
    const users = await User.find({}).select('-passwordHash').sort({ createdAt: -1 }).lean();
    const counts = await Order.aggregate([
      { $group: { _id: '$user', orders: { $sum: 1 }, spent: { $sum: '$totalINR' } } },
    ]);
    const map = Object.fromEntries(counts.map(c => [c._id.toString(), c]));
    res.json(users.map(u => ({
      ...u,
      orderCount: map[u._id.toString()]?.orders || 0,
      totalSpent: map[u._id.toString()]?.spent || 0,
    })));
  } catch (e) { next(e); }
});

export default router;
