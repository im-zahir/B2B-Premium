"use client";

import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-listing">
      {/* Header */}
      <section className="listing-header py-16 bg-muted">
        <div className="container">
          <span className="badge-small">Industrial Solutions</span>
          <h1>Our Product Catalog</h1>
          <p className="subtitle">Explore our full range of high-performance textile chemicals and auxiliaries.</p>
          
          <div className="search-bar-wrap mt-10">
            <div className="search-input">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by product name or keyword..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="listing-main py-20">
        <div className="container grid-listing">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="filter-group">
              <h3><Filter size={18} /> Categories</h3>
              <div className="filter-list">
                <button 
                  className={activeCategory === 'All' ? 'active' : ''} 
                  onClick={() => setActiveCategory('All')}
                >
                  All Products
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat} 
                    className={activeCategory === cat ? 'active' : ''}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="help-box mt-10">
              <h4>Need Technical Advice?</h4>
              <p>Our engineers can help you choose the right product for your specific machinery.</p>
              <Link href="/contact" className="btn btn-primary btn-sm btn-full mt-4">Contact Specialist</Link>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="results-area">
            <div className="results-meta flex-between mb-8">
              <p>Showing <strong>{filteredProducts.length}</strong> products</p>
              <div className="sort-select">
                <span>Sort by: </span>
                <select>
                  <option>Newest First</option>
                  <option>Name A-Z</option>
                </select>
              </div>
            </div>

            <div className="grid grid-3">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrap">
                    <img src={product.image} alt={product.name} />
                    <span className="cat-tag">{product.category}</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.shortDescription}</p>
                    <div className="product-footer">
                      <Link href={`/products/${product.slug}`} className="btn btn-outline btn-full flex-between">
                        View Specs <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-results">
                <p>No products found matching your search criteria.</p>
                <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="btn btn-outline mt-4">Clear All Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .listing-header { border-bottom: 1px solid var(--border); }
        .badge-small { color: var(--primary); font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
        h1 { font-size: 3rem; margin: 1rem 0; }
        .subtitle { color: var(--text-muted); font-size: 1.15rem; max-width: 600px; }
        
        .search-input { position: relative; max-width: 600px; }
        .search-icon { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .search-input input { width: 100%; padding: 1rem 1rem 1rem 3.5rem; border-radius: 0.75rem; border: 1px solid var(--border); font-size: 1rem; box-shadow: var(--shadow); }
        .search-input input:focus { outline: none; border-color: var(--primary); ring: 2px solid rgba(3, 105, 161, 0.1); }
        
        .grid-listing { display: grid; grid-template-columns: 260px 1fr; gap: 4rem; }
        .filter-group h3 { display: flex; align-items: center; gap: 0.75rem; font-size: 1.15rem; margin-bottom: 1.5rem; }
        .filter-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .filter-list button { text-align: left; background: none; border: none; padding: 0.75rem 1rem; border-radius: 0.5rem; cursor: pointer; color: var(--text-muted); transition: all 0.2s; font-weight: 500; }
        .filter-list button:hover { background: #f1f5f9; color: var(--foreground); }
        .filter-list button.active { background: var(--primary); color: white; }
        
        .help-box { background: #f8fafc; padding: 2rem; border-radius: 1rem; border: 1px solid var(--border); }
        .help-box h4 { margin-bottom: 0.75rem; }
        .help-box p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }
        
        .product-card { background: white; border-radius: 1rem; border: 1px solid var(--border); overflow: hidden; transition: all 0.3s ease; display: flex; flex-direction: column; }
        .product-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
        .product-img-wrap { position: relative; height: 180px; overflow: hidden; }
        .product-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .cat-tag { position: absolute; top: 1rem; left: 1rem; background: rgba(255, 255, 255, 0.9); padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.7rem; font-weight: 700; color: var(--primary); }
        .product-info { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .product-info h3 { font-size: 1.15rem; margin-bottom: 0.75rem; }
        .product-info p { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem; line-height: 1.5; flex: 1; }
        .product-footer { border-top: 1px solid #f1f5f9; padding-top: 1.25rem; }
        
        .grid-3 { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .no-results { text-align: center; padding: 5rem 0; color: var(--text-muted); }
        
        .py-16 { padding: 4rem 0; }
        .py-20 { padding: 5rem 0; }
        .bg-muted { background: #f8fafc; }
        .mt-10 { margin-top: 2.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .btn-full { width: 100%; }

        @media (max-width: 1024px) {
          .grid-listing { grid-template-columns: 1fr; }
          .sidebar { display: flex; flex-direction: column; gap: 2rem; }
          .filter-list { flex-direction: row; flex-wrap: wrap; }
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
