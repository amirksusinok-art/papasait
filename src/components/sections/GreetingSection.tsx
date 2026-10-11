import React from 'react';
import { Heart, Camera, Sparkles, Award } from 'lucide-react';
import { giftContent } from '../../data/giftContent';

interface GreetingSectionProps {
  onNext: () => void;
}

export const GreetingSection: React.FC<GreetingSectionProps> = ({ onNext }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 max-w-3xl mx-auto">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Greeting Card */}
      <div className="relative z-10 w-full glass-panel rounded-3xl p-6 sm:p-10 md:p-12 text-center border border-gold-500/30 shadow-card-dark transition-all duration-500">
        
        {/* Top Decorative Emblem */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-0.5 shadow-gold mb-6 sm:mb-8 animate-float">
          <div className="w-full h-full rounded-full bg-midnight-950 flex items-center justify-center">
            <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gold-400" />
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-6">
          {giftContent.greeting.mainTitle}
        </h2>

        {/* Golden Divider Line with Sparkle */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold-400" />
          <Sparkles className="w-4 h-4 text-gold-400" />
          <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Personal Message Paragraphs */}
        <div className="space-y-4 text-base sm:text-lg md:text-xl text-slate-200/95 font-serif leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-center">
          {giftContent.greeting.personalMessage.map((paragraph, idx) => (
            <p key={idx} className="tracking-wide">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Family Signature Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-200 font-serif text-sm sm:text-base mb-10 shadow-gold-sm">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          <span>{giftContent.greeting.familySignature}</span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg gold-gradient-btn inline-flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Camera className="w-5 h-5 text-midnight-950 group-hover:scale-110 transition-transform" />
            <span>{giftContent.greeting.buttonText}</span>
          </button>
        </div>

      </div>

    </section>
  );
};
