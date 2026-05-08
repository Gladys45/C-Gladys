import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import {
  getPublicProperties,
  type PublicPropertyCardItem,
  type PublicPropertyFilters,
} from "@/lib/public-properties";

import PropertySearchFilters from "@/components/properties/PropertySearchFilters";
import PublicPropertyCard from "@/components/properties/PublicPropertyCard";

// Define enums inline to avoid importing from non-existent generated prisma
const MarketType = ["ON_MARKET", "OFF_MARKET", "OFF_PLAN", "ON_PLAN"] as const;
const PropertyKind = ["HOUSE", "LAND"] as const;
const PropertyPurpose = ["SELL", "BUY", "RENT", "LETTINGS"] as const;
const RentType = ["LONG_TERM", "SHORT_STAY"] as const;

/* ================================
   CONFIG (TUNE FOR SCALE)
================================ */
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

/* ================================
   HELPERS (SAFE PARSING)
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
  valid: readonly T[]
): T | undefined {
  const v = getString(value);
  return valid.includes(v as T) ? (v as T) : undefined;
}

/* ================================
   SERVER SIDE (OPTIMIZED)
================================ */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const filters: PublicPropertyFilters = {
    search: getString(ctx.query.search),
    purpose: parseEnum(ctx.query.purpose, PropertyPurpose),
    marketType: parseEnum(ctx.query.marketType, MarketType),
    rentType: parseEnum(ctx.query.rentType, RentType),
    kind: parseEnum(ctx.query.kind, PropertyKind),
    minPrice: getString(ctx.query.minPrice),
    maxPrice: getString(ctx.query.maxPrice),
  };

  const properties = await getPublicProperties(filters);

  /* CACHE CONTROL (CRITICAL) */
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
    minPrice: filters.minPrice ?? null,
    maxPrice: filters.maxPrice ?? null,
  };

  return {
    props: {
      properties: properties ?? [],
      filters: serializableFilters,
    },
  };
};

/* ================================
   PAGE COMPONENT
================================ */
export default function PropertiesPage({
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
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-gray-500">
                {properties.length} results
              </span>

              {hasFilters && (
                <Link href="/properties" className="text-sm underline">
                  Clear filters
                </Link>
              )}
            </div>

            {properties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {properties.map((p: PublicPropertyCardItem) => (
                  <PublicPropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <h3 className="text-xl font-semibold">No properties found</h3>
                <p className="mt-2 text-gray-500">
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
