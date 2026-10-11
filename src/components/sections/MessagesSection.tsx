import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Play, Pause, Volume2, Sparkles, HelpCircle, X, Heart } from 'lucide-react';
import type { FamilyMessage } from '../../types';
import { giftContent } from '../../data/giftContent';

interface MessagesSectionProps {
  onNext: () => void;
}

export const MessagesSection: React.FC<MessagesSectionProps> = ({ onNext }) => {
  const [openedIds, setOpenedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gift_opened_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeMessage, setActiveMessage] = useState<FamilyMessage | null>(null);

  // Audio player state for letter modal
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const messages = giftContent.messages.items;

  const handleOpenEnvelope = (msg: FamilyMessage) => {
    setActiveMessage(msg);
    setIsPlayingAudio(false);
    setAudioProgress(0);

    if (!openedIds.includes(msg.id)) {
      const updated = [...openedIds, msg.id];
      setOpenedIds(updated);
      try {
        localStorage.setItem('gift_opened_messages', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
    }
  };

  const handleCloseModal = () => {
    setIsPlayingAudio(false);
    setActiveMessage(null);
  };

  // Mock audio simulation for heartfelt voice note
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 3.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gold-300 bg-gold-500/10 border border-gold-500/30 mb-3 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Раздел 05
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-3">
          {giftContent.messages.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-serif">
          {giftContent.messages.sectionSubtitle}
        </p>
      </div>

      {/* Grid of Envelope Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-12">
        {messages.map((msg) => {
          const isOpened = openedIds.includes(msg.id);

          return (
            <div
              key={msg.id}
              onClick={() => handleOpenEnvelope(msg)}
              className="group relative rounded-2xl glass-panel glass-panel-hover p-6 sm:p-7 border border-gold-500/25 cursor-pointer transition-all duration-300 select-none overflow-hidden"
            >
              {/* Envelope flap aesthetic top border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-500/40 via-gold-400 to-gold-500/40" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {/* Wax Seal / Stamp Icon */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 p-0.5 shadow-gold-sm shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-midnight-950 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gold-400 group-hover:rotate-6 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-gold-200 transition-colors">
                      {msg.from}
                    </h3>
                    <p className="text-xs text-gold-400/80 font-serif">
                      {msg.relation}
                    </p>
                  </div>
                </div>

                {/* Opened Badge */}
                {isOpened ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Открыто</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gold-500/15 text-gold-300 border border-gold-500/40 animate-pulse">
                    <span>Запечатано</span>
                  </span>
                )}
              </div>

              {/* Envelope Letter Preview Snippet */}
              <div className="mt-4 pt-4 border-t border-gold-500/15">
                <p className="text-sm text-slate-300 font-serif line-clamp-2 italic">
                  «{msg.text}»
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gold-400">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Нажмите, чтобы прочитать письмо →
                </span>
                {msg.audioDuration && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Volume2 className="w-3 h-3 text-gold-400" />
                    <span>Голосовое {msg.audioDuration}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Button to Next Section: Quiz */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg gold-gradient-btn inline-flex items-center justify-center gap-3 cursor-pointer group"
        >
          <HelpCircle className="w-5 h-5 text-midnight-950 group-hover:rotate-12 transition-transform" />
          <span>Перейти к викторине воспоминаний 🎯</span>
        </button>
      </div>

      {/* ENVELOPE OPENED MODAL */}
      {activeMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold-400/50 shadow-2xl bg-midnight-900/95">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-gold-500/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="text-center pb-4 mb-6 border-b border-gold-500/20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-serif mb-2">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Личное послание</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 gold-gradient-text">
                {activeMessage.from}
              </h3>
              <p className="text-xs text-gold-400/80 font-serif">
                {activeMessage.relation}
              </p>
            </div>

            {/* Attached Photo if available */}
            {activeMessage.photoUrl && (
              <div className="mb-6 rounded-2xl overflow-hidden border border-gold-500/30 shadow-lg max-h-56">
                <img
                  src={activeMessage.photoUrl}
                  alt={activeMessage.from}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Letter Text */}
            <div className="p-4 sm:p-6 rounded-2xl bg-midnight-950/80 border border-gold-500/20 shadow-inner mb-6">
              <p className="text-base sm:text-lg text-slate-100 font-serif leading-relaxed tracking-wide">
                «{activeMessage.text}»
              </p>
            </div>

            {/* Interactive Audio Player Component */}
            {activeMessage.audioDuration && (
              <div className="p-4 rounded-2xl bg-midnight-950/60 border border-gold-500/25 mb-6">
                <div className="flex items-center justify-between text-xs text-gold-300 mb-2">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Volume2 className="w-3.5 h-3.5 text-gold-400" />
                    Голосовое поздравление
                  </span>
                  <span>{activeMessage.audioDuration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950 flex items-center justify-center shrink-0 shadow-gold-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-4 h-4 fill-midnight-950" />
                    ) : (
                      <Play className="w-4 h-4 fill-midnight-950 ml-0.5" />
                    )}
                  </button>

                  {/* Progress scrub bar */}
                  <div className="flex-1">
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-400 to-gold-300 transition-all duration-300"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>{isPlayingAudio ? 'Воспроизведение...' : 'Нажмите Play'}</span>
                      <span>{activeMessage.audioDuration}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Button */}
            <div className="text-center pt-2">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-full text-sm font-medium bg-gold-500/20 text-gold-200 border border-gold-500/30 hover:bg-gold-500/30 transition-all cursor-pointer"
              >
                Закрыть письмо
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
