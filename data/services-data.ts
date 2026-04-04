import type { ReactNode } from "react";

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  coverImage: string;
  intro?: string;
  sections: {
    title?: string;
    text?: string[];
    bullets?: string[];
    image?: string;
    video?: string;
    ctaText?: string;
    ctaHref?: string;
  }[];
};

export const servicesData: ServiceItem[] = [
  {
    id: "marketing",
    slug: "marketing",
    title: "Marketing",
    shortDescription:
      "Innovative campaigns, strategic exposure, and global reach designed to position every property at the highest level.",
    heroTitle: "Marketing",
    heroSubtitle: "Luxury campaigns with global reach",
    heroImage: "/assets/images/img11.jpeg",
    coverImage: "/assets/images/img11.jpeg",
    intro:
      "We are committed to elevating the standards of luxury real estate marketing, delivering innovative solutions that go beyond traditional methods.",
    sections: [
      {
        text: [
          "We are committed to elevating the standards of luxury real estate marketing, delivering innovative solutions that go beyond traditional methods by leveraging social media and the extensive network of our Advisors to maximise reach and exposure.",
          "We meticulously develop and execute bespoke media campaigns to ensure sustained engagement and interest. Our omni-channel approach guarantees global exposure, strategically targeting key moments to capitalise on market fluctuations and maximise impact.",
        ],
        image: "/assets/images/img11.jpeg",
      },
    ],
  },
  {
    id: "graphic-design",
    slug: "graphic-design",
    title: "Graphic Design",
    shortDescription:
      "Luxury visual storytelling through brochures, renderings, social assets, and branded presentation materials.",
    heroTitle: "Graphic Design",
    heroSubtitle: "Visual storytelling that sells property",
    heroImage: "/assets/images/img10.jpeg",
    coverImage: "/assets/images/img10.jpeg",
    intro:
      "Graphic design in real estate marketing is the strategic creation and application of visual elements to effectively promote properties, developers, or agencies.",
    sections: [
      {
        text: [
          "In real estate marketing, graphic design is the strategic creation and application of visual elements such as images, renderings, layouts, typography, color schemes, icons, brochures, social media posts, flyers, digital ads, floor plans, and branding assets to effectively promote properties, developers, or agencies.",
          "Its core purpose is to capture attention in a highly competitive market, build trust and emotional connections, communicate property value clearly, and drive buyer or investor interest and conversions.",
          "It goes beyond aesthetics: it is about strategic storytelling through visuals that highlight key features, evoke lifestyle aspirations, ensure brand consistency, and create strong first impressions.",
        ],
        image: "/assets/images/img10.jpeg",
      },
      {
        title: "Off-Plan (Pre-Construction or Under-Development) Properties",
        text: [
          "Here, graphic design focuses heavily on visualization and imagination because nothing physical exists yet or it is incomplete. The goal is to bridge the gap between blueprints and concepts and the buyer's vision of the finished product.",
        ],
        bullets: [
          "Photorealistic 3D renderings (exteriors, interiors, landscapes)",
          "CGI (Computer-Generated Imagery) and virtual tours/fly-throughs",
          "Stylized 3D floor plans with lifestyle annotations",
          "Aspirational mood boards, lifestyle collages, and progress timelines",
          "High-end brochures and digital assets emphasizing future benefits, investment potential, and exclusivity",
        ],
      },
      {
        title: "Ready-Built (Completed/Existing) Properties",
        text: [
          "With the actual property available, graphic design shifts toward showcasing reality and highlighting proven appeal. It leverages tangible assets to create urgency and emotional pull.",
        ],
        bullets: [
          "Professional photography (high-resolution interiors/exteriors, drone shots)",
          "Clean, accurate floor plans and infographics",
          '“Just Listed” / “Just Sold” social graphics',
          "Property feature callouts, virtual staging (if needed), and comparison visuals",
          "Marketing collateral emphasizing move-in readiness, current lifestyle, and immediate benefits",
        ],
      },
      {
        text: [
          "The focus is on authenticity, detail, and quick decision-making, making the property look irresistible and superior to alternatives.",
          "In both cases, effective graphic design aligns with the target audience, maintains consistent branding, uses strong visual hierarchy, and optimizes for digital platforms such as social media. When done right, it significantly boosts engagement and increases perceived value.",
        ],
      },
    ],
  },
  {
    id: "digital-content",
    slug: "digital-content",
    title: "Digital Content",
    shortDescription:
      "High-impact digital content crafted for modern platforms to engage audiences and elevate property visibility.",
    heroTitle: "Digital Content",
    heroSubtitle: "Content designed to cut through the noise",
    heroImage: "/assets/images/img10.png",
    coverImage: "/assets/images/img10.png",
    intro:
      "We understand the ins-and-outs of today’s digital platforms and create memorable content intentionally designed to resonate with the largest real estate audience in the world.",
    sections: [
      {
        text: [
          "We understand the ins-and-outs of today’s digital platforms and create memorable content that is intentionally designed to resonate with the largest real estate audience in the world.",
          "Our digital content is high impact and cuts through the online noise.",
        ],
        image: "/assets/images/img10.png",
      },
    ],
  },
  {
    id: "digital-pioneers",
    slug: "digital-pioneers",
    title: "Digital Pioneers",
    shortDescription:
      "Technology-powered services built on relationships, discretion, accountability, and full-market access.",
    heroTitle: "Digital Pioneers",
    heroSubtitle: "Technology powered relationships",
    heroImage: "/assets/images/img11.png",
    coverImage: "/assets/images/img11.png",
    intro:
      "Our proprietary technology powers the services we offer and supports how we create trusted long-term relationships.",
    sections: [
      {
        text: [
          "Our proprietary technology powers the services we offer. We do not rely on placing properties in marketplaces, getting lucky, nor you to drive your purchases, sale, or letting.",
          "We create relationships that will last a lifetime, and that has earned us the trust of everyone, leaders in business globally.",
        ],
        bullets: [
          "Open-communication, discretion, and accountability",
          "True, full-market access",
        ],
        image: "/assets/images/img11.png",
      },
    ],
  },
  {
    id: "media",
    slug: "media",
    title: "Media",
    shortDescription:
      "Partnerships with publishers, influencers, and third parties to maximise worldwide listing exposure.",
    heroTitle: "Media",
    heroSubtitle: "Strategic exposure through influence",
    heroImage: "/assets/images/rwanda_1.png",
    coverImage: "/assets/images/rwanda_1.png",
    intro:
      "We collaborate with prominent publishers and influential figures to ensure your listing reaches and engages the most discerning real estate audiences worldwide.",
    sections: [
      {
        text: [
          "We collaborate with prominent publishers and influential figures, to ensure your listing reaches and engages the most discerning real estate audiences worldwide bolstered by strategic partnerships with influencers and third parties to maximise exposure.",
        ],
        image: "/assets/images/rwanda_1.png",
      },
    ],
  },
  {
    id: "technology-data",
    slug: "technology-data",
    title: "Technology & Data",
    shortDescription:
      "Real-time dashboard insights showing interest, engagement, ambassador performance, and viewing feedback.",
    heroTitle: "Technology & Data",
    heroSubtitle: "Real-time intelligence at your fingertips",
    heroImage: "/assets/images/skill.jpg",
    coverImage: "/assets/images/skill.jpg",
    intro:
      "Unlock the power of data with our proprietary dashboard technology providing real-time data.",
    sections: [
      {
        text: [
          "Unlock the power of data with our proprietary dashboard technology providing real-time data. Your access includes:",
        ],
        bullets: [
          "How many people are looking at your property.",
          "Which of our hand selected ambassadors are generating the most interest.",
          "Where globally your property is being viewed from.",
          "And, viewing feedback.",
        ],
        image: "/assets/images/skill.jpg",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return servicesData.find((service) => service.slug === slug);
}