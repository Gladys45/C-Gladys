/*
  Warnings:

  - A unique constraint covering the columns `[storageKey,checksumSha256]` on the table `PropertyMedia` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "idx_house_amenities";

-- DropIndex
DROP INDEX "idx_plot_restrictions";

-- DropIndex
DROP INDEX "idx_active_properties";

-- DropIndex
DROP INDEX "idx_featured_properties";

-- DropIndex
DROP INDEX "PropertyMedia_checksumSha256_key";

-- DropIndex
DROP INDEX "PropertyMedia_storageKey_key";

-- CreateIndex
CREATE UNIQUE INDEX "PropertyMedia_storageKey_checksumSha256_key" ON "PropertyMedia"("storageKey", "checksumSha256");

-- RenameIndex
ALTER INDEX "idx_house_bed_bath" RENAME TO "HouseDetails_bedrooms_bathrooms_idx";

-- RenameIndex
ALTER INDEX "idx_house_furnished" RENAME TO "HouseDetails_furnished_idx";

-- RenameIndex
ALTER INDEX "idx_house_plot_size" RENAME TO "HouseDetails_plotSizeSqm_idx";

-- RenameIndex
ALTER INDEX "idx_house_size" RENAME TO "HouseDetails_sizeSqm_idx";

-- RenameIndex
ALTER INDEX "idx_plot_access" RENAME TO "PlotDetails_accessRoad_titleStatus_idx";

-- RenameIndex
ALTER INDEX "idx_plot_size" RENAME TO "PlotDetails_plotSizeSqm_idx";

-- RenameIndex
ALTER INDEX "idx_plot_title" RENAME TO "PlotDetails_titleType_titleStatus_idx";

-- RenameIndex
ALTER INDEX "idx_plot_zoning" RENAME TO "PlotDetails_zoning_idx";

-- RenameIndex
ALTER INDEX "idx_property_agent_published" RENAME TO "Property_agentId_publishedAt_idx";

-- RenameIndex
ALTER INDEX "idx_property_agent_status" RENAME TO "Property_agentId_status_idx";

-- RenameIndex
ALTER INDEX "idx_property_bed_bath" RENAME TO "Property_bedrooms_bathrooms_idx";

-- RenameIndex
ALTER INDEX "idx_property_featured_published" RENAME TO "Property_isFeatured_publishedAt_idx";

-- RenameIndex
ALTER INDEX "idx_property_kind_purpose_status" RENAME TO "Property_kind_purpose_status_idx";

-- RenameIndex
ALTER INDEX "idx_property_market_status" RENAME TO "Property_marketType_status_idx";

-- RenameIndex
ALTER INDEX "idx_property_price_currency" RENAME TO "Property_priceCurrency_priceAmount_idx";

-- RenameIndex
ALTER INDEX "idx_property_price_purpose" RENAME TO "Property_purpose_priceAmount_idx";

-- RenameIndex
ALTER INDEX "idx_property_search" RENAME TO "Property_purpose_status_isPubliclyVisible_isSearchable_visi_idx";

-- RenameIndex
ALTER INDEX "idx_property_status_published" RENAME TO "Property_status_publishedAt_idx";

-- RenameIndex
ALTER INDEX "idx_property_visibility_status" RENAME TO "Property_visibility_status_idx";

-- RenameIndex
ALTER INDEX "idx_location_city_district" RENAME TO "PropertyLocation_city_district_idx";

-- RenameIndex
ALTER INDEX "idx_location_district_sector" RENAME TO "PropertyLocation_district_sector_idx";

-- RenameIndex
ALTER INDEX "idx_location_full" RENAME TO "PropertyLocation_country_city_district_sector_idx";

-- RenameIndex
ALTER INDEX "idx_media_cover" RENAME TO "PropertyMedia_propertyId_isCover_sortOrder_idx";

-- RenameIndex
ALTER INDEX "idx_media_property_kind_public" RENAME TO "PropertyMedia_propertyId_kind_isPublic_idx";

-- RenameIndex
ALTER INDEX "idx_media_property_public_sort" RENAME TO "PropertyMedia_propertyId_isPublic_sortOrder_idx";

-- RenameIndex
ALTER INDEX "idx_media_storage" RENAME TO "PropertyMedia_storageProvider_storageBucket_idx";

-- RenameIndex
ALTER INDEX "idx_media_video" RENAME TO "PropertyMedia_propertyId_isPrimaryVideo_idx";

-- RenameIndex
ALTER INDEX "idx_user_active_created" RENAME TO "User_isActive_createdAt_idx";

-- RenameIndex
ALTER INDEX "idx_user_role_active" RENAME TO "User_role_isActive_idx";

-- RenameIndex
ALTER INDEX "idx_user_role_created" RENAME TO "User_role_createdAt_idx";
