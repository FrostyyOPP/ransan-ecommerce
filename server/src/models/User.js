import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [{
    line1: String, line2: String, city: String, state: String,
    pincode: String, country: { type: String, default: 'IN' },
    phone: String, isDefault: Boolean,
  }],
}, { timestamps: true });

userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10);
};

userSchema.methods.toPublic = function () {
  const { _id, name, email, role, addresses, createdAt } = this;
  return { id: _id, name, email, role, addresses, createdAt };
};

export default mongoose.model('User', userSchema);
