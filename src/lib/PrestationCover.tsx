import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const VIDEO_EXT = /\.(mov|mp4|webm)$/i;

const defaultCardClass = (dezoom: boolean) =>
  cn(
    'w-full h-full object-cover transition-transform duration-700',
    dezoom ? 'scale-[0.86] origin-center group-hover:scale-[0.94]' : 'group-hover:scale-105'
  );

export function PrestationCover({
  src,
  alt,
  className,
  dezoom = false
}: {
  src: string;
  alt: string;
  className?: string;
  /** Légèrement dézoomé (cadre plus large) — utile pour certaines vidéos recadrées trop serré. */
  dezoom?: boolean;
}) {
  const isVideo = VIDEO_EXT.test(src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaClass = className ? cn(className, dezoom && 'scale-90 origin-center') : defaultCardClass(dezoom);
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const v = videoRef.current;
    v.muted = true;
    void v.play().catch(() => {});
    return () => {
      v.pause();
    };
  }, [isVideo, src]);
  if (isVideo) {
    return <video ref={videoRef} src={src} className={mediaClass} muted playsInline loop preload="metadata" aria-label={alt} />;
  }
  return <img src={src} alt={alt} className={mediaClass} />;
}
