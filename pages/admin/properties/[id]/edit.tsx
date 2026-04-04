// import type { GetServerSideProps, NextPage } from "next";
// import Link from "next/link";
// import prisma from "@/lib/prisma";
// import { requireAdminPage, type SerializableAppUser } from "@/lib/auth-guards";

// type EditPropertyPageProps = {
//   currentUser: SerializableAppUser;
//   property: {
//     id: string;
//     title: string;
//     description: string | null;
//     kind: string;
//     purpose: string;
//     status: string;
//     priceAmount: string | null;
//     priceCurrency: string | null;
//   } | null;
// };

// const EditPropertyPage: NextPage<EditPropertyPageProps> = ({ property }) => {
//   if (!property) {
//     return (
//       <main className="min-h-screen bg-[#F6F7FB] px-[30px] py-[30px]">
//         <div className="rounded-[24px] bg-white p-6 shadow-sm">
//           <h1 className="text-xl font-bold text-black">Property not found</h1>
//           <Link href="/admin" className="mt-4 inline-block text-sm font-semibold underline">
//             Back to dashboard
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#F6F7FB] px-[30px] py-[30px]">
//       <div className="rounded-[24px] bg-white p-6 shadow-sm">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-black">Edit Property</h1>
//           <Link
//             href={`/admin/properties/${property.id}`}
//             className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black"
//           >
//             Cancel
//           </Link>
//         </div>

//         <form className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div className="md:col-span-2">
//             <label className="mb-2 block text-sm font-semibold text-black">Title</label>
//             <input
//               defaultValue={property.title}
//               className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-semibold text-black">Type</label>
//             <input
//               defaultValue={property.kind}
//               className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-semibold text-black">Purpose</label>
//             <input
//               defaultValue={property.purpose}
//               className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-semibold text-black">Status</label>
//             <input
//               defaultValue={property.status}
//               className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-semibold text-black">Price</label>
//             <input
//               defaultValue={property.priceAmount ?? ""}
//               className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="mb-2 block text-sm font-semibold text-black">Description</label>
//             <textarea
//               defaultValue={property.description ?? ""}
//               rows={6}
//               className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
//             />
//           </div>

//           <div className="md:col-span-2 flex justify-end gap-3">
//             <Link
//               href={`/admin/properties/${property.id}`}
//               className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black"
//             >
//               Cancel
//             </Link>
//             <button
//               type="submit"
//               className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
//             >
//               Update Property
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const authResult = await requireAdminPage(ctx);

//   if ("redirect" in authResult || "notFound" in authResult) {
//     return authResult;
//   }

//   const id = String(ctx.params?.id || "");

//   const property = await prisma.property.findUnique({
//     where: { id },
//   });

//   return {
//     props: {
//       ...(authResult.props as { currentUser: SerializableAppUser }),
//       property: property
//         ? {
//             id: property.id,
//             title: property.title,
//             description: property.description ?? null,
//             kind: property.kind,
//             purpose: property.purpose,
//             status: property.status,
//             priceAmount: property.priceAmount ? property.priceAmount.toString() : null,
//             priceCurrency: property.priceCurrency ?? null,
//           }
//         : null,
//     },
//   };
// };

// export default EditPropertyPage;
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import prisma from "@/lib/prisma";
import { requireAdminPage, type SerializableAppUser } from "@/lib/auth-guards";

type EditPropertyPageProps = {
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
  } | null;
};

const EditPropertyPage: NextPage<EditPropertyPageProps> = ({ property }) => {
  const router = useRouter();

  const [title, setTitle] = useState(property?.title ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [kind, setKind] = useState(property?.kind ?? "");
  const [purpose, setPurpose] = useState(property?.purpose ?? "");
  const [status, setStatus] = useState(property?.status ?? "");
  const [priceAmount, setPriceAmount] = useState(property?.priceAmount ?? "");
  const [priceCurrency, setPriceCurrency] = useState(property?.priceCurrency ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!property) {
    return (
      <main className="min-h-screen bg-[#F6F7FB] px-[30px] py-[30px]">
        <div className="rounded-[24px] bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-black">Property not found</h1>
          <Link
            href="/admin?tab=properties"
            className="mt-4 inline-block text-sm font-semibold underline"
          >
            Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/properties/${property.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          kind,
          purpose,
          status,
          priceAmount,
          priceCurrency,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to update property");
      }

      await router.push("/admin?tab=properties");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F7FB] px-[30px] py-[30px]">
      <div className="rounded-[24px] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Edit Property</h1>

          <Link
            href="/admin?tab=properties"
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black"
          >
            Back to Properties
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-black">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">Type</label>
            <input
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">Purpose</label>
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">Status</label>
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">Price Amount</label>
            <input
              value={priceAmount}
              onChange={(e) => setPriceAmount(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">Currency</label>
            <input
              value={priceCurrency}
              onChange={(e) => setPriceCurrency(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-black">Description</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none"
            />
          </div>

          {error ? (
            <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="md:col-span-2 flex justify-end gap-3">
            <Link
              href="/admin?tab=properties"
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Property"}
            </button>
          </div>
        </form>
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
            priceAmount: property.priceAmount ? property.priceAmount.toString() : "",
            priceCurrency: property.priceCurrency ?? "",
          }
        : null,
    },
  };
};

export default EditPropertyPage;