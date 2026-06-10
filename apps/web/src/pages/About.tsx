import { motion } from 'framer-motion';
import { Award, ChefHat, Clock3, HeartHandshake, Leaf, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';

const values = [
  { icon: Leaf, title: 'Fresh Ingredients', text: 'Daily-sourced vegetables, premium basmati rice, and carefully selected spices.' },
  { icon: Clock3, title: 'Slow Dum Cooking', text: 'Every batch is layered and sealed so the aroma and flavor stay inside.' },
  { icon: ShieldCheck, title: 'Hygienic Kitchen', text: 'Clean preparation areas, careful packaging, and consistent quality checks.' },
  { icon: HeartHandshake, title: 'Warm Hospitality', text: 'Generous portions and attentive service for every guest who visits our Darbar.' },
];

const process = [
  ['01', 'Select', 'We choose fragrant long-grain rice and fresh ingredients.'],
  ['02', 'Marinate', 'Meat and paneer rest in our balanced house spice blend.'],
  ['03', 'Layer', 'Rice, protein, herbs, saffron, and fried onions are layered by hand.'],
  ['04', 'Dum Cook', 'The handi is sealed and slow-cooked until every grain carries flavor.'],
];

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-32">
      <PageHeader
        eyebrow="Our story"
        title="From Patna, With Royal Flavor"
        description="Biryani Darbar brings slow-cooked dum biryani, generous hospitality, and royal flavor to every table."
      />
      <div className="mt-14 grid items-center gap-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card overflow-hidden p-3">
          <img src="/images/biryani-combo.png" alt="A complete Biryani Darbar family feast" className="h-full min-h-96 w-full rounded-[22px] object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="text-[#D4AF37]">Food worth gathering around</p>
          <h2 className="font-display mt-3 text-5xl">A Darbar built around the handi</h2>
          <p className="mt-5 leading-7 text-zinc-400">
            We started with one simple promise: serve biryani that feels special every time. Our kitchen respects the patient craft of dum cooking while welcoming modern Patna to explore timeless flavors.
          </p>
          <p className="mt-4 leading-7 text-zinc-400">
            From our chicken and mutton classics to paneer, vegetable, egg, and family combos, every dish is prepared to bring fragrance, warmth, and a satisfying royal meal.
          </p>
          <Button onClick={() => navigate('/menu')} className="mt-7">Explore Our Menu</Button>
        </motion.div>
      </div>

      <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, text }) => (
          <motion.article whileHover={{ y: -6 }} className="premium-card p-7" key={title}>
            <Icon className="text-[#D4AF37]" size={28} />
            <h3 className="font-display mt-5 text-2xl">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
          </motion.article>
        ))}
      </div>

      <div className="premium-card mt-20 p-8 md:p-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[#D4AF37]">Inside our kitchen</p>
            <h2 className="font-display mt-2 text-4xl md:text-5xl">How we make every handi</h2>
          </div>
          <ChefHat size={52} className="text-[#D4AF37]" />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {process.map(([number, title, text]) => (
            <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-6" key={number}>
              <span className="font-display text-4xl gold-text">{number}</span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-4">
        {[
          [Award, '20 Years', 'of food craft'],
          [Sparkles, '50+', 'menu varieties'],
          [MapPin, 'Patna', 'our home'],
          [HeartHandshake, '10,000+', 'happy guests'],
        ].map(([Icon, value, label]) => {
          const IconComponent = Icon as typeof Award;
          return (
            <div className="text-center" key={String(label)}>
              <IconComponent className="mx-auto text-[#D4AF37]" />
              <p className="font-display mt-3 text-4xl gold-text">{String(value)}</p>
              <p className="text-sm text-zinc-400">{String(label)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
