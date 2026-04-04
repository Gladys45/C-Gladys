// import type { PropertyFormValues } from "@/types/property-form";

import { PropertyFormValues } from "../validators/property-form";

// export function slugifyPropertyTitle(value: string): string {
//   return value
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// export function formatFileSize(bytes: number): string {
//   if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

//   const units = ["B", "KB", "MB", "GB", "TB"];
//   let size = bytes;
//   let unitIndex = 0;

//   while (size >= 1024 && unitIndex < units.length - 1) {
//     size /= 1024;
//     unitIndex += 1;
//   }

//   const decimals = size >= 10 || unitIndex === 0 ? 0 : 1;
//   return `${size.toFixed(decimals)} ${units[unitIndex]}`;
// }

// export function buildPropertyPayload(params: {
//   values: PropertyFormValues;
//   slug: string;
//   galleryMedia: Array<{
//     url: string;
//     fileName: string;
//     mimeType: string;
//     fileSizeBytes: number;
//     alt?: string | null;
//     isCover: boolean;
//     sortOrder: number;
//   }>;
//   videoMedia: Array<{
//     url: string;
//     fileName: string;
//     mimeType: string;
//     fileSizeBytes: number;
//     title?: string | null;
//     durationSec?: number | null;
//     sortOrder: number;
//   }>;
// }) {
//   const { values, slug, galleryMedia, videoMedia } = params;

//   return {
//     slug,
//     title: values.title.trim(),
//     kind: values.kind,
//     purpose: values.purpose,
//     marketType:
//       values.purpose === "SELL" || values.purpose === "BUY"
//         ? values.marketType || null
//         : null,
//     rentType:
//       values.purpose === "RENT" || values.purpose === "LETTINGS"
//         ? values.rentType || null
//         : null,
//     priceAmount: values.priceAmount ? Number(values.priceAmount) : null,
//     priceCurrency: values.priceCurrency,
//     pricePeriod:
//       values.purpose === "RENT" || values.purpose === "LETTINGS"
//         ? values.pricePeriod || null
//         : null,
//     priceLabel: null,
//     priceOnApplication: values.priceOnApplication,
//     description: values.description.trim() || null,
//     highlights: values.highlights,

//     location: {
//       country: values.country.trim(),
//       city: values.city.trim() || null,
//       province: values.province.trim() || null,
//       district: values.district.trim() || null,
//       sector: values.sector.trim() || null,
//       cell: values.cell.trim() || null,
//       village: values.village.trim() || null,
//       lat: values.lat ? Number(values.lat) : null,
//       lng: values.lng ? Number(values.lng) : null,
//     },

//     media: [
//       ...galleryMedia.map((item) => ({
//         mediaKind: "IMAGE" as const,
//         sourceType: "FILE" as const,
//         url: item.url,
//         alt: item.alt ?? null,
//         title: null,
//         sortOrder: item.sortOrder,
//         isCover: item.isCover,
//         fileName: item.fileName,
//         mimeType: item.mimeType,
//         fileSizeBytes: item.fileSizeBytes,
//         thumbnailUrl: null,
//         durationSec: null,
//       })),
//       ...videoMedia.map((item) => ({
//         mediaKind: "VIDEO" as const,
//         sourceType: "FILE" as const,
//         url: item.url,
//         alt: null,
//         title: item.title ?? null,
//         sortOrder: item.sortOrder,
//         isCover: false,
//         fileName: item.fileName,
//         mimeType: item.mimeType,
//         fileSizeBytes: item.fileSizeBytes,
//         thumbnailUrl: null,
//         durationSec: item.durationSec ?? null,
//       })),
//     ],

//     house:
//       values.kind === "HOUSE"
//         ? {
//             bedrooms: values.bedrooms ? Number(values.bedrooms) : null,
//             bathrooms: values.bathrooms ? Number(values.bathrooms) : null,
//             sizeSqm: values.sizeSqm ? Number(values.sizeSqm) : null,
//             furnished: values.furnished || null,
//             amenities: values.amenities,
//           }
//         : null,

//     plot:
//       values.kind === "LAND"
//         ? {
//             plotSizeSqm: Number(values.plotSizeSqm),
//             zoning: values.zoning.trim() || null,
//             titleType: values.titleType || null,
//             titleStatus: values.titleStatus || null,
//             accessRoad: values.accessRoad || null,
//             water: values.water,
//             electricity: values.electricity,
//             internetFiber: values.internetFiber,
//             sewage: values.sewage,
//             surveyAvailable: values.surveyAvailable,
//             boundariesMarked: values.boundariesMarked,
//             restrictions: values.restrictions,
//           }
//         : null,
//   };
// }

// import type { PropertyFormValues } from "@/lib/validation/property-form";

// export function slugifyPropertyTitle(value: string): string {
//   return value
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }


export function slugifyPropertyTitle(value?: string | null): string {
  const safeValue = typeof value === "string" ? value : "";

  return safeValue
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  const decimals = size >= 10 || unitIndex === 0 ? 0 : 1;
  return `${size.toFixed(decimals)} ${units[unitIndex]}`;
}

export function buildPropertyPayload(params: {
  values: PropertyFormValues;
  slug: string;
  galleryMedia: Array<{
    url: string;
    fileName: string;
    mimeType: string;
    fileSizeBytes: number;
    alt?: string | null;
    isCover: boolean;
    sortOrder: number;
  }>;
  videoMedia: Array<{
    url: string;
    fileName: string;
    mimeType: string;
    fileSizeBytes: number;
    title?: string | null;
    durationSec?: number | null;
    sortOrder: number;
  }>;
}) {
  const { values, slug, galleryMedia, videoMedia } = params;

  return {
    slug,
    title: values.title.trim(),
    kind: values.kind,
    purpose: values.purpose,
    marketType:
      values.purpose === "SELL" || values.purpose === "BUY"
        ? values.marketType || null
        : null,
    rentType:
      values.purpose === "RENT" || values.purpose === "LETTINGS"
        ? values.rentType || null
        : null,
    priceAmount: values.priceAmount ? Number(values.priceAmount) : null,
    priceCurrency: values.priceCurrency,
    pricePeriod:
      values.purpose === "RENT" || values.purpose === "LETTINGS"
        ? values.pricePeriod || null
        : null,
    priceLabel: null,
    priceOnApplication: values.priceOnApplication,
    description: values.description.trim() || null,
    highlights: values.highlights,

    location: {
      country: values.country.trim(),
      city: values.city.trim() || null,
      province: values.province.trim() || null,
      district: values.district.trim() || null,
      sector: values.sector.trim() || null,
      cell: values.cell.trim() || null,
      village: values.village.trim() || null,
      lat: values.lat ? Number(values.lat) : null,
      lng: values.lng ? Number(values.lng) : null,
    },

    media: [
      ...galleryMedia.map((item) => ({
        mediaKind: "IMAGE" as const,
        sourceType: "FILE" as const,
        url: item.url,
        alt: item.alt ?? null,
        title: null,
        sortOrder: item.sortOrder,
        isCover: item.isCover,
        fileName: item.fileName,
        mimeType: item.mimeType,
        fileSizeBytes: item.fileSizeBytes,
        thumbnailUrl: null,
        durationSec: null,
      })),
      ...videoMedia.map((item) => ({
        mediaKind: "VIDEO" as const,
        sourceType: "FILE" as const,
        url: item.url,
        alt: null,
        title: item.title ?? null,
        sortOrder: item.sortOrder,
        isCover: false,
        fileName: item.fileName,
        mimeType: item.mimeType,
        fileSizeBytes: item.fileSizeBytes,
        thumbnailUrl: null,
        durationSec: item.durationSec ?? null,
      })),
    ],

    house:
      values.kind === "HOUSE"
        ? {
            bedrooms: values.bedrooms ? Number(values.bedrooms) : null,
            bathrooms: values.bathrooms ? Number(values.bathrooms) : null,
            sizeSqm: values.sizeSqm ? Number(values.sizeSqm) : null,
            furnished: values.furnished || null,
            amenities: values.amenities,
          }
        : null,

    plot:
      values.kind === "LAND"
        ? {
            plotSizeSqm: Number(values.plotSizeSqm),
            zoning: values.zoning.trim() || null,
            titleType: values.titleType || null,
            titleStatus: values.titleStatus || null,
            accessRoad: values.accessRoad || null,
            water: values.water,
            electricity: values.electricity,
            internetFiber: values.internetFiber,
            sewage: values.sewage,
            surveyAvailable: values.surveyAvailable,
            boundariesMarked: values.boundariesMarked,
            restrictions: values.restrictions,
          }
        : null,
  };
}