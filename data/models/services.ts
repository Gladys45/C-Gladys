export type ServiceCategory = "PROPERTY" | "CONSULTING" | "OTHER";

export type ServiceRecord = {
  id: string;
  slug: string;

  name: string;
  description: string;

  image: string;
  category: ServiceCategory;

  ctaLabel?: string;
  href?: string;

  featured?: boolean;

  // full details page data
  intro?: string;
  highlights?: string[];
  createdAtISO?: string;
};

export type ServiceCard = {
  id: string;
  name: string;
  image: string;
  href: string;

  category: ServiceCategory;
  ctaLabel?: string;
  featured?: boolean;

  serviceId: string; // link card -> record
};