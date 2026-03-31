"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Send, CheckCircle, Factory, ShieldCheck, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuotePage() {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    regNo: '',
    repName: '',
    machineType: 'Flat Bed Screen Printing',
    machineBrand: '',
    requirement: '',
    details: '',
    contactMethod: 'WhatsApp',
    sampleRequired: false
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="quote-success py-32 text-center container">
        <CheckCircle size={80} className="text-primary mx-auto mb-8" />
        <h1>Inquiry Received Successfully</h1>
        <p className="subtitle">Our technical team will review your requirements and reach out within 2-4 business hours.</p>
        <Link href="/" className="btn btn-primary mt-12">Return to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="quote-page">
      <section className="quote-header py-20 bg-muted">
        <div className="container text-center">
          <span className="badge">Professional Inquiry</span>
          <h1>Request Technical Quote & Samples</h1>
          <p className="subtitle">High-capacity manufacturing solutions for the modern textile chain.</p>
        </div>
      </section>

      <section className="quote-body py-20">
        <div className="container narrow-container">
          <div className="step-indicator mb-12">
             <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
             <div className="step-line"></div>
             <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
             <div className="step-line"></div>
             <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          <form onSubmit={handleSubmit} className="quote-form-card">
            {step === 1 && (
              <div className="form-step">
                <h3><Factory size={20} className="text-primary" /> Factory Information</h3>
                <div className="grid-form">
                  <div className="form-group">
                    <label>Factory / Company Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter formal company name" 
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>VAT / Industrial Registration</label>
                    <input 
                      type="text" 
                      placeholder="Reg No. (Optional)" 
                      value={formData.regNo}
                      onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                    />
                  </div>
                  <div className="form-group full-width">
                     <label>Authorized Representative Name *</label>
                     <input 
                       type="text" 
                       placeholder="Full Name" 
                       value={formData.repName}
                       onChange={(e) => setFormData({...formData, repName: e.target.value})}
                       required 
                     />
                  </div>
                </div>
                <button type="button" onClick={nextStep} className="btn btn-primary mt-10 w-full flex-between">
                  Continue to Technical Specs <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h3><HelpCircle size={20} className="text-primary" /> Technical Requirements</h3>
                <div className="grid-form">
                  <div className="form-group">
                    <label>Primary Machine Type</label>
                    <select 
                      value={formData.machineType}
                      onChange={(e) => setFormData({...formData, machineType: e.target.value})}
                    >
                      <option>Flat Bed Screen Printing</option>
                      <option>Rotary Screen Printing</option>
                      <option>Manual Hand Printing</option>
                      <option>Exhaust Dyeing</option>
                      <option>Continuous Dyeing</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Machine Brand</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Zimmer, Reggiani" 
                      value={formData.machineBrand}
                      onChange={(e) => setFormData({...formData, machineBrand: e.target.value})}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Estimated Monthly Requirement (KG)</label>
                    <input 
                      type="number" 
                      placeholder="Estimated monthly volume" 
                      value={formData.requirement}
                      onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-10">
                   <button type="button" onClick={prevStep} className="btn btn-outline flex-1 flex gap-2"><ArrowLeft size={18} /> Back</button>
                   <button type="button" onClick={nextStep} className="btn btn-primary flex-1">Final Details</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h3><ShieldCheck size={20} className="text-primary" /> Submission</h3>
                <div className="grid-form">
                   <div className="form-group full-width">
                      <label>Additional Requirements / Custom Formulation Needs</label>
                      <textarea 
                        rows={4} 
                        placeholder="Tell us more about your specific needs..."
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                      ></textarea>
                   </div>
                   <div className="form-group">
                      <label>Preferred Contact Method</label>
                      <select 
                        value={formData.contactMethod}
                        onChange={(e) => setFormData({...formData, contactMethod: e.target.value})}
                      >
                         <option>WhatsApp</option>
                         <option>Phone Call</option>
                         <option>Email</option>
                      </select>
                   </div>
                   <div className="form-group check-group">
                      <input 
                        type="checkbox" 
                        id="sample" 
                        checked={formData.sampleRequired}
                        onChange={(e) => setFormData({...formData, sampleRequired: e.target.checked})}
                      />
                      <label htmlFor="sample">Request physical samples for lab trials</label>
                   </div>
                </div>
                <div className="flex gap-4 mt-10">
                   <button type="button" onClick={prevStep} className="btn btn-outline flex-1">Back</button>
                   <button type="submit" className="btn btn-primary flex-1 flex-between">
                      Submit Professional Quote <Send size={18} />
                   </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <style jsx>{`
        .bg-muted { background: #f8fafc; }
        .py-20 { padding: 5rem 0; }
        .py-32 { padding: 8rem 0; }
        .text-center { text-align: center; }
        .badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(3, 105, 161, 0.1); color: var(--primary); border-radius: 100px; font-weight: 700; font-size: 0.8rem; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        h1 { font-size: 3rem; margin-bottom: 1.5rem; }
        .subtitle { font-size: 1.15rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }
        
        .narrow-container { max-width: 700px; }
        .step-indicator { display: flex; align-items: center; justify-content: center; gap: 1rem; }
        .step-dot { width: 40px; height: 40px; border-radius: 50%; background: #e2e8f0; color: #64748b; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; transition: all 0.3s; }
        .step-dot.active { background: var(--primary); color: white; box-shadow: 0 0 0 4px rgba(3, 105, 161, 0.1); }
        .step-line { height: 2px; width: 40px; background: #e2e8f0; }
        
        .quote-form-card { background: white; padding: 3rem; border-radius: 2rem; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        .form-step h3 { font-size: 1.25rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
        
        .grid-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .full-width { grid-column: span 2; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
        .form-group input, .form-group select, .form-group textarea { padding: 0.8rem 1rem; border-radius: 0.6rem; border: 1px solid var(--border); background: #f8fafc; font-size: 0.95rem; }
        .form-group input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(3, 105, 161, 0.1); }
        
        .check-group { flex-direction: row; align-items: center; gap: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 0.75rem; border: 1px solid #bae6fd; }
        .check-group input { width: 1.25rem; height: 1.25rem; }
        .check-group label { color: var(--primary); font-weight: 700; }
        
        .mt-10 { margin-top: 2.5rem; }
        .w-full { width: 100%; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .mb-12 { margin-bottom: 3rem; }

        @media (max-width: 640px) {
          .grid-form { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .quote-form-card { padding: 2rem; }
          h1 { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}
