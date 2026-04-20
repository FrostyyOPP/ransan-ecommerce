import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  image: String,
  size: String,
  color: String,
  qty: Number,
  priceINR: Number,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotalINR: Number,
  shippingINR: { type: Number, default: 0 },
  totalINR: Number,
  displayCurrency: { type: String, default: 'INR' },
  fxRate: { type: Number, default: 1 },
  totalDisplay: Number,
  shipping: {
    name: String, line1: String, line2: String, city: String,
    state: String, pincode: String, country: String, phone: String,
  },
  payment: {
    provider: { type: String, default: 'stripe' },
    sessionId: String,
    paymentIntent: String,
    status: { type: String, default: 'pending' },
  },
  status: { type: String, enum: ['PENDING','PAID','SHIPPED','DELIVERED','CANCELLED'], default: 'PENDING' },
}, { timestamps: true });

orderSchema.statics.generateOrderNo = function () {
  const n = Math.floor(10000 + Math.random() * 89999);
  return `RS-${n}`;
};

export default mongoose.model('Order', orderSchema);
