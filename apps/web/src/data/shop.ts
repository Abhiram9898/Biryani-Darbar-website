export const shopAddress =
  'Gali No. 4-5 ke bich me, Main Rd, RMS Colony, Ashok Nagar, Lohia Nagar, Patna, Bihar 800020';
export const shopPhone = '08235365338';
export const shopPhoneInternational = '+918235365338';
export const shopEmail = 'hello@biryanidarbar.com';

export const galleryItems = [
  { title: 'Royal Chicken Biryani', category: 'Biryani', image: '/images/royal-biryani-hero.png' },
  { title: 'Slow-Cooked Mutton Dum', category: 'Biryani', image: '/images/mutton-biryani.png' },
  { title: 'Paneer Tikka Biryani', category: 'Vegetarian', image: '/images/paneer-biryani.png' },
  { title: 'Garden Vegetable Dum', category: 'Vegetarian', image: '/images/veg-biryani.png' },
  { title: 'Royal Egg Biryani', category: 'Biryani', image: '/images/egg-biryani.png' },
  { title: 'Darbar Family Feast', category: 'Combos', image: '/images/biryani-combo.png' },
];

export type ShopReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  dish: string;
  date: string;
  helpful: number;
  verified: boolean;
};

export const seededReviews: ShopReview[] = [
  {
    id: 'review-1',
    name: 'Aarav Kumar',
    rating: 5,
    comment: 'The mutton was tender, the rice was fragrant, and the packaging kept everything hot.',
    dish: 'Mutton Dum Biryani',
    date: 'June 2, 2026',
    helpful: 28,
    verified: true,
  },
  {
    id: 'review-2',
    name: 'Sana Fatima',
    rating: 5,
    comment: 'Proper dum flavor with balanced spice. The family combo is excellent value.',
    dish: 'Darbar Family Combo',
    date: 'May 29, 2026',
    helpful: 21,
    verified: true,
  },
  {
    id: 'review-3',
    name: 'Riya Singh',
    rating: 4,
    comment: 'Paneer tikka biryani tasted fresh and smoky. Loved the generous portion.',
    dish: 'Paneer Tikka Biryani',
    date: 'May 24, 2026',
    helpful: 16,
    verified: true,
  },
  {
    id: 'review-4',
    name: 'Kabir Verma',
    rating: 5,
    comment: 'Friendly service and consistently delicious chicken biryani. My weekend favorite.',
    dish: 'Royal Chicken Biryani',
    date: 'May 18, 2026',
    helpful: 19,
    verified: true,
  },
];
