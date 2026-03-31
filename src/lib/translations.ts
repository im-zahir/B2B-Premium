export type TranslationKeys = 
  | 'nav_products' | 'nav_datasheets' | 'nav_about' | 'nav_contact' | 'nav_inquiry'
  | 'hero_badge' | 'hero_title' | 'hero_sub' | 'hero_cta_browse' | 'hero_cta_quote'
  | 'trust_quality_title' | 'trust_quality_sub'
  | 'trust_supply_title' | 'trust_supply_sub'
  | 'trust_support_title' | 'trust_support_sub'
  | 'featured_title' | 'featured_link'
  | 'category_title' | 'category_browse'
  | 'footer_desc' | 'footer_links' | 'footer_contact'
  | 'whatsapp_tooltip';

export const TRANSLATIONS: Record<'en' | 'bn', Record<TranslationKeys, string>> = {
  en: {
    nav_products: 'Products',
    nav_datasheets: 'Datasheets',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_inquiry: 'Inquiry',
    hero_badge: 'Trusted Textile Partner',
    hero_title: 'High-Performance Textile Chemicals — Manufactured in Bangladesh',
    hero_sub: 'Elevating B2B manufacturing standards with technical precision, ISO-certified quality, and dedicated technical support.',
    hero_cta_browse: 'Browse Products',
    hero_cta_quote: 'Request a Quote',
    trust_quality_title: 'Quality Certified',
    trust_quality_sub: 'All products adhere to international safety standards and quality certifications.',
    trust_supply_title: 'Direct Supply',
    trust_supply_sub: 'Reliable logistics network ensuring on-time delivery across all major industrial zones.',
    trust_support_title: 'Technical Support',
    trust_support_sub: 'Dedicated engineers providing application guidance and technical troubleshooting.',
    featured_title: 'Featured Solutions',
    featured_link: 'See All Products',
    category_title: 'Specialized Product Range',
    category_browse: 'Browse',
    footer_desc: 'Your partner in textile excellence. Delivering reliability and technical expertise to the Bangladesh textile sector.',
    footer_links: 'Quick Links',
    footer_contact: 'Contact',
    whatsapp_tooltip: 'Chat on WhatsApp'
  },
  bn: {
    nav_products: 'পণ্যসমূহ',
    nav_datasheets: 'ডেটাশিট',
    nav_about: 'আমাদের সম্পর্কে',
    nav_contact: 'যোগাযোগ',
    nav_inquiry: 'অনুসন্ধান করুন',
    hero_badge: 'বিশ্বস্ত টেক্সটাইল পার্টনার',
    hero_title: 'উচ্চমানের টেক্সটাইল কেমিক্যাল — বাংলাদেশে প্রস্তুতকৃত',
    hero_sub: 'প্রযুক্তিগত নির্ভুলতা, ISO-প্রত্যয়িত মান এবং নিবেদিত টেকনিক্যাল সাপোর্টের মাধ্যমে B2B ম্যানুফ্যাকচারিং স্ট্যান্ডার্ড উন্নয়ন।',
    hero_cta_browse: 'পণ্য দেখুন',
    hero_cta_quote: 'কোটেশন অনুরোধ করুন',
    trust_quality_title: 'মান প্রত্যয়িত',
    trust_quality_sub: 'সকল পণ্য আন্তর্জাতিক নিরাপত্তা মান এবং গুণমান সার্টিফিকেশন মেনে চলে।',
    trust_supply_title: 'সরাসরি সরবরাহ',
    trust_supply_sub: 'সকল প্রধান শিল্প অঞ্চলে সময়মতো ডেলিভারি নিশ্চিতকারী নির্ভরযোগ্য লজিস্টিক নেটওয়ার্ক।',
    trust_support_title: 'কারিগরি সহায়তা',
    trust_support_sub: 'অ্যাপ্লিকেশন গাইডেন্স এবং টেকনিক্যাল সমস্যার সমাধানে নিয়োজিত দক্ষ ইঞ্জিনিয়ারগণ।',
    featured_title: 'সেরা সমাধানসমূহ',
    featured_link: 'সব পণ্য দেখুন',
    category_title: 'বিশেষায়িত পণ্যের পরিসর',
    category_browse: 'দেখুন',
    footer_desc: 'টেক্সটাইল শিল্পে আপনার শ্রেষ্ঠক। বাংলাদেশের টেক্সটাইল সেক্টরে নির্ভরযোগ্যতা এবং প্রযুক্তিগত দক্ষতা প্রদান করছি।',
    footer_links: 'দ্রুত লিঙ্ক',
    footer_contact: 'যোগাযোগ',
    whatsapp_tooltip: 'হোয়াটসঅ্যাপে চ্যাট করুন'
  }
};
