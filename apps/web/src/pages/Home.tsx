import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { ProductCard } from '../components/ProductCard';
import { menuProducts } from '../data/menu';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <p className="text-[#D4AF37]">Today's Specials</p>
        <h2 className="font-display mb-10 text-5xl font-bold">Featured Royal Bowls</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {menuProducts.slice(0, 3).map((product) => <ProductCard p={product} key={product._id} />)}
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 pb-24"
      >
        <div className="premium-card p-10">
          <h2 className="font-display text-4xl">Why Choose Us?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {['Premium Ingredients', 'Hygienic Kitchen', 'Warm Hospitality', 'Royal Taste'].map((item) => (
              <motion.div whileHover={{ y: -5 }} className="glass rounded-3xl p-6" key={item}>
                {item}
                <p className="mt-2 text-sm text-zinc-400">Crafted with process, love, and consistency.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
