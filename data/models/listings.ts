export type Currency = "RWF" | "USD" | "EUR" | "GBP";

export type ListingKind = "HOUSE" | "LAND";

// House status “tabs”
export type ListingStatus = "BUY" | "RENT" | "SOLD" | "LET";

// Buy filters
export type MarketType = "ON_MARKET" | "OFF_MARKET" | "OFF_PLAN" | "ON_PLAN";

// Rent filters
export type RentType = "LONG_TERM" | "SHORT_STAY";

export type Location = {
  country: string;
  city?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;

  // for radius search later
  lat?: number;
  lng?: number;
};

export type Money = {
  amount: number; // numeric for filtering
  currency: Currency;
  // for rent/short stay pricing
  period?: "MONTH" | "NIGHT" | "WEEK" | "YEAR";
  label?: string; // optional formatted label
};

// LAND “plots” details (requested)
export type PlotDetails = {
  plotSizeSqm: number;
  zoning?: string;
  titleType?: "FREEHOLD" | "LEASEHOLD" | "CUSTOMARY";
  titleStatus?: "READY" | "IN_PROCESS" | "UNKNOWN";
  accessRoad?: "TARMAC" | "MURRAM" | "PRIVATE" | "NONE";
  utilities?: {
    water?: boolean;
    electricity?: boolean;
    internetFiber?: boolean;
    sewage?: boolean;
  };
  surveyAvailable?: boolean;
  boundariesMarked?: boolean;
  restrictions?: string[];
};

export type ListingImage = {
  id: string;
  url: string;
  alt?: string;
  isCover?: boolean;
};

/**
 * Full “database record” (like a real property record).
 * This is what you open on details page.
 */
export type ListingRecord = {
  id: string;
  slug: string;
  title: string;

  kind: ListingKind;
  status: ListingStatus;

  // Only meaningful when status === "BUY"
  marketType?: MarketType;

  // Only meaningful when status === "RENT"
  rentType?: RentType;

  location: Location;

  // optional (Off-market / POA)
  price?: Money;
  priceOnApplication?: boolean;

  description?: string;
  highlights?: string[];

  images: ListingImage[];

  // House details
  house?: {
    bedrooms?: number;
    bathrooms?: number;
    sizeSqm?: number;
    furnished?: "FURNISHED" | "UNFURNISHED" | "PART_FURNISHED";
    amenities?: string[];
  };

  // Land details
  plot?: PlotDetails;

  createdAtISO?: string;
  updatedAtISO?: string;
};

/**
 * Lightweight card model (for grids / home page).
 * This is what your components map over.
 */
export type ListingCard = {
  id: string;
  name: string;
  image: string;
  href: string;
  tag?: string;

  kind: ListingKind;
  status: ListingStatus;

  priceLabel?: string;
  locationLabel?: string;

  listingId: string; // link card -> record
};

export type ListingSearchFilters = {
  status?: ListingStatus | "ANY";
  kind?: ListingKind | "ANY";

  // Buy market
  marketType?: MarketType | "ANY";

  // Rent type
  rentType?: RentType | "ANY";

  minBeds?: number;
  minBaths?: number;

  minPrice?: number;
  maxPrice?: number;

  // location search (simple text)
  locationText?: string;

  // radius search (later — requires lat/lng)
  radiusMiles?: number;
  center?: { lat: number; lng: number };
};