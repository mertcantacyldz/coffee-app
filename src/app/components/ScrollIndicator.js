'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Eğer sayfa sığmıyorsa (içerik ekran yüksekliğinden fazlaysa)
      if (scrollHeight > clientHeight + 10) {
        // En alta inilmemişse oku göster (alt sınırda 40px pay bırakıyoruz)
        if (scrollTop + clientHeight < scrollHeight - 40) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    // İlk açılışta kontrol et (sayfa geçişleri sonrası Lottie falan yüklenirken gecikme olabiliyor, biraz bekleyip de kontrol edelim)
    checkScrollable();
    const timeout = setTimeout(checkScrollable, 500);

    // Scroll ve boyut değiştiğinde kontrol et
    window.addEventListener('scroll', checkScrollable);
    window.addEventListener('resize', checkScrollable);

    // DOM'da içerik yüksekliği değişimi (Framer motion animasyonları vs.) için Observer
    const observer = new MutationObserver(checkScrollable);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', checkScrollable);
      window.removeEventListener('resize', checkScrollable);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'var(--text-inverse)',
            background: 'var(--gradient-main)',
            padding: '10px 24px',
            borderRadius: '999px',
            boxShadow: '0 10px 25px rgba(67, 40, 24, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
            border: 'none'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
            KAYDIR
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
