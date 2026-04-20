import { Router } from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { FX, convert } from '../utils/currency.js';

const router = Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { shipping, displayCurrency = 'INR' } = req.body;
    if (!shipping?.name || !shipping?.line1 || !shipping?.city) {
      return res.status(400).json({ error: 'shipping address required' });
    }
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || !cart.items.length) return res.status(400).json({ error: 'cart empty' });

    const items = cart.items.map(i => ({
      product: i.product._id,
      name: i.product.name,
      image: i.product.images?.[0],
      size: i.size,
      color: i.color,
      qty: i.qty,
      priceINR: i.priceINR,
    }));
    const subtotalINR = items.reduce((s, i) => s + i.priceINR * i.qty, 0);
    const shippingINR = subtotalINR >= 2999 ? 0 : 99;
    const totalINR = subtotalINR + shippingINR;
    const fxRate = FX[displayCurrency] ?? 1;
    const totalDisplay = convert(totalINR, displayCurrency);

    const order = await Order.create({
      orderNo: Order.generateOrderNo(),
      user: req.user._id,
      items, subtotalINR, shippingINR, totalINR,
      displayCurrency, fxRate, totalDisplay,
      shipping, status: 'PENDING',
    });

    cart.items = []; await cart.save();
    res.status(201).json(order);
  } catch (e) { next(e); }
});

router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (e) { next(e); }
});

router.get('/', requireAuth, requireAdmin, async (_req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'name email').limit(100).lean();
    res.json(orders);
  } catch (e) { next(e); }
});

router.patch('/:id/status', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (e) { next(e); }
});

router.get('/admin/stats', requireAuth, requireAdmin, async (_req, res, next) => {
  try {
    const [revenue, orders, visitors, topProducts] = await Promise.all([
      Order.aggregate([
        { $match: { status: { $in: ['PAID','SHIPPED','DELIVERED'] } } },
        { $group: { _id: null, total: { $sum: '$totalINR' }, count: { $sum: 1 } } },
      ]),
      Order.countDocuments({}),
      User.countDocuments({}),
      Order.aggregate([
        { $unwind: '$items' },
        { $group: { _id: '$items.product', name: { $first: '$items.name' }, sold: { $sum: '$items.qty' } } },
        { $sort: { sold: -1 } },
        { $limit: 5 },
      ]),
    ]);
    res.json({
      revenueINR: revenue[0]?.total || 0,
      paidOrders: revenue[0]?.count || 0,
      orders,
      visitors,
      topProducts,
    });
  } catch (e) { next(e); }
});

export default router;
