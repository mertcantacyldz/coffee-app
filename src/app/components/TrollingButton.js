'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TrollingButton.module.css';

const SOUND_FILES = ['/sounds/sounds1.mp3', '/sounds/sounds2.mp3', '/sounds/sounds3.mp3'];

function getRandomPosition() {
  // Broadened range: 5% to 95% for more dynamic movement
  const x = Math.floor(Math.random() * 90) + 5;
  const y = Math.floor(Math.random() * 90) + 5;
  
  return { x: `${x}%`, y: `${y}%` };
}

export default function TrollingButton({
  yesLabel,
  noLabel,
  trollLabel,
  onYesClick,
  onEscape,
}) {
  const [hasEscaped, setHasEscaped] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showTrollText, setShowTrollText] = useState(false);
  const noBtnRef = useRef(null);
  const audioRef = useRef(null);
  const lastSoundIndexRef = useRef(-1);

  // Play a random sound, avoiding repeating the same one
  const playRandomSound = useCallback(() => {
    try {
      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Pick a random sound, different from last
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * SOUND_FILES.length);
      } while (randomIndex === lastSoundIndexRef.current && SOUND_FILES.length > 1);

      lastSoundIndexRef.current = randomIndex;
      const audio = new Audio(SOUND_FILES[randomIndex]);
      audioRef.current = audio;
      audio.volume = 0.8;
      audio.play().catch(() => {});
    } catch (e) {
      // Silently fail if audio context isn't ready
    }
  }, []);

  // Escape the button with distance check
  const escapeButton = useCallback(() => {
    if (!noBtnRef.current) return;

    let newPos;
    let distance = 0;
    let attempts = 0;

    // Internal helper to calculate distance between percentages
    const getDist = (p1, p2) => {
      const x1 = parseFloat(p1.x);
      const x2 = parseFloat(p2.x);
      const y1 = parseFloat(p1.y);
      const y2 = parseFloat(p2.y);
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    // Try to find a position that is at least 30% away from current
    do {
      newPos = getRandomPosition();
      // If it's the first escape, any position is fine
      if (!hasEscaped) break;
      
      distance = getDist(noPosition, newPos);
      attempts++;
    } while (distance < 30 && attempts < 10);

    setNoPosition(newPos);
    setHasEscaped(true);
    setShowTrollText(true);
    setEscapeCount((prev) => prev + 1);
    playRandomSound();

    if (onEscape) onEscape();

    // Hide troll text after a while
    setTimeout(() => setShowTrollText(false), 2500);
  }, [playRandomSound, onEscape, noPosition, hasEscaped]);

  // Desktop & Mobile escape trigger
  const handleEscapeClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      escapeButton();
    },
    [escapeButton]
  );

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Initial position calculation on mount
  useEffect(() => {
    // Set initial centered position for no button before first escape
    // The button starts in flow, only goes to fixed after first escape
  }, []);

  return (
    <div className={styles.trollButtonContainer}>
      {/* Yes Button */}
      <motion.button
        className={`${styles.btn} ${styles.yesBtn}`}
        onClick={onYesClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {yesLabel}
      </motion.button>

      {/* No / Troll Button */}
      {!hasEscaped ? (
        /* Before first escape: button is in normal flow */
        <motion.button
          ref={noBtnRef}
          layoutId="troll-no-button"
          className={`${styles.btn} ${styles.noBtn}`}
          style={{ position: 'relative' }}
          onClick={handleEscapeClick}
          initial={{ opacity: 1 }}
        >
          {noLabel}
        </motion.button>
      ) : (
        /* After escape: button is fixed position, teleporting around the screen */
        <motion.button
          ref={noBtnRef}
          className={`${styles.btn} ${styles.noBtn}`}
          style={{
            position: 'fixed',
            transform: 'translate(-50%, -50%)', // Anchor to center of button
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
          {escapeCount > 0 ? trollLabel : noLabel}
        </motion.button>
      )}

      {/* Troll text popup */}
      <AnimatePresence>
        {showTrollText && hasEscaped && (
          <motion.div
            style={{
              position: 'fixed',
              left: noPosition.x,
              top: noPosition.y + 60,
              zIndex: 1002,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.trollText} style={{ position: 'relative', left: 0, transform: 'none', bottom: 'auto' }}>
              {trollLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
