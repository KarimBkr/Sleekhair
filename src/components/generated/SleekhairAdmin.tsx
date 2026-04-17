import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Scissors, Settings, LogOut, Menu, X, ChevronLeft, Lock, Mail, CheckCircle, XCircle, AlertCircle, Eye, EyeOff, Phone, ChevronRight, Plus, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SleekhairDisponibilites } from './SleekhairDisponibilites';

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminPage = 'agenda' | 'disponibilites' | 'prestations' | 'parametres';
type ReservationStatus = 'confirmee' | 'en-attente' | 'annulee' | 'terminee';
interface Reservation {
  id: string;
  clientPrenom: string;
  clientNom: string;
  tel: string;
  prestation: string;
  date: string;
  heure: string;
  duree: string;
  prix: number;
  statut: ReservationStatus;
  note: string;
}
interface Prestation {
  id: string;
  nom: string;
  categorie: string;
  prix: number;
  duree: string;
  visible: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RESERVATIONS: Reservation[] = [{
  id: 'r1',
  clientPrenom: 'Aminata',
  clientNom: 'Konaté',
  tel: '+33 6 11 22 33 44',
  prestation: 'Knotless Braids',
  date: '2025-01-28',
  heure: '09h00',
  duree: '5h30',
  prix: 120,
  statut: 'confirmee',
  note: 'Longueur taille'
}, {
  id: 'r2',
  clientPrenom: 'Jordan',
  clientNom: 'Mbeki',
  tel: '+33 6 22 33 44 55',
  prestation: 'Cornrows Homme',
  date: '2025-01-28',
  heure: '11h00',
  duree: '2h00',
  prix: 55,
  statut: 'confirmee',
  note: 'Design courbes'
}, {
  id: 'r3',
  clientPrenom: 'Fatou',
  clientNom: 'Diallo',
  tel: '+33 6 33 44 55 66',
  prestation: 'Knotless Braids',
  date: '2025-01-28',
  heure: '14h30',
  duree: '6h00',
  prix: 145,
  statut: 'en-attente',
  note: 'Photo référence envoyée'
}, {
  id: 'r4',
  clientPrenom: 'Théo',
  clientNom: 'Ndiaye',
  tel: '+33 6 66 77 88 99',
  prestation: 'Départ de Locks',
  date: '2025-01-29',
  heure: '09h30',
  duree: '4h30',
  prix: 100,
  statut: 'confirmee',
  note: 'Sections moyennes'
}, {
  id: 'r5',
  clientPrenom: 'Mariam',
  clientNom: 'Camara',
  tel: '+33 6 77 88 99 00',
  prestation: 'Flat twist',
  date: '2025-01-29',
  heure: '14h00',
  duree: '1h30',
  prix: 50,
  statut: 'en-attente',
  note: 'Avec motifs'
}, {
  id: 'r6',
  clientPrenom: 'Kevin',
  clientNom: 'Touré',
  tel: '+33 6 44 55 66 77',
  prestation: 'Retwist',
  date: '2025-01-27',
  heure: '10h00',
  duree: '2h30',
  prix: 65,
  statut: 'terminee',
  note: ''
}, {
  id: 'r7',
  clientPrenom: 'Laïla',
  clientNom: 'Sow',
  tel: '+33 6 55 66 77 88',
  prestation: 'Fulanis',
  date: '2025-01-27',
  heure: '13h00',
  duree: '3h30',
  prix: 75,
  statut: 'annulee',
  note: 'Annulée 3h avant'
}];
const PRESTATIONS_INIT: Prestation[] = [{
  id: 'p1',
  nom: 'Nattes Collées Simples',
  categorie: 'Braids',
  prix: 45,
  duree: '2h – 3h',
  visible: true
}, {
  id: 'p2',
  nom: 'Knotless Braids',
  categorie: 'Braids',
  prix: 100,
  duree: '4h – 7h',
  visible: true
}, {
  id: 'p3',
  nom: 'Knotless Braids',
  categorie: 'Braids',
  prix: 120,
  duree: '5h – 8h',
  visible: true
}, {
  id: 'p4',
  nom: 'Boho Braids',
  categorie: 'Braids',
  prix: 140,
  duree: '6h – 9h',
  visible: true
}, {
  id: 'p5',
  nom: 'Fulanis',
  categorie: 'Braids',
  prix: 65,
  duree: '3h – 4h',
  visible: true
}, {
  id: 'p6',
  nom: 'Cornrows Femme',
  categorie: 'Braids',
  prix: 45,
  duree: '1h – 2h',
  visible: true
}, {
  id: 'p7',
  nom: 'Cornrows Homme',
  categorie: 'Braids',
  prix: 40,
  duree: '1h30 – 2h',
  visible: true
}, {
  id: 'p8',
  nom: 'Départ de Locks',
  categorie: 'Locks',
  prix: 80,
  duree: '3h – 6h',
  visible: true
}, {
  id: 'p9',
  nom: 'Retwist',
  categorie: 'Locks',
  prix: 40,
  duree: '1h30 – 3h',
  visible: true
}, {
  id: 'p10',
  nom: 'Entretien Locks',
  categorie: 'Locks',
  prix: 60,
  duree: '2h – 4h',
  visible: true
}, {
  id: 'p11',
  nom: 'Flat twist',
  categorie: 'Twists',
  prix: 50,
  duree: '1h – 2h',
  visible: true
}, {
  id: 'p12',
  nom: 'Barrel Twists',
  categorie: 'Twists',
  prix: 60,
  duree: '2h – 3h',
  visible: false
}, {
  id: 'p13',
  nom: 'Soins Profonds',
  categorie: 'Soins',
  prix: 45,
  duree: '1h – 1h30',
  visible: true
}];

// ─── Status config ─────────────────────────────────────────────────────────────

const STATUS: Record<ReservationStatus, {
  label: string;
  color: string;
  dot: string;
}> = {
  confirmee: {
    label: 'Confirmée',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500'
  },
  'en-attente': {
    label: 'En attente',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-400'
  },
  annulee: {
    label: 'Annulée',
    color: 'bg-red-50 text-red-600 border-red-200',
    dot: 'bg-red-400'
  },
  terminee: {
    label: 'Terminée',
    color: 'bg-slate-50 text-slate-500 border-slate-200',
    dot: 'bg-slate-400'
  }
};
const NAV_ITEMS: Array<{
  id: AdminPage;
  label: string;
  icon: React.ElementType;
}> = [{
  id: 'agenda',
  label: 'Agenda',
  icon: Calendar
}, {
  id: 'disponibilites',
  label: 'Disponibilités',
  icon: Clock
}, {
  id: 'prestations',
  label: 'Prestations',
  icon: Scissors
}, {
  id: 'parametres',
  label: 'Paramètres',
  icon: Settings
}];

// ─── Tiny shared components ───────────────────────────────────────────────────

const StatusBadge: React.FC<{
  statut: ReservationStatus;
}> = ({
  statut
}) => {
  const s = STATUS[statut];
  return <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border', s.color)} style={{
    letterSpacing: '0.08em'
  }}>
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', s.dot)} />
      {s.label}
    </span>;
};

// ─── Login ────────────────────────────────────────────────────────────────────

const AdminLogin: React.FC<{
  onLogin: () => void;
}> = ({
  onLogin
}) => {
  const [email, setEmail] = useState('admin@sleekhair.fr');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Veuillez saisir votre mot de passe.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 900);
  };
  return <div className="min-h-screen bg-[#0f0d0b] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center mb-4 shadow-xl shadow-[#c9a96e]/20">
            <span className="text-white font-bold text-lg" style={{
            fontFamily: 'Georgia, serif'
          }}>S</span>
          </div>
          <h1 className="text-white text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Sleekhair</h1>
          <p className="text-white/40 text-sm mt-1">Espace professionnel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1410] border border-white/8 rounded-2xl p-7 space-y-5">
          <div>
            <label className="block text-white/50 text-xs font-semibold uppercase mb-2" style={{
            letterSpacing: '0.1em'
          }}>Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#0f0d0b] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs font-semibold uppercase mb-2" style={{
            letterSpacing: '0.1em'
          }}>Mot de passe</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-[#0f0d0b] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all" />
            </div>
          </div>

          {error && <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700/40 rounded-lg">
              <AlertCircle size={13} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>}

          <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#c9a96e] hover:bg-[#b8943e] active:scale-[0.98] text-[#0f0d0b] font-bold text-sm uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60" style={{
          letterSpacing: '0.12em'
        }}>
            {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <span>Se connecter</span>}
          </button>
        </form>
      </div>
    </div>;
};

// ─── Agenda Page ──────────────────────────────────────────────────────────────

const AgendaPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(RESERVATIONS);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [activeDate, setActiveDate] = useState('2025-01-28');
  const dates = [...new Set(RESERVATIONS.map(r => r.date))].sort();
  const dayRes = reservations.filter(r => r.date === activeDate);
  const pending = reservations.filter(r => r.statut === 'en-attente').length;
  const updateStatus = (id: string, statut: ReservationStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? {
      ...r,
      statut
    } : r));
    setSelected(prev => prev?.id === id ? {
      ...prev,
      statut
    } : prev);
  };
  const formatDate = (d: string) => {
    const dt = new Date(d);
    return dt.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-[#1a1410] text-2xl font-bold" style={{
        fontFamily: 'Georgia, serif'
      }}>Agenda</h1>
        <p className="text-[#a08060] text-sm mt-0.5">
          {pending > 0 ? <span className="text-amber-600 font-semibold">{pending} en attente de confirmation</span> : 'Tout est à jour ✓'}
        </p>
      </div>

      {/* Date tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {dates.map(d => <button key={d} onClick={() => setActiveDate(d)} className={cn('flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border', activeDate === d ? 'bg-[#1a1410] text-white border-[#1a1410]' : 'bg-white text-[#7a6a58] border-[#e0d4c4] hover:border-[#c9a96e]')}>
            {formatDate(d)}
          </button>)}
      </div>

      {/* Reservation list */}
      <div className="space-y-3">
        {dayRes.length === 0 && <div className="text-center py-16 text-[#c4b4a0] text-sm">Aucun rendez-vous ce jour</div>}
        {dayRes.map(r => <div key={r.id} onClick={() => setSelected(r)} className="bg-white border border-[#e8ddd0] rounded-xl p-4 flex items-center gap-4 hover:border-[#c9a96e]/50 hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.99]">
            {/* Time */}
            <div className="flex-shrink-0 text-center w-14">
              <p className="text-[#8b6336] font-bold text-sm">{r.heure}</p>
              <p className="text-[#c4b4a0] text-[10px]">{r.duree}</p>
            </div>
            <div className="w-px h-10 bg-[#e8ddd0] flex-shrink-0" />
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[#1a1410] font-semibold text-sm truncate">{r.clientPrenom} {r.clientNom}</p>
              <p className="text-[#a08060] text-xs truncate">{r.prestation}</p>
            </div>
            {/* Right */}
            <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
              <StatusBadge statut={r.statut} />
              <p className="text-[#1a1410] font-bold text-sm">{r.prix}€</p>
            </div>
            <ChevronRight size={14} className="text-[#c4b4a0] flex-shrink-0" />
          </div>)}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{
          y: 40,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} exit={{
          y: 40,
          opacity: 0
        }} transition={{
          type: 'spring',
          damping: 28,
          stiffness: 320
        }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="bg-[#1a1410] px-6 py-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[#c9a96e] text-xs font-semibold mb-0.5">{selected.heure} · {selected.duree}</p>
                  <h3 className="text-white font-bold text-lg leading-tight" style={{
                fontFamily: 'Georgia, serif'
              }}>
                    {selected.clientPrenom} {selected.clientNom}
                  </h3>
                  <p className="text-white/50 text-sm mt-0.5">{selected.prestation}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0">
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Contact */}
                <a href={`tel:${selected.tel}`} className="flex items-center gap-3 p-3.5 bg-[#faf8f5] rounded-xl border border-[#f0e6d8] hover:border-[#c9a96e]/40 transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-[#f5ede0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a96e]/15 transition-colors">
                    <Phone size={15} className="text-[#8b6336]" />
                  </div>
                  <div>
                    <p className="text-[#a08060] text-[10px] uppercase font-semibold" style={{
                  letterSpacing: '0.1em'
                }}>Téléphone</p>
                    <p className="text-[#1a1410] text-sm font-medium">{selected.tel}</p>
                  </div>
                </a>

                {/* Prix + note */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-[#faf8f5] rounded-xl border border-[#f0e6d8] text-center">
                    <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-1" style={{
                  letterSpacing: '0.1em'
                }}>Prix</p>
                    <p className="text-[#1a1410] font-bold text-xl" style={{
                  fontFamily: 'Georgia, serif'
                }}>{selected.prix}€</p>
                  </div>
                  <div className="p-3.5 bg-[#faf8f5] rounded-xl border border-[#f0e6d8] text-center">
                    <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-1" style={{
                  letterSpacing: '0.1em'
                }}>Durée</p>
                    <p className="text-[#1a1410] font-bold text-sm mt-0.5">{selected.duree}</p>
                  </div>
                </div>

                {selected.note && <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-amber-700 text-xs font-semibold uppercase mb-1" style={{
                letterSpacing: '0.08em'
              }}>Note</p>
                    <p className="text-amber-800 text-sm">{selected.note}</p>
                  </div>}

                {/* Status actions */}
                <div>
                  <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-3" style={{
                letterSpacing: '0.1em'
              }}>Statut de la réservation</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(STATUS) as ReservationStatus[]).map(s => <button key={s} onClick={() => updateStatus(selected.id, s)} className={cn('py-2.5 rounded-xl border text-xs font-bold uppercase transition-all duration-200 active:scale-95', selected.statut === s ? 'bg-[#1a1410] text-white border-[#1a1410]' : 'bg-white text-[#7a6a58] border-[#e0d4c4] hover:border-[#c9a96e] hover:text-[#8b6336]')} style={{
                  letterSpacing: '0.07em'
                }}>
                        {STATUS[s].label}
                      </button>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── Prestations Page ─────────────────────────────────────────────────────────

const PrestationsPage: React.FC = () => {
  const [prestations, setPrestations] = useState<Prestation[]>(PRESTATIONS_INIT);
  const [editing, setEditing] = useState<string | null>(null);
  const [editPrix, setEditPrix] = useState('');
  const [editDuree, setEditDuree] = useState('');
  const toggle = (id: string) => setPrestations(prev => prev.map(p => p.id === id ? {
    ...p,
    visible: !p.visible
  } : p));
  const openEdit = (p: Prestation) => {
    setEditing(p.id);
    setEditPrix(String(p.prix));
    setEditDuree(p.duree);
  };
  const saveEdit = (id: string) => {
    setPrestations(prev => prev.map(p => p.id === id ? {
      ...p,
      prix: Number(editPrix) || p.prix,
      duree: editDuree || p.duree
    } : p));
    setEditing(null);
  };
  const categories = [...new Set(prestations.map(p => p.categorie))];
  return <div className="space-y-6">
      <div>
        <h1 className="text-[#1a1410] text-2xl font-bold" style={{
        fontFamily: 'Georgia, serif'
      }}>Prestations</h1>
        <p className="text-[#a08060] text-sm mt-0.5">{prestations.filter(p => p.visible).length} visibles sur le site</p>
      </div>

      <div className="space-y-6">
        {categories.map(cat => <div key={cat}>
            <p className="text-[#8b6336] text-xs font-bold uppercase mb-3" style={{
          letterSpacing: '0.15em'
        }}>{cat}</p>
            <div className="space-y-2">
              {prestations.filter(p => p.categorie === cat).map(p => <div key={p.id} className={cn('bg-white border rounded-xl transition-all duration-200', p.visible ? 'border-[#e8ddd0]' : 'border-[#e8ddd0] opacity-50')}>
                  <div className="flex items-center gap-3 p-4">
                    {/* Visibility toggle */}
                    <button onClick={() => toggle(p.id)} className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200', p.visible ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-[#f0e6d8] text-[#c4b4a0] hover:bg-[#e8ddd0]')} title={p.visible ? 'Masquer du site' : 'Afficher sur le site'}>
                      {p.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>

                    {/* Name + details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1a1410] font-semibold text-sm truncate">{p.nom}</p>
                      <p className="text-[#a08060] text-xs">{p.duree} · <span className="font-semibold text-[#8b6336]">{p.prix}€</span></p>
                    </div>

                    {/* Edit button */}
                    <button onClick={() => editing === p.id ? setEditing(null) : openEdit(p)} className="text-[#a08060] hover:text-[#8b6336] text-xs font-semibold underline transition-colors flex-shrink-0">
                      {editing === p.id ? 'Annuler' : 'Modifier'}
                    </button>
                  </div>

                  {/* Inline edit */}
                  <AnimatePresence>
                    {editing === p.id && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.2
              }} className="overflow-hidden border-t border-[#f0e6d8]">
                        <div className="p-4 flex flex-col sm:flex-row gap-3">
                          <div className="flex-1">
                            <label className="block text-[#a08060] text-[10px] font-bold uppercase mb-1.5" style={{
                      letterSpacing: '0.1em'
                    }}>Prix (€)</label>
                            <input type="number" value={editPrix} onChange={e => setEditPrix(e.target.value)} className="w-full px-3 py-2.5 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410]" />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[#a08060] text-[10px] font-bold uppercase mb-1.5" style={{
                      letterSpacing: '0.1em'
                    }}>Durée</label>
                            <input type="text" value={editDuree} onChange={e => setEditDuree(e.target.value)} className="w-full px-3 py-2.5 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410]" />
                          </div>
                          <div className="flex items-end">
                            <button onClick={() => saveEdit(p.id)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] rounded-lg text-xs font-bold uppercase transition-all active:scale-95" style={{
                      letterSpacing: '0.1em'
                    }}>
                              <Save size={13} /><span>Enregistrer</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </div>)}
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── Parametres Page ──────────────────────────────────────────────────────────

const ParametresPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [tel, setTel] = useState('+33 6 12 34 56 78');
  const [email, setEmail] = useState('contact@sleekhair.fr');
  const [adresse, setAdresse] = useState('Croix-Rousse, Lyon 1er');
  const [rappel, setRappel] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const inputClass = "w-full px-4 py-2.5 border border-[#e0d4c4] rounded-xl text-sm focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410] bg-white transition-all";
  return <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-[#1a1410] text-2xl font-bold" style={{
        fontFamily: 'Georgia, serif'
      }}>Paramètres</h1>
        <p className="text-[#a08060] text-sm mt-0.5">Infos de contact & préférences</p>
      </div>

      {/* Contact */}
      <div className="bg-white border border-[#e8ddd0] rounded-2xl p-6 space-y-4">
        <h2 className="text-[#1a1410] font-bold text-sm" style={{
        fontFamily: 'Georgia, serif'
      }}>Mes coordonnées</h2>
        <div>
          <label className="block text-[#a08060] text-[10px] font-bold uppercase mb-1.5" style={{
          letterSpacing: '0.1em'
        }}>Téléphone / WhatsApp</label>
          <input type="tel" value={tel} onChange={e => setTel(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-[#a08060] text-[10px] font-bold uppercase mb-1.5" style={{
          letterSpacing: '0.1em'
        }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-[#a08060] text-[10px] font-bold uppercase mb-1.5" style={{
          letterSpacing: '0.1em'
        }}>Adresse (affichée sur le site)</label>
          <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Réservations */}
      <div className="bg-white border border-[#e8ddd0] rounded-2xl p-6 space-y-3">
        <h2 className="text-[#1a1410] font-bold text-sm" style={{
        fontFamily: 'Georgia, serif'
      }}>Réservations</h2>

        {[{
        label: 'Rappel automatique 24h avant',
        sub: 'Un SMS est envoyé à la cliente/client la veille',
        val: rappel,
        set: setRappel
      }, {
        label: 'Confirmation automatique',
        sub: 'Les réservations sont confirmées sans validation manuelle',
        val: autoConfirm,
        set: setAutoConfirm
      }].map(opt => <div key={opt.label} className="flex items-center justify-between gap-4 p-4 bg-[#faf8f5] rounded-xl border border-[#f0e6d8]">
            <div className="flex-1 min-w-0">
              <p className="text-[#1a1410] text-sm font-semibold">{opt.label}</p>
              <p className="text-[#a08060] text-xs mt-0.5">{opt.sub}</p>
            </div>
            <button onClick={() => opt.set(!opt.val)} className={cn('w-11 h-6 rounded-full relative transition-all duration-300 flex-shrink-0', opt.val ? 'bg-[#c9a96e]' : 'bg-[#e0d4c4]')} aria-label={opt.label}>
              <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300', opt.val ? 'left-[calc(100%-22px)]' : 'left-0.5')} />
            </button>
          </div>)}
      </div>

      <button onClick={handleSave} className={cn('w-full py-3.5 rounded-xl font-bold text-sm uppercase transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]', saved ? 'bg-emerald-500 text-white' : 'bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b]')} style={{
      letterSpacing: '0.12em'
    }}>
        {saved ? <><CheckCircle size={16} /><span>Enregistré !</span></> : <><Save size={16} /><span>Enregistrer</span></>}
      </button>
    </div>;
};

// ─── Main Admin Component ─────────────────────────────────────────────────────

interface SleekhairAdminProps {
  onGoHome?: () => void;
}
export const SleekhairAdmin: React.FC<SleekhairAdminProps> = ({
  onGoHome
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<AdminPage>('agenda');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }
  const pageContent: Record<AdminPage, React.ReactNode> = {
    agenda: <AgendaPage />,
    disponibilites: <SleekhairDisponibilites />,
    prestations: <PrestationsPage />,
    parametres: <ParametresPage />
  };
  return <div className="min-h-screen bg-[#faf8f5] flex">

      {/* Sidebar */}
      <aside className={cn('fixed inset-y-0 left-0 z-40 w-56 bg-[#0f0d0b] flex flex-col transition-transform duration-300 ease-in-out', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{
              fontFamily: 'Georgia, serif'
            }}>S</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{
              fontFamily: 'Georgia, serif'
            }}>Sleekhair</p>
              <p className="text-white/30 text-[10px] uppercase" style={{
              letterSpacing: '0.15em'
            }}>Pro</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(item => <li key={item.id}>
                <button onClick={() => {
              setCurrentPage(item.id);
              setSidebarOpen(false);
            }} className={cn('w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', currentPage === item.id ? 'bg-[#c9a96e]/15 text-[#c9a96e] border border-[#c9a96e]/20' : 'text-white/50 hover:text-white/85 hover:bg-white/5')}>
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              </li>)}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          {onGoHome && <button onClick={onGoHome} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 text-sm font-medium transition-all">
              <ChevronLeft size={16} />
              <span>Retour site</span>
            </button>}
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-900/10 text-sm font-medium transition-all">
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main area */}
      <div className="flex-1 flex flex-col lg:ml-56 min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#e8ddd0] px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-xl border border-[#e0d4c4] flex items-center justify-center text-[#7a6a58] hover:bg-[#f5ede0] transition-all active:scale-95">
              <Menu size={18} />
            </button>
            <h2 className="text-[#1a1410] font-bold text-base" style={{
            fontFamily: 'Georgia, serif'
          }}>
              {NAV_ITEMS.find(n => n.id === currentPage)?.label}
            </h2>
          </div>
          {/* User pill */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">A</div>
            <span className="hidden sm:block text-[#1a1410] text-xs font-semibold">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -6
          }} transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1]
          }}>
              {pageContent[currentPage]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>;
};