import { CompanyInfo, CookieData } from '@/types/legal.types';

export const COMPANY_INFO: CompanyInfo = {
  name: 'CUPITAL GROUP Ltd',
  email: 'cupitalgroup@gmail.com',
  address: 'KG 554 Street Kigali Rwanda, Gasabo, Nyarutarama',
  phone: '+250 784 578 531',
  registration: 'CUPITAL GROUP Ltd',
};

export const COOKIE_DATA: CookieData[] = [
  { name: 'Google Analytics', purpose: 'Website analytics and usage tracking', duration: '2 years', type: 'Analytics' },
  { name: 'Facebook Pixel', purpose: 'Advertising and remarketing', duration: '180 days', type: 'Marketing' },
  { name: 'YouTube Cookies', purpose: 'Video playback analytics', duration: 'Session', type: 'Functional' },
];

export const DATA_CATEGORIES = [
  { category: 'Identity Data', examples: 'Name, title, date of birth, gender', legalBasis: 'Contract / Legitimate Interest' },
  { category: 'Contact Data', examples: 'Email, phone, address', legalBasis: 'Contract / Legal Obligation' },
  { category: 'Financial Data', examples: 'Bank account, payment card', legalBasis: 'Contract / Legal Obligation' },
  { category: 'Technical Data', examples: 'IP address, browser, device', legalBasis: 'Legitimate Interest' },
];