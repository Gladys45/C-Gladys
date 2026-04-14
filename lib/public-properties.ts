// import {
//   Currency,
//   MarketType,
//   MediaKind,
//   Prisma,
//   PropertyKind,
//   PropertyPurpose,
//   RentType,
// } from "@/lib/generated/prisma";
// import prisma from "@/lib/prisma";

// export type PublicPropertyFilters = {
//   search?: string;
//   purpose?: PropertyPurpose | "";
//   marketType?: MarketType | "";
//   rentType?: RentType | "";
//   kind?: PropertyKind | "";
//   minPrice?: string;
//   maxPrice?: string;
// };

// export type PublicPropertyCardItem = {
//   id: string;
//   slug: string;
//   title: string;
//   description: string | null;
//   kind: PropertyKind;
//   purpose: PropertyPurpose;
//   marketType: MarketType;
//   rentType: RentType | null;
//   priceAmount: number | null;
//   priceCurrency: Currency | null;
//   bedrooms: number | null;
//   bathrooms: number | null;
//   sizeSqm: number | null;
//   plotSizeSqm: number | null;
//   city: string | null;
//   district: string | null;
//   province: string | null;
//   country: string;
//   coverImage: string | null;
//   coverImageAlt: string | null;
//   createdAt: string;
// };

// function toNumber(value: Prisma.Decimal | null | undefined): number | null {
//   if (!value) return null;
//   return Number(value.toString());
// }

// function cleanString(value: unknown): string {
//   return typeof value === "string" ? value.trim() : "";
// }

// function parsePrice(value?: string) {
//   if (!value) return undefined;
//   const parsed = Number(value);
//   if (Number.isNaN(parsed)) return undefined;
//   return parsed;
// }

// function buildSupabaseFileUrl(bucket?: string | null, key?: string | null) {
//   const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   if (!baseUrl || !bucket || !key) return null;

//   const normalizedBase = baseUrl.replace(/\/$/, "");
//   const encodedKey = key
//     .split("/")
//     .map((part) => encodeURIComponent(part))
//     .join("/");

//   return `${normalizedBase}/storage/v1/object/public/${bucket}/${encodedKey}`;
// }

// export function buildPublicPropertyWhere(filters: PublicPropertyFilters): Prisma.PropertyWhereInput {
//   const search = cleanString(filters.search);
//   const minPrice = parsePrice(filters.minPrice);
//   const maxPrice = parsePrice(filters.maxPrice);

//   const where: Prisma.PropertyWhereInput = {
//     status: "ACTIVE",
//     visibility: "PUBLIC",
//     isPubliclyVisible: true,
//     isSearchable: true,
//     ...(filters.purpose ? { purpose: filters.purpose } : {}),
//     ...(filters.marketType ? { marketType: filters.marketType } : {}),
//     ...(filters.rentType ? { rentType: filters.rentType } : {}),
//     ...(filters.kind ? { kind: filters.kind } : {}),
//   };

//   if (search) {
//     where.OR = [
//       { title: { contains: search, mode: "insensitive" } },
//       { description: { contains: search, mode: "insensitive" } },
//       { slug: { contains: search, mode: "insensitive" } },
//       {
//         location: {
//           is: {
//             country: { contains: search, mode: "insensitive" },
//           },
//         },
//       },
//       {
//         location: {
//           is: {
//             city: { contains: search, mode: "insensitive" },
//           },
//         },
//       },
//       {
//         location: {
//           is: {
//             district: { contains: search, mode: "insensitive" },
//           },
//         },
//       },
//       {
//         location: {
//           is: {
//             province: { contains: search, mode: "insensitive" },
//           },
//         },
//       },
//     ];
//   }

//   if (minPrice !== undefined || maxPrice !== undefined) {
//     where.priceAmount = {};
//     if (minPrice !== undefined) {
//       where.priceAmount.gte = new Prisma.Decimal(minPrice);
//     }
//     if (maxPrice !== undefined) {
//       where.priceAmount.lte = new Prisma.Decimal(maxPrice);
//     }
//   }

//   return where;
// }

// export async function getPublicProperties(filters: PublicPropertyFilters) {
//   const where = buildPublicPropertyWhere(filters);

//   const properties = await prisma.property.findMany({
//     where,
//     orderBy: [
//       { isFeatured: "desc" },
//       { publishedAt: "desc" },
//       { createdAt: "desc" },
//     ],
//     include: {
//       location: true,
//       house: true,
//       plot: true,
//       media: {
//         where: {
//           kind: MediaKind.IMAGE,
//           isPublic: true,
//         },
//         orderBy: [
//           { isCover: "desc" },
//           { sortOrder: "asc" },
//           { createdAt: "asc" },
//         ],
//       },
//     },
//     take: 24,
//   });

//   const items: PublicPropertyCardItem[] = properties.map((property) => {
//     const cover =
//       property.media.find((item) => item.isCover) ??
//       property.media[0] ??
//       null;

//     const coverImage = cover
//       ? buildSupabaseFileUrl(cover.storageBucket, cover.storageKey) ?? cover.storageKey
//       : null;

//     return {
//       id: property.id,
//       slug: property.slug,
//       title: property.title,
//       description: property.description ?? null,
//       kind: property.kind,
//       purpose: property.purpose,
//       marketType: property.marketType,
//       rentType: property.rentType ?? null,
//       priceAmount: toNumber(property.priceAmount),
//       priceCurrency: property.priceCurrency ?? null,
//       bedrooms: property.house?.bedrooms ?? property.bedrooms ?? null,
//       bathrooms: property.house?.bathrooms ?? property.bathrooms ?? null,
//       sizeSqm: toNumber(property.house?.sizeSqm),
//       plotSizeSqm: toNumber(property.plot?.plotSizeSqm) ?? toNumber(property.house?.plotSizeSqm),
//       city: property.location?.city ?? null,
//       district: property.location?.district ?? null,
//       province: property.location?.province ?? null,
//       country: property.location?.country ?? "Rwanda",
//       coverImage,
//       coverImageAlt: cover?.altText ?? property.title,
//       createdAt: property.createdAt.toISOString(),
//     };
//   });

//   return items;
// }


// lib/public-properties.ts
import {
  Currency,
  FileStorageProvider,
  MarketType,
  MediaKind,
  Prisma,
  PropertyKind,
  PropertyPurpose,
  RentType,
} from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

export type PublicPropertyCardItem = {
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
  bedrooms: number | null;
  bathrooms: number | null;
  sizeSqm: number | null;
  plotSizeSqm: number | null;
  city: string | null;
  district: string | null;
  province: string | null;
  country: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  createdAt: string;
};

export type PublicPropertyFilters = {
  search?: string;
  purpose?: PropertyPurpose | "";
  marketType?: MarketType | "";
  rentType?: RentType | "";
  kind?: PropertyKind | "";
  minPrice?: string;
  maxPrice?: string;
};

type ResolvableMedia = {
  url?: string | null;
  storageProvider?: FileStorageProvider | null;
  storageBucket?: string | null;
  storageKey?: string | null;
  altText?: string | null;
  isCover?: boolean | null;
};

function toNumber(value: Prisma.Decimal | null | undefined): number | null {
  if (!value) return null;
  return Number(value.toString());
}

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parsePrice(value?: string): number | undefined {
  if (!value) return undefined;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return undefined;

  return parsed;
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
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

function resolveMediaUrl(media: ResolvableMedia): string | null {
  if (media.url && media.url.trim().length > 0) {
    return normalizeLocalPublicUrl(media.url);
  }

  if (
    media.storageProvider === FileStorageProvider.LOCAL &&
    media.storageKey &&
    media.storageKey.trim().length > 0
  ) {
    return normalizeLocalPublicUrl(media.storageKey);
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

export function buildPublicPropertyWhere(
  filters: PublicPropertyFilters,
): Prisma.PropertyWhereInput {
  const search = cleanString(filters.search);
  const minPrice = parsePrice(filters.minPrice);
  const maxPrice = parsePrice(filters.maxPrice);

  const where: Prisma.PropertyWhereInput = {
    status: "ACTIVE",
    visibility: "PUBLIC",
    isPubliclyVisible: true,
    isSearchable: true,
    ...(filters.purpose ? { purpose: filters.purpose } : {}),
    ...(filters.marketType ? { marketType: filters.marketType } : {}),
    ...(filters.rentType ? { rentType: filters.rentType } : {}),
    ...(filters.kind ? { kind: filters.kind } : {}),
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
      {
        location: {
          is: {
            country: { contains: search, mode: "insensitive" },
          },
        },
      },
      {
        location: {
          is: {
            city: { contains: search, mode: "insensitive" },
          },
        },
      },
      {
        location: {
          is: {
            district: { contains: search, mode: "insensitive" },
          },
        },
      },
      {
        location: {
          is: {
            province: { contains: search, mode: "insensitive" },
          },
        },
      },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.priceAmount = {};

    if (minPrice !== undefined) {
      where.priceAmount.gte = new Prisma.Decimal(minPrice);
    }

    if (maxPrice !== undefined) {
      where.priceAmount.lte = new Prisma.Decimal(maxPrice);
    }
  }

  return where;
}

export async function getPublicProperties(
  filters: PublicPropertyFilters = {},
): Promise<PublicPropertyCardItem[]> {
  const where = buildPublicPropertyWhere(filters);

  const properties = await prisma.property.findMany({
    where,
    orderBy: [
      { isFeatured: "desc" },
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      location: true,
      house: true,
      plot: true,
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
    take: 24,
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
      description: property.description ?? null,
      kind: property.kind,
      purpose: property.purpose,
      marketType: property.marketType,
      rentType: property.rentType ?? null,
      priceAmount: toNumber(property.priceAmount),
      priceCurrency: property.priceCurrency ?? null,
      bedrooms: property.house?.bedrooms ?? property.bedrooms ?? null,
      bathrooms: property.house?.bathrooms ?? property.bathrooms ?? null,
      sizeSqm: toNumber(property.house?.sizeSqm),
      plotSizeSqm:
        toNumber(property.plot?.plotSizeSqm) ??
        toNumber(property.house?.plotSizeSqm),
      city: property.location?.city ?? null,
      district: property.location?.district ?? null,
      province: property.location?.province ?? null,
      country: property.location?.country ?? "Rwanda",
      coverImage,
      coverImageAlt: cover?.altText ?? property.title,
      createdAt: property.createdAt.toISOString(),
    };
  });
}