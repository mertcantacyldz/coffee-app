import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function StepIntro({ onNext }) {
  return (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        <div style={{ width: '250px', height: '250px', margin: '0 auto' }}>
          <DotLottieReact
            src="https://lottie.host/f4687208-8ef0-4116-b254-dd04ef1e053b/c31hUXVtXS.lottie"
            loop
            autoplay
          />
        </div>

        <h1 style={{ color: 'var(--accent-coffee)', marginBottom: '1rem', fontSize: '1.8rem', fontWeight: 700 }}>
          Merhaba Helin! 👋 <br /> 
          <span 
            className="text-gradient" 
            style={{ 
              backgroundImage: 'var(--gradient-heves)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Reddedilemez Teklif
          </span>
        </h1>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Mertcan'la kahve içmeye ikna uygulamasına hoş geldin! Bu uygulama, keyifli bir tanışma ve iyi bir kahve için özel olarak senin için tasarlandı.
        </p>

        <h3 style={{ color: 'var(--accent-coffee)', marginBottom: '1.5rem', fontWeight: 600 }}>
          Hazır mısın?
        </h3>

        <motion.button
          onClick={onNext}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '1rem 3rem' }}
        >
          Hadi Başlayalım!
        </motion.button>
      </motion.div>
    </div>
  );
}
