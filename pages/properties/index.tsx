import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
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

function parseEnumValue<T extends string>(value: unknown, validValues: readonly T[]): T | "" {
  if (typeof value !== "string") return "";
  return validValues.includes(value as T) ? (value as T) : "";
}

function parseString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  const filters: PublicPropertyFilters = {
    search: parseString(context.query.search),
    purpose: parseEnumValue(context.query.purpose, Object.values(PropertyPurpose)),
    marketType: parseEnumValue(context.query.marketType, Object.values(MarketType)),
    rentType: parseEnumValue(context.query.rentType, Object.values(RentType)),
    kind: parseEnumValue(context.query.kind, Object.values(PropertyKind)),
    minPrice: parseString(context.query.minPrice),
    maxPrice: parseString(context.query.maxPrice),
  };

  const properties = await getPublicProperties(filters);

  return {
    props: {
      properties,
      filters: {
        search: filters.search ?? "",
        purpose: filters.purpose ?? "",
        marketType: filters.marketType ?? "",
        rentType: filters.rentType ?? "",
        kind: filters.kind ?? "",
        minPrice: filters.minPrice ?? "",
        maxPrice: filters.maxPrice ?? "",
      },
    },
  };
};

export default function HomePage({
  properties,
  filters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

          <div className="mb-8">
            <PropertySearchFilters initialValues={filters} />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Available Listings
            </h2>
            <p className="text-sm text-gray-500">
              {properties.length} result{properties.length === 1 ? "" : "s"}
            </p>
          </div>

          {properties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="text-lg font-semibold text-gray-900">
                No properties found
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PublicPropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}