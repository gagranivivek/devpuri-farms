'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductsContext';
import ProduceSidebar from '@/components/ProduceSidebar';
import ProductModal from '@/components/ProductModal';
import styles from './page.module.css';

export default function Home() {
  const { t } = useLanguage();
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const displayProducts = selectedId
    ? products.filter((p) => p.id === parseInt(selectedId))
    : products;

  return (
    <main>
      <section className={styles.hero}>
        <img
          src="/hero.png"
          alt="Sustainable Farm at Sunrise"
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t('home.title')}</h1>
          <p className={styles.subtitle}>{t('home.subtitle')}</p>
        </div>
      </section>

      <section className={styles.produceSection}>
        <div className={styles.produceContainer}>
          <div className={styles.produceHeader}>
            <h2 className={styles.produceTitle}>{t('produce.title')}</h2>
            <p className={styles.produceSubtitle}>{t('produce.subtitle')}</p>
          </div>
          
          <div className={styles.produceLayout}>
            <ProduceSidebar products={products} selectedId={selectedId} />
            
            <div className={styles.produceGrid}>
              {displayProducts.length > 0 ? (
                displayProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={styles.card}
                    onClick={() => setSelectedProduct(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.badge && <div className={styles.badge}>{product.badge}</div>}
                    <div className={styles.imageContainer}>
                      {product.image && !product.image.includes('placeholder') ? (
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                      ) : (
                        <span className={styles.placeholderIcon}>🥗</span>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h3>{product.name}</h3>
                      {product.price && <div className={styles.price}>{product.price}</div>}
                      <p className={styles.description}>{product.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyMessage}>
                  <p>{selectedId ? 'Product not found' : t('produce.empty')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.highlights}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.whyChoose')}</h2>
          <div className={styles.cardGrid}>
            <div className={styles.featureCard}>
              <span className={styles.cardIcon}>🌱</span>
              <h3>{t('home.organic.title')}</h3>
              <p>{t('home.organic.description')}</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.cardIcon}>🚜</span>
              <h3>{t('home.community.title')}</h3>
              <p>{t('home.community.description')}</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.cardIcon}>☀️</span>
              <h3>{t('home.sustainable.title')}</h3>
              <p>{t('home.sustainable.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}
