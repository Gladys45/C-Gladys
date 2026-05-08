import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";

// Define types inline to avoid importing from non-existent generated prisma
type PropertyStatus = "DRAFT" | "ACTIVE" | "PENDING" | "SOLD" | "RENTED" | "ARCHIVED";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatPrice(amount: any, currency: string | null): string {
  if (!amount) return "Price on request";
  const amountStr = typeof amount?.toString === "function" ? amount.toString() : String(amount);
  return `${currency ?? ""} ${amountStr}`.trim();
}

function formatLocation(
  location?: {
    city?: string | null;
    district?: string | null;
    province?: string | null;
    country?: string | null;
  } | null
): string {
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
  if (!isDatabaseConfigured) {
    console.warn("Database not configured. Returning empty dashboard data.");
    return {
      propertyItems: [],
      propertyKanban: [
        { title: "Draft", items: [] },
        { title: "Review", items: [] },
        { title: "Published", items: [] },
      ],
      propertyMetrics: [
        { title: "Total Items", value: "0", hint: "All properties in the database", trend: "Live" },
        { title: "Active", value: "0", hint: "Currently published properties", trend: "Live" },
        { title: "Pending", value: "0", hint: "Waiting for review or action", trend: "Live" },
        { title: "Completed", value: "0", hint: "Sold or rented properties", trend: "Live" },
      ],
      heroStats: [
        { label: "Properties", value: "0" },
        { label: "Bookings", value: "0" },
        { label: "Contacts", value: "0" },
        { label: "Alerts", value: "0" },
      ],
    };
  }

  const prisma = await getPrisma();
  if (!prisma) {
    console.warn("Failed to initialize Prisma. Returning empty dashboard data.");
    return {
      propertyItems: [],
      propertyKanban: [
        { title: "Draft", items: [] },
        { title: "Review", items: [] },
        { title: "Published", items: [] },
      ],
      propertyMetrics: [
        { title: "Total Items", value: "0", hint: "All properties in the database", trend: "Live" },
        { title: "Active", value: "0", hint: "Currently published properties", trend: "Live" },
        { title: "Pending", value: "0", hint: "Waiting for review or action", trend: "Live" },
        { title: "Completed", value: "0", hint: "Sold or rented properties", trend: "Live" },
      ],
      heroStats: [
        { label: "Properties", value: "0" },
        { label: "Bookings", value: "0" },
        { label: "Contacts", value: "0" },
        { label: "Alerts", value: "0" },
      ],
    };
  }

  const properties = await prisma.property.findMany({
    include: {
      location: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const propertyItems: DashboardPropertyItem[] = properties.map((property: any) => ({
    id: property.id,
    title: property.title,
    status: formatStatus(property.status),
    type: formatKind(property.kind),
    location: formatLocation(property.location),
    price: formatPrice(property.priceAmount, property.priceCurrency),
  }));

  const totalProperties = properties.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeProperties = properties.filter((p: any) => p.status === "ACTIVE").length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pendingProperties = properties.filter((p: any) => p.status === "PENDING").length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completedProperties = properties.filter(
    (p: any) => p.status === "SOLD" || p.status === "RENTED"
  ).length;

  const propertyKanban: DashboardKanbanColumn[] = [
    {
      title: "Draft",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: properties.filter((p: any) => p.status === "DRAFT").map((p: any) => p.title),
    },
    {
      title: "Review",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: properties.filter((p: any) => p.status === "PENDING").map((p: any) => p.title),
    },
    {
      title: "Published",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: properties.filter((p: any) => p.status === "ACTIVE").map((p: any) => p.title),
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
