export interface LegalSectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'warning' | 'info';
}

export interface LegalTableProps {
  columns: string[];
  data: Record<string, any>[];
  variant?: 'striped' | 'bordered' | 'minimal';
}

export interface CookieData {
  name: string;
  purpose: string;
  duration: string;
  type: 'Analytics' | 'Marketing' | 'Functional' | 'Strictly Necessary';
}

export interface FeeData {
  service: string;
  amountRWF: string;
  amountUSD: string;
  timing: string;
  vat?: boolean;
}

export interface CompanyInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
  registration?: string;
}