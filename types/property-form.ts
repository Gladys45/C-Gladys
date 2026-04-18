

export type PropertyKind = "HOUSE" | "LAND";
export type PropertyPurpose = "SELL" | "BUY" | "RENT" | "LETTINGS";
export type MarketType = "ON_MARKET" | "OFF_MARKET" | "OFF_PLAN" | "ON_PLAN";
export type RentType = "LONG_TERM" | "SHORT_STAY";
export type Currency = "RWF" | "USD" | "EUR" | "GBP";
export type MoneyPeriod = "MONTH" | "NIGHT" | "WEEK" | "YEAR";
export type FurnishedType = "FURNISHED" | "UNFURNISHED" | "PART_FURNISHED";
export type TitleType = "FREEHOLD" | "LEASEHOLD" | "CUSTOMARY";
export type TitleStatus = "READY" | "IN_PROCESS" | "UNKNOWN";
export type AccessRoadType = "TARMAC" | "MURRAM" | "PRIVATE" | "NONE";

export type PropertyFormValues = {
  title: string;
  kind: PropertyKind;
  purpose: PropertyPurpose;

  marketType?: MarketType | "";
  rentType?: RentType | "";

  priceAmount: string;
  priceCurrency: Currency;
  pricePeriod?: MoneyPeriod | "";
  priceOnApplication: boolean;
  description: string;

  country: string;
  city: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  lat: string;
  lng: string;

  highlights: string[];

  bedrooms: string;
  bathrooms: string;
  sizeSqm: string;
  furnished?: FurnishedType | "";
  amenities: string[];

  plotSizeSqm: string;
  zoning: string;
  titleType?: TitleType | "";
  titleStatus?: TitleStatus | "";
  accessRoad?: AccessRoadType | "";
  water: boolean;
  electricity: boolean;
  internetFiber: boolean;
  sewage: boolean;
  surveyAvailable: boolean;
  boundariesMarked: boolean;
  restrictions: string[];
};