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
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        style={{ width: '250px', height: '250px', margin: '0 auto 1rem auto' }}
      >
        <DotLottieReact
          src="https://lottie.host/ef8815b7-6069-4a32-b5ea-eb468f72af69/qavrcRUd3V.lottie"
          loop
          autoplay
        />
      </motion.div>

      <h2 style={{ color: 'var(--accent-coffee)', marginBottom: '1rem', fontSize: '1.8rem' }}>
        İşte Bu Kadar! 🥂
      </h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Mükemmel! Seçtiğin tarih Mertcan'ın ajandasına başarıyla not edildi. Güzel bir sohbet bizi bekliyor!
      </p>

      {!agreed ? (
        <motion.button
          onClick={handleAgree}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
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
