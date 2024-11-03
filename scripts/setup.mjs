import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { prisma } from '@/lib/db';

dotenv.config();

const setup = async () => {
  try {
    const hasData = await prisma.repo.count();

    if (hasData) {
      console.log('Database already exists with data');
      await prisma.$disconnect();
      return;
    }

    const records = [...Array(100)].map((_, index) => ({
      name: faker.name.findName(),
      description: faker.lorem.paragraph(),
      url: faker.internet.url(),
      image: faker.internet.url(),
      stars: parseInt(faker.random.numeric(5)),
      forks: parseInt(faker.random.numeric(5)),
      language: faker.lorem.word(),
      readmeFile: faker.lorem.paragraphs(3),
      createdAt: new Date(
        // For every 10 records, subtract one day (24 * 60 * 60 * 1000 ms)
        // This creates 10 groups of 10 records each, spread across 10 days
        Date.now() - Math.floor(index / 10) * 24 * 60 * 60 * 1000
      )
    }));

    const insert = await prisma.repo.createMany({
      data: records
    });

    if (insert.count === records.length) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    return 'Database is not ready yet';
  } finally {
    await prisma.$disconnect();
  }
};

try {
  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };
