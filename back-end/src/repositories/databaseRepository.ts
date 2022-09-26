import { prisma } from "../database.js";

export async function reset(): Promise<void> {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
}
