"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'chemico2026') {
      localStorage.setItem('chemico_admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-header">
           <ShieldCheck size={48} className="text-primary mb-4" />
           <h1>Admin Access</h1>
           <p>Authorized Personnel Only</p>
        </div>
        
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label><User size={16} /> Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required 
            />
          </div>
          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-6">Secure Login</button>
        </form>
      </div>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          padding: 2rem;
        }
        .login-card {
          background: white;
          width: 100%;
          max-width: 400px;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          border: 1px solid var(--border);
        }
        .login-header { text-align: center; margin-bottom: 2.5rem; }
        .login-header h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
        .login-header p { color: var(--text-muted); font-size: 0.9rem; }
        
        .error-alert { background: #fef2f2; color: #dc2626; padding: 1rem; border-radius: 0.5rem; border: 1px solid #fee2e2; margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 600; text-align: center; }
        
        .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 0.5rem; }
        .form-group input { width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid var(--border); background: #f8fafc; font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: var(--primary); }
        .w-full { width: 100%; }
        .mt-6 { margin-top: 1.5rem; }
      `}</style>
    </div>
  );
}
