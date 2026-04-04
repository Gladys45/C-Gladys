"use client";

import Link from "next/link";

export type ListingItem = {
  id: number | string;
  name: string;
  img: string;
  href?: string; // if not provided we build `/categories/${name}`
};

function ListingCard({ item }: { item: ListingItem }) {
  const href = item.href ?? `/categories/${encodeURIComponent(item.name)}`;

  return (
    <Link
      href={href}
      className="relative h-[40vh] sm:hover:h-[50vh] sm:h-[45vh] hover:h-[45vh] hover:shadow-2xl rounded-sm overflow-hidden flex items-end justify-start cursor-pointer group transition-all duration-300"
    >
      <picture>
        <img
          src={item.img}
          alt={item.name}
          className="absolute w-full h-full top-0 left-0 object-cover transition-all duration-300 group-hover:scale-100"
        />
      </picture>

      <div className="absolute w-full h-full top-0 left-0 bg-black/40 group-hover:bg-black/20" />

      <div className="z-50 text-white px-6 pb-10 w-full">
        <h1 className="text-xl font-semibold mb-4">{item.name}</h1>
        <button className="px-10 text-sm py-4 rounded-md w-full bg-black" type="button">
          View listing
        </button>
      </div>
    </Link>
  );
}

export default function FeaturedListingsSection({
  id = "listings",
  title = "Featured Listings",
  items,
}: {
  id?: string;
  title?: string;
  items: ListingItem[];
}) {
  return (
    <section id={id} className="bg-[#EAEFF3]">
      <div className="max-w-7xl px-10 sm:px-6 mx-auto flex flex-col gap-10 items-center py-20">
        <h1 className="text-4xl sm:text-5xl font-semibold">{title}</h1>

        <div className="grid sm:grid-cols-2 min-h-[60vh] items-center gap-6 w-full">
          {items.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}