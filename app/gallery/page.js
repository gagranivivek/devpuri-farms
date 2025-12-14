'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);

    // Fetch gallery items on mount
    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await fetch('/api/gallery');
            if (res.ok) {
                const data = await res.json();
                setGalleryItems(data);
            }
        } catch (error) {
            console.error('Failed to fetch gallery:', error);
        }
    };

    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>Farm Theory Gallery</h1>
            <p className={styles.subtitle}>A glimpse into our sustainable farming life.</p>

            <section className={styles.galleryGrid}>
                {galleryItems.length > 0 ? (
                    galleryItems.map((item) => (
                        <div key={item.id} className={styles.galleryItem}>
                            <div className={styles.imageWrapper}>
                                <img src={item.url} alt={item.description || "Gallery Item"} className={styles.galleryImage} />
                            </div>
                            {item.description && (
                                <div className={styles.caption}>
                                    <p className={styles.descriptionText}>{item.description}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyMessage}>No photos yet.</p>
                )}
            </section>
        </main>
    );
}
