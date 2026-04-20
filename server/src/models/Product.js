import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  colorHex: String,
  sku: String,
  stock: { type: Number, default: 0 },
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: String,
  fitNotes: String,
  care: String,
  priceINR: { type: Number, required: true },
  compareAtINR: Number,
  currency: { type: String, default: 'INR' },
  images: [String],
  colors: [{ name: String, hex: String }],
  sizes: [{ type: String }],
  variants: [variantSchema],
  tags: [String],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  featuredNew: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
