// // import { MediaKind, Prisma } from "@/lib/generated/prisma";
// // import prisma from "@/lib/prisma";

// // function toNumber(value: Prisma.Decimal | null | undefined): number | null {
// //   if (!value) return null;
// //   return Number(value.toString());
// // }

// // function buildSupabaseFileUrl(bucket?: string | null, key?: string | null) {
// //   const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// //   if (!baseUrl || !bucket || !key) return null;

// //   const normalizedBase = baseUrl.replace(/\/$/, "");
// //   const encodedKey = key
// //     .split("/")
// //     .map((part) => encodeURIComponent(part))
// //     .join("/");

// //   return `${normalizedBase}/storage/v1/object/public/${bucket}/${encodedKey}`;
// // }

// // export type PropertyDetailsPageData = {
// //   id: string;
// //   slug: string;
// //   title: string;
// //   description: string | null;
// //   highlights: string[];
// //   kind: "HOUSE" | "LAND";
// //   purpose: "SELL" | "BUY" | "RENT" | "LETTINGS";
// //   marketType: "ON_MARKET" | "OFF_MARKET";
// //   visibility: "PUBLIC" | "PRIVATE" | "HIDDEN";
// //   rentType: "LONG_TERM" | "SHORT_STAY" | null;

// //   priceAmount: number | null;
// //   priceCurrency: string | null;
// //   pricePeriod: string | null;
// //   priceLabel: string | null;
// //   priceOnApplication: boolean;

// //   bedrooms: number | null;
// //   bathrooms: number | null;
// //   parkingSpaces: number | null;
// //   yearBuilt: number | null;

// //   createdAt: string;
// //   publishedAt: string | null;

// //   location: {
// //     country: string;
// //     city: string | null;
// //     province: string | null;
// //     district: string | null;
// //     sector: string | null;
// //     cell: string | null;
// //     village: string | null;
// //     addressLine1: string | null;
// //     addressLine2: string | null;
// //     postalCode: string | null;
// //     lat: number | null;
// //     lng: number | null;
// //   } | null;

// //   house: {
// //     bedrooms: number | null;
// //     bathrooms: number | null;
// //     toilets: number | null;
// //     kitchens: number | null;
// //     lounges: number | null;
// //     diningRooms: number | null;
// //     sizeSqm: number | null;
// //     plotSizeSqm: number | null;
// //     furnished: string | null;
// //     amenities: string[];
// //     hasGarden: boolean | null;
// //     hasBalcony: boolean | null;
// //     hasTerrace: boolean | null;
// //     hasSwimmingPool: boolean | null;
// //     hasInternetFiber: boolean | null;
// //     hasElectricity: boolean | null;
// //     hasWaterTank: boolean | null;
// //     hasSecurity: boolean | null;
// //   } | null;

// //   plot: {
// //     plotSizeSqm: number | null;
// //     zoning: string | null;
// //     titleType: string | null;
// //     titleStatus: string | null;
// //     accessRoad: string | null;
// //     water: boolean | null;
// //     electricity: boolean | null;
// //     internetFiber: boolean | null;
// //     sewage: boolean | null;
// //     surveyAvailable: boolean | null;
// //     boundariesMarked: boolean | null;
// //     restrictions: string[];
// //   } | null;

// //   images: Array<{
// //     id: string;
// //     url: string | null;
// //     altText: string | null;
// //     caption: string | null;
// //     title: string | null;
// //     isCover: boolean;
// //     sortOrder: number;
// //   }>;

// //   videos: Array<{
// //     id: string;
// //     url: string | null;
// //     title: string | null;
// //     caption: string | null;
// //     isPrimaryVideo: boolean;
// //   }>;

// //   documents: Array<{
// //     id: string;
// //     url: string | null;
// //     title: string | null;
// //     caption: string | null;
// //     originalFileName: string;
// //     isDownloadable: boolean;
// //     documentKind: string | null;
// //   }>;
// // };

// // export type SimilarPropertyItem = {
// //   id: string;
// //   slug: string;
// //   title: string;
// //   priceAmount: number | null;
// //   priceCurrency: string | null;
// //   district: string | null;
// //   city: string | null;
// //   bedrooms: number | null;
// //   bathrooms: number | null;
// //   kind: "HOUSE" | "LAND";
// //   sizeSqm: number | null;
// //   plotSizeSqm: number | null;
// //   coverImage: string | null;
// // };

// // export async function getPublicPropertyBySlug(slug: string): Promise<PropertyDetailsPageData | null> {
// //   const property = await prisma.property.findFirst({
// //     where: {
// //       slug,
// //       status: "ACTIVE",
// //       visibility: "PUBLIC",
// //       isPubliclyVisible: true,
// //       isSearchable: true,
// //     },
// //     include: {
// //       location: true,
// //       house: true,
// //       plot: true,
// //       media: {
// //         where: { isPublic: true },
// //         orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
// //       },
// //     },
// //   });

// //   if (!property) return null;

// //   const images = property.media
// //     .filter((item) => item.kind === MediaKind.IMAGE)
// //     .map((item) => ({
// //       id: item.id,
// //       url: buildSupabaseFileUrl(item.storageBucket, item.storageKey) ?? item.storageKey,
// //       altText: item.altText ?? null,
// //       caption: item.caption ?? null,
// //       title: item.title ?? null,
// //       isCover: item.isCover,
// //       sortOrder: item.sortOrder,
// //     }))
// //     .sort((a, b) => {
// //       if (a.isCover && !b.isCover) return -1;
// //       if (!a.isCover && b.isCover) return 1;
// //       return a.sortOrder - b.sortOrder;
// //     });

// //   const videos = property.media
// //     .filter((item) => item.kind === MediaKind.VIDEO)
// //     .map((item) => ({
// //       id: item.id,
// //       url: buildSupabaseFileUrl(item.storageBucket, item.storageKey) ?? item.storageKey,
// //       title: item.title ?? null,
// //       caption: item.caption ?? null,
// //       isPrimaryVideo: item.isPrimaryVideo,
// //     }));

// //   const documents = property.media
// //     .filter((item) => item.kind === MediaKind.DOCUMENT)
// //     .map((item) => ({
// //       id: item.id,
// //       url: buildSupabaseFileUrl(item.storageBucket, item.storageKey) ?? item.storageKey,
// //       title: item.title ?? null,
// //       caption: item.caption ?? null,
// //       originalFileName: item.originalFileName,
// //       isDownloadable: item.isDownloadable,
// //       documentKind: item.documentKind ?? null,
// //     }));

// //   return {
// //     id: property.id,
// //     slug: property.slug,
// //     title: property.title,
// //     description: property.description ?? null,
// //     highlights: property.highlights ?? [],
// //     kind: property.kind,
// //     purpose: property.purpose,
// //     marketType: property.marketType,
// //     visibility: property.visibility,
// //     rentType: property.rentType ?? null,

// //     priceAmount: toNumber(property.priceAmount),
// //     priceCurrency: property.priceCurrency ?? null,
// //     pricePeriod: property.pricePeriod ?? null,
// //     priceLabel: property.priceLabel ?? null,
// //     priceOnApplication: property.priceOnApplication,

// //     bedrooms: property.bedrooms ?? null,
// //     bathrooms: property.bathrooms ?? null,
// //     parkingSpaces: property.parkingSpaces ?? null,
// //     yearBuilt: property.yearBuilt ?? null,

// //     createdAt: property.createdAt.toISOString(),
// //     publishedAt: property.publishedAt ? property.publishedAt.toISOString() : null,

// //     location: property.location
// //       ? {
// //           country: property.location.country,
// //           city: property.location.city ?? null,
// //           province: property.location.province ?? null,
// //           district: property.location.district ?? null,
// //           sector: property.location.sector ?? null,
// //           cell: property.location.cell ?? null,
// //           village: property.location.village ?? null,
// //           addressLine1: property.location.addressLine1 ?? null,
// //           addressLine2: property.location.addressLine2 ?? null,
// //           postalCode: property.location.postalCode ?? null,
// //           lat: toNumber(property.location.lat),
// //           lng: toNumber(property.location.lng),
// //         }
// //       : null,

// //     house: property.house
// //       ? {
// //           bedrooms: property.house.bedrooms ?? null,
// //           bathrooms: property.house.bathrooms ?? null,
// //           toilets: property.house.toilets ?? null,
// //           kitchens: property.house.kitchens ?? null,
// //           lounges: property.house.lounges ?? null,
// //           diningRooms: property.house.diningRooms ?? null,
// //           sizeSqm: toNumber(property.house.sizeSqm),
// //           plotSizeSqm: toNumber(property.house.plotSizeSqm),
// //           furnished: property.house.furnished ?? null,
// //           amenities: property.house.amenities ?? [],
// //           hasGarden: property.house.hasGarden ?? null,
// //           hasBalcony: property.house.hasBalcony ?? null,
// //           hasTerrace: property.house.hasTerrace ?? null,
// //           hasSwimmingPool: property.house.hasSwimmingPool ?? null,
// //           hasInternetFiber: property.house.hasInternetFiber ?? null,
// //           hasElectricity: property.house.hasElectricity ?? null,
// //           hasWaterTank: property.house.hasWaterTank ?? null,
// //           hasSecurity: property.house.hasSecurity ?? null,
// //         }
// //       : null,

// //     plot: property.plot
// //       ? {
// //           plotSizeSqm: toNumber(property.plot.plotSizeSqm),
// //           zoning: property.plot.zoning ?? null,
// //           titleType: property.plot.titleType ?? null,
// //           titleStatus: property.plot.titleStatus ?? null,
// //           accessRoad: property.plot.accessRoad ?? null,
// //           water: property.plot.water ?? null,
// //           electricity: property.plot.electricity ?? null,
// //           internetFiber: property.plot.internetFiber ?? null,
// //           sewage: property.plot.sewage ?? null,
// //           surveyAvailable: property.plot.surveyAvailable ?? null,
// //           boundariesMarked: property.plot.boundariesMarked ?? null,
// //           restrictions: property.plot.restrictions ?? [],
// //         }
// //       : null,

// //     images,
// //     videos,
// //     documents,
// //   };
// // }

// // export async function getSimilarPublicProperties(
// //   propertyId: string,
// //   kind: "HOUSE" | "LAND",
// //   purpose: "SELL" | "BUY" | "RENT" | "LETTINGS"
// // ): Promise<SimilarPropertyItem[]> {
// //   const properties = await prisma.property.findMany({
// //     where: {
// //       id: { not: propertyId },
// //       kind,
// //       purpose,
// //       status: "ACTIVE",
// //       visibility: "PUBLIC",
// //       isPubliclyVisible: true,
// //       isSearchable: true,
// //     },
// //     include: {
// //       location: true,
// //       house: true,
// //       plot: true,
// //       media: {
// //         where: {
// //           kind: MediaKind.IMAGE,
// //           isPublic: true,
// //         },
// //         orderBy: [{ isCover: "desc" }, { sortOrder: "asc" }],
// //       },
// //     },
// //     orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
// //     take: 3,
// //   });

// //   return properties.map((property) => {
// //     const cover = property.media.find((item) => item.isCover) ?? property.media[0] ?? null;

// //     return {
// //       id: property.id,
// //       slug: property.slug,
// //       title: property.title,
// //       priceAmount: toNumber(property.priceAmount),
// //       priceCurrency: property.priceCurrency ?? null,
// //       district: property.location?.district ?? null,
// //       city: property.location?.city ?? null,
// //       bedrooms: property.house?.bedrooms ?? property.bedrooms ?? null,
// //       bathrooms: property.house?.bathrooms ?? property.bathrooms ?? null,
// //       kind: property.kind,
// //       sizeSqm: toNumber(property.house?.sizeSqm),
// //       plotSizeSqm: toNumber(property.plot?.plotSizeSqm) ?? toNumber(property.house?.plotSizeSqm),
// //       coverImage: cover
// //         ? buildSupabaseFileUrl(cover.storageBucket, cover.storageKey) ?? cover.storageKey
// //         : null,
// //     };
// //   });
// // }

// import {
//   Currency,
//   FurnishedType,
//   MediaKind,
//   Prisma,
//   PropertyKind,
//   PropertyPurpose,
//   RentType,
// } from "@/lib/generated/prisma";
// import prisma from "@/lib/prisma";

// export type PropertyImageItem = {
//   id: string;
//   url: string;
//   alt: string;
//   isCover: boolean;
// };

// export type PropertyVideoItem = {
//   id: string;
//   url: string | null;
//   title: string | null;
//   caption: string | null;
// };

// export type PropertyDocumentItem = {
//   id: string;
//   url: string | null;
//   title: string | null;
//   originalFileName: string;
//   documentKind: string | null;
// };

// export type PropertyDetailsLocation = {
//   addressLine1: string | null;
//   district: string | null;
//   city: string | null;
//   province: string | null;
//   country: string;
//   sector: string | null;
//   cell: string | null;
//   village: string | null;
//   lat: number | null;
//   lng: number | null;
// };

// export type PropertyDetailsHouse = {
//   bedrooms: number | null;
//   bathrooms: number | null;
//   sizeSqm: number | null;
//   plotSizeSqm: number | null;
//   toilets: number | null;
//   kitchens: number | null;
//   lounges: number | null;
//   diningRooms: number | null;
//   furnished: FurnishedType | null;
//   hasGarden: boolean | null;
//   hasBalcony: boolean | null;
//   hasTerrace: boolean | null;
//   hasSwimmingPool: boolean | null;
//   hasInternetFiber: boolean | null;
//   hasSecurity: boolean | null;
//   hasWaterTank: boolean | null;
//   hasElectricity: boolean | null;
//   amenities: string[];
// };

// export type PropertyDetailsPlot = {
//   plotSizeSqm: number | null;
//   zoning: string | null;
//   titleType: string | null;
//   titleStatus: string | null;
//   accessRoad: string | null;
//   internetFiber: boolean | null;
//   electricity: boolean | null;
//   water: boolean | null;
//   sewage: boolean | null;
//   surveyAvailable: boolean | null;
//   boundariesMarked: boolean | null;
//   restrictions: string[];
// };

// export type PropertyDetailsPageData = {
//   id: string;
//   slug: string;
//   title: string;
//   description: string | null;
//   kind: PropertyKind;
//   purpose: PropertyPurpose;
//   marketType: string;
//   rentType: RentType | null;
//   priceAmount: number | null;
//   priceCurrency: Currency | null;
//   pricePeriod: string | null;
//   priceOnApplication: boolean;
//   bedrooms: number | null;
//   bathrooms: number | null;
//   parkingSpaces: number | null;
//   yearBuilt: number | null;
//   createdAt: string;
//   location: PropertyDetailsLocation | null;
//   house: PropertyDetailsHouse | null;
//   plot: PropertyDetailsPlot | null;
//   images: PropertyImageItem[];
//   videos: PropertyVideoItem[];
//   documents: PropertyDocumentItem[];
//   highlights: string[];
// };

// function toNumber(value: Prisma.Decimal | null | undefined): number | null {
//   if (!value) return null;
//   return Number(value.toString());
// }

// function buildSupabaseFileUrl(bucket?: string | null, key?: string | null) {
//   const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

//   if (!baseUrl || !bucket || !key) {
//     return null;
//   }

//   const normalizedBase = baseUrl.replace(/\/$/, "");
//   const encodedKey = key
//     .split("/")
//     .map((part) => encodeURIComponent(part))
//     .join("/");

//   return `${normalizedBase}/storage/v1/object/public/${bucket}/${encodedKey}`;
// }

// function resolveMediaUrl(media: {
//   url?: string | null;
//   storageBucket?: string | null;
//   storageKey?: string | null;
// }) {
//   if (media.url && media.url.trim().length > 0) {
//     return media.url;
//   }

//   return (
//     buildSupabaseFileUrl(media.storageBucket, media.storageKey) ??
//     media.storageKey ??
//     null
//   );
// }

// export async function getPublicPropertyBySlug(
//   slug: string
// ): Promise<PropertyDetailsPageData | null> {
//   const property = await prisma.property.findFirst({
//     where: {
//       slug,
//       status: "ACTIVE",
//       visibility: "PUBLIC",
//       isPubliclyVisible: true,
//       isSearchable: true,
//     },
//     include: {
//       location: true,
//       house: true,
//       plot: true,
//       media: {
//         where: {
//           isPublic: true,
//         },
//         orderBy: [
//           { isCover: "desc" },
//           { sortOrder: "asc" },
//           { createdAt: "asc" },
//         ],
//       },
//     },
//   });

//   if (!property) {
//     return null;
//   }

//   const imageMedia = property.media.filter((item) => item.kind === MediaKind.IMAGE);
//   const videoMedia = property.media.filter((item) => item.kind === MediaKind.VIDEO);
//   const documentMedia = property.media.filter((item) => item.kind === MediaKind.DOCUMENT);

//   const images: PropertyImageItem[] = imageMedia
//     .map((item) => {
//       const url = resolveMediaUrl(item);

//       if (!url) {
//         return null;
//       }

//       return {
//         id: item.id,
//         url,
//         alt: item.altText || property.title,
//         isCover: item.isCover ?? false,
//       };
//     })
//     .filter((item): item is PropertyImageItem => item !== null);

//   const videos: PropertyVideoItem[] = videoMedia.map((item) => ({
//     id: item.id,
//     url: resolveMediaUrl(item),
//     title: item.title || null,
//     caption: item.caption || null,
//   }));

//   const documents: PropertyDocumentItem[] = documentMedia.map((item) => ({
//     id: item.id,
//     url: resolveMediaUrl(item),
//     title: item.title || null,
//     originalFileName: item.originalFileName || "Document",
//     documentKind: item.documentKind || null,
//   }));

//   return {
//     id: property.id,
//     slug: property.slug,
//     title: property.title,
//     description: property.description ?? null,
//     kind: property.kind,
//     purpose: property.purpose,
//     marketType: property.marketType,
//     rentType: property.rentType ?? null,
//     priceAmount: toNumber(property.priceAmount),
//     priceCurrency: property.priceCurrency ?? null,
//     pricePeriod: property.pricePeriod ?? null,
//     priceOnApplication: property.priceOnApplication ?? false,
//     bedrooms: property.bedrooms ?? null,
//     bathrooms: property.bathrooms ?? null,
//     parkingSpaces: property.parkingSpaces ?? null,
//     yearBuilt: property.yearBuilt ?? null,
//     createdAt: property.createdAt.toISOString(),
//     location: property.location
//       ? {
//           addressLine1: property.location.addressLine1 ?? null,
//           district: property.location.district ?? null,
//           city: property.location.city ?? null,
//           province: property.location.province ?? null,
//           country: property.location.country ?? "Rwanda",
//           sector: property.location.sector ?? null,
//           cell: property.location.cell ?? null,
//           village: property.location.village ?? null,
//           lat: property.location.lat ? Number(property.location.lat) : null,
//           lng: property.location.lng ? Number(property.location.lng) : null,
//         }
//       : null,
//     house: property.house
//       ? {
//           bedrooms: property.house.bedrooms ?? null,
//           bathrooms: property.house.bathrooms ?? null,
//           sizeSqm: toNumber(property.house.sizeSqm),
//           plotSizeSqm: toNumber(property.house.plotSizeSqm),
//           toilets: property.house.toilets ?? null,
//           kitchens: property.house.kitchens ?? null,
//           lounges: property.house.lounges ?? null,
//           diningRooms: property.house.diningRooms ?? null,
//           furnished: property.house.furnished ?? null,
//           hasGarden: property.house.hasGarden ?? null,
//           hasBalcony: property.house.hasBalcony ?? null,
//           hasTerrace: property.house.hasTerrace ?? null,
//           hasSwimmingPool: property.house.hasSwimmingPool ?? null,
//           hasInternetFiber: property.house.hasInternetFiber ?? null,
//           hasSecurity: property.house.hasSecurity ?? null,
//           hasWaterTank: property.house.hasWaterTank ?? null,
//           hasElectricity: property.house.hasElectricity ?? null,
//           amenities: Array.isArray(property.house.amenities)
//             ? property.house.amenities
//             : [],
//         }
//       : null,
//     plot: property.plot
//       ? {
//           plotSizeSqm: toNumber(property.plot.plotSizeSqm),
//           zoning: property.plot.zoning ?? null,
//           titleType: property.plot.titleType ?? null,
//           titleStatus: property.plot.titleStatus ?? null,
//           accessRoad: property.plot.accessRoad ?? null,
//           internetFiber: property.plot.internetFiber ?? null,
//           electricity: property.plot.electricity ?? null,
//           water: property.plot.water ?? null,
//           sewage: property.plot.sewage ?? null,
//           surveyAvailable: property.plot.surveyAvailable ?? null,
//           boundariesMarked: property.plot.boundariesMarked ?? null,
//           restrictions: Array.isArray(property.plot.restrictions)
//             ? property.plot.restrictions
//             : [],
//         }
//       : null,
//     images,
//     videos,
//     documents,
//     highlights: Array.isArray(property.highlights) ? property.highlights : [],
//   };
// }


import {
  Currency,
  FurnishedType,
  MarketType,
  MediaKind,
  Prisma,
  PropertyKind,
  PropertyPurpose,
  RentType,
} from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

export type GalleryImage = {
  id: string;
  url: string;
  altText: string | null;
  caption: string | null;
  title: string | null;
  sortOrder: number | null;
  isCover: boolean;
};

export type PropertyDetailsPageData = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  kind: PropertyKind;
  purpose: PropertyPurpose;
  marketType: MarketType;
  rentType: RentType | null;
  priceAmount: number | null;
  priceCurrency: Currency | null;
  pricePeriod: string | null;
  priceOnApplication: boolean;
  bedrooms: number | null;
  bathrooms: number | null;
  parkingSpaces: number | null;
  yearBuilt: number | null;
  createdAt: string;
  location: {
    addressLine1: string | null;
    district: string | null;
    city: string | null;
    province: string | null;
    country: string;
    sector: string | null;
    cell: string | null;
    village: string | null;
    lat: number | null;
    lng: number | null;
  } | null;
  house: {
    bedrooms: number | null;
    bathrooms: number | null;
    sizeSqm: number | null;
    plotSizeSqm: number | null;
    toilets: number | null;
    kitchens: number | null;
    lounges: number | null;
    diningRooms: number | null;
    furnished: FurnishedType | null;
    hasGarden: boolean | null;
    hasBalcony: boolean | null;
    hasTerrace: boolean | null;
    hasSwimmingPool: boolean | null;
    hasInternetFiber: boolean | null;
    hasSecurity: boolean | null;
    hasWaterTank: boolean | null;
    hasElectricity: boolean | null;
    amenities: string[];
  } | null;
  plot: {
    plotSizeSqm: number | null;
    zoning: string | null;
    titleType: string | null;
    titleStatus: string | null;
    accessRoad: string | null;
    internetFiber: boolean | null;
    electricity: boolean | null;
    water: boolean | null;
    sewage: boolean | null;
    surveyAvailable: boolean | null;
    boundariesMarked: boolean | null;
    restrictions: string[];
  } | null;
  images: GalleryImage[];
  videos: Array<{
    id: string;
    url: string | null;
    title: string | null;
    caption: string | null;
  }>;
  documents: Array<{
    id: string;
    url: string | null;
    title: string | null;
    originalFileName: string;
    documentKind: string | null;
  }>;
  highlights: string[];
};

export type SimilarPropertyItem = {
  id: string;
  slug: string;
  title: string;
  kind: PropertyKind;
  purpose: PropertyPurpose;
  marketType: MarketType;
  rentType: RentType | null;
  priceAmount: number | null;
  priceCurrency: Currency | null;
  city: string | null;
  district: string | null;
  province: string | null;
  country: string;
  coverImage: string | null;
  coverImageAlt: string | null;
};

type ResolvableMedia = {
  id: string;
  kind?: string | null;
  url?: string | null;
  title?: string | null;
  caption?: string | null;
  altText?: string | null;
  sortOrder?: number | null;
  isCover?: boolean | null;
  storageBucket?: string | null;
  storageKey?: string | null;
  originalFileName?: string | null;
  documentKind?: string | null;
};

function toNumber(value: Prisma.Decimal | null | undefined): number | null {
  if (!value) return null;
  return Number(value.toString());
}

function buildSupabaseFileUrl(
  bucket?: string | null,
  key?: string | null,
): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!baseUrl || !bucket || !key) {
    return null;
  }

  const normalizedBase = baseUrl.replace(/\/$/, "");
  const encodedKey = key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${normalizedBase}/storage/v1/object/public/${bucket}/${encodedKey}`;
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function normalizeLocalPublicUrl(path: string): string {
  const normalized = path.replace(/\\/g, "/").trim();

  if (!normalized) {
    return normalized;
  }

  if (isAbsoluteUrl(normalized)) {
    return normalized;
  }

  if (normalized.startsWith("/")) {
    return normalized;
  }

  if (normalized.startsWith("uploads/")) {
    return `/${normalized}`;
  }

  if (normalized.startsWith("properties/")) {
    return `/uploads/${normalized}`;
  }

  return `/uploads/${normalized}`;
}

function resolveMediaUrl(media: {
  url?: string | null;
  storageBucket?: string | null;
  storageKey?: string | null;
}): string | null {
  if (media.url && media.url.trim().length > 0) {
    return normalizeLocalPublicUrl(media.url);
  }

  if (media.storageBucket && media.storageKey) {
    const supabaseUrl = buildSupabaseFileUrl(
      media.storageBucket,
      media.storageKey,
    );

    if (supabaseUrl) {
      return supabaseUrl;
    }
  }

  if (media.storageKey && media.storageKey.trim().length > 0) {
    return normalizeLocalPublicUrl(media.storageKey);
  }

  return null;
}

function getFileNameFromPath(path?: string | null): string {
  if (!path) {
    return "Document";
  }

  const normalized = path.replace(/\\/g, "/");
  const parts = normalized.split("/");
  const lastPart = parts[parts.length - 1];

  return lastPart && lastPart.trim().length > 0 ? lastPart : "Document";
}

function isImageKind(kind: string | null | undefined): boolean {
  return kind === MediaKind.IMAGE || kind === "IMAGE";
}

function isVideoKind(kind: string | null | undefined): boolean {
  return kind === "VIDEO";
}

function isDocumentKind(kind: string | null | undefined): boolean {
  return kind === "DOCUMENT" || kind === "FILE" || kind === "PDF";
}

export async function getSimilarPublicProperties(
  propertyId: string,
  kind: PropertyKind,
  purpose: PropertyPurpose,
): Promise<SimilarPropertyItem[]> {
  const properties = await prisma.property.findMany({
    where: {
      id: { not: propertyId },
      status: "ACTIVE",
      visibility: "PUBLIC",
      isPubliclyVisible: true,
      isSearchable: true,
      kind,
      purpose,
    },
    orderBy: [
      { isFeatured: "desc" },
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      location: true,
      media: {
        where: {
          kind: MediaKind.IMAGE,
          isPublic: true,
        },
        orderBy: [
          { isCover: "desc" },
          { sortOrder: "asc" },
          { createdAt: "asc" },
        ],
      },
    },
    take: 6,
  });

  return properties.map((property) => {
    const cover =
      property.media.find((item) => item.isCover) ??
      property.media[0] ??
      null;

    const coverImage = cover ? resolveMediaUrl(cover) : null;

    return {
      id: property.id,
      slug: property.slug,
      title: property.title,
      kind: property.kind,
      purpose: property.purpose,
      marketType: property.marketType,
      rentType: property.rentType ?? null,
      priceAmount: toNumber(property.priceAmount),
      priceCurrency: property.priceCurrency ?? null,
      city: property.location?.city ?? null,
      district: property.location?.district ?? null,
      province: property.location?.province ?? null,
      country: property.location?.country ?? "Rwanda",
      coverImage,
      coverImageAlt: cover?.altText ?? property.title,
    };
  });
}

export async function getPublicPropertyBySlug(
  slug: string,
): Promise<PropertyDetailsPageData | null> {
  const property = await prisma.property.findFirst({
    where: {
      slug,
      status: "ACTIVE",
      visibility: "PUBLIC",
      isPubliclyVisible: true,
      isSearchable: true,
    },
    include: {
      location: true,
      house: true,
      plot: true,
      media: {
        where: {
          isPublic: true,
        },
        orderBy: [
          { isCover: "desc" },
          { sortOrder: "asc" },
          { createdAt: "asc" },
        ],
      },
    },
  });

  if (!property) {
    return null;
  }

  const normalizedMedia = property.media as ResolvableMedia[];

  const images: GalleryImage[] = normalizedMedia
    .filter((item) => isImageKind(item.kind))
    .map((item) => {
      const url = resolveMediaUrl(item);

      if (!url) {
        return null;
      }

      return {
        id: item.id,
        url,
        altText: item.altText ?? property.title,
        caption: item.caption ?? null,
        title: item.title ?? null,
        sortOrder: item.sortOrder ?? null,
        isCover: item.isCover ?? false,
      };
    })
    .filter((item): item is GalleryImage => item !== null);

  const videos = normalizedMedia
    .filter((item) => isVideoKind(item.kind))
    .map((item) => ({
      id: item.id,
      url: resolveMediaUrl(item),
      title: item.title ?? null,
      caption: item.caption ?? null,
    }));

  const documents = normalizedMedia
    .filter((item) => isDocumentKind(item.kind))
    .map((item) => ({
      id: item.id,
      url: resolveMediaUrl(item),
      title: item.title ?? null,
      originalFileName:
        item.originalFileName ??
        getFileNameFromPath(item.storageKey ?? item.url) ??
        "Document",
      documentKind: item.documentKind ?? item.kind ?? null,
    }));

  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    description: property.description ?? null,
    kind: property.kind,
    purpose: property.purpose,
    marketType: property.marketType,
    rentType: property.rentType ?? null,
    priceAmount: toNumber(property.priceAmount),
    priceCurrency: property.priceCurrency ?? null,
    pricePeriod: property.pricePeriod ?? null,
    priceOnApplication: property.priceOnApplication ?? false,
    bedrooms: property.bedrooms ?? null,
    bathrooms: property.bathrooms ?? null,
    parkingSpaces: property.parkingSpaces ?? null,
    yearBuilt: property.yearBuilt ?? null,
    createdAt: property.createdAt.toISOString(),
    location: property.location
      ? {
          addressLine1: property.location.addressLine1 ?? null,
          district: property.location.district ?? null,
          city: property.location.city ?? null,
          province: property.location.province ?? null,
          country: property.location.country ?? "Rwanda",
          sector: property.location.sector ?? null,
          cell: property.location.cell ?? null,
          village: property.location.village ?? null,
          lat: property.location.lat ? Number(property.location.lat) : null,
          lng: property.location.lng ? Number(property.location.lng) : null,
        }
      : null,
    house: property.house
      ? {
          bedrooms: property.house.bedrooms ?? null,
          bathrooms: property.house.bathrooms ?? null,
          sizeSqm: toNumber(property.house.sizeSqm),
          plotSizeSqm: toNumber(property.house.plotSizeSqm),
          toilets: property.house.toilets ?? null,
          kitchens: property.house.kitchens ?? null,
          lounges: property.house.lounges ?? null,
          diningRooms: property.house.diningRooms ?? null,
          furnished: property.house.furnished ?? null,
          hasGarden: property.house.hasGarden ?? null,
          hasBalcony: property.house.hasBalcony ?? null,
          hasTerrace: property.house.hasTerrace ?? null,
          hasSwimmingPool: property.house.hasSwimmingPool ?? null,
          hasInternetFiber: property.house.hasInternetFiber ?? null,
          hasSecurity: property.house.hasSecurity ?? null,
          hasWaterTank: property.house.hasWaterTank ?? null,
          hasElectricity: property.house.hasElectricity ?? null,
          amenities: Array.isArray(property.house.amenities)
            ? property.house.amenities
            : [],
        }
      : null,
    plot: property.plot
      ? {
          plotSizeSqm: toNumber(property.plot.plotSizeSqm),
          zoning: property.plot.zoning ?? null,
          titleType: property.plot.titleType ?? null,
          titleStatus: property.plot.titleStatus ?? null,
          accessRoad: property.plot.accessRoad ?? null,
          internetFiber: property.plot.internetFiber ?? null,
          electricity: property.plot.electricity ?? null,
          water: property.plot.water ?? null,
          sewage: property.plot.sewage ?? null,
          surveyAvailable: property.plot.surveyAvailable ?? null,
          boundariesMarked: property.plot.boundariesMarked ?? null,
          restrictions: Array.isArray(property.plot.restrictions)
            ? property.plot.restrictions
            : [],
        }
      : null,
    images,
    videos,
    documents,
    highlights: Array.isArray(property.highlights) ? property.highlights : [],
  };
}