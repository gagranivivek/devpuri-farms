'use client';

import Link from 'next/link';
import styles from './ProduceSidebar.module.css';

export default function ProduceSidebar({ products, selectedId }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Available Produce</h3>
      </div>
      <nav className={styles.sidebarNav}>
        <Link
          href="/produce"
          className={`${styles.sidebarItem} ${!selectedId ? styles.active : ''}`}
        >
          <span className={styles.icon}>🥘</span>
          <span className={styles.label}>All Produce</span>
        </Link>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produce?id=${product.id}`}
            className={`${styles.sidebarItem} ${selectedId === product.id ? styles.active : ''}`}
          >
            <span className={styles.icon}>
              {getProductIcon(product.name)}
            </span>
            <span className={styles.label}>{product.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function getProductIcon(productName) {
  const icons = {
    'tomato': '🍅',
    'carrot': '🥕',
    'lettuce': '🥬',
    'spinach': '🥬',
    'potato': '🥔',
    'onion': '🧅',
    'garlic': '🧄',
    'cucumber': '🥒',
    'bell pepper': '🫑',
    'cabbage': '🥬',
    'broccoli': '🥦',
    'cauliflower': '🥦',
    'corn': '🌽',
    'pumpkin': '🎃',
  };

  const lowerName = productName.toLowerCase();
  for (const [key, icon] of Object.entries(icons)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }
  return '🥗';
}
