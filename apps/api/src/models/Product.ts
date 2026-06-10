import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, index: true, required: true },
  description: String,
  category: { type: String, index: true },
  price: { type: Number, required: true },
  images: [String],
  isVeg: Boolean,
  spiceLevel: { type: Number, min: 0, max: 5, default: 2 },
  ingredients: [String],
  badges: [String],
  rating: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });
export const Product = model('Product', productSchema);
