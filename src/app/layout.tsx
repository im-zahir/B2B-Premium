import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Chemico Innovations Bangladesh Ltd. | Industrial Textile Chemicals',
  description: 'Premium manufacturer of textile chemicals, pigment pastes, and binders in Bangladesh. High-performance industrial solutions.',
  openGraph: {
    title: 'Chemico Innovations Bangladesh Ltd.',
    description: 'B2B solutions for textile chemicals.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <StructuredData />
      </head>
      <body>
        <LanguageProvider>
          <Header />
            <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
