import { motion } from 'framer-motion';

export default function StepGuarantee({ onNext }) {
  return (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 1.5rem',
          background: 'var(--gradient-heves)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '3rem',
          boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4)'
        }}
      >
        💯
      </motion.div>

      <h2 style={{ color: 'var(--accent-coffee)', marginBottom: '1rem', fontSize: '1.6rem' }}>
        Memnuniyet Garantisi!
      </h2>

      <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6', textAlign: 'left', background: 'var(--bg-card-hover)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid var(--accent-orange)' }}>
        Eğer kahveden veya sohbetten en ufak bir şekilde memnun kalmazsan, kurumsal iade paketimiz devreye girer:
        <ul style={{ listStyle: 'none', marginTop: '12px', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>📱 <strong>1.</strong> 5 adet <em>gerçekten komik</em> reels videosu hesabına iletilecek.</li>
          <li style={{ marginBottom: '10px' }}>🚫 <strong>2.</strong> Bir daha buluşma için kesinlikle dürtülmeyeceksin.</li>
          <li style={{ marginBottom: '10px' }}>🤫 <strong>3.</strong> 1 hafta boyunca hiçbir şekilde "Naber?" mesajı atılmayacak.</li>
          <li style={{ marginBottom: '5px' }}>👍 <strong>4.</strong> Instagram'da fotoğraflarını 3 ay boyunca kesin beğeni seçeneği sunulacak.</li>
        </ul>
      </div>

      <motion.button
        onClick={onNext}
        className="btn-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Bu Riske Girmeye Değer!
      </motion.button>
    </div>
  );
}
