// services/investRwandaData.ts

import { InvestmentProperty, Testimonial, InvestmentGuide } from "@/types/invest-rwanda";

// Mock data - you can replace with your actual images
export const investmentProperties: InvestmentProperty[] = [
  {
    id: "1",
    title: "Luxury Apartments in Kigali Heights",
    slug: "luxury-apartments-kigali-heights",
    description: "Premium residential apartments with stunning city views",
    location: "Kigali Heights, Kigali",
    category: "residential",
    imageSrc: "/assets/images/evergren2.jpeg",
    featured: true,
    price: "$250,000 - $500,000",
    size: "120-250 sqm",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Commercial Complex Downtown",
    slug: "commercial-complex-downtown",
    description: "Prime commercial space for retail and offices",
    location: "CBD, Kigali",
    category: "commercial",
    imageSrc: "/assets/images/evergren1.jpeg",
    featured: true,
    price: "$1.5M - $3M",
    size: "500-2000 sqm",
    createdAt: new Date("2024-02-01"),
  },
  // Add more properties matching your IMAGESRCS array
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    role: "CEO",
    company: "International Investments Ltd",
    content: "Rwanda's real estate market offers incredible opportunities. The growth potential is unmatched.",
    rating: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Investor",
    company: "Global Property Group",
    content: "The transparency and ease of doing business here made our investment journey smooth.",
    rating: 5,
  },
];

export const investmentGuides: InvestmentGuide[] = [
  {
    id: "1",
    title: "Real Estate Investment Guide 2024",
    description: "Complete guide to investing in Rwanda's real estate market",
    pdfUrl: "/guides/real-estate-guide-2024.pdf",
    thumbnail: "/assets/images/guides/guide1.jpg",
    downloadCount: 1250,
  },
];

// Query functions
export const getFeaturedProperties = () => {
  return investmentProperties.filter(prop => prop.featured);
};

export const getPropertiesByCategory = (category: string) => {
  return investmentProperties.filter(prop => prop.category === category);
};

export const getPropertyById = (id: string) => {
  return investmentProperties.find(prop => prop.id === id);
};

export const getAllProperties = () => {
  return investmentProperties;
};

export const getRecentProperties = (limit: number = 6) => {
  return [...investmentProperties]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};