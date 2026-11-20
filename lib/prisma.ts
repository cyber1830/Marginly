import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  marginlyPrisma?: PrismaClient;
};

export const prisma = globalForPrisma.marginlyPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.marginlyPrisma = prisma;
