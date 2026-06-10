import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const links = ['Home', 'Menu', 'Gallery', 'Reviews', 'About', 'Contact'];
const pathFor = (label: string) => label === 'Home' ? '/' : `/${label.toLowerCase()}`;

export function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('bd_theme') !== 'light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
    localStorage.setItem('bd_theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(query.trim() ? `/menu?search=${encodeURIComponent(query.trim())}` : '/menu');
  }

  const navLinks = links.map((label) => (
    <NavLink
      key={label}
      to={pathFor(label)}
      className={({ isActive }) =>
        `text-sm transition hover:text-[#D4AF37] ${isActive ? 'text-[#D4AF37]' : 'text-zinc-300'}`
      }
    >
      {label}
    </NavLink>
  ));

  return (
    <header className="fixed left-0 right-0 top-4 z-50 mx-auto max-w-7xl px-4">
      <nav className="glass relative flex items-center justify-between rounded-full px-5 py-3">
        <Link to="/" className="font-display text-xl font-bold gold-text sm:text-2xl">
          Biryani Darbar
        </Link>
        <div className="hidden gap-5 lg:flex">{navLinks}</div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen((value) => !value)}
            aria-label="Search menu"
            aria-expanded={searchOpen}
            className="transition hover:text-[#D4AF37]"
          >
            <Search size={19} />
          </button>
          <button
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="transition hover:text-[#D4AF37]"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle navigation"
            className="transition hover:text-[#D4AF37] lg:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.form
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            onSubmit={submitSearch}
            className="glass mx-auto mt-3 flex max-w-xl gap-3 rounded-full p-2 pl-5"
          >
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search chicken, mutton, paneer..."
              aria-label="Search menu items"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button className="rounded-full bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-black">
              Search
            </button>
          </motion.form>
        )}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mt-3 grid gap-4 rounded-3xl p-6 lg:hidden"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
