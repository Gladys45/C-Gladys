// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client/extension";
// // import { PrismaClient } from "./generated/prisma";
// import pg from "pg";

// const connectionString = process.env.DATABASE_URL!;

// const pool = new pg.Pool({
//   connectionString,
// });

// const adapter = new PrismaPg(pool);

// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// const prisma =
//   global.prisma ??
//   new PrismaClient({
//     adapter,
//   });

// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// export default prisma;


import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "./generated/prisma";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString,
  });

const adapter = new PrismaPg(pool);

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
  globalForPrisma.prisma = prisma;
}

export default prisma;