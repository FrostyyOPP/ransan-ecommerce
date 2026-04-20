import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

const COLORS = [
  { name: 'Black', hex: '#0A0A0A' },
  { name: 'Bone', hex: '#F2EFE8' },
  { name: 'Acid', hex: '#E8F249' },
  { name: 'Bleed Red', hex: '#D92D1F' },
  { name: 'Forest', hex: '#2F7D3E' },
  { name: 'Muted', hex: '#6B6B68' },
];
const SIZES = ['XS','S','M','L','XL','XXL'];

// loremflickr serves free, Flickr-CC-licensed images filtered by tag.
// `lock` makes the same URL return the same image consistently.
const CATEGORY_TAGS = {
  tees: 'tshirt,streetwear',
  hoodies: 'hoodie,streetwear',
  pants: 'pants,cargo',
  accessories: 'cap,hat',
};
const PRODUCT_TAGS = {
  'Trucker Cap': 'cap,hat',
  'Canvas Tote': 'totebag,bag',
  'Chunky Socks 2-pk': 'socks',
  'Beanie': 'beanie,hat',
};

function imagesFor(productName, catSlug, seedBase, n = 4) {
  const tags = PRODUCT_TAGS[productName] || CATEGORY_TAGS[catSlug] || 'clothing';
  return Array.from({ length: n }, (_, i) =>
    `https://loremflickr.com/800/1000/${tags}?lock=${seedBase * 10 + i}`
  );
}

const categories = [
  { name: 'Tees', slug: 'tees', description: 'Heavyweight tees, oversized cuts.', coverImage: 'https://loremflickr.com/800/1000/tshirt,streetwear?lock=101', order: 1 },
  { name: 'Hoodies', slug: 'hoodies', description: 'Streetwear hoodies, garment-washed.', coverImage: 'https://loremflickr.com/800/1000/hoodie,streetwear?lock=102', order: 2 },
  { name: 'Pants', slug: 'pants', description: 'Cargo, wide-leg, relaxed fits.', coverImage: 'https://loremflickr.com/800/1000/pants,cargo?lock=103', order: 3 },
  { name: 'Accessories', slug: 'accessories', description: 'Caps, socks, totes.', coverImage: 'https://loremflickr.com/800/1000/cap,hat?lock=104', order: 4 },
];

function variantsFor(sizes, colors) {
  const v = [];
  for (const s of sizes) for (const c of colors) {
    v.push({ size: s, color: c.name, colorHex: c.hex, stock: 3 + Math.floor(Math.random() * 20) });
  }
  return v;
}

const productsByCat = {
  tees: [
    { name: 'Oversized Box Tee', priceINR: 1999, compareAtINR: 2499, tags: ['new'], featuredNew: true, colors: [COLORS[0], COLORS[1], COLORS[2], COLORS[3]] },
    { name: 'Graphic Tee "404"', priceINR: 1499, colors: [COLORS[0], COLORS[1]] },
    { name: 'Heavyweight Tee', priceINR: 2199, compareAtINR: 2499, tags: ['sale'], colors: [COLORS[1], COLORS[5]] },
    { name: 'Ribbed Crew', priceINR: 1799, colors: [COLORS[2], COLORS[0]] },
    { name: 'Monogram Tee', priceINR: 2299, featuredNew: true, tags: ['new'], colors: [COLORS[0], COLORS[4]] },
    { name: 'Acid Wash Tee', priceINR: 1999, colors: [COLORS[1], COLORS[2]] },
  ],
  hoodies: [
    { name: 'Heavyweight Hoodie', priceINR: 3499, compareAtINR: 3999, tags: ['sale'], colors: [COLORS[0], COLORS[1], COLORS[5]] },
    { name: 'Zip Hoodie "Drop 04"', priceINR: 3899, featuredNew: true, tags: ['new'], colors: [COLORS[0], COLORS[3]] },
    { name: 'Cropped Hoodie', priceINR: 2999, colors: [COLORS[1], COLORS[2]] },
  ],
  pants: [
    { name: 'Cargo Pants 04', priceINR: 2899, featuredNew: true, tags: ['new'], colors: [COLORS[0], COLORS[5]] },
    { name: 'Wide Leg Trouser', priceINR: 3199, colors: [COLORS[0], COLORS[1]] },
    { name: 'Track Pant', priceINR: 2499, colors: [COLORS[0], COLORS[4]] },
  ],
  accessories: [
    { name: 'Trucker Cap', priceINR: 899, colors: [COLORS[2], COLORS[0]], sizes: ['OS'] },
    { name: 'Canvas Tote', priceINR: 699, colors: [COLORS[1]], sizes: ['OS'] },
    { name: 'Chunky Socks 2-pk', priceINR: 499, colors: [COLORS[0], COLORS[1]], sizes: ['OS'] },
    { name: 'Beanie', priceINR: 799, colors: [COLORS[0], COLORS[3]], sizes: ['OS'] },
  ],
};

async function run() {
  await connectDB(process.env.MONGO_URI);

  await Promise.all([
    User.deleteMany({}), Category.deleteMany({}),
    Product.deleteMany({}), Cart.deleteMany({}), Order.deleteMany({}),
  ]);
  console.log('[seed] collections cleared');

  const cats = await Category.insertMany(categories);
  const catMap = Object.fromEntries(cats.map(c => [c.slug, c._id]));
  console.log(`[seed] ${cats.length} categories`);

  const allProducts = [];
  let seedBase = 200;
  for (const [slug, items] of Object.entries(productsByCat)) {
    for (const p of items) {
      const sizes = p.sizes || SIZES;
      const colors = p.colors || [COLORS[0], COLORS[1]];
      seedBase += 1;
      allProducts.push({
        ...p,
        slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        category: catMap[slug],
        description: `${p.name} — heavyweight, premium cotton. Cut for the RanSan silhouette. Boxy, oversized, built to last.`,
        fitNotes: 'Model is 6\'0" wearing M. Runs one size larger than standard.',
        care: 'Machine wash cold. Tumble dry low. Do not bleach.',
        images: imagesFor(p.name, slug, seedBase),
        sizes, colors,
        variants: variantsFor(sizes, colors),
        rating: 4 + Math.random(),
        reviewsCount: Math.floor(50 + Math.random() * 400),
      });
    }
  }
  const created = await Product.insertMany(allProducts);
  console.log(`[seed] ${created.length} products`);

  const admin = await User.create({
    name: 'Ran', email: 'admin@ransan.com', role: 'admin',
    passwordHash: await User.hashPassword('admin123'),
  });
  const demo = await User.create({
    name: 'Demo User', email: 'demo@ransan.com', role: 'user',
    passwordHash: await User.hashPassword('demo123'),
  });
  console.log(`[seed] users: admin@ransan.com / admin123  ·  demo@ransan.com / demo123`);

  // Seed a couple of orders so the admin dashboard isn't empty.
  const sample = created.slice(0, 3);
  await Order.create({
    orderNo: Order.generateOrderNo(),
    user: demo._id,
    items: sample.map(p => ({
      product: p._id, name: p.name, image: p.images[0],
      size: 'M', color: p.colors[0]?.name || 'Black',
      qty: 1, priceINR: p.priceINR,
    })),
    subtotalINR: sample.reduce((s, p) => s + p.priceINR, 0),
    shippingINR: 0,
    totalINR: sample.reduce((s, p) => s + p.priceINR, 0),
    displayCurrency: 'INR', fxRate: 1,
    totalDisplay: sample.reduce((s, p) => s + p.priceINR, 0),
    shipping: {
      name: 'Demo User', line1: '221B Linking Rd', city: 'Mumbai',
      state: 'MH', pincode: '400050', country: 'IN', phone: '+91-98xxxxxxxx',
    },
    status: 'PAID',
    payment: { provider: 'stripe-mock', status: 'succeeded' },
  });
  console.log('[seed] sample order created');

  await mongoose.disconnect();
  console.log('[seed] done');
}

run().catch((e) => { console.error(e); process.exit(1); });
