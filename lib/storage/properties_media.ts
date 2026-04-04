// import fs from "fs/promises";
// import path from "path";
// import crypto from "crypto";
// import type { FileStorageProvider, MediaKind } from "@/lib/generated/prisma";

// export type StoredMediaFile = {
//   storageProvider: FileStorageProvider;
//   storageBucket: string | null;
//   storageKey: string;
//   originalFileName: string;
//   mimeType: string;
//   fileExtension: string;
//   fileSizeBytes: bigint;
//   checksumSha256: string;
// };

// const PUBLIC_UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

// function getSafeExtension(filename: string) {
//   const ext = path.extname(filename || "").toLowerCase().replace(".", "");
//   return ext || "bin";
// }

// function getMediaFolder(kind: MediaKind) {
//   if (kind === "IMAGE") return "images";
//   if (kind === "VIDEO") return "videos";
//   return "documents";
// }

// function getMimeWhitelist(kind: MediaKind) {
//   if (kind === "IMAGE") {
//     return ["image/jpeg", "image/png", "image/webp"];
//   }

//   if (kind === "VIDEO") {
//     return ["video/mp4", "video/webm", "video/quicktime"];
//   }

//   return ["application/pdf"];
// }

// export function validateMediaInput(params: {
//   kind: MediaKind;
//   mimeType: string;
//   originalFileName: string;
//   size: number;
// }) {
//   const { kind, mimeType, originalFileName, size } = params;

//   const allowed = getMimeWhitelist(kind);
//   if (!allowed.includes(mimeType)) {
//     throw new Error(`Invalid file type for ${kind}.`);
//   }

//   if (kind === "IMAGE" && size > 15 * 1024 * 1024) {
//     throw new Error("Image file is too large. Maximum is 15MB.");
//   }

//   if (kind === "VIDEO" && size > 300 * 1024 * 1024) {
//     throw new Error("Video file is too large. Maximum is 300MB.");
//   }

//   if (kind === "DOCUMENT" && size > 25 * 1024 * 1024) {
//     throw new Error("Document file is too large. Maximum is 25MB.");
//   }

//   const ext = getSafeExtension(originalFileName);

//   if (kind === "DOCUMENT" && ext !== "pdf") {
//     throw new Error("Only PDF files are allowed for documents.");
//   }
// }

// export async function storePropertyMediaFile(params: {
//   propertyId: string;
//   kind: MediaKind;
//   tempFilePath: string;
//   originalFileName: string;
//   mimeType: string;
//   size: number;
// }): Promise<StoredMediaFile> {
//   const { propertyId, kind, tempFilePath, originalFileName, mimeType, size } = params;

//   validateMediaInput({ kind, mimeType, originalFileName, size });

//   const fileBuffer = await fs.readFile(tempFilePath);
//   const checksumSha256 = crypto
//     .createHash("sha256")
//     .update(fileBuffer)
//     .digest("hex");

//   const fileExtension = getSafeExtension(originalFileName);
//   const folder = getMediaFolder(kind);

//   const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
//   const relativeDir = path.join("properties", propertyId, folder);
//   const absoluteDir = path.join(PUBLIC_UPLOAD_ROOT, relativeDir);
//   const absolutePath = path.join(absoluteDir, fileName);

//   await fs.mkdir(absoluteDir, { recursive: true });
//   await fs.writeFile(absolutePath, fileBuffer);

//   const storageKey = path.posix.join("uploads", relativeDir.replace(/\\/g, "/"), fileName);

//   return {
//     storageProvider: "LOCAL",
//     storageBucket: null,
//     storageKey,
//     originalFileName,
//     mimeType,
//     fileExtension,
//     fileSizeBytes: BigInt(size),
//     checksumSha256,
//   };
// }



import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { FileStorageProvider, MediaKind } from "@/lib/generated/prisma";

export type StoredMediaFile = {
  storageProvider: FileStorageProvider;
  storageBucket: string | null;
  storageKey: string;
  originalFileName: string;
  mimeType: string;
  fileExtension: string;
  fileSizeBytes: bigint;
  checksumSha256: string;
};

const PUBLIC_UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

function getSafeExtension(filename: string) {
  const ext = path.extname(filename || "").toLowerCase().replace(".", "");
  return ext || "bin";
}

function getMediaFolder(kind: MediaKind) {
  if (kind === "IMAGE") return "images";
  if (kind === "VIDEO") return "videos";
  return "documents";
}

function getMimeWhitelist(kind: MediaKind) {
  if (kind === "IMAGE") {
    return ["image/jpeg", "image/png", "image/webp"];
  }

  if (kind === "VIDEO") {
    return ["video/mp4", "video/webm", "video/quicktime"];
  }

  return ["application/pdf"];
}

export function validateMediaInput(params: {
  kind: MediaKind;
  mimeType: string;
  originalFileName: string;
  size: number;
}) {
  const { kind, mimeType, originalFileName, size } = params;

  const allowed = getMimeWhitelist(kind);
  if (!allowed.includes(mimeType)) {
    throw new Error(`Invalid file type for ${kind}.`);
  }

  if (kind === "IMAGE" && size > 15 * 1024 * 1024) {
    throw new Error("Image file is too large. Maximum is 15MB.");
  }

  if (kind === "VIDEO" && size > 300 * 1024 * 1024) {
    throw new Error("Video file is too large. Maximum is 300MB.");
  }

  if (kind === "DOCUMENT" && size > 25 * 1024 * 1024) {
    throw new Error("Document file is too large. Maximum is 25MB.");
  }

  const ext = getSafeExtension(originalFileName);

  if (kind === "DOCUMENT" && ext !== "pdf") {
    throw new Error("Only PDF files are allowed for documents.");
  }
}

function bufferToUint8Array(buffer: Buffer): Uint8Array {
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

export async function storePropertyMediaFile(params: {
  propertyId: string;
  kind: MediaKind;
  tempFilePath: string;
  originalFileName: string;
  mimeType: string;
  size: number;
}): Promise<StoredMediaFile> {
  const { propertyId, kind, tempFilePath, originalFileName, mimeType, size } = params;

  validateMediaInput({ kind, mimeType, originalFileName, size });

  const fileBuffer = await fs.readFile(tempFilePath);
  const fileBytes = bufferToUint8Array(fileBuffer);

  const checksumSha256 = crypto
    .createHash("sha256")
    .update(fileBytes)
    .digest("hex");

  const fileExtension = getSafeExtension(originalFileName);
  const folder = getMediaFolder(kind);

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
  const relativeDir = path.join("properties", propertyId, folder);
  const absoluteDir = path.join(PUBLIC_UPLOAD_ROOT, relativeDir);
  const absolutePath = path.join(absoluteDir, fileName);

  await fs.mkdir(absoluteDir, { recursive: true });
  await fs.writeFile(absolutePath, fileBytes);

  const storageKey = path.posix.join(
    "uploads",
    relativeDir.replace(/\\/g, "/"),
    fileName
  );

  return {
    storageProvider: "LOCAL",
    storageBucket: null,
    storageKey,
    originalFileName,
    mimeType,
    fileExtension,
    fileSizeBytes: BigInt(size),
    checksumSha256,
  };
}