"use client";

import Link from 'next/link';
import { Award, Users, Factory, History, CheckCircle, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero py-20 bg-muted">
        <div className="container grid-2">
          <div className="hero-content">
            <span className="badge">{language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}</span>
            <h1>{language === 'bn' ? '২০১০ সাল থেকে টেক্সটাইল কেমিক্যালে শ্রেষ্ঠত্বের পথিকৃৎ' : 'Pioneering Excellence in Textile Chemicals Since 2010'}</h1>
            <p className="subtitle">{language === 'bn' ? 'একজন স্থানীয় ব্যবসায়ী থেকে শীর্ষস্থানীয় প্রস্তুতকারক পর্যন্ত, কেমিকো ইনোভেশনস বাংলাদেশের টেক্সটাইল বিপ্লবের অগ্রভাগে রয়েছে।' : 'From a local trader to a leading manufacturer, Chemico Innovations has been at the forefront of the Bangladesh textile revolution.'}</p>
          </div>
          <div className="hero-img-wrap">
            <img src="/images/factory.png" alt="Chemico Team" />
            <div className="stats-box">
              <div className="stat">
                <h3>15+</h3>
                <p>{language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years in Market'}</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>{language === 'bn' ? 'ফ্যাক্টরি সেবা' : 'Factories Served'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy py-20">
        <div className="container">
          <div className="section-header text-center mb-12">
            <h2>{language === 'bn' ? 'আমাদের মূল স্তম্ভ' : 'Our Core Pillars'}</h2>
            <p>{language === 'bn' ? 'তিনটি মৌলিক নীতির মাধ্যমে শিল্প প্রবৃদ্ধি পরিচালনা করছি।' : 'Driving industrial growth through three fundamental principles.'}</p>
          </div>
          <div className="grid grid-pillers">
            <div className="piller-card">
              <Award size={40} className="piller-icon" />
              <h3>{language === 'bn' ? 'অতুলনীয় গুণমান' : 'Unmatched Quality'}</h3>
              <p>{language === 'bn' ? 'রপ্তানি-মানের টেক্সটাইলের জন্য প্রয়োজনীয় ধারাবাহিক ভিসকোসিটি, pH এবং কর্মক্ষমতা নিশ্চিত করতে প্রতিটি ব্যাচ কঠোর ল্যাব পরীক্ষার মধ্য দিয়ে যায়।' : 'Every batch undergoes rigorous lab testing to ensure consistent viscosity, pH, and performance levels required for export-grade textiles.'}</p>
            </div>
            <div className="piller-card">
              <History size={40} className="piller-icon" />
              <h3>{language === 'bn' ? 'কারিগরি ঐতিহ্য' : 'Technical Heritage'}</h3>
              <p>{language === 'bn' ? 'ইঞ্জিনিয়ারদের দ্বারা ইঞ্জিনিয়ারদের জন্য তৈরি। আমরা কেবল কেমিক্যাল বিক্রি করি না; আমরা সেগুলো দক্ষতার সাথে ব্যবহার করার কারিগরি জ্ঞান প্রদান করি।' : 'Built by engineers for engineers. We don\'t just sell chemicals; we provide the technical knowledge to use them efficiently.'}</p>
            </div>
            <div className="piller-card">
              <Users size={40} className="piller-icon" />
              <h3>{language === 'bn' ? 'স্থানীয় উদ্ভাবন' : 'Local Innovation'}</h3>
              <p>{language === 'bn' ? 'গর্বিতভাবে বাংলাদেশে প্রস্তুতকৃত। আমরা স্থানীয় জলবায়ু, পানির অবস্থা এবং মেশিন সেটআপ অন্য কারো চেয়ে ভালো বুঝি।' : 'Proudly manufactured in Bangladesh. We understand the local climate, water conditions, and machine setups like no one else.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certs py-20 bg-dark text-white">
        <div className="container">
          <div className="grid-2 align-center">
            <div>
              <h2>{language === 'bn' ? 'বৈশ্বিক মানসমূহ, স্থানীয় দক্ষতা' : 'Global Standards, Local Expertise'}</h2>
              <p className="mb-8">{language === 'bn' ? 'কেমিকো পরিবেশগত স্থায়িত্ব এবং নিরাপত্তার প্রতি প্রতিশ্রুতিবদ্ধ। আমরা আন্তর্জাতিক সার্টিফিকেট পেয়ে গর্বিত যা আমাদের শিল্প অনুশীলনের বৈধতা দেয়।' : 'Chemico is committed to environmental sustainability and safety. We are proud to hold international certifications that validate our industrial practices.'}</p>
              <ul className="cert-list">
                 <li><CheckCircle className="text-primary" /> ISO 9001:2015 Quality Management</li>
                 <li><CheckCircle className="text-primary" /> ISO 14001:2015 Environmental System</li>
                 <li><CheckCircle className="text-primary" /> OEKO-TEX Standard 100 Compliant</li>
                 <li><CheckCircle className="text-primary" /> GOTS (Global Organic Textile Standard)</li>
              </ul>
            </div>
            <div className="cert-logos grid grid-2">
               <div className="cert-logo-box">CERTIFIED</div>
               <div className="cert-logo-box">OEKO-TEX</div>
               <div className="cert-logo-box">GOTS</div>
               <div className="cert-logo-box">ISO</div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory */}
      <section className="lab py-20">
        <div className="container grid-2 reverse">
          <div className="lab-content">
            <h2>{language === 'bn' ? 'ইন-হাউস R&D ল্যাবরেটরি' : 'In-House R&D Laboratory'}</h2>
            <p>{language === 'bn' ? 'ঢাকার আমাদের সুবিধায় একটি অত্যাধুনিক ল্যাবরেটরি রয়েছে যেখানে আমরা গবেষণা, ব্যাচ টেস্টিং এবং কাস্টমাইজড ফর্মুলেশন ডেভেলপমেন্ট পরিচালনা করি।' : 'Our facility in Dhaka houses a state-of-the-art laboratory where we conduct ongoing research, batch testing, and customized formulation development.'} </p>
            <div className="lab-features mt-8">
               <div className="lab-feature">
                 <h4>{language === 'bn' ? 'কালার ম্যাচিং' : 'Color Matching'}</h4>
                 <p>{language === 'bn' ? 'সকল পিগমেন্ট পেস্টের জন্য স্পেকট্রোফটোমিটার-সহায়তায় শেড ম্যাচিং।' : 'Spectrophotometer-assisted shade matching for all pigment pastes.'}</p>
               </div>
               <div className="lab-feature">
                 <h4>{language === 'bn' ? 'ফাস্টনেস টেস্টিং' : 'Fastness Testing'}</h4>
                 <p>{language === 'bn' ? 'প্রমিত ওয়াশ, ঘর্ষণ এবং আলো ফাস্টনেস প্রোটোকল।' : 'Standardized wash, rub, and light fastness protocols.'}</p>
               </div>
            </div>
          </div>
          <div className="lab-visual">
             <img src="/images/lab.png" alt="Lab Testing" className="rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-muted { background: #f8fafc; }
        .bg-dark { background: #111827; }
        .text-white { color: white; }
        .py-20 { padding: 5rem 0; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        .align-center { align-items: center; }
        .reverse { grid-template-columns: 1fr 1fr; }
        .text-center { text-align: center; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mt-8 { margin-top: 2rem; }
        .shadow-lg { box-shadow: var(--shadow-lg); }
        .rounded-2xl { border-radius: 2rem; }
        
        .badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(3, 105, 161, 0.1); color: var(--primary); border-radius: 100px; font-weight: 700; font-size: 0.8rem; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        h1 { font-size: 3.5rem; margin-bottom: 1.5rem; line-height: 1.1; letter-spacing: -0.02em; }
        h2 { font-size: 2.5rem; margin-bottom: 1.5rem; line-height: 1.2; }
        .subtitle { font-size: 1.25rem; color: var(--text-muted); line-height: 1.6; }
        
        .hero-img-wrap { position: relative; }
        .hero-img-wrap img { width: 100%; height: 450px; object-fit: cover; border-radius: 2rem; box-shadow: var(--shadow-lg); }
        .stats-box { position: absolute; bottom: -2rem; left: 2rem; background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-lg); display: flex; gap: 3rem; }
        .stat h3 { color: var(--primary); font-size: 2rem; margin-bottom: 0.25rem; }
        .stat p { color: var(--text-muted); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
        
        .grid-pillers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        .piller-card { padding: 3rem 2rem; background: white; border: 1px solid var(--border); border-radius: 1.5rem; text-align: center; transition: all 0.2s; }
        .piller-card:hover { border-color: var(--primary); box-shadow: var(--shadow); }
        .piller-icon { color: var(--primary); margin-bottom: 1.5rem; }
        
        .cert-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .cert-list li { display: flex; align-items: center; gap: 1rem; font-size: 1.1rem; color: #cbd5e1; }
        .text-primary { color: var(--primary); }
        
        .cert-logo-box { height: 100px; background: rgba(255, 255, 255, 0.05); border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.5); font-weight: 800; }
        
        .lab-visual img { width: 100%; height: 400px; object-fit: cover; }
        .lab-features { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .lab-feature h4 { color: var(--primary); margin-bottom: 0.5rem; }
        .lab-feature p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }
 
        @media (max-width: 1024px) {
          .grid-2 { grid-template-columns: 1fr; gap: 4rem; }
          .reverse { display: flex; flex-direction: column-reverse; }
          .grid-pillers { grid-template-columns: 1fr; }
          .hero-img-wrap img { height: 300px; }
          .stats-box { position: static; margin-top: 2rem; }
        }
      `}</style>
    </div>
  );
}
