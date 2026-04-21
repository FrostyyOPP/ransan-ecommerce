import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/users.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { FX, SYMBOLS } from './utils/currency.js';

const app = express();

// CLIENT_ORIGIN can be a single URL or a comma-separated list.
// In non-prod, allow any localhost origin and Vercel preview URLs matching CLIENT_ORIGIN_REGEX.
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',').map(s => s.trim()).filter(Boolean);
const originRegex = process.env.CLIENT_ORIGIN_REGEX
  ? new RegExp(process.env.CLIENT_ORIGIN_REGEX) : null;

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // curl, server-to-server
    if (allowedOrigins.includes(origin)) return cb(null, true);
    if (originRegex && originRegex.test(origin)) return cb(null, true);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'ransan-api',
    baseCurrency: process.env.BASE_CURRENCY,
    supportedCurrencies: process.env.SUPPORTED_CURRENCIES?.split(','),
  });
});

app.get('/api/currency', (_req, res) => {
  res.json({ base: 'INR', rates: FX, symbols: SYMBOLS });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, '0.0.0.0', () => console.log(`[api] listening on :${PORT}`)))
  .catch((err) => { console.error('[db]', err.message); process.exit(1); });
