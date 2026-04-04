import prisma from "@/lib/prisma";
import {
  ImageCategory,
  DocumentKind,
  MediaKind,
  Prisma,
} from "@/lib/generated/prisma";
import { storePropertyMediaFile } from "@/lib/storage/properties_media";
// import { storePropertyMediaFile } from "@/lib/storage/property-media";

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

function cleanOptionalString(value?: string | null) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export async function createPropertyMedia(input: CreatePropertyMediaInput) {
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

  return prisma.$transaction(async (tx) => {
    let nextSortOrder = 0;

    const last = await tx.propertyMedia.findFirst({
      where: { propertyId: input.propertyId, kind: input.kind },
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    });

    if (last) {
      nextSortOrder = last.sortOrder + 1;
    }

    if (input.kind === "IMAGE" && input.isCover) {
      await tx.propertyMedia.updateMany({
        where: {
          propertyId: input.propertyId,
          kind: "IMAGE",
          isCover: true,
        },
        data: { isCover: false },
      });
    }

    if (input.kind === "VIDEO" && input.isPrimaryVideo) {
      await tx.propertyMedia.updateMany({
        where: {
          propertyId: input.propertyId,
          kind: "VIDEO",
          isPrimaryVideo: true,
        },
        data: { isPrimaryVideo: false },
      });
    }

    const data: Prisma.PropertyMediaCreateInput = {
      kind: input.kind,
      title: cleanOptionalString(input.title),
      altText: cleanOptionalString(input.altText),
      caption: cleanOptionalString(input.caption),

      imageCategory: input.kind === "IMAGE" ? input.imageCategory ?? null : null,
      documentKind: input.kind === "DOCUMENT" ? input.documentKind ?? null : null,

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
      isCover: input.kind === "IMAGE" ? Boolean(input.isCover) : false,
      isPrimaryVideo: input.kind === "VIDEO" ? Boolean(input.isPrimaryVideo) : false,
      isPublic: input.isPublic ?? true,
      isDownloadable:
        input.kind === "DOCUMENT" ? Boolean(input.isDownloadable) : false,

      property: {
        connect: { id: input.propertyId },
      },
    };

    return tx.propertyMedia.create({ data });
  });
}
