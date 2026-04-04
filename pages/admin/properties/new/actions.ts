// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createProperty } from "@/lib/services/property.service";

// function getString(formData: FormData, key: string) {
//   const value = formData.get(key);
//   return typeof value === "string" ? value.trim() : "";
// }

// export async function createPropertyAction(formData: FormData) {
//   const title = getString(formData, "title");
//   const slug = getString(formData, "slug");
//   const description = getString(formData, "description") || null;
//   const kind = getString(formData, "kind") as "HOUSE" | "LAND";
//   const purpose = getString(formData, "purpose") as
//     | "SELL"
//     | "BUY"
//     | "RENT"
//     | "LETTINGS";
//   const marketType = getString(formData, "marketType") as
//     | "ON_MARKET"
//     | "OFF_MARKET";
//   const status = getString(formData, "status") as
//     | "DRAFT"
//     | "ACTIVE"
//     | "PENDING"
//     | "SOLD"
//     | "RENTED"
//     | "ARCHIVED";
//   const visibility = getString(formData, "visibility") as
//     | "PUBLIC"
//     | "PRIVATE"
//     | "HIDDEN";

//   const country = getString(formData, "country");
//   const city = getString(formData, "city") || null;
//   const province = getString(formData, "province") || null;
//   const district = getString(formData, "district") || null;
//   const sector = getString(formData, "sector") || null;
//   const cell = getString(formData, "cell") || null;
//   const village = getString(formData, "village") || null;
//   const addressLine1 = getString(formData, "addressLine1") || null;
//   const addressLine2 = getString(formData, "addressLine2") || null;
//   const postalCode = getString(formData, "postalCode") || null;

//   const priceAmount = getString(formData, "priceAmount");
//   const priceCurrency =
//     (getString(formData, "priceCurrency") as "RWF" | "USD" | "EUR" | "GBP") ||
//     null;

//   const bedrooms = getString(formData, "bedrooms");
//   const bathrooms = getString(formData, "bathrooms");

//   const property = await createProperty({
//     title,
//     slug,
//     description,
//     kind,
//     purpose,
//     marketType: marketType || "ON_MARKET",
//     status: status || "DRAFT",
//     visibility: visibility || "PUBLIC",
//     country,
//     city,
//     province,
//     district,
//     sector,
//     cell,
//     village,
//     addressLine1,
//     addressLine2,
//     postalCode,
//     priceAmount: priceAmount ? Number(priceAmount) : null,
//     priceCurrency,
//     bedrooms: bedrooms ? Number(bedrooms) : null,
//     bathrooms: bathrooms ? Number(bathrooms) : null,
//     highlights: [],
//   });

//   revalidatePath("/admin/properties");
//   redirect(`/admin/properties/${property.id}`);
// }


"use server";

import { createProperty } from "@/lib/services/property.service";
import { redirect } from "next/navigation";
// import { createProperty } from "@/lib/services/create-property";

export async function createPropertyAction(_: unknown, formData: FormData) {
  try {
    const highlightsRaw = String(formData.get("highlights") ?? "");

    const property = await createProperty({
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      description: String(formData.get("description") ?? ""),
      kind: String(formData.get("kind") ?? ""),
      purpose: String(formData.get("purpose") ?? ""),
      marketType: String(formData.get("marketType") ?? ""),
      status: String(formData.get("status") ?? ""),
      visibility: String(formData.get("visibility") ?? ""),
      rentType: String(formData.get("rentType") ?? ""),
      priceAmount: String(formData.get("priceAmount") ?? ""),
      priceCurrency: String(formData.get("priceCurrency") ?? ""),
      country: String(formData.get("country") ?? ""),
      city: String(formData.get("city") ?? ""),
      province: String(formData.get("province") ?? ""),
      district: String(formData.get("district") ?? ""),
      sector: String(formData.get("sector") ?? ""),
      cell: String(formData.get("cell") ?? ""),
      village: String(formData.get("village") ?? ""),
      addressLine1: String(formData.get("addressLine1") ?? ""),
      addressLine2: String(formData.get("addressLine2") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      bedrooms: String(formData.get("bedrooms") ?? ""),
      bathrooms: String(formData.get("bathrooms") ?? ""),
      highlights: highlightsRaw
        ? highlightsRaw.split(",").map((v) => v.trim()).filter(Boolean)
        : [],
    });

    redirect(`/admin/properties/${property.id}`);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to save property.",
    };
  }
}