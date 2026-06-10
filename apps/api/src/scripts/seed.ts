import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { FAQ, Gallery, Review } from '../models/MoreModels.js';
import { Product } from '../models/Product.js';
import { logger } from '../utils/logger.js';

const products = [
  { name: 'Royal Chicken Biryani', slug: 'royal-chicken-biryani', category: 'Chicken', price: 299, images: ['/images/royal-biryani-hero.png'], isVeg: false, badges: ['Popular'], rating: 4.9, description: 'Tender chicken layered with fragrant basmati rice and slow-cooked with the Darbar spice blend.', ingredients: ['Basmati rice', 'Chicken', 'Saffron', 'Mint', 'Darbar spices'], spiceLevel: 3, isActive: true },
  { name: 'Mutton Dum Biryani', slug: 'mutton-dum-biryani', category: 'Mutton', price: 399, images: ['/images/mutton-biryani.png'], isVeg: false, badges: ['Chef Special'], rating: 4.9, description: 'Slow-cooked mutton dum biryani with caramelized onions, herbs, and aromatic whole spices.', ingredients: ['Basmati rice', 'Mutton', 'Caramelized onion', 'Mint', 'Whole spices'], spiceLevel: 3, isActive: true },
  { name: 'Paneer Tikka Biryani', slug: 'paneer-tikka-biryani', category: 'Paneer', price: 259, images: ['/images/paneer-biryani.png'], isVeg: true, badges: ['Vegetarian'], rating: 4.8, description: 'Smoky paneer tikka and basmati rice finished on dum with saffron and fresh herbs.', ingredients: ['Basmati rice', 'Paneer', 'Bell pepper', 'Saffron', 'Mint'], spiceLevel: 2, isActive: true },
  { name: 'Vegetable Dum Biryani', slug: 'vegetable-dum-biryani', category: 'Veg', price: 229, images: ['/images/veg-biryani.png'], isVeg: true, badges: ['Fresh'], rating: 4.7, description: 'A colorful mix of seasonal vegetables and basmati rice cooked together on dum.', ingredients: ['Basmati rice', 'Seasonal vegetables', 'Saffron', 'Mint', 'Whole spices'], spiceLevel: 2, isActive: true },
  { name: 'Royal Egg Biryani', slug: 'royal-egg-biryani', category: 'Egg', price: 249, images: ['/images/egg-biryani.png'], isVeg: false, badges: ['Classic'], rating: 4.7, description: 'Classic egg biryani with masala-coated eggs, aromatic rice, and fried onion.', ingredients: ['Basmati rice', 'Egg', 'Caramelized onion', 'Mint', 'Darbar spices'], spiceLevel: 3, isActive: true },
  { name: 'Darbar Family Combo', slug: 'darbar-family-combo', category: 'Combos', price: 699, images: ['/images/biryani-combo.png'], isVeg: false, badges: ['Best Value'], rating: 4.9, description: 'A generous biryani family feast with raita, salan, kebabs, and dessert.', ingredients: ['Chicken biryani', 'Raita', 'Salan', 'Kebabs', 'Dessert'], spiceLevel: 3, isActive: true },
];

const gallery = products.map(product => ({ title: product.name, url: product.images[0], type: 'IMAGE', category: product.category }));
const faqs = [
  { question: 'Where is Biryani Darbar located?', answer: 'We are on Main Road between Gali No. 4 and 5, RMS Colony, Ashok Nagar, Lohia Nagar, Patna, Bihar 800020.', category: 'Visit', sortOrder: 1 },
  { question: 'What are your opening hours?', answer: 'We are open Monday to Thursday from 11:00 AM to 11:00 PM and Friday to Sunday from 11:00 AM to midnight.', category: 'Visit', sortOrder: 2 },
  { question: 'Can I contact you for catering?', answer: 'Yes. Call or message us at least one day ahead for office lunches, celebrations, and family events.', category: 'Catering', sortOrder: 3 },
  { question: 'Do you have vegetarian options?', answer: 'Yes. Paneer tikka biryani, vegetable dum biryani, sides, desserts, and vegetarian combos are available.', category: 'Menu', sortOrder: 4 },
];
const reviews = [
  { name: 'Aarav Kumar', dish: 'Mutton Dum Biryani', rating: 5, comment: 'The mutton was tender and the rice was wonderfully fragrant.', helpful: 28, verified: true, isPublished: true },
  { name: 'Sana Fatima', dish: 'Darbar Family Combo', rating: 5, comment: 'Proper dum flavor with balanced spice. The family combo is excellent value.', helpful: 21, verified: true, isPublished: true },
  { name: 'Riya Singh', dish: 'Paneer Tikka Biryani', rating: 4, comment: 'Paneer tikka biryani tasted fresh and smoky with a generous portion.', helpful: 16, verified: true, isPublished: true },
];

async function seed() {
  await connectDB();
  await FAQ.deleteMany({ $or: [{ category: 'Delivery' }, { question: 'Can I place a bulk or catering order?' }] });
  await Promise.all(products.map(product => Product.findOneAndUpdate({ slug: product.slug }, product, { upsert: true, new: true, runValidators: true })));
  await Promise.all(gallery.map(item => Gallery.findOneAndUpdate({ title: item.title }, item, { upsert: true, new: true })));
  await Promise.all(faqs.map(item => FAQ.findOneAndUpdate({ question: item.question }, item, { upsert: true, new: true })));
  await Promise.all(reviews.map(item => Review.findOneAndUpdate({ name: item.name, dish: item.dish }, item, { upsert: true, new: true })));
  logger.info('Public menu and content seed completed');
  await mongoose.disconnect();
}

seed().catch(async error => {
  logger.error({ message: 'Seed failed', error });
  await mongoose.disconnect();
  process.exitCode = 1;
});
