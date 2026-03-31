"use client";

import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DatasheetPrintPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="datasheet-print-view">
      {/* Controls - Hidden during print */}
      <div className="print-controls no-print">
        <div className="container flex-between py-6">
          <Link href={`/products/${product.slug}`} className="btn btn-outline flex gap-2">
            <ArrowLeft size={18} /> Back to Product
          </Link>
          <button onClick={handlePrint} className="btn btn-primary flex gap-2">
            <Printer size={18} /> Print to PDF
          </button>
        </div>
      </div>

      {/* Actual Datasheet content */}
      <div className="datasheet-document">
        <header className="ds-header">
           <div className="ds-logo-box">
              <div className="logo-main">CHEMICO</div>
              <div className="logo-sub">INNOVATIONS</div>
           </div>
           <div className="ds-doc-info">
              <h1>TECHNICAL DATA SHEET</h1>
              <p>Document No: CI-TDS-{product.id}00</p>
              <p>Revision: 2026.03</p>
           </div>
        </header>

        <section className="ds-title-section">
           <h2>{product.name}</h2>
           <span className="ds-category">{product.category}</span>
        </section>

        <div className="ds-content-grid">
           <div className="ds-main-column">
              <section className="ds-section">
                 <h3>PRODUCT DESCRIPTION</h3>
                 <p>{product.description}</p>
              </section>

              <section className="ds-section">
                 <h3>KEY FEATURES & BENEFITS</h3>
                 <ul>
                    {product.features.map((f, i) => <li key={i}>{f}</li>)}
                 </ul>
              </section>

              <section className="ds-section">
                 <h3>APPLICATION GUIDELINES</h3>
                 <ol>
                    {product.usage.map((u, i) => <li key={i}>{u}</li>)}
                 </ol>
              </section>
           </div>

           <aside className="ds-side-column">
              <section className="ds-section spec-box">
                 <h3>TECHNICAL SPECIFICATIONS</h3>
                 <table className="ds-table">
                    <tbody>
                       {product.technicalSpecs.map((s, i) => (
                         <tr key={i}>
                            <td>{s.label}</td>
                            <td>{s.value}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </section>

              <section className="ds-section safety-box">
                 <h3>SAFETY & STORAGE</h3>
                 <p>Store in a cool, dry place away from direct sunlight. Keep container tightly closed when not in use. Refer to MSDS for detailed safety protocols.</p>
              </section>

              <div className="ds-qr-placeholder">
                 <div className="qr-box">QR</div>
                 <p>Scan for latest version</p>
              </div>
           </aside>
        </div>

        <footer className="ds-footer">
           <div className="footer-line"></div>
           <div className="footer-content">
              <p><strong>Chemico Innovations Bangladesh Ltd.</strong></p>
              <p>Uttara Sector 7, Dhaka, Bangladesh | info@chemico.com.bd | www.chemico.com.bd</p>
              <p className="disclaimer">Disclaimer: The information provided is based on our current knowledge. Users are advised to conduct their own tests for suitability.</p>
           </div>
        </footer>
      </div>

      <style jsx>{`
        .datasheet-print-view {
          background: #f1f5f9;
          min-height: 100vh;
        }
        .print-controls {
          background: white;
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .datasheet-document {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          margin: 2rem auto;
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          color: #1a1a1a;
          font-family: 'Inter', sans-serif;
          position: relative;
        }
        
        .ds-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #000;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        .logo-main { font-weight: 900; font-size: 1.5rem; color: #0369a1; line-height: 1; }
        .logo-sub { font-weight: 700; font-size: 0.7rem; color: #64748b; letter-spacing: 0.1em; }
        .ds-doc-info { text-align: right; }
        .ds-doc-info h1 { font-size: 1.2rem; margin-bottom: 0.25rem; font-weight: 800; color: #000; }
        .ds-doc-info p { font-size: 0.75rem; color: #64748b; }
        
        .ds-title-section { margin-bottom: 2rem; }
        .ds-title-section h2 { font-size: 2rem; margin-bottom: 0.5rem; color: #000; }
        .ds-category { font-weight: 700; color: #0369a1; text-transform: uppercase; font-size: 0.8rem; }
        
        .ds-content-grid { display: grid; grid-template-columns: 1fr 280px; gap: 3rem; }
        .ds-section { margin-bottom: 2rem; }
        .ds-section h3 { font-size: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; margin-bottom: 1rem; font-weight: 800; color: #334155; }
        .ds-section p { font-size: 0.9rem; line-height: 1.6; color: #334155; }
        
        .feature-list, .ds-section ul, .ds-section ol { padding-left: 1.2rem; }
        .ds-section li { font-size: 0.85rem; margin-bottom: 0.5rem; line-height: 1.5; color: #334155; }
        
        .spec-box { background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0; }
        .ds-table { width: 100%; font-size: 0.8rem; border-collapse: collapse; }
        .ds-table td { padding: 0.5rem 0; border-bottom: 1px solid #cbd5e1; }
        .ds-table td:first-child { font-weight: 700; color: #64748b; width: 45%; }
        
        .safety-box { font-size: 0.8rem; color: #64748b; }
        .ds-qr-placeholder { text-align: center; margin-top: 2rem; }
        .qr-box { width: 80px; height: 80px; border: 2px solid #e2e8f0; margin: 0 auto 0.5rem; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #e2e8f0; }
        .ds-qr-placeholder p { font-size: 0.65rem; color: #94a3b8; }
        
        .ds-footer { position: absolute; bottom: 20mm; left: 20mm; right: 20mm; }
        .footer-line { height: 1px; background: #000; margin-bottom: 1rem; }
        .footer-content { font-size: 0.75rem; color: #64748b; text-align: center; }
        .disclaimer { font-size: 0.6rem; margin-top: 1rem; font-style: italic; }

        @media print {
          .no-print { display: none !important; }
          .datasheet-print-view { background: white !important; padding: 0 !important; }
          .datasheet-document { margin: 0 !important; box-shadow: none !important; width: 100% !important; padding: 10mm !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
