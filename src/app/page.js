'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProgressBar from './components/ProgressBar';
import StepIceBreaker from './components/StepIceBreaker';
import StepFeatures from './components/StepFeatures';
import StepFinalQuestion from './components/StepFinalQuestion';
import StepCelebration from './components/StepCelebration';

const TOTAL_STEPS = 4;

const pageVariants = {
  initial: { opacity: 0, x: 60, filter: 'blur(8px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -60, filter: 'blur(8px)' },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.5,
};

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepIceBreaker key="step-0" onNext={handleNext} />;
      case 1:
        return <StepFeatures key="step-1" onNext={handleNext} />;
      case 2:
        return <StepFinalQuestion key="step-2" onNext={handleNext} />;
      case 3:
        return <StepCelebration key="step-3" />;
      default:
        return null;
    }
  };

  return (
    <main className="app-container">
      {/* Progress bar — hidden on celebration step */}
      {currentStep < TOTAL_STEPS - 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
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
            style={{ width: '100%' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
