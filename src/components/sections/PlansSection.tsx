import React, { useState } from 'react';
import { Check, Trees, Utensils, Gamepad2, Film, Crown, Sparkles, HeartHandshake } from 'lucide-react';
import { triggerGoldConfetti } from '../../utils/confetti';
import { giftContent } from '../../data/giftContent';

interface PlansSectionProps {
  onNext: () => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onNext }) => {
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gift_selected_plans');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const plans = giftContent.plans.items;

  const toggleSelectPlan = (id: string) => {
    let updated: string[];
    if (selectedPlanIds.includes(id)) {
      updated = selectedPlanIds.filter((p) => p !== id);
    } else {
      updated = [...selectedPlanIds, id];
      triggerGoldConfetti();
    }
    setSelectedPlanIds(updated);
    try {
      localStorage.setItem('gift_selected_plans', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const getPlanIcon = (name: string) => {
    switch (name) {
      case 'Trees':
        return <Trees className="w-6 h-6 text-emerald-400" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-gold-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6 text-sky-400" />;
      case 'Film':
        return <Film className="w-6 h-6 text-rose-400" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-gold-300" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gold-300 bg-gold-500/10 border border-gold-500/30 mb-3 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Раздел 08
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-3">
          {giftContent.plans.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-serif">
          {giftContent.plans.sectionSubtitle}
        </p>
      </div>

      {/* Grid of Shared Plans Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
        {plans.map((plan) => {
          const isSelected = selectedPlanIds.includes(plan.id);

          return (
            <div
              key={plan.id}
              onClick={() => toggleSelectPlan(plan.id)}
              className={`group relative rounded-2xl p-6 glass-panel glass-panel-hover border transition-all duration-300 cursor-pointer select-none flex flex-col justify-between ${
                isSelected
                  ? 'border-gold-400 bg-midnight-900/90 shadow-gold'
                  : 'border-gold-500/25'
              }`}
            >
              <div>
                {/* Header with Icon and Select Box */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-midnight-950 border border-gold-500/30 flex items-center justify-center shadow-md">
                    {getPlanIcon(plan.iconName)}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectPlan(plan.id);
                    }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-tr from-gold-500 to-gold-300 border-gold-200 text-midnight-950 shadow-gold-sm'
                        : 'border-gold-500/40 bg-midnight-950/60 text-transparent hover:border-gold-400'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${isSelected ? 'opacity-100 font-bold' : 'opacity-0'}`} />
                  </button>
                </div>

                <span className="text-[11px] font-medium text-gold-400/90 uppercase tracking-wider">
                  {plan.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-gold-200 transition-colors mb-2">
                  {plan.title}
                </h3>
                <p className="text-sm text-slate-300 font-serif leading-relaxed mb-4">
                  {plan.description}
                </p>
              </div>

              {/* Selection Button */}
              <div className="pt-4 border-t border-gold-500/15">
                <span
                  className={`text-xs font-semibold py-1.5 px-3.5 rounded-full inline-flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-gold-500/20 text-gold-200 border border-gold-400/40'
                      : 'text-slate-400 hover:text-gold-300'
                  }`}
                >
                  {isSelected ? '✓ План выбран!' : '+ Выбрать этот план'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Plans Feedback Counter */}
      {selectedPlanIds.length > 0 && (
        <div className="mb-8 text-center animate-fade-in">
          <p className="text-sm font-serif text-gold-300 bg-gold-500/10 border border-gold-500/25 px-5 py-2 rounded-full inline-block shadow-gold-sm">
            ✨ Папа выбрал {selectedPlanIds.length} {selectedPlanIds.length === 1 ? 'план' : 'плана'} для совместного времени!
          </p>
        </div>
      )}

      {/* Button to Grand Finale */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg gold-gradient-btn inline-flex items-center justify-center gap-3 cursor-pointer group"
        >
          <HeartHandshake className="w-5 h-5 text-midnight-950 group-hover:scale-110 transition-transform" />
          <span>Перейти к главному финалу ❤️</span>
        </button>
      </div>

    </section>
  );
};
