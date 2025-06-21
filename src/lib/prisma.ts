import { PrismaClient } from "@prisma/client";


declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

// Singleton pattern to ensure a single Prisma Client instance
console.log()
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;