import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cocohub — Pet Health, Secured by Blockchain',
  description:
    'Securely manage your pet\'s medical records, medication reminders, vet appointments, and emergency contacts. Powered by the Stellar blockchain.',
  keywords: ['pet health', 'pet records', 'blockchain', 'veterinary', 'medication reminders', 'pet care'],
  metadataBase: new URL('https://cocohub.app'),
  openGraph: {
    title: 'Cocohub — Pet Health, Secured by Blockchain',
    description: 'The all-in-one app for pet owners who take their pet\'s health seriously.',
    url: 'https://cocohub.app',
    siteName: 'Cocohub',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cocohub — Pet Health, Secured by Blockchain',
    description: 'The all-in-one app for pet owners who take their pet\'s health seriously.',
    site: '@cocohubapp',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
