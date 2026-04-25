

import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { requireAdminPage, type SerializableAppUser } from "@/lib/auth-guards";

type PropertyDetailsProps = {
  currentUser: SerializableAppUser;
  property: {
    id: string;
    title: string;
    description: string | null;
    kind: string;
    purpose: string;
    status: string;
    priceAmount: string | null;
    priceCurrency: string | null;
    country: string | null;
    city: string | null;
    province: string | null;
    district: string | null;
    sector: string | null;
    cell: string | null;
    village: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
  } | null;
};

const PropertyDetailsPage: NextPage<PropertyDetailsProps> = ({ property }) => {
  if (!property) {
    return (
      <main className="min-h-screen bg-[#F6F7FB] px-[30px] py-[30px]">
        <div className="rounded-[24px] bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-black">Property not found</h1>
          <div className="mt-4">
            <Link
              href="/admin?tab=properties"
              className="text-sm font-semibold text-black underline"
            >
              Back to Properties
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F7FB] px-[30px] py-[30px]">
      <div className="rounded-[24px] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-black">{property.title}</h1>

          <div className="flex gap-3">
            <Link
              href="/admin?tab=properties"
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black"
            >
              Back to Properties
            </Link>

            <Link
              href={`/admin/properties/${property.id}/edit`}
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-neutral-500">Type</p>
            <p className="font-medium text-black">{property.kind}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Purpose</p>
            <p className="font-medium text-black">{property.purpose}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Status</p>
            <p className="font-medium text-black">{property.status}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Price</p>
            <p className="font-medium text-black">
              {property.priceAmount
                ? `${property.priceCurrency ?? ""} ${property.priceAmount}`.trim()
                : "Price on request"}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-neutral-500">Description</p>
            <p className="font-medium text-black">
              {property.description || "No description available"}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-neutral-500">Address</p>
            <p className="font-medium text-black">
              {[
                property.addressLine1,
                property.addressLine2,
                property.city,
                property.district,
                property.province,
                property.country,
              ]
                .filter(Boolean)
                .join(", ") || "No address available"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authResult = await requireAdminPage(ctx);

  if ("redirect" in authResult || "notFound" in authResult) {
    return authResult;
  }

  const id = String(ctx.params?.id || "");

  const property = await prisma.property.findUnique({
    where: { id },
    include: { location: true },
  });

  return {
    props: {
      ...(authResult.props as { currentUser: SerializableAppUser }),
      property: property
        ? {
            id: property.id,
            title: property.title,
            description: property.description ?? null,
            kind: property.kind,
            purpose: property.purpose,
            status: property.status,
            priceAmount: property.priceAmount ? property.priceAmount.toString() : null,
            priceCurrency: property.priceCurrency ?? null,
            country: property.location?.country ?? null,
            city: property.location?.city ?? null,
            province: property.location?.province ?? null,
            district: property.location?.district ?? null,
            sector: property.location?.sector ?? null,
            cell: property.location?.cell ?? null,
            village: property.location?.village ?? null,
            addressLine1: property.location?.addressLine1 ?? null,
            addressLine2: property.location?.addressLine2 ?? null,
          }
        : null,
    },
  };
};

export default PropertyDetailsPage;