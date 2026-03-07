'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
      <span className={styles.divider}>|</span>
      <button
        className={`${styles.langButton} ${language === 'hi' ? styles.active : ''}`}
        onClick={() => changeLanguage('hi')}
        aria-label="Switch to Hindi"
        title="हिन्दी"
      >
        हि
      </button>
    </div>
  );
}
