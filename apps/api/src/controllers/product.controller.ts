import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/Product.js';

export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const limit = Math.min(50, Math.max(1, Number(req.query.limit ?? 50)));
    const query: Record<string, unknown> = { isActive: true };
    if (req.query.category) query.category = req.query.category;
    if (req.query.search) query.$text = { $search: String(req.query.search) };
    const [items, total] = await Promise.all([
      Product.find(query).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 }),
      Product.countDocuments(query),
    ]);
    res.json({ success: true, items, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
}
