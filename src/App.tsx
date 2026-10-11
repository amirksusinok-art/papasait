import { useState, useEffect } from 'react';
import { GoldenParticles } from './components/GoldenParticles';
import { HeaderNav } from './components/HeaderNav';
import { GiftBoxSection } from './components/sections/GiftBoxSection';
import { GreetingSection } from './components/sections/GreetingSection';
import { PhotoGallerySection } from './components/sections/PhotoGallerySection';
import { MemoryBookSection } from './components/sections/MemoryBookSection';
import { MessagesSection } from './components/sections/MessagesSection';
import { QuizSection } from './components/sections/QuizSection';
import { SurprisesSection } from './components/sections/SurprisesSection';
import { PlansSection } from './components/sections/PlansSection';
import { FinaleSection } from './components/sections/FinaleSection';

const STEP_NAMES = [
  'Подарок',
  'Поздравление',
  'Галерея',
  'Воспоминания',
  'Послания',
  'Викторина',
  'Сюрпризы',
  'Планы',
  'Финал',
];

export function App() {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gift_current_step');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const handleNavigate = (step: number) => {
    if (step < 0 || step >= STEP_NAMES.length) return;
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      localStorage.setItem('gift_current_step', step.toString());
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const handleRestart = () => {
    handleNavigate(0);
  };

  const handleGoToGallery = () => {
    handleNavigate(2);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950 text-slate-100 flex flex-col justify-between selection:bg-gold-500 selection:text-midnight-950">
      
      {/* Ambient Floating Golden Particles */}
      <GoldenParticles />

      {/* Persistent Navigation Header */}
      <HeaderNav
        currentStep={currentStep}
        totalSteps={STEP_NAMES.length}
        stepNames={STEP_NAMES}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 pt-16 sm:pt-20 pb-12 transition-all duration-500">
        {currentStep === 0 && (
          <GiftBoxSection onOpenComplete={() => handleNavigate(1)} />
        )}
        {currentStep === 1 && (
          <GreetingSection onNext={() => handleNavigate(2)} />
        )}
        {currentStep === 2 && (
          <PhotoGallerySection onNext={() => handleNavigate(3)} />
        )}
        {currentStep === 3 && (
          <MemoryBookSection onNext={() => handleNavigate(4)} />
        )}
        {currentStep === 4 && (
          <MessagesSection onNext={() => handleNavigate(5)} />
        )}
        {currentStep === 5 && (
          <QuizSection onNext={() => handleNavigate(6)} />
        )}
        {currentStep === 6 && (
          <SurprisesSection onNext={() => handleNavigate(7)} />
        )}
        {currentStep === 7 && (
          <PlansSection onNext={() => handleNavigate(8)} />
        )}
        {currentStep === 8 && (
          <FinaleSection
            onRestart={handleRestart}
            onGoToGallery={handleGoToGallery}
          />
        )}
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 py-6 text-center text-xs text-gold-400/60 font-serif border-t border-gold-500/10">
        <p>Сделано с любовью для самого лучшего папы • С днём рождения! ✨</p>
      </footer>

    </div>
  );
}

export default App;
