
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

type HomePageProps = {
  properties: PublicPropertyCardItem[];
  filters: {
    search: string;
    purpose: string;
    marketType: string;
    rentType: string;
    kind: string;
    minPrice: string;
    maxPrice: string;
  };
};

function getQueryValue(value: string | string[] | undefined): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] ?? "";
  return "";
}

function parseEnumValue<T extends string>(
  value: string | string[] | undefined,
  validValues: readonly T[],
): T | "" {
  const parsed = getQueryValue(value);
  return validValues.includes(parsed as T) ? (parsed as T) : "";
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context,
) => {
  const propertyFilters: PublicPropertyFilters = {
    search: getQueryValue(context.query.search),
    purpose: parseEnumValue(
      context.query.purpose,
      Object.values(PropertyPurpose) as PropertyPurpose[],
    ),
    marketType: parseEnumValue(
      context.query.marketType,
      Object.values(MarketType) as MarketType[],
    ),
    rentType: parseEnumValue(
      context.query.rentType,
      Object.values(RentType) as RentType[],
    ),
    kind: parseEnumValue(
      context.query.kind,
      Object.values(PropertyKind) as PropertyKind[],
    ),
    minPrice: getQueryValue(context.query.minPrice),
    maxPrice: getQueryValue(context.query.maxPrice),
  };

  const properties = await getPublicProperties(propertyFilters);

  return {
    props: {
      properties: Array.isArray(properties) ? properties : [],
      filters: {
        search: propertyFilters.search ?? "",
        purpose: propertyFilters.purpose ?? "",
        marketType: propertyFilters.marketType ?? "",
        rentType: propertyFilters.rentType ?? "",
        kind: propertyFilters.kind ?? "",
        minPrice: propertyFilters.minPrice ?? "",
        maxPrice: propertyFilters.maxPrice ?? "",
      },
    },
  };
};

export default function HomePage({
  properties,
  filters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const safeProperties = Array.isArray(properties) ? properties : [];

  const hasFilters = Boolean(
    filters.search ||
      filters.purpose ||
      filters.marketType ||
      filters.rentType ||
      filters.kind ||
      filters.minPrice ||
      filters.maxPrice,
  );

  return (
    <>
      <Head>
        <title>Properties</title>
        <meta
          name="description"
          content="Browse public property listings with search and filters."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Discover Properties
            </h1>
            <p className="max-w-2xl text-gray-600">
              Browse houses and land listings with live data from your database.
            </p>
          </div>

          <div
            id="property-search-filters"
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
          >
            <PropertySearchFilters initialValues={filters} />
          </div>

          <section
            aria-labelledby="available-listings-heading"
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="available-listings-heading"
                  className="text-lg font-semibold text-gray-900"
                >
                  Available Listings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {safeProperties.length} result
                  {safeProperties.length === 1 ? "" : "s"}
                </p>
              </div>

              {hasFilters ? (
                <Link
                  href="/"
                  className="inline-flex w-fit items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Clear filters
                </Link>
              ) : null}
            </div>

            {safeProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {safeProperties.map((property) => (
                  <PublicPropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center">
                <div className="w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    No properties found
                  </h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                    We could not find any property matching your current search
                    or filter selection. Try adjusting the filters, changing the
                    price range, or clearing all filters to see more listings.
                  </p>

                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                      href="/"
                      className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      View all properties
                    </Link>

                    <a
                      href="#property-search-filters"
                      className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-white"
                    >
                      Update filters
                    </a>
                  </div>
                </div>
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}