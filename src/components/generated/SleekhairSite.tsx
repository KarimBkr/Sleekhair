import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Scissors, ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Clock, Instagram, Star, Users, User, CheckCircle, Sparkles, Calendar, Menu, X, MessageCircle, ExternalLink, Play, Flame, TrendingUp, Crown, Image } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SleekPage } from './SleekhairHome';
import heroCornrow from '@/assets/hero/Cornrow.mov';
import heroHome2 from '@/assets/hero/home2.png';
import heroHome3 from '@/assets/hero/home3.mov';
import heroHome4 from '@/assets/hero/home4.mov';
import { PRESTATION_MEDIA } from '@/lib/prestationMedia';
import { PrestationCover } from '@/lib/PrestationCover';
import galleryFulaniReal from '@/assets/gallery/Fulani réalisation.png';
import galleryCornrowReal from '@/assets/gallery/Cornrow réalisation.png';
import galleryNattesColleesReal from '@/assets/gallery/Nattes collées réalisation.png';
import gallerySleekPonytail from '@/assets/gallery/Sleek ponytail.png';
import tiktokThumbFulaniBraids from '@/assets/gallery/tiktok-fulani-braids-7614589537053986070.jpg';
import tiktokThumbFulaniBraidsHomme from '@/assets/gallery/tiktok-fulani-braids-homme-7624248783664090390.jpg';
import tiktokThumbBohoBraids from '@/assets/gallery/tiktok-boho-braids-7617643778588921110.jpg';
import tiktokThumbNattesCollees from '@/assets/gallery/tiktok-nattes-collees-7615014573229346070.jpg';
import galleryBohoBraids2 from '@/assets/prestations/boho-braids-2.png';
import galleryRetwistLocks from '@/assets/prestations/Retwist locks.png';

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = '#c9a96e';
const GOLD_DARK = '#8b6336';
const DARK = '#0f0d0b';
const DARK2 = '#1a1410';
const CREAM = '#faf8f5';
const BEIGE = '#f5ede0';

// ─── Data ─────────────────────────────────────────────────────────────────────

type HeroSlide = {
  id: string;
  kind: 'image' | 'video';
  src: string;
  alt: string;
  label: string;
  /** Cadrage pour `object-fit: cover` (ex. `center 68%` = voir un peu plus bas dans l’image). */
  objectPosition?: string;
};

const HERO_SLIDES: HeroSlide[] = [{
  id: 'h1',
  kind: 'video',
  src: heroCornrow,
  alt: 'Sleekhair — cornrow',
  label: 'Cornrow'
}, {
  id: 'h2',
  kind: 'image',
  src: heroHome2,
  alt: 'Sleekhair — visuel accueil 2',
  label: 'Salon Sleekhair',
  objectPosition: 'center 12%'
}, {
  id: 'h3',
  kind: 'video',
  src: heroHome3,
  alt: 'Sleekhair — visuel accueil 3',
  label: 'Salon Sleekhair',
  objectPosition: 'center 21%'
}, {
  id: 'h4',
  kind: 'video',
  src: heroHome4,
  alt: 'Sleekhair — visuel accueil 4',
  label: 'Salon Sleekhair'
}];
const PRESTATIONS_PREVIEW: Array<{
  id: string;
  name: string;
  price: number;
  priceTo: number | null;
  duration: string;
  image: string;
  tag: string | null;
  tagIcon: string | null;
  tagColor: string;
  gender: string;
  desc: string;
  isBestSeller: boolean;
}> = [{
  id: 'f01',
  name: 'Knotless Braids',
  price: 40,
  priceTo: 70,
  duration: '3h–8h',
  image: PRESTATION_MEDIA.f01,
  tag: 'Tendance',
  tagIcon: 'trending',
  tagColor: 'bg-amber-500 text-white',
  gender: 'Femme',
  desc: 'Tresses knotless sans nœud, légères et naturelles. Cheveux 3C–4C.',
  isBestSeller: true
}, {
  id: 'f02',
  name: 'Boho Braids',
  price: 50,
  priceTo: 80,
  duration: '4h–9h',
  image: PRESTATION_MEDIA.f02,
  tag: 'Best-seller',
  tagIcon: 'flame',
  tagColor: 'bg-rose-500 text-white',
  gender: 'Femme',
  desc: 'Braids boho avec bouts ondulés, extensions naturelles incluses.',
  isBestSeller: true
}, {
  id: 'm02',
  name: 'Nattes Collées',
  price: 40,
  priceTo: 50,
  duration: '1h30–3h',
  image: PRESTATION_MEDIA.m02,
  tag: 'Best-seller',
  tagIcon: 'flame',
  tagColor: 'bg-rose-500 text-white',
  gender: 'Homme',
  desc: 'Cornrows plaqués au crâne, bords ultra nets. Textures 3C–4C.',
  isBestSeller: true
}, {
  id: 'f05',
  name: 'Fulani braids',
  price: 50,
  priceTo: 80,
  duration: '3h–6h',
  image: PRESTATION_MEDIA.f05,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Femme',
  desc: 'Tresses fulani avec perles. Style afro-tribal soigné.',
  isBestSeller: false
}, {
  id: 'f03',
  name: 'Twists',
  price: 40,
  priceTo: 70,
  duration: '2h–6h',
  image: PRESTATION_MEDIA.f03,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Femme',
  desc: 'Twists 2-strands volumisés, du court au très long. 4A–4C.',
  isBestSeller: false
}, {
  id: 'f04',
  name: 'Island twist',
  price: 50,
  priceTo: 80,
  duration: '3h–7h',
  image: PRESTATION_MEDIA.f04,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Femme',
  desc: 'Island twists : volume et mouvement.',
  isBestSeller: false
}, {
  id: 'f06',
  name: 'Butterfly Locks',
  price: 40,
  priceTo: 70,
  duration: '3h–7h',
  image: PRESTATION_MEDIA.f06,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Femme',
  desc: 'Locks papillon légères. Look bohème sur cheveux 3C–4C.',
  isBestSeller: false
}, {
  id: 'f08',
  name: 'Nattes',
  price: 40,
  priceTo: 60,
  duration: '1h30–4h',
  image: PRESTATION_MEDIA.f08,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Femme',
  desc: 'Nattes classiques. Extensions optionnelles.',
  isBestSeller: false
}, {
  id: 'f10',
  name: 'Sleek ponytail',
  price: 40,
  priceTo: 50,
  duration: '1h–2h',
  image: PRESTATION_MEDIA.f10,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Femme',
  desc: 'Queue de cheval sleek, ligne nette.',
  isBestSeller: false
}, {
  id: 'f11',
  name: 'Coiffure Enfants',
  price: 30,
  priceTo: 40,
  duration: '1h–2h',
  image: PRESTATION_MEDIA.f11,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Femme',
  desc: 'Pour les petites (4–10 ans). Technique douce, cadre bienveillant.',
  isBestSeller: false
}, {
  id: 'm03',
  name: 'Flat twist',
  price: 50,
  priceTo: 60,
  duration: '2h–4h',
  image: PRESTATION_MEDIA.m03,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Homme',
  desc: 'Twists plaqués. Lignes nettes ; simple ou modèle au moment de la réservation.',
  isBestSeller: false
}, {
  id: 'm04',
  name: 'Barrel Twist',
  price: 60,
  priceTo: 80,
  duration: '2h30–5h',
  image: PRESTATION_MEDIA.m04,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Homme',
  desc: 'Twists épais et ronds. Look structuré pour cheveux 4B–4C.',
  isBestSeller: false
}, {
  id: 'm05',
  name: 'Fulani',
  price: 50,
  priceTo: 60,
  duration: '2h–4h',
  image: PRESTATION_MEDIA.m05,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Homme',
  desc: 'Fulanis masculins, perles et lignes nettes.',
  isBestSeller: false
}, {
  id: 'm09',
  name: 'Vanilles',
  price: 40,
  priceTo: null,
  duration: '1h30–3h',
  image: PRESTATION_MEDIA.m09,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Homme',
  desc: 'Vanilles tressées — tenue nette.',
  isBestSeller: false
}, {
  id: 'm10',
  name: 'Barrel Fulani',
  price: 60,
  priceTo: 85,
  duration: '3h–5h',
  image: PRESTATION_MEDIA.m10,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Homme',
  desc: 'Barrel twists x lignes fulani.',
  isBestSeller: false
}, {
  id: 'm06',
  name: 'Départ de Locks',
  price: 80,
  priceTo: 90,
  duration: '4h–7h',
  image: PRESTATION_MEDIA.m06,
  tag: 'Exclusif',
  tagIcon: 'crown',
  tagColor: 'bg-violet-600 text-white',
  gender: 'Homme',
  desc: 'Création de locks from scratch. Consultation incluse.',
  isBestSeller: false
}, {
  id: 'm07',
  name: 'Retwist Locks',
  price: 50,
  priceTo: 70,
  duration: '2h–5h',
  image: PRESTATION_MEDIA.m07,
  tag: null,
  tagIcon: null,
  tagColor: '',
  gender: 'Homme',
  desc: 'Entretien et remise en forme de vos locks. Résultat net.',
  isBestSeller: false
}];
const GALLERY_PHOTOS = [{
  id: 'gp1',
  src: galleryBohoBraids2,
  alt: 'Boho braids — réalisation',
  caption: 'Boho Braids'
}, {
  id: 'gp2',
  src: galleryFulaniReal,
  alt: 'Fulanis — réalisation',
  caption: 'Fulanis'
}, {
  id: 'gp3',
  src: galleryRetwistLocks,
  alt: 'Locks — retwist',
  caption: 'Locks'
}, {
  id: 'gp4',
  src: galleryNattesColleesReal,
  alt: 'Nattes collées — réalisation',
  caption: 'Nattes Collées'
}, {
  id: 'gp5',
  src: galleryCornrowReal,
  alt: 'Cornrows — réalisation',
  caption: 'Cornrows'
}, {
  id: 'gp6',
  src: gallerySleekPonytail,
  alt: 'Sleek ponytail — réalisation',
  caption: 'Sleek ponytail'
}];
const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@_sleekhair?is_from_webapp=1&sender_device=pc';
const TIKTOK_VIDEOS = [{
  id: 'tk1',
  embedUrl: 'https://www.tiktok.com/embed/v2/7617643778588921110',
  watchUrl: 'https://www.tiktok.com/@_sleekhair/video/7617643778588921110',
  label: 'Boho Braids',
  sublabel: 'Coiffeuse sur Lyon · boho',
  thumb: tiktokThumbBohoBraids
}, {
  id: 'tk2',
  embedUrl: 'https://www.tiktok.com/embed/v2/7614589537053986070',
  watchUrl: 'https://www.tiktok.com/@_sleekhair/video/7614589537053986070',
  label: 'Fulani braids',
  sublabel: 'Lyon · tresses fulani',
  thumb: tiktokThumbFulaniBraids
}, {
  id: 'tk4',
  embedUrl: 'https://www.tiktok.com/embed/v2/7615014573229346070',
  watchUrl: 'https://www.tiktok.com/@_sleekhair/video/7615014573229346070',
  label: 'Nattes Collées',
  sublabel: 'Lyon · nattes collées',
  thumb: tiktokThumbNattesCollees
}, {
  id: 'tk5',
  embedUrl: 'https://www.tiktok.com/embed/v2/7624248783664090390',
  watchUrl: 'https://www.tiktok.com/@_sleekhair/video/7624248783664090390',
  label: 'Fulani braids homme',
  sublabel: 'Lyon · tresses fulani homme',
  thumb: tiktokThumbFulaniBraidsHomme
}] as const;
const REVIEWS = [{
  id: 'rv1',
  name: 'Aminata K.',
  rating: 5,
  comment: 'Des nattes collées parfaites, travail propre et soigné ! Je recommande à 100%.',
  prestation: 'Nattes collées',
  initial: 'A',
  source: 'Google'
}, {
  id: 'rv2',
  name: 'Jordan M.',
  rating: 5,
  comment: "Cornrows impeccables. J'ai été super bien accueilli, résultat nickels.",
  prestation: 'Nattes Collées Homme',
  initial: 'J',
  source: 'Planity'
}, {
  id: 'rv3',
  name: 'Fatou D.',
  rating: 5,
  comment: 'Mes knotless braids sont magnifiques, le résultat dépasse mes attentes !',
  prestation: 'Knotless Braids',
  initial: 'F',
  source: 'Google'
}, {
  id: 'rv4',
  name: 'Kevin T.',
  rating: 5,
  comment: 'Retwist parfait, mes locks sont comme neuves. Service vraiment top.',
  prestation: 'Retwist Locks',
  initial: 'K',
  source: 'Google'
}, {
  id: 'rv5',
  name: 'Laïla S.',
  rating: 5,
  comment: 'Fulanis magnifiques avec les perles premium. Super talent, cadre accueillant.',
  prestation: 'Fulani Braids',
  initial: 'L',
  source: 'Planity'
}, {
  id: 'rv6',
  name: 'Théo N.',
  rating: 5,
  comment: "Départ de locks réussi, très bien conseillé. Professionnelle et attentionnée !",
  prestation: 'Départ de Locks',
  initial: 'T',
  source: 'Google'
}] as const;
const NAV_ANCHORS = [{
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
  label: 'Avis',
  anchor: 'avis'
}, {
  id: 'nav5',
  label: 'Accès',
  anchor: 'contact'
}] as const;
const VALUES = [{
  id: 'v1',
  icon: Scissors,
  title: 'Expertise Afro',
  desc: 'Maîtrise des cheveux afros et texturés, 3C à 4C.'
}, {
  id: 'v2',
  icon: Users,
  title: 'Mixte & Inclusif',
  desc: 'Femmes, hommes et enfants. Toutes textures.'
}, {
  id: 'v3',
  icon: Sparkles,
  title: 'Finitions Précises',
  desc: 'Bords propres, perles alignées, résultat impeccable.'
}, {
  id: 'v4',
  icon: Calendar,
  title: 'Réservation Simple',
  desc: 'Choisissez en ligne. Confirmation instantanée.'
}] as const;
const HOW_STEPS = [{
  id: 's1',
  num: '01',
  icon: Scissors,
  title: 'Choisissez votre coiffure',
  desc: 'Parcourez nos prestations et sélectionnez vos options.'
}, {
  id: 's2',
  num: '02',
  icon: Calendar,
  title: 'Date & Heure',
  desc: 'Choisissez un créneau. Confirmation par email et SMS.'
}, {
  id: 's3',
  num: '03',
  icon: CheckCircle,
  title: 'C\'est confirmé',
  desc: "Adresse précise envoyée après confirmation. À bientôt !"
}] as const;
const CONTACT_ITEMS = [{
  icon: MapPin,
  label: 'Adresse',
  content: 'Croix-Rousse, Lyon 4e\nMétro C — Station Croix-Rousse (2 min à pied)',
  href: undefined as string | undefined,
  mapsHref: 'https://maps.google.com/?q=Croix-Rousse+Lyon+4e'
}, {
  icon: Phone,
  label: 'Téléphone / WhatsApp',
  content: '+33 6 12 34 56 78',
  href: 'tel:+33612345678',
  mapsHref: undefined as string | undefined
}, {
  icon: Mail,
  label: 'Email',
  content: 'contact@sleekhair.fr',
  href: 'mailto:contact@sleekhair.fr',
  mapsHref: undefined as string | undefined
}, {
  icon: Clock,
  label: 'Horaires',
  content: 'Lun – Ven : 9h – 19h\nSam : 9h – 18h\nDimanche : Fermé',
  href: undefined as string | undefined,
  mapsHref: undefined as string | undefined
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
  label: 'Avis',
  anchor: 'avis'
}, {
  id: 'fl5',
  label: 'Contact',
  anchor: 'contact'
}] as const;
const HERO_STATS = [{
  num: '15+',
  label: 'Prestations',
  sub: 'coiffures maîtrisées'
}, {
  num: '500+',
  label: 'Clientes & Clients',
  sub: 'satisfaits'
}, {
  num: '4.9★',
  label: 'Note Google',
  sub: 'Google · Planity'
}] as const;
const SUPPLEMENT_TAGS = [{
  label: 'Brushing',
  price: '+10€'
}, {
  label: 'Boucles',
  price: '+5€'
}, {
  label: 'Ajout de perles',
  price: '+5€'
}, {
  label: 'Mélange de couleurs',
  price: '+10€'
}] as const;
const TIKTOK_ICON = <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
  </svg>;

// ─── Utility: scroll helper ───────────────────────────────────────────────────

function scrollToSection(anchor: string) {
  if (anchor === 'top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    document.getElementById(anchor)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

/** Ligne de lecture sous la navbar fixe (px) — pour le scroll-spy des ancres. */
const NAV_SCROLL_SPY_OFFSET = 96;

function getActiveNavAnchor(): string {
  const y = window.scrollY + NAV_SCROLL_SPY_OFFSET;
  const anchors = [...NAV_ANCHORS].filter(a => a.anchor !== 'top').reverse();
  for (const item of anchors) {
    const el = document.getElementById(item.anchor);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= y) return item.anchor;
  }
  return 'top';
}

// ─── Reveal animation wrapper ─────────────────────────────────────────────────

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
    y: 24
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }} className={className}>
      {children}
    </motion.div>;
};

// ─── Section Divider ──────────────────────────────────────────────────────────

const SectionDivider: React.FC<{
  dark?: boolean;
}> = ({
  dark = false
}) => <div className={cn('flex items-center justify-center py-2', dark ? 'bg-[#0f0d0b]' : 'bg-[#faf8f5]')}>
    <div className="flex items-center gap-3">
      <div className={cn('h-px w-16', dark ? 'bg-white/8' : 'bg-[#e8ddd0]')} />
      <div className="w-1 h-1 rounded-full bg-[#c9a96e]/40" />
      <div className={cn('h-px w-16', dark ? 'bg-white/8' : 'bg-[#e8ddd0]')} />
    </div>
  </div>;

// ─── Tag Badge ────────────────────────────────────────────────────────────────

const TagBadge: React.FC<{
  tag: string;
  tagColor: string;
  tagIcon: string | null;
}> = ({
  tag,
  tagColor,
  tagIcon
}) => {
  const iconEl = tagIcon === 'flame' ? <Flame size={9} className="flex-shrink-0" /> : tagIcon === 'trending' ? <TrendingUp size={9} className="flex-shrink-0" /> : tagIcon === 'crown' ? <Crown size={9} className="flex-shrink-0" /> : null;
  return <div className={cn('absolute top-3 left-3 flex items-center gap-1 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md', tagColor)} style={{
    letterSpacing: '0.10em'
  }}>
      {iconEl}
      <span>{tag}</span>
    </div>;
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar: React.FC<{
  onNavigate: (p: SleekPage) => void;
}> = ({
  onNavigate
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string>('top');
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    const sync = () => setActiveAnchor(getActiveNavAnchor());
    sync();
    window.addEventListener('scroll', sync, {
      passive: true
    });
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);
  const handleNav = (anchor: string) => {
    setOpen(false);
    scrollToSection(anchor);
    queueMicrotask(() => setActiveAnchor(anchor === 'top' ? 'top' : anchor));
  };
  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-400', scrolled ? 'bg-[#0f0d0b]/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5')}>
      <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav('top')} className="flex items-center gap-2.5 group" aria-label="Sleekhair — Accueil">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center shadow-md">
            <Scissors size={13} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg" style={{
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.14em'
        }}>
            Sleekhair
          </span>
        </button>

        {/* Desktop anchor links */}
        <ul className="hidden md:flex items-center gap-5">
          {NAV_ANCHORS.map(item => {
            const active = activeAnchor === item.anchor;
            return <li key={item.id}>
                <button type="button" onClick={() => handleNav(item.anchor)} aria-current={active ? 'location' : undefined} className={cn('text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 py-1 border-b-2 -mb-px', active ? 'text-[#c9a96e] border-[#c9a96e]' : 'text-white/55 hover:text-white border-transparent')}>
                  {item.label}
                </button>
              </li>;
          })}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <a href="https://www.instagram.com/_sleekhairfr/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/45 hover:text-white transition-all duration-300" aria-label="Instagram @_sleekhairfr">
            <Instagram size={14} />
          </a>
          <button onClick={() => onNavigate('membre')} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/45 hover:text-white transition-all duration-300" aria-label="Mon compte">
            <User size={14} />
          </button>
          <button onClick={() => onNavigate('reservation')} className="ml-1 inline-flex items-center bg-[#c9a96e] hover:bg-[#b8943e] active:scale-95 text-[#0f0d0b] text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-all duration-200">
            Réserver
          </button>
        </div>

        {/* Mobile: action buttons + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => onNavigate('reservation')} className="inline-flex items-center bg-[#c9a96e] hover:bg-[#b8943e] active:scale-95 text-[#0f0d0b] text-[10px] font-bold tracking-widest uppercase px-4 py-2.5 rounded-sm transition-all duration-200 min-h-[44px]">
            Réserver
          </button>
          <button onClick={() => setOpen(v => !v)} className="text-white p-2.5 rounded-sm hover:bg-white/8 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn('md:hidden overflow-hidden transition-all duration-400', open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0')}>
        <div className="bg-[#0f0d0b]/98 backdrop-blur-md border-t border-white/6 px-5 pt-4 pb-7">
          <ul className="flex flex-col mb-5">
            {NAV_ANCHORS.map(item => {
              const active = activeAnchor === item.anchor;
              return <li key={item.id}>
                  <button type="button" onClick={() => handleNav(item.anchor)} aria-current={active ? 'location' : undefined} className={cn('w-full text-left text-[11px] tracking-widest uppercase font-semibold py-4 border-b transition-colors duration-200 min-h-[44px]', active ? 'border-[#c9a96e]/50 text-[#c9a96e]' : 'border-white/5 text-white/65 hover:text-[#c9a96e] active:text-[#c9a96e]')}>
                    {item.label}
                  </button>
                </li>;
            })}
          </ul>
          <div className="flex gap-2.5">
            <button onClick={() => {
            setOpen(false);
            onNavigate('membre');
          }} className="flex-1 border border-white/15 text-white/60 hover:border-[#c9a96e]/40 hover:text-white text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-all duration-200 min-h-[44px]">
              Mon compte
            </button>
          </div>
        </div>
      </div>
    </header>;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroSlideMedia: React.FC<{
  slide: HeroSlide;
}> = ({
  slide
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (slide.kind !== 'video') return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().catch(() => {});
    return () => {
      v.pause();
    };
  }, [slide]);
  const fitStyle = slide.objectPosition ? {
    objectPosition: slide.objectPosition
  } : undefined;
  if (slide.kind === 'video') {
    return <video ref={videoRef} src={slide.src} className="w-full h-full object-cover" style={fitStyle} muted playsInline loop preload="metadata" aria-label={slide.alt} />;
  }
  return <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" style={fitStyle} />;
};

const HERO_SLIDE_MS = 5000;
/** Pause un peu plus longue sur la dernière slide avant de revenir à la première. */
const HERO_LAST_TO_FIRST_MS = 7200;

const Hero: React.FC<{
  onReserve: () => void;
  onPrestations: () => void;
}> = ({
  onReserve,
  onPrestations
}) => {
  const [current, setCurrent] = useState(0);
  const total = HERO_SLIDES.length;
  useEffect(() => {
    const delay = current === total - 1 ? HERO_LAST_TO_FIRST_MS : HERO_SLIDE_MS;
    const t = window.setTimeout(() => {
      setCurrent(i => (i + 1) % total);
    }, delay);
    return () => window.clearTimeout(t);
  }, [current, total]);
  return <section id="accueil" className="relative overflow-hidden bg-[#0f0d0b]" style={{
    minHeight: '100svh',
    maxHeight: '960px'
  }} aria-label="Hero">
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
          <HeroSlideMedia slide={HERO_SLIDES[current]} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d0b]/90 via-[#0f0d0b]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/90 via-transparent to-[#0f0d0b]/25" />

      {/* Content — tighter on mobile */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 md:px-12 pt-24 pb-28 md:pt-28 md:pb-24 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div key={`lbl-${current}`} initial={{
          opacity: 0,
          y: 14
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.45
        }} className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-[10px] font-semibold uppercase tracking-[0.25em]">
              {HERO_SLIDES[current].label}
            </span>
          </motion.div>
        </AnimatePresence>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.06] mb-3 tracking-tight max-w-xl" style={{
        fontFamily: 'Georgia, serif'
      }}>
          Coiffure afro<br />
          <span className="text-[#c9a96e]">premium</span><br />
          Croix-Rousse
        </h1>

        <p className="text-white/55 text-xs md:text-sm leading-relaxed mb-3 max-w-sm">
          <span>Boho · Fulanis · Nattes — femmes, hommes, enfants. </span>
          <strong className="text-white/70">À domicile, Lyon 4e.</strong>
        </p>

        <div className="flex items-center gap-2 mb-7">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
          <span className="text-[#c9a96e] text-[10px] font-semibold">Métro C — Croix-Rousse · 2 min à pied</span>
        </div>

        {/* CTA: primary + secondary — mobile stacked, sm+ row */}
        <div className="flex flex-col gap-3 max-w-xs sm:max-w-none sm:flex-row">
          <button onClick={onReserve} className="inline-flex items-center justify-center gap-2.5 bg-[#c9a96e] hover:bg-[#b8943e] active:scale-95 text-[#0f0d0b] text-xs font-bold tracking-widest uppercase px-7 py-4 rounded-sm transition-all duration-200 shadow-lg min-h-[52px]">
            <span>Prendre rendez-vous</span>
            <ArrowRight size={14} />
          </button>
          <button onClick={onPrestations} className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-[#c9a96e]/60 hover:text-[#c9a96e] active:scale-95 text-white/75 text-xs font-medium tracking-widest uppercase px-7 py-4 rounded-sm transition-all duration-200 min-h-[52px]">
            Voir les coiffures
          </button>
        </div>

        {/* Stats strip — tighter on mobile */}
        <div className="flex items-center gap-6 mt-8 md:mt-12">
          {HERO_STATS.map((stat, i) => <div key={`stat-${stat.label}`} className="flex items-center gap-6">
              <div>
                <p className="text-white text-lg md:text-xl font-bold leading-none" style={{
              fontFamily: 'Georgia, serif'
            }}>
                  {stat.num}
                </p>
                <p className="text-white/45 text-[9px] uppercase tracking-widest mt-0.5">{stat.label}</p>
                <p className="text-white/25 text-[9px] mt-0 hidden sm:block">{stat.sub}</p>
              </div>
              {i < 2 && <div className="h-7 w-px bg-white/12" />}
            </div>)}
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-6 left-5 right-5 md:left-12 z-10 flex items-center gap-3">
        <button onClick={() => setCurrent(i => (i - 1 + total) % total)} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:border-[#c9a96e] hover:text-[#c9a96e] active:scale-90 transition-all duration-200 min-w-[44px] min-h-[44px]" aria-label="Slide précédente">
          <ChevronLeft size={15} />
        </button>
        <div className="flex gap-1.5">
          {HERO_SLIDES.map((_, i) => <button key={`dot-hero-${i}`} onClick={() => setCurrent(i)} className={cn('h-0.5 rounded-full transition-all duration-400', i === current ? 'w-7 bg-[#c9a96e]' : 'w-3 bg-white/25 hover:bg-white/50')} aria-label={`Slide ${i + 1}`} />)}
        </div>
        <button onClick={() => setCurrent(i => (i + 1) % total)} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:border-[#c9a96e] hover:text-[#c9a96e] active:scale-90 transition-all duration-200 min-w-[44px] min-h-[44px]" aria-label="Slide suivante">
          <ChevronRight size={15} />
        </button>
        <span className="ml-auto text-white/25 text-xs font-medium">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </section>;
};

// ─── Mon Expertise ─────────────────────────────────────────────────────────────

const HeroExpertise: React.FC<{
  onNavigate: (p: SleekPage) => void;
}> = ({
  onNavigate
}) => {
  return <section className="bg-[#faf8f5] pt-16 pb-20 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Mon Expertise</span>
          </div>
          <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold mb-3 leading-[1.1]" style={{
          fontFamily: 'Georgia, serif'
        }}>
            Coiffure afro premium,<br />
            <span className="text-[#8b6336]">à mon domicile</span>
          </h2>
          <p className="text-[#6b5a48] text-sm max-w-md leading-relaxed mb-10">
            <span>Chez moi, à la Croix-Rousse. </span>
            <strong className="text-[#4a3f35]">Cadre intime et bienveillant</strong>
            <span> — 7 ans de passion pour les cheveux texturés, chaque pose prise avec soin.</span>
          </p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {VALUES.map((v, i) => <Reveal key={v.id} delay={i * 0.08}>
              <div className="bg-white border border-[#e8ddd0] rounded-xl p-5 hover:border-[#c9a96e]/50 hover:shadow-md transition-all duration-300 group h-full">
                <div className="w-9 h-9 rounded-lg bg-[#f5ede0] flex items-center justify-center mb-3 group-hover:bg-[#c9a96e]/15 transition-colors duration-300">
                  <v.icon size={16} className="text-[#8b6336]" />
                </div>
                <h3 className="text-[#1a1410] font-bold text-sm mb-1" style={{
              fontFamily: 'Georgia, serif'
            }}>
                  {v.title}
                </h3>
                <p className="text-[#7a6a58] text-xs leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>)}
        </div>
      </div>
    </section>;
};

// ─── Photo Gallery Carousel ───────────────────────────────────────────────────

const PhotoCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = GALLERY_PHOTOS.length;
  const goTo = useCallback((idx: number) => {
    setCurrent((idx + total) % total);
  }, [total]);
  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 3600);
    return () => clearInterval(t);
  }, [current, goTo]);
  return <div className="relative w-full">
      {/* Main large photo — full-width carousel feel on mobile */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden rounded-xl bg-[#1a1410]">
        <AnimatePresence mode="sync">
          <motion.div key={GALLERY_PHOTOS[current].id} initial={{
          opacity: 0,
          scale: 1.03
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }} className="absolute inset-0 flex items-center justify-center bg-[#1a1410]">
            <img src={GALLERY_PHOTOS[current].src} alt={GALLERY_PHOTOS[current].alt} className="max-h-full max-w-full object-contain" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/55 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute bottom-4 left-5 z-10">
          <AnimatePresence mode="wait">
            <motion.p key={`cap-${current}`} initial={{
            opacity: 0,
            y: 8
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 0.3
          }} className="text-white font-semibold text-sm" style={{
            fontFamily: 'Georgia, serif'
          }}>
              {GALLERY_PHOTOS[current].caption}
            </motion.p>
          </AnimatePresence>
          <p className="text-white/40 text-xs mt-0.5">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </div>

        {/* Nav arrows — 44px minimum tap targets */}
        <button onClick={() => goTo(current - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-[#c9a96e] border border-white/15 hover:border-[#c9a96e] flex items-center justify-center text-white active:scale-90 transition-all duration-200 backdrop-blur-sm" aria-label="Photo précédente">
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => goTo(current + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-[#c9a96e] border border-white/15 hover:border-[#c9a96e] flex items-center justify-center text-white active:scale-90 transition-all duration-200 backdrop-blur-sm" aria-label="Photo suivante">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Thumbnails — scrollable, 44px min height */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{
      scrollbarWidth: 'none'
    }}>
        {GALLERY_PHOTOS.map((photo, i) => <button key={photo.id} onClick={() => goTo(i)} className={cn('flex-shrink-0 w-14 h-14 md:w-18 md:h-18 rounded-lg overflow-hidden transition-all duration-300', i === current ? 'ring-2 ring-[#c9a96e] ring-offset-2 ring-offset-[#060504] opacity-100 scale-105' : 'opacity-40 hover:opacity-70')} aria-label={`Photo ${photo.caption}`}>
            <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover object-center" />
          </button>)}
      </div>
    </div>;
};

// ─── Video Carousel ──────────────────────────────────────────────────────────

const CARD_W_INACTIVE = 200;
const CARD_W_ACTIVE = 270;
const CARD_GAP = 12;
/** Pas d’emplacement flex variable : le « zoom » actif passe par le scale, sinon le translate et la boucle infinie se désynchronisent → saut visible. */
const CARD_SLOT = CARD_W_INACTIVE + CARD_GAP;
const N_VIDEOS: number = TIKTOK_VIDEOS.length;
const TRIPLED = [...TIKTOK_VIDEOS, ...TIKTOK_VIDEOS, ...TIKTOK_VIDEOS];

/** TikTok documente `player/v1/{id}` ; `embed/v2` est moins fiable (lecture / autoplay selon les vidéos et navigateurs). */
function tikTokVideoIdFromEmbedUrl(embedUrl: string): string | null {
  const fromPath = embedUrl.match(/(?:embed\/v2\/|player\/v1\/)(\d+)/);
  if (fromPath) return fromPath[1];
  const tail = embedUrl.match(/(\d{15,22})(?:\?|#|$)/);
  return tail ? tail[1] : null;
}
function tikTokIframeSrc(embedUrl: string) {
  const id = tikTokVideoIdFromEmbedUrl(embedUrl);
  if (!id) {
    return `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`;
  }
  return `https://www.tiktok.com/player/v1/${id}?autoplay=1`;
}

function calcTranslate(virtualIdx: number, containerW: number): number {
  const offset = virtualIdx * CARD_SLOT;
  return -(offset - containerW / 2 + CARD_W_INACTIVE / 2);
}
const VideoCarousel: React.FC<{
  onActiveChange: (i: number) => void;
}> = ({
  onActiveChange
}) => {
  const [virtualIdx, setVirtualIdx] = useState<number>(N_VIDEOS);
  const [activeReal, setActiveReal] = useState<number>(0);
  const [isRecentering, setIsRecentering] = useState(false);
  const virtualIdxRef = useRef<number>(N_VIDEOS);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const pendingRecenterRef = useRef<number | null>(null);
  const animFallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPaused = useRef(false);
  const getContainerW = () => containerRef.current?.clientWidth ?? window.innerWidth;
  const applyTransform = useCallback((vIdx: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const tx = calcTranslate(vIdx, getContainerW());
    track.style.transition = animate ? 'transform 0.48s cubic-bezier(0.25, 1, 0.35, 1)' : 'none';
    track.style.transform = `translateX(${tx}px)`;
  }, []);
  const finishAnim = useCallback(() => {
    if (animFallbackTimerRef.current) {
      clearTimeout(animFallbackTimerRef.current);
      animFallbackTimerRef.current = null;
    }
    const safe = pendingRecenterRef.current;
    pendingRecenterRef.current = null;
    if (safe != null) {
      const track = trackRef.current;
      if (track) track.style.transition = 'none';
      setIsRecentering(true);
      virtualIdxRef.current = safe;
      flushSync(() => {
        setVirtualIdx(safe);
      });
      if (track) {
        track.style.transform = `translateX(${calcTranslate(safe, getContainerW())}px)`;
        void track.getBoundingClientRect();
      }
      requestAnimationFrame(() => {
        setIsRecentering(false);
      });
    }
    isAnimating.current = false;
  }, []);
  const goTo = useCallback((nextV: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    if (animFallbackTimerRef.current) {
      clearTimeout(animFallbackTimerRef.current);
      animFallbackTimerRef.current = null;
    }
    const realIdx = (nextV % N_VIDEOS + N_VIDEOS) % N_VIDEOS;
    let safe = nextV;
    // Keep virtual index inside the central copy envelope at every wrap step.
    // This guarantees endless navigation while still animating in the clicked direction.
    if (nextV < N_VIDEOS) safe = nextV + N_VIDEOS;else if (nextV >= 2 * N_VIDEOS) safe = nextV - N_VIDEOS;
    pendingRecenterRef.current = safe !== nextV ? safe : null;
    virtualIdxRef.current = nextV;
    setVirtualIdx(nextV);
    setActiveReal(realIdx);
    onActiveChange(realIdx);
    applyTransform(nextV, true);
    animFallbackTimerRef.current = setTimeout(() => {
      animFallbackTimerRef.current = null;
      if (!isAnimating.current) return;
      finishAnim();
    }, 520);
  }, [onActiveChange, applyTransform, finishAnim]);
  const onTrackTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;
    if (!isAnimating.current) return;
    finishAnim();
  }, [finishAnim]);
  const goNext = useCallback(() => goTo(virtualIdxRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(virtualIdxRef.current - 1), [goTo]);
  useEffect(() => {
    const raf = requestAnimationFrame(() => applyTransform(N_VIDEOS, false));
    return () => cancelAnimationFrame(raf);
  }, [applyTransform]);
  useEffect(() => {
    const onResize = () => applyTransform(virtualIdxRef.current, false);
    window.addEventListener('resize', onResize, {
      passive: true
    });
    return () => window.removeEventListener('resize', onResize);
  }, [applyTransform]);
  const scheduleNext = useCallback(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => {
      if (!isPaused.current) goNext();
      scheduleNext();
    }, 4200);
  }, [goNext]);
  useEffect(() => {
    scheduleNext();
    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, [scheduleNext]);
  const dragStartX = useRef(0);
  const dragStartTx = useRef(0);
  const dragging = useRef(false);
  const getCurrentTx = (): number => {
    const t = trackRef.current?.style.transform ?? '';
    const m = t.match(/translateX\((-?[\d.]+)px\)/);
    return m ? parseFloat(m[1]) : calcTranslate(virtualIdxRef.current, getContainerW());
  };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if ((e.target as HTMLElement).closest('[data-vc-card]')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isPaused.current = true;
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTx.current = getCurrentTx();
    if (trackRef.current) trackRef.current.style.transition = 'none';
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    trackRef.current.style.transform = `translateX(${dragStartTx.current + dx}px)`;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 48) {
      goTo(virtualIdxRef.current + (dx < 0 ? 1 : -1));
    } else {
      applyTransform(virtualIdxRef.current, true);
    }
    setTimeout(() => {
      isPaused.current = false;
    }, 600);
  };
  return <div ref={containerRef} className="relative w-full select-none" style={{
    touchAction: 'pan-y',
    cursor: 'grab'
  }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onMouseEnter={() => {
    isPaused.current = true;
  }} onMouseLeave={() => {
    isPaused.current = false;
    if (dragging.current) {
      dragging.current = false;
      applyTransform(virtualIdxRef.current, true);
    }
  }}>
      <button type="button" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()} onClick={e => {
      e.stopPropagation();
      goPrev();
    }} className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/55 hover:bg-[#c9a96e] active:scale-90 border border-white/20 hover:border-[#c9a96e] flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm shadow-xl" aria-label="Vidéo précédente">
        <ChevronLeft size={20} />
      </button>
      <button type="button" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()} onClick={e => {
      e.stopPropagation();
      goNext();
    }} className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/55 hover:bg-[#c9a96e] active:scale-90 border border-white/20 hover:border-[#c9a96e] flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm shadow-xl" aria-label="Vidéo suivante">
        <ChevronRight size={20} />
      </button>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-20" style={{
      background: 'linear-gradient(to right, #060504 0%, transparent 100%)'
    }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-20" style={{
      background: 'linear-gradient(to left, #060504 0%, transparent 100%)'
    }} />

      <div ref={trackRef} className="flex items-end" onTransitionEnd={onTrackTransitionEnd} style={{
      gap: `${CARD_GAP}px`,
      paddingTop: '40px',
      paddingBottom: '28px',
      willChange: 'transform'
    }}>
        {TRIPLED.map((vid, i) => {
        const realI = i % N_VIDEOS;
        const isActive = i === virtualIdx;
        const dist = Math.abs(i - virtualIdx);
        const opacity = dist === 0 ? 1 : dist === 1 ? 0.7 : dist === 2 ? 0.45 : dist === 3 ? 0.28 : 0.12;
        return <div key={`vc-${i}-${vid.id}`} data-vc-card onClick={e => {
          e.stopPropagation();
          if (!isActive) goTo(i);
        }} style={{
          flexShrink: 0,
          width: `${CARD_W_INACTIVE}px`,
          zIndex: isActive ? 2 : 1,
          overflow: 'visible',
          opacity,
          transition: isRecentering ? 'none' : 'opacity 0.48s ease',
          cursor: isActive ? 'default' : 'pointer'
        }}>
              <motion.div animate={{
            scale: isActive ? CARD_W_ACTIVE / CARD_W_INACTIVE : 0.87,
            y: isActive ? 0 : 16
          }} transition={{
            duration: isRecentering ? 0 : 0.48,
            ease: [0.25, 1, 0.35, 1]
          }} className="relative rounded-2xl overflow-hidden bg-[#1a1410] group" style={{
            aspectRatio: '9/16',
            transformOrigin: '50% 100%'
          }}>
                <img src={TIKTOK_VIDEOS[realI].thumb} alt={`Réalisation Sleekhair — ${vid.label}`} className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none" draggable={false} />
                {isActive && <div className="absolute inset-0 z-[1] isolate">
                    <iframe key={`tt-embed-${vid.id}`} src={tikTokIframeSrc(vid.embedUrl)} title={`TikTok Sleekhair — ${vid.label}`} className="relative z-10 h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  </div>}
                {!isActive && <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-all duration-300 group-hover:from-black/55">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/12 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                        <Play size={15} className="text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>}
                {isActive && <div className="absolute inset-0 z-20 rounded-2xl pointer-events-none" style={{
              boxShadow: 'inset 0 0 0 2px #c9a96e, 0 0 40px rgba(201,169,110,0.2)'
            }} />}
                <div className={cn('pointer-events-none absolute bottom-0 left-0 right-0 z-30 px-3 py-3 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-all duration-300', isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')}>
                  <p className={cn('text-white font-semibold leading-tight truncate', isActive ? 'text-sm' : 'text-[10px]')} style={{
                fontFamily: 'Georgia, serif'
              }}>
                    {vid.label}
                  </p>
                  {isActive && <a href={vid.watchUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="pointer-events-auto inline-flex items-center gap-1 text-[#c9a96e] text-[10px] font-bold uppercase tracking-widest mt-1 hover:text-white transition-colors">
                      <span>Voir sur TikTok</span>
                      <ExternalLink size={8} />
                    </a>}
                </div>
              </motion.div>
            </div>;
      })}
      </div>

      <div className="flex justify-center gap-2 mt-4 pb-2">
        {TIKTOK_VIDEOS.map((vid, i) => <button key={`dot-${vid.id}`} type="button" onClick={() => {
        const cur = virtualIdxRef.current;
        const curReal = ((cur - N_VIDEOS) % N_VIDEOS + N_VIDEOS) % N_VIDEOS;
        const diff = ((i - curReal) % N_VIDEOS + N_VIDEOS) % N_VIDEOS;
        const nextV = diff <= N_VIDEOS / 2 ? cur + diff : cur - (N_VIDEOS - diff);
        goTo(nextV);
      }} className={cn('rounded-full transition-all duration-350 min-w-[24px] min-h-[24px] flex items-center justify-center', i === activeReal ? '' : '')} aria-label={`Vidéo ${i + 1} — ${vid.label}`}>
            <span className={cn('rounded-full transition-all duration-350 block', i === activeReal ? 'w-7 h-1.5 bg-[#c9a96e]' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/55')} />
          </button>)}
      </div>
    </div>;
};

// ─── Reviews Carousel (mobile swipeable) ─────────────────────────────────────

const ReviewsCarousel: React.FC = () => {
  const [active, setActive] = useState(0);
  const total = REVIEWS.length;
  const goTo = (i: number) => setActive((i + total) % total);
  return <div className="w-full">
      {/* Mobile: single card + swipe dots; desktop: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((r, i) => <Reveal key={r.id} delay={i * 0.06}>
            <div className="bg-white rounded-xl p-5 border border-[#e8ddd0] hover:border-[#c9a96e]/30 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1">
                  {Array.from({
                length: r.rating
              }).map((_, si) => <Star key={`s-${r.id}-${si}`} size={12} className="fill-[#c9a96e] text-[#c9a96e]" />)}
                </div>
                <span className="text-[#a08060] text-[10px] font-medium bg-[#f5ede0] px-2 py-0.5 rounded-full">
                  {r.source}
                </span>
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
                  <p className="text-[#a08060] text-xs">{r.prestation}</p>
                </div>
              </div>
            </div>
          </Reveal>)}
      </div>

      {/* Mobile: swipeable single card */}
      <div className="sm:hidden">
        <AnimatePresence mode="wait">
          <motion.div key={REVIEWS[active].id} initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -30
        }} transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1]
        }} className="bg-white rounded-xl p-5 border border-[#e8ddd0] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">
                {Array.from({
                length: REVIEWS[active].rating
              }).map((_, si) => <Star key={`ms-${REVIEWS[active].id}-${si}`} size={13} className="fill-[#c9a96e] text-[#c9a96e]" />)}
              </div>
              <span className="text-[#a08060] text-[10px] font-medium bg-[#f5ede0] px-2 py-1 rounded-full">
                {REVIEWS[active].source}
              </span>
            </div>
            <blockquote className="text-[#4a3f35] text-sm leading-relaxed mb-5 italic">
              <span>"{REVIEWS[active].comment}"</span>
            </blockquote>
            <div className="flex items-center gap-3 pt-3 border-t border-[#f0e6d8]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {REVIEWS[active].initial}
              </div>
              <div>
                <p className="text-[#1a1410] font-semibold text-sm">{REVIEWS[active].name}</p>
                <p className="text-[#a08060] text-xs">{REVIEWS[active].prestation}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-4">
          <button onClick={() => goTo(active - 1)} className="w-11 h-11 rounded-full border border-[#e8ddd0] flex items-center justify-center text-[#8b6336] hover:bg-[#f5ede0] transition-colors active:scale-90" aria-label="Avis précédent">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5">
            {REVIEWS.map((r, i) => <button key={`rv-dot-${r.id}`} onClick={() => setActive(i)} className={cn('rounded-full transition-all duration-300', i === active ? 'w-6 h-1.5 bg-[#c9a96e]' : 'w-1.5 h-1.5 bg-[#c9a96e]/25')} aria-label={`Avis ${i + 1}`} />)}
          </div>
          <button onClick={() => goTo(active + 1)} className="w-11 h-11 rounded-full border border-[#e8ddd0] flex items-center justify-center text-[#8b6336] hover:bg-[#f5ede0] transition-colors active:scale-90" aria-label="Avis suivant">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>;
};

// ─── Main Site Component ──────────────────────────────────────────────────────

interface SleekhairSiteProps {
  onNavigate: (p: SleekPage, prestationId?: string) => void;
}
export const SleekhairSite: React.FC<SleekhairSiteProps> = ({
  onNavigate
}) => {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [bgVideoIdx, setBgVideoIdx] = useState(0);
  const categories = ['all', 'Femme', 'Homme'] as const;
  const filtered = activeCat === 'all' ? PRESTATIONS_PREVIEW : PRESTATIONS_PREVIEW.filter(p => p.gender === activeCat);
  return <div className="min-h-screen w-full bg-[#0f0d0b]">
      <Navbar onNavigate={onNavigate} />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <Hero onReserve={() => onNavigate('reservation')} onPrestations={() => scrollToSection('prestations')} />

      {/* ── Mon Expertise ──────────────────────────────────────────────────── */}
      <HeroExpertise onNavigate={onNavigate} />

      <SectionDivider dark={false} />

      {/* ── Prestations ────────────────────────────────────────────────────── */}
      <section id="prestations" className="bg-[#1a1410] pt-16 pb-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Catalogue & Tarifs</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-1">
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-[1.1]" style={{
                fontFamily: 'Georgia, serif'
              }}>
                  Nos prestations <span className="text-[#c9a96e]">phares</span>
                </h2>
                <p className="text-white/35 text-xs mt-2">
                  15+ coiffures · Femme, homme, enfant · À domicile Croix-Rousse
                </p>
              </div>
              <button onClick={() => onNavigate('catalogue')} className="hidden sm:inline-flex items-center gap-2 text-[#c9a96e] text-xs font-bold uppercase tracking-widest border border-[#c9a96e]/30 hover:bg-[#c9a96e]/10 px-4 py-2.5 rounded-sm transition-all duration-200 flex-shrink-0 min-h-[44px]">
                <span>Voir tout le catalogue</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </Reveal>

          {/* Best-seller preview cards — 3 max on home */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
            {PRESTATIONS_PREVIEW.filter(p => p.isBestSeller).map((p, i) => <Reveal key={p.id} delay={i * 0.07}>
                <article className="group bg-[#231e18] border border-white/8 rounded-xl overflow-hidden hover:border-[#c9a96e]/40 hover:shadow-lg hover:shadow-[#c9a96e]/5 transition-all duration-300 flex flex-col h-full">
                  <div className="relative overflow-hidden flex-shrink-0" style={{
                aspectRatio: '4/3'
              }}>
                    <PrestationCover src={p.image} alt={p.name} dezoom={p.id === 'm10'} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231e18] via-transparent to-transparent" />
                    {p.tag && <TagBadge tag={p.tag} tagColor={p.tagColor} tagIcon={p.tagIcon} />}
                    {p.isBestSeller && <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/40 flex items-center justify-center">
                        <Star size={10} className="fill-[#c9a96e] text-[#c9a96e]" />
                      </div>}
                    <div className={cn('absolute bottom-2 right-2 text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-sm border', p.gender === 'Femme' ? 'bg-rose-950/70 text-rose-400/80 border-rose-900/40' : 'bg-sky-950/70 text-sky-400/80 border-sky-900/40')}>
                      {p.gender}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white font-bold text-base leading-snug flex-1" style={{
                    fontFamily: 'Georgia, serif'
                  }}>
                        {p.name}
                      </h3>
                    </div>
                    <p className="text-white/35 text-[11px] leading-relaxed mb-3 flex-1 line-clamp-2">{p.desc}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-white/30 text-[11px]">
                        <Clock size={10} /><span>{p.duration}</span>
                      </div>
                      <span className="text-[#c9a96e] font-bold text-lg" style={{
                    fontFamily: 'Georgia, serif'
                  }}>
                        {p.priceTo ? `${p.price}–${p.priceTo}€` : `${p.price}€`}
                      </span>
                    </div>
                    <button onClick={() => onNavigate('reservation', p.id)} className="w-full border border-[#c9a96e]/30 text-[#c9a96e] hover:border-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a1410] active:scale-95 text-[11px] font-bold tracking-widest uppercase py-3 rounded-sm transition-all duration-200 min-h-[44px]">
                      Détails & réserver
                    </button>
                  </div>
                </article>
              </Reveal>)}
          </div>

          {/* "Voir toutes les prestations" — big CTA below cards */}
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => onNavigate('catalogue')} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#231e18] border border-white/10 hover:border-[#c9a96e]/40 hover:bg-[#2a2218] active:scale-95 text-white/70 hover:text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-200 min-h-[56px]">
                <span>Voir toutes les prestations</span>
                <ArrowRight size={14} className="text-[#c9a96e]" />
              </button>
            </div>
            <p className="text-center text-white/20 text-[10px] mt-2">15+ coiffures · 5 catégories · Femme, Homme, Enfant</p>
          </Reveal>

          {/* Supplements */}
          <Reveal delay={0.25}>
            <div className="mt-8 p-5 bg-[#231e18] border border-white/8 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <p className="text-[#c9a96e] text-xs font-bold uppercase" style={{
                letterSpacing: '0.12em'
              }}>
                  Suppléments disponibles
                </p>
                <p className="text-white/30 text-xs italic">À sélectionner lors de la réservation</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUPPLEMENT_TAGS.map(s => <div key={s.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                    <span className="text-white/60 text-xs">{s.label}</span>
                    <span className="text-[#c9a96e] text-xs font-bold">{s.price}</span>
                  </div>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider dark={true} />

      {/* ── Photo Gallery ────────────────────────────────────────────────────── */}
      <section id="galerie" className="bg-[#0f0d0b] pt-16 pb-14 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Galerie Photos</span>
            </div>
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-[1.1]" style={{
                fontFamily: 'Georgia, serif'
              }}>
                  Mes réalisations <span className="text-[#c9a96e]">en images</span>
                </h2>
                <p className="text-white/40 text-xs mt-1.5 max-w-xs leading-relaxed">
                  Vraies clientes, vrais résultats.
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-white/30 text-xs flex-shrink-0">
                <Image size={11} />
                <span>{GALLERY_PHOTOS.length} photos</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PhotoCarousel />
          </Reveal>
        </div>
      </section>

      {/* ── Galerie TikTok ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#060504]" style={{
      minHeight: '680px'
    }}>
        {/* Blurred background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div key={`bg-${TIKTOK_VIDEOS[bgVideoIdx].id}`} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 1.4,
            ease: 'easeInOut'
          }} className="absolute inset-0">
              <img src={TIKTOK_VIDEOS[bgVideoIdx].thumb} alt="" aria-hidden="true" className="w-full h-full object-cover" style={{
              transform: 'scale(1.15)',
              filter: 'blur(65px) saturate(1.8) brightness(0.15)'
            }} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060504] via-[#060504]/25 to-[#060504]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060504]/60 via-transparent to-[#060504]/60" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/22 to-transparent" />
        </div>

        {/* Section header */}
        <div className="relative z-10 pt-16 pb-5 px-5 md:px-12 max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Galerie TikTok</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-[1.1]" style={{
                fontFamily: 'Georgia, serif'
              }}>
                  Mes réalisations <span className="text-[#c9a96e]">en vidéo</span>
                </h2>
                <p className="text-white/40 text-xs mt-1.5 max-w-xs leading-relaxed">
                  <span>Braids, nattes, fulanis — vraies clientes. </span>
                  <strong className="text-white/55">+{TIKTOK_VIDEOS.length} vidéos sur TikTok</strong>
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/8 hover:bg-white/14 active:scale-95 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg transition-all duration-200 border border-white/12 min-h-[44px]">
                  {TIKTOK_ICON}
                  <span className="hidden sm:inline">@_sleekhair</span>
                </a>
                <a href="https://www.instagram.com/_sleekhairfr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 min-h-[44px]">
                  <Instagram size={13} />
                  <span className="hidden sm:inline">@_sleekhairfr</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Active video label */}
        <div className="relative z-10 px-5 md:px-12 max-w-7xl mx-auto mb-4">
          <AnimatePresence mode="wait">
            <motion.div key={`info-${TIKTOK_VIDEOS[bgVideoIdx].id}`} initial={{
            opacity: 0,
            y: 6
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -5
          }} transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }} className="flex items-center gap-3">
              <div className="w-1 h-7 rounded-full bg-[#c9a96e]" />
              <div>
                <p className="text-white font-bold text-base leading-none" style={{
                fontFamily: 'Georgia, serif'
              }}>
                  {TIKTOK_VIDEOS[bgVideoIdx].label}
                </p>
                <p className="text-white/40 text-xs mt-0.5">{TIKTOK_VIDEOS[bgVideoIdx].sublabel}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel */}
        <div className="relative z-10 pb-6">
          <VideoCarousel onActiveChange={setBgVideoIdx} />
        </div>

        {/* CTA */}
        <div className="relative z-10 pb-14 flex justify-center px-5">
          <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white/6 hover:bg-white/12 active:scale-95 text-white/80 hover:text-white text-xs font-bold uppercase px-8 py-3.5 rounded-sm border border-white/12 hover:border-[#c9a96e]/40 transition-all duration-200 backdrop-blur-sm shadow-xl min-h-[48px]" style={{
          letterSpacing: '0.12em'
        }}>
            {TIKTOK_ICON}
            <span>Voir toutes les vidéos sur TikTok</span>
            <ExternalLink size={11} className="opacity-60" />
          </a>
        </div>
      </section>

      <SectionDivider dark={true} />

      {/* ── Reviews ─────────────────────────────────────────────────────────── */}
      <section id="avis" className="bg-[#f5ede0] pt-16 pb-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Avis Clientes & Clients</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold leading-[1.1]" style={{
                fontFamily: 'Georgia, serif'
              }}>
                  Ce qu'ils disent de <span className="text-[#8b6336]">Sleekhair</span>
                </h2>
                <p className="text-[#8b7a68] text-sm mt-2 max-w-md leading-relaxed">
                  500+ clientes et clients satisfaits
                </p>
              </div>
              {/* Rating badge — prominent */}
              <div className="flex items-center gap-3 bg-white border border-[#e8ddd0] rounded-xl px-4 py-3 flex-shrink-0 shadow-sm self-start sm:self-auto">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(n => <Star key={`hero-star-${n}`} size={14} className="fill-[#c9a96e] text-[#c9a96e]" />)}
                </div>
                <div>
                  <p className="text-[#1a1410] font-bold text-sm leading-none">4.9 / 5</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[#a08060] text-[10px] font-medium underline cursor-pointer">Google</span>
                    <span className="text-[#e8ddd0]">·</span>
                    <span className="text-[#a08060] text-[10px] font-medium underline cursor-pointer">Planity</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <ReviewsCarousel />
        </div>
      </section>

      <SectionDivider dark={false} />

      {/* ── Comment ça marche ───────────────────────────────────────────────── */}
      <section className="bg-[#1a1410] pt-16 pb-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Comment ça marche</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 leading-[1.1]" style={{
            fontFamily: 'Georgia, serif'
          }}>
              Réservez en <span className="text-[#c9a96e]">2 minutes</span>
            </h2>
            <p className="text-white/45 text-sm max-w-sm leading-relaxed mb-12">
              Prestation, créneau, confirmation — c'est tout.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {HOW_STEPS.map((s, i) => <Reveal key={s.id} delay={i * 0.1}>
                <div className="flex flex-col items-start">
                  <div className="relative mb-5">
                    {/* Big accent number */}
                    <span className="text-[#c9a96e]/10 text-7xl font-black leading-none select-none" style={{
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1
                }}>
                      {s.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#231e18] border border-[#c9a96e]/25 flex items-center justify-center" style={{
                  marginTop: '-2.5rem'
                }}>
                      <s.icon size={20} className="text-[#c9a96e]" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-base mb-1.5" style={{
                fontFamily: 'Georgia, serif'
              }}>
                    {s.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>)}
          </div>
          <Reveal delay={0.3}>
            <button onClick={() => onNavigate('reservation')} className="inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#b8943e] active:scale-95 text-[#0f0d0b] text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 shadow-lg hover:-translate-y-0.5 min-h-[52px] w-full sm:w-auto justify-center sm:justify-start">
              <span>Commencer la réservation</span>
              <ArrowRight size={15} />
            </button>
          </Reveal>
        </div>
      </section>

      <SectionDivider dark={true} />

      {/* ── Contact / Localisation ──────────────────────────────────────────── */}
      <section id="contact" className="bg-[#faf8f5] pt-16 pb-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-[#c9a96e]" />
                <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Localisation & Contact</span>
              </div>
              <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold mb-3 leading-[1.1]" style={{
              fontFamily: 'Georgia, serif'
            }}>
                Sleekhair,<br />
                <span className="text-[#8b6336]">Croix-Rousse, Lyon</span>
              </h2>
              <p className="text-[#6b5a48] text-sm leading-relaxed mb-1 max-w-sm">
                <strong className="text-[#1a1410]">Chez moi</strong>
                <span> à la Croix-Rousse (Lyon 4e). À 2 min du métro C.</span>
              </p>
              <p className="text-[#a08060] text-xs mb-8 max-w-sm">
                Adresse précise envoyée par email après confirmation.
              </p>

              {/* Action buttons — prominent call & whatsapp */}
              <div className="flex flex-col gap-3 mb-8">
                <a href="tel:+33612345678" className="flex items-center gap-3 bg-[#1a1410] hover:bg-[#231e18] active:scale-95 text-white font-bold text-sm px-5 py-4 rounded-xl transition-all duration-200 min-h-[56px]">
                  <div className="w-9 h-9 rounded-lg bg-[#c9a96e]/15 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">Appeler</p>
                    <p className="text-white/45 text-xs mt-0.5">+33 6 12 34 56 78</p>
                  </div>
                </a>
                <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] active:scale-95 text-white font-bold text-sm px-5 py-4 rounded-xl transition-all duration-200 min-h-[56px]">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">WhatsApp</p>
                    <p className="text-white/70 text-xs mt-0.5">Message rapide</p>
                  </div>
                </a>
                <a href="https://maps.google.com/?q=Croix-Rousse+Lyon+4e" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-white border border-[#e8ddd0] hover:border-[#c9a96e]/40 active:scale-95 text-[#1a1410] font-bold text-sm px-5 py-4 rounded-xl transition-all duration-200 min-h-[56px]">
                  <div className="w-9 h-9 rounded-lg bg-[#f5ede0] flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#8b6336]" />
                  </div>
                  <div>
                    <p className="text-[#1a1410] font-bold text-sm leading-none">Ouvrir dans Maps</p>
                    <p className="text-[#8b7a68] text-xs mt-0.5">Croix-Rousse, Lyon 4e</p>
                  </div>
                  <ExternalLink size={12} className="text-[#a08060] ml-auto" />
                </a>
              </div>

              {/* Secondary contact details */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2.5">
                  <Mail size={13} className="text-[#8b6336] flex-shrink-0" />
                  <a href="mailto:contact@sleekhair.fr" className="text-[#7a6a58] text-sm hover:text-[#8b6336] hover:underline">contact@sleekhair.fr</a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={13} className="text-[#8b6336] flex-shrink-0 mt-0.5" />
                  <p className="text-[#7a6a58] text-sm whitespace-pre-line">Lun–Ven : 9h–19h · Sam : 9h–18h</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a href="https://www.instagram.com/_sleekhairfr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 min-h-[44px]">
                  <Instagram size={14} /><span>@_sleekhairfr</span>
                </a>
                <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0f0d0b] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg hover:bg-[#1a1410] active:scale-95 transition-all duration-200 border border-[#3a3530] min-h-[44px]">
                  {TIKTOK_ICON}<span>@_sleekhair</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-[#e8ddd0] rounded-2xl overflow-hidden relative h-[340px] lg:h-[420px] shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ddd0c0] to-[#c8b89a]">
                  <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(#8b6336 1px, transparent 1px), linear-gradient(90deg, #8b6336 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#f5ede0]/60" style={{
                  transform: 'translateY(-50%)'
                }} />
                  <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-[#f5ede0]/60" style={{
                  transform: 'translateX(-50%)'
                }} />
                </div>
                <div className="absolute top-1/2 left-1/2 z-10" style={{
                transform: 'translate(-50%, -100%)'
              }}>
                  <div className="flex flex-col items-center">
                    <div className="bg-[#c9a96e] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg mb-1 whitespace-nowrap">
                      Sleekhair — Croix-Rousse
                    </div>
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
                      <p className="text-[#1a1410] font-semibold text-xs">Accès facile · Lyon 4e</p>
                      <p className="text-[#7a6a58] text-[11px]">Métro C — Croix-Rousse · 2 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider dark={false} />

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1410] py-16 px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em]">Croix-Rousse · Lyon</span>
              <div className="h-px w-8 bg-[#c9a96e]" />
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 leading-[1.1]" style={{
            fontFamily: 'Georgia, serif'
          }}>
              Prêt(e) pour votre<br /><span className="text-[#c9a96e]">prochaine coiffure ?</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-sm mx-auto">
              Disponibilités en temps réel, confirmation immédiate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => onNavigate('reservation')} className="inline-flex items-center justify-center gap-3 bg-[#c9a96e] hover:bg-[#b8943e] active:scale-95 text-[#0f0d0b] text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-sm transition-all duration-200 shadow-lg hover:-translate-y-0.5 min-h-[52px] w-full sm:w-auto">
                <span>Prendre rendez-vous</span>
                <ArrowRight size={15} />
              </button>
              <button onClick={() => onNavigate('membre')} className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#c9a96e]/50 text-white/60 hover:text-[#c9a96e] active:scale-95 text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 min-h-[52px] w-full sm:w-auto">
                <User size={14} /><span>Mon espace membre</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f0d0b] text-white/50 pt-14 pb-8 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center">
                  <Scissors size={12} className="text-white" />
                </div>
                <span className="text-white font-bold text-base" style={{
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.12em'
              }}>
                  Sleekhair
                </span>
              </div>
              <p className="text-white/35 text-xs leading-relaxed mb-5">
                Coiffure afro premium à mon domicile, Croix-Rousse Lyon 4e. Femmes, hommes, enfants.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <a href="https://www.instagram.com/_sleekhairfr/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#c9a96e]/20 border border-white/8 flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                  <Instagram size={13} className="text-white/50" />
                </a>
                <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#c9a96e]/20 border border-white/8 flex items-center justify-center transition-all duration-200" aria-label="TikTok">
                  <span className="text-white/50">{TIKTOK_ICON}</span>
                </a>
                <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#25D366]/20 border border-white/8 flex items-center justify-center transition-all duration-200" aria-label="WhatsApp">
                  <MessageCircle size={13} className="text-white/50" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-4">Navigation</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.map(link => <li key={link.id}>
                    <button onClick={() => scrollToSection(link.anchor)} className="text-white/40 hover:text-[#c9a96e] text-xs transition-colors duration-200 py-0.5">
                      {link.label}
                    </button>
                  </li>)}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-[#c9a96e] mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs">
                    Croix-Rousse, Lyon 4e<br />Métro C — Croix-Rousse
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-[#c9a96e] flex-shrink-0" />
                  <a href="tel:+33612345678" className="text-white/40 hover:text-[#c9a96e] text-xs transition-colors duration-200">
                    +33 6 12 34 56 78
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-[#c9a96e] flex-shrink-0" />
                  <a href="mailto:contact@sleekhair.fr" className="text-white/40 hover:text-[#c9a96e] text-xs transition-colors duration-200">
                    contact@sleekhair.fr
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={12} className="text-[#c9a96e] mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs">Lun–Ven : 9h–19h<br />Sam : 9h–18h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-[11px]">© 2025 Sleekhair. Tous droits réservés. Lyon, France.</p>
            <div className="flex items-center gap-5">
              <button onClick={() => onNavigate('admin')} className="text-white/10 hover:text-white/30 text-[10px] transition-colors duration-200 min-h-[44px] flex items-center">
                Admin
              </button>
              <button onClick={() => onNavigate('membre')} className="text-white/10 hover:text-white/30 text-[10px] transition-colors duration-200 min-h-[44px] flex items-center">
                Mon espace
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};