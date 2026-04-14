"use client";
import Link from "next/link";
import type { SimilarPropertyItem } from "@/lib/public-property-details";

type SimilarPropertyCardProps = {
  property: SimilarPropertyItem;
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

export default function SimilarPropertyCard({ property }: SimilarPropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="h-56 bg-gray-100">
        {property.coverImage ? (
          <img
            src={property.coverImage}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            No image
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>

        <p className="text-sm text-gray-500">
          {[property.district, property.city].filter(Boolean).join(", ")}
        </p>

        <p className="text-lg font-bold text-gray-900">
          {formatPrice(property.priceAmount, property.priceCurrency)}
        </p>

        <Link
          href={`/properties/${property.slug}`}
          className="inline-flex rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}