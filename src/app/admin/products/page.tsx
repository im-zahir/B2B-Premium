"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Package, 
  ArrowLeft, 
  ChevronRight, 
  Eye, 
  Save, 
  X 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('chemico_admin_auth');
    if (!auth) router.push('/admin/login');
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', product: editingProduct })
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', product: { id } })
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-layout">
      {/* Mini Sidebar */}
      <aside className="admin-sidebar mini">
        <Link href="/admin" className="nav-item"><ArrowLeft size={20} /> Back</Link>
        <div className="sidebar-divider"></div>
        <Link href="/admin/products" className="nav-item active"><Package size={20} /></Link>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
           <div className="container-admin flex-between">
              <h1>Manage Product Catalog</h1>
              <button className="btn btn-primary flex gap-2"><Plus size={18} /> Add New Product</button>
           </div>
        </header>

        <div className="container-admin py-8">
           <div className="table-controls mb-8 flex-between">
              <div className="search-box">
                 <Search size={18} className="search-icon" />
                 <input 
                   type="text" 
                   placeholder="Search products..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
              <div className="filter-pill">
                 Total Products: <strong>{products.length}</strong>
              </div>
           </div>

           {loading ? (
             <div className="loading-state">Loading Catalog...</div>
           ) : (
             <div className="products-table-wrap card">
                <table className="admin-table">
                   <thead>
                      <tr>
                         <th>Product Name</th>
                         <th>Category</th>
                         <th>Price/Availability</th>
                         <th>Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filteredProducts.map(p => (
                        <tr key={p.id}>
                           <td>
                              <div className="flex items-center gap-3">
                                 <img src={p.image} className="table-thumb" alt="" />
                                 <div>
                                    <p className="font-bold">{p.name}</p>
                                    <p className="text-xs text-muted">{p.slug}</p>
                                 </div>
                              </div>
                           </td>
                           <td><span className="badge-cat">{p.category}</span></td>
                           <td><span className="text-status">In Stock</span></td>
                           <td>
                              <div className="flex gap-2">
                                 <button onClick={() => setEditingProduct(p)} className="action-icon edit"><Edit3 size={16} /></button>
                                 <Link href={`/products/${p.slug}`} target="_blank" className="action-icon view"><Eye size={16} /></Link>
                                 <button onClick={() => handleDelete(p.id)} className="action-icon delete"><Trash2 size={16} /></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           )}
        </div>
      </main>

      {/* Quick Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay">
           <div className="modal-card">
              <div className="modal-header flex-between mb-8">
                 <h3>Edit Technical Specifications</h3>
                 <button onClick={() => setEditingProduct(null)} className="close-btn"><X size={20} /></button>
              </div>
              <form onSubmit={handleUpdate} className="grid-form">
                 <div className="form-group full-width">
                    <label>Product Name</label>
                    <input 
                      type="text" 
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    />
                 </div>
                 <div className="form-group">
                    <label>Category</label>
                    <input 
                      type="text" 
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    />
                 </div>
                 <div className="form-group">
                    <label>TDS Document Key</label>
                    <input 
                      type="text" 
                      value={editingProduct.id}
                      disabled
                    />
                 </div>
                 
                 <div className="form-group full-width">
                    <label>Short Description</label>
                    <textarea 
                      rows={3} 
                      value={editingProduct.shortDescription}
                      onChange={(e) => setEditingProduct({...editingProduct, shortDescription: e.target.value})}
                    ></textarea>
                 </div>

                 <div className="specs-editor full-width">
                    <label className="mb-4 block font-bold">Live Technical Specs</label>
                    {editingProduct.technicalSpecs.map((spec: any, i: number) => (
                      <div key={i} className="flex gap-2 mb-2">
                         <input type="text" readOnly value={spec.label} className="bg-muted text-muted font-bold" />
                         <input 
                           type="text" 
                           value={spec.value}
                           onChange={(e) => {
                             const newSpecs = [...editingProduct.technicalSpecs];
                             newSpecs[i].value = e.target.value;
                             setEditingProduct({...editingProduct, technicalSpecs: newSpecs});
                           }}
                         />
                      </div>
                    ))}
                 </div>

                 <div className="flex gap-4 mt-8 full-width">
                    <button type="submit" className="btn btn-primary flex-1 flex gap-2 justify-center"><Save size={18} /> Update Catalog</button>
                    <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-outline flex-1">Discard Changes</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      <style jsx>{`
        .admin-layout { display: flex; min-height: 100vh; background: #f8fafc; color: #1e293b; }
        .admin-sidebar.mini { width: 80px; background: #0f172a; display: flex; flex-direction: column; align-items: center; padding: 2rem 0; gap: 2rem; position: sticky; top: 0; height: 100vh; }
        .sidebar-divider { height: 1px; width: 40px; background: rgba(255, 255, 255, 0.1); }
        .admin-sidebar .nav-item { color: #94a3b8; transition: all 0.2s; padding: 0.75rem; border-radius: 0.75rem; }
        .admin-sidebar .nav-item:hover { color: white; background: rgba(255,255,255,0.05); }
        .admin-sidebar .nav-item.active { background: var(--primary); color: white; }

        .admin-main { flex: 1; }
        .admin-header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1.5rem 3rem; }
        .admin-header h1 { font-size: 1.5rem; font-weight: 800; }
        
        .container-admin { padding: 2rem 3rem; }
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .card { background: white; border-radius: 1.5rem; border: 1px solid var(--border); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .mb-8 { margin-bottom: 2rem; }

        .search-box { position: relative; width: 400px; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .search-box input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; font-size: 0.9rem; }
        .filter-pill { background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.85rem; color: #475569; }

        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { padding: 1.25rem 2rem; font-size: 0.8rem; font-weight: 800; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .admin-table td { padding: 1.25rem 2rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        .table-thumb { width: 48px; height: 48px; border-radius: 0.5rem; object-fit: cover; border: 1px solid #e2e8f0; }
        .badge-cat { background: #f0f9ff; color: #0369a1; padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; }
        .text-status { font-size: 0.75rem; font-weight: 700; color: #059669; display: flex; align-items: center; gap: 0.25rem; }
        .action-icon { width: 32px; height: 32px; border-radius: 0.5rem; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: #64748b; transition: all 0.2s; cursor: pointer; }
        .action-icon:hover { background: #f1f5f9; color: var(--primary); border-color: var(--primary); }
        .action-icon.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem; }
        .modal-card { background: white; width: 100%; max-width: 800px; border-radius: 2rem; padding: 3rem; box-shadow: 0 30px 60px rgba(0,0,0,0.2); }
        .grid-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .full-width { grid-column: span 2; }
        .form-group label { display: block; font-size: 0.8rem; font-weight: 800; color: #64748b; margin-bottom: 0.5rem; text-transform: uppercase; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.85rem 1rem; border-radius: 0.75rem; border: 1px solid var(--border); background: #f8fafc; }
        .specs-editor input { width: 100%; padding: 0.75rem 1rem; font-size: 0.85rem; border: 1px solid var(--border); border-radius: 0.5rem; }
        .bg-muted { background: #f1f5f9; }
        .close-btn { background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; }
      `}</style>
    </div>
  );
}
