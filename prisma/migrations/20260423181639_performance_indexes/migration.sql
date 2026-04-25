-- -- AlterEnum
-- -- This migration adds more than one value to an enum.
-- -- With PostgreSQL versions 11 and earlier, this is not possible
-- -- in a single migration. This can be worked around by creating
-- -- multiple migrations, each migration adding only one value to
-- -- the enum.


-- ALTER TYPE "MarketType" ADD VALUE 'OFF_PLAN';
-- ALTER TYPE "MarketType" ADD VALUE 'ON_PLAN';

-- -- DropIndex
-- DROP INDEX "PlotDetails_accessRoad_idx";

-- -- DropIndex
-- DROP INDEX "PlotDetails_titleStatus_idx";

-- -- DropIndex
-- DROP INDEX "PlotDetails_titleType_idx";

-- -- DropIndex
-- DROP INDEX "Property_agentId_idx";

-- -- DropIndex
-- DROP INDEX "Property_isFeatured_idx";

-- -- DropIndex
-- DROP INDEX "Property_isPubliclyVisible_idx";

-- -- DropIndex
-- DROP INDEX "Property_isSearchable_idx";

-- -- DropIndex
-- DROP INDEX "Property_kind_idx";

-- -- DropIndex
-- DROP INDEX "Property_marketType_idx";

-- -- DropIndex
-- DROP INDEX "Property_publishedAt_idx";

-- -- DropIndex
-- DROP INDEX "Property_purpose_idx";

-- -- DropIndex
-- DROP INDEX "Property_referenceCode_idx";

-- -- DropIndex
-- DROP INDEX "Property_rentType_idx";

-- -- DropIndex
-- DROP INDEX "Property_slug_idx";

-- -- DropIndex
-- DROP INDEX "Property_status_idx";

-- -- DropIndex
-- DROP INDEX "Property_visibility_idx";

-- -- DropIndex
-- DROP INDEX "PropertyLocation_city_idx";

-- -- DropIndex
-- DROP INDEX "PropertyLocation_country_idx";

-- -- DropIndex
-- DROP INDEX "PropertyLocation_district_idx";

-- -- DropIndex
-- DROP INDEX "PropertyLocation_postalCode_idx";

-- -- DropIndex
-- DROP INDEX "PropertyLocation_province_idx";

-- -- DropIndex
-- DROP INDEX "PropertyLocation_sector_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_documentKind_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_imageCategory_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_isCover_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_isPrimaryVideo_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_isPublic_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_kind_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_propertyId_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_propertyId_isCover_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_propertyId_kind_sortOrder_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_sortOrder_idx";

-- -- DropIndex
-- DROP INDEX "PropertyMedia_uploadedAt_idx";

-- -- DropIndex
-- DROP INDEX "User_authUserId_idx";

-- -- DropIndex
-- DROP INDEX "User_email_idx";

-- -- DropIndex
-- DROP INDEX "User_isActive_idx";

-- -- DropIndex
-- DROP INDEX "User_role_idx";

-- -- CreateIndex
-- CREATE INDEX "HouseDetails_bedrooms_bathrooms_idx" ON "HouseDetails"("bedrooms", "bathrooms");

-- -- CreateIndex
-- CREATE INDEX "HouseDetails_sizeSqm_idx" ON "HouseDetails"("sizeSqm");

-- -- CreateIndex
-- CREATE INDEX "HouseDetails_plotSizeSqm_idx" ON "HouseDetails"("plotSizeSqm");

-- -- CreateIndex
-- CREATE INDEX "HouseDetails_furnished_idx" ON "HouseDetails"("furnished");

-- -- CreateIndex
-- CREATE INDEX "PlotDetails_titleType_titleStatus_idx" ON "PlotDetails"("titleType", "titleStatus");

-- -- CreateIndex
-- CREATE INDEX "PlotDetails_accessRoad_titleStatus_idx" ON "PlotDetails"("accessRoad", "titleStatus");

-- -- CreateIndex
-- CREATE INDEX "PlotDetails_plotSizeSqm_idx" ON "PlotDetails"("plotSizeSqm");

-- -- CreateIndex
-- CREATE INDEX "PlotDetails_zoning_idx" ON "PlotDetails"("zoning");

-- -- CreateIndex
-- CREATE INDEX "Property_purpose_status_isPubliclyVisible_isSearchable_visi_idx" ON "Property"("purpose", "status", "isPubliclyVisible", "isSearchable", "visibility");

-- -- CreateIndex
-- CREATE INDEX "Property_status_publishedAt_idx" ON "Property"("status", "publishedAt" DESC);

-- -- CreateIndex
-- CREATE INDEX "Property_purpose_publishedAt_idx" ON "Property"("purpose", "publishedAt" DESC);

-- -- CreateIndex
-- CREATE INDEX "Property_isFeatured_publishedAt_idx" ON "Property"("isFeatured", "publishedAt" DESC);

-- -- CreateIndex
-- CREATE INDEX "Property_priceCurrency_priceAmount_idx" ON "Property"("priceCurrency", "priceAmount");

-- -- CreateIndex
-- CREATE INDEX "Property_purpose_priceAmount_idx" ON "Property"("purpose", "priceAmount");

-- -- CreateIndex
-- CREATE INDEX "Property_kind_purpose_status_idx" ON "Property"("kind", "purpose", "status");

-- -- CreateIndex
-- CREATE INDEX "Property_bedrooms_bathrooms_idx" ON "Property"("bedrooms", "bathrooms");

-- -- CreateIndex
-- CREATE INDEX "Property_agentId_status_idx" ON "Property"("agentId", "status");

-- -- CreateIndex
-- CREATE INDEX "Property_agentId_publishedAt_idx" ON "Property"("agentId", "publishedAt");

-- -- CreateIndex
-- CREATE INDEX "Property_marketType_status_idx" ON "Property"("marketType", "status");

-- -- CreateIndex
-- CREATE INDEX "Property_visibility_status_idx" ON "Property"("visibility", "status");

-- -- CreateIndex
-- CREATE INDEX "PropertyLocation_country_city_district_sector_idx" ON "PropertyLocation"("country", "city", "district", "sector");

-- -- CreateIndex
-- CREATE INDEX "PropertyLocation_city_district_idx" ON "PropertyLocation"("city", "district");

-- -- CreateIndex
-- CREATE INDEX "PropertyLocation_district_sector_idx" ON "PropertyLocation"("district", "sector");

-- -- CreateIndex
-- CREATE INDEX "PropertyMedia_propertyId_isPublic_sortOrder_idx" ON "PropertyMedia"("propertyId", "isPublic", "sortOrder");

-- -- CreateIndex
-- CREATE INDEX "PropertyMedia_propertyId_kind_isPublic_idx" ON "PropertyMedia"("propertyId", "kind", "isPublic");

-- -- CreateIndex
-- CREATE INDEX "PropertyMedia_propertyId_isCover_sortOrder_idx" ON "PropertyMedia"("propertyId", "isCover", "sortOrder");

-- -- CreateIndex
-- CREATE INDEX "PropertyMedia_propertyId_isPrimaryVideo_idx" ON "PropertyMedia"("propertyId", "isPrimaryVideo");

-- -- CreateIndex
-- CREATE INDEX "PropertyMedia_storageProvider_storageBucket_idx" ON "PropertyMedia"("storageProvider", "storageBucket");

-- -- CreateIndex
-- CREATE INDEX "User_role_isActive_idx" ON "User"("role", "isActive");

-- -- CreateIndex
-- CREATE INDEX "User_isActive_createdAt_idx" ON "User"("isActive", "createdAt");

-- -- CreateIndex
-- CREATE INDEX "User_role_createdAt_idx" ON "User"("role", "createdAt");
-- ========================================
-- ENUM UPDATE
-- ========================================

ALTER TYPE "MarketType" ADD VALUE IF NOT EXISTS 'OFF_PLAN';
ALTER TYPE "MarketType" ADD VALUE IF NOT EXISTS 'ON_PLAN';

-- ========================================
-- DROP OLD/REDUNDANT INDEXES
-- ========================================

DROP INDEX IF EXISTS "PlotDetails_accessRoad_idx";
DROP INDEX IF EXISTS "PlotDetails_titleStatus_idx";
DROP INDEX IF EXISTS "PlotDetails_titleType_idx";

DROP INDEX IF EXISTS "Property_agentId_idx";
DROP INDEX IF EXISTS "Property_isFeatured_idx";
DROP INDEX IF EXISTS "Property_isPubliclyVisible_idx";
DROP INDEX IF EXISTS "Property_isSearchable_idx";
DROP INDEX IF EXISTS "Property_kind_idx";
DROP INDEX IF EXISTS "Property_marketType_idx";
DROP INDEX IF EXISTS "Property_publishedAt_idx";
DROP INDEX IF EXISTS "Property_purpose_idx";
DROP INDEX IF EXISTS "Property_referenceCode_idx";
DROP INDEX IF EXISTS "Property_rentType_idx";
DROP INDEX IF EXISTS "Property_slug_idx";
DROP INDEX IF EXISTS "Property_status_idx";
DROP INDEX IF EXISTS "Property_visibility_idx";

DROP INDEX IF EXISTS "PropertyLocation_city_idx";
DROP INDEX IF EXISTS "PropertyLocation_country_idx";
DROP INDEX IF EXISTS "PropertyLocation_district_idx";
DROP INDEX IF EXISTS "PropertyLocation_postalCode_idx";
DROP INDEX IF EXISTS "PropertyLocation_province_idx";
DROP INDEX IF EXISTS "PropertyLocation_sector_idx";

DROP INDEX IF EXISTS "PropertyMedia_documentKind_idx";
DROP INDEX IF EXISTS "PropertyMedia_imageCategory_idx";
DROP INDEX IF EXISTS "PropertyMedia_isCover_idx";
DROP INDEX IF EXISTS "PropertyMedia_isPrimaryVideo_idx";
DROP INDEX IF EXISTS "PropertyMedia_isPublic_idx";
DROP INDEX IF EXISTS "PropertyMedia_kind_idx";
DROP INDEX IF EXISTS "PropertyMedia_propertyId_idx";
DROP INDEX IF EXISTS "PropertyMedia_propertyId_isCover_idx";
DROP INDEX IF EXISTS "PropertyMedia_propertyId_kind_sortOrder_idx";
DROP INDEX IF EXISTS "PropertyMedia_sortOrder_idx";
DROP INDEX IF EXISTS "PropertyMedia_uploadedAt_idx";

DROP INDEX IF EXISTS "User_authUserId_idx";
DROP INDEX IF EXISTS "User_email_idx";
DROP INDEX IF EXISTS "User_isActive_idx";
DROP INDEX IF EXISTS "User_role_idx";

-- ========================================
-- USER INDEXES
-- ========================================

CREATE INDEX IF NOT EXISTS idx_user_role_active 
ON "User"(role, "isActive");

CREATE INDEX IF NOT EXISTS idx_user_active_created 
ON "User"("isActive", "createdAt");

CREATE INDEX IF NOT EXISTS idx_user_role_created 
ON "User"(role, "createdAt");

-- ========================================
-- PROPERTY INDEXES (CORE ENGINE)
-- ========================================

-- 🔥 SEARCH
CREATE INDEX IF NOT EXISTS idx_property_search 
ON "Property"(purpose, status, "isPubliclyVisible", "isSearchable", visibility);

-- ⚡ SORTING
CREATE INDEX IF NOT EXISTS idx_property_status_published 
ON "Property"(status, "publishedAt" DESC);

CREATE INDEX IF NOT EXISTS idx_property_purpose_published 
ON "Property"(purpose, "publishedAt" DESC);

CREATE INDEX IF NOT EXISTS idx_property_featured_published 
ON "Property"("isFeatured", "publishedAt" DESC);

-- 💰 PRICE
CREATE INDEX IF NOT EXISTS idx_property_price_currency 
ON "Property"("priceCurrency", "priceAmount");

CREATE INDEX IF NOT EXISTS idx_property_price_purpose 
ON "Property"(purpose, "priceAmount");

-- 🏠 FILTERS
CREATE INDEX IF NOT EXISTS idx_property_kind_purpose_status 
ON "Property"(kind, purpose, status);

CREATE INDEX IF NOT EXISTS idx_property_bed_bath 
ON "Property"(bedrooms, bathrooms);

-- 👤 AGENT
CREATE INDEX IF NOT EXISTS idx_property_agent_status 
ON "Property"("agentId", status);

CREATE INDEX IF NOT EXISTS idx_property_agent_published 
ON "Property"("agentId", "publishedAt");

-- 🌍 MARKET / VISIBILITY
CREATE INDEX IF NOT EXISTS idx_property_market_status 
ON "Property"("marketType", status);

CREATE INDEX IF NOT EXISTS idx_property_visibility_status 
ON "Property"(visibility, status);

-- 📊 TIMELINE
CREATE INDEX IF NOT EXISTS idx_property_created 
ON "Property"("createdAt");

-- ========================================
-- LOCATION INDEXES
-- ========================================

CREATE INDEX IF NOT EXISTS idx_location_full 
ON "PropertyLocation"(country, city, district, sector);

CREATE INDEX IF NOT EXISTS idx_location_city_district 
ON "PropertyLocation"(city, district);

CREATE INDEX IF NOT EXISTS idx_location_district_sector 
ON "PropertyLocation"(district, sector);

-- ========================================
-- MEDIA INDEXES
-- ========================================

CREATE INDEX IF NOT EXISTS idx_media_property_public_sort 
ON "PropertyMedia"("propertyId", "isPublic", "sortOrder");

CREATE INDEX IF NOT EXISTS idx_media_property_kind_public 
ON "PropertyMedia"("propertyId", kind, "isPublic");

CREATE INDEX IF NOT EXISTS idx_media_cover 
ON "PropertyMedia"("propertyId", "isCover", "sortOrder");

CREATE INDEX IF NOT EXISTS idx_media_video 
ON "PropertyMedia"("propertyId", "isPrimaryVideo");

CREATE INDEX IF NOT EXISTS idx_media_storage 
ON "PropertyMedia"("storageProvider", "storageBucket");

-- ========================================
-- HOUSE DETAILS
-- ========================================

CREATE INDEX IF NOT EXISTS idx_house_bed_bath 
ON "HouseDetails"(bedrooms, bathrooms);

CREATE INDEX IF NOT EXISTS idx_house_size 
ON "HouseDetails"("sizeSqm");

CREATE INDEX IF NOT EXISTS idx_house_plot_size 
ON "HouseDetails"("plotSizeSqm");

CREATE INDEX IF NOT EXISTS idx_house_furnished 
ON "HouseDetails"(furnished);

-- ========================================
-- PLOT DETAILS
-- ========================================

CREATE INDEX IF NOT EXISTS idx_plot_title 
ON "PlotDetails"("titleType", "titleStatus");

CREATE INDEX IF NOT EXISTS idx_plot_access 
ON "PlotDetails"("accessRoad", "titleStatus");

CREATE INDEX IF NOT EXISTS idx_plot_size 
ON "PlotDetails"("plotSizeSqm");

CREATE INDEX IF NOT EXISTS idx_plot_zoning 
ON "PlotDetails"(zoning);

-- ========================================
-- ADVANCED PERFORMANCE INDEXES
-- ========================================

-- 🔍 FULL-TEXT SEARCH
CREATE INDEX IF NOT EXISTS idx_property_fulltext 
ON "Property"
USING GIN (
  to_tsvector('english', title || ' ' || COALESCE(description, ''))
);

-- 🌍 GEO SEARCH
CREATE INDEX IF NOT EXISTS idx_geo_location 
ON "PropertyLocation"
USING GIST (point(lng, lat));

-- 🧠 ARRAY SEARCH
CREATE INDEX IF NOT EXISTS idx_house_amenities 
ON "HouseDetails"
USING GIN (amenities);

CREATE INDEX IF NOT EXISTS idx_plot_restrictions 
ON "PlotDetails"
USING GIN (restrictions);

-- ⚡ PARTIAL INDEXES
CREATE INDEX IF NOT EXISTS idx_active_properties 
ON "Property"("publishedAt" DESC)
WHERE status = 'ACTIVE';

CREATE INDEX IF NOT EXISTS idx_public_properties 
ON "Property"(purpose, "publishedAt" DESC)
WHERE "isPubliclyVisible" = true;

CREATE INDEX IF NOT EXISTS idx_featured_properties 
ON "Property"("publishedAt" DESC)
WHERE "isFeatured" = true;