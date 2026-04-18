// types/invest-rwanda.ts

export type InvestmentCategory = 
  | "residential" 
  | "commercial" 
  | "hotel" 
  | "mixed-use" 
  | "land";

export type InvestmentImage = {
  src: string;
  alt: string;
  title?: string;
};

export type InvestmentProperty = {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  category: InvestmentCategory;
  imageSrc: string;
  featured?: boolean;
  price?: string;
  size?: string;
  createdAt: Date;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
};

export type InvestmentGuide = {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
  downloadCount: number;
};

export type DownloadFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  reason: string;
};