import React from 'react';
import type { Metadata } from 'next';
import { Noto_Serif_Tamil, Noto_Sans_Tamil, Outfit } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-tamil-serif',
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tamil-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'தமிழண்ணல் | Thamizhannal Digital Literary Archive',
    template: '%s | தமிழண்ணல் ஆவணக்கப்பகம்',
  },
  description: 'முனைவர் தமிழண்ணல் அவர்களின் நூல்கள், ஆய்வுகள், தமிழ் உரைநடை மற்றும் வாழ்நாள் சாதனைகளின் இணைய ஆவணக்கப்பகம்.',
  keywords: ['தமிழண்ணல்', 'Thamizhannal', 'Tamil Literature', 'Tamil Research', 'Sangam Literature', 'Tolkappiyam', 'Digital Archive'],
  authors: [{ name: 'Thamizhannal Heritage Trust' }],
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/favicon.ico' }
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="ta" 
      className={`${notoSerifTamil.variable} ${notoSansTamil.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#231d1a]">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
