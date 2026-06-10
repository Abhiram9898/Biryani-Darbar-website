import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Clock3, Mail, MapPin, MessageCircle, Phone, UtensilsCrossed } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { shopAddress, shopEmail, shopPhone, shopPhoneInternational } from '../data/shop';
import { api } from '../lib/api';

const fallbackFaqs = [
  ['Where is Biryani Darbar located?', 'We are on Main Road between Gali No. 4 and 5, RMS Colony, Ashok Nagar, Lohia Nagar, Patna, Bihar 800020.'],
  ['What are your opening hours?', 'We are open Monday to Thursday from 11:00 AM to 10:00 PM and Friday to Sunday from 11:00 AM to 11:00 PM.'],
  ['Can I contact you for catering?', 'Yes. Call or message us at least one day ahead for office lunches, celebrations, and family events.'],
  ['Do you have vegetarian options?', 'Yes. Paneer tikka biryani, vegetable dum biryani, sides, desserts, and vegetarian combos are available.'],
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(0);
  const { data: faqs = fallbackFaqs } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const items = (await api.get('/content/faqs')).data.items as { question: string; answer: string }[];
      return items.length ? items.map(item => [item.question, item.answer]) : fallbackFaqs;
    },
    retry: false,
  });

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const message = [
      'Hello Biryani Darbar,',
      `Name: ${form.get('name')}`,
      `Phone: ${form.get('phone')}`,
      `Email: ${form.get('email')}`,
      `Subject: ${form.get('subject')}`,
      `Message: ${form.get('message')}`,
    ].join('\n');
    const whatsappUrl = `https://wa.me/${shopPhoneInternational.replace('+', '')}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open('about:blank', '_blank');
    api.post('/content/contact', Object.fromEntries(form)).then(() => {
      formElement.reset();
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.location.href = whatsappUrl;
      } else window.location.href = whatsappUrl;
      toast.success('Message saved; opening WhatsApp');
    }).catch((error) => {
      whatsappWindow?.close();
      toast.error(error.response?.data?.message ?? 'Could not send message');
    });
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-32">
      <PageHeader
        eyebrow="Visit or message us"
        title="We Are Here To Help"
        description="Menu questions, catering requests, feedback, or directions: reach our Patna team directly."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          [Phone, 'Call us', shopPhone, `tel:${shopPhoneInternational}`],
          [MessageCircle, 'WhatsApp', 'Chat with the shop', `https://wa.me/${shopPhoneInternational.replace('+', '')}`],
          [Mail, 'Email', shopEmail, `mailto:${shopEmail}`],
          [MapPin, 'Find us', 'Open Google Maps', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddress)}`],
        ].map(([Icon, title, text, href]) => {
          const IconComponent = Icon as typeof Phone;
          return (
            <motion.a whileHover={{ y: -6 }} href={String(href)} target={String(href).startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="premium-card p-6" key={String(title)}>
              <IconComponent size={25} className="text-[#D4AF37]" />
              <h2 className="font-display mt-4 text-2xl">{String(title)}</h2>
              <p className="mt-2 text-sm text-zinc-400">{String(text)}</p>
            </motion.a>
          );
        })}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div className="premium-card p-7 md:p-9">
          <h2 className="font-display text-4xl">Send us a message</h2>
          <p className="mt-2 text-sm text-zinc-400">Your completed message will open in WhatsApp for fast support.</p>
          <form onSubmit={sendMessage} className="mt-7 grid gap-4 md:grid-cols-2">
            <input required name="name" placeholder="Your name" className="rounded-xl bg-white/10 p-4 outline-none" />
            <input required name="phone" type="tel" placeholder="Phone number" className="rounded-xl bg-white/10 p-4 outline-none" />
            <input required name="email" type="email" placeholder="Email address" className="rounded-xl bg-white/10 p-4 outline-none" />
            <select required defaultValue="" name="subject" className="form-select rounded-xl bg-white/10 p-4 outline-none">
              <option value="" disabled>Choose a subject</option>
              <option>Menu question</option>
              <option>Catering enquiry</option>
              <option>Feedback</option>
              <option>General question</option>
            </select>
            <textarea required minLength={10} name="message" placeholder="How can we help?" className="min-h-36 rounded-xl bg-white/10 p-4 outline-none md:col-span-2" />
            <Button className="md:col-span-2 md:w-fit">Send on WhatsApp</Button>
          </form>
        </div>
        <div className="space-y-6">
          <div className="premium-card p-7">
            <Clock3 className="text-[#D4AF37]" />
            <h2 className="font-display mt-4 text-3xl">Opening Hours</h2>
            <div className="mt-5 space-y-3 text-sm">
              <p className="flex justify-between"><span>Monday - Thursday</span><span className="text-zinc-400">10:00 AM - 11:00 PM</span></p>
              <p className="flex justify-between"><span>Friday - Sunday</span><span className="text-zinc-400">10:00 AM - 11:00 PM</span></p>
            </div>
          </div>
          <div className="premium-card p-7">
            <UtensilsCrossed className="text-[#D4AF37]" />
            <h2 className="font-display mt-4 text-3xl">Visit & Catering</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Visit us for royal biryani or contact the shop about office lunches, party handis, and family-event catering.</p>
          </div>
          <div className="premium-card p-7">
            <MapPin className="text-[#D4AF37]" />
            <h2 className="font-display mt-4 text-3xl">Our Location</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{shopAddress}</p>
          </div>
        </div>
      </div>

      <div className="premium-card mt-12 overflow-hidden p-3">
        <iframe
          title="Biryani Darbar location map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(shopAddress)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-96 w-full rounded-[22px] border-0"
        />
      </div>

      <div className="mt-16">
        <h2 className="font-display text-center text-4xl">Frequently Asked Questions</h2>
        <div className="mx-auto mt-7 max-w-3xl space-y-3">
          {faqs.map(([question, answer], index) => (
            <div className="premium-card overflow-hidden" key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">
                {question}
                <ChevronDown className={`shrink-0 transition ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && <p className="px-5 pb-5 text-sm leading-6 text-zinc-400">{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
