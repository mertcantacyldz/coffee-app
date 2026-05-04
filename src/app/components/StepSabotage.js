import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const EXCUSES = [
  { id: 1, text: "Çok yoğunum yaa", answer: "Sen ne zaman dersen o zaman!", color: "#ef4444" },
  { id: 2, text: "Dışarısı çok sıcak", answer: "Klimayı fulledik, içerisi buz gibi söz!", color: "#3b82f6" },
  { id: 3, text: "Kalabalığı ve gürültüyü pek sevmem.", answer: "Sakinlik garantili, senin en rahat edeceğin o köşeyi beraber bulacağız.", color: "#f59e0b" },
  { id: 4, text: "Hazırlanmaya üşeniyorum", answer: "Hazırlanmaya hiç gerek yok, en hazırlanmamış halin bile mekanı aydınlatmaya yeter.", color: "#8b5cf6" }
];

export default function StepSabotage({ onNext }) {
  const [poppedBalloons, setPoppedBalloons] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showKlima, setShowKlima] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);

  useEffect(() => {
    if (poppedBalloons.length === EXCUSES.length && poppedBalloons.length > 0) {
      const timer = setTimeout(() => {
        setShowFinalButton(true);
      }, 2000); // 2 saniye bekle
      return () => clearTimeout(timer);
    }
  }, [poppedBalloons]);

  const handlePop = useCallback((excuse, event) => {
    // Trigger confetti at click position
    const rect = event.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: [excuse.color, '#ffffff', '#facc15']
    });

    setPoppedBalloons(prev => [...prev, excuse.id]);
    setCurrentAnswer(excuse.answer);

    if (excuse.id === 2) {
      setShowKlima(true);
      setTimeout(() => setShowKlima(false), 5500);
    }
  }, []);

  const allPopped = poppedBalloons.length === EXCUSES.length;

  return (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>

      <h2 style={{ color: 'var(--accent-coffee)', marginBottom: '0.5rem' }}>
        Bahane İmha Üssü 🎈
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Aklındaki bahaneleri tek tek patlat, zihnini boşalt!
      </p>

      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <AnimatePresence>
          {EXCUSES.map((excuse) => {
            if (poppedBalloons.includes(excuse.id)) return null;

            return (
              <motion.div
                key={excuse.id}
                initial={{ scale: 0, y: 50 }}
                animate={{
                  scale: 1,
                  y: [0, -15, 0],
                  rotate: [-2, 2, -2]
                }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                transition={{
                  y: { repeat: Infinity, duration: 2 + Math.random(), ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 3 + Math.random(), ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 300, damping: 20 }
                }}
                onClick={(e) => handlePop(excuse, e)}
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${excuse.color}aa, ${excuse.color})`,
                  color: 'white',
                  padding: '20px',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  cursor: 'pointer',
                  boxShadow: `0 10px 20px ${excuse.color}66`,
                  fontWeight: 'bold',
                  width: '120px',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  userSelect: 'none'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {excuse.text}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div style={{ height: '60px', marginTop: '1rem' }}>
        <AnimatePresence mode="wait">
          {currentAnswer && !showFinalButton && (
            <motion.div
              key={currentAnswer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                background: 'var(--bg-card-hover)',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-coffee)',
                fontWeight: '600',
                display: 'inline-block',
                border: '1px solid var(--border-glass)'
              }}
            >
              ✨ {currentAnswer}
            </motion.div>
          )}

          {showFinalButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <button onClick={onNext} className="btn-primary" style={{ animation: 'pulse 2s infinite' }}>
                Bahaneler Bittiğine Göre...
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(212, 163, 115, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(212, 163, 115, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 163, 115, 0); }
        }
      `}</style>

      <AnimatePresence>
        {showKlima && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowKlima(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)',
              cursor: 'pointer'
            }}
          >
            <img
              src="/image/klima.png"
              alt="Klima"
              style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '15px' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
