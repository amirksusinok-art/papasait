import React, { useState, useRef } from 'react';
import { Mail, ChevronLeft, ChevronRight, Calendar, Bookmark, Sparkles } from 'lucide-react';
import { giftContent } from '../../data/giftContent';

interface MemoryBookSectionProps {
  onNext: () => void;
}

export const MemoryBookSection: React.FC<MemoryBookSectionProps> = ({ onNext }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const stories = giftContent.memories.stories;
  const currentStory = stories[currentStoryIndex];

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = () => {
    setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
  };

  const handleNext = () => {
    setCurrentStoryIndex((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gold-300 bg-gold-500/10 border border-gold-500/30 mb-3 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Раздел 04
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-3">
          {giftContent.memories.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-serif">
          {giftContent.memories.sectionSubtitle}
        </p>
      </div>

      {/* Book Container with Album Leather & Gold Aesthetic */}
      <div
        className="relative w-full glass-panel rounded-3xl p-4 sm:p-8 md:p-10 border border-gold-500/35 shadow-card-dark overflow-hidden mb-10 transition-all duration-500"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Book spine decorative left line */}
        <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-gold-600 via-gold-400 to-transparent opacity-40" />

        {/* Story Pagination Badges */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold-500/20 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-gold-300 font-serif">
            <Bookmark className="w-4 h-4 text-gold-400" />
            <span>Страница {currentStoryIndex + 1} из {stories.length}</span>
            {currentStory.tag && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full text-[11px] bg-gold-500/15 border border-gold-400/30 text-gold-200">
                {currentStory.tag}
              </span>
            )}
          </div>

          {currentStory.date && (
            <div className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>{currentStory.date}</span>
            </div>
          )}
        </div>

        {/* Story Two-Column Content (Photo on Left/Top, Story Narrative on Right/Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          {/* Photo Frame with Gold Border & Shadow */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400/40 shadow-xl bg-midnight-950 group">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                key={currentStory.imageUrl}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Vintage vignette corner accents */}
            <div className="absolute inset-0 border border-gold-300/20 pointer-events-none rounded-2xl m-2" />
          </div>

          {/* Narrative Story Description */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 gold-gradient-text mb-4 leading-snug">
                {currentStory.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-200 font-serif leading-relaxed tracking-wide">
                «{currentStory.story}»
              </p>
            </div>

            {/* In-Book Story Switchers */}
            <div className="flex items-center justify-between pt-6 border-t border-gold-500/15">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 text-xs sm:text-sm text-gold-300 hover:text-gold-100 bg-gold-500/10 hover:bg-gold-500/20 px-3.5 py-2 rounded-full border border-gold-500/30 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Предыдущая</span>
              </button>

              {/* Story selector dots */}
              <div className="flex items-center gap-1.5">
                {stories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStoryIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentStoryIndex ? 'w-5 bg-gold-400' : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 text-xs sm:text-sm text-gold-300 hover:text-gold-100 bg-gold-500/10 hover:bg-gold-500/20 px-3.5 py-2 rounded-full border border-gold-500/30 transition-all cursor-pointer"
              >
                <span>Следующая</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Button to Next Section: Family Messages */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg gold-gradient-btn inline-flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Mail className="w-5 h-5 text-midnight-950 group-hover:scale-110 transition-transform" />
          <span>Открыть послания от близких ✉️</span>
        </button>
      </div>

    </section>
  );
};
