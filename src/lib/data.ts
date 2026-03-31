import productsData from '@/data/products.json';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
  technicalSpecs: { label: string; value: string }[];
  features: string[];
  usage: string[];
  datasheetUrl: string;
  whatsappMessage?: string;
}

export const PRODUCTS: Product[] = productsData as Product[];

export const CATEGORIES = [
  "Pigment Paste",
  "Binders & Fixers",
  "Discharge Paste",
  "Thickeners"
];
