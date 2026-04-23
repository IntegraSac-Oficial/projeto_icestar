import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getActiveLogo, getFooterContent } from '@/lib/utils/content-fetcher';

// Configure Inter font from Google Fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * Viewport configuration
 * Validates: Requirements 10.1, 10.2, 10.3, 10.4
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Metadata for the landing page
 * Includes title, description, and Open Graph tags for social sharing
 * Validates: Requirements 1.1, 9.1, 11.6, 15.1
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://istar.com.br'),
  title: 'iStar - Isolamento Térmico e Refrigeração Veicular',
  description: 'Soluções completas em isolamento térmico e refrigeração para veículos comerciais. Especialistas em adaptação de Fiorino, Ducato, Sprinter e vans em geral.',
  keywords: ['isolamento térmico', 'refrigeração veicular', 'adaptação veicular', 'fiorino', 'ducato', 'sprinter', 'van refrigerada'],
  authors: [{ name: 'iStar' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://istar.com.br',
    siteName: 'iStar',
    title: 'iStar - Isolamento Térmico e Refrigeração Veicular',
    description: 'Soluções completas em isolamento térmico e refrigeração para veículos comerciais. Especialistas em adaptação de Fiorino, Ducato, Sprinter e vans em geral.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'iStar - Isolamento Térmico e Refrigeração Veicular',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iStar - Isolamento Térmico e Refrigeração Veicular',
    description: 'Soluções completas em isolamento térmico e refrigeração para veículos comerciais.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root layout component
 * Wraps all pages with Header and Footer, applies global font
 * Validates: Requirements 1.1, 9.1, 11.6, 15.1
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch logo and footer content
  const [logoPath, footerContent] = await Promise.all([
    getActiveLogo(),
    getFooterContent(),
  ]);

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {/* Fixed Header */}
        <Header logoPath={logoPath} />
        
        {/* Main Content - Add padding-top to account for fixed header */}
        <div className="pt-28">
          {children}
        </div>
        
        {/* Footer at bottom */}
        <Footer content={footerContent} />
      </body>
    </html>
  );
}
