import { PrismaClient } from '@prisma/client';
import path from 'path';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

// Workaround to find the db file in production
const filePath = path.join(process.cwd(), 'prisma/trendsgit.db');
const config = {
  datasources: {
    db: {
      url: 'file:' + filePath
    }
  }
};

let prismaClient: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient(config);
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient(config);
  }
  prismaClient = global.cachedPrisma;
}

export const prisma = prismaClient;
