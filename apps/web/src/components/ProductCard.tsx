import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export type Product = {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  price: number;
  images: string[];
  isVeg: boolean;
  badges: string[];
  rating: number;
};

export function ProductCard({ p }: { p: Product }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="premium-card overflow-hidden"
    >
      <div className="overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
          src={p.images?.[0]}
          alt={p.name}
          loading="lazy"
          className="h-56 w-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#D4AF37]/30 px-3 py-1 text-xs text-[#D4AF37]">
            {p.isVeg ? 'VEG' : 'NON-VEG'}
          </span>
          {p.badges?.slice(0, 1).map((badge) => (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400" key={badge}>{badge}</span>
          ))}
        </div>
        <h3 className="font-display text-2xl">{p.name}</h3>
        <div className="mt-2 flex items-center justify-between gap-4 text-zinc-400">
          <span>₹{p.price}</span>
          <span className="flex items-center gap-1 text-sm">
            <Star size={15} fill="currentColor" className="text-[#D4AF37]" /> {p.rating || 4.8}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
