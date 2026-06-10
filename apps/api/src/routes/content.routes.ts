import { contactSchema, reviewSchema } from '@biryani-darbar/shared';
import { Router } from 'express';
import { createContactMessage, createReview, helpfulReview, listFaqs, listGallery, listReviews } from '../controllers/content.controller.js';
import { validate } from '../middleware/validate.js';

export const contentRoutes = Router();
contentRoutes.get('/gallery', listGallery);
contentRoutes.get('/reviews', listReviews);
contentRoutes.post('/reviews', validate(reviewSchema), createReview);
contentRoutes.post('/reviews/:id/helpful', helpfulReview);
contentRoutes.post('/contact', validate(contactSchema), createContactMessage);
contentRoutes.get('/faqs', listFaqs);
