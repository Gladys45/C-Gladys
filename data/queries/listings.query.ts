import type { ListingRecord, ListingSearchFilters } from "../models/listings";
import { includesText } from "../utils/text";

export function getListingBySlug(items: ListingRecord[], slug: string) {
  return items.find((p) => p.slug === slug) ?? null;
}

export function filterListings(items: ListingRecord[], filters: ListingSearchFilters) {
  return items.filter((p) => {
    // status
    if (filters.status && filters.status !== "ANY") {
      if (p.status !== filters.status) return false;
    }

    // kind
    if (filters.kind && filters.kind !== "ANY") {
      if (p.kind !== filters.kind) return false;
    }

    // market type (only for BUY)
    if (filters.marketType && filters.marketType !== "ANY") {
      if (p.status !== "BUY") return false;
      if (p.marketType !== filters.marketType) return false;
    }

    // rent type (only for RENT)
    if (filters.rentType && filters.rentType !== "ANY") {
      if (p.status !== "RENT") return false;
      if (p.rentType !== filters.rentType) return false;
    }

    // beds/baths (only for HOUSE)
    if ((filters.minBeds || filters.minBaths) && p.kind !== "HOUSE") return false;

    if (filters.minBeds) {
      const beds = p.house?.bedrooms ?? 0;
      if (beds < filters.minBeds) return false;
    }

    if (filters.minBaths) {
      const baths = p.house?.bathrooms ?? 0;
      if (baths < filters.minBaths) return false;
    }

    // price range (if price exists; for POA/off-market without price we exclude)
    if (filters.minPrice || filters.maxPrice) {
      const amount = p.price?.amount;
      if (typeof amount !== "number") return false;

      if (filters.minPrice && amount < filters.minPrice) return false;
      if (filters.maxPrice && amount > filters.maxPrice) return false;
    }

    // location text search
    if (filters.locationText) {
      const loc = [
        p.location.city,
        p.location.district,
        p.location.sector,
        p.location.province,
        p.location.country,
      ]
        .filter(Boolean)
        .join(" ");
      if (!includesText(loc, filters.locationText)) return false;
    }

    // radiusMiles/center: we will add Haversine later when you want it
    return true;
  });
}