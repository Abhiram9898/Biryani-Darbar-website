import { motion } from 'framer-motion';

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">{eyebrow}</p>
      <h1 className="font-display mt-3 text-5xl font-bold md:text-7xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-zinc-400">{description}</p>
    </motion.header>
  );
}
