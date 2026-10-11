import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { triggerGoldConfetti } from '../../utils/confetti';
import { giftContent } from '../../data/giftContent';

interface GiftBoxSectionProps {
  onOpenComplete: () => void;
}

export const GiftBoxSection: React.FC<GiftBoxSectionProps> = ({ onOpenComplete }) => {
  const [animationState, setAnimationState] = useState<'idle' | 'opening' | 'opened'>('idle');
  const [showBurstLight, setShowBurstLight] = useState(false);

  const handleOpen = () => {
    if (animationState !== 'idle') return;

    setAnimationState('opening');

    // Untie ribbon & open lid
    setTimeout(() => {
      setShowBurstLight(true);
      triggerGoldConfetti();
    }, 600);

    // Complete opening and transition
    setTimeout(() => {
      setAnimationState('opened');
      setTimeout(() => {
        onOpenComplete();
      }, 500);
    }, 1800);
  };

  const handleSkip = () => {
    setAnimationState('opened');
    onOpenComplete();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-16 text-center select-none overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Headline Text */}
      <div className="relative z-10 max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-in">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gold-300 bg-gold-500/10 border border-gold-500/30 mb-3 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          {giftContent.hero.badge}
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-100 tracking-wide leading-tight gold-gradient-text px-2">
          {giftContent.hero.headline}
        </h1>
      </div>

      {/* 3D GIFT BOX CONTAINER */}
      <div className="relative z-20 my-4 sm:my-8 perspective-1200 cursor-pointer" onClick={handleOpen}>
        
        {/* Golden Light Burst from inside the box */}
        {showBurstLight && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-gold-300/60 via-gold-400/80 to-transparent blur-3xl animate-pulse-glow z-30 pointer-events-none" />
        )}

        {/* The 3D Box Assembly */}
        <div
          className={`relative w-52 h-52 sm:w-64 sm:h-64 mx-auto preserve-3d transition-all duration-700 ease-out ${
            animationState === 'idle'
              ? 'hover:scale-105 animate-float'
              : animationState === 'opening'
              ? 'scale-110 sm:scale-125'
              : 'scale-125 opacity-0 pointer-events-none'
          }`}
          style={{
            transform: animationState === 'idle'
              ? 'rotateX(14deg) rotateY(-18deg)'
              : 'rotateX(20deg) rotateY(-10deg)',
          }}
        >

          {/* BOX LID (Separated and lifts up) */}
          <div
            className={`absolute -top-3 left-1/2 -translate-x-1/2 w-56 sm:w-68 h-14 sm:h-16 rounded-lg z-30 preserve-3d transition-all duration-1000 ease-out`}
            style={{
              transform: animationState === 'opening'
                ? 'translateY(-110px) rotateX(-65deg) scale(0.95)'
                : 'translateY(0) rotateX(0deg)',
              background: 'linear-gradient(145deg, #162c64 0%, #0d1a3c 100%)',
              border: '2px solid rgba(212, 175, 55, 0.45)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.2)',
            }}
          >
            {/* Ribbon over lid - Horizontal */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-5 sm:h-6 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 shadow-gold-sm" />
            
            {/* Ribbon over lid - Vertical */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-5 sm:w-6 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 shadow-gold-sm" />

            {/* Realistic Golden Ribbon Bow */}
            <div
              className={`absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-500 ${
                animationState === 'opening' ? 'opacity-0 scale-50 -translate-y-4' : 'opacity-100 animate-ribbon'
              }`}
            >
              {/* Left loop */}
              <div className="w-8 sm:w-10 h-7 sm:h-9 border-4 border-gold-400 rounded-full bg-gold-500/40 -rotate-45 shadow-gold-sm" />
              {/* Knot Center */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gold-300 to-gold-600 shadow-gold z-10 border border-gold-200" />
              {/* Right loop */}
              <div className="w-8 sm:w-10 h-7 sm:h-9 border-4 border-gold-400 rounded-full bg-gold-500/40 rotate-45 shadow-gold-sm" />
            </div>
          </div>

          {/* BOX MAIN BODY */}
          <div
            className="absolute top-10 left-0 w-full h-44 sm:h-52 rounded-xl preserve-3d overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #10214c 0%, #070f24 100%)',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.15)',
            }}
          >
            {/* Box Front Face Specular Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Vertical Ribbon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-6 sm:w-7 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 shadow-gold-sm">
              <div className="h-full w-0.5 mx-auto bg-gold-200/50" />
            </div>

            {/* Horizontal Ribbon */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-6 sm:h-7 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 shadow-gold-sm">
              <div className="w-full h-0.5 my-auto bg-gold-200/50" />
            </div>

            {/* Golden Core Inner Glow (visible when opening) */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-gold-400/40 via-gold-300/30 to-transparent transition-opacity duration-700 ${
                animationState === 'opening' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Subtle Shadow Beneath the Box */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-6 bg-black/60 rounded-full blur-md" />
        </div>

      </div>

      {/* Bottom Subtitle & Action Buttons */}
      <div className="relative z-10 max-w-md mx-auto mt-6 sm:mt-10 flex flex-col items-center gap-3">
        <p className="text-sm sm:text-base text-gold-300/90 font-serif tracking-wider">
          {giftContent.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2">
          <button
            onClick={handleOpen}
            disabled={animationState !== 'idle'}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-base sm:text-lg gold-gradient-btn flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-80"
          >
            <Gift className="w-5 h-5 text-midnight-950 group-hover:rotate-12 transition-transform duration-300" />
            <span>{animationState === 'opening' ? 'Подарок открывается...' : giftContent.hero.openButtonText}</span>
          </button>

          {animationState === 'idle' && (
            <button
              onClick={handleSkip}
              className="text-xs text-slate-400 hover:text-gold-300 underline underline-offset-4 px-3 py-1.5 transition-colors"
            >
              {giftContent.hero.skipButtonText}
            </button>
          )}
        </div>

        <p className="text-[11px] text-slate-400 mt-2">
          Нажми на коробку или на кнопку, чтобы начать путешествие
        </p>
      </div>

    </section>
  );
};
