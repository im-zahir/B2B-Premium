"use client";

import Link from 'next/link';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { ShieldCheck, Truck, Headphones, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const featuredProducts = PRODUCTS.slice(0, 3);
  const categoriesBrief = CATEGORIES.slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="badge">{t('hero_badge')}</span>
            <h1>{t('hero_title')}</h1>
            <p>{t('hero_sub')}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/products" className="btn btn-primary">{t('hero_cta_browse')}</Link>
              <Link href="/contact" className="btn btn-outline">{t('hero_cta_quote')}</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <img src="/images/factory.png" alt="Industrial Chemicals" className="hero-img" />
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-num">50+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-num">15+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Blocks */}
      <section className="trust py-10 bg-muted">
        <div className="container">
          <div className="grid grid-3">
            <div className="trust-item">
              <ShieldCheck className="trust-icon" size={40} />
              <h3>{t('trust_quality_title')}</h3>
              <p>{t('trust_quality_sub')}</p>
            </div>
            <div className="trust-item">
              <Truck className="trust-icon" size={40} />
              <h3>{t('trust_supply_title')}</h3>
              <p>{t('trust_supply_sub')}</p>
            </div>
            <div className="trust-item">
               <Headphones className="trust-icon" size={40} />
               <h3>{t('trust_support_title')}</h3>
               <p>{t('trust_support_sub')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured py-20">
        <div className="container">
          <div className="flex-between mb-12">
            <h2>{t('featured_title')}</h2>
            <Link href="/products" className="link-primary">{t('featured_link')} &rarr;</Link>
          </div>
          <div className="grid grid-3">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-img-wrap">
                  <img src={product.image} alt={product.name} />
                  <span className="cat-tag">{product.category}</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                  <div className="product-footer">
                    <Link href={`/products/${product.slug}`} className="btn btn-outline btn-full">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Preview */}
      <section className="categories py-20 bg-dark text-white">
        <div className="container text-center">
          <h2 className="mb-12">{t('category_title')}</h2>
          <div className="grid grid-4-cols">
            {categoriesBrief.map(cat => (
              <Link href={`/products?category=${cat}`} key={cat} className="category-card">
                <h3>{cat}</h3>
                <span className="btn-text">{t('category_browse')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Statistics */}
      <section className="stats-strip py-16 bg-dark text-white border-t border-slate-800">
        <div className="container grid-4-cols">
          <div className="stat-item text-center">
            <h2 className="stat-num">500+</h2>
            <p className="stat-desc">Factories Served</p>
          </div>
          <div className="stat-item text-center">
             <h2 className="stat-num">15+</h2>
             <p className="stat-desc">Years in Industry</p>
          </div>
          <div className="stat-item text-center">
             <h2 className="stat-num">50+</h2>
             <p className="stat-desc">Local Formulations</p>
          </div>
          <div className="stat-item text-center">
             <h2 className="stat-num">100%</h2>
             <p className="stat-desc">Quality Guaranteed</p>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="testimonials py-32">
        <div className="container">
          <div className="section-header text-center mb-16">
            <span className="badge">Industry Trust</span>
            <h2>What Our Partners Say</h2>
            <p className="subtitle">Delivering excellence to top-tier garment manufacturers in Bangladesh.</p>
          </div>
          <div className="grid grid-3-cols">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"Chemico's Soft Binder changed our finish quality completely. Our US buyers were impressed with the hand-feel from day one."</p>
              <div className="author">
                <div className="author-info">
                   <p className="name">Production Manager</p>
                   <p className="company">Hameem Group</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"The technical support is as good as the chemicals. They helped us calibrate our Reggiani machines for the new discharge paste."</p>
              <div className="author">
                <div className="author-info">
                   <p className="name">Head of Dyeing</p>
                   <p className="company">DBL Group</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"Consistent viscosity across batches is why we keep coming back. Chemico is a reliable partner for large-scale export orders."</p>
              <div className="author">
                <div className="author-info">
                   <p className="name">Factory Specialist</p>
                   <p className="company">Standard Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="quality-standards py-20 bg-muted">
         <div className="container flex-between align-center">
            <div className="quality-text">
               <h3>Meeting Global Export Standards</h3>
               <p>Our lab protocols are aligned with ISO and OKEO-TEX certification requirements.</p>
            </div>
            <div className="cert-pills flex gap-4">
               <span className="cert-pill">ISO 9001</span>
               <span className="cert-pill">OKEO-TEX</span>
               <span className="cert-pill">GOTS</span>
            </div>
         </div>
      </section>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/8801700000000?text=Hello%20Chemico%2C%20I%20have%20an%20inquiry%20regarding%20textile%20chemicals." 
        className="whatsapp-fab" 
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={32} />
        <span className="tooltip">{t('whatsapp_tooltip')}</span>
      </a>

      <style jsx>{`
        .hero { padding: 8rem 0; overflow: hidden; background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); position: relative; }
        .hero-container { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; }
        .badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(3, 105, 161, 0.1); color: var(--primary); border-radius: 100px; font-weight: 600; font-size: 0.875rem; margin-bottom: 1.5rem; }
        h1 { font-size: 3.5rem; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .hero p { font-size: 1.15rem; color: var(--text-muted); max-width: 500px; line-height: 1.6; }
        .hero-visual { position: relative; }
        .hero-card { background: white; border-radius: 1.5rem; padding: 1rem; box-shadow: var(--shadow-lg); }
        .hero-img { width: 100%; height: 350px; object-fit: cover; border-radius: 1rem; filter: saturate(1.2) contrast(1.1); }
        .hero-stats { display: flex; gap: 2rem; padding: 1.5rem; border-top: 1px solid var(--border); margin-top: 1rem; }
        .stat { display: flex; flex-direction: column; }
        .stat-num { font-size: 1.5rem; font-weight: 800; color: var(--primary); }
        .stat-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        
        .trust-item { text-align: center; padding: 3rem 2rem; background: white; border-radius: 1rem; box-shadow: var(--shadow); }
        .trust-icon { color: var(--primary); margin-bottom: 1.5rem; display: inline-block; }
        .trust-item h3 { margin-bottom: 1rem; }
        .trust-item p { color: var(--text-muted); font-size: 0.95rem; }
        
        .product-card { background: white; border-radius: 1rem; border: 1px solid var(--border); overflow: hidden; transition: all 0.3s ease; }
        .product-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
        .product-img-wrap { position: relative; height: 240px; overflow: hidden; }
        .product-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .product-card:hover .product-img-wrap img { transform: scale(1.05); }
        .cat-tag { position: absolute; top: 1rem; left: 1rem; background: white; padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 600; box-shadow: var(--shadow); }
        .product-info { padding: 1.5rem; }
        .product-info h3 { margin-bottom: 0.75rem; font-size: 1.25rem; }
        .product-info p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; min-height: 2.7rem; }
        .product-footer { border-top: 1px solid var(--border); padding-top: 1.5rem; }
        .btn-full { width: 100%; }
        
        .bg-dark { background: var(--foreground); }
        .category-card { padding: 3rem 1.5rem; border: 1px solid #1e293b; border-radius: 1rem; transition: all 0.2s; background: #0f172a; display: flex; flex-direction: column; justify-content: center; }
        .category-card:hover { border-color: var(--primary); background: #1e293b; }
        .category-card h3 { color: white; margin-bottom: 1rem; }
        .btn-text { color: var(--primary); font-weight: 600; font-size: 0.9rem; }
        
        .whatsapp-fab { position: fixed; bottom: 2rem; right: 2rem; background: #25d366; color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(37, 211, 102, 0.4); z-index: 1000; transition: transform 0.3s; }
        .whatsapp-fab:hover { transform: scale(1.1); }
        .tooltip { position: absolute; right: 80px; background: white; color: var(--foreground); padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; white-space: nowrap; box-shadow: var(--shadow); opacity: 0; transform: translateX(10px); transition: all 0.3s; pointer-events: none; border: 1px solid var(--border); }
        .whatsapp-fab:hover .tooltip { opacity: 1; transform: translateX(0); }
        
        .py-10 { padding: 2.5rem 0; }
        .py-20 { padding: 5rem 0; }
        .bg-muted { background: #f8fafc; }
        .grid-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-4 { grid-template-columns: repeat(4, 1fr); }
        .link-primary { color: var(--primary); font-weight: 600; transition: all 0.2s; }
        .link-primary:hover { opacity: 0.8; padding-left: 0.5rem; }
        .mt-8 { margin-top: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .text-center { text-align: center; }
        .text-white { color: white; }
        
        .grid-4-cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .grid-3-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .stat-num { font-size: 3rem; font-weight: 800; color: var(--primary); margin-bottom: 0.5rem; }
        .stat-desc { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; }
        
        .testimonial-card { padding: 3rem; background: white; border: 1px solid var(--border); border-radius: 2rem; transition: all 0.3s; }
        .testimonial-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); border-color: var(--primary); }
        .stars { color: #f59e0b; margin-bottom: 1.5rem; letter-spacing: 2px; }
        .quote { font-size: 1.1rem; line-height: 1.7; font-style: italic; color: #334155; margin-bottom: 2rem; }
        .name { font-weight: 800; color: var(--foreground); }
        .company { font-size: 0.85rem; color: var(--primary); font-weight: 700; }
        
        .cert-pill { background: white; padding: 0.75rem 1.5rem; border-radius: 100px; font-weight: 800; color: var(--text-muted); border: 1px solid var(--border); font-size: 0.8rem; }
        .quality-text h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .quality-text p { color: var(--text-muted); }
        .border-t { border-top: 1px solid rgba(255,255,255,0.1); }
        .py-16 { padding: 4rem 0; }
        .py-32 { padding: 8rem 0; }
        .mb-16 { margin-bottom: 4rem; }

        @media (max-width: 1024px) {
          .hero-container { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
          .hero p { margin: 0 auto; }
          .hero-container .flex { justify-content: center; }
          .grid-4-cols { grid-template-columns: 1fr 1fr; }
          .grid-3-cols { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .grid-4-cols { grid-template-columns: 1fr; }
          h1 { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}
