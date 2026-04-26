'use client';

import { motion } from 'framer-motion';
import TrollingButton from './TrollingButton';
import styles from './StepIceBreaker.module.css';

export default function StepIceBreaker({ onNext }) {
  return (
    <div className={styles.container}>
      <motion.span
        className={styles.emoji}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        🎵
      </motion.span>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Önümüzdeki hafta konser akşamı için çoktan{' '}
        <span className={`${styles.highlight} text-gradient`}>sıkıcı bir plan</span>{' '}
        yaptın mı?
      </motion.h1>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Merhaba Helin! 👋 Seni özel bir etkinliğe davet etmeden önce küçük bir sorum var...
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ width: '100%' }}
      >
        <TrollingButton
          yesLabel="Hayır, bomboşum!"
          noLabel="Evet, çok meşgulüm"
          trollLabel="Yalan söyleme, biliyoruz boş olduğunu!"
          onYesClick={onNext}
        />
      </motion.div>
    </div>
  );
}
