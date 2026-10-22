import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

type SeedEntity = { id: string; name: string };

const creator: SeedEntity = {
  id: '9f1c2b7e-3a4d-4e5f-8a6b-1c2d3e4f5a60',
  name: 'Luna Martins',
};

const users: SeedEntity[] = [
  { id: '0a1b2c3d-0001-4a00-8000-000000000001', name: 'Ana Souza' },
  { id: '0a1b2c3d-0002-4a00-8000-000000000002', name: 'Bruno Lima' },
  { id: '0a1b2c3d-0003-4a00-8000-000000000003', name: 'Carla Mendes' },
  { id: '0a1b2c3d-0004-4a00-8000-000000000004', name: 'Diego Rocha' },
  { id: '0a1b2c3d-0005-4a00-8000-000000000005', name: 'Elisa Costa' },
  { id: '0a1b2c3d-0006-4a00-8000-000000000006', name: 'Felipe Alves' },
  { id: '0a1b2c3d-0007-4a00-8000-000000000007', name: 'Gabriela Nunes' },
  { id: '0a1b2c3d-0008-4a00-8000-000000000008', name: 'Henrique Dias' },
  { id: '0a1b2c3d-0009-4a00-8000-000000000009', name: 'Isabela Ferreira' },
  { id: '0a1b2c3d-0010-4a00-8000-000000000010', name: 'João Pereira' },
];

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function seed(): Promise<void> {
  await prisma.creator.upsert({
    where: { id: creator.id },
    update: { name: creator.name },
    create: creator,
  });

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { id: user.id },
        update: { name: user.name },
        create: user,
      }),
    ),
  );
}

seed()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
