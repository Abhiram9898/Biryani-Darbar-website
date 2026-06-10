import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

const stats = [
  ['10000+', 'Happy Customers'],
  ['4.9', 'Rating'],
  ['50+', 'Varieties'],
  ['20 Years', 'Legacy'],
];

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-[#D4AF37]"
          >
            Authentic Flavors Crafted With Love
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl font-extrabold leading-tight md:text-8xl"
          >
            Royal Biryani, <span className="gold-text">Crafted</span> With Tradition.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-zinc-400"
          >
            Discover slow-cooked dum biryani inspired by India's royal kitchens.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button onClick={() => navigate('/menu')}>Explore Menu</Button>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-none text-[#D4AF37] ring-1 ring-[#D4AF37]/40"
            >
              Visit Us
            </Button>
          </motion.div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(([value, label], index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.08 }}
                className="premium-card p-5 text-center"
                key={label}
              >
                <b className="gold-text text-2xl">{value}</b>
                <p className="text-xs text-zinc-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -18, 0] }}
          transition={{ opacity: { duration: 0.7 }, scale: { duration: 0.7 }, y: { duration: 5, repeat: Infinity } }}
          className="relative"
        >
          <div className="steam absolute left-1/2 top-10 h-40 w-16 rounded-full bg-white/20" />
          <div className="premium-card aspect-square rounded-full bg-[radial-gradient(circle,#ffb34733,#171717_62%)] p-5 md:p-8">
            <img
              src="/images/royal-biryani-hero.png"
              alt="Royal chicken biryani served in an ornate brass handi"
              fetchPriority="high"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
