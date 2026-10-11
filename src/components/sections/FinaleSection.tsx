import React, { useEffect, useState } from 'react';
import { RotateCcw, Image, Video, Sparkles, Heart, X } from 'lucide-react';
import { triggerGrandConfetti } from '../../utils/confetti';
import { giftContent } from '../../data/giftContent';

interface FinaleSectionProps {
  onRestart: () => void;
  onGoToGallery: () => void;
}

export const FinaleSection: React.FC<FinaleSectionProps> = ({
  onRestart,
  onGoToGallery,
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const finale = giftContent.finale;

  useEffect(() => {
    // Grand celebration confetti upon arriving at the finale
    triggerGrandConfetti();
  }, []);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 py-16 max-w-4xl mx-auto text-center">
      
      {/* Background Soft Glow Beams */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-r from-gold-500/20 via-gold-400/30 to-amber-500/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Finale Main Container */}
      <div className="relative z-10 w-full glass-panel rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-gold-400/40 shadow-card-dark">
        
        {/* Top Celebration Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 font-serif text-xs sm:text-sm mb-6 shadow-gold-sm animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>С любовью от всей семьи</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        </div>

        {/* Big Family Centerpiece Photo Frame */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400/60 shadow-2xl bg-midnight-950 mb-8 max-h-[380px] sm:max-h-[460px] group">
          <img
            src={finale.mainPhotoUrl}
            alt="Вся наша семья"
            className="w-full h-full object-cover max-h-[440px] transition-transform duration-700 group-hover:scale-103"
          />
          {/* Inner Golden Border Accent */}
          <div className="absolute inset-0 border border-gold-300/30 pointer-events-none rounded-2xl m-2" />
        </div>

        {/* Main Emotional Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-6 leading-tight">
          {finale.title}
        </h2>

        {/* Grand Final Speech */}
        <div className="p-6 sm:p-8 rounded-2xl bg-midnight-950/70 border border-gold-500/25 mb-10 shadow-inner">
          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 font-serif leading-relaxed tracking-wide">
            «{finale.message}»
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {/* Restart Story */}
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-white/5 hover:bg-gold-500/15 text-slate-200 hover:text-gold-200 border border-gold-500/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-gold-400" />
            <span>{finale.buttons.restart}</span>
          </button>

          {/* Go to Gallery */}
          <button
            onClick={onGoToGallery}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-white/5 hover:bg-gold-500/15 text-slate-200 hover:text-gold-200 border border-gold-500/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Image className="w-4 h-4 text-gold-400" />
            <span>{finale.buttons.gallery}</span>
          </button>

          {/* Video Congratulation Button */}
          {finale.videoUrl && (
            <button
              onClick={() => setShowVideoModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold gold-gradient-btn inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video className="w-5 h-5 text-midnight-950" />
              <span>{finale.buttons.watchVideo}</span>
            </button>
          )}
        </div>

      </div>

      {/* VIDEO GREETING MODAL */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 select-none animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowVideoModal(false);
          }}
        >
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-4 sm:p-6 border-2 border-gold-400/50 shadow-2xl bg-midnight-900/95">
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-gold-500/20 transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-gold-300 mb-4 text-center">
              Семейное видеопоздравление 🎬
            </h3>

            {/* Video Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gold-500/30 shadow-lg bg-black">
              <iframe
                src={finale.videoUrl}
                title="Семейное видеопоздравление"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
              Вы можете заменить ссылку на видео в файле <code>giftContent.ts</code>
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
