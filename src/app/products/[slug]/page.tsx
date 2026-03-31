"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { useLanguage } from '@/lib/LanguageContext';
import { ArrowLeft, CheckCircle2, Download, MessageSquare, ChevronRight, Share2, Info, FileText } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { language, t } = useLanguage();
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const waLink = `https://wa.me/8801700000000?text=${encodeURIComponent(product.whatsappMessage || "")}`;

  return (
    <div className="product-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs container">
        <Link href="/">{t('nav_products')}</Link>
        <ChevronRight size={14} />
        <Link href="/products">{t('nav_products')}</Link>
        <ChevronRight size={14} />
        <span>{product.category}</span>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </nav>

      <section className="product-main py-10">
        <div className="container grid-detail">
          {/* Image & Summary */}
          <div className="product-visuals">
            <div className="main-img-card">
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="badge-overlay">{product.category}</div>
            </div>
            <div className="product-meta-actions flex mt-6">
              <button className="btn btn-outline btn-sm"><Share2 size={16} /> Share</button>
              <button className="btn btn-outline btn-sm"><Info size={16} /> Technical Q&A</button>
            </div>
          </div>

          <div className="product-details">
            <span className="cat-tag-upper">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="description-lead">{product.description}</p>
            
            <div className="cta-vbox mt-8">
              <div className="flex gap-4">
                <a href={waLink} target="_blank" className="btn btn-accent btn-lg flex-1">
                  <MessageSquare size={20} /> Inquire via WhatsApp
                </a>
                <Link href={`/products/${product.slug}/datasheet`} className="btn btn-outline btn-lg flex-1">
                  <FileText size={20} /> Preview Datasheet
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">Typical response time: &lt; 2 hours via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Content */}
      <section className="product-technical py-20 bg-muted">
        <div className="container">
          <div className="grid-tabs">
            <div className="technical-specs">
              <h2 className="section-title">Technical Specifications</h2>
              <div className="specs-table-wrap">
                <table className="specs-table">
                  <tbody>
                    {product.technicalSpecs.map((spec, i) => (
                      <tr key={i}>
                        <td className="spec-label">{spec.label}</td>
                        <td className="spec-value">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="technical-info">
              <div className="features-block mb-10">
                <h3 className="section-title-sm">Key Features & Benefits</h3>
                <ul className="feature-list">
                  {product.features.map((feature, i) => (
                    <li key={i}><CheckCircle2 size={18} className="text-primary" /> {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="usage-block">
                <h3 className="section-title-sm">Application & Usage</h3>
                <div className="usage-steps">
                  {product.usage.map((step, i) => (
                    <div key={i} className="usage-step">
                      <span className="step-num">{i + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .product-page { padding-top: 2rem; }
        .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 3rem; }
        .breadcrumbs a:hover { color: var(--primary); }
        .grid-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        
        .main-img-card { position: relative; border-radius: 1.5rem; overflow: hidden; border: 1px solid var(--border); background: white; padding: 1rem; }
        .product-img { width: 100%; height: 500px; object-fit: cover; border-radius: 1rem; }
        .badge-overlay { position: absolute; top: 2rem; right: 2rem; background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 100px; font-weight: 600; font-size: 0.8rem; box-shadow: 0 4px 12px rgba(3, 105, 161, 0.3); }
        
        .cat-tag-upper { display: block; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem; margin-bottom: 1rem; }
        h1 { font-size: 3rem; margin-bottom: 2rem; line-height: 1.1; }
        .description-lead { font-size: 1.15rem; color: rgba(15, 23, 42, 0.8); line-height: 1.7; }
        
        .cta-vbox { background: white; border: 1px solid var(--border); padding: 2rem; border-radius: 1.25rem; box-shadow: var(--shadow); }
        .btn-lg { padding: 1.25rem 2rem; font-size: 1.05rem; }
        .flex-1 { flex: 1; }
        
        .grid-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
        .section-title { font-size: 1.75rem; margin-bottom: 2rem; border-left: 4px solid var(--primary); padding-left: 1.5rem; }
        .section-title-sm { font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; }
        
        .specs-table { width: 100%; border-collapse: collapse; }
        .specs-table tr { border-bottom: 1px solid #e2e8f0; }
        .spec-label { padding: 1rem 0; font-weight: 600; color: var(--text-muted); width: 40%; font-size: 0.95rem; }
        .spec-value { padding: 1rem 0; font-weight: 500; color: var(--foreground); font-size: 0.95rem; }
        
        .feature-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .feature-list li { display: flex; align-items: flex-start; gap: 0.75rem; color: #334155; font-weight: 500; font-size: 0.95rem; }
        .text-primary { color: var(--primary); }
        
        .usage-steps { display: flex; flex-direction: column; gap: 1.5rem; }
        .usage-step { display: flex; gap: 1.5rem; align-items: flex-start; }
        .step-num { min-width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; }
        .usage-step p { color: #475569; font-size: 0.95rem; line-height: 1.6; }
        
        .bg-muted { background: #f1f5f9; }
        .py-10 { padding: 2.5rem 0; }
        .py-20 { padding: 5rem 0; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-8 { margin-top: 2rem; }

        @media (max-width: 1024px) {
          .grid-detail, .grid-tabs { grid-template-columns: 1fr; gap: 3rem; }
          .product-img { height: 400px; }
          h1 { font-size: 2.5rem; }
        }
        @media (max-width: 768px) {
          .cta-vbox .flex { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
