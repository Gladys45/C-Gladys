// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import type { ListingRecord } from "@/data";

// function Pill({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
//       {children}
//     </span>
//   );
// }

// function Row({ label, value }: { label: string; value: React.ReactNode }) {
//   return (
//     <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-2">
//       <div className="text-sm text-neutral-600">{label}</div>
//       <div className="text-sm font-semibold text-neutral-900 text-right">
//         {value}
//       </div>
//     </div>
//   );
// }

// function formatLocation(p: ListingRecord) {
//   return [
//     p.location.city,
//     p.location.district,
//     p.location.sector,
//     p.location.province,
//     p.location.country,
//   ]
//     .filter(Boolean)
//     .join(", ");
// }

// function formatPrice(p: ListingRecord) {
//   if (p.priceOnApplication) return "POA";
//   if (!p.price) return "Price not provided";
//   if (p.price.label) return p.price.label;
//   const base = `${p.price.currency} ${p.price.amount.toLocaleString()}`;
//   return p.price.period ? `${base} / ${p.price.period.toLowerCase()}` : base;
// }

// export default function PropertyDetails({ property }: { property: ListingRecord }) {
//   const images = property.images ?? [];
//   const cover = images.find((i) => i.isCover)?.url ?? images[0]?.url ?? "";

//   const [activeImage, setActiveImage] = useState<string>(cover);

//   const pills = useMemo(() => {
//     const arr: string[] = [];
//     arr.push(property.kind);
//     arr.push(property.status);

//     if (property.status === "BUY" && property.marketType) {
//       arr.push(property.marketType === "ON_MARKET" ? "On Market" : "Off Market");
//     }

//     if (property.status === "RENT" && property.rentType) {
//       arr.push(property.rentType === "LONG_TERM" ? "Long Term" : "Short Stay");
//     }

//     return arr;
//   }, [property]);

//   const locationLabel = formatLocation(property);
//   const priceLabel = formatPrice(property);

//   return (
//     <section className="bg-white">
//       <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8">
//         {/* Top bar */}
//         <div className="flex items-center justify-between gap-4">
//           <Link
//             href="/"
//             className="text-sm text-neutral-700 hover:text-black underline underline-offset-4"
//           >
//             Back
//           </Link>

//           <div className="flex flex-wrap items-center gap-2">
//             {pills.map((p, idx) => (
//               <Pill key={`${p}-${idx}`}>{p}</Pill>
//             ))}
//           </div>
//         </div>

//         {/* Title + price */}
//         <div className="flex flex-col gap-2">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900">
//             {property.title}
//           </h1>
//           <p className="text-neutral-600">{locationLabel}</p>
//           <div className="text-xl font-semibold text-neutral-900">
//             {priceLabel}
//           </div>
//         </div>

//         {/* Gallery */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           {/* Main image */}
//           <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-neutral-200">
//             {activeImage ? (
//               <img
//                 src={activeImage}
//                 alt={property.title}
//                 className="h-[380px] w-full object-cover"
//               />
//             ) : (
//               <div className="h-[380px] w-full bg-neutral-100" />
//             )}
//           </div>

//           {/* Thumbnails */}
//           <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
//             {images.slice(0, 4).map((img) => {
//               const isActive = img.url === activeImage;
//               return (
//                 <button
//                   type="button"
//                   key={img.id}
//                   onClick={() => setActiveImage(img.url)}
//                   className={[
//                     "overflow-hidden rounded-2xl border transition text-left",
//                     isActive ? "border-black" : "border-neutral-200 hover:border-neutral-400",
//                   ].join(" ")}
//                   aria-label="Select image"
//                 >
//                   <img
//                     src={img.url}
//                     alt={img.alt ?? property.title}
//                     className="h-[180px] w-full object-cover"
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Content + Sidebar */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main */}
//           <div className="lg:col-span-2 flex flex-col gap-6">
//             {/* Description */}
//             <div className="rounded-2xl border border-neutral-200 p-5">
//               <h2 className="text-lg font-semibold text-neutral-900">Overview</h2>
//               <p className="mt-3 text-neutral-700 leading-relaxed">
//                 {property.description ?? "No description added yet."}
//               </p>
//             </div>

//             {/* Highlights */}
//             {property.highlights?.length ? (
//               <div className="rounded-2xl border border-neutral-200 p-5">
//                 <h2 className="text-lg font-semibold text-neutral-900">Highlights</h2>
//                 <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
//                   {property.highlights.map((h, idx) => (
//                     <li key={idx}>{h}</li>
//                   ))}
//                 </ul>
//               </div>
//             ) : null}

//             {/* House details */}
//             {property.kind === "HOUSE" ? (
//               <div className="rounded-2xl border border-neutral-200 p-5">
//                 <h2 className="text-lg font-semibold text-neutral-900">
//                   House details
//                 </h2>

//                 <div className="mt-4">
//                   <Row label="Bedrooms" value={property.house?.bedrooms ?? "—"} />
//                   <Row label="Bathrooms" value={property.house?.bathrooms ?? "—"} />
//                   <Row
//                     label="Size"
//                     value={property.house?.sizeSqm ? `${property.house.sizeSqm} sqm` : "—"}
//                   />
//                   <Row label="Furnished" value={property.house?.furnished ?? "—"} />
//                 </div>

//                 {property.house?.amenities?.length ? (
//                   <>
//                     <h3 className="mt-5 text-sm font-semibold text-neutral-900">
//                       Amenities
//                     </h3>
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       {property.house.amenities.map((a, idx) => (
//                         <Pill key={idx}>{a}</Pill>
//                       ))}
//                     </div>
//                   </>
//                 ) : null}
//               </div>
//             ) : null}

//             {/* Land details */}
//             {property.kind === "LAND" ? (
//               <div className="rounded-2xl border border-neutral-200 p-5">
//                 <h2 className="text-lg font-semibold text-neutral-900">
//                   Plot details
//                 </h2>

//                 <div className="mt-4">
//                   <Row label="Plot size" value={property.plot?.plotSizeSqm ? `${property.plot.plotSizeSqm} sqm` : "—"} />
//                   <Row label="Zoning" value={property.plot?.zoning ?? "—"} />
//                   <Row label="Access road" value={property.plot?.accessRoad ?? "—"} />
//                   <Row label="Title type" value={property.plot?.titleType ?? "—"} />
//                   <Row label="Title status" value={property.plot?.titleStatus ?? "—"} />
//                   <Row label="Survey" value={property.plot?.surveyAvailable ? "Available" : "Not available"} />
//                   <Row label="Boundaries marked" value={property.plot?.boundariesMarked ? "Yes" : "No"} />
//                 </div>

//                 {property.plot?.utilities ? (
//                   <>
//                     <h3 className="mt-5 text-sm font-semibold text-neutral-900">
//                       Utilities
//                     </h3>
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       <Pill>Water: {property.plot.utilities.water ? "Yes" : "No"}</Pill>
//                       <Pill>Electricity: {property.plot.utilities.electricity ? "Yes" : "No"}</Pill>
//                       <Pill>Fiber: {property.plot.utilities.internetFiber ? "Yes" : "No"}</Pill>
//                       <Pill>Sewage: {property.plot.utilities.sewage ? "Yes" : "No"}</Pill>
//                     </div>
//                   </>
//                 ) : null}

//                 {property.plot?.restrictions?.length ? (
//                   <>
//                     <h3 className="mt-5 text-sm font-semibold text-neutral-900">
//                       Restrictions
//                     </h3>
//                     <ul className="mt-2 list-disc pl-5 text-neutral-700 space-y-1">
//                       {property.plot.restrictions.map((r, idx) => (
//                         <li key={idx}>{r}</li>
//                       ))}
//                     </ul>
//                   </>
//                 ) : null}
//               </div>
//             ) : null}
//           </div>

//           {/* Sidebar */}
//           <aside className="lg:col-span-1">
//             <div className="rounded-2xl border border-neutral-200 p-5 sticky top-6">
//               <h3 className="text-lg font-semibold text-neutral-900">Request info</h3>
//               <p className="mt-2 text-sm text-neutral-600">
//                 Leave your details and we’ll contact you about this listing.
//               </p>

//               <div className="mt-4 flex flex-col gap-2">
//                 <input
//                   className="rounded-lg border border-neutral-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
//                   placeholder="Full name"
//                 />
//                 <input
//                   className="rounded-lg border border-neutral-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
//                   placeholder="Email"
//                 />
//                 <input
//                   className="rounded-lg border border-neutral-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
//                   placeholder="Phone"
//                 />
//                 <button
//                   type="button"
//                   className="mt-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90"
//                 >
//                   Submit request
//                 </button>
//               </div>

//               <div className="mt-5 text-xs text-neutral-500">
//                 Reference:{" "}
//                 <span className="font-medium text-neutral-700">{property.id}</span>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicListingRecord } from "@/lib/listings/types";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-2">
      <div className="text-sm text-neutral-600">{label}</div>
      <div className="text-right text-sm font-semibold text-neutral-900">
        {value}
      </div>
    </div>
  );
}

function formatLocation(property: PublicListingRecord) {
  return [
    property.location.city,
    property.location.district,
    property.location.sector,
    property.location.province,
    property.location.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function PublicPropertyDetails({
  property,
}: {
  property: PublicListingRecord;
}) {
  const cover =
    property.images.find((img) => img.isCover)?.url ||
    property.images[0]?.url ||
    "";

  const [activeImage, setActiveImage] = useState<string>(cover);

  const pills = useMemo(() => {
    const items: string[] = [];
    items.push(property.kind);
    items.push(property.status);

    if (property.status === "BUY" && property.marketType) {
      items.push(property.marketType === "ON_MARKET" ? "On Market" : "Off Market");
    }

    if (property.status === "RENT" && property.rentType) {
      items.push(property.rentType === "LONG_TERM" ? "Long Term" : "Short Stay");
    }

    return items;
  }, [property]);

  const locationLabel = formatLocation(property);

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm text-neutral-700 underline underline-offset-4 hover:text-black"
          >
            Back to home
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {pills.map((item, idx) => (
              <Pill key={`${item}-${idx}`}>{item}</Pill>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            {property.title}
          </h1>
          <p className="text-neutral-600">{locationLabel}</p>
          <div className="text-xl font-semibold text-neutral-900">
            {property.price.label}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 lg:col-span-2">
            {activeImage ? (
              <img
                src={activeImage}
                alt={property.title}
                className="h-[380px] w-full object-cover"
              />
            ) : (
              <div className="h-[380px] w-full bg-neutral-100" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {property.images.slice(0, 4).map((img) => {
              const active = img.url === activeImage;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImage(img.url)}
                  className={`overflow-hidden rounded-2xl border text-left transition ${
                    active ? "border-black" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="h-[180px] w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-neutral-200 p-5">
              <h2 className="text-lg font-semibold text-neutral-900">Overview</h2>
              <p className="mt-3 leading-relaxed text-neutral-700">
                {property.description || "No description added yet."}
              </p>
            </div>

            {property.highlights.length ? (
              <div className="rounded-2xl border border-neutral-200 p-5">
                <h2 className="text-lg font-semibold text-neutral-900">Highlights</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
                  {property.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {property.kind === "HOUSE" ? (
              <div className="rounded-2xl border border-neutral-200 p-5">
                <h2 className="text-lg font-semibold text-neutral-900">House details</h2>

                <div className="mt-4">
                  <Row label="Bedrooms" value={property.house?.bedrooms ?? "—"} />
                  <Row label="Bathrooms" value={property.house?.bathrooms ?? "—"} />
                  <Row
                    label="Size"
                    value={property.house?.sizeSqm ? `${property.house.sizeSqm} sqm` : "—"}
                  />
                  <Row label="Furnished" value={property.house?.furnished ?? "—"} />
                </div>

                {property.house?.amenities?.length ? (
                  <>
                    <h3 className="mt-5 text-sm font-semibold text-neutral-900">
                      Amenities
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {property.house.amenities.map((item, idx) => (
                        <Pill key={idx}>{item}</Pill>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}

            {property.kind === "LAND" ? (
              <div className="rounded-2xl border border-neutral-200 p-5">
                <h2 className="text-lg font-semibold text-neutral-900">Plot details</h2>

                <div className="mt-4">
                  <Row
                    label="Plot size"
                    value={property.plot?.plotSizeSqm ? `${property.plot.plotSizeSqm} sqm` : "—"}
                  />
                  <Row label="Zoning" value={property.plot?.zoning ?? "—"} />
                  <Row label="Access road" value={property.plot?.accessRoad ?? "—"} />
                  <Row label="Title type" value={property.plot?.titleType ?? "—"} />
                  <Row label="Title status" value={property.plot?.titleStatus ?? "—"} />
                  <Row
                    label="Survey"
                    value={property.plot?.surveyAvailable ? "Available" : "Not available"}
                  />
                  <Row
                    label="Boundaries marked"
                    value={property.plot?.boundariesMarked ? "Yes" : "No"}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-neutral-200 p-5">
              <h3 className="text-lg font-semibold text-neutral-900">Request info</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Leave your details and we’ll contact you about this property.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <input
                  className="rounded-lg border border-neutral-200 px-3 py-2"
                  placeholder="Full name"
                />
                <input
                  className="rounded-lg border border-neutral-200 px-3 py-2"
                  placeholder="Email"
                />
                <input
                  className="rounded-lg border border-neutral-200 px-3 py-2"
                  placeholder="Phone"
                />
                <button
                  type="button"
                  className="mt-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90"
                >
                  Submit request
                </button>
              </div>

              <div className="mt-5 text-xs text-neutral-500">
                Reference:{" "}
                <span className="font-medium text-neutral-700">{property.id}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}