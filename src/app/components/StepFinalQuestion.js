'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StepFinalQuestion.module.css';

const SOUND_FILES = ['/sounds/sounds1.mp3', '/sounds/sounds2.mp3', '/sounds/sounds3.mp3'];
const MAX_ESCAPES_BEFORE_FULLSCREEN = 6;

function getRandomPosition() {
  const x = Math.floor(Math.random() * 90) + 5;
  const y = Math.floor(Math.random() * 90) + 5;
  return { x: `${x}%`, y: `${y}%` };
}

export default function StepFinalQuestion({ onNext }) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [hasEscaped, setHasEscaped] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const noBtnRef = useRef(null);
  const audioRef = useRef(null);
  const lastSoundIndexRef = useRef(-1);

  // Calculate yes button scale based on escape count
  const yesScale = Math.min(1 + escapeCount * 0.35, 4);

  // Check if should go fullscreen
  useEffect(() => {
    if (escapeCount >= MAX_ESCAPES_BEFORE_FULLSCREEN) {
      setIsFullscreen(true);
    }
  }, [escapeCount]);

  const playRandomSound = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * SOUND_FILES.length);
      } while (randomIndex === lastSoundIndexRef.current && SOUND_FILES.length > 1);
      lastSoundIndexRef.current = randomIndex;

      const audio = new Audio(SOUND_FILES[randomIndex]);
      audioRef.current = audio;
      audio.volume = 0.8;
      audio.play().catch(() => {});
    } catch (e) {}
  }, []);

  const escapeButton = useCallback(() => {
    if (!noBtnRef.current) return;
    
    let newPos;
    let distance = 0;
    let attempts = 0;

    const getDist = (p1, p2) => {
      const x1 = parseFloat(p1.x);
      const x2 = parseFloat(p2.x);
      const y1 = parseFloat(p1.y);
      const y2 = parseFloat(p2.y);
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    do {
      newPos = getRandomPosition();
      if (!hasEscaped) break;
      distance = getDist(noPosition, newPos);
      attempts++;
    } while (distance < 30 && attempts < 10);

    setNoPosition(newPos);
    setHasEscaped(true);
    setEscapeCount((prev) => prev + 1);
    playRandomSound();
  }, [playRandomSound, noPosition, hasEscaped]);

  // Desktop & Mobile escape trigger
  const handleEscapeClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      escapeButton();
    },
    [escapeButton]
  );

  const handleYesClick = useCallback(() => {
    try {
      // Stop any current trolling sounds
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      // Start the celebration music immediately on click
      const celebrationAudio = new Audio('/sounds/emircan.mp3');
      celebrationAudio.volume = 0.8;
      celebrationAudio.play().catch(() => {
        console.warn("Celebration audio blocked even on click");
      });
      
      // We don't store it in ref here because we want it to keep playing 
      // after this component unmounts and StepCelebration mounts.
    } catch (e) {}
    
    onNext();
  }, [onNext]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Fullscreen yes overlay
  if (isFullscreen) {
    return (
      <motion.button
        className={styles.yesFullscreen}
        onClick={handleYesClick}
        initial={{ scale: 0, borderRadius: '50%' }}
        animate={{ scale: 1, borderRadius: '0%' }}
        transition={{ type: 'spring', stiffness: 80, damping: 15, duration: 0.8 }}
      >
        <motion.div
          className={styles.yesFullscreenText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span>EVET!</span>
          <span className={styles.yesFullscreenSub}>Artık başka seçeneğin kalmadı 😄</span>
        </motion.div>
      </motion.button>
    );
  }

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        O zaman haftaya,{' '}
        <span className={`${styles.highlight} text-gradient`}>Emir Can İğrek</span>{' '}
        konserinde ön saflarda yerimizi alıyor muyuz?
      </motion.h1>

      <div className={styles.buttonArea}>
        {/* Yes button — grows with each escape */}
        <motion.button
          className={styles.yesGiant}
          onClick={handleYesClick}
          animate={{
            scale: yesScale,
            zIndex: escapeCount > 3 ? 2000 : 10, // Bring to top as it gets huge
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 15,
          }}
          whileHover={{ boxShadow: '0 0 60px rgba(34, 197, 94, 0.5), 0 0 120px rgba(34, 197, 94, 0.25)' }}
          whileTap={{ scale: yesScale * 0.95 }}
        >
          EVET! 🎉
        </motion.button>
      </div>

      {/* Escaping No button */}
      {!hasEscaped ? (
        <motion.button
          ref={noBtnRef}
          layoutId="final-no-button"
          className={`${styles.noBtn} ${styles.noBtnInitial}`}
          onClick={handleEscapeClick}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          HAYIR
        </motion.button>
      ) : (
        <motion.button
          ref={noBtnRef}
          layoutId="final-no-button"
          className={styles.noBtn}
          style={{ 
            position: 'fixed',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            left: noPosition.x, 
            top: noPosition.y,
          }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.6,
          }}
          onClick={handleEscapeClick}
        >
          HAYIR
        </motion.button>
      )}

      {/* Escape counter */}
      <AnimatePresence>
        {escapeCount > 0 && !isFullscreen && (
          <motion.p
            className={styles.escapeCounter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={escapeCount}
          >
            Hayır butonu <span className={styles.escapeCounterNum}>{escapeCount}</span> kere kaçtı...
            {escapeCount >= 3 && ' Vazgeç artık 😄'}
            {escapeCount >= 5 && ' Son şansın!'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
