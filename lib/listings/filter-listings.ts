// import type { ListingRecord, ListingSearchFilters } from "./types";

// function includesText(value: string | undefined, query: string) {
//   return (value ?? "").toLowerCase().includes(query.toLowerCase());
// }

// export function filterListings(
//   records: ListingRecord[],
//   filters: ListingSearchFilters
// ): ListingRecord[] {
//   return records.filter((record) => {
//     if (filters.kind && filters.kind !== "ANY" && record.kind !== filters.kind) {
//       return false;
//     }

//     if (
//       filters.status &&
//       filters.status !== "ANY" &&
//       record.status !== filters.status
//     ) {
//       return false;
//     }

//     if (
//       filters.marketType &&
//       filters.marketType !== "ANY" &&
//       record.marketType !== filters.marketType
//     ) {
//       return false;
//     }

//     if (
//       filters.rentType &&
//       filters.rentType !== "ANY" &&
//       record.rentType !== filters.rentType
//     ) {
//       return false;
//     }

//     if (filters.locationText?.trim()) {
//       const q = filters.locationText.trim();
//       const matchesLocation =
//         includesText(record.location.country, q) ||
//         includesText(record.location.city, q) ||
//         includesText(record.location.province, q) ||
//         includesText(record.location.district, q) ||
//         includesText(record.location.sector, q) ||
//         includesText(record.location.cell, q) ||
//         includesText(record.location.village, q) ||
//         includesText(record.location.addressLine1, q) ||
//         includesText(record.location.addressLine2, q);

//       if (!matchesLocation) return false;
//     }

//     if (
//       typeof filters.minBeds === "number" &&
//       (record.house?.bedrooms ?? 0) < filters.minBeds
//     ) {
//       return false;
//     }

//     if (
//       typeof filters.minBaths === "number" &&
//       (record.house?.bathrooms ?? 0) < filters.minBaths
//     ) {
//       return false;
//     }

//     const amount = record.price?.amount ?? 0;

//     if (typeof filters.minPrice === "number" && amount < filters.minPrice) {
//       return false;
//     }

//     if (typeof filters.maxPrice === "number" && amount > filters.maxPrice) {
//       return false;
//     }

//     return true;
//   });
// }

import prisma from "@/lib/prisma";
import {
  mapPropertyToPublicListingRecord,
  mapPublicListingRecordToCard,
} from "./mappers";

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
  });

  const records = properties.map(mapPropertyToPublicListingRecord);
  const cards = records.map(mapPublicListingRecordToCard);

  const featuredCards = cards.slice(0, 6);

  return {
    records,
    cards,
    featuredCards,
  };
}

export async function getPublicPropertyBySlug(slug: string) {
  const property = await prisma.property.findFirst({
    where: {
      slug,
      status: "ACTIVE",
      visibility: "PUBLIC",
      isPubliclyVisible: true,
    },
    include: {
      location: true,
      media: true,
      house: true,
      plot: true,
    },
  });

  if (!property) return null;

  return mapPropertyToPublicListingRecord(property);
}