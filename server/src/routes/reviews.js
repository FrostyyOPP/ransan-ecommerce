import { Router } from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/reviews/product/:productId → list reviews + summary for a product
router.get('/product/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .sort({ createdAt: -1 }).limit(50).lean();
    const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
    const dist = [0, 0, 0, 0, 0];
    for (const r of reviews) dist[r.rating - 1] += 1;
    res.json({ reviews, count: reviews.length, average: Math.round(avg * 10) / 10, distribution: dist });
  } catch (e) { next(e); }
});

// POST /api/reviews → create a review (one per user per product)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { productId, rating, title, body, boughtSize, boughtColor } = req.body;
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'rating 1-5 required' });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'product not found' });

    const review = await Review.findOneAndUpdate(
      { product: productId, user: req.user._id },
      { product: productId, user: req.user._id, userName: req.user.name, rating, title, body, boughtSize, boughtColor },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Update denormalized rating stats on the product.
    const all = await Review.find({ product: productId }).lean();
    const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
    product.rating = Math.round(avg * 10) / 10;
    product.reviewsCount = all.length;
    await product.save();

    res.status(201).json(review);
  } catch (e) { next(e); }
});

// DELETE own review
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'not found' });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'forbidden' });
    }
    await review.deleteOne();
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
