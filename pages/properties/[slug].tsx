// import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import Head from "next/head";
// import Link from "next/link";
// import {
//   getPublicPropertyBySlug,
//   getSimilarPublicProperties,
//   type PropertyDetailsPageData,
//   type SimilarPropertyItem,
// } from "@/lib/public-property-details";
// import PropertyFacts from "@/components/PropertyFacts";
// import PropertyGallery from "@/components/PropertyGallery";
// import SimilarPropertyCard from "@/components/SimilarPropertyCard";

// type PropertyDetailsPageProps = {
//   property: PropertyDetailsPageData | null;
//   similarProperties: SimilarPropertyItem[];
// };

// function formatPrice(
//   amount: number | null,
//   currency: string | null,
//   period?: string | null,
//   priceOnApplication?: boolean
// ) {
//   if (priceOnApplication) return "Price on application";
//   if (amount === null) return "Price on request";

//   const safeCurrency = currency ?? "USD";

//   let value = "";
//   try {
//     value = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: safeCurrency,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   } catch {
//     value = `${safeCurrency} ${amount.toLocaleString()}`;
//   }

//   return period ? `${value} / ${period.toLowerCase()}` : value;
// }

// function formatLocation(property: PropertyDetailsPageData) {
//   if (!property.location) return "Location not available";

//   const values = [
//     property.location.addressLine1,
//     property.location.district,
//     property.location.city,
//     property.location.province,
//     property.location.country,
//   ].filter(Boolean);

//   return values.join(", ");
// }

// function yesNo(value: boolean | null | undefined) {
//   if (value === true) return "Yes";
//   if (value === false) return "No";
//   return null;
// }

// export const getServerSideProps: GetServerSideProps<PropertyDetailsPageProps> = async (context) => {
//   const slug = typeof context.params?.slug === "string" ? context.params.slug : "";

//   if (!slug) {
//     return { notFound: true };
//   }

//   const property = await getPublicPropertyBySlug(slug);

//   if (!property) {
//     return { notFound: true };
//   }

//   const similarProperties = await getSimilarPublicProperties(
//     property.id,
//     property.kind,
//     property.purpose
//   );

//   return {
//     props: {
//       property,
//       similarProperties,
//     },
//   };
// };

// export default function PropertyDetailsPage({
//   property,
//   similarProperties,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   if (!property) return null;

//   const overviewFacts = [
//     { label: "Property Type", value: property.kind },
//     { label: "Purpose", value: property.purpose },
//     { label: "Bedrooms", value: property.house?.bedrooms ?? property.bedrooms },
//     { label: "Bathrooms", value: property.house?.bathrooms ?? property.bathrooms },
//     { label: "Parking", value: property.parkingSpaces },
//     { label: "Year Built", value: property.yearBuilt },
//     { label: "Rent Type", value: property.rentType },
//     { label: "Furnished", value: property.house?.furnished },
//   ];

//   const houseFacts = property.house
//     ? [
//         { label: "Size", value: property.house.sizeSqm ? `${property.house.sizeSqm} sqm` : null },
//         {
//           label: "Plot Size",
//           value: property.house.plotSizeSqm ? `${property.house.plotSizeSqm} sqm` : null,
//         },
//         { label: "Toilets", value: property.house.toilets },
//         { label: "Kitchens", value: property.house.kitchens },
//         { label: "Lounges", value: property.house.lounges },
//         { label: "Dining Rooms", value: property.house.diningRooms },
//       ]
//     : [];

//   const landFacts = property.plot
//     ? [
//         {
//           label: "Plot Size",
//           value: property.plot.plotSizeSqm ? `${property.plot.plotSizeSqm} sqm` : null,
//         },
//         { label: "Zoning", value: property.plot.zoning },
//         { label: "Title Type", value: property.plot.titleType },
//         { label: "Title Status", value: property.plot.titleStatus },
//         { label: "Access Road", value: property.plot.accessRoad },
//       ]
//     : [];

//   const featureFlags = [
//     { label: "Garden", value: yesNo(property.house?.hasGarden) },
//     { label: "Balcony", value: yesNo(property.house?.hasBalcony) },
//     { label: "Terrace", value: yesNo(property.house?.hasTerrace) },
//     { label: "Swimming Pool", value: yesNo(property.house?.hasSwimmingPool) },
//     { label: "Internet Fiber", value: yesNo(property.house?.hasInternetFiber ?? property.plot?.internetFiber) },
//     { label: "Electricity", value: yesNo(property.house?.hasElectricity ?? property.plot?.electricity) },
//     { label: "Water", value: yesNo(property.plot?.water) },
//     { label: "Sewage", value: yesNo(property.plot?.sewage) },
//     { label: "Security", value: yesNo(property.house?.hasSecurity) },
//     { label: "Water Tank", value: yesNo(property.house?.hasWaterTank) },
//     { label: "Survey Available", value: yesNo(property.plot?.surveyAvailable) },
//     { label: "Boundaries Marked", value: yesNo(property.plot?.boundariesMarked) },
//   ];

//   return (
//     <>
//       <Head>
//         <title>{property.title}</title>
//         <meta
//           name="description"
//           content={property.description || `${property.title} property details`}
//         />
//       </Head>

//       <main className="min-h-screen bg-gray-50">
//         <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
//           <div className="mb-8">
//             <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black">
//               ← Back to listings
//             </Link>
//           </div>

//           <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
//             <div className="space-y-8">
//               <PropertyGallery images={property.images} title={property.title} />

//               <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
//                 <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
//                   <div>
//                     <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
//                       {property.kind} • {property.purpose}
//                     </p>
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
//                       {property.title}
//                     </h1>
//                     <p className="mt-3 text-gray-600">{formatLocation(property)}</p>
//                   </div>

//                   <div className="rounded-2xl bg-black px-5 py-4 text-white">
//                     <p className="text-xs uppercase tracking-wide text-gray-300">Price</p>
//                     <p className="mt-1 text-2xl font-bold">
//                       {formatPrice(
//                         property.priceAmount,
//                         property.priceCurrency,
//                         property.pricePeriod,
//                         property.priceOnApplication
//                       )}
//                     </p>
//                   </div>
//                 </div>

//                 <PropertyFacts items={overviewFacts} />
//               </section>

//               <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
//                 <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
//                 <div className="mt-4 space-y-4 text-gray-700">
//                   <p>{property.description || "No description available."}</p>
//                 </div>

//                 {!!property.highlights.length && (
//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold text-gray-900">Highlights</h3>
//                     <div className="mt-4 flex flex-wrap gap-3">
//                       {property.highlights.map((highlight) => (
//                         <span
//                           key={highlight}
//                           className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
//                         >
//                           {highlight}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </section>

//               {(houseFacts.length > 0 || landFacts.length > 0) && (
//                 <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
//                   <h2 className="text-2xl font-semibold text-gray-900">Property Details</h2>
//                   <div className="mt-6 space-y-8">
//                     {!!houseFacts.length && (
//                       <div>
//                         <h3 className="mb-4 text-lg font-semibold text-gray-900">House Information</h3>
//                         <PropertyFacts items={houseFacts} />
//                       </div>
//                     )}

//                     {!!landFacts.length && (
//                       <div>
//                         <h3 className="mb-4 text-lg font-semibold text-gray-900">Land Information</h3>
//                         <PropertyFacts items={landFacts} />
//                       </div>
//                     )}
//                   </div>
//                 </section>
//               )}

//               <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
//                 <h2 className="text-2xl font-semibold text-gray-900">Features & Amenities</h2>

//                 {!!property.house?.amenities?.length && (
//                   <div className="mt-6">
//                     <h3 className="mb-4 text-lg font-semibold text-gray-900">Amenities</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {property.house.amenities.map((amenity) => (
//                         <span
//                           key={amenity}
//                           className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
//                         >
//                           {amenity}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="mt-6">
//                   <PropertyFacts items={featureFlags} />
//                 </div>

//                 {!!property.plot?.restrictions?.length && (
//                   <div className="mt-8">
//                     <h3 className="mb-4 text-lg font-semibold text-gray-900">Restrictions</h3>
//                     <ul className="list-disc space-y-2 pl-6 text-gray-700">
//                       {property.plot.restrictions.map((restriction) => (
//                         <li key={restriction}>{restriction}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </section>

//               <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
//                 <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
//                 <div className="mt-4 grid gap-4 md:grid-cols-2">
//                   <div className="space-y-3 text-gray-700">
//                     <p><span className="font-semibold text-gray-900">Country:</span> {property.location?.country || "-"}</p>
//                     <p><span className="font-semibold text-gray-900">Province:</span> {property.location?.province || "-"}</p>
//                     <p><span className="font-semibold text-gray-900">City:</span> {property.location?.city || "-"}</p>
//                     <p><span className="font-semibold text-gray-900">District:</span> {property.location?.district || "-"}</p>
//                     <p><span className="font-semibold text-gray-900">Sector:</span> {property.location?.sector || "-"}</p>
//                     <p><span className="font-semibold text-gray-900">Cell:</span> {property.location?.cell || "-"}</p>
//                     <p><span className="font-semibold text-gray-900">Village:</span> {property.location?.village || "-"}</p>
//                   </div>

//                   <div className="rounded-2xl bg-gray-100 p-6 text-gray-600">
//                     Map area placeholder
//                     <div className="mt-3 text-sm">
//                       {property.location?.lat && property.location?.lng
//                         ? `Coordinates: ${property.location.lat}, ${property.location.lng}`
//                         : "Coordinates not available"}
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {!!similarProperties.length && (
//                 <section className="space-y-6">
//                   <h2 className="text-2xl font-semibold text-gray-900">Related Properties</h2>
//                   <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//                     {similarProperties.map((item) => (
//                       <SimilarPropertyCard key={item.id} property={item} />
//                     ))}
//                   </div>
//                 </section>
//               )}
//             </div>

//             <aside className="space-y-6">
//               <div className="rounded-3xl border border-gray-200 bg-white p-6">
//                 <h2 className="text-xl font-semibold text-gray-900">Interested in this property?</h2>
//                 <p className="mt-3 text-gray-600">
//                   Contact us to request more information, schedule a visit, or discuss pricing.
//                 </p>

//                 <div className="mt-6 space-y-3">
//                   <button
//                     type="button"
//                     className="w-full rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white"
//                   >
//                     Request Information
//                   </button>

//                   <button
//                     type="button"
//                     className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-sm font-semibold text-gray-800"
//                   >
//                     Schedule Visit
//                   </button>
//                 </div>
//               </div>

//               {!!property.documents.length && (
//                 <div className="rounded-3xl border border-gray-200 bg-white p-6">
//                   <h2 className="text-xl font-semibold text-gray-900">Documents</h2>

//                   <div className="mt-4 space-y-3">
//                     {property.documents.map((doc) => (
//                       <a
//                         key={doc.id}
//                         href={doc.url || "#"}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="block rounded-2xl border border-gray-200 p-4 transition hover:border-black"
//                       >
//                         <p className="font-medium text-gray-900">
//                           {doc.title || doc.originalFileName}
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {doc.documentKind || "DOCUMENT"}
//                         </p>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {!!property.videos.length && (
//                 <div className="rounded-3xl border border-gray-200 bg-white p-6">
//                   <h2 className="text-xl font-semibold text-gray-900">Videos</h2>

//                   <div className="mt-4 space-y-3">
//                     {property.videos.map((video) => (
//                       <a
//                         key={video.id}
//                         href={video.url || "#"}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="block rounded-2xl border border-gray-200 p-4 transition hover:border-black"
//                       >
//                         <p className="font-medium text-gray-900">{video.title || "Property video"}</p>
//                         <p className="mt-1 text-sm text-gray-500">{video.caption || "Open video"}</p>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </aside>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }



import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  getPublicPropertyBySlug,
  getSimilarPublicProperties,
  type PropertyDetailsPageData,
  type SimilarPropertyItem,
} from "@/lib/public-property-details";
import PropertyFacts from "@/components/PropertyFacts";
import PropertyGallery from "@/components/PropertyGallery";
import SimilarPropertyCard from "@/components/SimilarPropertyCard";

type PropertyDetailsPageProps = {
  property: PropertyDetailsPageData | null;
  similarProperties: SimilarPropertyItem[];
};

function formatPrice(
  amount: number | null,
  currency: string | null,
  period?: string | null,
  priceOnApplication?: boolean,
) {
  if (priceOnApplication) return "Price on application";
  if (amount === null) return "Price on request";

  const safeCurrency = currency ?? "USD";

  let value = "";
  try {
    value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: safeCurrency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    value = `${safeCurrency} ${amount.toLocaleString()}`;
  }

  return period ? `${value} / ${formatEnumLabel(period)}` : value;
}

function formatLocation(property: PropertyDetailsPageData) {
  if (!property.location) return "Location not available";

  const values = [
    property.location.addressLine1,
    property.location.district,
    property.location.city,
    property.location.province,
    property.location.country,
  ].filter(Boolean);

  return values.join(", ");
}

function yesNo(value: boolean | null | undefined) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return null;
}

function formatEnumLabel(value: string | null | undefined) {
  if (!value) return null;

  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export const getServerSideProps: GetServerSideProps<
  PropertyDetailsPageProps
> = async (context) => {
  const slug =
    typeof context.params?.slug === "string" ? context.params.slug : "";

  if (!slug) {
    return { notFound: true };
  }

  const property = await getPublicPropertyBySlug(slug);

  if (!property) {
    return { notFound: true };
  }

  const similarProperties = await getSimilarPublicProperties(
    property.id,
    property.kind,
    property.purpose,
  );

  return {
    props: {
      property,
      similarProperties: Array.isArray(similarProperties)
        ? similarProperties
        : [],
    },
  };
};

export default function PropertyDetailsPage({
  property,
  similarProperties,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!property) return null;

  const safeImages = Array.isArray(property.images) ? property.images : [];
  const safeHighlights = Array.isArray(property.highlights)
    ? property.highlights
    : [];
  const safeDocuments = Array.isArray(property.documents)
    ? property.documents
    : [];
  const safeVideos = Array.isArray(property.videos) ? property.videos : [];
  const safeSimilarProperties = Array.isArray(similarProperties)
    ? similarProperties
    : [];

  const metaDescription =
    property.description?.trim() || `${property.title} property details`;

  const overviewFacts = [
    { label: "Property Type", value: formatEnumLabel(property.kind) },
    { label: "Purpose", value: formatEnumLabel(property.purpose) },
    {
      label: "Bedrooms",
      value: displayValue(property.house?.bedrooms ?? property.bedrooms),
    },
    {
      label: "Bathrooms",
      value: displayValue(property.house?.bathrooms ?? property.bathrooms),
    },
    {
      label: "Parking",
      value: displayValue(property.parkingSpaces),
    },
    {
      label: "Year Built",
      value: displayValue(property.yearBuilt),
    },
    {
      label: "Rent Type",
      value: formatEnumLabel(property.rentType),
    },
    {
      label: "Furnished",
      value: formatEnumLabel(property.house?.furnished),
    },
  ];

  const houseFacts = property.house
    ? [
        {
          label: "Size",
          value: property.house.sizeSqm
            ? `${property.house.sizeSqm} sqm`
            : null,
        },
        {
          label: "Plot Size",
          value: property.house.plotSizeSqm
            ? `${property.house.plotSizeSqm} sqm`
            : null,
        },
        {
          label: "Toilets",
          value: displayValue(property.house.toilets),
        },
        {
          label: "Kitchens",
          value: displayValue(property.house.kitchens),
        },
        {
          label: "Lounges",
          value: displayValue(property.house.lounges),
        },
        {
          label: "Dining Rooms",
          value: displayValue(property.house.diningRooms),
        },
      ]
    : [];

  const landFacts = property.plot
    ? [
        {
          label: "Plot Size",
          value: property.plot.plotSizeSqm
            ? `${property.plot.plotSizeSqm} sqm`
            : null,
        },
        {
          label: "Zoning",
          value: formatEnumLabel(property.plot.zoning),
        },
        {
          label: "Title Type",
          value: formatEnumLabel(property.plot.titleType),
        },
        {
          label: "Title Status",
          value: formatEnumLabel(property.plot.titleStatus),
        },
        {
          label: "Access Road",
          value: formatEnumLabel(property.plot.accessRoad),
        },
      ]
    : [];

  const featureFlags = [
    { label: "Garden", value: yesNo(property.house?.hasGarden) },
    { label: "Balcony", value: yesNo(property.house?.hasBalcony) },
    { label: "Terrace", value: yesNo(property.house?.hasTerrace) },
    { label: "Swimming Pool", value: yesNo(property.house?.hasSwimmingPool) },
    {
      label: "Internet Fiber",
      value: yesNo(
        property.house?.hasInternetFiber ?? property.plot?.internetFiber,
      ),
    },
    {
      label: "Electricity",
      value: yesNo(
        property.house?.hasElectricity ?? property.plot?.electricity,
      ),
    },
    { label: "Water", value: yesNo(property.plot?.water) },
    { label: "Sewage", value: yesNo(property.plot?.sewage) },
    { label: "Security", value: yesNo(property.house?.hasSecurity) },
    { label: "Water Tank", value: yesNo(property.house?.hasWaterTank) },
    { label: "Survey Available", value: yesNo(property.plot?.surveyAvailable) },
    {
      label: "Boundaries Marked",
      value: yesNo(property.plot?.boundariesMarked),
    },
  ];

  return (
    <>
      <Head>
        <title>{property.title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <main id="top" className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-500 transition hover:text-black"
            >
              ← Back to listings
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-8">
              <PropertyGallery images={safeImages} title={property.title} />

              <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                      {formatEnumLabel(property.kind)} •{" "}
                      {formatEnumLabel(property.purpose)}
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                      {property.title}
                    </h1>
                    <p className="mt-3 text-gray-600">
                      {formatLocation(property)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black px-5 py-4 text-white">
                    <p className="text-xs uppercase tracking-wide text-gray-300">
                      Price
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {formatPrice(
                        property.priceAmount,
                        property.priceCurrency,
                        property.pricePeriod,
                        property.priceOnApplication,
                      )}
                    </p>
                  </div>
                </div>

                <PropertyFacts items={overviewFacts} />
              </section>

              <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Description
                </h2>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>{property.description || "No description available."}</p>
                </div>

                {!!safeHighlights.length && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Highlights
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {safeHighlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                          {formatEnumLabel(highlight) ?? highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {(houseFacts.length > 0 || landFacts.length > 0) && (
                <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Property Details
                  </h2>
                  <div className="mt-6 space-y-8">
                    {!!houseFacts.length && (
                      <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                          House Information
                        </h3>
                        <PropertyFacts items={houseFacts} />
                      </div>
                    )}

                    {!!landFacts.length && (
                      <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                          Land Information
                        </h3>
                        <PropertyFacts items={landFacts} />
                      </div>
                    )}
                  </div>
                </section>
              )}

              <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Features & Amenities
                </h2>

                {!!property.house?.amenities?.length && (
                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Amenities
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {property.house.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                          {formatEnumLabel(amenity) ?? amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <PropertyFacts items={featureFlags} />
                </div>

                {!!property.plot?.restrictions?.length && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Restrictions
                    </h3>
                    <ul className="list-disc space-y-2 pl-6 text-gray-700">
                      {property.plot.restrictions.map((restriction) => (
                        <li key={restriction}>
                          {formatEnumLabel(restriction) ?? restriction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Location
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <span className="font-semibold text-gray-900">
                        Country:
                      </span>{" "}
                      {property.location?.country || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">
                        Province:
                      </span>{" "}
                      {property.location?.province || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">City:</span>{" "}
                      {property.location?.city || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">
                        District:
                      </span>{" "}
                      {property.location?.district || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">
                        Sector:
                      </span>{" "}
                      {property.location?.sector || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">Cell:</span>{" "}
                      {property.location?.cell || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">
                        Village:
                      </span>{" "}
                      {property.location?.village || "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-100 p-6 text-gray-600">
                    Map area placeholder
                    <div className="mt-3 text-sm">
                      {property.location?.lat && property.location?.lng
                        ? `Coordinates: ${property.location.lat}, ${property.location.lng}`
                        : "Coordinates not available"}
                    </div>
                  </div>
                </div>
              </section>

              {!!safeSimilarProperties.length && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Related Properties
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {safeSimilarProperties.map((item) => (
                      <SimilarPropertyCard key={item.id} property={item} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Interested in this property?
                </h2>
                <p className="mt-3 text-gray-600">
                  Contact us to request more information, schedule a visit, or
                  discuss pricing.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white"
                  >
                    Request Information
                  </button>

                  <button
                    type="button"
                    className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-sm font-semibold text-gray-800"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>

              {!!safeDocuments.length && (
                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Documents
                  </h2>

                  <div className="mt-4 space-y-3">
                    {safeDocuments.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-2xl border border-gray-200 p-4 transition hover:border-black"
                      >
                        <p className="font-medium text-gray-900">
                          {doc.title || doc.originalFileName}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {formatEnumLabel(doc.documentKind) || "Document"}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {!!safeVideos.length && (
                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                  <h2 className="text-xl font-semibold text-gray-900">Videos</h2>

                  <div className="mt-4 space-y-3">
                    {safeVideos.map((video) => (
                      <a
                        key={video.id}
                        href={video.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-2xl border border-gray-200 p-4 transition hover:border-black"
                      >
                        <p className="font-medium text-gray-900">
                          {video.title || "Property video"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {video.caption || "Open video"}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}