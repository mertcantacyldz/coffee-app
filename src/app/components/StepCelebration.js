'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './StepCelebration.module.css';

// Concert date: May 2, 2026, 20:00 Turkey time (UTC+3)
const CONCERT_DATE = new Date('2026-05-02T20:00:00+03:00');

function getTimeLeft() {
  const now = new Date();
  const diff = CONCERT_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function StepCelebration() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const audioRef = useRef(null);
  const confettiRef = useRef(false);

  // Fire confetti on mount
  useEffect(() => {
    if (confettiRef.current) return;
    confettiRef.current = true;

    // Dynamic import to avoid SSR issues with canvas-confetti
    import('canvas-confetti').then((confettiModule) => {
      const confetti = confettiModule.default;

      // Fire multiple bursts
      const duration = 4000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#a855f7', '#ec4899', '#22c55e', '#fbbf24', '#3b82f6'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#a855f7', '#ec4899', '#22c55e', '#fbbf24', '#3b82f6'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Big burst
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#ec4899', '#22c55e', '#fbbf24', '#3b82f6'],
        });
      }, 500);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={styles.container}>
      <motion.span
        className={styles.emoji}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
      >
        🎉
      </motion.span>

      <motion.h1
        className={`${styles.title} text-gradient`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Harika!
      </motion.h1>

      <motion.p
        className={styles.message}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        Emir Can İğrek bizi bekler! Gerekli tüm bilgilendirmeyi birazdan yapacağım. 🎤
      </motion.p>

      <motion.div
        className={styles.countdownSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <p className={styles.countdownLabel}>Konsere Kalan Süre</p>
        <div className={styles.countdown}>
          {[
            { value: timeLeft.days, unit: 'Gün' },
            { value: timeLeft.hours, unit: 'Saat' },
            { value: timeLeft.minutes, unit: 'Dakika' },
            { value: timeLeft.seconds, unit: 'Saniye' },
          ].map((item, i) => (
            <motion.div
              key={item.unit}
              className={`${styles.countdownItem} glass-card`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            >
              <span className={styles.countdownNumber}>{pad(item.value)}</span>
              <span className={styles.countdownUnit}>{item.unit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <audio
        ref={audioRef}
        src="/sounds/last.mp3"
        preload="auto"
      />

      <motion.div
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <p className={styles.footerText}>— Hazırlayan ve sunan Mertcan Taçyıldız</p>
      </motion.div>
    </div>
  );
}
