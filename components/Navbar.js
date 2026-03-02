'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logoWrapper}>
                    <img
                        src="/logo.jpg"
                        alt="Devpuri Farms Logo"
                        className={styles.logoImage}
                    />
                </Link>
                <ul className={styles.navLinks}>
                    <li><Link href="/" className={styles.link}>Home</Link></li>
                    <li><Link href="/about" className={styles.link}>About</Link></li>
                    <li><Link href="/practices" className={styles.link}>Practices</Link></li>
                    <li><Link href="/produce" className={styles.link}>Produce</Link></li>
                    <li><Link href="/gallery" className={styles.link}>Gallery</Link></li>
                </ul>
            </div>
        </nav>
    );
}
