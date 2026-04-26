'use client';

import styles from './ProgressBar.module.css';
import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className={styles.progressBar}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < totalSteps - 1 ? 1 : 0 }}>
          <motion.div
            className={`${styles.step} ${i === currentStep ? styles.active : ''} ${i < currentStep ? styles.completed : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: i === currentStep ? 1.1 : 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {i < currentStep ? '✓' : i + 1}
          </motion.div>
          {i < totalSteps - 1 && (
            <div className={`${styles.connector} ${i < currentStep ? styles.filled : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}
