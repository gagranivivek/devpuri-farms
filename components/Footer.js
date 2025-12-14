import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <p>&copy; {new Date().getFullYear()} Devpuri Farms. Sustainable. Organic. Local.</p>
            </div>
        </footer>
    );
}
