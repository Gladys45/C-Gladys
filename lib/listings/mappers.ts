// import type {
//   Currency,
//   MarketType,
//   MoneyPeriod,
//   Prisma,
//   Property,
//   PropertyLocation,
//   PropertyMedia,
//   PropertyPurpose,
//   PropertyStatus,
//   RentType,
//   HouseDetails,
//   PlotDetails,
// } from "@/lib/generated/prisma";
// import type { ListingCard, ListingImage, ListingRecord, ListingStatus } from "./types";

// export type PublicPropertyRow = Property & {
//   location: PropertyLocation | null;
//   media: PropertyMedia[];
//   house: HouseDetails | null;
//   plot: PlotDetails | null;
// };

// function decimalToNumber(value: Prisma.Decimal | null | undefined) {
//   return value ? Number(value.toString()) : undefined;
// }

// function buildPublicStatus(
//   purpose: PropertyPurpose,
//   status: PropertyStatus
// ): ListingStatus {
//   if (status === "SOLD") return "SOLD";
//   if (status === "RENTED") return "LET";
//   if (purpose === "RENT" || purpose === "LETTINGS") return "RENT";
//   return "BUY";
// }

// function buildLocationLabel(location: PropertyLocation | null) {
//   return [
//     location?.city,
//     location?.district,
//     location?.province,
//     location?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");
// }

// function buildPriceLabel(args: {
//   priceLabel?: string | null;
//   priceOnApplication: boolean;
//   amount?: Prisma.Decimal | null;
//   currency?: Currency | null;
//   period?: MoneyPeriod | null;
// }) {
//   if (args.priceOnApplication) return "POA";
//   if (args.priceLabel?.trim()) return args.priceLabel.trim();
//   if (!args.amount) return "Price not provided";

//   const base = `${args.currency ?? ""} ${args.amount.toString()}`.trim();
//   return args.period ? `${base} / ${args.period.toLowerCase()}` : base;
// }

// function buildImages(
//   media: PropertyMedia[],
//   fallbackAlt: string
// ): ListingImage[] {
//   return media
//     .filter((item) => item.kind === "IMAGE" && item.isPublic)
//     .sort((a, b) => {
//       if (a.isCover && !b.isCover) return -1;
//       if (!a.isCover && b.isCover) return 1;
//       return a.sortOrder - b.sortOrder;
//     })
//     .map((item) => ({
//       id: item.id,
//       url: `/api/media/${item.id}`,
//       alt: item.altText ?? fallbackAlt,
//       isCover: item.isCover,
//     }));
// }

// export function mapPropertyToListingRecord(property: PublicPropertyRow): ListingRecord {
//   const images = buildImages(property.media, property.title);

//   return {
//     id: property.id,
//     slug: property.slug,
//     title: property.title,
//     description: property.description ?? undefined,
//     kind: property.kind,
//     status: buildPublicStatus(property.purpose, property.status),
//     marketType: property.marketType as MarketType,
//     rentType: (property.rentType as RentType | null) ?? undefined,
//     location: {
//       country: property.location?.country ?? "",
//       city: property.location?.city ?? undefined,
//       province: property.location?.province ?? undefined,
//       district: property.location?.district ?? undefined,
//       sector: property.location?.sector ?? undefined,
//       cell: property.location?.cell ?? undefined,
//       village: property.location?.village ?? undefined,
//       addressLine1: property.location?.addressLine1 ?? undefined,
//       addressLine2: property.location?.addressLine2 ?? undefined,
//     },
//     priceOnApplication: property.priceOnApplication,
//     price: property.priceAmount
//       ? {
//           amount: Number(property.priceAmount.toString()),
//           currency: (property.priceCurrency ?? "RWF") as "RWF" | "USD" | "EUR" | "GBP",
//           period: (property.pricePeriod as MoneyPeriod | null) ?? undefined,
//           label: buildPriceLabel({
//             priceLabel: property.priceLabel,
//             priceOnApplication: property.priceOnApplication,
//             amount: property.priceAmount,
//             currency: property.priceCurrency,
//             period: property.pricePeriod,
//           }),
//         }
//       : undefined,
//     house:
//       property.kind === "HOUSE"
//         ? {
//             bedrooms: property.house?.bedrooms ?? property.bedrooms ?? undefined,
//             bathrooms: property.house?.bathrooms ?? property.bathrooms ?? undefined,
//             sizeSqm: decimalToNumber(property.house?.sizeSqm),
//             furnished: property.house?.furnished ?? undefined,
//             amenities: property.house?.amenities ?? [],
//           }
//         : undefined,
//     plot:
//       property.kind === "LAND"
//         ? {
//             plotSizeSqm: decimalToNumber(property.plot?.plotSizeSqm),
//             zoning: property.plot?.zoning ?? undefined,
//             accessRoad: property.plot?.accessRoad ?? undefined,
//             titleType: property.plot?.titleType ?? undefined,
//             titleStatus: property.plot?.titleStatus ?? undefined,
//             surveyAvailable: property.plot?.surveyAvailable ?? undefined,
//             boundariesMarked: property.plot?.boundariesMarked ?? undefined,
//             utilities: {
//               water: property.plot?.water ?? undefined,
//               electricity: property.plot?.electricity ?? undefined,
//               internetFiber: property.plot?.internetFiber ?? undefined,
//               sewage: property.plot?.sewage ?? undefined,
//             },
//             restrictions: property.plot?.restrictions ?? [],
//           }
//         : undefined,
//     highlights: property.highlights ?? [],
//     images,
//   };
// }

// export function mapListingRecordToCard(record: ListingRecord): ListingCard {
//   const cover =
//     record.images?.find((img) => img.isCover)?.url ??
//     record.images?.[0]?.url ??
//     "/images/placeholder-property.jpg";

//   const locationLabel = [
//     record.location.city,
//     record.location.district,
//     record.location.province,
//     record.location.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   return {
//     id: record.id,
//     listingId: record.id,
//     href: `/properties/${record.slug}`,
//     image: cover,
//     name: record.title,
//     kind: record.kind,
//     tag: record.status,
//     locationLabel,
//     priceLabel: record.price?.label ?? (record.priceOnApplication ? "POA" : "Price not provided"),
//     status: record.status,
//   };
// }

import { Prisma } from "@/lib/generated/prisma";
import type {
  Currency,
  MoneyPeriod,
  Property,
  PropertyLocation,
  PropertyMedia,
  HouseDetails,
  PlotDetails,
  PropertyPurpose,
  PropertyStatus,
} from "@/lib/generated/prisma";
import type { PublicListingCard, PublicListingRecord } from "./types";

export type PropertyWithRelations = Property & {
  location: PropertyLocation | null;
  media: PropertyMedia[];
  house: HouseDetails | null;
  plot: PlotDetails | null;
};

function decimalToNumber(value: Prisma.Decimal | null | undefined): number | undefined {
  if (!value) return undefined;
  return Number(value.toString());
}

function formatPublicStatus(
  purpose: PropertyPurpose,
  status: PropertyStatus
): "BUY" | "RENT" | "SOLD" | "LET" {
  if (status === "SOLD") return "SOLD";
  if (status === "RENTED") return "LET";
  if (purpose === "RENT" || purpose === "LETTINGS") return "RENT";
  return "BUY";
}

function formatLocationLabel(location: PropertyLocation | null): string {
  return [
    location?.city,
    location?.district,
    location?.province,
    location?.country,
  ]
    .filter(Boolean)
    .join(", ") || "Location unavailable";
}

function formatPriceLabel(args: {
  amount?: Prisma.Decimal | null;
  currency?: Currency | null;
  period?: MoneyPeriod | null;
  customLabel?: string | null;
  priceOnApplication: boolean;
}): string {
  if (args.priceOnApplication) return "POA";
  if (args.customLabel && args.customLabel.trim()) return args.customLabel.trim();
  if (!args.amount) return "Price not provided";

  const base = `${args.currency ?? ""} ${args.amount.toString()}`.trim();
  return args.period ? `${base} / ${args.period.toLowerCase()}` : base;
}

function buildImages(property: PropertyWithRelations) {
  const publicImages = property.media
    .filter((item) => item.kind === "IMAGE" && item.isPublic)
    .sort((a, b) => {
      if (a.isCover && !b.isCover) return -1;
      if (!a.isCover && b.isCover) return 1;
      return a.sortOrder - b.sortOrder;
    });

  return publicImages.map((image) => ({
    id: image.id,
    url: `/api/public/media/${image.id}`,
    alt: image.altText || image.title || property.title,
    isCover: image.isCover,
  }));
}

export function mapPropertyToPublicListingRecord(
  property: PropertyWithRelations
): PublicListingRecord {
  const images = buildImages(property);

  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    description: property.description ?? "",
    highlights: property.highlights ?? [],
    kind: property.kind,
    status: formatPublicStatus(property.purpose, property.status),
    marketType: property.marketType ?? undefined,
    rentType: property.rentType ?? undefined,
    location: {
      country: property.location?.country ?? "",
      city: property.location?.city ?? undefined,
      province: property.location?.province ?? undefined,
      district: property.location?.district ?? undefined,
      sector: property.location?.sector ?? undefined,
      cell: property.location?.cell ?? undefined,
      village: property.location?.village ?? undefined,
      addressLine1: property.location?.addressLine1 ?? undefined,
      addressLine2: property.location?.addressLine2 ?? undefined,
    },
    price: {
      amount: decimalToNumber(property.priceAmount),
      currency: property.priceCurrency ?? undefined,
      period: property.pricePeriod ?? undefined,
      label: formatPriceLabel({
        amount: property.priceAmount,
        currency: property.priceCurrency,
        period: property.pricePeriod,
        customLabel: property.priceLabel,
        priceOnApplication: property.priceOnApplication,
      }),
      priceOnApplication: property.priceOnApplication,
    },
    bedrooms: property.house?.bedrooms ?? property.bedrooms ?? undefined,
    bathrooms: property.house?.bathrooms ?? property.bathrooms ?? undefined,
    parkingSpaces: property.parkingSpaces ?? undefined,
    yearBuilt: property.yearBuilt ?? undefined,
    images,
    house: property.house
      ? {
          bedrooms: property.house.bedrooms ?? undefined,
          bathrooms: property.house.bathrooms ?? undefined,
          toilets: property.house.toilets ?? undefined,
          kitchens: property.house.kitchens ?? undefined,
          lounges: property.house.lounges ?? undefined,
          diningRooms: property.house.diningRooms ?? undefined,
          sizeSqm: decimalToNumber(property.house.sizeSqm),
          plotSizeSqm: decimalToNumber(property.house.plotSizeSqm),
          furnished: property.house.furnished ?? undefined,
          amenities: property.house.amenities ?? [],
          hasGarden: property.house.hasGarden ?? undefined,
          hasBalcony: property.house.hasBalcony ?? undefined,
          hasTerrace: property.house.hasTerrace ?? undefined,
          hasSwimmingPool: property.house.hasSwimmingPool ?? undefined,
          hasInternetFiber: property.house.hasInternetFiber ?? undefined,
          hasElectricity: property.house.hasElectricity ?? undefined,
          hasWaterTank: property.house.hasWaterTank ?? undefined,
          hasSecurity: property.house.hasSecurity ?? undefined,
        }
      : undefined,
    plot: property.plot
      ? {
          plotSizeSqm: decimalToNumber(property.plot.plotSizeSqm),
          zoning: property.plot.zoning ?? undefined,
          titleType: property.plot.titleType ?? undefined,
          titleStatus: property.plot.titleStatus ?? undefined,
          accessRoad: property.plot.accessRoad ?? undefined,
          water: property.plot.water ?? undefined,
          electricity: property.plot.electricity ?? undefined,
          internetFiber: property.plot.internetFiber ?? undefined,
          sewage: property.plot.sewage ?? undefined,
          surveyAvailable: property.plot.surveyAvailable ?? undefined,
          boundariesMarked: property.plot.boundariesMarked ?? undefined,
          restrictions: property.plot.restrictions ?? [],
        }
      : undefined,
  };
}

export function mapPublicListingRecordToCard(
  record: PublicListingRecord
): PublicListingCard {
  const coverImage =
    record.images.find((img) => img.isCover)?.url ||
    record.images[0]?.url ||
    "/images/placeholder-property.jpg";

  const locationLabel =
    [
      record.location.city,
      record.location.district,
      record.location.province,
      record.location.country,
    ]
      .filter(Boolean)
      .join(", ") || "Location unavailable";

  return {
    id: record.id,
    slug: record.slug,
    href: `/properties/${record.slug}`,
    title: record.title,
    image: coverImage,
    kind: record.kind,
    status: record.status,
    tag: record.status,
    locationLabel,
    priceLabel: record.price.label,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
  };
}