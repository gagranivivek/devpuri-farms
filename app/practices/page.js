'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function Practices() {
    const { t } = useLanguage();

    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>{t('practices.title')}</h1>
            <div className={styles.grid}>
                <div className={styles.practice}>
                    <h2>{t('practices.regenerative.title')}</h2>
                    <p>{t('practices.regenerative.description')}</p>
                </div>
                <div className={styles.practice}>
                    <h2>{t('practices.water.title')}</h2>
                    <p>{t('practices.water.description')}</p>
                </div>
                <div className={styles.practice}>
                    <h2>{t('practices.pest.title')}</h2>
                    <p>{t('practices.pest.description')}</p>
                </div>
            </div>
        </main>
    );
}
