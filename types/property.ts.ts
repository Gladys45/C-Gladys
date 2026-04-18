export type PropertyCreatePayload = {
  slug: string;
  title: string;
  kind: "HOUSE" | "LAND";
  purpose: "SELL" | "BUY" | "RENT" | "LETTINGS";
  marketType?: "ON_MARKET" | "OFF_MARKET" | "OFF_PLAN" | "ON_PLAN" | null;
  rentType?: "LONG_TERM" | "SHORT_STAY" | null;

  priceAmount?: number | null;
  priceCurrency?: "RWF" | "USD" | "EUR" | "GBP" | null;
  pricePeriod?: "MONTH" | "NIGHT" | "WEEK" | "YEAR" | null;
  priceLabel?: string | null;
  priceOnApplication?: boolean;

  description?: string | null;
  highlights?: string[];

  location?: {
    country: string;
    city?: string | null;
    province?: string | null;
    district?: string | null;
    sector?: string | null;
    cell?: string | null;
    village?: string | null;
    lat?: number | null;
    lng?: number | null;
  } | null;

  media?: Array<{
    mediaKind: "IMAGE" | "VIDEO";
    sourceType: "FILE" | "EXTERNAL_LINK";
    url: string;
    alt?: string | null;
    title?: string | null;
    sortOrder?: number;
    isCover?: boolean;
    fileName?: string | null;
    mimeType?: string | null;
    fileSizeBytes?: number | null;
    thumbnailUrl?: string | null;
    durationSec?: number | null;
  }>;

  house?: {
    bedrooms?: number | null;
    bathrooms?: number | null;
    sizeSqm?: number | null;
    furnished?: "FURNISHED" | "UNFURNISHED" | "PART_FURNISHED" | null;
    amenities?: string[];
  } | null;

  plot?: {
    plotSizeSqm: number;
    zoning?: string | null;
    titleType?: "FREEHOLD" | "LEASEHOLD" | "CUSTOMARY" | null;
    titleStatus?: "READY" | "IN_PROCESS" | "UNKNOWN" | null;
    accessRoad?: "TARMAC" | "MURRAM" | "PRIVATE" | "NONE" | null;
    water?: boolean | null;
    electricity?: boolean | null;
    internetFiber?: boolean | null;
    sewage?: boolean | null;
    surveyAvailable?: boolean | null;
    boundariesMarked?: boolean | null;
    restrictions?: string[];
  } | null;
};