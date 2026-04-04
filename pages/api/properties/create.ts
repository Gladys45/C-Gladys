// import type { NextApiRequest, NextApiResponse } from "next";
// // import type { PropertyCreatePayload } from "@/types/property";
// import prisma from "@/lib/prisma";
// import { PropertyCreatePayload } from "@/types/property.ts";

// function isNonEmptyString(value: unknown): value is string {
//   return typeof value === "string" && value.trim().length > 0;
// }

// function normalizeSlug(value: string): string {
//   return value
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// function validateMedia(payload: PropertyCreatePayload): string | null {
//   for (const item of payload.media ?? []) {
//     if (item.mediaKind === "IMAGE" && item.sourceType !== "FILE") {
//       return "Images must use FILE source type.";
//     }

//     if (item.mediaKind === "VIDEO") {
//       if (!["FILE", "EXTERNAL_LINK"].includes(item.sourceType)) {
//         return "Videos must use FILE or EXTERNAL_LINK source type.";
//       }
//     }

//     if (!isNonEmptyString(item.url)) {
//       return "Every media item must have a valid URL.";
//     }
//   }

//   return null;
// }

// function validateProperty(payload: PropertyCreatePayload): string | null {
//   if (!isNonEmptyString(payload.title)) return "Title is required.";
//   if (!isNonEmptyString(payload.slug)) return "Slug is required.";
//   if (!["HOUSE", "LAND"].includes(payload.kind)) return "Invalid property kind.";
//   if (!["SELL", "BUY", "RENT", "LETTINGS"].includes(payload.purpose)) {
//     return "Invalid property purpose.";
//   }

//   if (payload.kind === "HOUSE" && payload.plot) {
//     return "HOUSE property cannot include plot details.";
//   }

//   if (payload.kind === "LAND" && payload.house) {
//     return "LAND property cannot include house details.";
//   }

//   if (payload.purpose === "RENT" && payload.rentType == null) {
//     return "RENT property requires rentType.";
//   }

//   if ((payload.purpose === "SELL" || payload.purpose === "BUY") && payload.marketType == null) {
//     return "SELL or BUY property requires marketType.";
//   }

//   return validateMedia(payload);
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed." });
//   }

//   try {
//     const payload = req.body as PropertyCreatePayload;
//     const validationError = validateProperty(payload);

//     if (validationError) {
//       return res.status(400).json({ error: validationError });
//     }

//     const slug = normalizeSlug(payload.slug);

//     const existing = await prisma.property.findUnique({
//       where: { slug },
//       select: { id: true },
//     });

//     if (existing) {
//       return res.status(409).json({ error: "A property with this slug already exists." });
//     }

//     const created = await prisma.property.create({
//       data: {
//         slug,
//         title: payload.title.trim(),
//         kind: payload.kind,
//         purpose: payload.purpose,
//         marketType: payload.marketType ?? null,
//         rentType: payload.rentType ?? null,
//         priceAmount:
//           typeof payload.priceAmount === "number" ? payload.priceAmount : null,
//         priceCurrency: payload.priceCurrency ?? null,
//         pricePeriod: payload.pricePeriod ?? null,
//         priceLabel: payload.priceLabel?.trim() || null,
//         priceOnApplication: Boolean(payload.priceOnApplication),
//         description: payload.description?.trim() || null,
//         highlights: Array.isArray(payload.highlights)
//           ? payload.highlights
//               .map((item) => item.trim())
//               .filter(Boolean)
//           : [],

//         location: payload.location
//           ? {
//               create: {
//                 country: payload.location.country.trim(),
//                 city: payload.location.city?.trim() || null,
//                 province: payload.location.province?.trim() || null,
//                 district: payload.location.district?.trim() || null,
//                 sector: payload.location.sector?.trim() || null,
//                 cell: payload.location.cell?.trim() || null,
//                 village: payload.location.village?.trim() || null,
//                 lat:
//                   typeof payload.location.lat === "number"
//                     ? payload.location.lat
//                     : null,
//                 lng:
//                   typeof payload.location.lng === "number"
//                     ? payload.location.lng
//                     : null,
//               },
//             }
//           : undefined,

//         media: payload.media?.length
//           ? {
//               create: payload.media.map((item, index) => ({
//                 mediaKind: item.mediaKind,
//                 sourceType: item.sourceType,
//                 url: item.url.trim(),
//                 alt: item.alt?.trim() || null,
//                 title: item.title?.trim() || null,
//                 sortOrder:
//                   typeof item.sortOrder === "number" ? item.sortOrder : index,
//                 isCover: Boolean(item.isCover),
//                 fileName: item.fileName?.trim() || null,
//                 mimeType: item.mimeType?.trim() || null,
//                 fileSizeBytes:
//                   typeof item.fileSizeBytes === "number"
//                     ? item.fileSizeBytes
//                     : null,
//                 thumbnailUrl: item.thumbnailUrl?.trim() || null,
//                 durationSec:
//                   typeof item.durationSec === "number"
//                     ? item.durationSec
//                     : null,
//               })),
//             }
//           : undefined,

//         house:
//           payload.kind === "HOUSE" && payload.house
//             ? {
//                 create: {
//                   bedrooms:
//                     typeof payload.house.bedrooms === "number"
//                       ? payload.house.bedrooms
//                       : null,
//                   bathrooms:
//                     typeof payload.house.bathrooms === "number"
//                       ? payload.house.bathrooms
//                       : null,
//                   sizeSqm:
//                     typeof payload.house.sizeSqm === "number"
//                       ? payload.house.sizeSqm
//                       : null,
//                   furnished: payload.house.furnished ?? null,
//                   amenities: Array.isArray(payload.house.amenities)
//                     ? payload.house.amenities
//                         .map((item) => item.trim())
//                         .filter(Boolean)
//                     : [],
//                 },
//               }
//             : undefined,

//         plot:
//           payload.kind === "LAND" && payload.plot
//             ? {
//                 create: {
//                   plotSizeSqm: payload.plot.plotSizeSqm,
//                   zoning: payload.plot.zoning?.trim() || null,
//                   titleType: payload.plot.titleType ?? null,
//                   titleStatus: payload.plot.titleStatus ?? null,
//                   accessRoad: payload.plot.accessRoad ?? null,
//                   water: payload.plot.water ?? null,
//                   electricity: payload.plot.electricity ?? null,
//                   internetFiber: payload.plot.internetFiber ?? null,
//                   sewage: payload.plot.sewage ?? null,
//                   surveyAvailable: payload.plot.surveyAvailable ?? null,
//                   boundariesMarked: payload.plot.boundariesMarked ?? null,
//                   restrictions: Array.isArray(payload.plot.restrictions)
//                     ? payload.plot.restrictions
//                         .map((item) => item.trim())
//                         .filter(Boolean)
//                     : [],
//                 },
//               }
//             : undefined,
//       },
//       include: {
//         location: true,
//         media: true,
//         house: true,
//         plot: true,
//       },
//     });

//     return res.status(201).json({
//       message: "Property saved successfully.",
//       property: created,
//     });
//   } catch (error) {
//     console.error("Create property error:", error);
//     return res.status(500).json({ error: "Internal server error." });
//   }
// }


import type { NextApiRequest, NextApiResponse } from "next";
import formidable, {
  type Fields,
  type Files,
  type File as FormidableFile,
} from "formidable";
import {
  DocumentKind,
  ImageCategory,
  MediaKind,
} from "@/lib/generated/prisma";
import { createPropertyWithMedia } from "@/lib/services/property.service";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ApiResponse = {
  success: boolean;
  message: string;
  property?: unknown;
  media?: unknown[];
};

function parseForm(
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ fields, files });
    });
  });
}

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function getString(fields: Fields, key: string): string {
  return firstValue(fields[key] as string | string[] | undefined).trim();
}

function getOptionalString(fields: Fields, key: string): string | null {
  const value = getString(fields, key);
  return value || null;
}

function getBoolean(
  fields: Fields,
  key: string,
  fallback = false
): boolean {
  const value = getString(fields, key);
  if (!value) return fallback;
  return value === "true";
}

function getNumberOrNull(fields: Fields, key: string): number | null {
  const value = getString(fields, key);
  if (!value) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getFilesArray(
  value: FormidableFile | FormidableFile[] | undefined
): FormidableFile[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function parseHighlights(fields: Fields): string[] {
  const raw = getString(fields, "highlights");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // fallback below
  }

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const { fields, files } = await parseForm(req);

    const propertyPayload = {
      title: getString(fields, "title"),
      slug: getString(fields, "slug"),
      description: getOptionalString(fields, "description"),

      kind: getString(fields, "kind"),
      purpose: getString(fields, "purpose"),
      marketType: getString(fields, "marketType"),
      status: getString(fields, "status"),
      visibility: getString(fields, "visibility"),
      rentType: getOptionalString(fields, "rentType"),

      priceAmount: getNumberOrNull(fields, "priceAmount"),
      priceCurrency: getOptionalString(fields, "priceCurrency"),

      country: getString(fields, "country"),
      city: getOptionalString(fields, "city"),
      province: getOptionalString(fields, "province"),
      district: getOptionalString(fields, "district"),
      sector: getOptionalString(fields, "sector"),
      cell: getOptionalString(fields, "cell"),
      village: getOptionalString(fields, "village"),
      addressLine1: getOptionalString(fields, "addressLine1"),
      addressLine2: getOptionalString(fields, "addressLine2"),
      postalCode: getOptionalString(fields, "postalCode"),

      bedrooms: getNumberOrNull(fields, "bedrooms"),
      bathrooms: getNumberOrNull(fields, "bathrooms"),
      plotSizeSqm: getNumberOrNull(fields, "plotSizeSqm"),

      highlights: parseHighlights(fields),
    };

    const imageFiles = getFilesArray(
      files.images as FormidableFile | FormidableFile[] | undefined
    );
    const videoFiles = getFilesArray(
      files.video as FormidableFile | FormidableFile[] | undefined
    );
    const documentFiles = getFilesArray(
      files.document as FormidableFile | FormidableFile[] | undefined
    );

    const imageTitle = getOptionalString(fields, "imageTitle");
    const imageAltText = getOptionalString(fields, "imageAltText");
    const imageCaption = getOptionalString(fields, "imageCaption");
    const imageCategoryRaw = getOptionalString(fields, "imageCategory");
    const isCoverImage = getBoolean(fields, "isCoverImage");
    const imageIsPublic = getBoolean(fields, "imageIsPublic", true);

    const videoTitle = getOptionalString(fields, "videoTitle");
    const videoCaption = getOptionalString(fields, "videoCaption");
    const isPrimaryVideo = getBoolean(fields, "isPrimaryVideo", true);
    const videoIsPublic = getBoolean(fields, "videoIsPublic", true);

    const documentTitle = getOptionalString(fields, "documentTitle");
    const documentCaption = getOptionalString(fields, "documentCaption");
    const documentKindRaw = getOptionalString(fields, "documentKind");
    const isDownloadable = getBoolean(fields, "isDownloadable", true);
    const documentIsPublic = getBoolean(fields, "documentIsPublic", true);

    const mediaPayload = [
      ...imageFiles.map((file, index) => ({
        kind: MediaKind.IMAGE,
        tempFilePath: file.filepath,
        originalFileName: file.originalFilename || `image-${index + 1}`,
        mimeType: file.mimetype || "application/octet-stream",
        size: file.size,
        title: imageTitle,
        altText: imageAltText,
        caption: imageCaption,
        imageCategory: imageCategoryRaw
          ? (imageCategoryRaw as ImageCategory)
          : ImageCategory.GALLERY,
        isCover: isCoverImage && index === 0,
        isPublic: imageIsPublic,
      })),

      ...videoFiles.slice(0, 1).map((file) => ({
        kind: MediaKind.VIDEO,
        tempFilePath: file.filepath,
        originalFileName: file.originalFilename || "video",
        mimeType: file.mimetype || "application/octet-stream",
        size: file.size,
        title: videoTitle,
        caption: videoCaption,
        isPrimaryVideo,
        isPublic: videoIsPublic,
      })),

      ...documentFiles.slice(0, 1).map((file) => ({
        kind: MediaKind.DOCUMENT,
        tempFilePath: file.filepath,
        originalFileName: file.originalFilename || "document",
        mimeType: file.mimetype || "application/octet-stream",
        size: file.size,
        title: documentTitle,
        caption: documentCaption,
        documentKind: documentKindRaw
          ? (documentKindRaw as DocumentKind)
          : DocumentKind.BROCHURE,
        isDownloadable,
        isPublic: documentIsPublic,
      })),
    ];

    const result = await createPropertyWithMedia({
      property: propertyPayload,
      media: mediaPayload,
    });

    return res.status(201).json({
      success: true,
      message: "Property and media created successfully.",
      property: result.property,
      media: result.media,
    });
  } catch (error) {
    console.error("CREATE PROPERTY ENDPOINT ERROR:", error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to save property and media.",
    });
  }
}