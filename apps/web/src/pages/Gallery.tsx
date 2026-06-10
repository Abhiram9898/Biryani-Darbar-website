import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '../components/PageHeader';
import { galleryItems } from '../data/shop';
import { api } from '../lib/api';

export default function Gallery() {
  const { data: items = galleryItems } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const remote = (await api.get('/content/gallery')).data.items as { title: string; category: string; url: string }[];
      return remote.length ? remote.map(item => ({ title: item.title, category: item.category, image: item.url })) : galleryItems;
    },
    retry: false,
  });
  const categories = ['All', ...new Set(items.map((item) => item.category))];
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = category === 'All' ? items : items.filter((item) => item.category === category);
  const activeItem = selected === null ? null : filtered[selected];

  function move(direction: number) {
    if (selected === null) return;
    setSelected((selected + direction + filtered.length) % filtered.length);
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-32">
      <PageHeader
        eyebrow="From our kitchen"
        title="The Darbar Gallery"
        description="A closer look at our slow-cooked biryanis, vegetarian favorites, and generous family feasts."
      />
      <div className="my-10 flex flex-wrap justify-center gap-3">
        {categories.map((item) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCategory(item);
              setSelected(null);
            }}
            className={`rounded-full border px-5 py-2 transition ${
              category === item
                ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                : 'border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'
            }`}
            key={item}
          >
            {item}
          </motion.button>
        ))}
      </div>
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(index)}
              className="premium-card group relative overflow-hidden text-left"
              key={item.title}
            >
              <img src={item.image} alt={item.title} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">{item.category}</p>
                  <h2 className="font-display mt-1 text-2xl">{item.title}</h2>
                </div>
                <Maximize2 size={19} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
          >
            <button aria-label="Close gallery image" onClick={() => setSelected(null)} className="absolute right-6 top-6 text-white">
              <X size={30} />
            </button>
            <button aria-label="Previous image" onClick={(event) => { event.stopPropagation(); move(-1); }} className="absolute left-3 text-white md:left-8">
              <ChevronLeft size={40} />
            </button>
            <motion.figure
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              onClick={(event) => event.stopPropagation()}
              className="max-w-5xl"
            >
              <img src={activeItem.image} alt={activeItem.title} className="max-h-[78vh] w-full rounded-3xl object-contain" />
              <figcaption className="mt-4 text-center text-white">
                <span className="font-display text-2xl">{activeItem.title}</span>
              </figcaption>
            </motion.figure>
            <button aria-label="Next image" onClick={(event) => { event.stopPropagation(); move(1); }} className="absolute right-3 text-white md:right-8">
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
