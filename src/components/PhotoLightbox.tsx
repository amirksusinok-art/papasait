import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Calendar, Tag } from 'lucide-react';
import type { GalleryPhoto } from '../types';

interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  initialIndex: number;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const currentPhoto = photos[currentIndex];

  const handlePrev = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-6 select-none animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 text-white">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gold-300 bg-midnight-900/80 px-3.5 py-1.5 rounded-full border border-gold-500/30">
          <span>{currentIndex + 1}</span>
          <span className="text-slate-500">/</span>
          <span>{photos.length}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 sm:p-2.5 rounded-full bg-midnight-900/80 hover:bg-gold-500/20 text-slate-200 hover:text-gold-200 border border-gold-500/30 transition-all cursor-pointer"
            title={isZoomed ? 'Уменьшить' : 'Увеличить'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-midnight-900/80 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 border border-gold-500/30 transition-all cursor-pointer"
            title="Закрыть (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev Navigation Button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full bg-midnight-900/80 hover:bg-gold-500/20 text-slate-200 hover:text-gold-200 border border-gold-500/30 transition-all cursor-pointer"
        title="Предыдущее фото (←)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full bg-midnight-900/80 hover:bg-gold-500/20 text-slate-200 hover:text-gold-200 border border-gold-500/30 transition-all cursor-pointer"
        title="Следующее фото (→)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 shadow-2xl bg-midnight-950 flex items-center justify-center max-h-[68vh]">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className={`max-w-full max-h-[65vh] object-contain transition-all duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        {/* Captions and Date */}
        <div className="mt-4 text-center max-w-xl mx-auto px-4 bg-midnight-900/85 backdrop-blur-md rounded-2xl py-3 border border-gold-500/20 shadow-lg">
          <div className="flex items-center justify-center gap-3 text-xs text-gold-400 mb-1">
            <span className="flex items-center gap-1 font-serif">
              <Tag className="w-3.5 h-3.5" />
              {currentPhoto.title}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {currentPhoto.date}
            </span>
          </div>
          <p className="text-sm text-slate-200 font-serif leading-relaxed">
            {currentPhoto.description}
          </p>
        </div>
      </div>
    </div>
  );
};
