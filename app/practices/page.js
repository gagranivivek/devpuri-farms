import styles from './page.module.css';

export default function Practices() {
    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>Our Sustainable Practices</h1>
            <div className={styles.grid}>
                <div className={styles.practice}>
                    <h2>Regenerative Agriculture</h2>
                    <p>We use cover crops and no-till farming to keep carbon in the soil and improve water retention.</p>
                </div>
                <div className={styles.practice}>
                    <h2>Water Conservation</h2>
                    <p>Our drip irrigation systems ensure that every drop of water is used efficiently, minimizing waste.</p>
                </div>
                <div className={styles.practice}>
                    <h2>Natural Pest Control</h2>
                    <p>Instead of harsh chemicals, we rely on beneficial insects and companion planting to keep pests at bay.</p>
                </div>
            </div>
        </main>
    );
}
