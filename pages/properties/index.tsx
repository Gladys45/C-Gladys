
// import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import Head from "next/head";
// import Link from "next/link";
// import {
//   MarketType,
//   PropertyKind,
//   PropertyPurpose,
//   RentType,
// } from "@/lib/generated/prisma";
// import {
//   getPublicProperties,
//   type PublicPropertyCardItem,
//   type PublicPropertyFilters,
// } from "@/lib/public-properties";
// import PropertySearchFilters from "@/components/properties/PropertySearchFilters";
// import PublicPropertyCard from "@/components/properties/PublicPropertyCard";

// type HomePageProps = {
//   properties: PublicPropertyCardItem[];
//   filters: {
//     search: string;
//     purpose: string;
//     marketType: string;
//     rentType: string;
//     kind: string;
//     minPrice: string;
//     maxPrice: string;
//   };
// };

// function getQueryValue(value: string | string[] | undefined): string {
//   if (typeof value === "string") return value;
//   if (Array.isArray(value)) return value[0] ?? "";
//   return "";
// }

// function parseEnumValue<T extends string>(
//   value: string | string[] | undefined,
//   validValues: readonly T[],
// ): T | "" {
//   const parsed = getQueryValue(value);
//   return validValues.includes(parsed as T) ? (parsed as T) : "";
// }

// export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
//   context,
// ) => {
//   const propertyFilters: PublicPropertyFilters = {
//     search: getQueryValue(context.query.search),
//     purpose: parseEnumValue(
//       context.query.purpose,
//       Object.values(PropertyPurpose) as PropertyPurpose[],
//     ),
//     marketType: parseEnumValue(
//       context.query.marketType,
//       Object.values(MarketType) as MarketType[],
//     ),
//     rentType: parseEnumValue(
//       context.query.rentType,
//       Object.values(RentType) as RentType[],
//     ),
//     kind: parseEnumValue(
//       context.query.kind,
//       Object.values(PropertyKind) as PropertyKind[],
//     ),
//     minPrice: getQueryValue(context.query.minPrice),
//     maxPrice: getQueryValue(context.query.maxPrice),
//   };

//   const properties = await getPublicProperties(propertyFilters);

//   return {
//     props: {
//       properties: Array.isArray(properties) ? properties : [],
//       filters: {
//         search: propertyFilters.search ?? "",
//         purpose: propertyFilters.purpose ?? "",
//         marketType: propertyFilters.marketType ?? "",
//         rentType: propertyFilters.rentType ?? "",
//         kind: propertyFilters.kind ?? "",
//         minPrice: propertyFilters.minPrice ?? "",
//         maxPrice: propertyFilters.maxPrice ?? "",
//       },
//     },
//   };
// };

// export default function HomePage({
//   properties,
//   filters,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   const safeProperties = Array.isArray(properties) ? properties : [];

//   const hasFilters = Boolean(
//     filters.search ||
//       filters.purpose ||
//       filters.marketType ||
//       filters.rentType ||
//       filters.kind ||
//       filters.minPrice ||
//       filters.maxPrice,
//   );

//   return (
//     <>
//       <Head>
//         <title>Properties</title>
//         <meta
//           name="description"
//           content="Browse public property listings with search and filters."
//         />
//       </Head>

//       <main className="min-h-screen bg-gray-50">
//         <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
//           <div className="mb-8 space-y-3">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
//               Discover Properties
//             </h1>
//             <p className="max-w-2xl text-gray-600">
//               Browse houses and land listings with live data from your database.
//             </p>
//           </div>

//           <div
//             id="property-search-filters"
//             className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
//           >
//             <PropertySearchFilters initialValues={filters} />
//           </div>

//           <section
//             aria-labelledby="available-listings-heading"
//             className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
//           >
//             <div className="mb-6 flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <h2
//                   id="available-listings-heading"
//                   className="text-lg font-semibold text-gray-900"
//                 >
//                   Available Listings
//                 </h2>
//                 <p className="mt-1 text-sm text-gray-500">
//                   {safeProperties.length} result
//                   {safeProperties.length === 1 ? "" : "s"}
//                 </p>
//               </div>

//               {hasFilters ? (
//                 <Link
//                   href="/"
//                   className="inline-flex w-fit items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//                 >
//                   Clear filters
//                 </Link>
//               ) : null}
//             </div>

//             {safeProperties.length > 0 ? (
//               <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//                 {safeProperties.map((property) => (
//                   <PublicPropertyCard key={property.id} property={property} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex min-h-[320px] items-center justify-center">
//                 <div className="w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     No properties found
//                   </h3>
//                   <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
//                     We could not find any property matching your current search
//                     or filter selection. Try adjusting the filters, changing the
//                     price range, or clearing all filters to see more listings.
//                   </p>

//                   <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
//                     <Link
//                       href="/"
//                       className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
//                     >
//                       View all properties
//                     </Link>

//                     <a
//                       href="#property-search-filters"
//                       className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-white"
//                     >
//                       Update filters
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>
//         </section>
//       </main>
//     </>
//   );
// }


import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  MarketType,
  PropertyKind,
  PropertyPurpose,
  RentType,
} from "@/lib/generated/prisma";

import {
  getPublicProperties,
  type PublicPropertyCardItem,
  type PublicPropertyFilters,
} from "@/lib/public-properties";

import PropertySearchFilters from "@/components/properties/PropertySearchFilters";
import PublicPropertyCard from "@/components/properties/PublicPropertyCard";

/* ================================
   🔧 CONFIG (TUNE FOR SCALE)
================================ */
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

/* ================================
   🔧 HELPERS (SAFE PARSING)
================================ */
function getString(value: string | string[] | undefined): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value[0]?.trim() ?? "";
  return "";
}

function getNumber(value: string | string[] | undefined): number | undefined {
  const v = getString(value);
  const n = Number(v);
  return isNaN(n) ? undefined : n;
}

function parseEnum<T extends string>(
  value: string | string[] | undefined,
  valid: readonly T[],
): T | undefined {
  const v = getString(value);
  return valid.includes(v as T) ? (v as T) : undefined;
}

/* ================================
   🔥 SERVER SIDE (OPTIMIZED)
================================ */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = Math.max(1, getNumber(ctx.query.page) ?? 1);
  const limit = Math.min(MAX_LIMIT, getNumber(ctx.query.limit) ?? DEFAULT_LIMIT);
  const skip = (page - 1) * limit;

  const filters: PublicPropertyFilters = {
    search: getString(ctx.query.search),
    purpose: parseEnum(
      ctx.query.purpose,
      Object.values(PropertyPurpose),
    ),
    marketType: parseEnum(
      ctx.query.marketType,
      Object.values(MarketType),
    ),
    rentType: parseEnum(
      ctx.query.rentType,
      Object.values(RentType),
    ),
    kind: parseEnum(
      ctx.query.kind,
      Object.values(PropertyKind),
    ),
    minPrice: getNumber(ctx.query.minPrice),
    maxPrice: getNumber(ctx.query.maxPrice),
    skip,
    take: limit,
  };

  /* 🔥 PARALLEL FETCH (SCALE SAFE) */
  const [properties] = await Promise.all([
    getPublicProperties(filters),
  ]);

  /* ⚡ CACHE CONTROL (CRITICAL) */
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );

  // Create a serializable filters object (no undefined values)
  const serializableFilters = {
    search: filters.search ?? null,
    purpose: filters.purpose ?? null,
    marketType: filters.marketType ?? null,
    rentType: filters.rentType ?? null,
    kind: filters.kind ?? null,
    minPrice: filters.minPrice?.toString() ?? null,
    maxPrice: filters.maxPrice?.toString() ?? null,
  };

  return {
    props: {
      properties: properties ?? [],
      pagination: {
        page,
        limit,
        hasMore: properties.length === limit,
      },
      filters: serializableFilters,
    },
  };
};

/* ================================
   🧠 PAGE COMPONENT
================================ */
export default function HomePage({
  properties = [],
  filters = {
    search: null,
    purpose: null,
    marketType: null,
    rentType: null,
    kind: null,
    minPrice: null,
    maxPrice: null,
  },
  pagination = { page: 1, limit: DEFAULT_LIMIT, hasMore: false },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const hasFilters = Boolean(
    filters.search ||
    filters.purpose ||
    filters.marketType ||
    filters.rentType ||
    filters.kind ||
    filters.minPrice ||
    filters.maxPrice
  );

  return (
    <>
      <Head>
        <title>Discover Properties | Real Estate</title>
        <meta
          name="description"
          content="Browse high-quality property listings with advanced filters and real-time data."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-10">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Discover Properties</h1>
            <p className="text-gray-600">
              Smart search powered by optimized backend.
            </p>
          </div>

          {/* FILTERS */}
          <div className="mb-6 rounded-xl border bg-white p-4">
            <PropertySearchFilters initialValues={filters} />
          </div>

          {/* LIST */}
          <section className="rounded-2xl border bg-white p-6">

            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500">
                {properties.length} results
              </span>

              {hasFilters && (
                <Link href="/" className="text-sm underline">
                  Clear filters
                </Link>
              )}
            </div>

            {properties.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {properties.map((p) => (
                    <PublicPropertyCard key={p.id} property={p} />
                  ))}
                </div>

                {/* 🔥 PAGINATION */}
                <div className="mt-8 flex justify-center gap-4">

                  {pagination.page > 1 && (
                    <Link
                      href={`?page=${pagination.page - 1}`}
                      className="px-4 py-2 border rounded"
                    >
                      Previous
                    </Link>
                  )}

                  {pagination.hasMore && (
                    <Link
                      href={`?page=${pagination.page + 1}`}
                      className="px-4 py-2 border rounded"
                    >
                      Next
                    </Link>
                  )}

                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold">
                  No properties found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting filters or clearing search.
                </p>
              </div>
            )}

          </section>
        </section>
      </main>
    </>
  );
}