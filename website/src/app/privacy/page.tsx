import Link from 'next/link';
import styles from './legal.module.css';

export const metadata = {
  title: 'Privacy Policy — Cocohub',
  description: 'How Cocohub collects, uses, and protects your data.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>🐾 Cocohub</Link>
        <Link href="http://localhost:8081" className={styles.navCta}>Open App →</Link>
      </nav>
      <main className={`container ${styles.content}`}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> / Privacy Policy
        </div>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: July 1, 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>Cocohub (&quot;we&quot;, &quot;our&quot;, or &quot;the app&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use the Cocohub mobile and web application.</p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li><strong>Account information:</strong> Name, email address, and password (hashed)</li>
            <li><strong>Pet data:</strong> Pet profiles, medical records, medication schedules, and appointments you create</li>
            <li><strong>Device data:</strong> Device type, operating system, and app version for crash reporting</li>
            <li><strong>Location data:</strong> Only when you use Emergency SOS — never stored persistently</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To provide and improve the Cocohub service</li>
            <li>To anchor medical record hashes on the Stellar blockchain for verification</li>
            <li>To send medication and appointment reminders you&apos;ve configured</li>
            <li>To provide emergency SOS location sharing when you initiate it</li>
          </ul>
          <p>We <strong>never sell your data</strong> to third parties.</p>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>All sensitive data is encrypted at rest using AES-256. Authentication tokens are stored in your device&apos;s secure enclave (Keychain on iOS, SecureStore on Android). We use TLS 1.3 for all data in transit.</p>
        </section>

        <section>
          <h2>5. Blockchain Data</h2>
          <p>Medical records are stored on our servers. Only a SHA-256 <em>hash</em> of each record is anchored on the Stellar blockchain — no personal information is ever written to the blockchain.</p>
        </section>

        <section>
          <h2>6. Your Rights (GDPR)</h2>
          <p>You have the right to access, correct, export, or delete your data at any time. Use the Privacy Dashboard in the app, or email <a href="mailto:privacy@cocohub.app">privacy@cocohub.app</a>.</p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>Questions? Email <a href="mailto:privacy@cocohub.app">privacy@cocohub.app</a></p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2026 Cocohub · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></p>
      </footer>
    </div>
  );
}
