

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

type Filters = {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
};

type Params = {
  page?: number;
  limit?: number;
  filters?: Filters;
};

export async function filterListings({
  page = 1,
  limit = 12,
  filters,
}: Params) {
  const skip = (page - 1) * limit;

  // ✅ Build WHERE safely (no Prisma import needed)
  const where: any = {
    status: "ACTIVE",
    visibility: "PUBLIC",
    isSearchable: true,
    isPubliclyVisible: true,
    publishedAt: { not: null },
  };

  // ✅ Apply filters only if provided
  if (filters?.minPrice !== undefined) {
    where.price = { ...(where.price || {}), gte: filters.minPrice };
  }

  if (filters?.maxPrice !== undefined) {
    where.price = { ...(where.price || {}), lte: filters.maxPrice };
  }

  if (filters?.location) {
    // ⚠️ DO NOT assume "name" field blindly
    // Adjust this field based on your actual schema
    where.location = {
      // example: change "name" if needed
      name: {
        contains: filters.location,
        mode: "insensitive",
      },
    };
  }

  const [properties, totalCount] = await Promise.all([
    prisma.property.findMany({
      where,
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
      skip,
      take: limit,
    }),

    prisma.property.count({ where }),
  ]);

  const records = properties.map(mapPropertyToPublicListingRecord);
  const cards = records.map(mapPublicListingRecordToCard);

  return {
    cards,
    totalCount,
    page,
    limit,
  };
}