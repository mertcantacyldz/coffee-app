'use client';

import { motion } from 'framer-motion';
import TrollingButton from './TrollingButton';
import styles from './StepFeatures.module.css';

const features = [
  {
    icon: '✨',
    text: 'Benimle eşsiz, vizyonlu ve <strong>bol gülmeli sohbet</strong>.',
  },
  {
    icon: '🎵',
    text: "Emir Can İğrek'ten kulakların pasını silecek <strong>canlı performans</strong>.",
  },
  {
    icon: '🎤',
    text: 'Şarkılara avaz avaz eşlik edip haftanın tüm <strong>stresini atma seansı</strong>.',
  },
  {
    icon: '🔥',
    text: 'Ertesi sabah için garantili <strong>ses kısıklığı</strong> (Promosyon!).',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function StepFeatures({ onNext }) {
  return (
    <div className={styles.container}>
      <motion.h1
        className={`${styles.title} text-gradient`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Eğer &quot;Evet&quot; dersen kilidini açacağın özellikler:
      </motion.h1>

      <motion.ul
        className={styles.featureList}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className={`${styles.featureItem} glass-card`}
            variants={itemVariants}
          >
            <span className={styles.featureIcon}>{feature.icon}</span>
            <span
              className={styles.featureText}
              dangerouslySetInnerHTML={{ __html: feature.text }}
            />
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{ width: '100%' }}
      >
        <TrollingButton
          yesLabel="BU PAKET TAM BENLİK!"
          noLabel="Maalesef gelemem"
          trollLabel="Hayır seçeneği şu an bakımda, lütfen Evet'i deneyin!"
          onYesClick={onNext}
        />
      </motion.div>
    </div>
  );
}
