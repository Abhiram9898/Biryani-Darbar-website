import { z } from 'zod';

export const reviewSchema = z.object({
  name: z.string().trim().min(2).max(80),
  dish: z.string().trim().min(2).max(120),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(1000),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[0-9+ -]{10,15}$/),
  email: z.string().trim().toLowerCase().email(),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(2000),
});
