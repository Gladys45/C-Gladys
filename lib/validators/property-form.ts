

import { z } from "zod";

export const propertyFormSchema = z
  .object({
    title: z.string().min(3, "Title is required."),
    kind: z.enum(["HOUSE", "LAND"]),
    purpose: z.enum(["SELL", "BUY", "RENT", "LETTINGS"]),

    marketType: z.enum(["ON_MARKET", "OFF_MARKET", "OFF_PLAN", "ON_PLAN"]).optional().or(z.literal("")),
    rentType: z.enum(["LONG_TERM", "SHORT_STAY"]).optional().or(z.literal("")),

    priceAmount: z.string(),
    priceCurrency: z.enum(["RWF", "USD", "EUR", "GBP"]),
    pricePeriod: z.enum(["MONTH", "NIGHT", "WEEK", "YEAR"]).optional().or(z.literal("")),
    priceOnApplication: z.boolean(),
    description: z.string(),

    country: z.string().min(1, "Country is required."),
    city: z.string(),
    province: z.string(),
    district: z.string(),
    sector: z.string(),
    cell: z.string(),
    village: z.string(),
    lat: z.string(),
    lng: z.string(),

    highlights: z.array(z.string()),

    bedrooms: z.string(),
    bathrooms: z.string(),
    sizeSqm: z.string(),
    furnished: z
      .enum(["FURNISHED", "UNFURNISHED", "PART_FURNISHED"])
      .optional()
      .or(z.literal("")),

    amenities: z.array(z.string()),

    plotSizeSqm: z.string(),
    zoning: z.string(),
    titleType: z.enum(["FREEHOLD", "LEASEHOLD", "CUSTOMARY"]).optional().or(z.literal("")),
    titleStatus: z.enum(["READY", "IN_PROCESS", "UNKNOWN"]).optional().or(z.literal("")),
    accessRoad: z.enum(["TARMAC", "MURRAM", "PRIVATE", "NONE"]).optional().or(z.literal("")),

    water: z.boolean(),
    electricity: z.boolean(),
    internetFiber: z.boolean(),
    sewage: z.boolean(),
    surveyAvailable: z.boolean(),
    boundariesMarked: z.boolean(),

    restrictions: z.array(z.string()),
  })
  .superRefine((values, ctx) => {
    if ((values.purpose === "SELL" || values.purpose === "BUY") && !values.marketType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["marketType"],
        message: "Market type is required for SELL and BUY.",
      });
    }

    if ((values.purpose === "RENT" || values.purpose === "LETTINGS") && !values.rentType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["rentType"],
        message: "Rent type is required for RENT and LETTINGS.",
      });
    }

    if (values.kind === "LAND" && !values.plotSizeSqm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plotSizeSqm"],
        message: "Plot size is required for LAND.",
      });
    }
  });

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;