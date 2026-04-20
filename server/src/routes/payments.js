import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = Router();

// Stub: when STRIPE_SECRET_KEY is set, create a real Checkout Session.
// For now return a mocked session so the flow is testable.
router.post('/checkout-session', requireAuth, async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    if (!order) return res.status(404).json({ error: 'order not found' });

    if (!process.env.STRIPE_SECRET_KEY) {
      const mockSessionId = `cs_mock_${Date.now()}`;
      order.payment = { provider: 'stripe-mock', sessionId: mockSessionId, status: 'created' };
      await order.save();
      return res.json({
        mocked: true,
        sessionId: mockSessionId,
        url: `/checkout/success?orderId=${order._id}&session=${mockSessionId}`,
      });
    }

    // Real Stripe integration intentionally left until user adds a key.
    return res.status(501).json({ error: 'Stripe not configured — set STRIPE_SECRET_KEY' });
  } catch (e) { next(e); }
});

// Mark an order paid from the mock success page.
router.post('/confirm-mock', requireAuth, async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    if (!order) return res.status(404).json({ error: 'order not found' });
    order.status = 'PAID';
    order.payment.status = 'succeeded';
    await order.save();
    res.json(order);
  } catch (e) { next(e); }
});

export default router;
