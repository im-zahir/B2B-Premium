"use client";

import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { FileText, Download, Search, ExternalLink } from 'lucide-react';

export default function DatasheetsPage() {
  return (
    <div className="datasheets-page">
      <header className="page-header py-20 bg-dark text-white">
        <div className="container">
          <span className="badge">Technical Resource Center</span>
          <h1>Product Datasheets (TDS)</h1>
          <p className="subtitle">Access comprehensive technical data, application guides, and safety information for our full product range.</p>
        </div>
      </header>

      <section className="library py-20">
        <div className="container">
          <div className="library-controls flex-between mb-12">
             <div className="search-wrap">
               <Search size={20} />
               <input type="text" placeholder="Search by product name or SKU..." />
             </div>
             <div className="stats-badge">
               <strong>{PRODUCTS.length}</strong> Documents Available
             </div>
          </div>

          <div className="grid grid-library">
            {PRODUCTS.map(product => (
              <div key={product.id} className="doc-card">
                <div className="doc-icon">
                  <FileText size={40} />
                  <span className="doc-type">PDF</span>
                </div>
                <div className="doc-info">
                  <span className="doc-cat">{product.category}</span>
                  <h3>{product.name} (TDS)</h3>
                  <p>Technical Data Sheet including physical properties, performance data, and storage guidelines.</p>
                  <div className="doc-footer flex-between mt-auto">
                    <span className="file-size">1.2 MB</span>
                    <div className="flex gap-4">
                      <Link href={`/products/${product.slug}`} className="btn-link">View Product</Link>
                      <a href={product.datasheetUrl} className="btn btn-primary btn-sm flex gap-2">
                        <Download size={16} /> Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="request-section mt-20 p-12 text-center bg-muted rounded-2xl">
             <h2>Can't find a specific document?</h2>
             <p className="mb-8">Our library is constantly updated. If you need a specialized TDS or MSDS, please contact our technical team.</p>
             <Link href="/contact" className="btn btn-outline btn-lg">Request Technical Document</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-dark { background: #0f172a; }
        .page-header { padding: 6rem 0; position: relative; overflow: hidden; }
        .page-header h1 { font-size: 3.5rem; margin-bottom: 1.5rem; color: white; }
        .badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(3, 105, 161, 0.4); color: #38bdf8; border-radius: 100px; font-weight: 700; font-size: 0.8rem; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .subtitle { font-size: 1.25rem; color: #94a3b8; max-width: 600px; line-height: 1.6; }
        
        .search-wrap { display: flex; align-items: center; gap: 1rem; background: white; border: 1px solid var(--border); padding: 0.75rem 1.5rem; border-radius: 100px; width: 400px; box-shadow: var(--shadow); }
        .search-wrap input { border: none; outline: none; width: 100%; font-size: 1rem; }
        .stats-badge { background: #f1f5f9; padding: 0.5rem 1.5rem; border-radius: 100px; font-size: 0.9rem; color: var(--text-muted); }
        
        .grid-library { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .doc-card { display: grid; grid-template-columns: 100px 1fr; gap: 2rem; background: white; border: 1px solid var(--border); border-radius: 1.5rem; padding: 2rem; transition: all 0.3s; }
        .doc-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--primary); }
        
        .doc-icon { background: #f8fafc; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 1rem; color: var(--primary); position: relative; }
        .doc-type { position: absolute; bottom: 1rem; font-weight: 800; font-size: 0.7rem; color: var(--text-muted); }
        
        .doc-cat { display: inline-block; background: #eff6ff; color: var(--primary); padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.75rem; }
        .doc-info h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
        .doc-info p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.5; }
        .doc-footer { border-top: 1px solid #f1f5f9; padding-top: 1.5rem; }
        .file-size { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
        .btn-link { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
        .btn-link:hover { color: var(--primary); }
        
        .bg-muted { background: #f8fafc; }
        .rounded-2xl { border-radius: 2rem; }
        .py-20 { padding: 5rem 0; }
        .mb-12 { margin-bottom: 3rem; }
        .mt-20 { margin-top: 5rem; }
        .mt-auto { margin-top: auto; }
        .p-12 { padding: 3rem; }

        @media (max-width: 1024px) {
          .grid-library { grid-template-columns: 1fr; }
          .search-wrap { width: 100%; }
        }
        @media (max-width: 640px) {
          .doc-card { grid-template-columns: 1fr; text-align: center; }
          .doc-footer { flex-direction: column; gap: 1rem; }
          .doc-icon { height: 100px; }
        }
      `}</style>
    </div>
  );
}
