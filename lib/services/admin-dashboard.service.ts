// // lib/services/admin-dashboard.service.ts
// import prisma from "@/lib/prisma";

// export async function getPropertyDashboardData() {
//   const properties = await prisma.property.findMany({
//     include: {
//       location: true,
//       media: {
//         where: { kind: "IMAGE", isCover: true },
//         take: 1,
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return properties;
// }

import prisma from "@/lib/prisma";
import { Prisma, PropertyStatus } from "@/lib/generated/prisma";

export type DashboardHeroStat = {
  label: string;
  value: string;
};

export type DashboardMetric = {
  title: string;
  value: string;
  hint: string;
  trend: string;
};

export type DashboardPropertyItem = {
  id: string;
  title: string;
  status: string;
  type: string;
  location: string;
  price: string;
};

export type DashboardKanbanColumn = {
  title: string;
  items: string[];
};

function formatPrice(
  amount: Prisma.Decimal | null,
  currency: string | null
): string {
  if (!amount) return "Price on request";
  return `${currency ?? ""} ${amount.toString()}`.trim();
}

function formatLocation(location?: {
  city?: string | null;
  district?: string | null;
  province?: string | null;
  country?: string | null;
} | null): string {
  if (!location) return "Unknown";
  return (
    location.city ||
    location.district ||
    location.province ||
    location.country ||
    "Unknown"
  );
}

function formatKind(kind: string): string {
  if (kind === "HOUSE") return "House";
  if (kind === "LAND") return "Land";
  return kind;
}

function formatStatus(status: PropertyStatus): string {
  if (status === "ACTIVE") return "Published";
  if (status === "PENDING") return "Review";
  if (status === "DRAFT") return "Draft";
  if (status === "SOLD") return "Sold";
  if (status === "RENTED") return "Rented";
  if (status === "ARCHIVED") return "Archived";
  return status;
}

export async function getAdminDashboardData() {
  const properties = await prisma.property.findMany({
    include: {
      location: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const propertyItems: DashboardPropertyItem[] = properties.map((property) => ({
    id: property.id,
    title: property.title,
    status: formatStatus(property.status),
    type: formatKind(property.kind),
    location: formatLocation(property.location),
    price: formatPrice(property.priceAmount, property.priceCurrency),
  }));

  const totalProperties = properties.length;
  const activeProperties = properties.filter((p) => p.status === "ACTIVE").length;
  const pendingProperties = properties.filter((p) => p.status === "PENDING").length;
  const completedProperties = properties.filter(
    (p) => p.status === "SOLD" || p.status === "RENTED"
  ).length;

  const propertyKanban: DashboardKanbanColumn[] = [
    {
      title: "Draft",
      items: properties
        .filter((p) => p.status === "DRAFT")
        .map((p) => p.title),
    },
    {
      title: "Review",
      items: properties
        .filter((p) => p.status === "PENDING")
        .map((p) => p.title),
    },
    {
      title: "Published",
      items: properties
        .filter((p) => p.status === "ACTIVE")
        .map((p) => p.title),
    },
  ];

  const propertyMetrics: DashboardMetric[] = [
    {
      title: "Total Items",
      value: String(totalProperties),
      hint: "All properties in the database",
      trend: "Live",
    },
    {
      title: "Active",
      value: String(activeProperties),
      hint: "Currently published properties",
      trend: "Live",
    },
    {
      title: "Pending",
      value: String(pendingProperties),
      hint: "Waiting for review or action",
      trend: "Live",
    },
    {
      title: "Completed",
      value: String(completedProperties),
      hint: "Sold or rented properties",
      trend: "Live",
    },
  ];

  const heroStats: DashboardHeroStat[] = [
    { label: "Properties", value: String(totalProperties) },
    { label: "Bookings", value: "0" },
    { label: "Contacts", value: "0" },
    { label: "Alerts", value: String(pendingProperties) },
  ];

  return {
    propertyItems,
    propertyKanban,
    propertyMetrics,
    heroStats,
  };
}