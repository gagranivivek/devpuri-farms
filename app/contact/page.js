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

          <div className={styles.mapSection}>
            <h2>Find Us on the Map</h2>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.8372857314446!2d75.62696652346846!3d25.345890311282847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396d3e8e1234567b%3A0x1234567890abcdef!2sDevpuri%2C%20Shahpura%2C%20Bhilwara%2C%20Rajasthan%20311404!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a 
              href="https://maps.app.goo.gl/YNVpSVg7TP2theHq8" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.openMapLink}
            >
              Open in Google Maps →
            </a>
        </div>
      </section>
    </main>
  );
}
