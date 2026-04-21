import { Router } from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { category, q, size, color, minPrice, maxPrice, tag, sort = 'newest', page = 1, limit = 24, includeInactive } = req.query;
    const filter = includeInactive === 'true' ? {} : { isActive: true };

    if (category) {
      const cat = await Category.findOne({ slug: category.toLowerCase() });
      if (cat) filter.category = cat._id;
      else return res.json({ items: [], total: 0 });
    }
    if (q) filter.$text = { $search: q };
    if (size) filter.sizes = size.toUpperCase();
    if (color) filter['colors.name'] = new RegExp(`^${color}$`, 'i');
    if (tag) filter.tags = tag.toLowerCase();
    if (minPrice || maxPrice) {
      filter.priceINR = {};
      if (minPrice) filter.priceINR.$gte = Number(minPrice);
      if (maxPrice) filter.priceINR.$lte = Number(maxPrice);
    }

    const sortMap = {
      newest: { createdAt: -1 },
      'price-asc': { priceINR: 1 },
      'price-desc': { priceINR: -1 },
      rating: { rating: -1 },
    };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortMap[sort] || sortMap.newest).skip(skip).limit(Number(limit)).populate('category', 'name slug').lean(),
      Product.countDocuments(filter),
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category', 'name slug').lean();
    if (!product) return res.status(404).json({ error: 'product not found' });
    const related = await Product.find({
      category: product.category._id, _id: { $ne: product._id }, isActive: true,
    }).limit(4).lean();
    res.json({ product, related });
  } catch (e) { next(e); }
});

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try { res.status(201).json(await Product.create(req.body)); }
  catch (e) { next(e); }
});

router.patch('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
