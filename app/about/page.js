'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function About() {
    const { t } = useLanguage();

    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>{t('about.title')}</h1>
            <div className={styles.content}>
                <p>{t('about.story')}</p>
                <p>{t('about.journey')}</p>
                <h2>{t('about.mission')}</h2>
                <p>{t('about.missionText')}</p>
            </div>
        </main>
    );
}
