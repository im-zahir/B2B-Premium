"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  LogOut, 
  User, 
  Settings, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Activity, 
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('chemico_admin_auth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const [prodRes, inqRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/inquiries')
      ]);
      
      const products = await prodRes.json();
      const inquiries = await inqRes.json();
      
      const newLeads = inquiries.filter((i: any) => i.status === 'new').length;
      const conversionRate = inquiries.length > 0 ? ((inquiries.filter((i: any) => i.status === 'closed').length / inquiries.length) * 100).toFixed(1) : '0.0';

      setStats([
        { label: 'Live Products', value: products.length.toString(), icon: <Package size={20} />, color: '#0369a1' },
        { label: 'Total Leads', value: inquiries.length.toString(), icon: <MessageSquare size={20} />, color: '#059669' },
        { label: 'New Inquiries', value: newLeads.toString(), icon: <FileText size={20} />, color: '#7c3aed' },
        { label: 'Win Rate', value: `${conversionRate}%`, icon: <TrendingUp size={20} />, color: '#ea580c' },
      ]);

      setRecentInquiries(inquiries.slice(-3).reverse());
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chemico_admin_auth');
    router.push('/admin/login');
  };

  if (loading) return <div className="admin-loading">Initializing Command Center...</div>;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
           <div className="logo-box">
              <span className="logo-text">CHEMICO</span>
              <span className="logo-sub">ADMIN PANEL</span>
           </div>
        </div>
        
        <nav className="sidebar-nav">
          <Link href="/admin" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</Link>
          <Link href="/admin/inquiries" className="nav-item"><MessageSquare size={20} /> Inquiry Inbox</Link>
          <Link href="/admin/products" className="nav-item"><Package size={20} /> Manage Products</Link>
          <div className="sidebar-divider"></div>
          <Link href="/admin/analytics" className="nav-item disabled"><Activity size={20} /> Analytics</Link>
          <Link href="/admin/settings" className="nav-item disabled"><Settings size={20} /> Settings</Link>
        </nav>

        <div className="sidebar-footer">
           <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
           <div className="container-admin flex-between">
              <h1>Platform Intelligence Overview</h1>
              <div className="user-profile">
                 <div className="user-info">
                    <p className="user-name">Admin Executive</p>
                    <p className="user-role">System Access: Root</p>
                 </div>
                 <div className="user-avatar"><User size={20} /></div>
              </div>
           </div>
        </header>

        <div className="container-admin py-8">
           {/* Stats Grid */}
           <div className="admin-stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                   <div className="stat-icon" style={{ background: `${stat.color}10`, color: stat.color }}>{stat.icon}</div>
                   <div className="stat-text">
                      <p className="stat-label">{stat.label}</p>
                      <p className="stat-value">{stat.value}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* Recent Activity & Quick Actions */}
           <div className="dashboard-grid mt-10">
              <div className="card activity-card">
                 <div className="card-header flex-between mb-6">
                    <h3>Recent Inquiries</h3>
                    <Link href="/admin/inquiries" className="link-text text-sm">Open Inbox <ChevronRight size={14} /></Link>
                 </div>
                 <div className="activity-list">
                    {recentInquiries.length === 0 ? (
                      <p className="text-muted italic">No recent inquiries to display.</p>
                    ) : (
                      recentInquiries.map((inq, i) => (
                        <div key={i} className="activity-item">
                           <div className={`activity-marker ${inq.status}`}></div>
                           <div className="activity-content">
                              <p className="activity-text"><strong>{inq.companyName}</strong> requested quote for <strong>{inq.machineType}</strong></p>
                              <p className="activity-time">{new Date(inq.timestamp).toLocaleDateString()} • Status: {inq.status}</p>
                           </div>
                        </div>
                      ))
                    )}
                 </div>
              </div>

              <div className="card actions-card">
                 <h3>Management Shortcuts</h3>
                 <div className="actions-grid">
                    <Link href="/admin/products" className="action-btn">
                       <Package className="mb-2" />
                       Edit Catalog
                    </Link>
                    <Link href="/admin/inquiries" className="action-btn">
                       <MessageSquare className="mb-2" />
                       Export Leads
                    </Link>
                    <a href="/" target="_blank" className="action-btn">
                       <ExternalLink className="mb-2" />
                       Live Site
                    </a>
                    <div className="action-btn disabled">
                       <TrendingUp className="mb-2" />
                       Price Report
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>

      <style jsx>{`
        .admin-layout { display: flex; min-height: 100vh; background: #f8fafc; color: #1e293b; }
        .admin-sidebar { width: 280px; height: 100vh; position: sticky; top: 0; background: #0f172a; color: white; display: flex; flex-direction: column; }
        .sidebar-header { padding: 2.5rem 2rem; border-bottom: 1px solid #1e293b; }
        .logo-text { font-weight: 800; font-size: 1.25rem; letter-spacing: -0.02em; color: white; }
        .logo-sub { font-size: 0.7rem; letter-spacing: 0.1em; color: #94a3b8; font-weight: 700; margin-top: 0.25rem; }
        .sidebar-divider { height: 1px; background: #1e293b; margin: 1rem 1.5rem; }
        
        .sidebar-nav { padding: 2rem 1.5rem; flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1.25rem; border-radius: 0.75rem; color: #94a3b8; font-weight: 700; font-size: 0.9rem; transition: all 0.2s; text-decoration: none; }
        .nav-item:hover { background: rgba(255, 255, 255, 0.05); color: white; }
        .nav-item.active { background: var(--primary); color: white; }
        .nav-item.disabled { opacity: 0.4; pointer-events: none; }
        
        .sidebar-footer { padding: 1.5rem; border-top: 1px solid #1e293b; }
        .logout-btn { width: 100%; display: flex; align-items: center; gap: 0.8rem; padding: 0.75rem 1rem; border-radius: 0.75rem; background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .logout-btn:hover { background: #ef4444; color: white; }

        .admin-main { flex: 1; overflow-y: auto; }
        .admin-header { background: white; border-bottom: 1px solid rgba(226, 232, 240, 0.8); padding: 1.5rem 0; }
        .container-admin { padding: 0 3.5rem; }
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        
        .user-profile { display: flex; align-items: center; gap: 1rem; }
        .user-info { text-align: right; }
        .user-name { font-weight: 800; font-size: 0.9rem; }
        .user-role { font-size: 0.75rem; color: #64748b; font-weight: 600; }
        .user-avatar { width: 42px; height: 42px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: var(--primary); border: 2px solid #e2e8f0; }

        .admin-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stat-card { background: white; padding: 2rem; border-radius: 1.5rem; border: 1px solid var(--border); display: flex; align-items: center; gap: 1.25rem; box-shadow: 0 4px 10px rgba(0,0,0,0.03); }
        .stat-icon { width: 52px; height: 52px; border-radius: 1.25rem; display: flex; align-items: center; justify-content: center; }
        .stat-label { font-size: 0.8rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .stat-value { font-size: 1.85rem; font-weight: 800; color: #0f172a; }

        .dashboard-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; }
        .card { background: white; padding: 2.5rem; border-radius: 2rem; border: 1px solid var(--border); }
        .card h3 { font-size: 1.35rem; margin-bottom: 2rem; font-weight: 800; }
        
        .activity-list { display: flex; flex-direction: column; gap: 1.75rem; }
        .activity-item { display: flex; gap: 1.5rem; align-items: flex-start; }
        .activity-marker { width: 12px; height: 12px; border-radius: 50%; background: #94a3b8; margin-top: 0.5rem; border: 3px solid white; box-shadow: 0 0 0 4px #f1f5f9; }
        .activity-marker.new { background: #eab308; box-shadow: 0 0 0 4px #fef9c3; }
        .activity-marker.contacted { background: #059669; box-shadow: 0 0 0 4px #ecfdf5; }
        .activity-text { font-size: 0.95rem; margin-bottom: 0.4rem; color: #334155; }
        .activity-time { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
        
        .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .action-btn { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 1.25rem; padding: 1.5rem; text-align: center; font-weight: 700; color: #475569; transition: all 0.2s; cursor: pointer; text-decoration: none; display: flex; flex-direction: column; align-items: center; font-size: 0.85rem; }
        .action-btn:hover { background: white; border-color: var(--primary); color: var(--primary); transform: scale(1.02); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .action-btn.disabled { opacity: 0.4; cursor: not-allowed; }
        
        .admin-loading { height: 100vh; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--primary); background: #f8fafc; font-size: 1.25rem; }
        .py-8 { padding: 2rem 0; }
        .mt-10 { margin-top: 2.5rem; }
        .text-sm { font-size: 0.875rem; }
        .link-text { color: var(--primary); font-weight: 800; text-decoration: none; }
      `}</style>
    </div>
  );
}
