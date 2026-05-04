import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function StepCalendar({ onNext }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const emptyCells = Array.from({ length: startOffset }, (_, i) => i);

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const currentMonthName = `${monthNames[currentMonth]} ${currentYear}`;

  const handleDateSelect = (date, event) => {
    setSelectedDate(date);
    
    const rect = event.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#D4A373', '#432818', '#facc15', '#ffffff']
    });
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
      
      <h2 style={{ color: 'var(--accent-coffee)', marginBottom: '0.5rem' }}>
        Özgür Takvim 🗓️
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Bahaneleri minimuma indirdik. Ajandanı bana değil, beni ajandana göre ayarla. Patron sensin!
      </p>

      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '15px', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontWeight: 'bold', color: 'var(--accent-coffee)' }}>
          <span>&lt;</span>
          <span>{currentMonthName}</span>
          <span>&gt;</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '10px' }}>
          {days.map(day => (
            <div key={day} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{day}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
          {emptyCells.map(cell => (
            <div key={`empty-${cell}`} />
          ))}
          {dates.map(date => {
            const isSelected = selectedDate === date;
            return (
              <motion.div
                key={date}
                whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-caramel-light)' }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleDateSelect(date, e)}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'var(--gradient-main)' : 'var(--bg-card)',
                  color: isSelected ? 'white' : 'var(--text-primary)',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  boxShadow: isSelected ? 'var(--shadow-glow-caramel)' : 'none',
                  border: '1px solid var(--border-glass)',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s'
                }}
              >
                {date}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div style={{ height: '60px', marginTop: '1.5rem' }}>
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button onClick={onNext} className="btn-primary" style={{ width: '100%' }}>
                Tarihi Onayla
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
