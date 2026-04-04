-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('RWF', 'USD', 'EUR', 'GBP');

-- CreateEnum
CREATE TYPE "PropertyKind" AS ENUM ('HOUSE', 'LAND');

-- CreateEnum
CREATE TYPE "PropertyPurpose" AS ENUM ('SELL', 'BUY', 'RENT', 'LETTINGS');

-- CreateEnum
CREATE TYPE "MarketType" AS ENUM ('ON_MARKET', 'OFF_MARKET');

-- CreateEnum
CREATE TYPE "RentType" AS ENUM ('LONG_TERM', 'SHORT_STAY');

-- CreateEnum
CREATE TYPE "MoneyPeriod" AS ENUM ('MONTH', 'NIGHT', 'WEEK', 'YEAR');

-- CreateEnum
CREATE TYPE "FurnishedType" AS ENUM ('FURNISHED', 'UNFURNISHED', 'PART_FURNISHED');

-- CreateEnum
CREATE TYPE "TitleType" AS ENUM ('FREEHOLD', 'LEASEHOLD', 'CUSTOMARY');

-- CreateEnum
CREATE TYPE "TitleStatus" AS ENUM ('READY', 'IN_PROCESS', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "AccessRoadType" AS ENUM ('TARMAC', 'MURRAM', 'PRIVATE', 'NONE');

-- CreateEnum
CREATE TYPE "MediaKind" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "MediaSourceType" AS ENUM ('FILE', 'EXTERNAL_LINK');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "kind" "PropertyKind" NOT NULL,
    "purpose" "PropertyPurpose" NOT NULL,
    "marketType" "MarketType",
    "rentType" "RentType",
    "priceAmount" DECIMAL(18,2),
    "priceCurrency" "Currency",
    "pricePeriod" "MoneyPeriod",
    "priceLabel" TEXT,
    "priceOnApplication" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "highlights" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyLocation" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "province" TEXT,
    "district" TEXT,
    "sector" TEXT,
    "cell" TEXT,
    "village" TEXT,
    "lat" DECIMAL(10,7),
    "lng" DECIMAL(10,7),

    CONSTRAINT "PropertyLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyMedia" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "mediaKind" "MediaKind" NOT NULL,
    "sourceType" "MediaSourceType" NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "title" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "fileName" TEXT,
    "mimeType" TEXT,
    "fileSizeBytes" INTEGER,
    "thumbnailUrl" TEXT,
    "durationSec" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseDetails" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "sizeSqm" DECIMAL(10,2),
    "furnished" "FurnishedType",
    "amenities" TEXT[],

    CONSTRAINT "HouseDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlotDetails" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "plotSizeSqm" DECIMAL(12,2) NOT NULL,
    "zoning" TEXT,
    "titleType" "TitleType",
    "titleStatus" "TitleStatus",
    "accessRoad" "AccessRoadType",
    "water" BOOLEAN,
    "electricity" BOOLEAN,
    "internetFiber" BOOLEAN,
    "sewage" BOOLEAN,
    "surveyAvailable" BOOLEAN,
    "boundariesMarked" BOOLEAN,
    "restrictions" TEXT[],

    CONSTRAINT "PlotDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_slug_idx" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_kind_idx" ON "Property"("kind");

-- CreateIndex
CREATE INDEX "Property_purpose_idx" ON "Property"("purpose");

-- CreateIndex
CREATE INDEX "Property_marketType_idx" ON "Property"("marketType");

-- CreateIndex
CREATE INDEX "Property_rentType_idx" ON "Property"("rentType");

-- CreateIndex
CREATE INDEX "Property_createdAt_idx" ON "Property"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyLocation_propertyId_key" ON "PropertyLocation"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyLocation_country_idx" ON "PropertyLocation"("country");

-- CreateIndex
CREATE INDEX "PropertyLocation_city_idx" ON "PropertyLocation"("city");

-- CreateIndex
CREATE INDEX "PropertyLocation_district_idx" ON "PropertyLocation"("district");

-- CreateIndex
CREATE INDEX "PropertyLocation_sector_idx" ON "PropertyLocation"("sector");

-- CreateIndex
CREATE INDEX "PropertyMedia_propertyId_idx" ON "PropertyMedia"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyMedia_mediaKind_idx" ON "PropertyMedia"("mediaKind");

-- CreateIndex
CREATE INDEX "PropertyMedia_sourceType_idx" ON "PropertyMedia"("sourceType");

-- CreateIndex
CREATE INDEX "PropertyMedia_isCover_idx" ON "PropertyMedia"("isCover");

-- CreateIndex
CREATE INDEX "PropertyMedia_sortOrder_idx" ON "PropertyMedia"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "HouseDetails_propertyId_key" ON "HouseDetails"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PlotDetails_propertyId_key" ON "PlotDetails"("propertyId");

-- CreateIndex
CREATE INDEX "PlotDetails_titleType_idx" ON "PlotDetails"("titleType");

-- CreateIndex
CREATE INDEX "PlotDetails_titleStatus_idx" ON "PlotDetails"("titleStatus");

-- CreateIndex
CREATE INDEX "PlotDetails_accessRoad_idx" ON "PlotDetails"("accessRoad");

-- AddForeignKey
ALTER TABLE "PropertyLocation" ADD CONSTRAINT "PropertyLocation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyMedia" ADD CONSTRAINT "PropertyMedia_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseDetails" ADD CONSTRAINT "HouseDetails_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlotDetails" ADD CONSTRAINT "PlotDetails_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
