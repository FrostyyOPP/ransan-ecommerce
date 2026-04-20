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
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { FX, SYMBOLS } from './utils/currency.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`[api] http://localhost:${PORT}`)))
  .catch((err) => { console.error('[db]', err.message); process.exit(1); });
