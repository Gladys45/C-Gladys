// import type { ListingCard } from "@/lib/listings/types";
// import Link from "next/link";

// function ListingCardUI({ card }: { card: ListingCard }) {
//   return (
//     <Link
//       href={card.href}
//       className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
//     >
//       <div className="relative h-52 w-full overflow-hidden">
//         <img
//           src={card.image}
//           alt={card.name}
//           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
//         />
//         <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

//         {card.tag ? (
//           <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
//             {card.tag}
//           </div>
//         ) : null}
//       </div>

//       <div className="flex flex-col gap-2 p-4">
//         <div className="flex items-start justify-between gap-3">
//           <h3 className="leading-snug font-semibold text-neutral-900">
//             {card.name}
//           </h3>
//           <span className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] text-neutral-700">
//             {card.kind}
//           </span>
//         </div>

//         {card.locationLabel ? (
//           <p className="text-sm text-neutral-600">{card.locationLabel}</p>
//         ) : null}

//         <div className="flex items-center justify-between pt-2">
//           <div className="text-sm font-medium text-neutral-900">
//             {card.priceLabel ?? "POA"}
//           </div>
//           <div className="text-xs text-neutral-600">{card.status}</div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ListingGrid({ cards }: { cards: ListingCard[] }) {
//   if (!cards.length) {
//     return (
//       <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-neutral-700">
//         No listings available.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {cards.map((card) => (
//         <ListingCardUI key={card.id} card={card} />
//       ))}
//     </div>
//   );
// }
