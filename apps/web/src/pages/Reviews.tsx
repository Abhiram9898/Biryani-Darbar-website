import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BadgeCheck, Star, ThumbsUp } from 'lucide-react';
import { type FormEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { seededReviews, type ShopReview } from '../data/shop';
import { api } from '../lib/api';

type ApiReview = ShopReview & { _id?: string; createdAt?: string };
const normalize = (review: ApiReview): ShopReview => ({
  ...review,
  id: review.id ?? review._id ?? crypto.randomUUID(),
  date: review.date ?? (review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recently'),
});

export default function Reviews() {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState('recent');
  const [rating, setRating] = useState(5);
  const { data = seededReviews } = useQuery({
    queryKey: ['reviews', sort],
    queryFn: async () => {
      const reviews = (await api.get(`/content/reviews?sort=${sort}`)).data.reviews as ApiReview[];
      return reviews.length ? reviews.map(normalize) : seededReviews;
    },
    retry: false,
  });
  const reviews = data;
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const sorted = useMemo(() => [...reviews].sort((a, b) => sort === 'helpful' ? b.helpful - a.helpful : b.id.localeCompare(a.id)), [reviews, sort]);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      await api.post('/content/reviews', { name: form.get('name'), dish: form.get('dish'), comment: form.get('comment'), rating });
      await queryClient.invalidateQueries({ queryKey: ['reviews'] });
      formElement.reset();
      setRating(5);
      toast.success('Thank you for sharing your review');
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? 'Could not submit review');
    }
  }
  async function markHelpful(id: string) {
    if (id.startsWith('review-')) return toast('Seeded review votes are available after database seeding');
    await api.post(`/content/reviews/${id}/helpful`);
    await queryClient.invalidateQueries({ queryKey: ['reviews'] });
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-32">
      <PageHeader eyebrow="Guest experiences" title="Loved Across Patna" description="Read what our guests say and share your own Biryani Darbar experience." />
      <div className="mt-12 grid gap-6 md:grid-cols-4">
        <div className="premium-card p-7 text-center md:col-span-1">
          <p className="font-display text-6xl gold-text">{average.toFixed(1)}</p>
          <div className="my-3 flex justify-center gap-1 text-[#D4AF37]">{Array.from({ length: 5 }).map((_, index) => <Star fill="currentColor" size={18} key={index} />)}</div>
          <p className="text-sm text-zinc-400">Based on {reviews.length} guest reviews</p>
        </div>
        <div className="premium-card p-7 md:col-span-3">
          <h2 className="font-display text-3xl">Share your experience</h2>
          <form onSubmit={submitReview} className="mt-5 grid gap-4 md:grid-cols-2">
            <input required name="name" placeholder="Your name" className="rounded-xl bg-white/10 p-4 outline-none" />
            <input required name="dish" placeholder="Dish you tried" className="rounded-xl bg-white/10 p-4 outline-none" />
            <div className="flex items-center gap-2 md:col-span-2">
              <span className="mr-2 text-sm text-zinc-400">Your rating</span>
              {Array.from({ length: 5 }).map((_, index) => <button type="button" onClick={() => setRating(index + 1)} aria-label={`${index + 1} stars`} key={index}><Star size={22} fill={index < rating ? 'currentColor' : 'none'} className="text-[#D4AF37]" /></button>)}
            </div>
            <textarea required minLength={10} name="comment" placeholder="Tell us what you loved..." className="min-h-28 rounded-xl bg-white/10 p-4 outline-none md:col-span-2" />
            <Button className="md:col-span-2 md:w-fit">Submit Review</Button>
          </form>
        </div>
      </div>
      <div className="mt-12 flex items-center justify-between gap-4">
        <h2 className="font-display text-4xl">Guest Reviews</h2>
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="form-select glass rounded-full px-4 py-2 outline-none"><option value="recent">Most recent</option><option value="helpful">Most helpful</option></select>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {sorted.map(review => (
          <motion.article whileHover={{ y: -4 }} className="premium-card p-7" key={review.id}>
            <div className="flex items-start justify-between gap-4">
              <div><div className="flex items-center gap-2"><h3 className="font-semibold">{review.name}</h3>{review.verified && <BadgeCheck size={17} className="text-[#D4AF37]" />}</div><p className="text-xs text-zinc-500">{review.dish} • {review.date}</p></div>
              <div className="flex text-[#D4AF37]">{Array.from({ length: 5 }).map((_, index) => <Star size={15} fill={index < review.rating ? 'currentColor' : 'none'} key={index} />)}</div>
            </div>
            <p className="mt-5 text-zinc-300">{review.comment}</p>
            <button onClick={() => markHelpful(review.id)} className="mt-5 flex items-center gap-2 text-sm text-zinc-400 hover:text-[#D4AF37]"><ThumbsUp size={16} /> Helpful ({review.helpful})</button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
