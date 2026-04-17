import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Clock, User, Users, Calendar, Phone, Mail, AlertCircle, CheckCircle2, X, Scissors, ArrowRight, MapPin, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Prestation {
  id: string;
  name: string;
  category: string;
  gender: 'Femme' | 'Homme' | 'Unisexe';
  image: string;
  priceFrom: number;
  priceTo?: number;
  variants?: PrestationVariant[];
  duration: string;
  tag: string | null;
}
interface PrestationVariant {
  label: string;
  price: number;
}
interface BookingState {
  prestation: Prestation | null;
  variant: PrestationVariant | null;
  supplements: string[];
  date: Date | null;
  slot: string | null;
  prenom: string;
  nom: string;
  tel: string;
  email: string;
  comment: string;
  notifSms: boolean;
  notifEmail: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUPPLEMENTS_LIST: PrestationVariant[] = [{
  label: 'Brushing',
  price: 10
}, {
  label: 'Boucles',
  price: 5
}, {
  label: 'Ajout de perles',
  price: 5
}, {
  label: 'Mélange de couleurs',
  price: 10
}, {
  label: 'Fourniture de mèches',
  price: 20
}];
const PRESTATIONS: Prestation[] = [
// ── Femmes ────────────────────────────────────────────────────────────
{
  id: 'f01',
  name: 'Knotless Braids',
  category: 'Braids',
  gender: 'Femme',
  tag: 'Tendance',
  priceFrom: 40,
  priceTo: 70,
  duration: '3h–8h',
  image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=80',
  variants: [{
    label: 'Courte (épaule)',
    price: 40
  }, {
    label: 'Mi-longue (milieu du dos)',
    price: 50
  }, {
    label: 'Longue (bas du dos)',
    price: 60
  }, {
    label: 'Extra longue',
    price: 70
  }]
}, {
  id: 'f02',
  name: 'Boho Braids',
  category: 'Braids',
  gender: 'Femme',
  tag: 'Populaire',
  priceFrom: 50,
  priceTo: 80,
  duration: '4h–9h',
  image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=500&q=80',
  variants: [{
    label: 'Courte',
    price: 50
  }, {
    label: 'Mi-longue',
    price: 60
  }, {
    label: 'Longue',
    price: 70
  }, {
    label: 'Extra longue',
    price: 80
  }]
}, {
  id: 'f03',
  name: 'Twists',
  category: 'Twists',
  gender: 'Femme',
  tag: null,
  priceFrom: 40,
  priceTo: 70,
  duration: '2h–6h',
  image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&q=80',
  variants: [{
    label: 'Courts',
    price: 40
  }, {
    label: 'Mi-longs',
    price: 50
  }, {
    label: 'Longs',
    price: 60
  }, {
    label: 'Extra longs',
    price: 70
  }]
}, {
  id: 'f04',
  name: 'Island Twists',
  category: 'Twists',
  gender: 'Femme',
  tag: null,
  priceFrom: 50,
  priceTo: 80,
  duration: '3h–7h',
  image: 'https://images.unsplash.com/photo-1553514029-1318c9127859?w=500&q=80',
  variants: [{
    label: 'Courts',
    price: 50
  }, {
    label: 'Mi-longs',
    price: 60
  }, {
    label: 'Longs',
    price: 70
  }, {
    label: 'Extra longs',
    price: 80
  }]
}, {
  id: 'f05',
  name: 'Fulani Braids / Twists',
  category: 'Braids',
  gender: 'Femme',
  tag: null,
  priceFrom: 50,
  priceTo: 80,
  duration: '3h–6h',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  variants: [{
    label: 'Courts',
    price: 50
  }, {
    label: 'Mi-longs',
    price: 60
  }, {
    label: 'Longs',
    price: 70
  }, {
    label: 'Extra longs',
    price: 80
  }]
}, {
  id: 'f06',
  name: 'Butterfly Locks',
  category: 'Locks',
  gender: 'Femme',
  tag: null,
  priceFrom: 40,
  priceTo: 70,
  duration: '3h–7h',
  image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&q=80',
  variants: [{
    label: 'Courts',
    price: 40
  }, {
    label: 'Mi-longs',
    price: 50
  }, {
    label: 'Longs',
    price: 60
  }, {
    label: 'Extra longs',
    price: 70
  }]
}, {
  id: 'f07',
  name: 'Invisible Locks',
  category: 'Locks',
  gender: 'Femme',
  tag: null,
  priceFrom: 40,
  priceTo: 70,
  duration: '3h–7h',
  image: 'https://images.unsplash.com/photo-1605980625600-88d6716a5b2c?w=500&q=80',
  variants: [{
    label: 'Courts',
    price: 40
  }, {
    label: 'Mi-longs',
    price: 50
  }, {
    label: 'Longs',
    price: 60
  }, {
    label: 'Extra longs',
    price: 70
  }]
}, {
  id: 'f08',
  name: 'Nattes',
  category: 'Nattes',
  gender: 'Femme',
  tag: null,
  priceFrom: 40,
  priceTo: 60,
  duration: '1h30–4h',
  image: 'https://images.unsplash.com/photo-1599948128020-9a44c7eb5b9c?w=500&q=80',
  variants: [{
    label: 'Nattes simples (0 à 6 nattes)',
    price: 40
  }, {
    label: 'Nattes freestyle simples',
    price: 50
  }, {
    label: 'Nattes freestyle compliquées',
    price: 60
  }]
}, {
  id: 'f09',
  name: 'Tissages / Demi-tête',
  category: 'Tissages',
  gender: 'Femme',
  tag: null,
  priceFrom: 50,
  priceTo: 60,
  duration: '2h–4h',
  image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&q=80',
  variants: [{
    label: 'Tissage ouvert',
    price: 50
  }, {
    label: 'Tissage flip over',
    price: 50
  }, {
    label: 'Tissage demi-tête (half-down / down)',
    price: 60
  }, {
    label: 'Tissage closure',
    price: 60
  }]
}, {
  id: 'f10',
  name: 'Ponytail',
  category: 'Nattes',
  gender: 'Femme',
  tag: null,
  priceFrom: 40,
  priceTo: 50,
  duration: '1h–2h',
  image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=500&q=80',
  variants: [{
    label: 'Ponytail simple (queue de cheval / chignon)',
    price: 40
  }, {
    label: 'Ponytail sophistiqué (frange / raie côté)',
    price: 50
  }]
}, {
  id: 'f11',
  name: 'Coiffure Enfants (4–10 ans)',
  category: 'Enfants',
  gender: 'Femme',
  tag: null,
  priceFrom: 30,
  priceTo: 40,
  duration: '1h–2h',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  variants: [{
    label: 'Coiffure simple',
    price: 30
  }, {
    label: 'Coiffure compliquée',
    price: 40
  }]
},
// ── Hommes ────────────────────────────────────────────────────────────
{
  id: 'm01',
  name: 'Tresses / Vanilles',
  category: 'Tresses',
  gender: 'Homme',
  tag: null,
  priceFrom: 40,
  duration: '1h30–3h',
  image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=500&q=80',
  variants: [{
    label: 'Tresses',
    price: 40
  }, {
    label: 'Vanilles',
    price: 40
  }]
}, {
  id: 'm02',
  name: 'Nattes Collées',
  category: 'Nattes Collées',
  gender: 'Homme',
  tag: 'Populaire',
  priceFrom: 40,
  priceTo: 50,
  duration: '1h30–3h',
  image: 'https://images.unsplash.com/photo-1599948128020-9a44c7eb5b9c?w=500&q=80',
  variants: [{
    label: 'Modèle simple',
    price: 40
  }, {
    label: 'Modèle sophistiqué (plus de 6 nattes)',
    price: 50
  }]
}, {
  id: 'm03',
  name: 'Flat Twists',
  category: 'Twists',
  gender: 'Homme',
  tag: null,
  priceFrom: 50,
  priceTo: 60,
  duration: '2h–4h',
  image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&q=80',
  variants: [{
    label: 'Modèle simple',
    price: 50
  }, {
    label: 'Modèle sophistiqué',
    price: 60
  }]
}, {
  id: 'm04',
  name: 'Barrel Twist',
  category: 'Twists',
  gender: 'Homme',
  tag: null,
  priceFrom: 60,
  priceTo: 80,
  duration: '2h30–5h',
  image: 'https://images.unsplash.com/photo-1553514029-1318c9127859?w=500&q=80',
  variants: [{
    label: 'Modèle simple',
    price: 60
  }, {
    label: 'Modèle sophistiqué',
    price: 70
  }, {
    label: 'Modèle extrême (traçage en triangle)',
    price: 80
  }]
}, {
  id: 'm05',
  name: 'Fulani',
  category: 'Tresses',
  gender: 'Homme',
  tag: null,
  priceFrom: 50,
  priceTo: 60,
  duration: '2h–4h',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  variants: [{
    label: 'Modèle simple',
    price: 50
  }, {
    label: 'Modèle sophistiqué',
    price: 60
  }]
}, {
  id: 'm06',
  name: 'Départ de Locks',
  category: 'Locks',
  gender: 'Homme',
  tag: 'Exclusif',
  priceFrom: 80,
  priceTo: 90,
  duration: '4h–7h',
  image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&q=80',
  variants: [{
    label: 'Départ de locks en twists / vanilles',
    price: 80
  }, {
    label: 'Plus de 100 locks',
    price: 90
  }]
}, {
  id: 'm07',
  name: 'Retwist Locks',
  category: 'Locks',
  gender: 'Homme',
  tag: null,
  priceFrom: 50,
  priceTo: 70,
  duration: '2h–5h',
  image: 'https://images.unsplash.com/photo-1605980625600-88d6716a5b2c?w=500&q=80',
  variants: [{
    label: 'Retwist simple',
    price: 50
  }, {
    label: 'Retwist avec coiffure simple (tresses / vanilles)',
    price: 60
  }, {
    label: 'Retwist avec Fulani',
    price: 60
  }, {
    label: 'Retwist avec coiffure très sophistiquée (chignon pétales)',
    price: 70
  }]
}];
const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const CLOSED_DAYS = [0];
const TAKEN = ['10h00', '14h30'];
const GENDER_BADGE: Record<string, string> = {
  Femme: 'bg-rose-50 text-rose-700 border-rose-200',
  Homme: 'bg-sky-50 text-sky-700 border-sky-200',
  Unisexe: 'bg-[#f5ede0] text-[#8b6336] border-[#d4b896]'
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateSlots(): string[] {
  const slots: string[] = [];
  let t = 9 * 60;
  while (t + 60 <= 19 * 60) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, '0')}h${m === 0 ? '00' : String(m)}`);
    t += 60;
  }
  return slots;
}
function generateRef(): string {
  return 'SLK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}
function computeTotal(booking: BookingState): number {
  const base = booking.variant?.price ?? booking.prestation?.priceFrom ?? 0;
  const supTotal = booking.supplements.reduce((acc, s) => {
    const found = SUPPLEMENTS_LIST.find(x => x.label === s);
    return acc + (found?.price ?? 0);
  }, 0);
  return base + supTotal;
}

// ─── Step 1: Prestation + Variante + Suppléments + Date + Créneau ─────────────

const StepPick: React.FC<{
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
}> = ({
  booking,
  setBooking
}) => {
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const femaleCategories = Array.from(new Set(PRESTATIONS.filter(p => p.gender === 'Femme').map(p => p.category)));
  const maleCategories = Array.from(new Set(PRESTATIONS.filter(p => p.gender === 'Homme').map(p => p.category)));
  const [catFilter, setCatFilter] = useState<string>('all');
  const filtered = PRESTATIONS.filter(p => {
    const g = genderFilter === 'all' || p.gender === genderFilter;
    const c = catFilter === 'all' || p.category === catFilter;
    return g && c;
  });
  const activeCategories = genderFilter === 'Femme' ? femaleCategories : genderFilter === 'Homme' ? maleCategories : [];
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const getDayStatus = (day: number) => {
    const date = new Date(calYear, calMonth, day);
    const sel = booking.date;
    if (sel && sel.getFullYear() === calYear && sel.getMonth() === calMonth && sel.getDate() === day) return 'selected';
    if (date < today) return 'past';
    if (CLOSED_DAYS.includes(date.getDay())) return 'closed';
    return 'open';
  };
  const slots = generateSlots();
  return <div className="space-y-10">
      {/* Prestation */}
      <div>
        <h2 className="text-[#1a1410] text-2xl font-bold mb-1" style={{
        fontFamily: 'Georgia, serif'
      }}>
          Votre <span className="text-[#8b6336]">coiffure</span>
        </h2>
        <p className="text-[#7a6a58] text-sm mb-6">Sélectionnez la prestation souhaitée.</p>

        {/* Gender filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(['all', 'Femme', 'Homme'] as const).map(g => <button key={g} onClick={() => {
          setGenderFilter(g);
          setCatFilter('all');
        }} className={cn('flex items-center gap-1.5 px-4 py-2 rounded-sm border text-xs font-bold uppercase transition-all duration-200', genderFilter === g ? 'bg-[#1a1410] border-[#1a1410] text-white' : 'bg-white border-[#e0d4c4] text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336]')} style={{
          letterSpacing: '0.1em'
        }}>
              {g === 'Femme' || g === 'Homme' ? <User size={12} /> : <Users size={12} />}
              <span>{g === 'all' ? 'Tous' : g}</span>
            </button>)}
        </div>

        {/* Category filter */}
        {activeCategories.length > 0 && <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setCatFilter('all')} className={cn('px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase transition-all duration-200', catFilter === 'all' ? 'bg-[#c9a96e] text-[#0f0d0b]' : 'bg-[#f5ede0] text-[#8b6336] hover:bg-[#e8d8c4]')} style={{
          letterSpacing: '0.09em'
        }}>
              Toutes
            </button>
            {activeCategories.map(cat => <button key={cat} onClick={() => setCatFilter(cat)} className={cn('px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase transition-all duration-200', catFilter === cat ? 'bg-[#c9a96e] text-[#0f0d0b]' : 'bg-[#f5ede0] text-[#8b6336] hover:bg-[#e8d8c4]')} style={{
          letterSpacing: '0.09em'
        }}>
                {cat}
              </button>)}
          </div>}

        {/* Prestation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(p => <button key={p.id} onClick={() => setBooking(b => ({
          ...b,
          prestation: p,
          variant: p.variants?.[0] ?? null,
          slot: null
        }))} className={cn('group text-left rounded-xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-0.5', booking.prestation?.id === p.id ? 'border-[#c9a96e] shadow-xl shadow-[#c9a96e]/15' : 'border-[#e8ddd0] hover:border-[#c9a96e]/60 hover:shadow-lg')}>
              <div className="relative h-36 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {booking.prestation?.id === p.id && <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#c9a96e] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>}
                {p.tag && <div className="absolute top-2 left-2 bg-[#c9a96e] text-[#1a1410] text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm" style={{
              letterSpacing: '0.12em'
            }}>
                    {p.tag}
                  </div>}
                <div className={cn('absolute bottom-2 right-2 text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm border', GENDER_BADGE[p.gender])}>
                  {p.gender}
                </div>
              </div>
              <div className="p-3.5 bg-white">
                <p className="text-[#a08060] text-[10px] font-semibold uppercase mb-0.5" style={{
              letterSpacing: '0.14em'
            }}>{p.category}</p>
                <h3 className="text-[#1a1410] font-bold text-sm mb-1" style={{
              fontFamily: 'Georgia, serif'
            }}>{p.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#a08060] text-xs"><Clock size={11} /><span>{p.duration}</span></div>
                  <span className="text-[#8b6336] font-bold text-sm">
                    {p.priceTo ? `${p.priceFrom}–${p.priceTo}€` : `${p.priceFrom}€`}
                  </span>
                </div>
              </div>
            </button>)}
        </div>
      </div>

      {/* Variants */}
      {booking.prestation?.variants && booking.prestation.variants.length > 1 && <motion.div initial={{
      opacity: 0,
      y: 14
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.35
    }}>
          <h2 className="text-[#1a1410] text-xl font-bold mb-1" style={{
        fontFamily: 'Georgia, serif'
      }}>
            Choisissez votre <span className="text-[#8b6336]">longueur / modèle</span>
          </h2>
          <p className="text-[#7a6a58] text-sm mb-4">Sélectionnez l'option qui correspond à votre projet.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {booking.prestation.variants.map(v => <button key={v.label} onClick={() => setBooking(b => ({
          ...b,
          variant: v
        }))} className={cn('flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-200', booking.variant?.label === v.label ? 'bg-[#1a1410] border-[#1a1410] text-white shadow-md' : 'bg-white border-[#e0d4c4] text-[#1a1410] hover:border-[#c9a96e] hover:bg-[#faf5ee]')}>
                <span>{v.label}</span>
                <span className={cn('font-bold', booking.variant?.label === v.label ? 'text-[#c9a96e]' : 'text-[#8b6336]')}>
                  {v.price}€
                </span>
              </button>)}
          </div>
        </motion.div>}

      {/* Supplements */}
      {booking.prestation && <motion.div initial={{
      opacity: 0,
      y: 14
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.35,
      delay: 0.05
    }}>
          <h2 className="text-[#1a1410] text-xl font-bold mb-1" style={{
        fontFamily: 'Georgia, serif'
      }}>
            Suppléments <span className="text-[#a08060] text-base font-normal">(optionnel)</span>
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {SUPPLEMENTS_LIST.map(s => {
          const active = booking.supplements.includes(s.label);
          return <button key={s.label} onClick={() => setBooking(b => ({
            ...b,
            supplements: active ? b.supplements.filter(x => x !== s.label) : [...b.supplements, s.label]
          }))} className={cn('flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all duration-200', active ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0f0d0b]' : 'bg-white border-[#e0d4c4] text-[#5a4a3a] hover:border-[#c9a96e] hover:text-[#8b6336]')}>
                  {active && <Check size={11} />}
                  <span>{s.label}</span>
                  <span className="text-[10px] opacity-70">+{s.price}€</span>
                </button>;
        })}
          </div>
        </motion.div>}

      {/* Calendar + Slots */}
      {booking.prestation && <motion.div initial={{
      opacity: 0,
      y: 16
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.4
    }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <h2 className="text-[#1a1410] text-xl font-bold mb-4" style={{
          fontFamily: 'Georgia, serif'
        }}>
              Choisissez une <span className="text-[#8b6336]">date</span>
            </h2>
            <div className="bg-white border border-[#e8ddd0] rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 bg-[#1a1410]">
                <button onClick={() => {
              if (calMonth === 0) {
                setCalYear(y => y - 1);
                setCalMonth(11);
              } else setCalMonth(m => m - 1);
            }} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all" aria-label="Mois précédent">
                  <ChevronLeft size={15} />
                </button>
                <p className="text-white font-bold text-sm" style={{
              fontFamily: 'Georgia, serif'
            }}>
                  {MONTH_NAMES[calMonth]} {calYear}
                </p>
                <button onClick={() => {
              if (calMonth === 11) {
                setCalYear(y => y + 1);
                setCalMonth(0);
              } else setCalMonth(m => m + 1);
            }} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all" aria-label="Mois suivant">
                  <ChevronRight size={15} />
                </button>
              </div>
              <div className="grid grid-cols-7 border-b border-[#f0e6d8]">
                {DAY_NAMES.map(d => <div key={d} className="text-center py-2 text-[#a08060] text-[10px] font-bold uppercase">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 p-3 gap-1">
                {cells.map((day, i) => {
              if (!day) return <div key={`e-${i}`} />;
              const status = getDayStatus(day);
              return <button key={`d-${day}`} disabled={status === 'past' || status === 'closed'} onClick={() => setBooking(b => ({
                ...b,
                date: new Date(calYear, calMonth, day),
                slot: null
              }))} className={cn('h-9 w-full rounded-lg text-sm font-medium transition-all duration-200', status === 'selected' ? 'bg-[#c9a96e] text-white shadow-md font-bold' : status === 'open' ? 'hover:bg-[#f5ede0] hover:text-[#8b6336] text-[#1a1410]' : 'text-[#d0c4b8] cursor-not-allowed')}>
                      {day}
                    </button>;
            })}
              </div>
            </div>
          </div>

          {/* Slots */}
          <div>
            <h2 className="text-[#1a1410] text-xl font-bold mb-4" style={{
          fontFamily: 'Georgia, serif'
        }}>
              {booking.date ? <span>Créneaux du <span className="text-[#8b6336]">{booking.date.toLocaleDateString('fr-FR', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
              })}</span></span> : <span>Choisissez d'abord une <span className="text-[#8b6336]">date</span></span>}
            </h2>
            {booking.date ? <div className="grid grid-cols-3 gap-2.5">
                  {slots.map(slot => {
            const taken = TAKEN.includes(slot);
            return <button key={slot} disabled={taken} onClick={() => setBooking(b => ({
              ...b,
              slot
            }))} className={cn('py-3 rounded-xl border text-sm font-semibold transition-all duration-200', booking.slot === slot ? 'bg-[#c9a96e] border-[#c9a96e] text-white shadow-md' : taken ? 'bg-[#f5f0ea] border-[#e8e0d8] text-[#c4b4a0] cursor-not-allowed line-through text-xs' : 'bg-white border-[#e0d4c4] text-[#1a1410] hover:border-[#c9a96e] hover:bg-[#faf5ee] hover:text-[#8b6336]')}>
                        {slot}
                      </button>;
          })}
                </div> : <div className="h-full flex items-center justify-center bg-[#faf8f5] border border-dashed border-[#e0d4c4] rounded-2xl p-10">
                  <p className="text-[#c4b4a0] text-sm text-center">Sélectionnez une date pour voir les créneaux disponibles</p>
                </div>}

            {booking.slot && booking.date && <motion.div initial={{
          opacity: 0,
          y: 8
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mt-4 flex items-center gap-3 p-3.5 bg-[#f5ede0] border border-[#e0d4c4] rounded-xl">
                <CheckCircle2 size={15} className="text-[#c9a96e] flex-shrink-0" />
                <p className="text-[#5a4a3a] text-sm font-medium">
                  <span>{booking.date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}</span>
                  <span className="text-[#8b6336] font-bold"> à {booking.slot}</span>
                </p>
              </motion.div>}
          </div>
        </motion.div>}

      {/* Prix estimé */}
      {booking.prestation && booking.variant && <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex items-center justify-between p-4 bg-[#1a1410] rounded-xl">
          <div>
            <p className="text-white/50 text-xs uppercase font-semibold mb-0.5" style={{
          letterSpacing: '0.12em'
        }}>Estimation</p>
            <p className="text-white text-sm font-medium">
              {booking.prestation.name}
              {booking.supplements.length > 0 && <span className="text-[#c9a96e]"> + suppléments</span>}
            </p>
          </div>
          <p className="text-[#c9a96e] text-2xl font-bold" style={{
        fontFamily: 'Georgia, serif'
      }}>
            {computeTotal(booking)}€
          </p>
        </motion.div>}
    </div>;
};

// ─── Step 2: Informations + Confirmation ─────────────────────────────────────

const StepConfirm: React.FC<{
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
  errors: Record<string, string>;
}> = ({
  booking,
  setBooking,
  errors
}) => {
  const set = (key: keyof BookingState, val: string | boolean) => setBooking(b => ({
    ...b,
    [key]: val
  }));
  return <div>
      <h2 className="text-[#1a1410] text-2xl font-bold mb-2" style={{
      fontFamily: 'Georgia, serif'
    }}>
        Vos <span className="text-[#8b6336]">informations</span>
      </h2>
      <p className="text-[#7a6a58] text-sm mb-8">Renseignez vos coordonnées pour confirmer la réservation.</p>

      {/* Recap */}
      {booking.prestation && <div className="flex items-center gap-4 p-4 bg-[#f5ede0] border border-[#e0d4c4] rounded-xl mb-8">
          <img src={booking.prestation.image} alt={booking.prestation.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[#1a1410] font-bold text-sm" style={{
          fontFamily: 'Georgia, serif'
        }}>
              {booking.prestation.name}
              {booking.variant && booking.variant.label !== booking.prestation.name && <span className="text-[#a08060] font-normal"> — {booking.variant.label}</span>}
            </p>
            {booking.supplements.length > 0 && <p className="text-[#c9a96e] text-xs mt-0.5">+ {booking.supplements.join(', ')}</p>}
            <p className="text-[#a08060] text-xs mt-0.5">
              {booking.date?.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })} à {booking.slot}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[#8b6336] font-bold text-xl" style={{
          fontFamily: 'Georgia, serif'
        }}>
              {computeTotal(booking)}€
            </p>
            <p className="text-[#a08060] text-xs">{booking.prestation.duration}</p>
          </div>
        </div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#1a1410] text-xs font-bold uppercase mb-2" style={{
          letterSpacing: '0.1em'
        }}>Prénom *</label>
          <input type="text" value={booking.prenom} onChange={e => set('prenom', e.target.value)} placeholder="Votre prénom" className={cn('w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#1a1410] placeholder-[#c4b4a0] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 transition-all duration-200', errors.prenom ? 'border-red-400 bg-red-50' : 'border-[#e0d4c4] focus:border-[#c9a96e]')} />
          {errors.prenom && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /><span>{errors.prenom}</span></p>}
        </div>

        <div>
          <label className="block text-[#1a1410] text-xs font-bold uppercase mb-2" style={{
          letterSpacing: '0.1em'
        }}>Nom *</label>
          <input type="text" value={booking.nom} onChange={e => set('nom', e.target.value)} placeholder="Votre nom" className={cn('w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#1a1410] placeholder-[#c4b4a0] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 transition-all duration-200', errors.nom ? 'border-red-400 bg-red-50' : 'border-[#e0d4c4] focus:border-[#c9a96e]')} />
          {errors.nom && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /><span>{errors.nom}</span></p>}
        </div>

        <div>
          <label className="block text-[#1a1410] text-xs font-bold uppercase mb-2" style={{
          letterSpacing: '0.1em'
        }}>Téléphone *</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08060]" />
            <input type="tel" value={booking.tel} onChange={e => set('tel', e.target.value)} placeholder="+33 6 12 34 56 78" className={cn('w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white text-[#1a1410] placeholder-[#c4b4a0] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 transition-all duration-200', errors.tel ? 'border-red-400 bg-red-50' : 'border-[#e0d4c4] focus:border-[#c9a96e]')} />
          </div>
          {errors.tel && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /><span>{errors.tel}</span></p>}
        </div>

        <div>
          <label className="block text-[#1a1410] text-xs font-bold uppercase mb-2" style={{
          letterSpacing: '0.1em'
        }}>Email *</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08060]" />
            <input type="email" value={booking.email} onChange={e => set('email', e.target.value)} placeholder="votre@email.com" className={cn('w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white text-[#1a1410] placeholder-[#c4b4a0] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 transition-all duration-200', errors.email ? 'border-red-400 bg-red-50' : 'border-[#e0d4c4] focus:border-[#c9a96e]')} />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /><span>{errors.email}</span></p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[#1a1410] text-xs font-bold uppercase mb-2" style={{
          letterSpacing: '0.1em'
        }}>
            Commentaire <span className="text-[#a08060] font-normal normal-case">(optionnel)</span>
          </label>
          <textarea value={booking.comment} onChange={e => set('comment', e.target.value)} rows={3} placeholder="Longueur de vos cheveux, style souhaité, précisions…" className="w-full px-4 py-3 rounded-xl border border-[#e0d4c4] focus:border-[#c9a96e] text-sm bg-white text-[#1a1410] placeholder-[#c4b4a0] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 transition-all duration-200 resize-none" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[#1a1410] text-xs font-bold uppercase mb-3" style={{
          letterSpacing: '0.1em'
        }}>
            <Bell size={12} className="inline mr-1.5 text-[#c9a96e]" />Notifications
          </label>
          <div className="flex flex-wrap gap-3">
            {[{
            key: 'notifEmail' as const,
            label: 'Rappel par email (24h avant)',
            icon: Mail
          }, {
            key: 'notifSms' as const,
            label: 'Rappel par SMS (2h avant)',
            icon: Phone
          }].map(opt => <button key={opt.key} onClick={() => set(opt.key, !booking[opt.key])} className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200', booking[opt.key] ? 'bg-[#1a1410] border-[#1a1410] text-white' : 'bg-white border-[#e0d4c4] text-[#5a4a3a] hover:border-[#c9a96e] hover:text-[#8b6336]')}>
                {booking[opt.key] && <Check size={13} className="flex-shrink-0" />}
                <opt.icon size={13} className="flex-shrink-0" />
                <span>{opt.label}</span>
              </button>)}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-[#f5f9ff] border border-[#c8d8f0] rounded-xl flex items-start gap-3">
        <AlertCircle size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-[#4a5a80] text-xs leading-relaxed">
          Annulation gratuite jusqu'à <strong>24h avant</strong> le rendez-vous. Paiement directement sur place.
        </p>
      </div>
    </div>;
};

// ─── Step 3: Done ─────────────────────────────────────────────────────────────

const StepDone: React.FC<{
  booking: BookingState;
  bookingRef: string;
  onNewBooking: () => void;
  onGoHome: () => void;
}> = ({
  booking,
  bookingRef,
  onNewBooking,
  onGoHome
}) => <div>
    <motion.div initial={{
    scale: 0.7,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} transition={{
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  }} className="flex flex-col items-center text-center mb-10 pt-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center mb-5 shadow-xl shadow-[#c9a96e]/30">
        <CheckCircle2 size={36} className="text-white" />
      </div>
      <div className="inline-flex items-center gap-2 bg-[#f5ede0] text-[#8b6336] text-xs font-bold uppercase px-4 py-1.5 rounded-full mb-4" style={{
      letterSpacing: '0.12em'
    }}>
        <span>Réservation confirmée</span>
      </div>
      <h2 className="text-[#1a1410] text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{
      fontFamily: 'Georgia, serif'
    }}>
        Merci, {booking.prenom} !
      </h2>
      <p className="text-[#7a6a58] text-base leading-relaxed max-w-md">
        Votre rendez-vous est confirmé.
        {booking.notifEmail && ' Vous recevrez un email de confirmation'}
        {booking.notifEmail && booking.notifSms && ' et '}
        {booking.notifSms && 'un SMS de rappel 2h avant'}
        {booking.notifEmail || booking.notifSms ? '.' : ''}
      </p>
    </motion.div>

    <motion.div initial={{
    y: 24,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5,
    delay: 0.2
  }} className="bg-[#1a1410] rounded-2xl overflow-hidden mb-6">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <p className="text-white/50 text-[10px] uppercase font-semibold mb-0.5" style={{
          letterSpacing: '0.12em'
        }}>N° de réservation</p>
          <p className="text-[#c9a96e] font-bold text-lg" style={{
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.15em'
        }}>{bookingRef}</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-900/40 text-emerald-400 text-xs font-bold uppercase px-3 py-1.5 rounded-full border border-emerald-700/40">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Confirmé</span>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[{
        label: 'Prestation',
        value: booking.prestation?.name ?? '',
        icon: Scissors
      }, {
        label: 'Variante',
        value: booking.variant?.label ?? '-',
        icon: Scissors
      }, {
        label: 'Date',
        value: booking.date?.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }) ?? '',
        icon: Calendar
      }, {
        label: 'Heure',
        value: booking.slot ?? '',
        icon: Clock
      }, {
        label: 'Total estimé',
        value: `${computeTotal(booking)}€`,
        icon: CheckCircle2
      }, {
        label: 'Adresse',
        value: 'Croix-Rousse, Lyon — Métro C',
        icon: MapPin
      }].map(row => <div key={row.label} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <row.icon size={13} className="text-[#c9a96e]" />
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase font-semibold" style={{
            letterSpacing: '0.1em'
          }}>{row.label}</p>
              <p className="text-white text-sm font-semibold mt-0.5">{row.value}</p>
            </div>
          </div>)}
      </div>
    </motion.div>

    <motion.div initial={{
    y: 16,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5,
    delay: 0.4
  }} className="flex flex-col sm:flex-row gap-3">
      <button onClick={onGoHome} className="flex-1 py-4 rounded-xl bg-[#1a1410] hover:bg-[#c9a96e] text-white hover:text-[#0f0d0b] text-sm font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2" style={{
      letterSpacing: '0.12em'
    }}>
        <ArrowRight size={15} className="rotate-180" /><span>Retour à l'accueil</span>
      </button>
      <button onClick={onNewBooking} className="flex-1 py-4 rounded-xl border-2 border-[#c9a96e] text-[#8b6336] hover:bg-[#c9a96e] hover:text-[#0f0d0b] text-sm font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2" style={{
      letterSpacing: '0.12em'
    }}>
        <Calendar size={15} /><span>Nouvelle réservation</span>
      </button>
    </motion.div>
  </div>;

// ─── Main ─────────────────────────────────────────────────────────────────────

interface SleekhairReservationProps {
  onGoHome?: () => void;
}
const STEPS = [{
  id: 1,
  label: 'Prestation & Créneau'
}, {
  id: 2,
  label: 'Vos informations'
}, {
  id: 3,
  label: 'Confirmation'
}];
export const SleekhairReservation: React.FC<SleekhairReservationProps> = ({
  onGoHome
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [booking, setBooking] = useState<BookingState>({
    prestation: null,
    variant: null,
    supplements: [],
    date: null,
    slot: null,
    prenom: '',
    nom: '',
    tel: '',
    email: '',
    comment: '',
    notifSms: true,
    notifEmail: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef] = useState(() => generateRef());
  const canProceedStep1 = !!booking.prestation && !!booking.variant && !!booking.date && !!booking.slot;
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!booking.prenom.trim()) errs.prenom = 'Requis';
    if (!booking.nom.trim()) errs.nom = 'Requis';
    if (!booking.tel.trim()) errs.tel = 'Requis';else if (!/^[\d\s\+\-\(\)]{8,}$/.test(booking.tel)) errs.tel = 'Numéro invalide';
    if (!booking.email.trim()) errs.email = 'Requis';else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) errs.email = 'Email invalide';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleNext = () => {
    if (step === 1) {
      if (!canProceedStep1) return;
      setStep(2);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (step === 2) {
      if (!validate()) return;
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setStep(3);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 1200);
    }
  };
  return <div className="min-h-screen w-full bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-[#0f0d0b] pt-24 pb-10 px-5 md:px-8 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-[#c9a96e] to-transparent" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-xs font-semibold uppercase" style={{
            letterSpacing: '0.25em'
          }}>Réservation en ligne</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2" style={{
          fontFamily: 'Georgia, serif'
        }}>
            Réservez votre <span className="text-[#c9a96e]">coiffure</span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">Coiffure afro à domicile · Croix-Rousse, Lyon · Métro C</p>
        </div>
      </div>

      {/* Stepper */}
      {step < 3 && <div className="bg-white border-b border-[#e8ddd0] shadow-sm sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-4 py-5">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-4 h-px bg-[#e8ddd0] z-0" />
              <div className="absolute left-0 top-4 h-px bg-[#c9a96e] z-0 transition-all duration-700" style={{
            width: `${(step - 1) / (STEPS.length - 1) * 100}%`
          }} />
              {STEPS.map(s => {
            const done = s.id < step;
            const active = s.id === step;
            return <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-xs font-bold', done ? 'bg-[#c9a96e] border-[#c9a96e] text-white' : active ? 'bg-white border-[#c9a96e] text-[#c9a96e] shadow-md' : 'bg-[#f5f0ea] border-[#e8ddd0] text-[#c4b4a0]')}>
                      {done ? <Check size={13} /> : <span>{s.id}</span>}
                    </div>
                    <span className={cn('text-[10px] font-semibold uppercase hidden sm:block', active ? 'text-[#1a1410]' : done ? 'text-[#c9a96e]' : 'text-[#b0a090]')} style={{
                letterSpacing: '0.08em'
              }}>
                      {s.label}
                    </span>
                  </div>;
          })}
            </div>
          </div>
        </div>}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -30
        }} transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}>
            {step === 1 && <StepPick booking={booking} setBooking={setBooking} />}
            {step === 2 && <StepConfirm booking={booking} setBooking={setBooking} errors={errors} />}
            {step === 3 && <StepDone booking={booking} bookingRef={bookingRef} onNewBooking={() => {
            setStep(1);
            setBooking({
              prestation: null,
              variant: null,
              supplements: [],
              date: null,
              slot: null,
              prenom: '',
              nom: '',
              tel: '',
              email: '',
              comment: '',
              notifSms: true,
              notifEmail: true
            });
          }} onGoHome={() => onGoHome?.()} />}
          </motion.div>
        </AnimatePresence>

        {step < 3 && <div className="mt-10 flex items-center justify-between gap-4 pt-8 border-t border-[#e8ddd0]">
            {step > 1 ? <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#e0d4c4] text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336] text-sm font-semibold uppercase transition-all" style={{
          letterSpacing: '0.1em'
        }}>
                  <ChevronLeft size={16} /><span>Retour</span>
                </button> : <button onClick={() => onGoHome?.()} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#e0d4c4] text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336] text-sm font-semibold uppercase transition-all" style={{
          letterSpacing: '0.1em'
        }}>
                  <X size={15} /><span>Annuler</span>
                </button>}

            <div className="text-[#a08060] text-xs font-medium">
              <span className="text-[#1a1410] font-bold">{step}</span><span> / {STEPS.length - 1}</span>
            </div>

            <button onClick={handleNext} disabled={step === 1 ? !canProceedStep1 : submitting} className={cn('flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold uppercase transition-all duration-300', step === 2 ? 'bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] shadow-lg hover:-translate-y-0.5' : 'bg-[#1a1410] hover:bg-[#c9a96e] text-white hover:text-[#0f0d0b]', step === 1 && !canProceedStep1 || submitting ? 'opacity-50 cursor-not-allowed' : '')} style={{
          letterSpacing: '0.12em'
        }}>
              {submitting ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /><span>Confirmation…</span></span> : step === 2 ? <span className="flex items-center gap-2"><CheckCircle2 size={16} /><span>Confirmer</span></span> : <span className="flex items-center gap-2"><span>Continuer</span><ChevronRight size={16} /></span>}
            </button>
          </div>}
      </div>
    </div>;
};