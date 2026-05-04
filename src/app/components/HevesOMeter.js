import { motion } from 'framer-motion';

export default function HevesOMeter({ percentage }) {
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: 'var(--accent-coffee)'
      }}>
        <span>Heves-o-Metre</span>
        <span>%{percentage}</span>
      </div>
      <div style={{
        height: '16px',
        backgroundColor: 'var(--bg-glass)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        border: '1px solid var(--border-glass)',
        position: 'relative'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            height: '100%',
            background: 'var(--gradient-heves)',
            borderRadius: 'var(--radius-full)',
            position: 'absolute',
            left: 0,
            top: 0
          }}
        />
      </div>
    </div>
  );
}
