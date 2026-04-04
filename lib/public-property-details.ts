import { MediaKind, Prisma } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

function toNumber(value: Prisma.Decimal | null | undefined): number | null {
  if (!value) return null;
  return Number(value.toString());
}

function buildSupabaseFileUrl(bucket?: string | null, key?: string | null) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl || !bucket || !key) return null;

  const normalizedBase = baseUrl.replace(/\/$/, "");
  const encodedKey = key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${normalizedBase}/storage/v1/object/public/${bucket}/${encodedKey}`;
}

export type PropertyDetailsPageData = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  highlights: string[];
  kind: "HOUSE" | "LAND";
  purpose: "SELL" | "BUY" | "RENT" | "LETTINGS";
  marketType: "ON_MARKET" | "OFF_MARKET";
  visibility: "PUBLIC" | "PRIVATE" | "HIDDEN";
  rentType: "LONG_TERM" | "SHORT_STAY" | null;

  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  priceLabel: string | null;
  priceOnApplication: boolean;

  bedrooms: number | null;
  bathrooms: number | null;
  parkingSpaces: number | null;
  yearBuilt: number | null;

  createdAt: string;
  publishedAt: string | null;

  location: {
    country: string;
    city: string | null;
    province: string | null;
    district: string | null;
    sector: string | null;
    cell: string | null;
    village: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    postalCode: string | null;
    lat: number | null;
    lng: number | null;
  } | null;

  house: {
    bedrooms: number | null;
    bathrooms: number | null;
    toilets: number | null;
    kitchens: number | null;
    lounges: number | null;
    diningRooms: number | null;
    sizeSqm: number | null;
    plotSizeSqm: number | null;
    furnished: string | null;
    amenities: string[];
    hasGarden: boolean | null;
    hasBalcony: boolean | null;
    hasTerrace: boolean | null;
    hasSwimmingPool: boolean | null;
    hasInternetFiber: boolean | null;
    hasElectricity: boolean | null;
    hasWaterTank: boolean | null;
    hasSecurity: boolean | null;
  } | null;

  plot: {
    plotSizeSqm: number | null;
    zoning: string | null;
    titleType: string | null;
    titleStatus: string | null;
    accessRoad: string | null;
    water: boolean | null;
    electricity: boolean | null;
    internetFiber: boolean | null;
    sewage: boolean | null;
    surveyAvailable: boolean | null;
    boundariesMarked: boolean | null;
    restrictions: string[];
  } | null;

  images: Array<{
    id: string;
    url: string | null;
    altText: string | null;
    caption: string | null;
    title: string | null;
    isCover: boolean;
    sortOrder: number;
  }>;

  videos: Array<{
    id: string;
    url: string | null;
    title: string | null;
    caption: string | null;
    isPrimaryVideo: boolean;
  }>;

  documents: Array<{
    id: string;
    url: string | null;
    title: string | null;
    caption: string | null;
    originalFileName: string;
    isDownloadable: boolean;
    documentKind: string | null;
  }>;
};

export type SimilarPropertyItem = {
  id: string;
  slug: string;
  title: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  district: string | null;
  city: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  kind: "HOUSE" | "LAND";
  sizeSqm: number | null;
  plotSizeSqm: number | null;
  coverImage: string | null;
};

export async function getPublicPropertyBySlug(slug: string): Promise<PropertyDetailsPageData | null> {
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
        where: { isPublic: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!property) return null;

  const images = property.media
    .filter((item) => item.kind === MediaKind.IMAGE)
    .map((item) => ({
      id: item.id,
      url: buildSupabaseFileUrl(item.storageBucket, item.storageKey) ?? item.storageKey,
      altText: item.altText ?? null,
      caption: item.caption ?? null,
      title: item.title ?? null,
      isCover: item.isCover,
      sortOrder: item.sortOrder,
    }))
    .sort((a, b) => {
      if (a.isCover && !b.isCover) return -1;
      if (!a.isCover && b.isCover) return 1;
      return a.sortOrder - b.sortOrder;
    });

  const videos = property.media
    .filter((item) => item.kind === MediaKind.VIDEO)
    .map((item) => ({
      id: item.id,
      url: buildSupabaseFileUrl(item.storageBucket, item.storageKey) ?? item.storageKey,
      title: item.title ?? null,
      caption: item.caption ?? null,
      isPrimaryVideo: item.isPrimaryVideo,
    }));

  const documents = property.media
    .filter((item) => item.kind === MediaKind.DOCUMENT)
    .map((item) => ({
      id: item.id,
      url: buildSupabaseFileUrl(item.storageBucket, item.storageKey) ?? item.storageKey,
      title: item.title ?? null,
      caption: item.caption ?? null,
      originalFileName: item.originalFileName,
      isDownloadable: item.isDownloadable,
      documentKind: item.documentKind ?? null,
    }));

  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    description: property.description ?? null,
    highlights: property.highlights ?? [],
    kind: property.kind,
    purpose: property.purpose,
    marketType: property.marketType,
    visibility: property.visibility,
    rentType: property.rentType ?? null,

    priceAmount: toNumber(property.priceAmount),
    priceCurrency: property.priceCurrency ?? null,
    pricePeriod: property.pricePeriod ?? null,
    priceLabel: property.priceLabel ?? null,
    priceOnApplication: property.priceOnApplication,

    bedrooms: property.bedrooms ?? null,
    bathrooms: property.bathrooms ?? null,
    parkingSpaces: property.parkingSpaces ?? null,
    yearBuilt: property.yearBuilt ?? null,

    createdAt: property.createdAt.toISOString(),
    publishedAt: property.publishedAt ? property.publishedAt.toISOString() : null,

    location: property.location
      ? {
          country: property.location.country,
          city: property.location.city ?? null,
          province: property.location.province ?? null,
          district: property.location.district ?? null,
          sector: property.location.sector ?? null,
          cell: property.location.cell ?? null,
          village: property.location.village ?? null,
          addressLine1: property.location.addressLine1 ?? null,
          addressLine2: property.location.addressLine2 ?? null,
          postalCode: property.location.postalCode ?? null,
          lat: toNumber(property.location.lat),
          lng: toNumber(property.location.lng),
        }
      : null,

    house: property.house
      ? {
          bedrooms: property.house.bedrooms ?? null,
          bathrooms: property.house.bathrooms ?? null,
          toilets: property.house.toilets ?? null,
          kitchens: property.house.kitchens ?? null,
          lounges: property.house.lounges ?? null,
          diningRooms: property.house.diningRooms ?? null,
          sizeSqm: toNumber(property.house.sizeSqm),
          plotSizeSqm: toNumber(property.house.plotSizeSqm),
          furnished: property.house.furnished ?? null,
          amenities: property.house.amenities ?? [],
          hasGarden: property.house.hasGarden ?? null,
          hasBalcony: property.house.hasBalcony ?? null,
          hasTerrace: property.house.hasTerrace ?? null,
          hasSwimmingPool: property.house.hasSwimmingPool ?? null,
          hasInternetFiber: property.house.hasInternetFiber ?? null,
          hasElectricity: property.house.hasElectricity ?? null,
          hasWaterTank: property.house.hasWaterTank ?? null,
          hasSecurity: property.house.hasSecurity ?? null,
        }
      : null,

    plot: property.plot
      ? {
          plotSizeSqm: toNumber(property.plot.plotSizeSqm),
          zoning: property.plot.zoning ?? null,
          titleType: property.plot.titleType ?? null,
          titleStatus: property.plot.titleStatus ?? null,
          accessRoad: property.plot.accessRoad ?? null,
          water: property.plot.water ?? null,
          electricity: property.plot.electricity ?? null,
          internetFiber: property.plot.internetFiber ?? null,
          sewage: property.plot.sewage ?? null,
          surveyAvailable: property.plot.surveyAvailable ?? null,
          boundariesMarked: property.plot.boundariesMarked ?? null,
          restrictions: property.plot.restrictions ?? [],
        }
      : null,

    images,
    videos,
    documents,
  };
}

export async function getSimilarPublicProperties(
  propertyId: string,
  kind: "HOUSE" | "LAND",
  purpose: "SELL" | "BUY" | "RENT" | "LETTINGS"
): Promise<SimilarPropertyItem[]> {
  const properties = await prisma.property.findMany({
    where: {
      id: { not: propertyId },
      kind,
      purpose,
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
          kind: MediaKind.IMAGE,
          isPublic: true,
        },
        orderBy: [{ isCover: "desc" }, { sortOrder: "asc" }],
      },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 3,
  });

  return properties.map((property) => {
    const cover = property.media.find((item) => item.isCover) ?? property.media[0] ?? null;

    return {
      id: property.id,
      slug: property.slug,
      title: property.title,
      priceAmount: toNumber(property.priceAmount),
      priceCurrency: property.priceCurrency ?? null,
      district: property.location?.district ?? null,
      city: property.location?.city ?? null,
      bedrooms: property.house?.bedrooms ?? property.bedrooms ?? null,
      bathrooms: property.house?.bathrooms ?? property.bathrooms ?? null,
      kind: property.kind,
      sizeSqm: toNumber(property.house?.sizeSqm),
      plotSizeSqm: toNumber(property.plot?.plotSizeSqm) ?? toNumber(property.house?.plotSizeSqm),
      coverImage: cover
        ? buildSupabaseFileUrl(cover.storageBucket, cover.storageKey) ?? cover.storageKey
        : null,
    };
  });
}