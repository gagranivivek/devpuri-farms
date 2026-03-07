'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function About() {
    const { t } = useLanguage();

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{t('about.title')}</h1>
            
            <div className={styles.heroImage}>
                <img src="/uploads/about-founder.jpg" alt="Devpuri Farms Founder" />
            </div>
            
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('about.whoWeAre')}</h2>
                <p className={styles.text}>{t('about.story')}</p>
                <p className={styles.text}>{t('about.legacy')}</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('about.problem')}</h2>
                <p className={styles.text}>{t('about.problemText')}</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('about.mission')}</h2>
                <p className={styles.text}>{t('about.missionIntro')}</p>
                
                <div className={styles.missionGrid}>
                    <div className={styles.missionCard}>
                        <h3>{t('about.noMiddlemen')}</h3>
                        <p>{t('about.noMiddlemenText')}</p>
                    </div>
                    
                    <div className={styles.missionCard}>
                        <h3>{t('about.sustainable')}</h3>
                        <p>{t('about.sustainableText')}</p>
                    </div>
                    
                    <div className={styles.missionCard}>
                        <h3>{t('about.locallyRooted')}</h3>
                        <p>{t('about.locallyRootedText')}</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('about.reach')}</h2>
                <p className={styles.text}>{t('about.reachText')}</p>
            </section>

            <section className={styles.closing}>
                <p className={styles.closingText}>{t('about.closing')}</p>
                <p className={styles.quote}>"{t('about.quote')}"</p>
            </section>
        </main>
    );
}
