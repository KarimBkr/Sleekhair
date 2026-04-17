import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, X, Clock, Calendar, AlertCircle, CheckCircle, Lock, Unlock, Coffee, Sun, Moon, Zap, Edit3, Trash2, Save, Info, RefreshCw, ArrowRight, ToggleLeft, ToggleRight, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

type CalendarView = 'semaine' | 'mois' | 'jour';
type SlotStatus = 'disponible' | 'occupe' | 'bloque' | 'ferme' | 'pause' | 'exception';
type ExceptionType = 'fermeture' | 'ouverture' | 'horaires-modifies';
interface DaySchedule {
  jour: string;
  jourCourt: string;
  ouvert: boolean;
  debut: string;
  fin: string;
  pause: {
    debut: string;
    fin: string;
  } | null;
}
interface TimeSlot {
  heure: string;
  statut: SlotStatus;
  reservation?: {
    clientNom: string;
    prestation: string;
    duree: string;
    genre: 'Femme' | 'Homme' | 'Unisexe';
  };
  raison?: string;
}
interface BlockedSlot {
  id: string;
  date: string;
  debut: string;
  fin: string;
  raison: string;
  type: 'creneau' | 'demi-journee' | 'journee' | 'periode';
}
interface Exception {
  id: string;
  date: string;
  type: ExceptionType;
  debut?: string;
  fin?: string;
  raison: string;
}
interface VacancePeriod {
  id: string;
  debut: string;
  fin: string;
  label: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const JOURS_SEMAINE: DaySchedule[] = [{
  jour: 'Lundi',
  jourCourt: 'Lun',
  ouvert: true,
  debut: '09:00',
  fin: '19:00',
  pause: {
    debut: '12:30',
    fin: '13:30'
  }
}, {
  jour: 'Mardi',
  jourCourt: 'Mar',
  ouvert: true,
  debut: '09:00',
  fin: '19:00',
  pause: {
    debut: '12:30',
    fin: '13:30'
  }
}, {
  jour: 'Mercredi',
  jourCourt: 'Mer',
  ouvert: true,
  debut: '09:00',
  fin: '19:00',
  pause: {
    debut: '12:30',
    fin: '13:30'
  }
}, {
  jour: 'Jeudi',
  jourCourt: 'Jeu',
  ouvert: true,
  debut: '09:00',
  fin: '19:00',
  pause: {
    debut: '12:30',
    fin: '13:30'
  }
}, {
  jour: 'Vendredi',
  jourCourt: 'Ven',
  ouvert: true,
  debut: '09:00',
  fin: '20:00',
  pause: {
    debut: '13:00',
    fin: '14:00'
  }
}, {
  jour: 'Samedi',
  jourCourt: 'Sam',
  ouvert: true,
  debut: '09:00',
  fin: '18:00',
  pause: null
}, {
  jour: 'Dimanche',
  jourCourt: 'Dim',
  ouvert: false,
  debut: '',
  fin: '',
  pause: null
}];
const SLOTS_JOUR: TimeSlot[] = [{
  heure: '09:00',
  statut: 'occupe',
  reservation: {
    clientNom: 'Aminata K.',
    prestation: 'Box Braids',
    duree: '5h30',
    genre: 'Femme'
  }
}, {
  heure: '09:30',
  statut: 'occupe'
}, {
  heure: '10:00',
  statut: 'disponible'
}, {
  heure: '10:30',
  statut: 'disponible'
}, {
  heure: '11:00',
  statut: 'occupe',
  reservation: {
    clientNom: 'Jordan M.',
    prestation: 'Cornrows Homme',
    duree: '2h00',
    genre: 'Homme'
  }
}, {
  heure: '11:30',
  statut: 'occupe'
}, {
  heure: '12:00',
  statut: 'occupe'
}, {
  heure: '12:30',
  statut: 'pause',
  raison: 'Pause déjeuner'
}, {
  heure: '13:00',
  statut: 'pause',
  raison: 'Pause déjeuner'
}, {
  heure: '13:30',
  statut: 'disponible'
}, {
  heure: '14:00',
  statut: 'disponible'
}, {
  heure: '14:30',
  statut: 'occupe',
  reservation: {
    clientNom: 'Fatou D.',
    prestation: 'Knotless Braids',
    duree: '6h00',
    genre: 'Femme'
  }
}, {
  heure: '15:00',
  statut: 'occupe'
}, {
  heure: '15:30',
  statut: 'bloque',
  raison: 'Entretien matériel'
}, {
  heure: '16:00',
  statut: 'disponible'
}, {
  heure: '16:30',
  statut: 'disponible'
}, {
  heure: '17:00',
  statut: 'occupe',
  reservation: {
    clientNom: 'Kevin T.',
    prestation: 'Retwist',
    duree: '2h30',
    genre: 'Unisexe'
  }
}, {
  heure: '17:30',
  statut: 'occupe'
}, {
  heure: '18:00',
  statut: 'disponible'
}, {
  heure: '18:30',
  statut: 'disponible'
}];
const BLOCKED_SLOTS_INIT: BlockedSlot[] = [{
  id: 'b1',
  date: '2025-01-28',
  debut: '15:30',
  fin: '16:00',
  raison: 'Entretien matériel',
  type: 'creneau'
}, {
  id: 'b2',
  date: '2025-02-03',
  debut: '09:00',
  fin: '13:00',
  raison: 'Formation capillaire',
  type: 'demi-journee'
}];
const EXCEPTIONS_INIT: Exception[] = [{
  id: 'e1',
  date: '2025-02-02',
  type: 'ouverture',
  debut: '10:00',
  fin: '16:00',
  raison: 'Dimanche exceptionnel — Avant-saison'
}, {
  id: 'e2',
  date: '2025-02-10',
  type: 'fermeture',
  raison: 'Journée professionnelle'
}, {
  id: 'e3',
  date: '2025-02-14',
  type: 'horaires-modifies',
  debut: '09:00',
  fin: '21:00',
  raison: 'Saint-Valentin — Horaires étendus'
}];
const VACANCES_INIT: VacancePeriod[] = [{
  id: 'v1',
  debut: '2025-02-17',
  fin: '2025-02-21',
  label: 'Vacances d\'hiver'
}, {
  id: 'v2',
  debut: '2025-04-14',
  fin: '2025-04-18',
  label: 'Vacances de printemps'
}];
const PRESTATION_DUREES = [{
  nom: 'Retwist',
  duree: '1h30 – 3h',
  couleur: '#8b6336'
}, {
  nom: 'Flat Twist',
  duree: '1h – 2h',
  couleur: '#c9a96e'
}, {
  nom: 'Nattes collées simples',
  duree: '2h – 3h',
  couleur: '#a0784a'
}, {
  nom: 'Cornrows Homme',
  duree: '1h30 – 2h30',
  couleur: '#7a9eb5'
}, {
  nom: 'Barrel Twist',
  duree: '2h – 3h30',
  couleur: '#b58fa0'
}, {
  nom: 'Fulanis',
  duree: '3h – 4h',
  couleur: '#c9a96e'
}, {
  nom: 'Nattes motifs',
  duree: '3h – 5h',
  couleur: '#8b6336'
}, {
  nom: 'Box Braids',
  duree: '4h – 7h',
  couleur: '#5a7a6e'
}, {
  nom: 'Knotless Braids',
  duree: '5h – 8h',
  couleur: '#6e5a7a'
}, {
  nom: 'Départ de locks',
  duree: '3h – 6h',
  couleur: '#7a6e5a'
}, {
  nom: 'Entretien locks',
  duree: '3h – 5h',
  couleur: '#8b6336'
}, {
  nom: 'Dépose',
  duree: '1h – 3h',
  couleur: '#a08060'
}];
const WEEK_DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}
function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// ─── Status Config ────────────────────────────────────────────────────────────

const SLOT_CONFIG: Record<SlotStatus, {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
}> = {
  disponible: {
    label: 'Disponible',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-400'
  },
  occupe: {
    label: 'Occupé',
    bg: 'bg-[#f5ede0]',
    text: 'text-[#8b6336]',
    border: 'border-[#d4b896]',
    dot: 'bg-[#c9a96e]'
  },
  bloque: {
    label: 'Bloqué',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    dot: 'bg-red-400'
  },
  ferme: {
    label: 'Fermé',
    bg: 'bg-slate-50',
    text: 'text-slate-500',
    border: 'border-slate-200',
    dot: 'bg-slate-300'
  },
  pause: {
    label: 'Pause',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-400'
  },
  exception: {
    label: 'Exception',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-400'
  }
};
const GENRE_BADGE: Record<string, string> = {
  Femme: 'bg-rose-50 text-rose-700 border-rose-200',
  Homme: 'bg-sky-50 text-sky-700 border-sky-200',
  Unisexe: 'bg-[#f5ede0] text-[#8b6336] border-[#d4b896]'
};
const EXCEPTION_CONFIG: Record<ExceptionType, {
  label: string;
  color: string;
  bg: string;
}> = {
  fermeture: {
    label: 'Fermeture exceptionnelle',
    color: 'text-red-700',
    bg: 'bg-red-50 border-red-200'
  },
  ouverture: {
    label: 'Ouverture exceptionnelle',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200'
  },
  'horaires-modifies': {
    label: 'Horaires modifiés',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200'
  }
};

// ─── Subcomponents ────────────────────────────────────────────────────────────

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}
const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  children,
  title,
  subtitle
}) => <AnimatePresence>
    {open && <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{
      scale: 0.95,
      opacity: 0,
      y: 10
    }} animate={{
      scale: 1,
      opacity: 1,
      y: 0
    }} exit={{
      scale: 0.95,
      opacity: 0,
      y: 10
    }} transition={{
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }} className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-6 py-5 bg-[#1a1410] flex-shrink-0">
            <div>
              <h3 className="text-white font-bold text-base" style={{
            fontFamily: 'Georgia, serif'
          }}>{title}</h3>
              {subtitle && <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {children}
          </div>
        </motion.div>
      </motion.div>}
  </AnimatePresence>;

// ─── Horaires Section ─────────────────────────────────────────────────────────

interface HorairesSectionProps {
  schedules: DaySchedule[];
  onChange: (updated: DaySchedule[]) => void;
}
const HorairesSection: React.FC<HorairesSectionProps> = ({
  schedules,
  onChange
}) => {
  const [saved, setSaved] = useState(false);
  const update = (index: number, field: keyof DaySchedule, value: string | boolean | null) => {
    const next = schedules.map((d, i) => i === index ? {
      ...d,
      [field]: value
    } : d);
    onChange(next);
  };
  const updatePause = (index: number, field: 'debut' | 'fin', value: string) => {
    const next = schedules.map((d, i) => {
      if (i !== index) return d;
      return {
        ...d,
        pause: d.pause ? {
          ...d.pause,
          [field]: value
        } : {
          debut: value,
          fin: value
        }
      };
    });
    onChange(next);
  };
  const togglePause = (index: number) => {
    const next = schedules.map((d, i) => {
      if (i !== index) return d;
      return {
        ...d,
        pause: d.pause ? null : {
          debut: '12:30',
          fin: '13:30'
        }
      };
    });
    onChange(next);
  };
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e6d8]">
        <div>
          <h2 className="text-[#1a1410] font-bold text-base" style={{
          fontFamily: 'Georgia, serif'
        }}>Horaires d'ouverture</h2>
          <p className="text-[#a08060] text-xs mt-0.5">Définissez vos horaires réguliers par jour</p>
        </div>
        <button onClick={handleSave} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-300', saved ? 'bg-emerald-500 text-white' : 'bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b]')} style={{
        letterSpacing: '0.1em'
      }}>
          {saved ? <><CheckCircle size={13} /><span>Enregistré</span></> : <><Save size={13} /><span>Enregistrer</span></>}
        </button>
      </div>
      <div className="divide-y divide-[#f5f0ea]">
        {schedules.map((day, i) => <div key={day.jour} className={cn('px-5 py-4 transition-colors', !day.ouvert && 'bg-[#faf8f5]')}>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Jour + toggle */}
              <div className="flex items-center gap-3 w-36 flex-shrink-0">
                <button onClick={() => update(i, 'ouvert', !day.ouvert)} className="flex-shrink-0">
                  <div className={cn('w-9 h-5 rounded-full flex items-center transition-all duration-300 relative', day.ouvert ? 'bg-[#c9a96e]' : 'bg-[#d4c4b0]')}>
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all duration-300', day.ouvert ? 'left-[18px]' : 'left-[2px]')} />
                  </div>
                </button>
                <span className={cn('text-sm font-semibold', day.ouvert ? 'text-[#1a1410]' : 'text-[#b0a090]')}>{day.jour}</span>
              </div>

              {day.ouvert ? <div className="flex items-center gap-3 flex-wrap flex-1">
                  {/* Horaires */}
                  <div className="flex items-center gap-2">
                    <input type="time" value={day.debut} onChange={e => update(i, 'debut', e.target.value)} className="px-3 py-1.5 border border-[#e0d4c4] rounded-lg text-sm text-[#1a1410] focus:outline-none focus:border-[#c9a96e]/60 bg-white" />
                    <span className="text-[#a08060] text-sm">–</span>
                    <input type="time" value={day.fin} onChange={e => update(i, 'fin', e.target.value)} className="px-3 py-1.5 border border-[#e0d4c4] rounded-lg text-sm text-[#1a1410] focus:outline-none focus:border-[#c9a96e]/60 bg-white" />
                  </div>

                  {/* Pause */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => togglePause(i)} className={cn('flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all', day.pause ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-[#e0d4c4] text-[#a08060] hover:border-[#c9a96e]')}>
                      <Coffee size={11} />
                      <span>{day.pause ? 'Pause active' : 'Ajouter pause'}</span>
                    </button>
                    {day.pause && <div className="flex items-center gap-2">
                        <input type="time" value={day.pause.debut} onChange={e => updatePause(i, 'debut', e.target.value)} className="px-2 py-1 border border-amber-200 rounded-lg text-xs text-[#1a1410] focus:outline-none bg-amber-50 w-24" />
                        <span className="text-amber-500 text-xs">–</span>
                        <input type="time" value={day.pause.fin} onChange={e => updatePause(i, 'fin', e.target.value)} className="px-2 py-1 border border-amber-200 rounded-lg text-xs text-[#1a1410] focus:outline-none bg-amber-50 w-24" />
                      </div>}
                  </div>
                </div> : <span className="text-[#c4b4a0] text-sm italic">Fermé</span>}
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── Calendar Month View ──────────────────────────────────────────────────────

interface CalendarMonthProps {
  year: number;
  month: number;
  exceptions: Exception[];
  vacances: VacancePeriod[];
  schedules: DaySchedule[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}
const CalendarMonth: React.FC<CalendarMonthProps> = ({
  year,
  month,
  exceptions,
  vacances,
  schedules,
  selectedDate,
  onSelectDate
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const getDayStatus = (day: number): 'ferme' | 'exception-ferme' | 'exception-ouvert' | 'exception-modifie' | 'vacances' | 'ouvert' | 'passe' => {
    const dateStr = formatDate(year, month, day);
    const dateObj = new Date(year, month, day);
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    if (!isToday && dateObj < today) return 'passe';
    const vac = vacances.find(v => dateStr >= v.debut && dateStr <= v.fin);
    if (vac) return 'vacances';
    const exc = exceptions.find(e => e.date === dateStr);
    if (exc) {
      if (exc.type === 'fermeture') return 'exception-ferme';
      if (exc.type === 'ouverture') return 'exception-ouvert';
      return 'exception-modifie';
    }
    const dayOfWeek = dateObj.getDay();
    const scheduleIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    if (!schedules[scheduleIndex]?.ouvert) return 'ferme';
    return 'ouvert';
  };
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEK_DAYS_SHORT.map(d => <div key={d} className="text-center text-[#a08060] text-[10px] font-bold uppercase py-2" style={{
        letterSpacing: '0.08em'
      }}>
            {d}
          </div>)}
      </div>
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
        if (!day) return <div key={`empty-${idx}`} />;
        const dateStr = formatDate(year, month, day);
        const status = getDayStatus(day);
        const isSelected = selectedDate === dateStr;
        const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
        return <button key={dateStr} onClick={() => status !== 'passe' && onSelectDate(dateStr)} className={cn('relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all duration-200', isSelected && 'ring-2 ring-[#c9a96e] ring-offset-1', status === 'passe' && 'opacity-30 cursor-default', status === 'ferme' && 'bg-slate-50 text-slate-400 cursor-not-allowed', status === 'exception-ferme' && 'bg-red-50 text-red-500', status === 'exception-ouvert' && 'bg-emerald-50 text-emerald-700', status === 'exception-modifie' && 'bg-purple-50 text-purple-700', status === 'vacances' && 'bg-amber-50 text-amber-600', status === 'ouvert' && !isSelected && 'bg-white hover:bg-[#f5ede0] text-[#1a1410] border border-[#e8ddd0] hover:border-[#c9a96e]/40', isSelected && 'bg-[#1a1410] text-[#c9a96e] border-none')}>
              <span>{day}</span>
              {isToday && !isSelected && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9a96e]" />}
              {status === 'exception-ferme' && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-400" />}
              {status === 'exception-ouvert' && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              {status === 'exception-modifie' && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-purple-400" />}
              {status === 'vacances' && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>;
      })}
      </div>
    </div>;
};

// ─── Day Timeline ─────────────────────────────────────────────────────────────

interface DayTimelineProps {
  slots: TimeSlot[];
  selectedDate: string;
  onBlockSlot: () => void;
}
const DayTimeline: React.FC<DayTimelineProps> = ({
  slots,
  selectedDate,
  onBlockSlot
}) => {
  const disponibles = slots.filter(s => s.statut === 'disponible').length;
  const occupes = slots.filter(s => s.statut === 'occupe').length;
  const bloques = slots.filter(s => s.statut === 'bloque').length;
  return <div className="space-y-3">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[{
        label: 'Libres',
        count: disponibles,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-200'
      }, {
        label: 'Occupés',
        count: occupes,
        color: 'text-[#8b6336]',
        bg: 'bg-[#f5ede0] border-[#d4b896]'
      }, {
        label: 'Bloqués',
        count: bloques,
        color: 'text-red-600',
        bg: 'bg-red-50 border-red-200'
      }].map(stat => <div key={stat.label} className={cn('rounded-lg px-3 py-2.5 border text-center', stat.bg)}>
            <p className={cn('text-xl font-bold', stat.color)} style={{
          fontFamily: 'Georgia, serif'
        }}>{stat.count}</p>
            <p className="text-[10px] font-semibold uppercase text-[#a08060]" style={{
          letterSpacing: '0.08em'
        }}>{stat.label}</p>
          </div>)}
      </div>

      {/* Timeline */}
      <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
        {slots.map(slot => {
        const cfg = SLOT_CONFIG[slot.statut];
        return <div key={slot.heure} className={cn('flex items-start gap-3 p-3 rounded-xl border transition-all', cfg.bg, cfg.border, slot.statut === 'disponible' && 'hover:shadow-sm hover:border-[#c9a96e]/40 cursor-pointer')}>
              <div className="flex items-center gap-2 flex-shrink-0 w-16">
                <span className={cn('w-2 h-2 rounded-full flex-shrink-0', cfg.dot)} />
                <span className={cn('text-xs font-bold', cfg.text)}>{slot.heure}</span>
              </div>

              {slot.reservation ? <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[#1a1410] text-xs font-bold">{slot.reservation.clientNom}</p>
                    <span className={cn('text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border', GENRE_BADGE[slot.reservation.genre])} style={{
                letterSpacing: '0.08em'
              }}>
                      {slot.reservation.genre}
                    </span>
                  </div>
                  <p className="text-[#8b6336] text-xs mt-0.5">{slot.reservation.prestation} · {slot.reservation.duree}</p>
                </div> : slot.raison ? <p className={cn('text-xs flex-1', cfg.text)}>{slot.raison}</p> : <div className="flex items-center justify-between flex-1">
                  <span className={cn('text-xs', cfg.text)}>{cfg.label}</span>
                  {slot.statut === 'disponible' && <button onClick={onBlockSlot} className="text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-all" style={{
              letterSpacing: '0.08em'
            }}>
                      Bloquer
                    </button>}
                </div>}
            </div>;
      })}
      </div>
    </div>;
};

// ─── Prestation Duration Viz ──────────────────────────────────────────────────

const PrestationDureeViz: React.FC = () => <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
    <div className="px-5 py-4 border-b border-[#f0e6d8]">
      <div className="flex items-center gap-2">
        <Info size={15} className="text-[#c9a96e]" />
        <h2 className="text-[#1a1410] font-bold text-base" style={{
        fontFamily: 'Georgia, serif'
      }}>Impact des prestations sur le planning</h2>
      </div>
      <p className="text-[#a08060] text-xs mt-1">Les durées varient selon les options choisies et influencent directement les créneaux disponibles</p>
    </div>
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PRESTATION_DUREES.map(p => {
        const parts = p.duree.split(' – ');
        const minH = parseFloat(parts[0]);
        const maxH = parseFloat(parts[1]);
        const maxTotal = 8;
        return <div key={p.nom} className="flex items-center gap-3">
              <div className="w-32 flex-shrink-0">
                <p className="text-[#1a1410] text-xs font-semibold truncate">{p.nom}</p>
                <p className="text-[#a08060] text-[10px]">{p.duree}</p>
              </div>
              <div className="flex-1 relative h-4 bg-[#f0e6d8] rounded-full overflow-hidden">
                <div className="absolute top-0 h-full rounded-full opacity-25" style={{
              left: `${minH / maxTotal * 100}%`,
              width: `${(maxH - minH) / maxTotal * 100}%`,
              background: p.couleur
            }} />
                <div className="absolute top-0 h-full rounded-full" style={{
              left: 0,
              width: `${minH / maxTotal * 100}%`,
              background: p.couleur
            }} />
              </div>
              <span className="text-[#a08060] text-[10px] w-6 flex-shrink-0 text-right">{maxH}h</span>
            </div>;
      })}
      </div>
      <div className="mt-4 p-3.5 bg-[#f5ede0] rounded-lg border border-[#e0d4c4]">
        <p className="text-[#7a6a58] text-xs leading-relaxed">
          <span className="font-bold text-[#8b6336]">Règle métier :</span> Un créneau de 14h est réservable pour un Retwist (2h), mais pas pour un départ de locks (jusqu'à 6h) si le salon ferme à 19h. Le système calcule automatiquement la compatibilité en fonction de la durée estimée + options + tampon de 15 min.
        </p>
      </div>
    </div>
  </div>;

// ─── Week View ────────────────────────────────────────────────────────────────

interface WeekViewProps {
  schedules: DaySchedule[];
  exceptions: Exception[];
  vacances: VacancePeriod[];
  selectedDate: string;
  onSelectDate: (d: string) => void;
}
const WeekView: React.FC<WeekViewProps> = ({
  schedules,
  exceptions,
  vacances,
  selectedDate,
  onSelectDate
}) => {
  const today = new Date();
  // Build week starting from Monday
  const todayDay = today.getDay();
  const mondayOffset = todayDay === 0 ? -6 : 1 - todayDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const weekDays = Array.from({
    length: 7
  }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
  const getStatus = (date: Date) => {
    const str = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const vac = vacances.find(v => str >= v.debut && str <= v.fin);
    if (vac) return {
      type: 'vacances',
      label: vac.label,
      color: 'bg-amber-50 border-amber-200 text-amber-700'
    };
    const exc = exceptions.find(e => e.date === str);
    if (exc) {
      const cfg = EXCEPTION_CONFIG[exc.type];
      return {
        type: 'exception',
        label: exc.raison,
        color: cfg.bg + ' ' + cfg.color
      };
    }
    const dow = date.getDay();
    const si = dow === 0 ? 6 : dow - 1;
    if (!schedules[si]?.ouvert) return {
      type: 'ferme',
      label: 'Fermé',
      color: 'bg-slate-50 border-slate-200 text-slate-400'
    };
    return {
      type: 'ouvert',
      label: `${schedules[si].debut} – ${schedules[si].fin}`,
      color: 'bg-white border-[#e8ddd0] text-[#1a1410]'
    };
  };
  return <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#f0e6d8]">
        <h2 className="text-[#1a1410] font-bold text-base" style={{
        fontFamily: 'Georgia, serif'
      }}>Vue semaine</h2>
        <p className="text-[#a08060] text-xs mt-0.5">Semaine du {monday.getDate()} au {weekDays[6].getDate()} {MONTHS_FR[weekDays[6].getMonth()]}</p>
      </div>
      <div className="grid grid-cols-7 divide-x divide-[#f0e6d8]">
        {weekDays.map((date, i) => {
        const status = getStatus(date);
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const isToday = today.getDate() === date.getDate() && today.getMonth() === date.getMonth();
        const isSelected = selectedDate === dateStr;
        const slotsCount = status.type === 'ouvert' ? Math.floor(Math.random() * 5) + 1 : 0;
        return <button key={dateStr} onClick={() => onSelectDate(dateStr)} className={cn('flex flex-col items-center py-4 px-2 gap-1 transition-all hover:bg-[#faf8f5]', isSelected && 'bg-[#f5ede0]')}>
              <span className="text-[#a08060] text-[10px] font-bold uppercase" style={{
            letterSpacing: '0.08em'
          }}>
                {WEEK_DAYS_SHORT[i]}
              </span>
              <span className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all', isToday ? 'bg-[#1a1410] text-[#c9a96e]' : 'text-[#1a1410]')}>
                {date.getDate()}
              </span>
              {status.type === 'ferme' && <span className="text-[10px] text-slate-400 font-medium">Fermé</span>}
              {status.type === 'ouvert' && <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[9px] text-[#a08060]">{slotsCount} libres</span>
                  <div className="flex gap-0.5">
                    {Array.from({
                length: 5
              }, (_, j) => <span key={j} className={cn('w-1.5 h-1.5 rounded-full', j < slotsCount ? 'bg-emerald-400' : 'bg-[#e0d4c4]')} />)}
                  </div>
                </div>}
              {status.type === 'exception' && <span className="text-[9px] text-purple-600 font-semibold">Exception</span>}
              {status.type === 'vacances' && <span className="text-[9px] text-amber-600 font-semibold">Congé</span>}
            </button>;
      })}
      </div>
    </div>;
};

// ─── Tampon Section ───────────────────────────────────────────────────────────

const TamponSection: React.FC = () => {
  const [tampon, setTampon] = useState(15);
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-[#1a1410] font-bold text-base" style={{
          fontFamily: 'Georgia, serif'
        }}>Temps tampon</h2>
          <p className="text-[#a08060] text-xs mt-0.5">Durée ajoutée automatiquement entre deux rendez-vous</p>
        </div>
        <button onClick={handleSave} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-300 flex-shrink-0', saved ? 'bg-emerald-500 text-white' : 'bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b]')} style={{
        letterSpacing: '0.1em'
      }}>
          {saved ? <><CheckCircle size={13} /><span>OK</span></> : <><Save size={13} /><span>Sauver</span></>}
        </button>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={() => setTampon(Math.max(0, tampon - 5))} className="w-8 h-8 rounded-lg border border-[#e0d4c4] flex items-center justify-center text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336] font-bold transition-all">–</button>
          <div className="text-center">
            <p className="text-[#1a1410] text-2xl font-bold" style={{
            fontFamily: 'Georgia, serif'
          }}>{tampon}</p>
            <p className="text-[#a08060] text-xs">minutes</p>
          </div>
          <button onClick={() => setTampon(Math.min(60, tampon + 5))} className="w-8 h-8 rounded-lg border border-[#e0d4c4] flex items-center justify-center text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336] font-bold transition-all">+</button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {[0, 10, 15, 20, 30, 45].map(v => <button key={v} onClick={() => setTampon(v)} className={cn('px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all', tampon === v ? 'bg-[#1a1410] border-[#1a1410] text-[#c9a96e]' : 'bg-white border-[#e0d4c4] text-[#7a6a58] hover:border-[#c9a96e]')}>
              {v === 0 ? 'Aucun' : `${v} min`}
            </button>)}
        </div>
      </div>

      <div className="mt-4 p-3.5 bg-[#f5ede0] rounded-lg border border-[#e0d4c4] flex items-start gap-2.5">
        <Zap size={14} className="text-[#c9a96e] flex-shrink-0 mt-0.5" />
        <p className="text-[#7a6a58] text-xs leading-relaxed">
          Avec un tampon de <span className="font-bold text-[#8b6336]">{tampon} min</span>, si une prestation se termine à 12h00, le prochain créneau réservable sera 12h{String(tampon).padStart(2, '0')}.
        </p>
      </div>
    </div>;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const SleekhairDisponibilites: React.FC = () => {
  const [view, setView] = useState<CalendarView>('semaine');
  const [calYear, setCalYear] = useState(2025);
  const [calMonth, setCalMonth] = useState(0); // janvier
  const [selectedDate, setSelectedDate] = useState('2025-01-28');
  const [schedules, setSchedules] = useState<DaySchedule[]>(JOURS_SEMAINE);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>(BLOCKED_SLOTS_INIT);
  const [exceptions, setExceptions] = useState<Exception[]>(EXCEPTIONS_INIT);
  const [vacances, setVacances] = useState<VacancePeriod[]>(VACANCES_INIT);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showExceptionModal, setShowExceptionModal] = useState(false);
  const [showVacancesModal, setShowVacancesModal] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null);

  // Block form state
  const [blockForm, setBlockForm] = useState({
    date: '',
    debut: '',
    fin: '',
    raison: '',
    type: 'creneau' as BlockedSlot['type']
  });
  const [excForm, setExcForm] = useState({
    date: '',
    type: 'fermeture' as ExceptionType,
    debut: '',
    fin: '',
    raison: ''
  });
  const [vacForm, setVacForm] = useState({
    debut: '',
    fin: '',
    label: ''
  });
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const showSaveSuccess = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 2500);
  };
  const handleAddBlock = () => {
    if (!blockForm.date || !blockForm.debut || !blockForm.fin) return;
    const newBlock: BlockedSlot = {
      id: `b${Date.now()}`,
      date: blockForm.date,
      debut: blockForm.debut,
      fin: blockForm.fin,
      raison: blockForm.raison || 'Créneau bloqué',
      type: blockForm.type
    };
    setBlockedSlots(prev => [...prev, newBlock]);
    setShowBlockModal(false);
    setBlockForm({
      date: '',
      debut: '',
      fin: '',
      raison: '',
      type: 'creneau'
    });
    showSaveSuccess('Créneau bloqué avec succès');
  };
  const handleAddException = () => {
    if (!excForm.date || !excForm.raison) return;
    const newExc: Exception = {
      id: `e${Date.now()}`,
      date: excForm.date,
      type: excForm.type,
      debut: excForm.debut || undefined,
      fin: excForm.fin || undefined,
      raison: excForm.raison
    };
    setExceptions(prev => [...prev, newExc]);
    setShowExceptionModal(false);
    setExcForm({
      date: '',
      type: 'fermeture',
      debut: '',
      fin: '',
      raison: ''
    });
    showSaveSuccess('Exception enregistrée');
  };
  const handleAddVacances = () => {
    if (!vacForm.debut || !vacForm.fin || !vacForm.label) return;
    const newVac: VacancePeriod = {
      id: `v${Date.now()}`,
      debut: vacForm.debut,
      fin: vacForm.fin,
      label: vacForm.label
    };
    setVacances(prev => [...prev, newVac]);
    setShowVacancesModal(false);
    setVacForm({
      debut: '',
      fin: '',
      label: ''
    });
    showSaveSuccess('Période de congé ajoutée');
  };
  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(y => y - 1);
    } else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(y => y + 1);
    } else setCalMonth(m => m + 1);
  };
  const inputClass = "w-full px-3 py-2.5 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410] bg-white transition-all";
  const labelClass = "block text-[#a08060] text-[10px] font-bold uppercase mb-1.5";

  // Legend
  const LEGEND_ITEMS = [{
    label: 'Disponible',
    color: 'bg-emerald-400'
  }, {
    label: 'Occupé',
    color: 'bg-[#c9a96e]'
  }, {
    label: 'Bloqué',
    color: 'bg-red-400'
  }, {
    label: 'Fermé',
    color: 'bg-slate-300'
  }, {
    label: 'Exception',
    color: 'bg-purple-400'
  }, {
    label: 'Vacances',
    color: 'bg-amber-400'
  }];
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[#1a1410] text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Disponibilités</h1>
          <p className="text-[#a08060] text-sm mt-0.5">Gérez vos horaires, créneaux, pauses et exceptions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowBlockModal(true)} className="flex items-center gap-2 px-4 py-2.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold uppercase rounded-lg transition-all" style={{
          letterSpacing: '0.1em'
        }}>
            <Lock size={13} /><span>Bloquer un créneau</span>
          </button>
          <button onClick={() => setShowExceptionModal(true)} className="flex items-center gap-2 px-4 py-2.5 border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold uppercase rounded-lg transition-all" style={{
          letterSpacing: '0.1em'
        }}>
            <Zap size={13} /><span>Exception</span>
          </button>
          <button onClick={() => setShowVacancesModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-xs font-bold uppercase rounded-lg transition-all" style={{
          letterSpacing: '0.1em'
        }}>
            <Sun size={13} /><span>Vacances</span>
          </button>
        </div>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {saveSuccess && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
            <CheckCircle size={15} className="flex-shrink-0" />
            <span>{saveSuccess}</span>
          </motion.div>}
      </AnimatePresence>

      {/* View toggle + Legend */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1.5 bg-[#f5ede0] p-1 rounded-lg border border-[#e0d4c4]">
          {(['jour', 'semaine', 'mois'] as CalendarView[]).map(v => <button key={v} onClick={() => setView(v)} className={cn('px-3.5 py-1.5 rounded-md text-xs font-bold uppercase transition-all', view === v ? 'bg-[#1a1410] text-[#c9a96e]' : 'text-[#8b6336] hover:text-[#1a1410]')} style={{
          letterSpacing: '0.08em'
        }}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>)}
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {LEGEND_ITEMS.map(item => <div key={item.label} className="flex items-center gap-1.5">
              <span className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', item.color)} />
              <span className="text-[#7a6a58] text-xs">{item.label}</span>
            </div>)}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left — Calendar & Week */}
        <div className="xl:col-span-2 space-y-5">
          {/* Week view */}
          {(view === 'semaine' || view === 'jour') && <WeekView schedules={schedules} exceptions={exceptions} vacances={vacances} selectedDate={selectedDate} onSelectDate={setSelectedDate} />}

          {/* Month calendar */}
          {(view === 'mois' || view === 'semaine') && <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e6d8]">
                <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-[#e0d4c4] flex items-center justify-center text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336] transition-all">
                  <ChevronLeft size={15} />
                </button>
                <h2 className="text-[#1a1410] font-bold text-base" style={{
              fontFamily: 'Georgia, serif'
            }}>
                  {MONTHS_FR[calMonth]} {calYear}
                </h2>
                <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-[#e0d4c4] flex items-center justify-center text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336] transition-all">
                  <ChevronRight size={15} />
                </button>
              </div>
              <div className="p-4">
                <CalendarMonth year={calYear} month={calMonth} exceptions={exceptions} vacances={vacances} schedules={schedules} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              </div>
            </div>}

          {/* Prestation duration logic */}
          <PrestationDureeViz />
        </div>

        {/* Right — Day detail & Controls */}
        <div className="space-y-5">
          {/* Selected day detail */}
          <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e6d8]">
              <div>
                <h2 className="text-[#1a1410] font-bold text-base" style={{
                fontFamily: 'Georgia, serif'
              }}>
                  {selectedDate ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                }) : 'Sélectionnez un jour'}
                </h2>
                <p className="text-[#a08060] text-xs mt-0.5">Planning détaillé</p>
              </div>
              <button onClick={() => setShowBlockModal(true)} className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-100 transition-all" title="Bloquer un créneau">
                <Lock size={13} />
              </button>
            </div>
            <div className="p-4">
              <DayTimeline slots={SLOTS_JOUR} selectedDate={selectedDate} onBlockSlot={() => setShowBlockModal(true)} />
            </div>
          </div>

          {/* Tampon */}
          <TamponSection />

          {/* Quick actions */}
          <div className="bg-[#1a1410] border border-white/8 rounded-xl p-5">
            <h3 className="text-white font-bold text-sm mb-4">Actions rapides</h3>
            <div className="space-y-2">
              {[{
              label: 'Ouvrir cette journée',
              icon: Unlock,
              action: () => showSaveSuccess('Journée ouverte'),
              color: 'hover:bg-emerald-900/30 hover:text-emerald-400'
            }, {
              label: 'Fermer cette journée',
              icon: Lock,
              action: () => showSaveSuccess('Journée fermée'),
              color: 'hover:bg-red-900/30 hover:text-red-400'
            }, {
              label: 'Ajouter une pause',
              icon: Coffee,
              action: () => showSaveSuccess('Pause ajoutée'),
              color: 'hover:bg-amber-900/30 hover:text-amber-400'
            }, {
              label: 'Modifier les horaires',
              icon: Clock,
              action: () => {},
              color: 'hover:bg-[#c9a96e]/15 hover:text-[#c9a96e]'
            }, {
              label: 'Créer une exception',
              icon: Zap,
              action: () => setShowExceptionModal(true),
              color: 'hover:bg-purple-900/30 hover:text-purple-400'
            }].map(item => <button key={item.label} onClick={item.action} className={cn('w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/8 text-white/50 text-xs font-medium transition-all duration-200', item.color)}>
                  <item.icon size={13} />
                  <span>{item.label}</span>
                  <ChevronRight size={11} className="ml-auto opacity-50" />
                </button>)}
            </div>
          </div>
        </div>
      </div>

      {/* Horaires section */}
      <HorairesSection schedules={schedules} onChange={setSchedules} />

      {/* Exceptions & Blocages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exceptions */}
        <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e6d8]">
            <div>
              <h2 className="text-[#1a1410] font-bold text-base" style={{
              fontFamily: 'Georgia, serif'
            }}>Exceptions</h2>
              <p className="text-[#a08060] text-xs mt-0.5">{exceptions.length} exception{exceptions.length > 1 ? 's' : ''} configurée{exceptions.length > 1 ? 's' : ''}</p>
            </div>
            <button onClick={() => setShowExceptionModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5ede0] border border-[#d4b896] text-[#8b6336] text-xs font-bold uppercase rounded-lg hover:bg-[#ede0cc] transition-all" style={{
            letterSpacing: '0.08em'
          }}>
              <Plus size={12} /><span>Ajouter</span>
            </button>
          </div>
          <div className="divide-y divide-[#f5f0ea]">
            {exceptions.map(exc => {
            const cfg = EXCEPTION_CONFIG[exc.type];
            return <div key={exc.id} className="flex items-start gap-3 px-5 py-4">
                  <div className={cn('flex-1 p-3 rounded-lg border', cfg.bg)}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={cn('text-xs font-bold', cfg.color)}>
                          {new Date(exc.date + 'T12:00:00').toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                        </p>
                        <p className="text-[10px] font-semibold uppercase mt-0.5 text-[#a08060]" style={{
                      letterSpacing: '0.08em'
                    }}>{cfg.label}</p>
                        <p className="text-[#7a6a58] text-xs mt-1">{exc.raison}</p>
                        {exc.debut && exc.fin && <p className="text-[#a08060] text-[10px] mt-0.5">{exc.debut} – {exc.fin}</p>}
                      </div>
                      <button onClick={() => setExceptions(prev => prev.filter(e => e.id !== exc.id))} className="w-6 h-6 rounded-md flex items-center justify-center text-[#c4b4a0] hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0">
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                </div>;
          })}
            {exceptions.length === 0 && <div className="px-5 py-8 text-center">
                <p className="text-[#c4b4a0] text-sm">Aucune exception configurée</p>
              </div>}
          </div>
        </div>

        {/* Blocages & Vacances */}
        <div className="space-y-5">
          {/* Créneaux bloqués */}
          <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e6d8]">
              <div>
                <h2 className="text-[#1a1410] font-bold text-base" style={{
                fontFamily: 'Georgia, serif'
              }}>Créneaux bloqués</h2>
                <p className="text-[#a08060] text-xs mt-0.5">{blockedSlots.length} blocage{blockedSlots.length > 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setShowBlockModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase rounded-lg hover:bg-red-100 transition-all" style={{
              letterSpacing: '0.08em'
            }}>
                <Plus size={12} /><span>Bloquer</span>
              </button>
            </div>
            <div className="divide-y divide-[#f5f0ea]">
              {blockedSlots.map(b => <div key={b.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#1a1410] text-xs font-semibold">
                        {new Date(b.date + 'T12:00:00').toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short'
                    })}
                      </span>
                      <span className="text-[#8b6336] text-xs font-bold">{b.debut} – {b.fin}</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-50 border border-red-200 text-red-600" style={{
                    letterSpacing: '0.07em'
                  }}>{b.type}</span>
                    </div>
                    <p className="text-[#a08060] text-xs mt-0.5 truncate">{b.raison}</p>
                  </div>
                  <button onClick={() => setBlockedSlots(prev => prev.filter(s => s.id !== b.id))} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#c4b4a0] hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0">
                    <Trash2 size={12} />
                  </button>
                </div>)}
              {blockedSlots.length === 0 && <div className="px-5 py-6 text-center">
                  <p className="text-[#c4b4a0] text-sm">Aucun créneau bloqué</p>
                </div>}
            </div>
          </div>

          {/* Vacances */}
          <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e6d8]">
              <div>
                <h2 className="text-[#1a1410] font-bold text-base" style={{
                fontFamily: 'Georgia, serif'
              }}>Vacances & Congés</h2>
                <p className="text-[#a08060] text-xs mt-0.5">{vacances.length} période{vacances.length > 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setShowVacancesModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase rounded-lg hover:bg-amber-100 transition-all" style={{
              letterSpacing: '0.08em'
            }}>
                <Plus size={12} /><span>Ajouter</span>
              </button>
            </div>
            <div className="divide-y divide-[#f5f0ea]">
              {vacances.map(v => <div key={v.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                    <Sun size={16} className="text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1a1410] text-xs font-bold">{v.label}</p>
                    <p className="text-[#a08060] text-xs">
                      {new Date(v.debut + 'T12:00:00').toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short'
                  })}
                      {' '}<ArrowRight size={11} className="inline" />{' '}
                      {new Date(v.fin + 'T12:00:00').toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                    </p>
                  </div>
                  <button onClick={() => setVacances(prev => prev.filter(p => p.id !== v.id))} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#c4b4a0] hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0">
                    <Trash2 size={12} />
                  </button>
                </div>)}
              {vacances.length === 0 && <div className="px-5 py-6 text-center">
                  <p className="text-[#c4b4a0] text-sm">Aucune période de congé</p>
                </div>}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}

      {/* Block Modal */}
      <ModalWrapper open={showBlockModal} onClose={() => setShowBlockModal(false)} title="Bloquer un créneau" subtitle="Rendre indisponible une plage horaire">
        <div className="p-6 space-y-4">
          <div>
            <label className={labelClass}>Type de blocage</label>
            <div className="grid grid-cols-2 gap-2">
              {(['creneau', 'demi-journee', 'journee', 'periode'] as BlockedSlot['type'][]).map(t => <button key={t} onClick={() => setBlockForm(f => ({
              ...f,
              type: t
            }))} className={cn('px-3 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all', blockForm.type === t ? 'bg-[#1a1410] border-[#1a1410] text-[#c9a96e]' : 'bg-white border-[#e0d4c4] text-[#7a6a58] hover:border-[#c9a96e]')}>
                  {t === 'creneau' ? '🕐 Créneau précis' : t === 'demi-journee' ? '🌅 Demi-journée' : t === 'journee' ? '📅 Journée entière' : '📆 Période'}
                </button>)}
            </div>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" value={blockForm.date} onChange={e => setBlockForm(f => ({
            ...f,
            date: e.target.value
          }))} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Début</label>
              <input type="time" value={blockForm.debut} onChange={e => setBlockForm(f => ({
              ...f,
              debut: e.target.value
            }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Fin</label>
              <input type="time" value={blockForm.fin} onChange={e => setBlockForm(f => ({
              ...f,
              fin: e.target.value
            }))} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Raison (optionnel)</label>
            <input type="text" placeholder="ex: Entretien matériel, Formation, Personnel…" value={blockForm.raison} onChange={e => setBlockForm(f => ({
            ...f,
            raison: e.target.value
          }))} className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowBlockModal(false)} className="flex-1 py-2.5 border border-[#e0d4c4] rounded-lg text-sm text-[#7a6a58] hover:border-[#c9a96e] font-medium transition-all">Annuler</button>
            <button onClick={handleAddBlock} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
              <Lock size={14} /><span>Bloquer</span>
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Exception Modal */}
      <ModalWrapper open={showExceptionModal} onClose={() => setShowExceptionModal(false)} title="Créer une exception" subtitle="Modifier le comportement d'un jour précis">
        <div className="p-6 space-y-4">
          <div>
            <label className={labelClass}>Type d'exception</label>
            <div className="space-y-2">
              {(['fermeture', 'ouverture', 'horaires-modifies'] as ExceptionType[]).map(t => {
              const cfg = EXCEPTION_CONFIG[t];
              return <button key={t} onClick={() => setExcForm(f => ({
                ...f,
                type: t
              }))} className={cn('w-full px-4 py-3 rounded-xl border text-left transition-all text-sm font-semibold', excForm.type === t ? 'bg-[#1a1410] border-[#1a1410] text-[#c9a96e]' : `${cfg.bg} ${cfg.color} hover:opacity-80`)}>
                    {cfg.label}
                  </button>;
            })}
            </div>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" value={excForm.date} onChange={e => setExcForm(f => ({
            ...f,
            date: e.target.value
          }))} className={inputClass} />
          </div>
          {excForm.type !== 'fermeture' && <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Heure début</label>
                <input type="time" value={excForm.debut} onChange={e => setExcForm(f => ({
              ...f,
              debut: e.target.value
            }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Heure fin</label>
                <input type="time" value={excForm.fin} onChange={e => setExcForm(f => ({
              ...f,
              fin: e.target.value
            }))} className={inputClass} />
              </div>
            </div>}
          <div>
            <label className={labelClass}>Raison / Motif</label>
            <input type="text" placeholder="ex: Formation, Dimanche Saint-Valentin, Fermeture exceptionnelle…" value={excForm.raison} onChange={e => setExcForm(f => ({
            ...f,
            raison: e.target.value
          }))} className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowExceptionModal(false)} className="flex-1 py-2.5 border border-[#e0d4c4] rounded-lg text-sm text-[#7a6a58] hover:border-[#c9a96e] font-medium transition-all">Annuler</button>
            <button onClick={handleAddException} className="flex-1 py-2.5 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
              <Zap size={14} /><span>Enregistrer</span>
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Vacances Modal */}
      <ModalWrapper open={showVacancesModal} onClose={() => setShowVacancesModal(false)} title="Ajouter des vacances" subtitle="Bloquer une période entière">
        <div className="p-6 space-y-4">
          <div>
            <label className={labelClass}>Libellé</label>
            <input type="text" placeholder="ex: Vacances d'été, Congé Noël, Fermeture annuelle…" value={vacForm.label} onChange={e => setVacForm(f => ({
            ...f,
            label: e.target.value
          }))} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Date de début</label>
              <input type="date" value={vacForm.debut} onChange={e => setVacForm(f => ({
              ...f,
              debut: e.target.value
            }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date de fin</label>
              <input type="date" value={vacForm.fin} onChange={e => setVacForm(f => ({
              ...f,
              fin: e.target.value
            }))} className={inputClass} />
            </div>
          </div>
          {vacForm.debut && vacForm.fin && vacForm.debut <= vacForm.fin && <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5">
              <Info size={14} className="text-amber-600 flex-shrink-0" />
              <p className="text-amber-700 text-xs">
                Cette période bloquera <span className="font-bold">
                  {Math.ceil((new Date(vacForm.fin).getTime() - new Date(vacForm.debut).getTime()) / 86400000) + 1}
                </span> jour(s) dans le calendrier de réservation.
              </p>
            </div>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowVacancesModal(false)} className="flex-1 py-2.5 border border-[#e0d4c4] rounded-lg text-sm text-[#7a6a58] hover:border-[#c9a96e] font-medium transition-all">Annuler</button>
            <button onClick={handleAddVacances} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
              <Sun size={14} /><span>Ajouter la période</span>
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>;
};