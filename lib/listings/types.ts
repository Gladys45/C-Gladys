// export type ListingKind = "HOUSE" | "LAND";
// export type ListingStatus = "BUY" | "RENT" | "SOLD" | "LET";
// export type MarketType = "ON_MARKET" | "OFF_MARKET";
// export type RentType = "LONG_TERM" | "SHORT_STAY";
// export type MoneyPeriod = "MONTH" | "NIGHT" | "WEEK" | "YEAR";

// export type ListingImage = {
//   id: string;
//   url: string;
//   alt?: string;
//   isCover?: boolean;
// };

// export type ListingPrice = {
//   amount: number;
//   currency: "RWF" | "USD" | "EUR" | "GBP";
//   period?: MoneyPeriod;
//   label?: string;
// };

// export type ListingLocation = {
//   country: string;
//   city?: string;
//   province?: string;
//   district?: string;
//   sector?: string;
//   cell?: string;
//   village?: string;
//   addressLine1?: string;
//   addressLine2?: string;
// };

// export type ListingHouse = {
//   bedrooms?: number;
//   bathrooms?: number;
//   sizeSqm?: number;
//   furnished?: string;
//   amenities?: string[];
// };

// export type ListingPlot = {
//   plotSizeSqm?: number;
//   zoning?: string;
//   accessRoad?: string;
//   titleType?: string;
//   titleStatus?: string;
//   surveyAvailable?: boolean;
//   boundariesMarked?: boolean;
//   utilities?: {
//     water?: boolean;
//     electricity?: boolean;
//     internetFiber?: boolean;
//     sewage?: boolean;
//   };
//   restrictions?: string[];
// };

// export type ListingRecord = {
//   id: string;
//   slug: string;
//   title: string;
//   description?: string;
//   kind: ListingKind;
//   status: ListingStatus;
//   marketType?: MarketType;
//   rentType?: RentType;
//   location: ListingLocation;
//   priceOnApplication: boolean;
//   price?: ListingPrice;
//   house?: ListingHouse;
//   plot?: ListingPlot;
//   highlights?: string[];
//   images?: ListingImage[];
// };

// export type ListingCard = {
//   id: string;
//   listingId: string;
//   href: string;
//   image: string;
//   name: string;
//   kind: ListingKind;
//   tag?: string;
//   locationLabel?: string;
//   priceLabel?: string;
//   status: ListingStatus;
// };

// export type ListingSearchFilters = {
//   status?: ListingStatus | "ANY";
//   kind?: ListingKind | "ANY";
//   marketType?: MarketType | "ANY";
//   rentType?: RentType | "ANY";
//   locationText?: string;
//   minBeds?: number;
//   minBaths?: number;
//   minPrice?: number;
//   maxPrice?: number;
// };


export type PublicListingStatus = "BUY" | "RENT" | "SOLD" | "LET";

export type PublicListingCard = {
  id: string;
  slug: string;
  href: string;
  title: string;
  image: string;
  kind: "HOUSE" | "LAND";
  status: PublicListingStatus;
  tag?: string;
  locationLabel: string;
  priceLabel: string;
  bedrooms?: number;
  bathrooms?: number;
};

export type PublicListingRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  highlights: string[];
  kind: "HOUSE" | "LAND";
  status: PublicListingStatus;
  marketType?: "ON_MARKET" | "OFF_MARKET";
  rentType?: "LONG_TERM" | "SHORT_STAY";
  location: {
    country: string;
    city?: string;
    province?: string;
    district?: string;
    sector?: string;
    cell?: string;
    village?: string;
    addressLine1?: string;
    addressLine2?: string;
  };
  price: {
    amount?: number;
    currency?: "RWF" | "USD" | "EUR" | "GBP";
    period?: "MONTH" | "NIGHT" | "WEEK" | "YEAR";
    label: string;
    priceOnApplication: boolean;
  };
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  yearBuilt?: number;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    isCover: boolean;
  }>;
  house?: {
    bedrooms?: number;
    bathrooms?: number;
    toilets?: number;
    kitchens?: number;
    lounges?: number;
    diningRooms?: number;
    sizeSqm?: number;
    plotSizeSqm?: number;
    furnished?: string;
    amenities: string[];
    hasGarden?: boolean;
    hasBalcony?: boolean;
    hasTerrace?: boolean;
    hasSwimmingPool?: boolean;
    hasInternetFiber?: boolean;
    hasElectricity?: boolean;
    hasWaterTank?: boolean;
    hasSecurity?: boolean;
  };
  plot?: {
    plotSizeSqm?: number;
    zoning?: string;
    titleType?: string;
    titleStatus?: string;
    accessRoad?: string;
    water?: boolean;
    electricity?: boolean;
    internetFiber?: boolean;
    sewage?: boolean;
    surveyAvailable?: boolean;
    boundariesMarked?: boolean;
    restrictions: string[];
  };
};

export type PublicListingFilters = {
  kind?: "ANY" | "HOUSE" | "LAND";
  status?: "ANY" | "BUY" | "RENT" | "SOLD" | "LET";
  marketType?: "ANY" | "ON_MARKET" | "OFF_MARKET";
  rentType?: "ANY" | "LONG_TERM" | "SHORT_STAY";
  locationText?: string;
  minBeds?: number;
  minBaths?: number;
  minPrice?: number;
  maxPrice?: number;
};