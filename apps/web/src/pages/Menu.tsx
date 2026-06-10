import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard, type Product } from '../components/ProductCard';
import { menuProducts } from '../data/menu';
import { api } from '../lib/api';

const categories = ['All', 'Chicken', 'Mutton', 'Veg', 'Paneer', 'Egg', 'Combos'];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState('All');
  const search = searchParams.get('search') ?? '';
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await api.get('/products')).data.items as Product[],
    retry: false,
  });
  const products = useMemo(() => {
    if (!data?.length) return menuProducts;
    const backendSlugs = new Set(data.map((product) => product.slug));
    return [...data, ...menuProducts.filter((product) => !backendSlugs.has(product.slug))];
  }, [data]);
  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const normalizedSearch = search.toLowerCase().trim();
    const matchesSearch = !normalizedSearch ||
      `${product.name} ${product.category ?? ''} ${product.badges?.join(' ')}`.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  }), [category, products, search]);

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-32">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[#D4AF37]">Fresh from the royal kitchen</p>
        <h1 className="font-display text-6xl">Biryani Menu</h1>
      </motion.div>
      <div className="my-8 flex flex-col gap-5">
        <label className="glass flex max-w-xl items-center gap-3 rounded-full px-5 py-3">
          <Search size={18} className="text-[#D4AF37]" />
          <input
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              setSearchParams(value ? { search: value } : {});
            }}
            placeholder="Search the menu"
            className="w-full bg-transparent outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(item)}
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
      </div>
      <AnimatePresence mode="popLayout">
        {filtered.length ? (
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => <ProductCard p={product} key={product._id} />)}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="premium-card p-10 text-center">
            No biryani matched your search. Try another flavor.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
