import { motion } from 'framer-motion';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

const location =
  'Gali No. 4-5 ke bich me, Main Rd, RMS Colony, Ashok Nagar, Lohia Nagar, Patna, Bihar 800020';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-[#D4AF37]/10 px-6 py-10 text-zinc-400"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-2xl font-bold gold-text">Biryani Darbar</p>
            <p className="mt-2 text-sm text-zinc-500">
              &copy; Biryani Darbar - Authentic Flavors Crafted With Love
            </p>
            <div className="mt-4 flex justify-center gap-3 md:justify-start">
              <motion.a
                whileHover={{ y: -3, scale: 1.08 }}
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Biryani Darbar on Facebook"
                className="glass rounded-full p-2.5 transition hover:text-[#D4AF37]"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, scale: 1.08 }}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Biryani Darbar on Instagram"
                className="glass rounded-full p-2.5 transition hover:text-[#D4AF37]"
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noreferrer"
              className="flex max-w-xl items-start justify-center gap-3 transition hover:text-[#D4AF37] md:justify-start"
            >
              <MapPin className="mt-0.5 shrink-0" size={18} />
              <span>{location}</span>
            </a>
            <a
              href="tel:+918235365338"
              className="flex items-center justify-center gap-3 transition hover:text-[#D4AF37] md:justify-start"
            >
              <Phone className="shrink-0" size={18} />
              <span>08235365338</span>
            </a>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
