import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, CheckCircle2, Calendar, Clock, Bell, Edit3, LogOut, X, ArrowRight, Scissors, Star, ChevronRight, Check, AlertCircle, MapPin, MessageCircle, ToggleLeft, ToggleRight, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface Booking {
  id: string;
  prestation: string;
  date: string;
  heure: string;
  statut: 'a-venir' | 'terminee' | 'annulee';
  prix: number;
}
interface Notification {
  id: string;
  type: 'rappel' | 'confirmation' | 'promo' | 'info';
  msg: string;
  date: string;
  read: boolean;
}
const SAMPLE_BOOKINGS: Booking[] = [{
  id: 'SLK-A01',
  prestation: 'Box Braids',
  date: '2025-02-15',
  heure: '10h00',
  statut: 'a-venir',
  prix: 120
}, {
  id: 'SLK-A02',
  prestation: 'Knotless Braids',
  date: '2025-01-20',
  heure: '09h00',
  statut: 'terminee',
  prix: 140
}, {
  id: 'SLK-A03',
  prestation: 'Retwist',
  date: '2024-12-10',
  heure: '14h00',
  statut: 'terminee',
  prix: 65
}, {
  id: 'SLK-A04',
  prestation: 'Nattes Collées',
  date: '2024-11-05',
  heure: '11h30',
  statut: 'annulee',
  prix: 45
}];
const SAMPLE_NOTIFS: Notification[] = [{
  id: 'n1',
  type: 'rappel',
  msg: 'Rappel : votre RDV Box Braids est dans 24h (15/02 à 10h00)',
  date: '14/02/2025',
  read: false
}, {
  id: 'n2',
  type: 'confirmation',
  msg: 'Votre réservation Box Braids du 15/02 a été confirmée.',
  date: '10/02/2025',
  read: false
}, {
  id: 'n3',
  type: 'promo',
  msg: "Offre spéciale : -10% sur votre prochain retwist ! Valable jusqu'au 28/02.",
  date: '08/02/2025',
  read: true
}, {
  id: 'n4',
  type: 'info',
  msg: 'Sleekhair est fermée du 17 au 21 février (vacances d\'hiver).',
  date: '05/02/2025',
  read: true
}, {
  id: 'n5',
  type: 'confirmation',
  msg: 'Votre Knotless Braids du 20/01 est terminée. Merci et à bientôt !',
  date: '20/01/2025',
  read: true
}];
const NOTIF_CONFIG = {
  rappel: {
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    icon: Bell
  },
  confirmation: {
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    icon: CheckCircle2
  },
  promo: {
    color: 'bg-[#f5ede0] border-[#e0d4c4] text-[#8b6336]',
    icon: Star
  },
  info: {
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    icon: AlertCircle
  }
};
const STATUS_CONFIG = {
  'a-venir': {
    label: 'À venir',
    color: 'bg-[#f5ede0] text-[#8b6336] border-[#d4b896]'
  },
  terminee: {
    label: 'Terminée',
    color: 'bg-slate-50 text-slate-600 border-slate-200'
  },
  annulee: {
    label: 'Annulée',
    color: 'bg-red-50 text-red-600 border-red-200'
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────

const MembreLogin: React.FC<{
  onLogin: () => void;
  onBack: () => void;
}> = ({
  onLogin,
  onBack
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [loading, setLoading] = useState(false);
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };
  return <div className="min-h-screen bg-[#0f0d0b] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold uppercase tracking-widest mb-8 transition-colors">
          <ChevronRight size={13} className="rotate-180" /><span>Retour</span>
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center mb-4 shadow-xl">
            <Scissors size={20} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Espace Membre</h1>
          <p className="text-white/40 text-sm mt-1">Sleekhair · Croix-Rousse Lyon</p>
        </div>

        {/* Tab */}
        <div className="flex bg-[#1a1410] border border-white/8 rounded-xl p-1 mb-6">
          {(['login', 'register'] as const).map(m => <button key={m} onClick={() => setMode(m)} className={cn('flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all', mode === m ? 'bg-[#c9a96e] text-[#0f0d0b]' : 'text-white/40 hover:text-white/70')} style={{
          letterSpacing: '0.1em'
        }}>
              {m === 'login' ? 'Se connecter' : "S'inscrire"}
            </button>)}
        </div>

        <form onSubmit={handle} className="bg-[#1a1410] border border-white/8 rounded-2xl p-7 space-y-4">
          {mode === 'register' && <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 text-[10px] font-semibold uppercase mb-1.5" style={{
              letterSpacing: '0.1em'
            }}>Prénom</label>
                <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prénom" className="w-full px-3.5 py-2.5 bg-[#0f0d0b] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all" />
              </div>
              <div>
                <label className="block text-white/60 text-[10px] font-semibold uppercase mb-1.5" style={{
              letterSpacing: '0.1em'
            }}>Nom</label>
                <input type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" className="w-full px-3.5 py-2.5 bg-[#0f0d0b] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all" />
              </div>
            </div>}

          <div>
            <label className="block text-white/60 text-[10px] font-semibold uppercase mb-1.5" style={{
            letterSpacing: '0.1em'
          }}>Email</label>
            <div className="relative">
              <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" className="w-full pl-9 pr-4 py-2.5 bg-[#0f0d0b] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-[10px] font-semibold uppercase mb-1.5" style={{
            letterSpacing: '0.1em'
          }}>Mot de passe</label>
            <div className="relative">
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-9 pr-4 py-2.5 bg-[#0f0d0b] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] font-bold text-sm uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 mt-2" style={{
          letterSpacing: '0.12em'
        }}>
            {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <span>{mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>}
          </button>

          {mode === 'login' && <button type="button" className="w-full text-center text-white/30 hover:text-white/60 text-xs transition-colors">Mot de passe oublié ?</button>}
        </form>
      </div>
    </div>;
};

// ─── Main Membre Component ────────────────────────────────────────────────────

interface SleekhairMembreProps {
  onGoHome: () => void;
  onReserve: () => void;
}
type MembrePage = 'dashboard' | 'reservations' | 'notifications' | 'profil' | 'parametres';
export const SleekhairMembre: React.FC<SleekhairMembreProps> = ({
  onGoHome,
  onReserve
}) => {
  const [logged, setLogged] = useState(false);
  const [page, setPage] = useState<MembrePage>('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFS);
  const [editProfil, setEditProfil] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifSms, setNotifSms] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPromo, setNotifPromo] = useState(true);
  const unread = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({
    ...n,
    read: true
  })));
  const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));
  const handleSave = () => {
    setSaved(true);
    setEditProfil(false);
    setTimeout(() => setSaved(false), 2000);
  };
  if (!logged) return <MembreLogin onLogin={() => setLogged(true)} onBack={onGoHome} />;
  const nextBooking = SAMPLE_BOOKINGS.find(b => b.statut === 'a-venir');
  const totalSpent = SAMPLE_BOOKINGS.filter(b => b.statut === 'terminee').reduce((s, b) => s + b.prix, 0);
  const NAV: Array<{
    id: MembrePage;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }> = [{
    id: 'dashboard',
    label: 'Accueil',
    icon: User
  }, {
    id: 'reservations',
    label: 'Mes RDV',
    icon: Calendar
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    badge: unread > 0 ? unread : undefined
  }, {
    id: 'profil',
    label: 'Mon profil',
    icon: Edit3
  }, {
    id: 'parametres',
    label: 'Paramètres',
    icon: Lock
  }];
  return <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#0f0d0b] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center">
            <Scissors size={13} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm" style={{
            fontFamily: 'Georgia, serif'
          }}>Sleekhair</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest">Espace Membre</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onGoHome} className="text-white/40 hover:text-white/70 text-xs font-semibold uppercase transition-colors flex items-center gap-1.5">
            <ArrowRight size={12} className="rotate-180" /><span className="hidden sm:inline">Site</span>
          </button>
          <button onClick={() => setLogged(false)} className="text-white/40 hover:text-red-400 text-xs transition-colors">
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {/* Bottom nav mobile / Side nav desktop */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex flex-col w-56 bg-white border-r border-[#e8ddd0] py-6 px-3 flex-shrink-0">
          <div className="flex items-center gap-3 px-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
            <div className="min-w-0">
              <p className="text-[#1a1410] font-bold text-sm truncate">Aminata K.</p>
              <p className="text-[#a08060] text-xs truncate">Cliente fidèle ★</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {NAV.map(item => <button key={item.id} onClick={() => setPage(item.id)} className={cn('w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative', page === item.id ? 'bg-[#f5ede0] text-[#8b6336]' : 'text-[#6b5a48] hover:bg-[#faf8f5] hover:text-[#1a1410]')}>
                <item.icon size={16} />
                <span>{item.label}</span>
                {item.badge && <span className="ml-auto w-5 h-5 rounded-full bg-[#c9a96e] text-[#0f0d0b] text-[10px] font-bold flex items-center justify-center">{item.badge}</span>}
              </button>)}
          </nav>
          <button onClick={onReserve} className="mx-3 mt-4 py-3 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-xs font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2" style={{
          letterSpacing: '0.1em'
        }}>
            <Calendar size={13} /><span>Réserver</span>
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{
            opacity: 0,
            y: 12
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -8
          }} transition={{
            duration: 0.25
          }} className="p-5 md:p-8 max-w-3xl">

              {/* Dashboard */}
              {page === 'dashboard' && <div className="space-y-6">
                  <div>
                    <h1 className="text-[#1a1410] text-2xl font-bold" style={{
                  fontFamily: 'Georgia, serif'
                }}>Bonjour, Aminata 👋</h1>
                    <p className="text-[#a08060] text-sm mt-1">Bienvenue dans votre espace membre Sleekhair.</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[{
                  label: 'Réservations',
                  value: String(SAMPLE_BOOKINGS.filter(b => b.statut === 'terminee').length),
                  sub: 'Terminées',
                  accent: true
                }, {
                  label: 'Total dépensé',
                  value: `${totalSpent}€`,
                  sub: 'Estimé',
                  accent: false
                }, {
                  label: 'Statut',
                  value: '★ Fidèle',
                  sub: 'Cliente régulière',
                  accent: false
                }].map(stat => <div key={stat.label} className={cn('rounded-xl p-5 border', stat.accent ? 'bg-[#1a1410] border-[#3a2e20]' : 'bg-white border-[#e8ddd0]')}>
                        <p className={cn('text-2xl font-bold', stat.accent ? 'text-[#c9a96e]' : 'text-[#1a1410]')} style={{
                    fontFamily: 'Georgia, serif'
                  }}>{stat.value}</p>
                        <p className={cn('text-xs font-semibold uppercase mt-0.5', stat.accent ? 'text-white/40' : 'text-[#a08060]')} style={{
                    letterSpacing: '0.1em'
                  }}>{stat.label}</p>
                        <p className={cn('text-xs mt-1', stat.accent ? 'text-white/30' : 'text-[#b0a090]')}>{stat.sub}</p>
                      </div>)}
                  </div>

                  {/* Next booking */}
                  {nextBooking && <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
                      <p className="text-[#a08060] text-[10px] font-semibold uppercase mb-3" style={{
                  letterSpacing: '0.12em'
                }}>Prochain rendez-vous</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center flex-shrink-0">
                          <Scissors size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#1a1410] font-bold text-base" style={{
                      fontFamily: 'Georgia, serif'
                    }}>{nextBooking.prestation}</p>
                          <p className="text-[#a08060] text-sm">{new Date(nextBooking.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })} à {nextBooking.heure}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#8b6336] font-bold text-lg">{nextBooking.prix}€</p>
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#f5ede0] text-[#8b6336] border border-[#d4b896]">À venir</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#f0e6d8] flex items-center gap-2.5">
                        <MapPin size={13} className="text-[#c9a96e]" />
                        <p className="text-[#7a6a58] text-xs">Croix-Rousse, Lyon 1er — Métro C (2 min)</p>
                      </div>
                    </div>}

                  {/* Quick actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button onClick={onReserve} className="flex items-center gap-3 p-4 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] rounded-xl transition-all group">
                      <Calendar size={20} />
                      <div className="text-left">
                        <p className="font-bold text-sm">Nouvelle réservation</p>
                        <p className="text-[10px] opacity-70">Choisir prestation et créneau</p>
                      </div>
                      <ChevronRight size={16} className="ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button onClick={() => setPage('notifications')} className="flex items-center gap-3 p-4 bg-white border border-[#e8ddd0] hover:border-[#c9a96e]/50 text-[#1a1410] rounded-xl transition-all group">
                      <Bell size={20} className="text-[#8b6336]" />
                      <div className="text-left">
                        <p className="font-bold text-sm">Notifications</p>
                        <p className="text-[#a08060] text-[10px]">{unread > 0 ? `${unread} non lue${unread > 1 ? 's' : ''}` : 'Tout à jour'}</p>
                      </div>
                      {unread > 0 && <span className="ml-auto w-6 h-6 rounded-full bg-[#c9a96e] text-[#0f0d0b] text-xs font-bold flex items-center justify-center">{unread}</span>}
                    </button>
                  </div>
                </div>}

              {/* Reservations */}
              {page === 'reservations' && <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-[#1a1410] text-2xl font-bold" style={{
                    fontFamily: 'Georgia, serif'
                  }}>Mes rendez-vous</h1>
                      <p className="text-[#a08060] text-sm mt-1">{SAMPLE_BOOKINGS.length} réservations</p>
                    </div>
                    <button onClick={onReserve} className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-xs font-bold uppercase px-4 py-2.5 rounded-lg transition-all" style={{
                  letterSpacing: '0.1em'
                }}>
                      <Calendar size={13} /><span>Réserver</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {SAMPLE_BOOKINGS.map(b => <div key={b.id} className="bg-white border border-[#e8ddd0] rounded-xl p-5 hover:border-[#c9a96e]/40 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#f5ede0] flex items-center justify-center flex-shrink-0">
                            <Scissors size={16} className="text-[#8b6336]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <p className="text-[#1a1410] font-bold text-sm" style={{
                          fontFamily: 'Georgia, serif'
                        }}>{b.prestation}</p>
                              <span className={cn('text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border', STATUS_CONFIG[b.statut].color)}>{STATUS_CONFIG[b.statut].label}</span>
                            </div>
                            <p className="text-[#a08060] text-xs">{new Date(b.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })} · {b.heure}</p>
                            <p className="text-[#c4b4a0] text-[11px] mt-0.5">{b.id}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[#1a1410] font-bold text-base">{b.prix}€</p>
                            {b.statut === 'a-venir' && <button className="text-[10px] text-red-400 hover:text-red-600 font-semibold mt-1 transition-colors">Annuler</button>}
                          </div>
                        </div>
                        {b.statut === 'a-venir' && <div className="mt-3 pt-3 border-t border-[#f0e6d8] flex items-center gap-2">
                            <MapPin size={12} className="text-[#c9a96e] flex-shrink-0" />
                            <p className="text-[#7a6a58] text-xs">Croix-Rousse, Lyon 1er — Métro C</p>
                            <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1.5 text-[10px] text-[#25D366] hover:underline">
                              <MessageCircle size={11} /><span>Contact</span>
                            </a>
                          </div>}
                      </div>)}
                  </div>
                </div>}

              {/* Notifications */}
              {page === 'notifications' && <div className="space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h1 className="text-[#1a1410] text-2xl font-bold" style={{
                    fontFamily: 'Georgia, serif'
                  }}>Notifications</h1>
                      <p className="text-[#a08060] text-sm mt-1">{unread > 0 ? `${unread} non lue${unread > 1 ? 's' : ''}` : 'Toutes lues'}</p>
                    </div>
                    {unread > 0 && <button onClick={markAllRead} className="text-xs font-semibold text-[#8b6336] hover:underline uppercase tracking-widest">Tout marquer lu</button>}
                  </div>

                  <div className="space-y-3">
                    {notifications.map(notif => {
                  const cfg = NOTIF_CONFIG[notif.type];
                  return <div key={notif.id} className={cn('flex items-start gap-3 p-4 rounded-xl border transition-all', cfg.color, !notif.read && 'ring-1 ring-[#c9a96e]/30')}>
                          {!notif.read && <div className="w-2 h-2 rounded-full bg-[#c9a96e] mt-1.5 flex-shrink-0" />}
                          <cfg.icon size={15} className="mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed">{notif.msg}</p>
                            <p className="text-[10px] opacity-60 mt-1">{notif.date}</p>
                          </div>
                          <button onClick={() => deleteNotif(notif.id)} className="text-current opacity-40 hover:opacity-80 transition-opacity flex-shrink-0 mt-0.5">
                            <X size={14} />
                          </button>
                        </div>;
                })}
                    {notifications.length === 0 && <div className="text-center py-16">
                        <Bell size={32} className="text-[#d4c4b0] mx-auto mb-3" />
                        <p className="text-[#a08060] text-sm">Aucune notification</p>
                      </div>}
                  </div>
                </div>}

              {/* Profil */}
              {page === 'profil' && <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-[#1a1410] text-2xl font-bold" style={{
                    fontFamily: 'Georgia, serif'
                  }}>Mon profil</h1>
                      <p className="text-[#a08060] text-sm mt-1">Gérez vos informations personnelles</p>
                    </div>
                    <button onClick={() => editProfil ? handleSave() : setEditProfil(true)} className={cn('flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all', saved ? 'bg-emerald-500 text-white' : 'bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b]')} style={{
                  letterSpacing: '0.1em'
                }}>
                      {saved ? <><CheckCircle2 size={13} /><span>Enregistré</span></> : editProfil ? <><Save size={13} /><span>Sauvegarder</span></> : <><Edit3 size={13} /><span>Modifier</span></>}
                    </button>
                  </div>

                  <div className="bg-white border border-[#e8ddd0] rounded-xl p-6 space-y-5">
                    <div className="flex items-center gap-5 pb-5 border-b border-[#f0e6d8]">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0" style={{
                    fontFamily: 'Georgia, serif'
                  }}>A</div>
                      <div>
                        <p className="text-[#1a1410] font-bold text-xl" style={{
                      fontFamily: 'Georgia, serif'
                    }}>Aminata Konaté</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#f5ede0] text-[#8b6336] border border-[#d4b896]">★ Cliente fidèle</span>
                          <span className="text-[#a08060] text-xs">Membre depuis Jan. 2024</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[{
                    label: 'Prénom',
                    value: 'Aminata',
                    key: 'prenom'
                  }, {
                    label: 'Nom',
                    value: 'Konaté',
                    key: 'nom'
                  }, {
                    label: 'Téléphone',
                    value: '+33 6 11 22 33 44',
                    key: 'tel'
                  }, {
                    label: 'Email',
                    value: 'aminata@email.com',
                    key: 'email'
                  }].map(field => <div key={field.key}>
                          <label className="block text-[#a08060] text-[10px] font-semibold uppercase mb-1.5" style={{
                      letterSpacing: '0.1em'
                    }}>{field.label}</label>
                          {editProfil ? <input type="text" defaultValue={field.value} className="w-full px-3.5 py-2.5 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410]" /> : <p className="text-[#1a1410] text-sm font-medium">{field.value}</p>}
                        </div>)}
                    </div>
                  </div>
                </div>}

              {/* Paramètres */}
              {page === 'parametres' && <div className="space-y-6">
                  <div>
                    <h1 className="text-[#1a1410] text-2xl font-bold" style={{
                  fontFamily: 'Georgia, serif'
                }}>Paramètres</h1>
                    <p className="text-[#a08060] text-sm mt-1">Préférences de notifications et compte</p>
                  </div>

                  <div className="bg-white border border-[#e8ddd0] rounded-xl p-6 space-y-5">
                    <h2 className="text-[#1a1410] font-bold text-base pb-3 border-b border-[#f0e6d8]" style={{
                  fontFamily: 'Georgia, serif'
                }}>Notifications</h2>
                    {[{
                  label: 'Rappel par email (24h avant)',
                  sub: 'Recevez un email de rappel avant chaque rendez-vous',
                  state: notifEmail,
                  toggle: () => setNotifEmail(v => !v)
                }, {
                  label: 'Rappel par SMS (2h avant)',
                  sub: 'Recevez un SMS de rappel 2h avant votre rendez-vous',
                  state: notifSms,
                  toggle: () => setNotifSms(v => !v)
                }, {
                  label: 'Promotions & actualités',
                  sub: 'Offres spéciales, nouveautés et événements Sleekhair',
                  state: notifPromo,
                  toggle: () => setNotifPromo(v => !v)
                }].map(opt => <div key={opt.label} className="flex items-start justify-between gap-4 p-3.5 bg-[#faf8f5] rounded-lg border border-[#f0e6d8]">
                        <div>
                          <p className="text-[#1a1410] text-sm font-semibold">{opt.label}</p>
                          <p className="text-[#a08060] text-xs mt-0.5">{opt.sub}</p>
                        </div>
                        <button onClick={opt.toggle} className={cn('w-10 h-6 rounded-full flex items-center cursor-pointer transition-all duration-300 flex-shrink-0 relative', opt.state ? 'bg-[#c9a96e]' : 'bg-[#e0d4c4]')} aria-label={opt.label}>
                          <div className={cn('w-5 h-5 rounded-full bg-white shadow-sm absolute transition-all duration-300', opt.state ? 'left-[18px]' : 'left-[2px]')} />
                        </button>
                      </div>)}
                  </div>

                  <div className="bg-white border border-[#e8ddd0] rounded-xl p-6 space-y-4">
                    <h2 className="text-[#1a1410] font-bold text-base pb-3 border-b border-[#f0e6d8]" style={{
                  fontFamily: 'Georgia, serif'
                }}>Compte</h2>
                    <button className="w-full flex items-center justify-between p-3.5 bg-[#faf8f5] rounded-lg border border-[#f0e6d8] hover:border-[#c9a96e]/40 transition-all group">
                      <div className="flex items-center gap-3">
                        <Lock size={15} className="text-[#8b6336]" />
                        <p className="text-[#1a1410] text-sm font-semibold">Changer le mot de passe</p>
                      </div>
                      <ChevronRight size={15} className="text-[#c4b4a0] group-hover:text-[#8b6336] transition-colors" />
                    </button>
                    <button onClick={() => setLogged(false)} className="w-full flex items-center justify-between p-3.5 bg-red-50 rounded-lg border border-red-100 hover:border-red-200 transition-all group">
                      <div className="flex items-center gap-3">
                        <LogOut size={15} className="text-red-500" />
                        <p className="text-red-600 text-sm font-semibold">Se déconnecter</p>
                      </div>
                      <ChevronRight size={15} className="text-red-300 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </div>}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8ddd0] flex z-30">
        {NAV.map(item => <button key={item.id} onClick={() => setPage(item.id)} className={cn('flex-1 flex flex-col items-center justify-center py-3 gap-1 relative transition-colors', page === item.id ? 'text-[#8b6336]' : 'text-[#a08060]')}>
            <item.icon size={18} />
            <span className="text-[9px] font-semibold">{item.label}</span>
            {item.badge && <span className="absolute top-2 right-1/2 translate-x-3 -translate-y-0 w-4 h-4 rounded-full bg-[#c9a96e] text-[#0f0d0b] text-[9px] font-bold flex items-center justify-center">{item.badge}</span>}
            {page === item.id && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#c9a96e] rounded-full" />}
          </button>)}
      </nav>
    </div>;
};