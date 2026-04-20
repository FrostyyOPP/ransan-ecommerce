import { Router } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

async function getOrCreate(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

async function populated(cart) {
  return cart.populate({ path: 'items.product', select: 'name slug images priceINR compareAtINR colors sizes' });
}

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const cart = await getOrCreate(req.user._id);
    res.json(await populated(cart));
  } catch (e) { next(e); }
});

router.post('/items', requireAuth, async (req, res, next) => {
  try {
    const { productId, size, color, qty = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'product not found' });
    const cart = await getOrCreate(req.user._id);
    const existing = cart.items.find(i =>
      i.product.toString() === productId && i.size === size && i.color === color
    );
    if (existing) existing.qty += Number(qty);
    else cart.items.push({ product: productId, size, color, qty, priceINR: product.priceINR });
    await cart.save();
    res.json(await populated(cart));
  } catch (e) { next(e); }
});

router.patch('/items', requireAuth, async (req, res, next) => {
  try {
    const { productId, size, color, qty } = req.body;
    const cart = await getOrCreate(req.user._id);
    const item = cart.items.find(i =>
      i.product.toString() === productId && i.size === size && i.color === color
    );
    if (!item) return res.status(404).json({ error: 'item not in cart' });
    if (qty <= 0) cart.items = cart.items.filter(i => i !== item);
    else item.qty = qty;
    await cart.save();
    res.json(await populated(cart));
  } catch (e) { next(e); }
});

router.delete('/items', requireAuth, async (req, res, next) => {
  try {
    const { productId, size, color } = req.body;
    const cart = await getOrCreate(req.user._id);
    cart.items = cart.items.filter(i =>
      !(i.product.toString() === productId && i.size === size && i.color === color)
    );
    await cart.save();
    res.json(await populated(cart));
  } catch (e) { next(e); }
});

router.delete('/', requireAuth, async (req, res, next) => {
  try {
    const cart = await getOrCreate(req.user._id);
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (e) { next(e); }
});

export default router;
