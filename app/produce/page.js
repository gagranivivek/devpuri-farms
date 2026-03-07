'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/context/ProductsContext';
import { useLanguage } from '@/context/LanguageContext';
import ProduceSidebar from '@/components/ProduceSidebar';
import ProductModal from '@/components/ProductModal';
import styles from './page.module.css';

export default function Produce() {
    const { products } = useProducts();
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('id');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const displayProducts = selectedId
        ? products.filter((p) => p.id === parseInt(selectedId))
        : products;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <ProduceSidebar products={products} selectedId={selectedId} />
                
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{t('produce.title')}</h1>
                        <p className={styles.subtitle}>{t('produce.subtitle')}</p>
                    </div>

                    <div className={styles.grid}>
                        {displayProducts.length > 0 ? (
                            displayProducts.map((product) => (
                                <div 
                                    key={product.id} 
                                    className={styles.card}
                                    onClick={() => setSelectedProduct(product)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={styles.imageContainer}>
                                        {product.image && !product.image.includes('placeholder') ? (
                                            <img src={product.image} alt={product.name} className={styles.productImage} />
                                        ) : (
                                            <span className={styles.placeholderIcon}>🥗</span>
                                        )}
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h2>{product.name}</h2>
                                        {product.price && <div className={styles.price}>{product.price}</div>}
                                        <p className={styles.description}>{product.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyGrid}>
                                <p className={styles.emptyMessage}>{selectedId ? 'Product not found' : t('produce.empty')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </main>
    );
}
