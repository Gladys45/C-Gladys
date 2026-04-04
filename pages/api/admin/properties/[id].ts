import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id || "");

  if (!id) {
    return res.status(400).json({ error: "Missing property id" });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      title,
      description,
      kind,
      purpose,
      status,
      priceAmount,
      priceCurrency,
    } = req.body ?? {};

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Title is required" });
    }

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        kind,
        purpose,
        status,
        priceAmount:
          priceAmount !== null &&
          priceAmount !== undefined &&
          String(priceAmount).trim() !== ""
            ? new Prisma.Decimal(String(priceAmount))
            : null,
        priceCurrency: priceCurrency ? String(priceCurrency).trim() : null,
      },
    });

    return res.status(200).json({
      success: true,
      property: {
        id: updatedProperty.id,
      },
    });
  } catch (error) {
    console.error("Failed to update property:", error);
    return res.status(500).json({ error: "Failed to update property" });
  }
}