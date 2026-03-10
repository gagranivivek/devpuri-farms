'use client';

import { useLanguage } from '@/context/LanguageContext';
import galleryData from '@/data/gallery.json';
import styles from './page.module.css';

export default function Gallery() {
    const { t } = useLanguage();

    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>{t('gallery.title')}</h1>
            <p className={styles.subtitle}>{t('gallery.subtitle')}</p>

            <section className={styles.galleryGrid}>
                {galleryData.length > 0 ? (
                    galleryData.map((item) => (
                        <div 
                            key={item.id} 
                            className={styles.galleryItem}
                            style={{ gridColumn: `span ${item.span || 1}` }}
                        >
                            <div className={styles.imageWrapper}>
                                <img src={item.url} alt={item.title || "Gallery Item"} className={styles.galleryImage} />
                            </div>
                            <div className={styles.overlay}>
                                {item.title && <h3 className={styles.itemTitle}>{item.title}</h3>}
                                {item.description && (
                                    <p className={styles.descriptionText}>{item.description}</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyMessage}>{t('gallery.empty')}</p>
                )}
            </section>
        </main>
    );
}
