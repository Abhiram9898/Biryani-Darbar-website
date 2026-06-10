import { NextFunction, Request, Response } from 'express';
import { ContactMessage, FAQ, Gallery, Review } from '../models/MoreModels.js';
import { ApiError } from '../utils/apiError.js';

export async function listGallery(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ success: true, items: await Gallery.find().sort({ createdAt: -1 }) });
  } catch (error) {
    next(error);
  }
}

export async function listReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const reviews = await Review.find({ isPublished: true })
      .sort(req.query.sort === 'helpful' ? '-helpful' : '-createdAt')
      .limit(100);
    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
}

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.create({ ...req.body, verified: false, isPublished: true });
    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
}

export async function helpfulReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { $inc: { helpful: 1 } }, { new: true });
    if (!review) throw new ApiError(404, 'Review not found');
    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
}

export async function createContactMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ success: true, id: message.id });
  } catch (error) {
    next(error);
  }
}

export async function listFaqs(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ success: true, items: await FAQ.find().sort({ sortOrder: 1 }) });
  } catch (error) {
    next(error);
  }
}
