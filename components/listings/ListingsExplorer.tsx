import PublicListingCard from "@/components/listings/PublicListingCard";
import type {
  PublicListingCard as PublicListingCardType,
  PublicListingRecord,
} from "@/lib/listings/types";

type Props = {
  cards: PublicListingCardType[];
  records: PublicListingRecord[];
};

export default function ListingsExplorer({ cards, records }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Browse Live Listings
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Browse houses and land directly from our published property database.
          </p>
        </div>

        <div className="text-sm text-neutral-500">
          {cards.length} shown · {records.length} total records
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center text-neutral-500">
          No listings available right now.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((listing, index) => (
            <PublicListingCard
              key={listing.href || `${listing.title}-${index}`}
              listing={listing}
            />
          ))}
        </div>
      )}
    </section>
  );
}