'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HevesOMeter from './components/HevesOMeter';
import StepIntro from './components/StepIntro';
import StepPitch from './components/StepPitch';
import StepSabotage from './components/StepSabotage';
import StepGuarantee from './components/StepGuarantee';
import StepCalendar from './components/StepCalendar';
import StepFinal from './components/StepFinal';
import ScrollIndicator from './components/ScrollIndicator';

const TOTAL_STEPS = 6;

// Heves percentages for each step
const STEP_PERCENTAGES = [0, 25, 50, 75, 100, 100];

const pageVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.1, y: -20 },
};

const pageTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
};

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepIntro key="step-0" onNext={handleNext} />;
      case 1:
        return <StepPitch key="step-1" onNext={handleNext} />;
      case 2:
        return <StepSabotage key="step-2" onNext={handleNext} />;
      case 3:
        return <StepGuarantee key="step-3" onNext={handleNext} />;
      case 4:
        return <StepCalendar key="step-4" onNext={handleNext} />;
      case 5:
        return <StepFinal key="step-5" />;
      default:
        return null;
    }
  };

  return (
    <main className="app-container">
      {/* Progress bar — hidden on final step */}
      {currentStep < TOTAL_STEPS - 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '640px', marginBottom: '2rem' }}
        >
          <HevesOMeter percentage={STEP_PERCENTAGES[currentStep]} />
        </motion.div>
      )}

      {/* Step content with page transitions */}
      <div className="step-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Akıllı Kaydırma Göstergesi */}
      <ScrollIndicator />
    </main>
  );
}
