import React, { useState } from 'react';
import { SleekhairSite } from './SleekhairSite';
import { SleekhairReservation } from './SleekhairReservation';
import { SleekhairAdmin } from './SleekhairAdmin';
import { SleekhairMembre } from './SleekhairMembre';
export type SleekPage = 'home' | 'reservation' | 'admin' | 'membre';
export const SleekhairHome: React.FC = () => {
  const [page, setPage] = useState<SleekPage>('home');
  const nav = (p: SleekPage) => {
    setPage(p);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  if (page === 'admin') return <SleekhairAdmin onGoHome={() => nav('home')} />;
  if (page === 'membre') return <SleekhairMembre onGoHome={() => nav('home')} onReserve={() => nav('reservation')} />;
  if (page === 'reservation') return <SleekhairReservation onGoHome={() => nav('home')} />;
  return <SleekhairSite onNavigate={nav} />;
};