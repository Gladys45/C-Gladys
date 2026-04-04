// import { createProperty } from "@/lib/services/property.service";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed." });
//   }

//   try {
//     const property = await createProperty(req.body);
//     return res.status(201).json({ message: "Created.", property });
//   } catch (error) {
//     const message =
//       error instanceof Error ? error.message : "Failed to save property.";
//     return res.status(400).json({ message });
//   }
// }


// import type { NextApiRequest, NextApiResponse } from "next";
// import formidable, {
//   type Fields,
//   type Files,
//   type File as FormidableFile,
// } from "formidable";
// import {
//   DocumentKind,
//   ImageCategory,
//   MediaKind,
// } from "@/lib/generated/prisma";
// import { createPropertyWithMedia } from "@/lib/services/property.service";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   property?: unknown;
//   media?: unknown[];
// };

// function parseForm(
//   req: NextApiRequest
// ): Promise<{ fields: Fields; files: Files }> {
//   const form = formidable({
//     multiples: true,
//     keepExtensions: true,
//   });

//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       resolve({ fields, files });
//     });
//   });
// }

// function firstValue(value: string | string[] | undefined): string {
//   if (Array.isArray(value)) return value[0] ?? "";
//   return value ?? "";
// }

// function getString(fields: Fields, key: string): string {
//   return firstValue(fields[key] as string | string[] | undefined).trim();
// }

// function getOptionalString(fields: Fields, key: string): string | null {
//   const value = getString(fields, key);
//   return value || null;
// }

// function getBoolean(
//   fields: Fields,
//   key: string,
//   fallback = false
// ): boolean {
//   const value = getString(fields, key);
//   if (!value) return fallback;
//   return value === "true";
// }

// function getNumberOrNull(fields: Fields, key: string): number | null {
//   const value = getString(fields, key);
//   if (!value) return null;

//   const parsed = Number(value);
//   return Number.isFinite(parsed) ? parsed : null;
// }

// function getFilesArray(
//   value: FormidableFile | FormidableFile[] | undefined
// ): FormidableFile[] {
//   if (!value) return [];
//   return Array.isArray(value) ? value : [value];
// }

// function parseHighlights(fields: Fields): string[] {
//   const raw = getString(fields, "highlights");
//   if (!raw) return [];

//   try {
//     const parsed = JSON.parse(raw);
//     if (Array.isArray(parsed)) {
//       return parsed.map((item) => String(item).trim()).filter(Boolean);
//     }
//   } catch {
//     // fallback below
//   }

//   return raw
//     .split(",")
//     .map((item) => item.trim())
//     .filter(Boolean);
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ApiResponse>
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({
//       success: false,
//       message: "Method not allowed.",
//     });
//   }

//   try {
//     const { fields, files } = await parseForm(req);

//     const propertyPayload = {
//       title: getString(fields, "title"),
//       slug: getString(fields, "slug"),
//       description: getOptionalString(fields, "description"),

//       kind: getString(fields, "kind"),
//       purpose: getString(fields, "purpose"),
//       marketType: getString(fields, "marketType"),
//       status: getString(fields, "status"),
//       visibility: getString(fields, "visibility"),
//       rentType: getOptionalString(fields, "rentType"),

//       priceAmount: getNumberOrNull(fields, "priceAmount"),
//       priceCurrency: getOptionalString(fields, "priceCurrency"),

//       country: getString(fields, "country"),
//       city: getOptionalString(fields, "city"),
//       province: getOptionalString(fields, "province"),
//       district: getOptionalString(fields, "district"),
//       sector: getOptionalString(fields, "sector"),
//       cell: getOptionalString(fields, "cell"),
//       village: getOptionalString(fields, "village"),
//       addressLine1: getOptionalString(fields, "addressLine1"),
//       addressLine2: getOptionalString(fields, "addressLine2"),
//       postalCode: getOptionalString(fields, "postalCode"),

//       bedrooms: getNumberOrNull(fields, "bedrooms"),
//       bathrooms: getNumberOrNull(fields, "bathrooms"),
//       plotSizeSqm: getNumberOrNull(fields, "plotSizeSqm"),

//       highlights: parseHighlights(fields),
//     };

//     const imageFiles = getFilesArray(
//       files.images as FormidableFile | FormidableFile[] | undefined
//     );
//     const videoFiles = getFilesArray(
//       files.video as FormidableFile | FormidableFile[] | undefined
//     );
//     const documentFiles = getFilesArray(
//       files.document as FormidableFile | FormidableFile[] | undefined
//     );

//     const imageTitle = getOptionalString(fields, "imageTitle");
//     const imageAltText = getOptionalString(fields, "imageAltText");
//     const imageCaption = getOptionalString(fields, "imageCaption");
//     const imageCategoryRaw = getOptionalString(fields, "imageCategory");
//     const isCoverImage = getBoolean(fields, "isCoverImage");
//     const imageIsPublic = getBoolean(fields, "imageIsPublic", true);

//     const videoTitle = getOptionalString(fields, "videoTitle");
//     const videoCaption = getOptionalString(fields, "videoCaption");
//     const isPrimaryVideo = getBoolean(fields, "isPrimaryVideo", true);
//     const videoIsPublic = getBoolean(fields, "videoIsPublic", true);

//     const documentTitle = getOptionalString(fields, "documentTitle");
//     const documentCaption = getOptionalString(fields, "documentCaption");
//     const documentKindRaw = getOptionalString(fields, "documentKind");
//     const isDownloadable = getBoolean(fields, "isDownloadable", true);
//     const documentIsPublic = getBoolean(fields, "documentIsPublic", true);

//     const mediaPayload = [
//       ...imageFiles.map((file, index) => ({
//         kind: MediaKind.IMAGE,
//         tempFilePath: file.filepath,
//         originalFileName: file.originalFilename || `image-${index + 1}`,
//         mimeType: file.mimetype || "application/octet-stream",
//         size: file.size,
//         title: imageTitle,
//         altText: imageAltText,
//         caption: imageCaption,
//         imageCategory: imageCategoryRaw
//           ? (imageCategoryRaw as ImageCategory)
//           : ImageCategory.GALLERY,
//         isCover: isCoverImage && index === 0,
//         isPublic: imageIsPublic,
//       })),

//       ...videoFiles.slice(0, 1).map((file) => ({
//         kind: MediaKind.VIDEO,
//         tempFilePath: file.filepath,
//         originalFileName: file.originalFilename || "video",
//         mimeType: file.mimetype || "application/octet-stream",
//         size: file.size,
//         title: videoTitle,
//         caption: videoCaption,
//         isPrimaryVideo,
//         isPublic: videoIsPublic,
//       })),

//       ...documentFiles.slice(0, 1).map((file) => ({
//         kind: MediaKind.DOCUMENT,
//         tempFilePath: file.filepath,
//         originalFileName: file.originalFilename || "document",
//         mimeType: file.mimetype || "application/octet-stream",
//         size: file.size,
//         title: documentTitle,
//         caption: documentCaption,
//         documentKind: documentKindRaw
//           ? (documentKindRaw as DocumentKind)
//           : DocumentKind.BROCHURE,
//         isDownloadable,
//         isPublic: documentIsPublic,
//       })),
//     ];

//     const result = await createPropertyWithMedia({
//       property: propertyPayload,
//       media: mediaPayload,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Property and media created successfully.",
//       property: result.property,
//       media: result.media,
//     });
//   } catch (error) {
//     console.error("CREATE PROPERTY ENDPOINT ERROR:", error);

//     return res.status(400).json({
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : "Failed to save property and media.",
//     });
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

function toJsonSafe<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_, currentValue) =>
      typeof currentValue === "bigint" ? currentValue.toString() : currentValue
    )
  );
}

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

function getBoolean(fields: Fields, key: string, fallback = false): boolean {
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

    return res.status(201).json(
      toJsonSafe({
        success: true,
        message: "Property and media created successfully.",
        property: result.property,
        media: result.media,
      })
    );
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