// utils/seedInvestData.ts

import { investmentProperties } from "@/services/investRwandaData";

// Utility to check if data exists
export const initializeInvestData = () => {
  if (investmentProperties.length === 0) {
    console.log("No investment data found. Please add properties to the array.");
    return false;
  }
  
  console.log(`Loaded ${investmentProperties.length} investment properties`);
  return true;
};

// Utility to generate slugs
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Utility to filter properties
export const filterProperties = (
  properties: typeof investmentProperties,
  filters: { category?: string; minPrice?: number; maxPrice?: number }
) => {
  return properties.filter(prop => {
    if (filters.category && prop.category !== filters.category) return false;
    // Add more filter logic as needed
    return true;
  });
};