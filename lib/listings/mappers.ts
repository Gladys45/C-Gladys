import type { PublicListingCard, PublicListingRecord } from "./types";

// Define inline types for property data coming from Prisma
// This avoids importing from the non-existent generated prisma client
type Currency = "RWF" | "USD" | "EUR" | "GBP";
type MoneyPeriod = "MONTH" | "NIGHT" | "WEEK" | "YEAR";
type PropertyPurpose = "SELL" | "BUY" | "RENT" | "LETTINGS";
type PropertyStatus = "DRAFT" | "ACTIVE" | "PENDING" | "SOLD" | "RENTED" | "ARCHIVED";
type PropertyKind = "HOUSE" | "LAND";
type MarketType = "ON_MARKET" | "OFF_MARKET" | "OFF_PLAN" | "ON_PLAN";
type RentType = "LONG_TERM" | "SHORT_STAY";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DecimalLike = { toString(): string } | null | undefined;

interface PropertyLocation {
  country?: string | null;
  city?: string | null;
  province?: string | null;
  district?: string | null;
  sector?: string | null;
  cell?: string | null;
  village?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
}

interface PropertyMedia {
  id: string;
  kind: string;
  isPublic: boolean;
  isCover: boolean;
  sortOrder: number;
  altText?: string | null;
  title?: string | null;
}

interface HouseDetails {
  bedrooms?: number | null;
  bathrooms?: number | null;
  toilets?: number | null;
  kitchens?: number | null;
  lounges?: number | null;
  diningRooms?: number | null;
  sizeSqm?: DecimalLike;
  plotSizeSqm?: DecimalLike;
  furnished?: string | null;
  amenities?: string[] | null;
  hasGarden?: boolean | null;
  hasBalcony?: boolean | null;
  hasTerrace?: boolean | null;
  hasSwimmingPool?: boolean | null;
  hasInternetFiber?: boolean | null;
  hasElectricity?: boolean | null;
  hasWaterTank?: boolean | null;
  hasSecurity?: boolean | null;
}

interface PlotDetails {
  plotSizeSqm?: DecimalLike;
  zoning?: string | null;
  titleType?: string | null;
  titleStatus?: string | null;
  accessRoad?: string | null;
  water?: boolean | null;
  electricity?: boolean | null;
  internetFiber?: boolean | null;
  sewage?: boolean | null;
  surveyAvailable?: boolean | null;
  boundariesMarked?: boolean | null;
  restrictions?: string[] | null;
}

interface Property {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  highlights?: string[] | null;
  kind: PropertyKind;
  purpose: PropertyPurpose;
  status: PropertyStatus;
  marketType?: MarketType | null;
  rentType?: RentType | null;
  priceAmount?: DecimalLike;
  priceCurrency?: Currency | null;
  pricePeriod?: MoneyPeriod | null;
  priceLabel?: string | null;
  priceOnApplication: boolean;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parkingSpaces?: number | null;
  yearBuilt?: number | null;
}

export type PropertyWithRelations = Property & {
  location: PropertyLocation | null;
  media: PropertyMedia[];
  house: HouseDetails | null;
  plot: PlotDetails | null;
};

function decimalToNumber(value: DecimalLike): number | undefined {
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

function formatPriceLabel(args: {
  amount?: DecimalLike;
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
