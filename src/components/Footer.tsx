"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container grid footer-grid">
        <div>
          <h3>Chemico Innovations</h3>
          <p>{t('footer_desc')}</p>
        </div>
        <div>
          <h4>{t('footer_links')}</h4>
          <ul>
            <li><Link href="/products">{t('nav_products')}</Link></li>
            <li><Link href="/datasheets">{t('nav_datasheets')}</Link></li>
            <li><Link href="/contact">{t('nav_contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t('footer_contact')}</h4>
          <p>Dhaka, Bangladesh</p>
          <p>Phone: +880 1XXX-XXXXXX</p>
          <p>Email: info@chemico.com.bd</p>
        </div>
      </div>
      <div className="container footer-bottom flex-between align-center">
        <p>&copy; 2026 Chemico Innovations Bangladesh Ltd. All rights reserved.</p>
        <div className="agency-credit">
          <span>Developed by </span>
          <a href="#" className="font-bold text-primary hover:underline">Stellar B2B Digital</a>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--foreground);
          color: white;
          padding: 4rem 0 2rem;
          margin-top: 5rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          margin-bottom: 3rem;
          gap: 4rem;
        }
        .footer h3, .footer h4 { color: white; margin-bottom: 1.5rem; }
        .footer p, .footer li { color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .footer-bottom {
          border-top: 1px solid #1e293b;
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-bottom p { margin-bottom: 0; }
        .agency-credit { font-size: 0.85rem; color: #94a3b8; font-weight: 500; }
        .text-primary { color: var(--primary); }
        .font-bold { font-weight: 800; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </footer>
  );
}
