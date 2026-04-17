import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, ArrowLeft, ArrowRight, Clock, Star, Flame, TrendingUp, Crown, ChevronDown, Search, X, User, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PRESTATION_MEDIA } from '../../lib/prestationMedia';
import { PrestationCover } from '../../lib/PrestationCover';
import { SleekPage } from './SleekhairHome';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Prestation {
  id: string;
  name: string;
  price: number;
  priceTo: number | null;
  duration: string;
  image: string;
  tag: string | null;
  tagIcon: string | null;
  tagColor: string;
  gender: 'Femme' | 'Homme' | 'Enfant';
  desc: string;
  isBestSeller: boolean;
  category: 'braids' | 'locks' | 'enfants' | 'homme';
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_PRESTATIONS: Prestation[] = [{
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
  isBestSeller: true,
  category: 'braids'
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
  isBestSeller: true,
  category: 'braids'
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
  isBestSeller: false,
  category: 'braids'
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
  isBestSeller: false,
  category: 'braids'
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
  desc: 'Island twists : twists avec finition loose, volume et mouvement.',
  isBestSeller: false,
  category: 'braids'
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
  isBestSeller: false,
  category: 'braids'
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
  desc: 'Queue de cheval sleek : ligne nette, finition lisse ou structurée.',
  isBestSeller: false,
  category: 'braids'
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
  isBestSeller: false,
  category: 'locks'
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
  gender: 'Enfant',
  desc: 'Pour les petites (4–10 ans). Technique douce, cadre bienveillant.',
  isBestSeller: false,
  category: 'enfants'
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
  isBestSeller: true,
  category: 'homme'
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
  desc: 'Twists plaqués. Lignes nettes ; le niveau (simple ou modèle) se choisit lors de la réservation.',
  isBestSeller: false,
  category: 'homme'
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
  isBestSeller: false,
  category: 'homme'
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
  isBestSeller: false,
  category: 'homme'
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
  desc: 'Vanilles tressées — tenue propre et durable.',
  isBestSeller: false,
  category: 'homme'
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
  desc: 'Combinaison barrel twists et lignes fulani. Modèle au choix à la réservation.',
  isBestSeller: false,
  category: 'homme'
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
  isBestSeller: false,
  category: 'locks'
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
  isBestSeller: false,
  category: 'locks'
}];
interface CategoryGroup {
  id: string;
  key: 'bestsellers' | 'braids' | 'locks' | 'enfants' | 'homme';
  label: string;
  emoji: string;
  desc: string;
}
const CATEGORY_GROUPS: CategoryGroup[] = [{
  id: 'cg1',
  key: 'bestsellers',
  label: 'Best-sellers',
  emoji: '✦',
  desc: 'Les plus demandées'
}, {
  id: 'cg2',
  key: 'braids',
  label: 'Tresses & Braids',
  emoji: '◆',
  desc: 'Knotless, Boho, Fulanis…'
}, {
  id: 'cg3',
  key: 'locks',
  label: 'Locks & Retwist',
  emoji: '◈',
  desc: 'Départ, entretien, butterfly'
}, {
  id: 'cg4',
  key: 'enfants',
  label: 'Coiffures Enfants',
  emoji: '✿',
  desc: 'Douceur et bienveillance'
}, {
  id: 'cg5',
  key: 'homme',
  label: 'Homme',
  emoji: '◉',
  desc: 'Cornrows, twists, locks'
}];
const GENDER_FILTERS = [{
  id: 'gf-all',
  value: 'all',
  label: 'Toutes'
}, {
  id: 'gf-f',
  value: 'Femme',
  label: 'Femme'
}, {
  id: 'gf-h',
  value: 'Homme',
  label: 'Homme'
}, {
  id: 'gf-e',
  value: 'Enfant',
  label: 'Enfant'
}];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGroupItems(groupKey: CategoryGroup['key'], allItems: Prestation[]): Prestation[] {
  if (groupKey === 'bestsellers') return allItems.filter(p => p.isBestSeller);
  return allItems.filter(p => p.category === groupKey);
}

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
  const iconEl = tagIcon === 'flame' ? <Flame size={8} className="flex-shrink-0" /> : tagIcon === 'trending' ? <TrendingUp size={8} className="flex-shrink-0" /> : tagIcon === 'crown' ? <Crown size={8} className="flex-shrink-0" /> : null;
  return <div className={cn('absolute top-2 left-2 flex items-center gap-1 text-[8px] font-bold uppercase px-2 py-0.5 rounded-full shadow-md z-10', tagColor)} style={{
    letterSpacing: '0.08em'
  }}>
      {iconEl}
      <span>{tag}</span>
    </div>;
};

// ─── Compact Prestation Card ───────────────────────────────────────────────────

const CompactCard: React.FC<{
  p: Prestation;
  onReserve: (id: string) => void;
}> = ({
  p,
  onReserve
}) => <article className="group bg-[#231e18] border border-white/8 rounded-xl overflow-hidden hover:border-[#c9a96e]/40 transition-all duration-300 flex flex-col">
    {/* Image — 4:3 ratio, smaller */}
    <div className="relative overflow-hidden flex-shrink-0" style={{
    aspectRatio: '4/3'
  }}>
      <PrestationCover src={p.image} alt={p.name} dezoom={p.id === 'm10'} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/80 via-transparent to-transparent" />
      {p.tag && <TagBadge tag={p.tag} tagColor={p.tagColor} tagIcon={p.tagIcon} />}
    </div>

    {/* Content — tight layout */}
    <div className="p-3 flex flex-col gap-2 flex-1">
      {/* Title + gender badge — one line */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-bold text-sm leading-tight flex-1" style={{
        fontFamily: 'Georgia, serif'
      }}>
          {p.name}
        </h3>
        <span className={cn('flex-shrink-0 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm border mt-0.5', p.gender === 'Femme' ? 'bg-rose-950/70 text-rose-400/80 border-rose-900/40' : p.gender === 'Enfant' ? 'bg-emerald-950/70 text-emerald-400/80 border-emerald-900/40' : 'bg-sky-950/70 text-sky-400/80 border-sky-900/40')}>
          {p.gender}
        </span>
      </div>

      {/* Desc — max 2 lines */}
      <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2 flex-1">{p.desc}</p>

      {/* Duration · Price — single line */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-white/30 text-[10px]">
          <Clock size={9} />
          <span>{p.duration}</span>
        </div>
        <span className="text-[#c9a96e] font-bold text-base leading-none" style={{
        fontFamily: 'Georgia, serif'
      }}>
          {p.priceTo ? `${p.price}–${p.priceTo}€` : `${p.price}€`}
        </span>
      </div>

      {/* CTA */}
      <button onClick={() => onReserve(p.id)} className="w-full border border-[#c9a96e]/30 hover:bg-[#c9a96e] hover:border-[#c9a96e] text-[#c9a96e] hover:text-[#1a1410] active:scale-95 text-[10px] font-bold tracking-widest uppercase py-2.5 rounded-sm transition-all duration-200 min-h-[40px]">
        Détails &amp; réserver
      </button>
    </div>
  </article>;

// ─── Collapsible Category Section ─────────────────────────────────────────────

const CategorySection: React.FC<{
  group: CategoryGroup;
  items: Prestation[];
  onReserve: (id: string) => void;
  defaultExpanded?: boolean;
}> = ({
  group,
  items,
  onReserve,
  defaultExpanded = false
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const PREVIEW_COUNT = 3;
  const [showAll, setShowAll] = useState(false);
  const visibleItems = expanded ? showAll ? items : items.slice(0, PREVIEW_COUNT) : [];
  const hiddenCount = items.length - PREVIEW_COUNT;
  if (items.length === 0) return null;
  return <div className="border border-white/8 rounded-2xl overflow-hidden">
      {/* Section header — tap to toggle */}
      <button onClick={() => setExpanded(v => !v)} className="w-full flex items-center justify-between px-4 py-4 bg-[#1e1914] hover:bg-[#231e18] active:bg-[#231e18] transition-colors duration-200 min-h-[60px]" aria-expanded={expanded}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#c9a96e] text-xs font-bold">{group.emoji}</span>
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-sm leading-none" style={{
            fontFamily: 'Georgia, serif'
          }}>
              {group.label}
            </p>
            <p className="text-white/35 text-[10px] mt-0.5">{group.desc} · <span className="text-[#c9a96e]/70">{items.length} prestations</span></p>
          </div>
        </div>
        <motion.div animate={{
        rotate: expanded ? 180 : 0
      }} transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1]
      }} className="text-white/30 flex-shrink-0 ml-2">
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Animated content */}
      <AnimatePresence initial={false}>
        {expanded && <motion.div key="content" initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1]
      }} style={{
        overflow: 'hidden'
      }}>
            <div className="px-3 pt-3 pb-4 bg-[#1a1410]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visibleItems.map(p => <CompactCard key={p.id} p={p} onReserve={onReserve} />)}
              </div>

              {/* Show more / less */}
              {items.length > PREVIEW_COUNT && <div className="mt-3 text-center">
                  <button onClick={() => setShowAll(v => !v)} className="inline-flex items-center gap-2 text-[#c9a96e] text-xs font-bold uppercase tracking-widest py-2 px-4 border border-[#c9a96e]/20 hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/8 rounded-sm transition-all duration-200 min-h-[40px]">
                    {showAll ? <span>Voir moins</span> : <span>Voir {hiddenCount} autre{hiddenCount > 1 ? 's' : ''} dans {group.label}</span>}
                    <motion.div animate={{
                rotate: showAll ? 180 : 0
              }} transition={{
                duration: 0.25
              }}>
                      <ChevronDown size={12} />
                    </motion.div>
                  </button>
                </div>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── Main Catalogue Component ─────────────────────────────────────────────────

interface SleekhairCatalogueProps {
  onNavigate: (p: SleekPage, prestationId?: string) => void;
}
export const SleekhairCatalogue: React.FC<SleekhairCatalogueProps> = ({
  onNavigate
}) => {
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Show sticky CTA after scroll
  useEffect(() => {
    const fn = () => setStickyVisible(window.scrollY > 200);
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Filter prestations
  const filteredPrestations = useMemo(() => {
    let items = ALL_PRESTATIONS;
    if (genderFilter !== 'all') items = items.filter(p => p.gender === genderFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }
    return items;
  }, [genderFilter, searchQuery]);
  const totalCount = filteredPrestations.length;
  return <div className="min-h-screen w-full bg-[#0f0d0b]">

      {/* ── Sticky Header ─────────────────────────────────────────────────── */}
      <div ref={headerRef} className="sticky top-0 z-40 bg-[#0f0d0b]/97 backdrop-blur-md border-b border-white/6">
        {/* Top bar: back + title + account */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 max-w-3xl mx-auto">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-white/60 hover:text-white active:scale-95 transition-all duration-200 min-h-[44px] min-w-[44px]" aria-label="Retour à l'accueil">
            <ArrowLeft size={18} />
            <span className="text-xs font-medium hidden sm:inline">Accueil</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center">
              <Scissors size={11} className="text-white" />
            </div>
            <h1 className="text-white font-bold text-sm tracking-wide" style={{
            fontFamily: 'Georgia, serif'
          }}>
              Prestations <span className="text-[#c9a96e]">Sleekhair</span>
            </h1>
          </div>

          <button onClick={() => onNavigate('membre')} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/40 hover:text-white transition-all duration-200 min-h-[44px] min-w-[44px]" aria-label="Mon compte">
            <User size={15} />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 pb-3 max-w-3xl mx-auto">
          <div className={cn('flex items-center gap-3 bg-[#1a1410] border rounded-xl px-3 py-2.5 transition-all duration-200', searchFocused ? 'border-[#c9a96e]/50' : 'border-white/10')}>
            <Search size={14} className={cn('flex-shrink-0 transition-colors', searchFocused ? 'text-[#c9a96e]' : 'text-white/25')} />
            <input ref={searchRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} placeholder="Rechercher une coiffure…" className="flex-1 bg-transparent text-white/80 text-xs placeholder:text-white/20 outline-none min-h-[32px]" aria-label="Rechercher une coiffure" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="text-white/30 hover:text-white transition-colors" aria-label="Effacer la recherche">
                <X size={13} />
              </button>}
          </div>
        </div>

        {/* Gender filter pills — horizontally scrollable */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto max-w-3xl mx-auto" style={{
        scrollbarWidth: 'none'
      }}>
          {GENDER_FILTERS.map(f => <button key={f.id} onClick={() => setGenderFilter(f.value)} className={cn('flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-200 min-h-[36px]', genderFilter === f.value ? 'bg-[#c9a96e] text-[#0f0d0b] border-[#c9a96e] shadow-md' : 'bg-transparent border-white/12 text-white/40 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]')}>
              {f.label}
            </button>)}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 pt-5 pb-36">

        {/* Context micro-text */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/30 text-xs">
            {searchQuery ? <span><strong className="text-white/55">{totalCount}</strong> résultat{totalCount !== 1 ? 's' : ''} pour "{searchQuery}"</span> : <span>
                  <strong className="text-white/55">{totalCount}</strong> prestation{totalCount !== 1 ? 's' : ''} · Femme, homme, enfant
                </span>}
          </p>
          <div className="flex items-center gap-1 text-white/20 text-[10px]">
            <Star size={9} className="fill-[#c9a96e]/30 text-[#c9a96e]/30" />
            <span>4.9 Google</span>
          </div>
        </div>

        {/* Search results — flat list */}
        {searchQuery ? <div>
            {filteredPrestations.length === 0 ? <div className="text-center py-20">
                <p className="text-white/25 text-sm">Aucune coiffure trouvée</p>
                <button onClick={() => setSearchQuery('')} className="mt-4 text-[#c9a96e] text-xs underline">
                  Effacer la recherche
                </button>
              </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredPrestations.map(p => <CompactCard key={p.id} p={p} onReserve={id => onNavigate('reservation', id)} />)}
              </div>}
          </div> : (/* Category groups — collapsible */
      <div className="flex flex-col gap-3">
            {CATEGORY_GROUPS.map((group, idx) => {
          const items = getGroupItems(group.key, filteredPrestations);
          return <CategorySection key={group.id} group={group} items={items} onReserve={id => onNavigate('reservation', id)} defaultExpanded={idx === 0} />;
        })}

            {/* Supplements info */}
            <div className="mt-2 p-4 bg-[#1a1410] border border-white/8 rounded-xl">
              <p className="text-[#c9a96e] text-xs font-bold uppercase mb-3" style={{
            letterSpacing: '0.12em'
          }}>
                Suppléments disponibles
              </p>
              <div className="flex flex-wrap gap-2">
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
            }].map(s => <div key={s.label} className="flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-full px-3 py-1.5">
                    <span className="text-white/50 text-[11px]">{s.label}</span>
                    <span className="text-[#c9a96e] text-[11px] font-bold">{s.price}</span>
                  </div>)}
              </div>
              <p className="text-white/20 text-[10px] mt-3 italic">À sélectionner lors de la réservation</p>
            </div>
          </div>)}
      </main>

      {/* ── Sticky CTA — mobile only ─────────────────────────────────────── */}
      <AnimatePresence>
        {stickyVisible && <motion.div key="sticky-cta" initial={{
        y: 100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} exit={{
        y: 100,
        opacity: 0
      }} transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }} className="sm:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe" style={{
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))'
      }}>
            <div className="bg-[#0f0d0b]/95 backdrop-blur-md border-t border-white/8 pt-3 pb-1 -mx-4 px-4">
              <button onClick={() => onNavigate('reservation')} className="w-full flex items-center justify-center gap-3 bg-[#c9a96e] hover:bg-[#b8943e] active:scale-95 text-[#0f0d0b] text-sm font-bold tracking-widest uppercase py-4 rounded-xl transition-all duration-200 shadow-xl min-h-[54px]">
                <Calendar size={16} />
                <span>Commencer la réservation</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};