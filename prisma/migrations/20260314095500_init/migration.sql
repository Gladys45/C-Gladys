/*
  Warnings:

  - You are about to drop the column `alt` on the `PropertyMedia` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `PropertyMedia` table. All the data in the column will be lost.
  - You are about to drop the column `mediaKind` on the `PropertyMedia` table. All the data in the column will be lost.
  - You are about to drop the column `sourceType` on the `PropertyMedia` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `PropertyMedia` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `PropertyMedia` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referenceCode]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storageKey]` on the table `PropertyMedia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[checksumSha256]` on the table `PropertyMedia` will be added. If there are existing duplicate values, this will fail.
  - Made the column `marketType` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fileExtension` to the `PropertyMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind` to the `PropertyMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalFileName` to the `PropertyMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageKey` to the `PropertyMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageProvider` to the `PropertyMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PropertyMedia` table without a default value. This is not possible if the table is not empty.
  - Made the column `mimeType` on table `PropertyMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileSizeBytes` on table `PropertyMedia` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ListingVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'HIDDEN');

-- CreateEnum
CREATE TYPE "DocumentKind" AS ENUM ('BROCHURE', 'FLOOR_PLAN', 'TITLE_DEED', 'OTHER');

-- CreateEnum
CREATE TYPE "ImageCategory" AS ENUM ('COVER', 'GALLERY', 'INTERIOR', 'EXTERIOR', 'BEDROOM', 'BATHROOM', 'KITCHEN', 'LIVING_ROOM', 'DINING', 'AMENITY', 'MAP', 'OTHER');

-- CreateEnum
CREATE TYPE "FileStorageProvider" AS ENUM ('LOCAL', 'S3', 'R2', 'SUPABASE', 'MINIO');

-- AlterEnum
ALTER TYPE "MediaKind" ADD VALUE 'DOCUMENT';

-- DropIndex
DROP INDEX "PropertyMedia_mediaKind_idx";

-- DropIndex
DROP INDEX "PropertyMedia_sourceType_idx";

-- AlterTable
ALTER TABLE "HouseDetails" ADD COLUMN     "diningRooms" INTEGER,
ADD COLUMN     "hasBalcony" BOOLEAN,
ADD COLUMN     "hasElectricity" BOOLEAN,
ADD COLUMN     "hasGarden" BOOLEAN,
ADD COLUMN     "hasInternetFiber" BOOLEAN,
ADD COLUMN     "hasSecurity" BOOLEAN,
ADD COLUMN     "hasSwimmingPool" BOOLEAN,
ADD COLUMN     "hasTerrace" BOOLEAN,
ADD COLUMN     "hasWaterTank" BOOLEAN,
ADD COLUMN     "kitchens" INTEGER,
ADD COLUMN     "lounges" INTEGER,
ADD COLUMN     "plotSizeSqm" DECIMAL(12,2),
ADD COLUMN     "toilets" INTEGER;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "agentId" TEXT,
ADD COLUMN     "allowBrochureDownload" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowPublicInquiry" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "bathrooms" INTEGER,
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPubliclyVisible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSearchable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "parkingSpaces" INTEGER,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "referenceCode" TEXT,
ADD COLUMN     "showExactLocation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "PropertyStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "visibility" "ListingVisibility" NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "yearBuilt" INTEGER,
ALTER COLUMN "marketType" SET NOT NULL,
ALTER COLUMN "marketType" SET DEFAULT 'ON_MARKET';

-- AlterTable
ALTER TABLE "PropertyLocation" ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "postalCode" TEXT;

-- AlterTable
ALTER TABLE "PropertyMedia" DROP COLUMN "alt",
DROP COLUMN "fileName",
DROP COLUMN "mediaKind",
DROP COLUMN "sourceType",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "url",
ADD COLUMN     "altText" TEXT,
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "checksumSha256" TEXT,
ADD COLUMN     "documentKind" "DocumentKind",
ADD COLUMN     "fileExtension" TEXT NOT NULL,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "imageCategory" "ImageCategory",
ADD COLUMN     "isDownloadable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPrimaryVideo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "kind" "MediaKind" NOT NULL,
ADD COLUMN     "originalFileName" TEXT NOT NULL,
ADD COLUMN     "pageCount" INTEGER,
ADD COLUMN     "storageBucket" TEXT,
ADD COLUMN     "storageKey" TEXT NOT NULL,
ADD COLUMN     "storageProvider" "FileStorageProvider" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uploadedByUserId" TEXT,
ADD COLUMN     "width" INTEGER,
ALTER COLUMN "mimeType" SET NOT NULL,
ALTER COLUMN "fileSizeBytes" SET NOT NULL,
ALTER COLUMN "fileSizeBytes" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phoneNumber" TEXT;

-- DropEnum
DROP TYPE "MediaSourceType";

-- CreateIndex
CREATE UNIQUE INDEX "Property_referenceCode_key" ON "Property"("referenceCode");

-- CreateIndex
CREATE INDEX "Property_referenceCode_idx" ON "Property"("referenceCode");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_visibility_idx" ON "Property"("visibility");

-- CreateIndex
CREATE INDEX "Property_agentId_idx" ON "Property"("agentId");

-- CreateIndex
CREATE INDEX "Property_isFeatured_idx" ON "Property"("isFeatured");

-- CreateIndex
CREATE INDEX "Property_isSearchable_idx" ON "Property"("isSearchable");

-- CreateIndex
CREATE INDEX "Property_isPubliclyVisible_idx" ON "Property"("isPubliclyVisible");

-- CreateIndex
CREATE INDEX "Property_publishedAt_idx" ON "Property"("publishedAt");

-- CreateIndex
CREATE INDEX "PropertyLocation_province_idx" ON "PropertyLocation"("province");

-- CreateIndex
CREATE INDEX "PropertyLocation_postalCode_idx" ON "PropertyLocation"("postalCode");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyMedia_storageKey_key" ON "PropertyMedia"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyMedia_checksumSha256_key" ON "PropertyMedia"("checksumSha256");

-- CreateIndex
CREATE INDEX "PropertyMedia_kind_idx" ON "PropertyMedia"("kind");

-- CreateIndex
CREATE INDEX "PropertyMedia_documentKind_idx" ON "PropertyMedia"("documentKind");

-- CreateIndex
CREATE INDEX "PropertyMedia_imageCategory_idx" ON "PropertyMedia"("imageCategory");

-- CreateIndex
CREATE INDEX "PropertyMedia_isPrimaryVideo_idx" ON "PropertyMedia"("isPrimaryVideo");

-- CreateIndex
CREATE INDEX "PropertyMedia_isPublic_idx" ON "PropertyMedia"("isPublic");

-- CreateIndex
CREATE INDEX "PropertyMedia_uploadedAt_idx" ON "PropertyMedia"("uploadedAt");

-- CreateIndex
CREATE INDEX "PropertyMedia_propertyId_kind_sortOrder_idx" ON "PropertyMedia"("propertyId", "kind", "sortOrder");

-- CreateIndex
CREATE INDEX "PropertyMedia_propertyId_isCover_idx" ON "PropertyMedia"("propertyId", "isCover");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
