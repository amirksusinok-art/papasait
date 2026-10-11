import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, ArrowRight, Sparkles, Gift } from 'lucide-react';
import { triggerGoldConfetti } from '../../utils/confetti';
import { giftContent } from '../../data/giftContent';

interface QuizSectionProps {
  onNext: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onNext }) => {
  const questions = giftContent.quiz.questions;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (selectedOptionIdx !== null) return; // Prevent double clicking
    setSelectedOptionIdx(index);

    if (currentQ.options[index].isCorrect) {
      setScore((prev) => prev + 1);
      triggerGoldConfetti();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIdx(null);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      triggerGoldConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 max-w-3xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gold-300 bg-gold-500/10 border border-gold-500/30 mb-3 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Раздел 06
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-3">
          {giftContent.quiz.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-serif">
          {giftContent.quiz.sectionSubtitle}
        </p>
      </div>

      {/* Main Quiz Card */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-card-dark transition-all duration-300">
        
        {!isCompleted ? (
          <div>
            {/* Top Question Progress Counter */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gold-300 mb-6 pb-3 border-b border-gold-500/20">
              <span className="font-serif">
                Вопрос {currentIdx + 1} из {questions.length}
              </span>
              <button
                onClick={onNext}
                className="text-slate-400 hover:text-gold-200 transition-colors cursor-pointer"
              >
                Пропустить викторину →
              </button>
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-100 mb-4 leading-snug">
              {currentQ.question}
            </h3>

            {/* Hint if present */}
            {currentQ.hint && (
              <p className="text-xs sm:text-sm text-gold-400/90 italic font-serif mb-6">
                💡 Подсказка: {currentQ.hint}
              </p>
            )}

            {/* Photo / Hint Image if provided */}
            {currentQ.previewImage && (
              <div className="mb-6 rounded-2xl overflow-hidden border border-gold-500/30 shadow-lg max-h-56">
                <img
                  src={selectedOptionIdx !== null && currentQ.fullImage ? currentQ.fullImage : currentQ.previewImage}
                  alt="Воспоминание"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const hasAnswered = selectedOptionIdx !== null;

                let btnStyles = 'bg-midnight-900/60 border-gold-500/20 text-slate-200 hover:border-gold-500/50';

                if (hasAnswered) {
                  if (opt.isCorrect) {
                    btnStyles = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-sm';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyles = 'bg-rose-500/20 border-rose-500 text-rose-200';
                  } else {
                    btnStyles = 'opacity-50 border-transparent text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left font-serif text-sm sm:text-base flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyles}`}
                  >
                    <span>{opt.text}</span>
                    {hasAnswered && opt.isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card revealed after answer */}
            {selectedOptionIdx !== null && (
              <div className="p-4 sm:p-5 rounded-2xl bg-midnight-950 border border-gold-400/40 shadow-inner mb-6 animate-fade-in">
                <p className="text-sm sm:text-base text-gold-200 font-serif leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="mt-4 text-right">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-full text-sm font-semibold gold-gradient-btn inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentIdx < questions.length - 1 ? 'Следующий вопрос' : 'Посмотреть итог'}</span>
                    <ArrowRight className="w-4 h-4 text-midnight-950" />
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* QUIZ COMPLETED SUMMARY */
          <div className="text-center py-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-gold-500 to-gold-200 p-0.5 shadow-gold mb-6">
              <div className="w-full h-full rounded-full bg-midnight-950 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-gold-400" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-slate-100 gold-gradient-text mb-3">
              Отличная память, папа!
            </h3>
            <p className="text-base sm:text-lg text-slate-200 font-serif mb-6 max-w-md mx-auto">
              Ты правильно ответил на {score} из {questions.length} вопросов! Наши общие воспоминания всегда с нами.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-medium bg-gold-500/10 text-gold-300 border border-gold-500/30 hover:bg-gold-500/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Пройти ещё раз</span>
              </button>

              <button
                onClick={onNext}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-base gold-gradient-btn inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Gift className="w-5 h-5 text-midnight-950" />
                <span>Открыть маленькие сюрпризы 🎁</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
