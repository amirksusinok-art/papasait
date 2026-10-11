import React, { useState } from 'react';
import { Gift, Smile, Clock, FileText, Video, Star, CheckCircle, Sparkles, X, Calendar } from 'lucide-react';
import type { SurpriseItem } from '../../types';
import { triggerGoldConfetti } from '../../utils/confetti';
import { giftContent } from '../../data/giftContent';

interface SurprisesSectionProps {
  onNext: () => void;
}

export const SurprisesSection: React.FC<SurprisesSectionProps> = ({ onNext }) => {
  const [openedIds, setOpenedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gift_opened_surprises');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSurprise, setActiveSurprise] = useState<SurpriseItem | null>(null);

  const surprises = giftContent.surprises.items;

  const handleOpenSurprise = (item: SurpriseItem) => {
    // Check if it's the final surprise and previous ones aren't opened yet
    const nonFinalSurprises = surprises.filter((s) => !s.isFinal);
    const allOthersOpened = nonFinalSurprises.every((s) => openedIds.includes(s.id));

    if (item.isFinal && !allOthersOpened) {
      alert('Сначала откройте остальные коробочки, чтобы открыть главный сюрприз! ✨');
      return;
    }

    setActiveSurprise(item);
    triggerGoldConfetti();

    if (!openedIds.includes(item.id)) {
      const updated = [...openedIds, item.id];
      setOpenedIds(updated);
      try {
        localStorage.setItem('gift_opened_surprises', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
    }
  };

  const getIcon = (type: SurpriseItem['iconType']) => {
    switch (type) {
      case 'smile':
        return <Smile className="w-6 h-6 text-gold-400" />;
      case 'memory':
        return <Clock className="w-6 h-6 text-gold-400" />;
      case 'read':
        return <FileText className="w-6 h-6 text-gold-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-gold-400" />;
      case 'star':
        return <Star className="w-6 h-6 text-gold-400" />;
      default:
        return <Gift className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gold-300 bg-gold-500/10 border border-gold-500/30 mb-3 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Раздел 07
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-3">
          {giftContent.surprises.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-serif">
          {giftContent.surprises.sectionSubtitle}
        </p>
      </div>

      {/* Grid of Surprise Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
        {surprises.map((item) => {
          const isOpened = openedIds.includes(item.id);
          const isFinal = item.isFinal;

          return (
            <div
              key={item.id}
              onClick={() => handleOpenSurprise(item)}
              className={`group relative rounded-2xl glass-panel glass-panel-hover p-6 border transition-all duration-300 cursor-pointer select-none text-center ${
                isFinal
                  ? 'sm:col-span-2 lg:col-span-1 border-gold-400 bg-midnight-900/90 shadow-gold-sm'
                  : 'border-gold-500/25'
              }`}
            >
              {/* Top Status Icon / Gift Box Shape */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-0.5 shadow-gold mb-4 group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-full bg-midnight-950 flex items-center justify-center">
                  {getIcon(item.iconType)}
                </div>

                {isOpened && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-midnight-950 flex items-center justify-center shadow-md">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Box Title */}
              <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-gold-200 transition-colors mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gold-400/80 font-serif mb-4">
                {item.subtitle}
              </p>

              {/* Status Badge */}
              <div className="pt-3 border-t border-gold-500/15">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  isOpened
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'bg-gold-500/15 text-gold-300 border border-gold-500/30 group-hover:bg-gold-500/25'
                }`}>
                  {isOpened ? 'Сюрприз открыт ✓' : 'Нажмите, чтобы открыть 🎁'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button to Next Section: Shared Plans */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg gold-gradient-btn inline-flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Calendar className="w-5 h-5 text-midnight-950 group-hover:rotate-6 transition-transform" />
          <span>Перейти к совместным планам 🗓️</span>
        </button>
      </div>

      {/* SURPRISE REVEAL MODAL */}
      {activeSurprise && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveSurprise(null);
          }}
        >
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold-400/50 shadow-2xl bg-midnight-900/95 text-center">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveSurprise(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-gold-500/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon Header */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-gold-500 to-gold-200 p-0.5 shadow-gold mb-4 animate-float">
              <div className="w-full h-full rounded-full bg-midnight-950 flex items-center justify-center">
                {getIcon(activeSurprise.iconType)}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 gold-gradient-text mb-2">
              {activeSurprise.contentTitle}
            </h3>

            {/* Optional Media */}
            {activeSurprise.mediaUrl && (
              <div className="my-4 rounded-2xl overflow-hidden border border-gold-500/30 max-h-56 shadow-lg">
                <img
                  src={activeSurprise.mediaUrl}
                  alt={activeSurprise.contentTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Text Message */}
            <div className="p-4 sm:p-6 rounded-2xl bg-midnight-950/80 border border-gold-500/20 shadow-inner my-4">
              <p className="text-base sm:text-lg text-slate-100 font-serif leading-relaxed">
                {activeSurprise.contentText}
              </p>
            </div>

            <button
              onClick={() => setActiveSurprise(null)}
              className="mt-2 px-8 py-2.5 rounded-full text-sm font-semibold gold-gradient-btn cursor-pointer"
            >
              Спасибо за сюрприз! ✨
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
