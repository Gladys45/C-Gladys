const connectionString = process.env.DATABASE_URL;

// Check if database is configured
export const isDatabaseConfigured = !!connectionString;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prismaInstance: any = null;

// Only initialize Prisma if DATABASE_URL is configured
// This prevents the ".prisma/client/default not found" error
// when Prisma hasn't been generated yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPrisma(): Promise<any> {
  if (!connectionString) {
    return null;
  }

  if (prismaInstance) {
    return prismaInstance;
  }

  if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
    return prismaInstance;
  }

  try {
    const { PrismaClient } = await import("@prisma/client");
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const { Pool } = await import("pg");

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    const client = new PrismaClient({ adapter });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }

    prismaInstance = client;
    return client;
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    return null;
  }
}

// For backwards compatibility - but prefer using getPrisma()
export default prismaInstance;
