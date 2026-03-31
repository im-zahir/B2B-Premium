"use client";

import { MapPin, Phone, MessageSquare, Mail, Clock, Send, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-header py-20 bg-muted">
        <div className="container text-center">
          <span className="badge">{language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch'}</span>
          <h1>{language === 'bn' ? 'আপনার কারখানার জন্য সেরা সমাধান খুঁজুন' : 'Let’s Discuss Your Industrial Chemical Needs'}</h1>
          <p className="subtitle">{language === 'bn' ? 'আমাদের বিশেষজ্ঞ টিমের সাথে কথা বলুন পরামর্শ বা উদ্ধৃতির জন্য।' : 'Have a technical query? Our team of engineers is ready to assist you with customized solutions.'}</p>
        </div>
      </section>

      <section className="contact-main py-20">
        <div className="container grid-contact">
          {/* Info Cards */}
          <div className="contact-info">
            <div className="info-card">
              <MapPin size={24} className="icon-primary" />
              <div>
                <h3>{language === 'bn' ? 'প্রধান কার্যালয়' : 'Head Office'}</h3>
                <p>House 12, Road 7, Sector 3, Uttara, Dhaka-1230, Bangladesh</p>
              </div>
            </div>

            <div className="info-card">
              <Phone size={24} className="icon-primary" />
              <div>
                <h3>{language === 'bn' ? 'সরাসরি কল' : 'Direct Call'}</h3>
                <p>+880 1711-XXXXXX (Sales)</p>
                <p>+880 1712-XXXXXX (Technical)</p>
              </div>
            </div>

            <div className="info-card">
              <MessageSquare size={24} className="icon-primary" />
              <div>
                <h3>{language === 'bn' ? 'হোয়াটসঅ্যাপ অনুসন্ধান' : 'WhatsApp Inquiry'}</h3>
                <p>+880 1700-000000</p>
                <a href="https://wa.me/8801700000000" target="_blank" className="link-primary text-sm font-bold">Chat Now &rarr;</a>
              </div>
            </div>

            <div className="info-card">
              <Mail size={24} className="icon-primary" />
              <div>
                <h3>{language === 'bn' ? 'ইমেল করুন' : 'Email Us'}</h3>
                <p>info@chemico.com.bd</p>
                <p>sales@chemico.com.bd</p>
              </div>
            </div>

            <div className="business-hours mt-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-muted" />
                <h4 className="font-bold">{language === 'bn' ? 'ব্যবসায়িক সময়' : 'Business Hours'}</h4>
              </div>
              <p className="text-sm text-muted">Saturday - Thursday: 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-secondary font-bold mt-2">{language === 'bn' ? 'শুক্রবার: বন্ধ' : 'Friday: Closed'}</p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <h3>{language === 'bn' ? 'আমাদের একটি বার্তা পাঠান' : 'Send us a Message'}</h3>
            <p className="mb-8 text-muted">{language === 'bn' ? 'আমাদের বিশেষজ্ঞ টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।' : 'Our technical team will respond to your inquiry within 24 hours.'}</p>
            
            <form className="grid-form">
              <div className="form-group">
                <label>{language === 'bn' ? 'আপনার নাম' : 'Full Name'}</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>{language === 'bn' ? 'কোম্পানির নাম' : 'Company Name'}</label>
                <input type="text" placeholder="Textile Factory Ltd." required />
              </div>
              <div className="form-group">
                <label>{language === 'bn' ? 'ইমেল ঠিকানা' : 'Email Address'}</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>{language === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}</label>
                <input type="tel" placeholder="+880 1XXXXXXXXX" required />
              </div>
              <div className="form-group full-width">
                <label>{language === 'bn' ? 'আপনার কী প্রয়োজন?' : 'Interested Product / Service'}</label>
                <select>
                  <option>Pigment Pastes</option>
                  <option>Binders & Fixers</option>
                  <option>Discharge Paste</option>
                  <option>Thickeners</option>
                  <option>Custom Formulation</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>{language === 'bn' ? 'বার্তা' : 'Message'}</label>
                <textarea rows={5} placeholder="Tell us about your requirements..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg full-width flex gap-2">
                <Send size={18} /> {language === 'bn' ? 'এগিয়ে যান' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-muted { background: #f8fafc; }
        .py-20 { padding: 5rem 0; }
        .text-center { text-align: center; }
        .badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(3, 105, 161, 0.1); color: var(--primary); border-radius: 100px; font-weight: 700; font-size: 0.8rem; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        h1 { font-size: 3rem; margin-bottom: 1.5rem; max-width: 800px; margin-left: auto; margin-right: auto; line-height: 1.1; }
        .subtitle { font-size: 1.15rem; color: var(--text-muted); max-width: 600px; margin-left: auto; margin-right: auto; }
        
        .grid-contact { display: grid; grid-template-columns: 1fr 1.5fr; gap: 5rem; }
        .info-card { display: flex; gap: 1.5rem; margin-bottom: 2.5rem; }
        .info-card h3 { font-size: 1.15rem; margin-bottom: 0.5rem; }
        .info-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }
        .icon-primary { color: var(--primary); margin-top: 0.25rem; }
        
        .contact-form-card { background: white; padding: 3rem; border-radius: 2rem; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        .contact-form-card h3 { font-size: 1.75rem; margin-bottom: 0.75rem; }
        
        .grid-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .full-width { grid-column: span 2; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.875rem; font-weight: 600; color: #334155; }
        .form-group input, .form-group select, .form-group textarea { padding: 0.75rem 1rem; border-radius: 0.5rem; border: 1px solid var(--border); background: #f8fafc; font-size: 0.95rem; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--primary); }
        
        .mt-10 { margin-top: 2.5rem; }
        .full-width { width: 100%; }

        @media (max-width: 1024px) {
          .grid-contact { grid-template-columns: 1fr; gap: 4rem; }
          .contact-form-card { padding: 2rem; }
        }
        @media (max-width: 640px) {
          .grid-form { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          h1 { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}
