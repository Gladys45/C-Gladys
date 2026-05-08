import { z } from "zod";

// Define enums inline to avoid importing from non-existent generated prisma
const Currency = {
  RWF: "RWF",
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
} as const;

const ListingVisibility = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  HIDDEN: "HIDDEN",
} as const;

const MarketType = {
  ON_MARKET: "ON_MARKET",
  OFF_MARKET: "OFF_MARKET",
  OFF_PLAN: "OFF_PLAN",
  ON_PLAN: "ON_PLAN",
} as const;

const PropertyKind = {
  HOUSE: "HOUSE",
  LAND: "LAND",
} as const;

const PropertyPurpose = {
  SELL: "SELL",
  BUY: "BUY",
  RENT: "RENT",
  LETTINGS: "LETTINGS",
} as const;

const PropertyStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  SOLD: "SOLD",
  RENTED: "RENTED",
  ARCHIVED: "ARCHIVED",
} as const;

const RentType = {
  LONG_TERM: "LONG_TERM",
  SHORT_STAY: "SHORT_STAY",
} as const;

const toTrimmedOrNull = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

const toOptionalPositiveNumber = (value: unknown) => {
  if (value === null || value === undefined) return undefined;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return undefined;
    const num = Number(trimmed);
    return Number.isFinite(num) ? num : value;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : value;
  }

  return value;
};

const toOptionalNonNegativeInt = (value: unknown) => {
  if (value === null || value === undefined) return undefined;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return undefined;
    const num = Number(trimmed);
    return Number.isFinite(num) ? Math.trunc(num) : value;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.trunc(value) : value;
  }

  return value;
};

export const createPropertySchema = z
  .object({
    title: z.string().trim().min(2, "Title is required."),
    slug: z.string().trim().min(2, "Slug is required."),
    description: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),

    kind: z.enum([PropertyKind.HOUSE, PropertyKind.LAND]),
    purpose: z.enum([PropertyPurpose.SELL, PropertyPurpose.BUY, PropertyPurpose.RENT, PropertyPurpose.LETTINGS]),
    marketType: z.enum([MarketType.ON_MARKET, MarketType.OFF_MARKET, MarketType.OFF_PLAN, MarketType.ON_PLAN]).default(MarketType.ON_MARKET),
    status: z.enum([PropertyStatus.DRAFT, PropertyStatus.ACTIVE, PropertyStatus.PENDING, PropertyStatus.SOLD, PropertyStatus.RENTED, PropertyStatus.ARCHIVED]).default(PropertyStatus.DRAFT),
    visibility: z.enum([ListingVisibility.PUBLIC, ListingVisibility.PRIVATE, ListingVisibility.HIDDEN]).default(ListingVisibility.PUBLIC),
    rentType: z.preprocess(
      toTrimmedOrNull,
      z.enum([RentType.LONG_TERM, RentType.SHORT_STAY]).nullable().optional()
    ),

    priceAmount: z.preprocess(
      toOptionalPositiveNumber,
      z.number().nonnegative().optional()
    ),
    priceCurrency: z.preprocess(
      toTrimmedOrNull,
      z.enum([Currency.RWF, Currency.USD, Currency.EUR, Currency.GBP]).nullable().optional()
    ),

    country: z.string().trim().min(1, "Country is required."),
    city: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    province: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    district: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    sector: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    cell: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    village: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    addressLine1: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    addressLine2: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),
    postalCode: z.preprocess(toTrimmedOrNull, z.string().nullable().optional()),

    bedrooms: z.preprocess(
      toOptionalNonNegativeInt,
      z.number().int().nonnegative().optional()
    ),
    bathrooms: z.preprocess(
      toOptionalNonNegativeInt,
      z.number().int().nonnegative().optional()
    ),

    plotSizeSqm: z.preprocess(
      toOptionalPositiveNumber,
      z.number().positive().optional()
    ),

    highlights: z.array(z.string().trim()).default([]),
  })
  .superRefine((data, ctx) => {
    if (data.kind === PropertyKind.LAND && data.plotSizeSqm === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plotSizeSqm"],
        message: "Plot size is required when property kind is LAND.",
      });
    }

    if (data.kind === PropertyKind.HOUSE && data.plotSizeSqm !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plotSizeSqm"],
        message: "Plot size should not be sent for HOUSE.",
      });
    }
  });
