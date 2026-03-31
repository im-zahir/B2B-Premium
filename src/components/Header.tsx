"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky-header">
      <div className="container flex-between py-4">
        <Link href="/" className="logo">
          <span className="logo-text">CHEMICO</span>
          <span className="logo-sub">INNOVATIONS</span>
        </Link>
        <nav className="desktop-nav">
          <Link href="/products">{t('nav_products')}</Link>
          <Link href="/datasheets">{t('nav_datasheets')}</Link>
          <Link href="/about">{t('nav_about')}</Link>
          
          <div className="flex gap-4 items-center ml-4">
             <div className="lang-switcher">
                <button 
                  className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <span className="divider">|</span>
                <button 
                  className={`lang-btn ${language === 'bn' ? 'active' : ''}`}
                  onClick={() => setLanguage('bn')}
                >
                  বাং
                </button>
             </div>
             <Link href="/contact" className="btn btn-primary btn-sm">{t('nav_inquiry')}</Link>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .sticky-header {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border);
          z-index: 100;
        }
        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
          font-weight: 800;
        }
        .logo-text { color: var(--primary); font-size: 1.5rem; letter-spacing: -0.02em; }
        .logo-sub { color: var(--text-muted); font-size: 0.75rem; letter-spacing: 0.1em; }
        .desktop-nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .desktop-nav a { font-weight: 600; font-size: 0.95rem; color: var(--foreground); transition: color 0.2s; }
        .desktop-nav a:hover { color: var(--primary); }
        
        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f1f5f9;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          border: 1px solid var(--border);
        }
        .lang-btn {
          background: none;
          border: none;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .lang-btn.active {
          color: var(--primary);
        }
        .divider {
          color: #cbd5e1;
          font-size: 0.75rem;
        }
        .ml-4 { margin-left: 1rem; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
        }
      `}</style>
    </header>
  );
}
