import styles from './page.module.css';

export default function About() {
    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>About Devpuri Farms</h1>
            <div className={styles.content}>
                <p>Founded in 2010, Devpuri Farms has been dedicated to bringing the freshest, most nutritious produce to our local community.</p>
                <p>Our story began with a small patch of land and a big dream: to farm in a way that heals the earth rather than harms it.</p>
                <h2>Our Mission</h2>
                <p>To provide sustainable food security for our region while practicing regenerative agriculture that restores soil health.</p>
            </div>
        </main>
    );
}
