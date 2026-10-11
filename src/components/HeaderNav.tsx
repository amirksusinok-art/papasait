import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ambientPlayer } from '../utils/audioSynth';
import { giftContent } from '../data/giftContent';

interface HeaderNavProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
  onNavigate: (step: number) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentStep,
  totalSteps,
  stepNames,
  onNavigate,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(() => {
    return localStorage.getItem('gift_music_state') === 'true';
  });

  useEffect(() => {
    if (giftContent.music?.customAudioUrl) {
      ambientPlayer.setCustomUrl(giftContent.music.customAudioUrl);
    }

    if (isPlayingMusic) {
      ambientPlayer.start().catch(() => {
        setIsPlayingMusic(false);
      });
    }
  }, []);

  const toggleMusic = async () => {
    if (isPlayingMusic) {
      ambientPlayer.stop();
      setIsPlayingMusic(false);
      localStorage.setItem('gift_music_state', 'false');
    } else {
      await ambientPlayer.start();
      setIsPlayingMusic(true);
      localStorage.setItem('gift_music_state', 'true');
    }
  };

  // If in first step (hero gift box), keep header very subtle so it doesn't break immersion
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 transition-all duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 bg-midnight-900/80 backdrop-blur-md border border-gold-500/20 rounded-full px-3 sm:px-5 py-2 shadow-card-dark">
        
        {/* Navigation Back */}
        <div className="flex items-center gap-1 sm:gap-2">
          {currentStep > 0 ? (
            <button
              onClick={() => onNavigate(currentStep - 1)}
              className="flex items-center gap-1 text-xs sm:text-sm text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 px-2 sm:px-3 py-1.5 rounded-full transition-all"
              title="Назад"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Назад</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1 text-gold-400/80 text-xs font-serif tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>Папа, открой подарок</span>
            </div>
          )}
        </div>

        {/* Center Progress Indicator */}
        <div className="flex flex-col items-center flex-1 max-w-xs mx-2">
          <div className="text-[11px] sm:text-xs text-gold-200/90 font-medium truncate text-center mb-1">
            <span className="text-gold-400 font-semibold">{currentStep + 1} / {totalSteps}</span>
            <span className="mx-1.5 text-slate-500">•</span>
            <span>{stepNames[currentStep]}</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1 sm:gap-1.5 w-full justify-center">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-5 sm:w-6 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-sm'
                    : idx < currentStep
                    ? 'w-1.5 sm:w-2 bg-gold-600/70'
                    : 'w-1.5 sm:w-2 bg-slate-700/60'
                }`}
                title={stepNames[idx]}
                aria-label={`Перейти к: ${stepNames[idx]}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Sound Toggle & Next button */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Music Button */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isPlayingMusic
                ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-gold-sm'
                : 'text-slate-400 hover:text-gold-200 hover:bg-white/5 border border-transparent'
            }`}
            title={isPlayingMusic ? 'Выключить мелодию' : 'Включить праздничную мелодию'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
                <span className="hidden md:inline text-[11px] font-sans">Музыка</span>
                {/* Audio waves visualizer */}
                <span className="flex items-center gap-0.5 ml-0.5 h-3">
                  <span className="w-0.5 h-2 bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-0.5 h-3 bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-0.5 h-1.5 bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline text-[11px]">Мелодия</span>
              </>
            )}
          </button>

          {/* Next button */}
          {currentStep < totalSteps - 1 && (
            <button
              onClick={() => onNavigate(currentStep + 1)}
              className="flex items-center gap-1 text-xs sm:text-sm text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 px-2 sm:px-3 py-1.5 rounded-full transition-all"
              title="Далее"
            >
              <span className="hidden sm:inline">Далее</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
