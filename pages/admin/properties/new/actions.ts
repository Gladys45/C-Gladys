

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