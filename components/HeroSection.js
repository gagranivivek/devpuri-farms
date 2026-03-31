'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';

export default function HeroSection({ t, children }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <img
        src="/hero.png"
        alt="Sustainable Farm at Sunrise"
        className={styles.heroImage}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.subtitle}>{t('home.subtitle')}</p>
      </div>
    </section>
  );
}
