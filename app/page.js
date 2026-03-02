import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <img
          src="/devpuri-farms/hero.png"
          alt="Sustainable Farm at Sunrise"
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Welcome to Devpuri Farms</h1>
          <p className={styles.subtitle}>Cultivating a sustainable future for our community and the planet.</p>
          <Link href="/about" className={styles.ctaButton}>
            Learn More About Us
          </Link>
        </div>
      </section>

      <section className={`container ${styles.highlights}`}>
        <h2 className={styles.sectionTitle}>Why Choose Devpuri Farms?</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🌱</span>
            <h3>Organic Practices</h3>
            <p>100% chemical-free farming. We believe in working with nature, not against it.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🚜</span>
            <h3>Community Focused</h3>
            <p>Bringing fresh, local produce directly to your table through our CSA program.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>☀️</span>
            <h3>Sustainable Future</h3>
            <p>Using solar power and regenerative agriculture to protect our land for generations.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
