import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function StepFinal() {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setAgreed(true);
    // Play coffee machine sound if possible (fallback to confetti)
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4A373', '#432818', '#facc15', '#ffffff']
    });
  };

  return (
    <div className="glass-card" style={{ padding: 'var(--card-padding)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', damping: 15 }}
        style={{ width: 'var(--lottie-main-size)', height: 'var(--lottie-main-size)', margin: '0 auto 1rem auto' }}
      >
        <DotLottieReact
          src="https://lottie.host/4067d3c9-ef4f-4414-9ee2-227c597437b3/V3z2SEzpW2.lottie"
          loop
          autoplay
        />
      </motion.div>

      <h2 style={{ color: 'var(--accent-coffee)', marginBottom: '1rem', fontSize: 'var(--title-size)' }}>
        İşte Bu Kadar! 🥂
      </h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--gap-lg)', fontSize: 'var(--subtitle-size)' }}>
        Mükemmel! Seçtiğin tarih Mertcan'ın ajandasına başarıyla not edildi. Güzel bir sohbet bizi bekliyor!
      </p>

      {!agreed ? (
        <motion.button
          onClick={handleAgree}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: 'var(--btn-padding)', fontSize: '1.2rem' }}
        >
          Harika, Anlaştık! 🤝
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '1.2rem' }}
        >
          ✅ Anlaşma Sağlandı! Bekleniyorsun...
        </motion.div>
      )}

    </div>
  );
}
