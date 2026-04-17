import knotlessBraids from '@/assets/prestations/knotless-braids.png';
import bohoBraids from '@/assets/prestations/boho-braids.png';
import bohoBraids2 from '@/assets/prestations/boho-braids-2.png';
import islandTwist from '@/assets/prestations/island-twist.png';
import fulaniFemme from '@/assets/prestations/fulani-femme.png';
import fulaniHomme from '@/assets/prestations/fulani-homme.mov';
import butterflyLocks from '@/assets/prestations/butterfly-locks.png';
import sleekPonytail from '@/assets/prestations/sleek-ponytail.png';
import coiffureEnfants from '@/assets/prestations/coiffure-enfants.png';
import nattesCollees from '@/assets/prestations/nattes-collees.png';
import vanilles from '@/assets/prestations/vanilles.png';
import barrelTwist from '@/assets/prestations/barrel-twist.png';
/** Vidéo Barrel fulani — fichier `barrel fulani.mov` dans `assets/prestations`. */
import barrelFulaniVideo from '@/assets/prestations/barrel fulani.mov';
/** Vidéo Départ locks — fichier `Départ locks.mov` dans `assets/prestations`. */
import departLocks from '@/assets/prestations/Départ locks.mov';
/** Image Retwist locks — fichier `Retwist locks.png` dans `assets/prestations`. */
import retwistLocks from '@/assets/prestations/Retwist locks.png';
import flatTwist from '@/assets/prestations/flat-twist.mov';

export type PrestationMediaId =
  | 'f01' | 'f02' | 'f03' | 'f04' | 'f05' | 'f06' | 'f07' | 'f08' | 'f09' | 'f10' | 'f11'
  | 'm01' | 'm02' | 'm03' | 'm04' | 'm05' | 'm06' | 'm07' | 'm09' | 'm10';

/** Médias locaux (hash Vite en prod). */
export const PRESTATION_MEDIA: Record<PrestationMediaId, string> = {
  f01: knotlessBraids,
  f02: bohoBraids,
  f03: bohoBraids2,
  f04: islandTwist,
  f05: fulaniFemme,
  f06: butterflyLocks,
  f07: nattesCollees,
  f08: bohoBraids,
  f09: knotlessBraids,
  f10: sleekPonytail,
  f11: coiffureEnfants,
  m01: bohoBraids2,
  m02: nattesCollees,
  m03: flatTwist,
  m04: barrelTwist,
  m05: fulaniHomme,
  m06: departLocks,
  m07: retwistLocks,
  m09: vanilles,
  m10: barrelFulaniVideo
};
