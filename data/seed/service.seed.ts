import type { ServiceCard, ServiceRecord } from "../models/services";

export const SERVICE_RECORDS_SEED: ServiceRecord[] = [
  {
    id: "srv-selling",
    slug: "selling",
    name: "Selling",
    description:
      "No one does it the way we do and our results speak for themselves. Our expert team ensures your property is marketed to the right buyers and sold for the best possible value.",
    image: "/assets/services/selling.jpg",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    href: "/services/selling",
    featured: true,
    intro:
      "Our selling service is designed to position your property correctly in the market, attract qualified buyers, and secure the strongest possible outcome.",
    highlights: [
      "Professional marketing strategy",
      "Qualified buyer targeting",
      "Expert negotiation support",
    ],
    createdAtISO: "2026-03-01",
  },

  {
    id: "srv-buying",
    slug: "buying",
    name: "Buying",
    description:
      "Buying or investing in a residential home is one of the most important decisions you'll ever make. Property is personal and we are here to support you through the whole journey.",
    image: "/assets/services/buying.jpg",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    href: "/services/buying",
    intro:
      "We guide buyers and investors through every stage of the process, from identifying opportunities to closing with confidence.",
    highlights: [
      "Personalized buyer guidance",
      "Investment support",
      "End-to-end purchase assistance",
    ],
    createdAtISO: "2026-03-01",
  },

  {
    id: "srv-letting",
    slug: "letting",
    name: "Letting",
    description:
      "Whether you have a single property or a large portfolio, we guide landlords through the letting process and help match the right tenants with the right properties.",
    image: "/assets/services/letting.jpg",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    href: "/services/letting",
    intro:
      "Our letting service helps landlords manage compliance, attract suitable tenants, and maintain smooth rental operations.",
    highlights: [
      "Landlord support",
      "Tenant matching",
      "Portfolio guidance",
    ],
    createdAtISO: "2026-03-01",
  },

  {
    id: "srv-renting",
    slug: "renting",
    name: "Renting",
    description:
      "Whether relocating internationally or locally, searching for a temporary stay or a long-term home, we help tenants find the ideal rental property.",
    image: "/assets/services/renting.jpg",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    href: "/services/renting",
    intro:
      "We help renters find homes that match their needs, timeline, and lifestyle with a straightforward and efficient process.",
    highlights: [
      "Relocation support",
      "Short and long-term options",
      "Tenant-focused guidance",
    ],
    createdAtISO: "2026-03-01",
  },

  {
    id: "srv-international",
    slug: "international",
    name: "International",
    description:
      "We provide access to exclusive property opportunities across global markets and support our clients in expanding their property portfolios worldwide.",
    image: "/assets/services/international.jpg",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    href: "/services/international",
    intro:
      "Our international service gives clients trusted access to property opportunities beyond local borders with informed market support.",
    highlights: [
      "Global market opportunities",
      "Cross-border support",
      "Portfolio expansion guidance",
    ],
    createdAtISO: "2026-03-01",
  },

  {
    id: "srv-negotiation",
    slug: "negotiation",
    name: "Negotiation",
    description:
      "If you've found the perfect property, our team will manage negotiations and secure the best possible terms using market expertise and advanced data insights.",
    image: "/assets/services/negotiation.jpg",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    href: "/services/negotiation",
    intro:
      "We represent your interests in negotiation to help secure the strongest terms with clarity, confidence, and strategic support.",
    highlights: [
      "Expert deal structuring",
      "Market-backed advice",
      "Client-first representation",
    ],
    createdAtISO: "2026-03-01",
  },
];

export const SERVICE_CARDS_SEED: ServiceCard[] = [
  {
    id: "sc-selling",
    name: "Selling",
    image: "/assets/services/selling.jpg",
    href: "/services/selling",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    featured: true,
    serviceId: "srv-selling",
  },
  {
    id: "sc-buying",
    name: "Buying",
    image: "/assets/services/buying.jpg",
    href: "/services/buying",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    featured: false,
    serviceId: "srv-buying",
  },
  {
    id: "sc-letting",
    name: "Letting",
    image: "/assets/services/letting.jpg",
    href: "/services/letting",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    featured: false,
    serviceId: "srv-letting",
  },
  {
    id: "sc-renting",
    name: "Renting",
    image: "/assets/services/renting.jpg",
    href: "/services/renting",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    featured: false,
    serviceId: "srv-renting",
  },
  {
    id: "sc-international",
    name: "International",
    image: "/assets/services/international.jpg",
    href: "/services/international",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    featured: false,
    serviceId: "srv-international",
  },
  {
    id: "sc-negotiation",
    name: "Negotiation",
    image: "/assets/services/negotiation.jpg",
    href: "/services/negotiation",
    category: "PROPERTY",
    ctaLabel: "Find out more",
    featured: false,
    serviceId: "srv-negotiation",
  },
];