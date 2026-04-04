import { getPropertyDashboardData } from "@/lib/services/admin-dashboard.service";
import type { NextApiRequest, NextApiResponse } from "next";

function toJsonSafe<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_, currentValue) =>
      typeof currentValue === "bigint" ? currentValue.toString() : currentValue
    )
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const data = await getPropertyDashboardData();

    return res.status(200).json(
      toJsonSafe({
        success: true,
        message: "Dashboard data loaded successfully.",
        data,
      })
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to load dashboard data.",
    });
  }
}