

// import prisma from "@/lib/prisma";
// import {
//   mapPropertyToPublicListingRecord,
//   mapPublicListingRecordToCard,
// } from "./mappers";

// export async function getLandingPageListings() {
//   const properties = await prisma.property.findMany({
//     where: {
//       status: "ACTIVE",
//       visibility: "PUBLIC",
//       isSearchable: true,
//       isPubliclyVisible: true,
//       publishedAt: {
//         not: null,
//       },
//     },
//     include: {
//       location: true,
//       media: true,
//       house: true,
//       plot: true,
//     },
//     orderBy: [
//       { isFeatured: "desc" },
//       { publishedAt: "desc" },
//       { createdAt: "desc" },
//     ],
//   });

//   const records = properties.map(mapPropertyToPublicListingRecord);
//   const cards = records.map(mapPublicListingRecordToCard);
//   const featuredCards = cards.slice(0, 6);

//   return {
//     records,
//     cards,
//     featuredCards,
//   };
// }

// export async function getPublicPropertyBySlug(slug: string) {
//   const property = await prisma.property.findFirst({
//     where: {
//       slug,
//       status: "ACTIVE",
//       visibility: "PUBLIC",
//       isPubliclyVisible: true,
//     },
//     include: {
//       location: true,
//       media: true,
//       house: true,
//       plot: true,
//     },
//   });

//   if (!property) return null;

//   return mapPropertyToPublicListingRecord(property);
// }

import prisma from "@/lib/prisma";
import {
  mapPropertyToPublicListingRecord,
  mapPublicListingRecordToCard,
} from "./mappers";

// ✅ HOMEPAGE (LIMITED BUT SAFE)
export async function getLandingPageListings() {
  const properties = await prisma.property.findMany({
    where: {
      status: "ACTIVE",
      visibility: "PUBLIC",
      isSearchable: true,
      isPubliclyVisible: true,
      publishedAt: {
        not: null,
      },
    },
    include: {
      location: true,
      media: true,
      house: true,
      plot: true,
    },
    orderBy: [
      { isFeatured: "desc" },
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
    take: 10, // ✅ PERFORMANCE FIX (limit results)
  });

  const records = properties.map(mapPropertyToPublicListingRecord);
  const cards = records.map(mapPublicListingRecordToCard);

  // ✅ NO assumption about isFeatured on card
  const featuredCards = cards.slice(0, 6);

  return {
    records, // keep if your UI still uses it
    cards,
    featuredCards,
  };
}