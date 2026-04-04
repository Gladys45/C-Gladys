


import {
  DocumentKind,
  ImageCategory,
  ListingVisibility,
  MarketType,
  MediaKind,
  Prisma,
  PropertyKind,
} from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { storePropertyMediaFile } from "@/lib/storage/properties_media";
import { createPropertySchema } from "../validators/properties";

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanOptionalString(value?: string | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export type CreatePropertyMediaInput = {
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

export type CreatePropertyWithMediaInput = {
  property: unknown;
  media?: Omit<CreatePropertyMediaInput, "propertyId">[];
};

export async function createProperty(input: unknown) {
  const parsed = createPropertySchema.parse(input);

  const slug = normalizeSlug(parsed.slug);
  const isOffMarket = parsed.marketType === MarketType.OFF_MARKET;

  const existing = await prisma.property.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing) {
    throw new Error("A property with this slug already exists.");
  }

  return prisma.property.create({
    data: {
      title: parsed.title.trim(),
      slug,
      description: parsed.description ?? null,

      kind: parsed.kind,
      purpose: parsed.purpose,
      marketType: parsed.marketType,
      status: parsed.status,
      visibility: isOffMarket ? ListingVisibility.HIDDEN : parsed.visibility,
      rentType: parsed.rentType ?? null,

      priceAmount:
        parsed.priceAmount !== undefined && parsed.priceAmount !== null
          ? new Prisma.Decimal(parsed.priceAmount)
          : null,
      priceCurrency: parsed.priceCurrency ?? null,

      isSearchable: !isOffMarket,
      isPubliclyVisible: !isOffMarket,

      highlights: parsed.highlights,

      bedrooms:
        parsed.kind === PropertyKind.HOUSE ? parsed.bedrooms ?? null : null,
      bathrooms:
        parsed.kind === PropertyKind.HOUSE ? parsed.bathrooms ?? null : null,

      location: {
        create: {
          country: parsed.country,
          city: parsed.city ?? null,
          province: parsed.province ?? null,
          district: parsed.district ?? null,
          sector: parsed.sector ?? null,
          cell: parsed.cell ?? null,
          village: parsed.village ?? null,
          addressLine1: parsed.addressLine1 ?? null,
          addressLine2: parsed.addressLine2 ?? null,
          postalCode: parsed.postalCode ?? null,
        },
      },

      ...(parsed.kind === PropertyKind.HOUSE
        ? {
            house: {
              create: {
                bedrooms: parsed.bedrooms ?? null,
                bathrooms: parsed.bathrooms ?? null,
                amenities: [],
              },
            },
          }
        : {}),

      ...(parsed.kind === PropertyKind.LAND
        ? {
            plot: {
              create: {
                plotSizeSqm: new Prisma.Decimal(parsed.plotSizeSqm!),
                restrictions: [],
              },
            },
          }
        : {}),
    },
    include: {
      location: true,
      house: true,
      plot: true,
    },
  });
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
      imageCategory: isImage
        ? input.imageCategory ?? ImageCategory.GALLERY
        : null,
      documentKind: isDocument
        ? input.documentKind ?? DocumentKind.OTHER
        : null,
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

export async function createPropertyWithMedia(
  input: CreatePropertyWithMediaInput
) {
  const property = await createProperty(input.property);

  const createdMedia = [];

  for (const mediaItem of input.media ?? []) {
    const media = await createPropertyMedia({
      ...mediaItem,
      propertyId: property.id,
    });
    createdMedia.push(media);
  }

  return {
    property,
    media: createdMedia,
  };
}