import { PrismaClient } from "@prisma/client";
import "server-only";
// this is for the server , so it dosesnt create a new prisma instance
//every time it reloads
declare global {
  var cachedPrisma: PrismaClient;
}

export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}
