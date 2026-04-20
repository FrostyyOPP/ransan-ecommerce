import { Router } from 'express';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const cats = await Category.find({}).sort({ order: 1, name: 1 }).lean();
    const counts = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    const map = Object.fromEntries(counts.map(c => [c._id.toString(), c.count]));
    res.json(cats.map(c => ({ ...c, productCount: map[c._id.toString()] || 0 })));
  } catch (e) { next(e); }
});

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try { res.status(201).json(await Category.create(req.body)); }
  catch (e) { next(e); }
});

export default router;
