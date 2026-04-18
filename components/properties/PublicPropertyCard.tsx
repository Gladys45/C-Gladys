

import Link from "next/link";
import Image from "next/image";
import type { PublicPropertyCardItem } from "@/lib/public-properties";

type PublicPropertyCardProps = {
  property: PublicPropertyCardItem;
};

function formatPrice(amount: number | null, currency: string | null) {
  if (amount === null) return "Price on request";

  const safeCurrency = currency ?? "USD";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: safeCurrency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${safeCurrency} ${amount.toLocaleString()}`;
  }
}

function formatLocation(property: PublicPropertyCardItem) {
  return [property.district, property.city].filter(Boolean).join(", ") || property.country;
}

function formatSize(property: PublicPropertyCardItem) {
  if (property.kind === "HOUSE" && property.sizeSqm) {
    return `${property.sizeSqm.toLocaleString()} sqm`;
  }

  if (property.kind === "LAND" && property.plotSizeSqm) {
    return `${property.plotSizeSqm.toLocaleString()} sqm`;
  }

  if (property.plotSizeSqm) {
    return `${property.plotSizeSqm.toLocaleString()} sqm`;
  }

  return "Size not specified";
}

export default function PublicPropertyCard({ property }: PublicPropertyCardProps) {
  const isOffMarket = property.marketType === "OFF_MARKET";
  
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Image Container with Blur for OFF_MARKET */}
      <div className="relative h-64 w-full bg-gray-100">
        {property.coverImage ? (
          <>
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={property.coverImage}
                alt={property.coverImageAlt || property.title}
                fill
                className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                  isOffMarket ? "blur-md" : ""
                }`}
              />
            </div>
            
            {isOffMarket && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="bg-black/80 text-white px-6 py-3 rounded-lg font-bold text-xl tracking-wider transform -rotate-12 border-2 border-white/50">
                  OFF MARKET
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            No image available
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white">
          {property.purpose}
        </div>

        {/* Price Badge - only show for ON_MARKET properties */}
        {property.priceAmount && !isOffMarket && (
          <div className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
            <span className="text-sm font-bold">
              {formatPrice(property.priceAmount, property.priceCurrency)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {property.title}
          </h3>

          <p className="text-sm text-gray-500">{formatLocation(property)}</p>

          {/* Price display - different styling for OFF_MARKET */}
          {isOffMarket ? (
            <p className="text-lg font-semibold text-gray-400 line-through">
              {formatPrice(property.priceAmount, property.priceCurrency)}
            </p>
          ) : (
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(property.priceAmount, property.priceCurrency)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm text-gray-700">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Beds</p>
            <p className="font-semibold">{property.bedrooms ?? "-"}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Baths</p>
            <p className="font-semibold">{property.bathrooms ?? "-"}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Size</p>
            <p className="font-semibold">{formatSize(property)}</p>
          </div>
        </div>

        <div>
          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}