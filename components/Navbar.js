'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoWrapper}>
                    <img src="/logo.png" alt="Devpuri Farms Logo" className={styles.logoImage} />
                </Link>
                <button 
                    className={styles.mobileMenuButton}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
                <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                    <li><Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>{t('nav.home')}</Link></li>
                    <li><Link href="/about" className={styles.link} onClick={() => setIsOpen(false)}>{t('nav.about')}</Link></li>
                    <li><Link href="/practices" className={styles.link} onClick={() => setIsOpen(false)}>{t('nav.practices')}</Link></li>
                    <li><Link href="/produce" className={styles.link} onClick={() => setIsOpen(false)}>{t('nav.produce')}</Link></li>
                    <li><Link href="/gallery" className={styles.link} onClick={() => setIsOpen(false)}>{t('nav.gallery')}</Link></li>
                    <li><Link href="/contact" className={styles.link} onClick={() => setIsOpen(false)}>{t('nav.contact')}</Link></li>
                    <li className={styles.langSwitcherItem}>
                        <LanguageSwitcher />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
