import Link from 'next/link';
import styles from '../privacy/legal.module.css';

export const metadata = {
  title: 'Terms of Service — Cocohub',
  description: 'Terms and conditions for using Cocohub.',
};

export default function Terms() {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>🐾 Cocohub</Link>
        <Link href="http://localhost:8081" className={styles.navCta}>Open App →</Link>
      </nav>
      <main className={`container ${styles.content}`}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> / Terms of Service
        </div>
        <h1>Terms of Service</h1>
        <p className={styles.updated}>Last updated: July 1, 2026</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By downloading, installing, or using Cocohub, you agree to be bound by these Terms of Service. If you do not agree, do not use the app.</p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>Cocohub provides a mobile and web application for pet owners to manage their pets&apos; medical records, medications, appointments, and emergency contacts. The service includes optional blockchain verification of medical record hashes via the Stellar network.</p>
        </section>

        <section>
          <h2>3. Not a Medical Service</h2>
          <p><strong>Cocohub is not a veterinary service and does not provide medical advice.</strong> Always consult a licensed veterinarian for your pet&apos;s health decisions. Information in the app is for organizational and informational purposes only.</p>
        </section>

        <section>
          <h2>4. User Accounts</h2>
          <ul>
            <li>You are responsible for maintaining the security of your account credentials</li>
            <li>You must provide accurate information when creating an account</li>
            <li>You may not share your account with others</li>
            <li>You must be 16 years or older to create an account</li>
          </ul>
        </section>

        <section>
          <h2>5. Your Data</h2>
          <p>You own all data you enter into Cocohub. You can export or delete your data at any time via the Privacy Dashboard. See our <Link href="/privacy">Privacy Policy</Link> for full details.</p>
        </section>

        <section>
          <h2>6. Blockchain Records</h2>
          <p>When you choose to verify a record on the Stellar blockchain, a SHA-256 hash of that record is permanently written to the public ledger. This action cannot be reversed. No personal information is stored on-chain.</p>
        </section>

        <section>
          <h2>7. Free and Premium Plans</h2>
          <p>Cocohub offers a free tier (1 pet) and a Premium plan (unlimited pets). Premium subscriptions are billed monthly or annually. Cancellation takes effect at the end of the current billing period. No refunds for partial periods.</p>
        </section>

        <section>
          <h2>8. Prohibited Use</h2>
          <ul>
            <li>Using the app to store data for commercial veterinary practices without a business agreement</li>
            <li>Attempting to reverse-engineer, scrape, or access the API without authorization</li>
            <li>Uploading false or fraudulent medical records</li>
          </ul>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>Cocohub is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from use or inability to use the service, including any pet health outcomes.</p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>We may update these terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2>11. Contact</h2>
          <p>Questions? Email <a href="mailto:legal@cocohub.app">legal@cocohub.app</a></p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2026 Cocohub · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></p>
      </footer>
    </div>
  );
}
