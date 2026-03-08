'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <main>
      <section className={styles.contactHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t('contact.title')}</h1>
          <p className={styles.subtitle}>{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.contactGrid}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <h2>{t('contact.message')}</h2>

              <div className={styles.infoBox}>
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>📞</span>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>{t('contact.phone')}</h3>
                    <p><a href="tel:+919636117070">+91 9636117070</a></p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>💬</span>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>{t('contact.whatsapp')}</h3>
                    <p><a href="https://wa.me/919636117070" target="_blank" rel="noopener noreferrer">+91 9636117070</a></p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>✉️</span>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>{t('contact.email')}</h3>
                    <p><a href="mailto:omprakshgagrani@gmail.com">omprakshgagrani@gmail.com</a></p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>📍</span>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>{t('contact.address')}</h3>
                    <p>Devpuri, Shahpura<br />Bhilwara, Rajasthan 311404<br />India</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>🕐</span>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>{t('contact.hours')}</h3>
                    <p>{t('contact.open')}</p>
                  </div>
                </div>
              </div>

              <div className={styles.cta}>
                <p>Whether you want to place an order, ask questions about our farming practices, or simply learn more about who we are, we're here and ready to chat!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
