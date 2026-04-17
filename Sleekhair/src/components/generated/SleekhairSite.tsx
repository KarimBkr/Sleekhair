import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Scissors, ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Clock, Instagram, Star, Users, User, CheckCircle, Sparkles, Calendar, Menu, X, MessageCircle, Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SleekPage } from './SleekhairHome';

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [{
  id: 'h1',
  src: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=1400&q=90',
  alt: 'Fulanis avec perles',
  label: 'Fulanis & Braids'
}, {
  id: 'h2',
  src: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1400&q=90',
  alt: 'Cornrows homme',
  label: 'Cornrows Homme'
}, {
  id: 'h3',
  src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1400&q=90',
  alt: 'Knotless braids',
  label: 'Knotless Braids'
}, {
  id: 'h4',
  src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1400&q=90',
  alt: 'Locks naturelles',
  label: 'Locks & Retwist'
}] as const;
const PRESTATIONS_PREVIEW = [{
  id: 'pp1',
  name: 'Knotless Braids',
  price: 40,
  priceTo: 70,
  duration: '3h–8h',
  image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=80',
  tag: 'Tendance',
  gender: 'Femme'
}, {
  id: 'pp2',
  name: 'Boho Braids',
  price: 50,
  priceTo: 80,
  duration: '4h–9h',
  image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=500&q=80',
  tag: 'Populaire',
  gender: 'Femme'
}, {
  id: 'pp3',
  name: 'Fulani Braids / Twists',
  price: 50,
  priceTo: 80,
  duration: '3h–6h',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  tag: null,
  gender: 'Femme'
}, {
  id: 'pp4',
  name: 'Twists / Island Twists',
  price: 40,
  priceTo: 80,
  duration: '2h–7h',
  image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&q=80',
  tag: null,
  gender: 'Femme'
}, {
  id: 'pp5',
  name: 'Butterfly / Invisible Locks',
  price: 40,
  priceTo: 70,
  duration: '3h–7h',
  image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&q=80',
  tag: null,
  gender: 'Femme'
}, {
  id: 'pp6',
  name: 'Nattes & Tissages',
  price: 40,
  priceTo: 60,
  duration: '1h30–4h',
  image: 'https://images.unsplash.com/photo-1599948128020-9a44c7eb5b9c?w=500&q=80',
  tag: null,
  gender: 'Femme'
}, {
  id: 'pp7',
  name: 'Ponytail',
  price: 40,
  priceTo: 50,
  duration: '1h–2h',
  image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=500&q=80',
  tag: null,
  gender: 'Femme'
}, {
  id: 'pp8',
  name: 'Coiffure Enfants (4–10 ans)',
  price: 30,
  priceTo: 40,
  duration: '1h–2h',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  tag: null,
  gender: 'Femme'
}, {
  id: 'pp9',
  name: 'Nattes Collées',
  price: 40,
  priceTo: 50,
  duration: '1h30–3h',
  image: 'https://images.unsplash.com/photo-1605980625600-88d6716a5b2c?w=500&q=80',
  tag: 'Populaire',
  gender: 'Homme'
}, {
  id: 'pp10',
  name: 'Flat Twists',
  price: 50,
  priceTo: 60,
  duration: '2h–4h',
  image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&q=80',
  tag: null,
  gender: 'Homme'
}, {
  id: 'pp11',
  name: 'Barrel Twist',
  price: 60,
  priceTo: 80,
  duration: '2h30–5h',
  image: 'https://images.unsplash.com/photo-1553514029-1318c9127859?w=500&q=80',
  tag: null,
  gender: 'Homme'
}, {
  id: 'pp12',
  name: 'Fulani Homme',
  price: 50,
  priceTo: 60,
  duration: '2h–4h',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  tag: null,
  gender: 'Homme'
}, {
  id: 'pp13',
  name: 'Départ de Locks',
  price: 80,
  priceTo: 90,
  duration: '4h–7h',
  image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&q=80',
  tag: 'Exclusif',
  gender: 'Homme'
}, {
  id: 'pp14',
  name: 'Retwist Locks',
  price: 50,
  priceTo: 70,
  duration: '2h–5h',
  image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&q=80',
  tag: null,
  gender: 'Homme'
}] as const;
const REVIEWS = [{
  id: 'rv1',
  name: 'Aminata K.',
  rating: 5,
  comment: 'Des nattes collées parfaites, travail propre et soigné ! Je recommande à 100%.',
  prestation: 'Nattes collées',
  initial: 'A'
}, {
  id: 'rv2',
  name: 'Jordan M.',
  rating: 5,
  comment: "Cornrows impeccables. En tant qu'homme, j'ai été super bien accueilli.",
  prestation: 'Cornrows homme',
  initial: 'J'
}, {
  id: 'rv3',
  name: 'Fatou D.',
  rating: 5,
  comment: 'Mes knotless braids sont magnifiques, le résultat dépasse mes attentes !',
  prestation: 'Knotless Braids',
  initial: 'F'
}, {
  id: 'rv4',
  name: 'Kevin T.',
  rating: 5,
  comment: "Retwist parfait, mes locks sont comme neuves. Service vraiment top.",
  prestation: 'Retwist locks',
  initial: 'K'
}, {
  id: 'rv5',
  name: 'Laïla S.',
  rating: 5,
  comment: 'Fulanis magnifiques avec les perles premium. Vraiment un super talent.',
  prestation: 'Fulanis',
  initial: 'L'
}, {
  id: 'rv6',
  name: 'Théo N.',
  rating: 5,
  comment: "Départ de locks réussi, j'ai été très bien conseillé. Professionnelle et attentionnée.",
  prestation: 'Départ de locks',
  initial: 'T'
}] as const;
const NAV_ITEMS = [{
  id: 'nav1',
  label: 'Accueil',
  anchor: 'top'
}, {
  id: 'nav2',
  label: 'Prestations',
  anchor: 'prestations'
}, {
  id: 'nav3',
  label: 'Galerie',
  anchor: 'galerie'
}, {
  id: 'nav4',
  label: 'Contact',
  anchor: 'contact'
}] as const;
const GALERIE_IMGS = [{
  id: 'g1',
  src: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80',
  alt: 'Fulanis perles'
}, {
  id: 'g2',
  src: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&q=80',
  alt: 'Cornrows homme'
}, {
  id: 'g3',
  src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80',
  alt: 'Knotless braids'
}, {
  id: 'g4',
  src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&q=80',
  alt: 'Locks naturelles'
}, {
  id: 'g5',
  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  alt: 'Fulanis'
}, {
  id: 'g6',
  src: 'https://images.unsplash.com/photo-1599948128020-9a44c7eb5b9c?w=600&q=80',
  alt: 'Nattes collées motifs'
}, {
  id: 'g7',
  src: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=600&q=80',
  alt: 'Box braids'
}, {
  id: 'g8',
  src: 'https://images.unsplash.com/photo-1605980625600-88d6716a5b2c?w=600&q=80',
  alt: 'Nattes motifs géo'
}] as const;
const VALUES = [{
  id: 'v1',
  icon: Scissors,
  title: 'Expertise Afro',
  desc: 'Maîtrise des cheveux afros et texturés, chaque technique adaptée à votre nature capillaire.'
}, {
  id: 'v2',
  icon: Users,
  title: 'Mixte & Inclusif',
  desc: 'Prestations pour femmes, hommes et unisexe. Tous les profils, tous les besoins.'
}, {
  id: 'v3',
  icon: Sparkles,
  title: 'Finitions Précises',
  desc: 'Chaque coiffure réalisée avec soin, des bords propres aux détails les plus fins.'
}, {
  id: 'v4',
  icon: Calendar,
  title: 'Réservation Facile',
  desc: 'Planifiez en 2 minutes depuis votre téléphone. Confirmation immédiate.'
}] as const;
const HOW_STEPS = [{
  id: 's1',
  num: '01',
  icon: Scissors,
  title: 'Choisissez votre coiffure',
  desc: 'Sélectionnez parmi nos prestations avec les options qui vous correspondent.'
}, {
  id: 's2',
  num: '02',
  icon: Calendar,
  title: 'Date & Heure',
  desc: 'Choisissez un créneau disponible. Confirmation instantanée par email et SMS.'
}, {
  id: 's3',
  num: '03',
  icon: CheckCircle,
  title: 'Rendez-vous confirmé',
  desc: "Je viens chez vous ou vous venez à la Croix-Rousse — à vous de choisir !"
}] as const;
const CONTACT_ITEMS = [{
  icon: MapPin,
  label: 'Adresse',
  content: 'Croix-Rousse, Lyon 1er\nMétro C — Station Croix-Rousse (2 min)',
  href: undefined as string | undefined
}, {
  icon: Phone,
  label: 'Téléphone / WhatsApp',
  content: '+33 6 12 34 56 78',
  href: 'tel:+33612345678'
}, {
  icon: Mail,
  label: 'Email',
  content: 'contact@sleekhair.fr',
  href: 'mailto:contact@sleekhair.fr'
}, {
  icon: Clock,
  label: 'Horaires',
  content: 'Lun – Ven : 9h – 19h\nSam : 9h – 18h\nDimanche : Fermé',
  href: undefined as string | undefined
}] as const;
const FOOTER_LINKS = [{
  id: 'fl1',
  label: 'Accueil',
  anchor: 'top'
}, {
  id: 'fl2',
  label: 'Prestations',
  anchor: 'prestations'
}, {
  id: 'fl3',
  label: 'Galerie',
  anchor: 'galerie'
}, {
  id: 'fl4',
  label: 'Contact',
  anchor: 'contact'
}] as const;
const HERO_STATS = [{
  num: '500+',
  label: 'Clientes & clients'
}, {
  num: '14+',
  label: 'Prestations'
}, {
  num: '4.9★',
  label: 'Note moyenne'
}] as const;

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({
  children,
  className,
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px'
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 28
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.65,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }} className={className}>
      {children}
    </motion.div>;
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar: React.FC<{
  onNavigate: (p: SleekPage) => void;
}> = ({
  onNavigate
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const scrollTo = (anchor: string) => {
    setOpen(false);
    if (anchor === 'top') window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });else document.getElementById(anchor)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-400', scrolled ? 'bg-[#0f0d0b]/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5')}>
      <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <button onClick={() => scrollTo('top')} className="flex items-center gap-2.5 group" aria-label="Sleekhair — Accueil">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center shadow-md">
            <Scissors size={13} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg" style={{
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.14em'
        }}>Sleekhair</span>
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(item => <li key={item.id}>
              <button onClick={() => scrollTo(item.anchor)} className="text-[11px] font-semibold tracking-widest uppercase text-white/55 hover:text-white transition-colors duration-300 py-1">
                {item.label}
              </button>
            </li>)}
        </ul>

        <div className="hidden md:flex items-center gap-2.5">
          <a href="https://www.instagram.com/sleekhair" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/45 hover:text-white transition-all duration-300" aria-label="Instagram">
            <Instagram size={14} />
          </a>
          <button onClick={() => onNavigate('membre')} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/45 hover:text-white transition-all duration-300" aria-label="Mon compte">
            <User size={14} />
          </button>
          <button onClick={() => onNavigate('reservation')} className="ml-1 inline-flex items-center bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-all duration-300 hover:-translate-y-px">
            Réserver
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-1.5 rounded-sm hover:bg-white/8 transition-colors" aria-label="Menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <div className={cn('md:hidden overflow-hidden transition-all duration-400', open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0')}>
        <div className="bg-[#0f0d0b]/98 backdrop-blur-md border-t border-white/6 px-5 pt-4 pb-7">
          <ul className="flex flex-col mb-5">
            {NAV_ITEMS.map(item => <li key={item.id}>
                <button onClick={() => scrollTo(item.anchor)} className="w-full text-left text-[11px] tracking-widest uppercase font-semibold py-4 border-b border-white/5 text-white/65 hover:text-[#c9a96e] transition-colors duration-300">
                  {item.label}
                </button>
              </li>)}
          </ul>
          <div className="flex gap-2.5">
            <button onClick={() => {
            setOpen(false);
            onNavigate('membre');
          }} className="flex-1 border border-white/15 text-white/60 text-[11px] font-bold tracking-widest uppercase py-3 rounded-sm transition-all duration-300">
              Mon compte
            </button>
            <button onClick={() => {
            setOpen(false);
            onNavigate('reservation');
          }} className="flex-1 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-[11px] font-bold tracking-widest uppercase py-3 rounded-sm transition-all duration-300">
              Réserver
            </button>
          </div>
        </div>
      </div>
    </header>;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero: React.FC<{
  onReserve: () => void;
}> = ({
  onReserve
}) => {
  const [current, setCurrent] = useState(0);
  const total = HERO_SLIDES.length;
  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);
  return <section id="accueil" className="relative h-screen min-h-[620px] max-h-[960px] overflow-hidden bg-[#0f0d0b]" aria-label="Hero">
      <AnimatePresence mode="sync">
        <motion.div key={HERO_SLIDES[current].id} initial={{
        opacity: 0,
        scale: 1.04
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1]
      }} className="absolute inset-0">
          <img src={HERO_SLIDES[current].src} alt={HERO_SLIDES[current].alt} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d0b]/90 via-[#0f0d0b]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/80 via-transparent to-[#0f0d0b]/20" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-28 bg-gradient-to-b from-transparent via-[#c9a96e] to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div key={`lbl-${current}`} initial={{
          opacity: 0,
          y: 16
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.5
        }} className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">{HERO_SLIDES[current].label}</span>
          </motion.div>
        </AnimatePresence>

        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.04] mb-5 tracking-tight max-w-2xl" style={{
        fontFamily: 'Georgia, serif'
      }}>
          Coiffure afro<br />
          <span className="text-[#c9a96e]">à domicile</span><br />
          Croix-Rousse
        </h1>

        <p className="text-white/55 text-sm md:text-base leading-relaxed mb-4 max-w-lg">
          Knotless braids, boho braids, fulanis, locks, retwist, twists — pour femmes, hommes et enfants.
          Je vous reçois <strong className="text-white/75">à mon domicile à la Croix-Rousse</strong>, Lyon 1er.
        </p>

        <div className="flex items-center gap-2 mb-9">
          <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
          <span className="text-[#c9a96e] text-xs font-semibold">Métro C — Croix-Rousse · 2 min à pied</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onReserve} className="inline-flex items-center justify-center gap-2.5 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5 group">
            <span>Réserver maintenant</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
          <button onClick={() => document.getElementById('prestations')?.scrollIntoView({
          behavior: 'smooth'
        })} className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/45 text-white text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-300">
            Voir les prestations
          </button>
        </div>

        <div className="flex items-center gap-8 mt-14">
          {HERO_STATS.map((stat, i) => <div key={`stat-${stat.num}`} className="flex items-center gap-8">
              <div>
                <p className="text-white text-xl font-bold" style={{
              fontFamily: 'Georgia, serif'
            }}>{stat.num}</p>
                <p className="text-white/35 text-[10px] uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
              {i < 2 && <div className="h-7 w-px bg-white/12" />}
            </div>)}
        </div>
      </div>

      <div className="absolute bottom-8 left-6 md:left-12 right-6 z-10 flex items-center gap-4">
        <button onClick={() => setCurrent(i => (i - 1 + total) % total)} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300" aria-label="Précédent">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {HERO_SLIDES.map((_, i) => <button key={`dot-${i}`} onClick={() => setCurrent(i)} className={cn('h-0.5 rounded-full transition-all duration-400', i === current ? 'w-7 bg-[#c9a96e]' : 'w-3 bg-white/25')} aria-label={`Slide ${i + 1}`} />)}
        </div>
        <button onClick={() => setCurrent(i => (i + 1) % total)} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300" aria-label="Suivant">
          <ChevronRight size={16} />
        </button>
        <span className="ml-auto text-white/25 text-xs font-medium">{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </section>;
};

// ─── Main Site Component ──────────────────────────────────────────────────────

interface SleekhairSiteProps {
  onNavigate: (p: SleekPage) => void;
}
export const SleekhairSite: React.FC<SleekhairSiteProps> = ({
  onNavigate
}) => {
  const [activeCat, setActiveCat] = useState<string>('all');
  const categories = ['all', 'Femme', 'Homme'];
  const filtered = activeCat === 'all' ? PRESTATIONS_PREVIEW : PRESTATIONS_PREVIEW.filter(p => p.gender === activeCat);
  return <div className="min-h-screen w-full bg-[#0f0d0b]">
      <Navbar onNavigate={onNavigate} />
      <Hero onReserve={() => onNavigate('reservation')} />

      {/* ── Values ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Mon Expertise</span>
            </div>
            <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{
            fontFamily: 'Georgia, serif'
          }}>
              Coiffure afro premium,<br /><span className="text-[#8b6336]">à la Croix-Rousse</span>
            </h2>
            <p className="text-[#6b5a48] text-sm md:text-base max-w-lg leading-relaxed mb-12">
              Je vous reçois à mon domicile, dans un cadre intime et bienveillant. Chaque coiffure est réalisée avec soin et passion.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VALUES.map((v, i) => <Reveal key={v.id} delay={i * 0.08}>
                <div className="bg-white border border-[#e8ddd0] rounded-xl p-6 hover:border-[#c9a96e]/50 hover:shadow-md transition-all duration-300 group h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#f5ede0] flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/15 transition-colors duration-300">
                    <v.icon size={18} className="text-[#8b6336]" />
                  </div>
                  <h3 className="text-[#1a1410] font-bold text-sm mb-1.5" style={{
                fontFamily: 'Georgia, serif'
              }}>{v.title}</h3>
                  <p className="text-[#7a6a58] text-xs leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>)}
          </div>
        </div>
      </section>

      {/* ── Prestations ────────────────────────────────────────────────────── */}
      <section id="prestations" className="bg-[#1a1410] py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Catalogue & Tarifs</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight" style={{
              fontFamily: 'Georgia, serif'
            }}>
                Toutes les prestations <span className="text-[#c9a96e]">Sleekhair</span>
              </h2>
              <button onClick={() => onNavigate('reservation')} className="inline-flex items-center gap-2 text-[#c9a96e] hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-300 flex-shrink-0">
                <span>Réserver maintenant</span><ArrowRight size={13} />
              </button>
            </div>
          </Reveal>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => <button key={cat} onClick={() => setActiveCat(cat)} className={cn('px-4 py-2 rounded-sm text-xs font-bold uppercase transition-all duration-200', activeCat === cat ? 'bg-[#c9a96e] text-[#0f0d0b]' : 'bg-white/5 border border-white/10 text-white/50 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]')} style={{
            letterSpacing: '0.1em'
          }}>
                {cat === 'all' ? 'Toutes' : cat}
              </button>)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => <Reveal key={p.id} delay={Math.min(i * 0.05, 0.2)}>
                <article className="group bg-[#231e18] border border-white/8 rounded-xl overflow-hidden hover:border-[#c9a96e]/40 transition-all duration-400 flex flex-col h-full">
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231e18] via-transparent to-transparent" />
                    {p.tag && <div className="absolute top-3 left-3 bg-[#c9a96e] text-[#1a1410] text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm" style={{
                  letterSpacing: '0.12em'
                }}>
                        {p.tag}
                      </div>}
                    <div className={cn('absolute bottom-2 right-2 text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm border', p.gender === 'Femme' ? 'bg-rose-950/80 text-rose-300 border-rose-800/50' : 'bg-sky-950/80 text-sky-300 border-sky-800/50')}>
                      {p.gender}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-white font-bold text-sm mb-1.5" style={{
                  fontFamily: 'Georgia, serif'
                }}>{p.name}</h3>
                    <div className="flex items-center justify-between mb-4 flex-1">
                      <div className="flex items-center gap-1 text-white/35 text-[11px]"><Clock size={10} /><span>{p.duration}</span></div>
                      <span className="text-[#c9a96e] font-bold text-sm">{p.priceTo ? `${p.price}–${p.priceTo}€` : `${p.price}€`}</span>
                    </div>
                    <button onClick={() => onNavigate('reservation')} className="w-full border border-[#c9a96e]/30 hover:bg-[#c9a96e] hover:border-[#c9a96e] text-[#c9a96e] hover:text-[#1a1410] text-[11px] font-bold tracking-widest uppercase py-2.5 rounded-sm transition-all duration-300">
                      Réserver
                    </button>
                  </div>
                </article>
              </Reveal>)}
          </div>

          {/* Supplements note */}
          <Reveal delay={0.2}>
            <div className="mt-8 p-5 bg-[#231e18] border border-white/8 rounded-xl">
              <p className="text-[#c9a96e] text-xs font-bold uppercase mb-3" style={{
              letterSpacing: '0.12em'
            }}>Suppléments disponibles</p>
              <div className="flex flex-wrap gap-3">
                {[{
                label: 'Brushing',
                price: '+10€'
              }, {
                label: 'Boucles',
                price: '+5€'
              }, {
                label: 'Ajout de perles',
                price: '+5€'
              }, {
                label: 'Fourniture de mèches',
                price: '+20–50€'
              }, {
                label: 'Mélange de couleurs',
                price: '+10€'
              }].map(s => <div key={s.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                    <span className="text-white/60 text-xs">{s.label}</span>
                    <span className="text-[#c9a96e] text-xs font-bold">{s.price}</span>
                  </div>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Galerie ─────────────────────────────────────────────────────────── */}
      <section id="galerie" className="bg-[#faf8f5] py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Galerie</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
              <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold leading-tight" style={{
              fontFamily: 'Georgia, serif'
            }}>
                Mes réalisations <span className="text-[#8b6336]">récentes</span>
              </h2>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/sleekhair" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                  <Instagram size={14} /><span>Instagram</span>
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {GALERIE_IMGS.map((img, i) => <Reveal key={img.id} delay={i * 0.05}>
                <div className="relative rounded-xl overflow-hidden group aspect-square">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Play size={14} className="text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </Reveal>)}
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#f5ede0] py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Avis Clients</span>
            </div>
            <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold mb-10 leading-tight" style={{
            fontFamily: 'Georgia, serif'
          }}>
              Ce qu'ils disent de <span className="text-[#8b6336]">Sleekhair</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => <Reveal key={r.id} delay={i * 0.06}>
                <div className="bg-white rounded-xl p-5 border border-[#e8ddd0] hover:border-[#c9a96e]/30 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {Array.from({
                  length: r.rating
                }).map((_, si) => <Star key={`s-${r.id}-${si}`} size={12} className="fill-[#c9a96e] text-[#c9a96e]" />)}
                  </div>
                  <blockquote className="text-[#4a3f35] text-sm leading-relaxed flex-1 mb-4 italic">
                    <span>"{r.comment}"</span>
                  </blockquote>
                  <div className="flex items-center gap-3 pt-3 border-t border-[#f0e6d8]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {r.initial}
                    </div>
                    <div>
                      <p className="text-[#1a1410] font-semibold text-xs">{r.name}</p>
                      <p className="text-[#a08060] text-[11px]">{r.prestation}</p>
                    </div>
                  </div>
                </div>
              </Reveal>)}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ───────────────────────────────────────────────── */}
      <section className="bg-[#1a1410] py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Réservation</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{
            fontFamily: 'Georgia, serif'
          }}>
              Réservez en <span className="text-[#c9a96e]">2 minutes</span>
            </h2>
            <p className="text-white/45 text-sm max-w-md leading-relaxed mb-14">Choisissez votre prestation, votre créneau et confirmez — c'est tout.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {HOW_STEPS.map((s, i) => <Reveal key={s.id} delay={i * 0.1}>
                <div className="flex flex-col items-start">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#231e18] border border-[#c9a96e]/20 flex items-center justify-center">
                      <s.icon size={22} className="text-[#c9a96e]" />
                    </div>
                    <span className="absolute -top-3 -right-3 text-[#c9a96e]/12 text-5xl font-black leading-none select-none" style={{
                  fontFamily: 'Georgia, serif'
                }}>{s.num}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2" style={{
                fontFamily: 'Georgia, serif'
              }}>{s.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>)}
          </div>

          <Reveal delay={0.3}>
            <button onClick={() => onNavigate('reservation')} className="inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5">
              <span>Prendre rendez-vous</span><ArrowRight size={15} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Contact / Localisation ──────────────────────────────────────────── */}
      <section id="contact" className="bg-[#faf8f5] py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#c9a96e]" />
                <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Localisation</span>
              </div>
              <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{
              fontFamily: 'Georgia, serif'
            }}>
                Sleekhair,<br /><span className="text-[#8b6336]">Croix-Rousse, Lyon</span>
              </h2>
              <p className="text-[#6b5a48] text-sm leading-relaxed mb-8 max-w-md">
                Je coiffe <strong>à mon domicile</strong> situé à la Croix-Rousse (Lyon 1er/4e), à 2 minutes à pied du métro C station Croix-Rousse.
              </p>

              <div className="space-y-4 mb-8">
                {CONTACT_ITEMS.map(item => <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#f5ede0] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon size={16} className="text-[#8b6336]" />
                    </div>
                    <div>
                      <p className="text-[#1a1410] font-semibold text-xs mb-0.5">{item.label}</p>
                      {item.href ? <a href={item.href} className="text-[#8b6336] text-sm hover:underline">{item.content}</a> : <p className="text-[#7a6a58] text-sm whitespace-pre-line">{item.content}</p>}
                    </div>
                  </div>)}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="https://www.instagram.com/sleekhair" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                  <Instagram size={14} /><span>Instagram</span>
                </a>
                <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg transition-all">
                  <MessageCircle size={14} /><span>WhatsApp</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-[#e8ddd0] rounded-2xl overflow-hidden relative h-[380px] shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ddd0c0] to-[#c8b89a]">
                  <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(#8b6336 1px, transparent 1px), linear-gradient(90deg, #8b6336 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#f5ede0]/60 -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-[#f5ede0]/60 -translate-x-1/2" />
                  <div className="absolute top-[35%] left-[15%] right-[20%] h-2.5 bg-[#f5ede0]/40 rotate-[12deg]" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#c9a96e] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg mb-1 whitespace-nowrap">Sleekhair — Croix-Rousse</div>
                    <div className="w-4 h-4 bg-[#c9a96e] rounded-full border-2 border-white shadow-lg" />
                    <div className="w-0.5 h-4 bg-[#c9a96e]" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#f5ede0] flex items-center justify-center flex-shrink-0">
                      <MapPin size={13} className="text-[#8b6336]" />
                    </div>
                    <div>
                      <p className="text-[#1a1410] font-semibold text-xs">Accès facile</p>
                      <p className="text-[#7a6a58] text-[11px]">Métro C — Croix-Rousse · 2 min à pied</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1410] py-16 px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Croix-Rousse · Lyon</span>
              <div className="h-px w-8 bg-[#c9a96e]" />
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{
            fontFamily: 'Georgia, serif'
          }}>
              Prêt(e) pour votre<br /><span className="text-[#c9a96e]">prochaine coiffure ?</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-md mx-auto">Réservez en ligne en quelques clics. Disponibilités en temps réel, confirmation immédiate.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => onNavigate('reservation')} className="inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                <span>Réserver maintenant</span><ArrowRight size={15} />
              </button>
              <button onClick={() => onNavigate('membre')} className="inline-flex items-center gap-2 border border-white/20 hover:border-[#c9a96e]/50 text-white/60 hover:text-[#c9a96e] text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-300">
                <User size={14} /><span>Mon espace membre</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f0d0b] text-white/50 pt-14 pb-8 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center">
                  <Scissors size={12} className="text-white" />
                </div>
                <span className="text-white font-bold text-base" style={{
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.12em'
              }}>Sleekhair</span>
              </div>
              <p className="text-white/35 text-xs leading-relaxed mb-5">Coiffure afro premium à domicile, Croix-Rousse, Lyon. Femmes, hommes, enfants.</p>
              <div className="flex gap-2.5">
                <a href="https://instagram.com/sleekhair" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#c9a96e]/20 border border-white/8 flex items-center justify-center transition-all" aria-label="Instagram">
                  <Instagram size={13} className="text-white/50" />
                </a>
                <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#25D366]/20 border border-white/8 flex items-center justify-center transition-all" aria-label="WhatsApp">
                  <MessageCircle size={13} className="text-white/50" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-4">Navigation</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map(link => <li key={link.id}>
                    <button onClick={() => {
                  if (link.anchor === 'top') window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });else document.getElementById(link.anchor)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }} className="text-white/40 hover:text-[#c9a96e] text-xs transition-colors duration-300">
                      {link.label}
                    </button>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-4">Contact</h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-[#c9a96e] mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs">Croix-Rousse, Lyon 1er<br />Métro C — Croix-Rousse</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-[#c9a96e] flex-shrink-0" />
                  <a href="tel:+33612345678" className="text-white/40 hover:text-[#c9a96e] text-xs transition-colors">+33 6 12 34 56 78</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-[#c9a96e] flex-shrink-0" />
                  <a href="mailto:contact@sleekhair.fr" className="text-white/40 hover:text-[#c9a96e] text-xs transition-colors">contact@sleekhair.fr</a>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={12} className="text-[#c9a96e] mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs">Lun–Ven : 9h–19h<br />Sam : 9h–18h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-[11px]">© 2025 Sleekhair. Tous droits réservés. Lyon, France.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('admin')} className="text-white/10 hover:text-white/30 text-[10px] transition-colors">Admin</button>
              <button onClick={() => onNavigate('membre')} className="text-white/10 hover:text-white/30 text-[10px] transition-colors">Mon espace</button>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};