'use client';

import { useProducts } from '@/context/ProductsContext';
import styles from './page.module.css';

export default function Produce() {
    const { products } = useProducts();

    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>Our Fresh Produce</h1>
            <p className={styles.subtitle}>Harvested daily, straight from our fields to your kitchen.</p>

            <div className={styles.grid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            {product.image && !product.image.includes('placeholder') ? (
                                <img src={product.image} alt={product.name} className={styles.productImage} />
                            ) : (
                                <span className={styles.placeholderIcon}>🥗</span>
                            )}
                        </div>
                        <div className={styles.cardContent}>
                            <h2>{product.name}</h2>
                            <div className={styles.price}>{product.price}</div>
                            <p className={styles.description}>{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
