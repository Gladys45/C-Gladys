

// import Link from "next/link";
// import type { PublicListingCard } from "@/lib/listings/types";

// type Props = {
//   listing: PublicListingCard;
// };

// export default function PublicListingCard({ listing }: Props) {
//   return (
//     <Link
//       href={listing.href}
//       className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//     >
//       <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
//         <img
//           src={listing.image}
//           alt={listing.title}
//           className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
//         />
//         {listing.tag ? (
//           <div className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs text-white">
//             {listing.tag}
//           </div>
//         ) : null}
//       </div>

//       <div className="space-y-3 p-4">
//         <div className="flex items-start justify-between gap-3">
//           <h3 className="line-clamp-2 text-lg font-semibold text-neutral-900">
//             {listing.title}
//           </h3>
//           <span className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] text-neutral-700">
//             {listing.kind}
//           </span>
//         </div>

//         <p className="text-sm text-neutral-600">{listing.locationLabel}</p>

//         {(listing.bedrooms || listing.bathrooms) && (
//           <div className="flex items-center gap-3 text-sm text-neutral-600">
//             {listing.bedrooms ? <span>{listing.bedrooms} Beds</span> : null}
//             {listing.bathrooms ? <span>{listing.bathrooms} Baths</span> : null}
//           </div>
//         )}

//         <div className="flex items-center justify-between pt-1">
//           <div className="text-base font-bold text-neutral-900">
//             {listing.priceLabel}
//           </div>
//           <div className="text-xs text-neutral-500">{listing.status}</div>
//         </div>
//       </div>
//     </Link>
//   );
// }



import PublicListingCard from "@/components/listings/PublicListingCard";
import type { PublicListingCard as PublicListingCardType } from "@/lib/listings/types";

type Props = {
  listings: PublicListingCardType[];
};

export default function FeaturedListings({ listings }: Props) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">Featured Listings</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Explore selected properties from our live database.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing, index) => (
          <PublicListingCard
            key={listing.href || `${listing.title}-${index}`}
            listing={listing}
          />
        ))}
      </div>
    </section>
  );
}