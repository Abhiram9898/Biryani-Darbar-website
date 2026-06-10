import { Schema, model } from 'mongoose';

export const Review = model('Review', new Schema({
  name: { type: String, required: true },
  dish: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  helpful: { type: Number, default: 0 },
  reply: String,
  verified: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true }));

export const FAQ = model('FAQ', new Schema({
  question: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
  category: String,
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true }));

export const Gallery = model('Gallery', new Schema({
  title: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  type: { type: String, default: 'IMAGE' },
  category: String,
}, { timestamps: true }));

export const ContactMessage = model('ContactMessage', new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'NEW' },
}, { timestamps: true }));
