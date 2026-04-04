

// import prisma from "@/lib/prisma";
// import {
//   DocumentKind,
//   ImageCategory,
//   MediaKind,
//   Prisma,
// } from "@/lib/generated/prisma";
// import { storePropertyMediaFile } from "@/lib/storage/properties_media";

// type CreatePropertyMediaInput = {
//   propertyId: string;
//   kind: MediaKind;
//   tempFilePath: string;
//   originalFileName: string;
//   mimeType: string;
//   size: number;
//   title?: string | null;
//   altText?: string | null;
//   caption?: string | null;
//   imageCategory?: ImageCategory | null;
//   documentKind?: DocumentKind | null;
//   isCover?: boolean;
//   isPrimaryVideo?: boolean;
//   isPublic?: boolean;
//   isDownloadable?: boolean;
// };

// function cleanOptionalString(value?: string | null): string | null {
//   if (typeof value !== "string") return null;
//   const trimmed = value.trim();
//   return trimmed.length ? trimmed : null;
// }

// export async function createPropertyMedia(input: CreatePropertyMediaInput) {
//   if (!input.propertyId?.trim()) {
//     throw new Error("Property ID is required.");
//   }

//   if (!input.tempFilePath?.trim()) {
//     throw new Error("Temporary file path is required.");
//   }

//   if (!input.originalFileName?.trim()) {
//     throw new Error("Original file name is required.");
//   }

//   if (!input.mimeType?.trim()) {
//     throw new Error("Mime type is required.");
//   }

//   if (!input.kind) {
//     throw new Error("Media kind is required.");
//   }

//   const property = await prisma.property.findUnique({
//     where: { id: input.propertyId },
//     select: { id: true },
//   });

//   if (!property) {
//     throw new Error("Property not found.");
//   }

//   const stored = await storePropertyMediaFile({
//     propertyId: input.propertyId,
//     kind: input.kind,
//     tempFilePath: input.tempFilePath,
//     originalFileName: input.originalFileName,
//     mimeType: input.mimeType,
//     size: input.size,
//   });

//   const safeTitle = cleanOptionalString(input.title);
//   const safeAltText = cleanOptionalString(input.altText);
//   const safeCaption = cleanOptionalString(input.caption);

//   const isImage = input.kind === MediaKind.IMAGE;
//   const isVideo = input.kind === MediaKind.VIDEO;
//   const isDocument = input.kind === MediaKind.DOCUMENT;

//   return await prisma.$transaction(async (tx) => {
//     const lastMedia = await tx.propertyMedia.findFirst({
//       where: {
//         propertyId: input.propertyId,
//         kind: input.kind,
//       },
//       orderBy: {
//         sortOrder: "desc",
//       },
//       select: {
//         sortOrder: true,
//       },
//     });

//     const nextSortOrder = lastMedia ? lastMedia.sortOrder + 1 : 0;

//     if (isImage && input.isCover) {
//       await tx.propertyMedia.updateMany({
//         where: {
//           propertyId: input.propertyId,
//           kind: MediaKind.IMAGE,
//           isCover: true,
//         },
//         data: {
//           isCover: false,
//         },
//       });
//     }

//     if (isVideo && input.isPrimaryVideo) {
//       await tx.propertyMedia.updateMany({
//         where: {
//           propertyId: input.propertyId,
//           kind: MediaKind.VIDEO,
//           isPrimaryVideo: true,
//         },
//         data: {
//           isPrimaryVideo: false,
//         },
//       });
//     }

//     const data: Prisma.PropertyMediaUncheckedCreateInput = {
//       propertyId: input.propertyId,
//       kind: input.kind,

//       title: safeTitle,
//       altText: isImage ? safeAltText : null,
//       caption: safeCaption,

//       imageCategory: isImage ? input.imageCategory ?? ImageCategory.GALLERY : null,
//       documentKind: isDocument ? input.documentKind ?? DocumentKind.OTHER : null,

//       storageProvider: stored.storageProvider,
//       storageBucket: stored.storageBucket,
//       storageKey: stored.storageKey,
//       originalFileName: stored.originalFileName,
//       mimeType: stored.mimeType,
//       fileExtension: stored.fileExtension,
//       fileSizeBytes: stored.fileSizeBytes,
//       checksumSha256: stored.checksumSha256,

//       width: null,
//       height: null,
//       durationSec: null,
//       pageCount: null,

//       sortOrder: nextSortOrder,
//       isCover: isImage ? Boolean(input.isCover) : false,
//       isPrimaryVideo: isVideo ? Boolean(input.isPrimaryVideo) : false,
//       isPublic: typeof input.isPublic === "boolean" ? input.isPublic : true,
//       isDownloadable: isDocument ? Boolean(input.isDownloadable) : false,
//     };

//     const created = await tx.propertyMedia.create({
//       data,
//     });

//     return created;
//   });
// }



import prisma from "@/lib/prisma";
import {
  DocumentKind,
  ImageCategory,
  MediaKind,
  Prisma,
} from "@/lib/generated/prisma";
import { storePropertyMediaFile } from "@/lib/storage/properties_media";

type CreatePropertyMediaInput = {
  propertyId: string;
  kind: MediaKind;
  tempFilePath: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  title?: string | null;
  altText?: string | null;
  caption?: string | null;
  imageCategory?: ImageCategory | null;
  documentKind?: DocumentKind | null;
  isCover?: boolean;
  isPrimaryVideo?: boolean;
  isPublic?: boolean;
  isDownloadable?: boolean;
};

function cleanOptionalString(value?: string | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function createPropertyMedia(input: CreatePropertyMediaInput) {
  if (!input.propertyId?.trim()) {
    throw new Error("Property ID is required.");
  }

  if (!input.tempFilePath?.trim()) {
    throw new Error("Temporary file path is required.");
  }

  if (!input.originalFileName?.trim()) {
    throw new Error("Original file name is required.");
  }

  if (!input.mimeType?.trim()) {
    throw new Error("Mime type is required.");
  }

  if (!input.kind) {
    throw new Error("Media kind is required.");
  }

  const property = await prisma.property.findUnique({
    where: { id: input.propertyId },
    select: { id: true },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  const stored = await storePropertyMediaFile({
    propertyId: input.propertyId,
    kind: input.kind,
    tempFilePath: input.tempFilePath,
    originalFileName: input.originalFileName,
    mimeType: input.mimeType,
    size: input.size,
  });

  const safeTitle = cleanOptionalString(input.title);
  const safeAltText = cleanOptionalString(input.altText);
  const safeCaption = cleanOptionalString(input.caption);

  const isImage = input.kind === MediaKind.IMAGE;
  const isVideo = input.kind === MediaKind.VIDEO;
  const isDocument = input.kind === MediaKind.DOCUMENT;

  return prisma.$transaction(async (tx) => {
    const lastMedia = await tx.propertyMedia.findFirst({
      where: {
        propertyId: input.propertyId,
        kind: input.kind,
      },
      orderBy: {
        sortOrder: "desc",
      },
      select: {
        sortOrder: true,
      },
    });

    const nextSortOrder = lastMedia ? lastMedia.sortOrder + 1 : 0;

    if (isImage && input.isCover) {
      await tx.propertyMedia.updateMany({
        where: {
          propertyId: input.propertyId,
          kind: MediaKind.IMAGE,
          isCover: true,
        },
        data: {
          isCover: false,
        },
      });
    }

    if (isVideo && input.isPrimaryVideo) {
      await tx.propertyMedia.updateMany({
        where: {
          propertyId: input.propertyId,
          kind: MediaKind.VIDEO,
          isPrimaryVideo: true,
        },
        data: {
          isPrimaryVideo: false,
        },
      });
    }

    const data: Prisma.PropertyMediaUncheckedCreateInput = {
      propertyId: input.propertyId,
      kind: input.kind,
      title: safeTitle,
      altText: isImage ? safeAltText : null,
      caption: safeCaption,
      imageCategory: isImage ? input.imageCategory ?? ImageCategory.GALLERY : null,
      documentKind: isDocument ? input.documentKind ?? DocumentKind.OTHER : null,
      storageProvider: stored.storageProvider,
      storageBucket: stored.storageBucket,
      storageKey: stored.storageKey,
      originalFileName: stored.originalFileName,
      mimeType: stored.mimeType,
      fileExtension: stored.fileExtension,
      fileSizeBytes: stored.fileSizeBytes,
      checksumSha256: stored.checksumSha256,
      width: null,
      height: null,
      durationSec: null,
      pageCount: null,
      sortOrder: nextSortOrder,
      isCover: isImage ? Boolean(input.isCover) : false,
      isPrimaryVideo: isVideo ? Boolean(input.isPrimaryVideo) : false,
      isPublic: typeof input.isPublic === "boolean" ? input.isPublic : true,
      isDownloadable: isDocument ? Boolean(input.isDownloadable) : false,
    };

    return tx.propertyMedia.create({ data });
  });
}