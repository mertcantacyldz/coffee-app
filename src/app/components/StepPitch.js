import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function StepPitch({ onNext }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="glass-card" style={{ padding: 'var(--card-padding)', textAlign: 'left', position: 'relative' }}>

      {/* Small Lottie in the corner */}
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: 'var(--lottie-corner-size)', height: 'var(--lottie-corner-size)', opacity: 0.8, pointerEvents: 'none' }}>
        <DotLottieReact
          src="https://lottie.host/9e8807f1-9f3e-4b8b-b752-2bdbb6784fc9/DARt0p08mb.lottie"
          loop
          autoplay
        />
      </div>

      <h2 style={{ color: 'var(--accent-coffee)', marginBottom: 'var(--gap-md)', textAlign: 'center', fontSize: 'var(--title-size)' }}>
        Neden Bu Kahve <span style={{ color: 'var(--accent-orange)' }}>İçilmeli?</span>
      </h2>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} style={{ marginBottom: 'var(--gap-md)' }}>
          <h3 style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📈</span> Kazanımların
          </h3>
          <ul style={{ listStyle: 'none', marginTop: '10px', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>✨ <strong>Kaliteli sohbet:</strong> Ufuk açan beyin fırtınaları garantili.</li>
            <li style={{ marginBottom: '8px' }}>☕ <strong>En iyi kahve:</strong> Benden! (Gerçekten iyi kahve).</li>
            <li style={{ marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span>🃏 <strong>Sağlam Espriler:</strong> Mertcan'ın kaliteli mizah anlayışı.</span>
              </div>
              <div
                style={{
                  background: 'var(--bg-card-hover)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: 'var(--accent-orange)',
                  borderLeft: '3px solid var(--accent-orange)',
                  marginTop: '4px'
                }}
              >
                <strong>Kanıt:</strong> Cem Yılmaz da Sivaslı, ben de Sivaslıyım.
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginBottom: 'var(--gap-lg)' }}>
          <h3 style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📉</span> Kayıplarım (Eğer Hayır Dersen)
          </h3>
          <ul style={{ listStyle: 'none', marginTop: '10px', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>❌ Bu kadar app'i boşuna mı kodladık?</li>
            <li style={{ marginBottom: '8px' }}>🥺 Mertcan'ın hevesi kursağında kalır...</li>
            <li style={{ marginBottom: '8px' }}>🎤 Bedava stand-up</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
          <button onClick={onNext} className="btn-primary">
            Mantıklı, Devam Edelim!
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
