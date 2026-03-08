'use client';

import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                
                <div className={styles.content}>
                    <div className={styles.imageSection}>
                        {product.image && !product.image.includes('placeholder') ? (
                            <img src={product.image} alt={product.name} className={styles.image} />
                        ) : (
                            <span className={styles.placeholderIcon}>🥗</span>
                        )}
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.name}>{product.name}</h2>
                        <p className={styles.description}>{product.description}</p>
                        
                        <div className={styles.detailsBox}>
                            <h3 className={styles.detailsTitle}>Product Details</h3>
                            <p className={styles.detailsText}>{product.details}</p>
                        </div>

                        {product.reservation && (
                            <div className={styles.reservationBox}>
                                <h3 className={styles.reservationTitle}>⚠️ Important Notice</h3>
                                <p className={styles.reservationText}>{product.reservation}</p>
                            </div>
                        )}

                        {product.seasonal && (
                            <div className={styles.seasonalBox}>
                                <h3 className={styles.seasonalTitle}>🌿 Seasonal Availability</h3>
                                <p className={styles.seasonalText}>{product.seasonal}</p>
                            </div>
                        )}

                        {product.price && (
                            <div className={styles.priceSection}>
                                <span className={styles.priceLabel}>Price:</span>
                                <span className={styles.priceValue}>{product.price}</span>
                            </div>
                        )}

                        <button className={styles.actionButton} onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
