import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Calendar, Clock, Users, Image, Settings, BarChart2, LogOut, Menu, X, ChevronDown, ChevronRight, Bell, Search, CheckCircle, XCircle, AlertCircle, RefreshCw, Eye, Edit3, Trash2, Plus, Filter, Download, TrendingUp, TrendingDown, Star, Phone, Mail, MapPin, Scissors, Upload, ToggleLeft, ToggleRight, ArrowUpRight, ArrowDownRight, ChevronLeft, Lock, User, CheckSquare, Sliders, Instagram, Tag, DollarSign, EyeOff, MoreHorizontal, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { SleekhairDisponibilites } from './SleekhairDisponibilites';

// ─── Types ─────────────────────────────────────────────────────────────────

type AdminPage = 'dashboard' | 'reservations' | 'disponibilites' | 'prestations' | 'galerie' | 'clients' | 'parametres' | 'statistiques';
type ReservationStatus = 'confirmee' | 'en-attente' | 'annulee' | 'terminee' | 'absent';
interface Reservation {
  id: string;
  clientNom: string;
  clientPrenom: string;
  tel: string;
  email: string;
  prestation: string;
  categorie: string;
  genre: 'Femme' | 'Homme' | 'Unisexe';
  date: string;
  heure: string;
  duree: string;
  prix: number;
  statut: ReservationStatus;
  note: string;
}
interface Client {
  id: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  nbReservations: number;
  derniereVisite: string;
  prestationsFavorites: string[];
  statut: 'nouveau' | 'fidele';
  notes: string;
}
interface Prestation {
  id: string;
  nom: string;
  categorie: string;
  genre: 'Femme' | 'Homme' | 'Unisexe';
  description: string;
  prix: number;
  duree: string;
  image: string;
  visible: boolean;
  ordre: number;
  options: string[];
}
interface GaleriePhoto {
  id: string;
  url: string;
  titre: string;
  categorie: string;
  genre: 'Femme' | 'Homme' | 'Unisexe';
  style: string;
  carouselAccueil: boolean;
  visible: boolean;
  ordre: number;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const RESERVATIONS_DATA: Reservation[] = [{
  id: 'SLK-001',
  clientNom: 'Konaté',
  clientPrenom: 'Aminata',
  tel: '+33 6 11 22 33 44',
  email: 'aminata@email.com',
  prestation: 'Box Braids',
  categorie: 'Braids & Nattes',
  genre: 'Femme',
  date: '2025-01-28',
  heure: '09h00',
  duree: '5h30',
  prix: 120,
  statut: 'confirmee',
  note: 'Longueur taille'
}, {
  id: 'SLK-002',
  clientNom: 'Mbeki',
  clientPrenom: 'Jordan',
  tel: '+33 6 22 33 44 55',
  email: 'jordan@email.com',
  prestation: 'Cornrows Homme',
  categorie: 'Braids & Nattes',
  genre: 'Homme',
  date: '2025-01-28',
  heure: '11h00',
  duree: '2h00',
  prix: 55,
  statut: 'confirmee',
  note: 'Design courbes'
}, {
  id: 'SLK-003',
  clientNom: 'Diallo',
  clientPrenom: 'Fatou',
  tel: '+33 6 33 44 55 66',
  email: 'fatou@email.com',
  prestation: 'Knotless Braids',
  categorie: 'Braids & Nattes',
  genre: 'Femme',
  date: '2025-01-28',
  heure: '14h30',
  duree: '6h00',
  prix: 145,
  statut: 'en-attente',
  note: 'Photo référence envoyée'
}, {
  id: 'SLK-004',
  clientNom: 'Touré',
  clientPrenom: 'Kevin',
  tel: '+33 6 44 55 66 77',
  email: 'kevin@email.com',
  prestation: 'Retwist',
  categorie: 'Locks',
  genre: 'Unisexe',
  date: '2025-01-27',
  heure: '10h00',
  duree: '2h30',
  prix: 65,
  statut: 'terminee',
  note: ''
}, {
  id: 'SLK-005',
  clientNom: 'Sow',
  clientPrenom: 'Laïla',
  tel: '+33 6 55 66 77 88',
  email: 'laila@email.com',
  prestation: 'Fulanis',
  categorie: 'Braids & Nattes',
  genre: 'Femme',
  date: '2025-01-27',
  heure: '13h00',
  duree: '3h30',
  prix: 75,
  statut: 'annulee',
  note: 'Annulée 3h avant'
}, {
  id: 'SLK-006',
  clientNom: 'Ndiaye',
  clientPrenom: 'Théo',
  tel: '+33 6 66 77 88 99',
  email: 'theo@email.com',
  prestation: 'Départ de Locks',
  categorie: 'Locks',
  genre: 'Unisexe',
  date: '2025-01-29',
  heure: '09h30',
  duree: '4h30',
  prix: 100,
  statut: 'confirmee',
  note: 'Sections moyennes'
}, {
  id: 'SLK-007',
  clientNom: 'Camara',
  clientPrenom: 'Mariam',
  tel: '+33 6 77 88 99 00',
  email: 'mariam@email.com',
  prestation: 'Flat Twists',
  categorie: 'Twists',
  genre: 'Femme',
  date: '2025-01-29',
  heure: '14h00',
  duree: '1h30',
  prix: 50,
  statut: 'en-attente',
  note: 'Avec motifs'
}, {
  id: 'SLK-008',
  clientNom: 'Baldé',
  clientPrenom: 'Seydou',
  tel: '+33 6 88 99 00 11',
  email: 'seydou@email.com',
  prestation: 'Barrel Twists',
  categorie: 'Twists',
  genre: 'Homme',
  date: '2025-01-26',
  heure: '15h00',
  duree: '2h45',
  prix: 60,
  statut: 'absent',
  note: 'Pas de réponse'
}, {
  id: 'SLK-009',
  clientNom: 'Traoré',
  clientPrenom: 'Assa',
  tel: '+33 6 99 00 11 22',
  email: 'assa@email.com',
  prestation: 'Soins Profonds',
  categorie: 'Soins',
  genre: 'Unisexe',
  date: '2025-01-30',
  heure: '11h30',
  duree: '1h15',
  prix: 45,
  statut: 'confirmee',
  note: 'Vapeur capillaire'
}, {
  id: 'SLK-010',
  clientNom: 'Fall',
  clientPrenom: 'Ibrahima',
  tel: '+33 6 00 11 22 33',
  email: 'ibra@email.com',
  prestation: 'Entretien Locks',
  categorie: 'Locks',
  genre: 'Unisexe',
  date: '2025-01-30',
  heure: '16h00',
  duree: '3h30',
  prix: 90,
  statut: 'confirmee',
  note: 'Formule complète'
}];
const CLIENTS_DATA: Client[] = [{
  id: 'c1',
  nom: 'Konaté',
  prenom: 'Aminata',
  tel: '+33 6 11 22 33 44',
  email: 'aminata@email.com',
  nbReservations: 8,
  derniereVisite: '28/01/2025',
  prestationsFavorites: ['Box Braids', 'Knotless Braids'],
  statut: 'fidele',
  notes: 'Cliente régulière, préfère longueur taille'
}, {
  id: 'c2',
  nom: 'Mbeki',
  prenom: 'Jordan',
  tel: '+33 6 22 33 44 55',
  email: 'jordan@email.com',
  nbReservations: 3,
  derniereVisite: '28/01/2025',
  prestationsFavorites: ['Cornrows Homme'],
  statut: 'nouveau',
  notes: 'Aime les designs géométriques'
}, {
  id: 'c3',
  nom: 'Diallo',
  prenom: 'Fatou',
  tel: '+33 6 33 44 55 66',
  email: 'fatou@email.com',
  nbReservations: 12,
  derniereVisite: '15/01/2025',
  prestationsFavorites: ['Knotless Braids', 'Fulanis', 'Soins Profonds'],
  statut: 'fidele',
  notes: 'VIP - fidèle depuis 2023'
}, {
  id: 'c4',
  nom: 'Touré',
  prenom: 'Kevin',
  tel: '+33 6 44 55 66 77',
  email: 'kevin@email.com',
  nbReservations: 6,
  derniereVisite: '27/01/2025',
  prestationsFavorites: ['Retwist', 'Entretien Locks'],
  statut: 'fidele',
  notes: 'Locks depuis 2 ans, retwist mensuel'
}, {
  id: 'c5',
  nom: 'Sow',
  prenom: 'Laïla',
  tel: '+33 6 55 66 77 88',
  email: 'laila@email.com',
  nbReservations: 2,
  derniereVisite: '27/01/2025',
  prestationsFavorites: ['Fulanis'],
  statut: 'nouveau',
  notes: '1 annulation tardive'
}, {
  id: 'c6',
  nom: 'Ndiaye',
  prenom: 'Théo',
  tel: '+33 6 66 77 88 99',
  email: 'theo@email.com',
  nbReservations: 4,
  derniereVisite: '22/01/2025',
  prestationsFavorites: ['Départ de Locks'],
  statut: 'fidele',
  notes: 'Suit le protocole locks régulièrement'
}];
const PRESTATIONS_DATA: Prestation[] = [{
  id: 'pr1',
  nom: 'Nattes Collées Simples',
  categorie: 'Braids & Nattes',
  genre: 'Unisexe',
  description: 'Nattes collées nettes et soignées.',
  prix: 45,
  duree: '2h – 3h',
  image: 'https://images.unsplash.com/photo-1599948128020-9a44c7eb5b9c?w=200&q=80',
  visible: true,
  ordre: 1,
  options: ['Taille', 'Wash', 'Motifs']
}, {
  id: 'pr2',
  nom: 'Box Braids',
  categorie: 'Braids & Nattes',
  genre: 'Femme',
  description: 'Tresses carrées longues et volumineuses.',
  prix: 100,
  duree: '4h – 7h',
  image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=200&q=80',
  visible: true,
  ordre: 2,
  options: ['Longueur', 'Taille', 'Finitions']
}, {
  id: 'pr3',
  nom: 'Knotless Braids',
  categorie: 'Braids & Nattes',
  genre: 'Femme',
  description: 'Tresses sans nœuds, plus douces.',
  prix: 120,
  duree: '5h – 8h',
  image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80',
  visible: true,
  ordre: 3,
  options: ['Longueur', 'Couleur', 'Accessoires']
}, {
  id: 'pr4',
  nom: 'Cornrows Homme',
  categorie: 'Braids & Nattes',
  genre: 'Homme',
  description: 'Cornrows nets et structurés.',
  prix: 40,
  duree: '1h30 – 2h30',
  image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=200&q=80',
  visible: true,
  ordre: 4,
  options: ['Design', 'Wash']
}, {
  id: 'pr5',
  nom: 'Départ de Locks',
  categorie: 'Locks',
  genre: 'Unisexe',
  description: 'Création de vos futures dreadlocks.',
  prix: 80,
  duree: '3h – 6h',
  image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&q=80',
  visible: true,
  ordre: 5,
  options: ['Technique', 'Volume']
}, {
  id: 'pr6',
  nom: 'Retwist',
  categorie: 'Locks',
  genre: 'Unisexe',
  description: 'Entretien et retwist de vos locks.',
  prix: 40,
  duree: '1h30 – 3h',
  image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=200&q=80',
  visible: true,
  ordre: 6,
  options: ['Wash', 'Finitions']
}, {
  id: 'pr7',
  nom: 'Fulanis',
  categorie: 'Braids & Nattes',
  genre: 'Femme',
  description: 'Nattes ornées de perles et fils.',
  prix: 65,
  duree: '3h – 4h',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
  visible: false,
  ordre: 7,
  options: ['Accessoires', 'Wash']
}];
const GALERIE_DATA: GaleriePhoto[] = [{
  id: 'gp1',
  url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&q=80',
  titre: 'Nattes collées femme',
  categorie: 'Braids',
  genre: 'Femme',
  style: 'braids',
  carouselAccueil: true,
  visible: true,
  ordre: 1
}, {
  id: 'gp2',
  url: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&q=80',
  titre: 'Cornrows homme',
  categorie: 'Braids',
  genre: 'Homme',
  style: 'cornrows',
  carouselAccueil: true,
  visible: true,
  ordre: 2
}, {
  id: 'gp3',
  url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&q=80',
  titre: 'Knotless braids',
  categorie: 'Braids',
  genre: 'Femme',
  style: 'braids',
  carouselAccueil: false,
  visible: true,
  ordre: 3
}, {
  id: 'gp4',
  url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&q=80',
  titre: 'Locks naturelles',
  categorie: 'Locks',
  genre: 'Unisexe',
  style: 'locks',
  carouselAccueil: true,
  visible: true,
  ordre: 4
}, {
  id: 'gp5',
  url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
  titre: 'Fulanis avec perles',
  categorie: 'Braids',
  genre: 'Femme',
  style: 'fulanis',
  carouselAccueil: false,
  visible: false,
  ordre: 5
}, {
  id: 'gp6',
  url: 'https://images.unsplash.com/photo-1599948128020-9a44c7eb5b9c?w=300&q=80',
  titre: 'Nattes motifs géo',
  categorie: 'Braids',
  genre: 'Unisexe',
  style: 'motifs',
  carouselAccueil: false,
  visible: true,
  ordre: 6
}];
const STATS_RESERVATIONS_WEEKLY = [{
  jour: 'Lun',
  reservations: 4,
  ca: 280
}, {
  jour: 'Mar',
  reservations: 6,
  ca: 420
}, {
  jour: 'Mer',
  reservations: 5,
  ca: 370
}, {
  jour: 'Jeu',
  reservations: 7,
  ca: 510
}, {
  jour: 'Ven',
  reservations: 9,
  ca: 680
}, {
  jour: 'Sam',
  reservations: 11,
  ca: 840
}];
const STATS_MONTHLY = [{
  mois: 'Sep',
  reservations: 52,
  ca: 3840
}, {
  mois: 'Oct',
  reservations: 61,
  ca: 4520
}, {
  mois: 'Nov',
  reservations: 58,
  ca: 4310
}, {
  mois: 'Déc',
  reservations: 45,
  ca: 3320
}, {
  mois: 'Jan',
  reservations: 68,
  ca: 5120
}];
const STATS_PRESTATIONS_PIE = [{
  name: 'Braids & Nattes',
  value: 42,
  color: '#c9a96e'
}, {
  name: 'Locks & Retwist',
  value: 28,
  color: '#8b6336'
}, {
  name: 'Twists',
  value: 18,
  color: '#d4b896'
}, {
  name: 'Soins',
  value: 12,
  color: '#e8d8c4'
}];
const STATS_TOP_PRESTATIONS = [{
  nom: 'Knotless Braids',
  count: 23,
  trend: 'up'
}, {
  nom: 'Box Braids',
  count: 19,
  trend: 'up'
}, {
  nom: 'Retwist',
  count: 14,
  trend: 'stable'
}, {
  nom: 'Cornrows Homme',
  count: 11,
  trend: 'up'
}, {
  nom: 'Départ de Locks',
  count: 9,
  trend: 'down'
}];
const CRENEAUX_POPULAIRES = [{
  heure: '09h00',
  count: 18
}, {
  heure: '10h00',
  count: 24
}, {
  heure: '11h00',
  count: 21
}, {
  heure: '13h00',
  count: 15
}, {
  heure: '14h00',
  count: 28
}, {
  heure: '15h00',
  count: 22
}, {
  heure: '16h00',
  count: 19
}];

// ─── Status config ──────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ReservationStatus, {
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
    color: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-400'
  },
  terminee: {
    label: 'Terminée',
    color: 'bg-slate-50 text-slate-600 border-slate-200',
    dot: 'bg-slate-400'
  },
  absent: {
    label: 'Absent',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    dot: 'bg-orange-400'
  }
};
const GENRE_BADGE: Record<string, string> = {
  Femme: 'bg-rose-50 text-rose-700 border-rose-200',
  Homme: 'bg-sky-50 text-sky-700 border-sky-200',
  Unisexe: 'bg-[#f5ede0] text-[#8b6336] border-[#d4b896]'
};

// ─── Nav items ──────────────────────────────────────────────────────────────

const NAV_ITEMS: Array<{
  id: AdminPage;
  label: string;
  icon: React.ElementType;
  badge?: number;
}> = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: LayoutDashboard
}, {
  id: 'reservations',
  label: 'Réservations',
  icon: Calendar,
  badge: 3
}, {
  id: 'disponibilites',
  label: 'Disponibilités',
  icon: Clock
}, {
  id: 'prestations',
  label: 'Prestations',
  icon: Scissors
}, {
  id: 'galerie',
  label: 'Galerie',
  icon: Image
}, {
  id: 'clients',
  label: 'Clients',
  icon: Users
}, {
  id: 'statistiques',
  label: 'Statistiques',
  icon: BarChart2
}, {
  id: 'parametres',
  label: 'Paramètres',
  icon: Settings
}];

// ─── Subcomponents ──────────────────────────────────────────────────────────

const StatusBadge: React.FC<{
  statut: ReservationStatus;
}> = ({
  statut
}) => {
  const cfg = STATUS_CONFIG[statut];
  return <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border', cfg.color)} style={{
    letterSpacing: '0.08em'
  }}>
      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
      {cfg.label}
    </span>;
};
const KpiCard: React.FC<{
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendVal?: string;
  accent?: boolean;
}> = ({
  label,
  value,
  sub,
  icon: Icon,
  trend,
  trendVal,
  accent
}) => <div className={cn('rounded-xl p-5 border flex flex-col gap-3', accent ? 'bg-[#1a1410] border-[#3a2e20]' : 'bg-white border-[#e8ddd0]')}>
    <div className="flex items-start justify-between">
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', accent ? 'bg-[#c9a96e]/15' : 'bg-[#f5ede0]')}>
        <Icon size={18} className={accent ? 'text-[#c9a96e]' : 'text-[#8b6336]'} />
      </div>
      {trend && trendVal && <div className={cn('flex items-center gap-1 text-xs font-semibold', trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400')}>
          {trend === 'up' ? <ArrowUpRight size={13} /> : trend === 'down' ? <ArrowDownRight size={13} /> : null}
          <span>{trendVal}</span>
        </div>}
    </div>
    <div>
      <p className={cn('text-2xl font-bold', accent ? 'text-white' : 'text-[#1a1410]')} style={{
      fontFamily: 'Georgia, serif'
    }}>{value}</p>
      <p className={cn('text-xs font-semibold uppercase mt-0.5', accent ? 'text-white/40' : 'text-[#a08060]')} style={{
      letterSpacing: '0.1em'
    }}>{label}</p>
      <p className={cn('text-xs mt-1', accent ? 'text-white/30' : 'text-[#b0a090]')}>{sub}</p>
    </div>
  </div>;

// ─── Login Page ─────────────────────────────────────────────────────────────

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
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
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
        }}>Sleekhair Admin</h1>
          <p className="text-white/40 text-sm mt-1">Panneau d'administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1410] border border-white/8 rounded-2xl p-7 space-y-5">
          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2" style={{
            letterSpacing: '0.1em'
          }}>Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@sleekhair.fr" className="w-full pl-10 pr-4 py-3 bg-[#0f0d0b] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200" />
            </div>
          </div>
          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2" style={{
            letterSpacing: '0.1em'
          }}>Mot de passe</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-[#0f0d0b] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200" />
            </div>
          </div>
          {error && <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700/40 rounded-lg">
              <AlertCircle size={13} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>}
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] font-bold text-sm uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60" style={{
          letterSpacing: '0.12em'
        }}>
            {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <span>Se connecter</span>}
          </button>
          <button type="button" className="w-full text-center text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
            Mot de passe oublié ?
          </button>
        </form>
      </div>
    </div>;
};

// ─── Dashboard Page ──────────────────────────────────────────────────────────

const DashboardPage: React.FC<{
  onNavigate: (page: AdminPage) => void;
}> = ({
  onNavigate
}) => {
  const todayRes = RESERVATIONS_DATA.filter(r => r.date === '2025-01-28');
  const weekCA = 3240;
  const tauxOccupation = 78;
  const alertes = [{
    id: 'a1',
    type: 'warning',
    msg: '3 réservations en attente de confirmation',
    action: 'Voir'
  }, {
    id: 'a2',
    type: 'info',
    msg: '2 nouvelles demandes de rendez-vous reçues',
    action: 'Voir'
  }, {
    id: 'a3',
    type: 'success',
    msg: 'Réservation SLK-006 confirmée automatiquement',
    action: null
  }];
  return <div className="space-y-8">
      <div>
        <h1 className="text-[#1a1410] text-2xl md:text-3xl font-bold" style={{
        fontFamily: 'Georgia, serif'
      }}>Bonjour, Sleekhair 👋</h1>
        <p className="text-[#a08060] text-sm mt-1">Mardi 28 janvier 2025 — Voici votre résumé du jour</p>
      </div>

      {/* Alertes */}
      <div className="space-y-2.5">
        {alertes.map(a => <div key={a.id} className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border text-sm', a.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' : a.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800')}>
            {a.type === 'warning' ? <AlertCircle size={14} className="flex-shrink-0" /> : a.type === 'info' ? <Bell size={14} className="flex-shrink-0" /> : <CheckCircle size={14} className="flex-shrink-0" />}
            <span className="flex-1">{a.msg}</span>
            {a.action && <button onClick={() => onNavigate('reservations')} className="text-xs font-bold underline">{a.action}</button>}
          </div>)}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="RDV aujourd'hui" value={String(todayRes.length)} sub={`${todayRes.filter(r => r.statut === 'confirmee').length} confirmés`} icon={Calendar} trend="up" trendVal="+2 vs hier" accent />
        <KpiCard label="CA semaine" value={`${weekCA}€`} sub="Estimé prestations" icon={TrendingUp} trend="up" trendVal="+12%" />
        <KpiCard label="Taux d'occupation" value={`${tauxOccupation}%`} sub="Cette semaine" icon={BarChart2} trend="up" trendVal="+5pts" />
        <KpiCard label="Clients récurrents" value="24" sub="Ce mois-ci" icon={Users} trend="neutral" trendVal="stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Réservations du jour */}
        <div className="lg:col-span-2 bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e6d8]">
            <h2 className="text-[#1a1410] font-bold text-base" style={{
            fontFamily: 'Georgia, serif'
          }}>Réservations du jour</h2>
            <button onClick={() => onNavigate('reservations')} className="text-[#8b6336] text-xs font-semibold flex items-center gap-1 hover:underline">
              <span>Tout voir</span><ChevronRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-[#f5f0ea]">
            {todayRes.map(r => <div key={r.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#faf8f5] transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {r.clientPrenom[0]}{r.clientNom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a1410] font-semibold text-sm truncate">{r.clientPrenom} {r.clientNom}</p>
                  <p className="text-[#a08060] text-xs truncate">{r.prestation}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#1a1410] text-sm font-bold">{r.heure}</p>
                  <p className="text-[#a08060] text-xs">{r.duree}</p>
                </div>
                <StatusBadge statut={r.statut} />
              </div>)}
          </div>
        </div>

        {/* Résumé + raccourcis */}
        <div className="space-y-4">
          <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
            <h3 className="text-[#1a1410] font-bold text-sm mb-4" style={{
            fontFamily: 'Georgia, serif'
          }}>Créneaux restants</h3>
            <div className="space-y-2">
              {[{
              h: '12h00',
              libre: true
            }, {
              h: '13h00',
              libre: true
            }, {
              h: '16h30',
              libre: true
            }, {
              h: '17h00',
              libre: false
            }].map(slot => <div key={slot.h} className="flex items-center justify-between">
                  <span className="text-[#1a1410] text-sm font-medium">{slot.h}</span>
                  <span className={cn('text-[10px] font-bold uppercase px-2 py-0.5 rounded-full', slot.libre ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200')}>
                    {slot.libre ? 'Disponible' : 'Complet'}
                  </span>
                </div>)}
            </div>
          </div>

          <div className="bg-[#1a1410] border border-white/8 rounded-xl p-5">
            <h3 className="text-white font-bold text-sm mb-4">Raccourcis rapides</h3>
            <div className="space-y-2">
              {[{
              label: 'Nouvelle réservation',
              icon: Plus,
              page: 'reservations' as AdminPage
            }, {
              label: 'Gérer disponibilités',
              icon: Clock,
              page: 'disponibilites' as AdminPage
            }, {
              label: 'Voir les clients',
              icon: Users,
              page: 'clients' as AdminPage
            }].map(item => <button key={item.label} onClick={() => onNavigate(item.page)} className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-[#c9a96e]/15 border border-white/8 hover:border-[#c9a96e]/30 text-white/70 hover:text-[#c9a96e] text-xs font-medium transition-all duration-200">
                  <item.icon size={13} />
                  <span>{item.label}</span>
                  <ChevronRight size={12} className="ml-auto" />
                </button>)}
            </div>
          </div>
        </div>
      </div>

      {/* Graphe hebdo */}
      <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
        <h2 className="text-[#1a1410] font-bold text-base mb-5" style={{
        fontFamily: 'Georgia, serif'
      }}>Réservations cette semaine</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={STATS_RESERVATIONS_WEEKLY} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d8" />
            <XAxis dataKey="jour" tick={{
            fontSize: 11,
            fill: '#a08060'
          }} axisLine={false} tickLine={false} />
            <YAxis tick={{
            fontSize: 11,
            fill: '#a08060'
          }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{
            background: '#1a1410',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontSize: 12
          }} />
            <Bar dataKey="reservations" fill="#c9a96e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>;
};

// ─── Reservations Page ───────────────────────────────────────────────────────

const ReservationsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('all');
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>(RESERVATIONS_DATA);
  const filtered = useMemo(() => reservations.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${r.clientPrenom} ${r.clientNom} ${r.prestation} ${r.id}`.toLowerCase().includes(q);
    const matchStatut = filterStatut === 'all' || r.statut === filterStatut;
    const matchGenre = filterGenre === 'all' || r.genre === filterGenre;
    return matchSearch && matchStatut && matchGenre;
  }), [reservations, search, filterStatut, filterGenre]);
  const updateStatus = (id: string, statut: ReservationStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? {
      ...r,
      statut
    } : r));
    setSelectedRes(prev => prev?.id === id ? {
      ...prev,
      statut
    } : prev);
  };
  return <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[#1a1410] text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Réservations</h1>
          <p className="text-[#a08060] text-sm mt-0.5">{filtered.length} réservation{filtered.length > 1 ? 's' : ''}</p>
        </div>
        <button className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-xs font-bold uppercase px-4 py-2.5 rounded-lg transition-all duration-200" style={{
        letterSpacing: '0.1em'
      }}>
          <Plus size={14} /><span>Nouvelle réservation</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08060]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher client, prestation, ID…" className="w-full pl-9 pr-4 py-2.5 border border-[#e0d4c4] rounded-lg text-sm bg-white focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410] placeholder-[#c4b4a0]" />
        </div>
        <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)} className="px-3.5 py-2.5 border border-[#e0d4c4] rounded-lg text-sm bg-white text-[#1a1410] focus:outline-none focus:border-[#c9a96e]/60 cursor-pointer">
          <option value="all">Tous statuts</option>
          {(Object.keys(STATUS_CONFIG) as ReservationStatus[]).map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
        </select>
        <select value={filterGenre} onChange={e => setFilterGenre(e.target.value)} className="px-3.5 py-2.5 border border-[#e0d4c4] rounded-lg text-sm bg-white text-[#1a1410] focus:outline-none focus:border-[#c9a96e]/60 cursor-pointer">
          <option value="all">Tous genres</option>
          <option value="Femme">Femme</option>
          <option value="Homme">Homme</option>
          <option value="Unisexe">Unisexe</option>
        </select>
        <button className="flex items-center gap-2 px-3.5 py-2.5 border border-[#e0d4c4] rounded-lg text-sm text-[#7a6a58] hover:border-[#c9a96e] hover:text-[#8b6336] transition-all bg-white">
          <Download size={13} /><span className="hidden sm:inline">Exporter</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e8ddd0] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-[#faf8f5] border-b border-[#f0e6d8]">
                {['ID', 'Client', 'Prestation', 'Genre', 'Date & Heure', 'Durée', 'Prix', 'Statut', 'Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-[#a08060] text-[10px] font-bold uppercase" style={{
                letterSpacing: '0.1em'
              }}>{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f0ea]">
              {filtered.map(r => <tr key={r.id} className="hover:bg-[#faf8f5] transition-colors group">
                  <td className="px-4 py-3.5">
                    <span className="text-[#c9a96e] text-xs font-bold">{r.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
                        {r.clientPrenom[0]}{r.clientNom[0]}
                      </div>
                      <div>
                        <p className="text-[#1a1410] text-xs font-semibold">{r.clientPrenom} {r.clientNom}</p>
                        <p className="text-[#b0a090] text-[10px]">{r.tel}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-[#1a1410] text-xs font-medium">{r.prestation}</p>
                    <p className="text-[#b0a090] text-[10px]">{r.categorie}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn('text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm border', GENRE_BADGE[r.genre])} style={{
                  letterSpacing: '0.08em'
                }}>{r.genre}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-[#1a1410] text-xs font-semibold">{r.date}</p>
                    <p className="text-[#8b6336] text-xs font-bold">{r.heure}</p>
                  </td>
                  <td className="px-4 py-3.5 text-[#7a6a58] text-xs">{r.duree}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[#1a1410] text-sm font-bold">{r.prix}€</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge statut={r.statut} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedRes(r)} className="w-7 h-7 rounded-lg bg-[#f5ede0] hover:bg-[#c9a96e]/20 flex items-center justify-center text-[#8b6336] transition-colors" title="Voir détail">
                        <Eye size={12} />
                      </button>
                      <button onClick={() => updateStatus(r.id, 'confirmee')} className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors" title="Confirmer">
                        <CheckCircle size={12} />
                      </button>
                      <button onClick={() => updateStatus(r.id, 'annulee')} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors" title="Annuler">
                        <XCircle size={12} />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRes && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedRes(null)}>
            <motion.div initial={{
          scale: 0.95,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.95,
          opacity: 0
        }} className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-5 bg-[#1a1410]">
                <div>
                  <p className="text-[#c9a96e] text-xs font-bold" style={{
                letterSpacing: '0.15em'
              }}>{selectedRes.id}</p>
                  <h3 className="text-white font-bold text-lg" style={{
                fontFamily: 'Georgia, serif'
              }}>{selectedRes.clientPrenom} {selectedRes.clientNom}</h3>
                </div>
                <button onClick={() => setSelectedRes(null)} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"><X size={16} /></button>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[{
                l: 'Prestation',
                v: selectedRes.prestation
              }, {
                l: 'Catégorie',
                v: selectedRes.categorie
              }, {
                l: 'Date',
                v: selectedRes.date
              }, {
                l: 'Heure',
                v: selectedRes.heure
              }, {
                l: 'Durée',
                v: selectedRes.duree
              }, {
                l: 'Prix',
                v: `${selectedRes.prix}€`
              }, {
                l: 'Téléphone',
                v: selectedRes.tel
              }, {
                l: 'Email',
                v: selectedRes.email
              }].map(item => <div key={item.l}>
                      <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-0.5" style={{
                  letterSpacing: '0.1em'
                }}>{item.l}</p>
                      <p className="text-[#1a1410] text-sm">{item.v}</p>
                    </div>)}
                </div>
                {selectedRes.note && <div className="bg-[#f5ede0] rounded-lg p-3">
                    <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-1">Note</p>
                    <p className="text-[#5a4a3a] text-sm">{selectedRes.note}</p>
                  </div>}
                <div>
                  <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-2" style={{
                letterSpacing: '0.1em'
              }}>Changer le statut</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(STATUS_CONFIG) as ReservationStatus[]).map(s => <button key={s} onClick={() => updateStatus(selectedRes.id, s)} className={cn('text-xs font-bold uppercase px-3 py-1.5 rounded-lg border transition-all', selectedRes.statut === s ? 'bg-[#1a1410] text-white border-[#1a1410]' : 'bg-white text-[#7a6a58] border-[#e0d4c4] hover:border-[#c9a96e]')} style={{
                  letterSpacing: '0.08em'
                }}>
                        {STATUS_CONFIG[s].label}
                      </button>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── Prestations Page ────────────────────────────────────────────────────────

const PrestationsPage: React.FC = () => {
  const [prestations, setPrestations] = useState<Prestation[]>(PRESTATIONS_DATA);
  const [editingId, setEditingId] = useState<string | null>(null);
  const toggleVisible = (id: string) => {
    setPrestations(prev => prev.map(p => p.id === id ? {
      ...p,
      visible: !p.visible
    } : p));
  };
  return <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[#1a1410] text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Prestations</h1>
          <p className="text-[#a08060] text-sm mt-0.5">{prestations.length} prestations au catalogue</p>
        </div>
        <button className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-xs font-bold uppercase px-4 py-2.5 rounded-lg transition-all duration-200" style={{
        letterSpacing: '0.1em'
      }}>
          <Plus size={14} /><span>Ajouter une prestation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {prestations.map(p => <div key={p.id} className={cn('bg-white border rounded-xl overflow-hidden transition-all duration-200', p.visible ? 'border-[#e8ddd0]' : 'border-[#e8ddd0] opacity-60')}>
            <div className="relative h-40 overflow-hidden">
              <img src={p.image} alt={p.nom} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={cn('text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm border', GENRE_BADGE[p.genre])} style={{
              letterSpacing: '0.08em'
            }}>{p.genre}</span>
              </div>
              <div className="absolute top-3 right-3">
                <button onClick={() => toggleVisible(p.id)} className={cn('w-7 h-7 rounded-md flex items-center justify-center transition-all', p.visible ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white/60')}>
                  {p.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                <p className="text-[#c9a96e] text-[10px] font-semibold uppercase" style={{
              letterSpacing: '0.12em'
            }}>{p.categorie}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-[#1a1410] font-bold text-sm mb-1" style={{
            fontFamily: 'Georgia, serif'
          }}>{p.nom}</h3>
              <p className="text-[#7a6a58] text-xs leading-relaxed mb-3">{p.description}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[#a08060] text-xs"><Clock size={11} /><span>{p.duree}</span></div>
                <span className="text-[#8b6336] font-bold text-sm">À partir de {p.prix}€</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {p.options.map(opt => <span key={opt} className="text-[10px] bg-[#f5ede0] text-[#8b6336] px-2 py-0.5 rounded-full border border-[#e0d4c4]">{opt}</span>)}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingId(editingId === p.id ? null : p.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#e0d4c4] hover:border-[#c9a96e] text-[#7a6a58] hover:text-[#8b6336] rounded-lg text-xs font-semibold transition-all">
                  <Edit3 size={12} /><span>Modifier</span>
                </button>
                <button className="w-9 h-9 flex items-center justify-center border border-red-200 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
              {editingId === p.id && <div className="mt-3 pt-3 border-t border-[#f0e6d8] space-y-3">
                  <div>
                    <label className="block text-[#a08060] text-[10px] font-semibold uppercase mb-1">Prix de base (€)</label>
                    <input type="number" defaultValue={p.prix} className="w-full px-3 py-2 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60" />
                  </div>
                  <div>
                    <label className="block text-[#a08060] text-[10px] font-semibold uppercase mb-1">Durée estimée</label>
                    <input type="text" defaultValue={p.duree} className="w-full px-3 py-2 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60" />
                  </div>
                  <button onClick={() => setEditingId(null)} className="w-full flex items-center justify-center gap-2 py-2 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] rounded-lg text-xs font-bold transition-all">
                    <Save size={12} /><span>Enregistrer</span>
                  </button>
                </div>}
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── Clients Page ────────────────────────────────────────────────────────────

const ClientsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const filtered = CLIENTS_DATA.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${c.prenom} ${c.nom} ${c.email}`.toLowerCase().includes(q);
    const matchStatut = filterStatut === 'all' || c.statut === filterStatut;
    return matchSearch && matchStatut;
  });
  return <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[#1a1410] text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Clients</h1>
          <p className="text-[#a08060] text-sm mt-0.5">{filtered.length} client{filtered.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08060]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un client…" className="w-full pl-9 pr-4 py-2.5 border border-[#e0d4c4] rounded-lg text-sm bg-white focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410] placeholder-[#c4b4a0]" />
        </div>
        <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)} className="px-3.5 py-2.5 border border-[#e0d4c4] rounded-lg text-sm bg-white text-[#1a1410] focus:outline-none focus:border-[#c9a96e]/60 cursor-pointer">
          <option value="all">Tous les clients</option>
          <option value="fidele">Fidèles</option>
          <option value="nouveau">Nouveaux</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => <div key={c.id} className="bg-white border border-[#e8ddd0] rounded-xl p-5 hover:border-[#c9a96e]/40 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setSelectedClient(c)}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold flex-shrink-0">
                {c.prenom[0]}{c.nom[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-[#1a1410] font-bold text-sm">{c.prenom} {c.nom}</h3>
                  <span className={cn('text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border', c.statut === 'fidele' ? 'bg-[#f5ede0] text-[#8b6336] border-[#d4b896]' : 'bg-sky-50 text-sky-700 border-sky-200')} style={{
                letterSpacing: '0.08em'
              }}>
                    {c.statut === 'fidele' ? '★ Fidèle' : 'Nouveau'}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-[#a08060] text-xs"><Phone size={10} />{c.tel}</span>
                  <span className="flex items-center gap-1 text-[#a08060] text-xs"><Mail size={10} />{c.email}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[#1a1410] font-bold text-lg" style={{
              fontFamily: 'Georgia, serif'
            }}>{c.nbReservations}</p>
                <p className="text-[#a08060] text-[10px]">réservations</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#f0e6d8]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-1">Prestations favorites</p>
                  <div className="flex flex-wrap gap-1">
                    {c.prestationsFavorites.slice(0, 2).map(pf => <span key={pf} className="text-[10px] bg-[#f5ede0] text-[#8b6336] px-2 py-0.5 rounded-full border border-[#e0d4c4]">{pf}</span>)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-0.5">Dernière visite</p>
                  <p className="text-[#1a1410] text-xs font-semibold">{c.derniereVisite}</p>
                </div>
              </div>
            </div>
          </div>)}
      </div>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedClient(null)}>
            <motion.div initial={{
          scale: 0.95,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.95,
          opacity: 0
        }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-5 bg-[#1a1410]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold">
                    {selectedClient.prenom[0]}{selectedClient.nom[0]}
                  </div>
                  <div>
                    <h3 className="text-white font-bold" style={{
                  fontFamily: 'Georgia, serif'
                }}>{selectedClient.prenom} {selectedClient.nom}</h3>
                    <p className="text-white/40 text-xs">{selectedClient.nbReservations} réservations</p>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"><X size={16} /></button>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[{
                l: 'Téléphone',
                v: selectedClient.tel
              }, {
                l: 'Email',
                v: selectedClient.email
              }, {
                l: 'Dernière visite',
                v: selectedClient.derniereVisite
              }, {
                l: 'Statut',
                v: selectedClient.statut === 'fidele' ? '★ Client fidèle' : 'Nouveau client'
              }].map(item => <div key={item.l}>
                      <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-0.5" style={{
                  letterSpacing: '0.1em'
                }}>{item.l}</p>
                      <p className="text-[#1a1410] text-sm font-medium">{item.v}</p>
                    </div>)}
                </div>
                <div>
                  <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-2">Prestations favorites</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.prestationsFavorites.map(pf => <span key={pf} className="text-xs bg-[#f5ede0] text-[#8b6336] px-2.5 py-1 rounded-full border border-[#e0d4c4]">{pf}</span>)}
                  </div>
                </div>
                {selectedClient.notes && <div className="bg-[#f5ede0] rounded-lg p-3">
                    <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-1">Notes internes</p>
                    <p className="text-[#5a4a3a] text-sm">{selectedClient.notes}</p>
                  </div>}
                <div>
                  <p className="text-[#a08060] text-[10px] uppercase font-semibold mb-3">Historique récent</p>
                  <div className="space-y-2">
                    {RESERVATIONS_DATA.filter(r => `${r.clientPrenom} ${r.clientNom}`.toLowerCase() === `${selectedClient.prenom} ${selectedClient.nom}`.toLowerCase()).slice(0, 3).map(r => <div key={r.id} className="flex items-center justify-between p-2.5 bg-[#faf8f5] rounded-lg border border-[#f0e6d8]">
                        <div>
                          <p className="text-[#1a1410] text-xs font-semibold">{r.prestation}</p>
                          <p className="text-[#a08060] text-[10px]">{r.date} à {r.heure}</p>
                        </div>
                        <StatusBadge statut={r.statut} />
                      </div>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── Galerie Page ────────────────────────────────────────────────────────────

const GaleriePage: React.FC = () => {
  const [photos, setPhotos] = useState<GaleriePhoto[]>(GALERIE_DATA);
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const filtered = photos.filter(p => filterGenre === 'all' || p.genre === filterGenre);
  const toggleCarousel = (id: string) => setPhotos(prev => prev.map(p => p.id === id ? {
    ...p,
    carouselAccueil: !p.carouselAccueil
  } : p));
  const toggleVisible = (id: string) => setPhotos(prev => prev.map(p => p.id === id ? {
    ...p,
    visible: !p.visible
  } : p));
  const deletePhoto = (id: string) => setPhotos(prev => prev.filter(p => p.id !== id));
  return <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[#1a1410] text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Galerie</h1>
          <p className="text-[#a08060] text-sm mt-0.5">{photos.length} photos</p>
        </div>
        <button className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b] text-xs font-bold uppercase px-4 py-2.5 rounded-lg transition-all" style={{
        letterSpacing: '0.1em'
      }}>
          <Upload size={14} /><span>Ajouter des photos</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'Femme', 'Homme', 'Unisexe'].map(g => <button key={g} onClick={() => setFilterGenre(g)} className={cn('px-3.5 py-1.5 rounded-lg border text-xs font-semibold uppercase transition-all', filterGenre === g ? 'bg-[#1a1410] border-[#1a1410] text-white' : 'bg-white border-[#e0d4c4] text-[#7a6a58] hover:border-[#c9a96e]')} style={{
        letterSpacing: '0.09em'
      }}>
            {g === 'all' ? 'Toutes' : g}
          </button>)}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Upload Zone */}
        <div className="border-2 border-dashed border-[#d4c4b0] rounded-xl flex flex-col items-center justify-center p-6 aspect-square cursor-pointer hover:border-[#c9a96e] hover:bg-[#fdf9f4] transition-all group">
          <Upload size={24} className="text-[#c4b4a0] group-hover:text-[#c9a96e] mb-2 transition-colors" />
          <p className="text-[#a08060] text-xs text-center">Ajouter une photo</p>
        </div>

        {filtered.map(p => <div key={p.id} className={cn('relative rounded-xl overflow-hidden group aspect-square', !p.visible && 'opacity-50')}>
            <img src={p.url} alt={p.titre} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex gap-1.5">
              <span className={cn('text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border', GENRE_BADGE[p.genre])} style={{
            letterSpacing: '0.08em'
          }}>{p.genre}</span>
            </div>
            {p.carouselAccueil && <div className="absolute top-2.5 right-2.5 bg-[#c9a96e] text-[#0f0d0b] text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{
          letterSpacing: '0.08em'
        }}>Accueil</div>}

            {/* Controls on hover */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => toggleVisible(p.id)} className={cn('flex-1 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1', p.visible ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-emerald-500 text-white')} style={{
            letterSpacing: '0.08em'
          }}>
                {p.visible ? <EyeOff size={10} /> : <Eye size={10} />}
                <span>{p.visible ? 'Masquer' : 'Afficher'}</span>
              </button>
              <button onClick={() => toggleCarousel(p.id)} className={cn('flex-1 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1', p.carouselAccueil ? 'bg-[#c9a96e] text-[#0f0d0b]' : 'bg-white/20 text-white hover:bg-white/30')} style={{
            letterSpacing: '0.08em'
          }}>
                <Star size={10} />
                <span>Accueil</span>
              </button>
              <button onClick={() => deletePhoto(p.id)} className="w-8 py-1.5 rounded-md bg-red-500/80 text-white hover:bg-red-600 flex items-center justify-center transition-all">
                <Trash2 size={12} />
              </button>
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-0 pointer-events-none">
              <p className="text-white text-xs font-semibold">{p.titre}</p>
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── Parametres Page ─────────────────────────────────────────────────────────

const ParametresPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const sectionClass = "bg-white border border-[#e8ddd0] rounded-xl p-6 space-y-5";
  const labelClass = "block text-[#1a1410] text-xs font-bold uppercase mb-2";
  const inputClass = "w-full px-4 py-2.5 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60 text-[#1a1410] bg-white transition-all";
  return <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[#1a1410] text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Paramètres</h1>
          <p className="text-[#a08060] text-sm mt-0.5">Configuration de votre salon</p>
        </div>
        <button onClick={handleSave} className={cn('flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition-all duration-300', saved ? 'bg-emerald-500 text-white' : 'bg-[#c9a96e] hover:bg-[#b8943e] text-[#0f0d0b]')} style={{
        letterSpacing: '0.1em'
      }}>
          {saved ? <><CheckCircle size={14} /><span>Enregistré !</span></> : <><Save size={14} /><span>Enregistrer</span></>}
        </button>
      </div>

      {/* Identité */}
      <div className={sectionClass}>
        <h2 className="text-[#1a1410] font-bold text-base border-b border-[#f0e6d8] pb-3" style={{
        fontFamily: 'Georgia, serif'
      }}>Identité de la marque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>Nom de la marque</label><input type="text" defaultValue="Sleekhair" className={inputClass} /></div>
          <div><label className={labelClass}>Slogan</label><input type="text" defaultValue="Coiffure afro premium à Lyon" className={inputClass} /></div>
        </div>
        <div>
          <label className={labelClass}>Présentation</label>
          <textarea rows={3} defaultValue="Sleekhair est un salon de coiffure afro mixte basé à Lyon, spécialisé dans les coiffures pour femmes, hommes et styles unisexes." className={inputClass + ' resize-none'} />
        </div>
        <div>
          <label className={labelClass}>Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-xl" style={{
            fontFamily: 'Georgia, serif'
          }}>S</div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e0d4c4] rounded-lg text-sm text-[#7a6a58] hover:border-[#c9a96e] transition-all">
              <Upload size={13} /><span>Changer le logo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Coordonnées */}
      <div className={sectionClass}>
        <h2 className="text-[#1a1410] font-bold text-base border-b border-[#f0e6d8] pb-3" style={{
        fontFamily: 'Georgia, serif'
      }}>Coordonnées</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>Adresse</label><input type="text" defaultValue="24 Rue de la République" className={inputClass} /></div>
          <div><label className={labelClass}>Ville & Code postal</label><input type="text" defaultValue="69007 Lyon" className={inputClass} /></div>
          <div><label className={labelClass}>Téléphone / WhatsApp</label><input type="tel" defaultValue="+33 6 12 34 56 78" className={inputClass} /></div>
          <div><label className={labelClass}>Email</label><input type="email" defaultValue="contact@sleekhair.fr" className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass}><span className="flex items-center gap-1"><Instagram size={11} /><span>Instagram</span></span></label><input type="url" defaultValue="https://instagram.com/sleekhair" className={inputClass} /></div>
          <div><label className={labelClass}>TikTok</label><input type="url" defaultValue="https://tiktok.com/@sleekhair" className={inputClass} /></div>
        </div>
      </div>

      {/* Horaires */}
      <div className={sectionClass}>
        <h2 className="text-[#1a1410] font-bold text-base border-b border-[#f0e6d8] pb-3" style={{
        fontFamily: 'Georgia, serif'
      }}>Horaires d'ouverture</h2>
        <div className="space-y-3">
          {[{
          jour: 'Lundi – Vendredi',
          open: '09:00',
          close: '19:00',
          ouvert: true
        }, {
          jour: 'Samedi',
          open: '09:00',
          close: '18:00',
          ouvert: true
        }, {
          jour: 'Dimanche',
          open: '',
          close: '',
          ouvert: false
        }].map(h => <div key={h.jour} className="flex items-center gap-4 flex-wrap">
              <span className="text-[#1a1410] text-sm font-medium w-36 flex-shrink-0">{h.jour}</span>
              {h.ouvert ? <div className="flex items-center gap-3">
                  <input type="time" defaultValue={h.open} className="px-3 py-1.5 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60" />
                  <span className="text-[#a08060] text-sm">–</span>
                  <input type="time" defaultValue={h.close} className="px-3 py-1.5 border border-[#e0d4c4] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]/60" />
                </div> : <span className="text-[#c4b4a0] text-sm italic">Fermé</span>}
            </div>)}
        </div>
      </div>

      {/* Réservation */}
      <div className={sectionClass}>
        <h2 className="text-[#1a1410] font-bold text-base border-b border-[#f0e6d8] pb-3" style={{
        fontFamily: 'Georgia, serif'
      }}>Paramètres de réservation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Durée tampon (min)</label>
            <input type="number" defaultValue={15} className={inputClass} />
            <p className="text-[#a08060] text-xs mt-1">Temps entre deux réservations</p>
          </div>
          <div>
            <label className={labelClass}>Délai minimum (heures)</label>
            <input type="number" defaultValue={2} className={inputClass} />
            <p className="text-[#a08060] text-xs mt-1">Délai min avant réservation</p>
          </div>
        </div>
        <div className="space-y-3">
          {[{
          label: 'Acompte requis à la réservation',
          sub: 'Le client devra verser un acompte',
          defaultChecked: false
        }, {
          label: 'Confirmation automatique',
          sub: 'Les réservations sont confirmées automatiquement',
          defaultChecked: true
        }, {
          label: 'Rappel SMS 24h avant',
          sub: 'Envoyer un rappel SMS au client',
          defaultChecked: true
        }].map(opt => <div key={opt.label} className="flex items-start justify-between gap-4 p-3.5 bg-[#faf8f5] rounded-lg border border-[#f0e6d8]">
              <div>
                <p className="text-[#1a1410] text-sm font-semibold">{opt.label}</p>
                <p className="text-[#a08060] text-xs mt-0.5">{opt.sub}</p>
              </div>
              <div className={cn('w-10 h-6 rounded-full flex items-center cursor-pointer transition-all duration-300 flex-shrink-0', opt.defaultChecked ? 'bg-[#c9a96e] justify-end pr-0.5' : 'bg-[#e0d4c4] justify-start pl-0.5')}>
                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </div>
            </div>)}
        </div>
        <div>
          <label className={labelClass}>Politique d'annulation</label>
          <textarea rows={3} defaultValue="Annulation gratuite jusqu'à 24h avant le rendez-vous. En dessous de 24h, une indemnité de 30% sera retenue. En cas de no-show, la totalité sera facturée." className={inputClass + ' resize-none'} />
        </div>
      </div>
    </div>;
};

// ─── Statistiques Page ───────────────────────────────────────────────────────

const StatistiquesPage: React.FC = () => {
  const [period, setPeriod] = useState<'semaine' | 'mois'>('mois');
  return <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[#1a1410] text-2xl font-bold" style={{
          fontFamily: 'Georgia, serif'
        }}>Statistiques</h1>
          <p className="text-[#a08060] text-sm mt-0.5">Analyse de votre activité</p>
        </div>
        <div className="flex gap-2">
          {(['semaine', 'mois'] as const).map(p => <button key={p} onClick={() => setPeriod(p)} className={cn('px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all', period === p ? 'bg-[#1a1410] text-white' : 'bg-white border border-[#e0d4c4] text-[#7a6a58] hover:border-[#c9a96e]')} style={{
          letterSpacing: '0.1em'
        }}>
              {p === 'semaine' ? 'Cette semaine' : 'Ce mois'}
            </button>)}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Réservations" value="68" sub="Ce mois-ci" icon={Calendar} trend="up" trendVal="+17%" accent />
        <KpiCard label="CA estimé" value="5 120€" sub="Ce mois-ci" icon={TrendingUp} trend="up" trendVal="+19%" />
        <KpiCard label="Taux annulation" value="8%" sub="Ce mois-ci" icon={XCircle} trend="down" trendVal="-3pts" />
        <KpiCard label="Créneau ★" value="14h00" sub="Le plus demandé" icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution mensuelle */}
        <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
          <h2 className="text-[#1a1410] font-bold text-base mb-5" style={{
          fontFamily: 'Georgia, serif'
        }}>Réservations par mois</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={STATS_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d8" />
              <XAxis dataKey="mois" tick={{
              fontSize: 11,
              fill: '#a08060'
            }} axisLine={false} tickLine={false} />
              <YAxis tick={{
              fontSize: 11,
              fill: '#a08060'
            }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{
              background: '#1a1410',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontSize: 12
            }} />
              <Line type="monotone" dataKey="reservations" stroke="#c9a96e" strokeWidth={2.5} dot={{
              fill: '#c9a96e',
              strokeWidth: 0,
              r: 4
            }} activeDot={{
              r: 6
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CA mensuel */}
        <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
          <h2 className="text-[#1a1410] font-bold text-base mb-5" style={{
          fontFamily: 'Georgia, serif'
        }}>Chiffre d'affaires estimé</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={STATS_MONTHLY} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d8" />
              <XAxis dataKey="mois" tick={{
              fontSize: 11,
              fill: '#a08060'
            }} axisLine={false} tickLine={false} />
              <YAxis tick={{
              fontSize: 11,
              fill: '#a08060'
            }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{
              background: '#1a1410',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontSize: 12
            }} formatter={(v: number) => [`${v}€`, 'CA']} />
              <Bar dataKey="ca" fill="#8b6336" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Répartition prestations */}
        <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
          <h2 className="text-[#1a1410] font-bold text-base mb-5" style={{
          fontFamily: 'Georgia, serif'
        }}>Répartition prestations</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={STATS_PRESTATIONS_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {STATS_PRESTATIONS_PIE.map(entry => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{
              background: '#1a1410',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontSize: 12
            }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {STATS_PRESTATIONS_PIE.map(item => <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{
              background: item.color
            }} />
                <span className="text-[#7a6a58] text-xs">{item.name}</span>
              </div>)}
          </div>
        </div>

        {/* Top prestations */}
        <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
          <h2 className="text-[#1a1410] font-bold text-base mb-5" style={{
          fontFamily: 'Georgia, serif'
        }}>Top prestations</h2>
          <div className="space-y-3">
            {STATS_TOP_PRESTATIONS.map((item, i) => <div key={item.nom} className="flex items-center gap-3">
                <span className="text-[#c9a96e] font-bold text-sm w-5 flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a1410] text-xs font-semibold truncate">{item.nom}</p>
                  <div className="w-full bg-[#f0e6d8] rounded-full h-1 mt-1">
                    <div className="bg-[#c9a96e] h-1 rounded-full transition-all duration-700" style={{
                  width: `${item.count / 23 * 100}%`
                }} />
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[#1a1410] text-xs font-bold">{item.count}</span>
                  {item.trend === 'up' ? <TrendingUp size={11} className="text-emerald-500" /> : item.trend === 'down' ? <TrendingDown size={11} className="text-red-400" /> : null}
                </div>
              </div>)}
          </div>
        </div>

        {/* Créneaux populaires */}
        <div className="bg-white border border-[#e8ddd0] rounded-xl p-5">
          <h2 className="text-[#1a1410] font-bold text-base mb-5" style={{
          fontFamily: 'Georgia, serif'
        }}>Créneaux les + demandés</h2>
          <div className="space-y-2.5">
            {CRENEAUX_POPULAIRES.map(item => <div key={item.heure} className="flex items-center gap-3">
                <span className="text-[#8b6336] text-xs font-bold w-12 flex-shrink-0">{item.heure}</span>
                <div className="flex-1 bg-[#f0e6d8] rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#c9a96e] to-[#8b6336] h-2 rounded-full transition-all duration-700" style={{
                width: `${item.count / 28 * 100}%`
              }} />
                </div>
                <span className="text-[#7a6a58] text-xs w-6 text-right flex-shrink-0">{item.count}</span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};

// ─── Disponibilites Placeholder ───────────────────────────────────────────────

const DisponibilitesPage: React.FC = () => <SleekhairDisponibilites />;

// ─── Main Admin Component ─────────────────────────────────────────────────────

interface SleekhairAdminProps {
  onGoHome?: () => void;
}
export const SleekhairAdmin: React.FC<SleekhairAdminProps> = ({
  onGoHome
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }
  const pageContent: Record<AdminPage, React.ReactNode> = {
    dashboard: <DashboardPage onNavigate={setCurrentPage} />,
    reservations: <ReservationsPage />,
    disponibilites: <DisponibilitesPage />,
    prestations: <PrestationsPage />,
    galerie: <GaleriePage />,
    clients: <ClientsPage />,
    parametres: <ParametresPage />,
    statistiques: <StatistiquesPage />
  };
  return <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar */}
      <aside className={cn('fixed inset-y-0 left-0 z-40 w-60 bg-[#0f0d0b] flex flex-col transition-transform duration-300 ease-in-out', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{
              fontFamily: 'Georgia, serif'
            }}>S</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide" style={{
              fontFamily: 'Georgia, serif'
            }}>Sleekhair</p>
              <p className="text-white/30 text-[10px] uppercase" style={{
              letterSpacing: '0.15em'
            }}>Admin</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_ITEMS.map(item => <li key={item.id}>
                <button onClick={() => {
              setCurrentPage(item.id);
              setSidebarOpen(false);
            }} className={cn('w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative', currentPage === item.id ? 'bg-[#c9a96e]/15 text-[#c9a96e] border border-[#c9a96e]/20' : 'text-white/50 hover:text-white/80 hover:bg-white/5')}>
                  <item.icon size={16} />
                  <span>{item.label}</span>
                  {item.badge && <span className="ml-auto w-5 h-5 rounded-full bg-[#c9a96e] text-[#0f0d0b] text-[10px] font-bold flex items-center justify-center">{item.badge}</span>}
                </button>
              </li>)}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          {onGoHome && <button onClick={onGoHome} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 text-sm font-medium transition-all">
              <ChevronLeft size={16} />
              <span>Retour site</span>
            </button>}
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-900/10 text-sm font-medium transition-all">
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-60 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#e8ddd0] px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-lg border border-[#e0d4c4] flex items-center justify-center text-[#7a6a58] hover:bg-[#f5ede0] transition-all">
              <Menu size={18} />
            </button>
            <div>
              <h2 className="text-[#1a1410] font-bold text-sm" style={{
              fontFamily: 'Georgia, serif'
            }}>
                {NAV_ITEMS.find(n => n.id === currentPage)?.label}
              </h2>
              <p className="text-[#a08060] text-[10px] hidden sm:block">Sleekhair · Panneau admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg border border-[#e0d4c4] flex items-center justify-center text-[#7a6a58] hover:bg-[#f5ede0] transition-all">
              <Bell size={16} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a96e] rounded-full text-[#0f0d0b] text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#e8ddd0]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b6336] flex items-center justify-center text-white font-bold text-xs">A</div>
              <div className="hidden sm:block">
                <p className="text-[#1a1410] text-xs font-semibold">Admin</p>
                <p className="text-[#a08060] text-[10px]">admin@sleekhair.fr</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-7 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} initial={{
            opacity: 0,
            y: 12
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -8
          }} transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1]
          }}>
              {pageContent[currentPage]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>;
};