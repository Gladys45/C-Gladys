


// import { z } from "zod";
// import {
//   Currency,
//   ListingVisibility,
//   MarketType,
//   PropertyKind,
//   PropertyPurpose,
//   PropertyStatus,
//   RentType,
// } from "@/lib/generated/prisma";

// const emptyToNull = (value: unknown) => {
//   if (typeof value !== "string") return value;
//   const trimmed = value.trim();
//   return trimmed === "" ? null : trimmed;
// };

// const emptyToUndefined = (value: unknown) => {
//   if (typeof value !== "string") return value;
//   const trimmed = value.trim();
//   return trimmed === "" ? undefined : trimmed;
// };

// export const createPropertySchema = z
//   .object({
//     title: z.string().trim().min(2, "Title is required."),
//     slug: z.string().trim().min(2, "Slug is required."),
//     description: z.preprocess(emptyToNull, z.string().nullable().optional()),

//     kind: z.nativeEnum(PropertyKind),
//     purpose: z.nativeEnum(PropertyPurpose),
//     marketType: z.nativeEnum(MarketType).default(MarketType.ON_MARKET),
//     status: z.nativeEnum(PropertyStatus).default(PropertyStatus.DRAFT),
//     visibility: z.nativeEnum(ListingVisibility).default(ListingVisibility.PUBLIC),
//     rentType: z.preprocess(
//       emptyToNull,
//       z.nativeEnum(RentType).nullable().optional()
//     ),

//     priceAmount: z.preprocess(
//       emptyToUndefined,
//       z.coerce.number().nonnegative().optional()
//     ),
//     priceCurrency: z.preprocess(
//       emptyToNull,
//       z.nativeEnum(Currency).nullable().optional()
//     ),

//     country: z.string().trim().min(1, "Country is required."),
//     city: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     province: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     district: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     sector: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     cell: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     village: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     addressLine1: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     addressLine2: z.preprocess(emptyToNull, z.string().nullable().optional()),
//     postalCode: z.preprocess(emptyToNull, z.string().nullable().optional()),

//     bedrooms: z.preprocess(
//       emptyToUndefined,
//       z.coerce.number().int().nonnegative().optional()
//     ),
//     bathrooms: z.preprocess(
//       emptyToUndefined,
//       z.coerce.number().int().nonnegative().optional()
//     ),
//     plotSizeSqm: z.preprocess(
//       emptyToUndefined,
//       z.coerce.number().positive().optional()
//     ),

//     highlights: z.array(z.string()).default([]),
//   })
//   .superRefine((data, ctx) => {
//     if (data.kind === "LAND" && !data.plotSizeSqm) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["plotSizeSqm"],
//         message: "Plot size is required for land.",
//       });
//     }
//   });


import { z } from "zod";
import {
  Currency,
  ListingVisibility,
  MarketType,
  PropertyKind,
  PropertyPurpose,
  PropertyStatus,
  RentType,
} from "@/lib/generated/prisma";

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

    kind: z.nativeEnum(PropertyKind),
    purpose: z.nativeEnum(PropertyPurpose),
    marketType: z.nativeEnum(MarketType).default(MarketType.ON_MARKET),
    status: z.nativeEnum(PropertyStatus).default(PropertyStatus.DRAFT),
    visibility: z.nativeEnum(ListingVisibility).default(ListingVisibility.PUBLIC),
    rentType: z.preprocess(
      toTrimmedOrNull,
      z.nativeEnum(RentType).nullable().optional()
    ),

    priceAmount: z.preprocess(
      toOptionalPositiveNumber,
      z.number().nonnegative().optional()
    ),
    priceCurrency: z.preprocess(
      toTrimmedOrNull,
      z.nativeEnum(Currency).nullable().optional()
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