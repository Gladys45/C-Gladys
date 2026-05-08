import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
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
  // Return empty data if database is not configured
  if (!isDatabaseConfigured) {
    console.warn("Database not configured. Returning empty listings.");
    return {
      cards: [],
      totalCount: 0,
      page,
      limit,
    };
  }

  const prisma = await getPrisma();
  if (!prisma) {
    console.warn("Failed to initialize Prisma. Returning empty listings.");
    return {
      cards: [],
      totalCount: 0,
      page,
      limit,
    };
  }

  const skip = (page - 1) * limit;

  // Build WHERE safely (no Prisma import needed)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    status: "ACTIVE",
    visibility: "PUBLIC",
    isSearchable: true,
    isPubliclyVisible: true,
    publishedAt: { not: null },
  };

  // Apply filters only if provided
  if (filters?.minPrice !== undefined) {
    where.priceAmount = { ...(where.priceAmount || {}), gte: filters.minPrice };
  }

  if (filters?.maxPrice !== undefined) {
    where.priceAmount = { ...(where.priceAmount || {}), lte: filters.maxPrice };
  }

  if (filters?.location) {
    where.location = {
      OR: [
        { city: { contains: filters.location, mode: "insensitive" } },
        { district: { contains: filters.location, mode: "insensitive" } },
        { province: { contains: filters.location, mode: "insensitive" } },
        { country: { contains: filters.location, mode: "insensitive" } },
      ],
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
