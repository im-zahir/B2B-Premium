"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MessageSquare, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  X,
  Factory,
  Database
} from 'lucide-react';
import Link from 'next/link';

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('chemico_admin_auth');
    if (!auth) router.push('/admin/login');
    fetchInquiries();
  }, [router]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data.reverse()); // Newest first
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      fetchInquiries();
      if (selectedInquiry) setSelectedInquiry({ ...selectedInquiry, status });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.repName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Date', 'Company', 'Contact Person', 'Machine', 'Requirement', 'Status'];
    const rows = inquiries.map(inq => [
      new Date(inq.timestamp).toLocaleDateString(),
      inq.companyName,
      inq.repName,
      inq.machineType,
      inq.requirement,
      inq.status
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `chemico_leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="admin-layout">
      {/* Mini Sidebar */}
      <aside className="admin-sidebar mini">
        <Link href="/admin" className="nav-item"><ArrowLeft size={20} /> Back</Link>
        <div className="sidebar-divider"></div>
        <Link href="/admin/inquiries" className="nav-item active"><Mail size={20} /></Link>
        <Link href="/admin/products" className="nav-item"><Database size={20} /></Link>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
           <div className="container-admin flex-between">
              <h1>Inquiry Inbox</h1>
              <button onClick={exportToCSV} className="btn btn-outline flex gap-2"><Download size={18} /> Export Leads</button>
           </div>
        </header>

        <div className="container-admin py-8">
           <div className="table-controls mb-8 flex-between">
              <div className="search-box">
                 <Search size={18} className="search-icon" />
                 <input 
                   type="text" 
                   placeholder="Search by company or name..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
              <div className="filter-group-btns flex gap-2">
                 <span className="text-xs font-bold text-muted uppercase">Status Filter:</span>
                 <button className="badge-btn active">All</button>
                 <button className="badge-btn">New</button>
                 <button className="badge-btn">Contacted</button>
              </div>
           </div>

           {loading ? (
             <div className="loading-state">Syncing Inbox...</div>
           ) : (
             <div className="inquiry-list card">
                {filteredInquiries.length === 0 ? (
                  <div className="empty-state py-20 text-center">
                     <Mail size={48} className="text-muted mx-auto mb-4 opacity-20" />
                     <p>No inquiries found.</p>
                  </div>
                ) : (
                  <table className="admin-table">
                     <thead>
                        <tr>
                           <th>Timestamp</th>
                           <th>Company & Representative</th>
                           <th>Requirements</th>
                           <th>Status</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {filteredInquiries.map(inq => (
                          <tr key={inq.id} className={inq.status === 'new' ? 'unread' : ''}>
                             <td>
                                <p className="text-xs font-bold">{new Date(inq.timestamp).toLocaleDateString()}</p>
                                <p className="text-xs text-muted">{new Date(inq.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                             </td>
                             <td>
                                <p className="font-bold">{inq.companyName}</p>
                                <p className="text-xs text-muted">{inq.repName}</p>
                             </td>
                             <td>
                                <p className="text-xs font-bold">{inq.machineType}</p>
                                <p className="text-xs text-muted">Req: {inq.requirement} KG/mo</p>
                             </td>
                             <td>
                                <span className={`status-pill ${inq.status}`}>
                                   {inq.status === 'new' && <Clock size={12} />}
                                   {inq.status === 'contacted' && <Phone size={12} />}
                                   {inq.status === 'closed' && <CheckCircle size={12} />}
                                   {inq.status}
                                </span>
                             </td>
                             <td>
                                <button onClick={() => setSelectedInquiry(inq)} className="action-icon view"><Eye size={16} /></button>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
                )}
             </div>
           )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="modal-overlay">
           <div className="modal-card">
              <div className="modal-header flex-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="icon-box"><Factory size={20} /></div>
                    <h3>Technical Inquiry Detail</h3>
                 </div>
                 <button onClick={() => setSelectedInquiry(null)} className="close-btn"><X size={20} /></button>
              </div>

              <div className="inquiry-content grid-2">
                 <div className="details-main">
                    <section className="mb-8">
                       <h4 className="text-muted uppercase text-xs font-extra-bold mb-3 tracking-widest">Lead Information</h4>
                       <div className="info-grid">
                          <div className="info-item">
                             <span className="label">Company</span>
                             <p className="value">{selectedInquiry.companyName}</p>
                          </div>
                          <div className="info-item">
                             <span className="label">Rep Name</span>
                             <p className="value">{selectedInquiry.repName}</p>
                          </div>
                       </div>
                    </section>

                    <section className="mb-8">
                       <h4 className="text-muted uppercase text-xs font-extra-bold mb-3 tracking-widest">Technical Specifications</h4>
                       <div className="info-grid">
                          <div className="info-item">
                             <span className="label">Machine Type</span>
                             <p className="value">{selectedInquiry.machineType}</p>
                          </div>
                          <div className="info-item">
                             <span className="label">Machine Brand</span>
                             <p className="value">{selectedInquiry.machineBrand || 'N/A'}</p>
                          </div>
                          <div className="info-item">
                             <span className="label">Monthly Req</span>
                             <p className="value font-num">{selectedInquiry.requirement} KG</p>
                          </div>
                       </div>
                    </section>

                    <section>
                       <h4 className="text-muted uppercase text-xs font-extra-bold mb-3 tracking-widest">Additional Details</h4>
                       <p className="quote-text">{selectedInquiry.details || 'No additional requirements provided.'}</p>
                       {selectedInquiry.sampleRequired && (
                         <div className="sample-alert mt-4">
                            <AlertCircle size={16} /> Sample requested for clinical trials
                         </div>
                       )}
                    </section>
                 </div>

                 <aside className="details-sidebar">
                    <div className="sidebar-card">
                       <h4>Manage Lead</h4>
                       <div className="status-selector mt-4">
                          <button 
                            onClick={() => updateStatus(selectedInquiry.id, 'new')}
                            className={`status-opt ${selectedInquiry.status === 'new' ? 'active' : ''}`}
                          >New Lead</button>
                          <button 
                            onClick={() => updateStatus(selectedInquiry.id, 'contacted')}
                            className={`status-opt ${selectedInquiry.status === 'contacted' ? 'active' : ''}`}
                          >Mark Contacted</button>
                          <button 
                            onClick={() => updateStatus(selectedInquiry.id, 'closed')}
                            className={`status-opt ${selectedInquiry.status === 'closed' ? 'active' : ''}`}
                          >Close / Won</button>
                       </div>

                       <div className="quick-contact mt-8">
                          <p className="text-xs font-bold text-muted mb-3">QUICK CONNECT</p>
                          <div className="flex gap-2">
                             <button className="contact-tool"><Phone size={18} /></button>
                             <button className="contact-tool"><MessageSquare size={18} /></button>
                             <button className="contact-tool"><Mail size={18} /></button>
                          </div>
                       </div>
                    </div>
                 </aside>
              </div>
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
        .card { background: white; border-radius: 1.5rem; border: 1px solid var(--border); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); overflow: hidden; }
        
        .search-box { position: relative; width: 350px; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .search-box input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; font-size: 0.85rem; }

        .badge-btn { background: #f1f5f9; border: none; padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.7rem; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s; }
        .badge-btn.active { background: var(--primary); color: white; }

        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { padding: 1.25rem 2rem; font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; background: #fafafa; }
        .admin-table td { padding: 1.25rem 2rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        .admin-table tr:hover { background: #fcfcfc; }
        .admin-table tr.unread { background: #f0f9ff60; }
        
        .status-pill { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .status-pill.new { background: #fef9c3; color: #854d0e; }
        .status-pill.contacted { background: #ecfdf5; color: #065f46; }
        .status-pill.closed { background: #f1f5f9; color: #475569; }

        .action-icon { width: 32px; height: 32px; border-radius: 0.5rem; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: #64748b; transition: all 0.2s; cursor: pointer; }
        .action-icon:hover { background: #f1f5f9; color: var(--primary); border-color: var(--primary); }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem; }
        .modal-card { background: white; width: 100%; max-width: 900px; border-radius: 2rem; padding: 3.5rem; box-shadow: 0 30px 60px rgba(0,0,0,0.2); position: relative; }
        .icon-box { background: #f0f9ff; color: var(--primary); padding: 0.75rem; border-radius: 0.75rem; }
        
        .grid-2 { display: grid; grid-template-columns: 1fr 280px; gap: 4rem; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 1rem; }
        .info-item { display: flex; flex-direction: column; gap: 0.4rem; }
        .label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; }
        .value { font-weight: 700; color: #1e293b; font-size: 1.1rem; }
        .font-num { font-family: monospace; font-size: 1.25rem; color: var(--primary); }
        .quote-text { background: #f8fafc; padding: 1.5rem; border-radius: 1rem; font-size: 0.95rem; line-height: 1.6; font-style: italic; border-left: 4px solid #cbd5e1; }
        .sample-alert { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: #fff7ed; border-radius: 0.75rem; color: #9a3412; font-weight: 700; font-size: 0.85rem; border: 1px solid #ffedd5; }
        
        .sidebar-card { background: #f8fafc; padding: 2rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; }
        .status-opt { width: 100%; text-align: left; background: white; border: 1px solid #e2e8f0; padding: 0.75rem 1rem; border-radius: 0.75rem; margin-bottom: 0.5rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .status-opt.active { background: var(--primary); color: white; border-color: var(--primary); }
        .contact-tool { width: 44px; height: 44px; background: white; border: 1px solid #e2e8f0; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; transition: all 0.2s; }
        .contact-tool:hover { background: #f1f5f9; color: var(--primary); border-color: var(--primary); }
        
        .close-btn { background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; }
      `}</style>
    </div>
  );
}
