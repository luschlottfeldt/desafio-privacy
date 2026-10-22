import type { Server } from 'node:http';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module.js';
import { configureApp } from '../../src/app.setup.js';
import { PrismaService } from '../../src/prisma/prisma.service.js';

export type TestApp = {
  app: INestApplication<Server>;
  prisma: PrismaService;
};

export async function createTestApp(): Promise<TestApp> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = configureApp(
    moduleFixture.createNestApplication<INestApplication<Server>>(),
  );
  await app.init();

  return { app, prisma: app.get(PrismaService) };
}

export async function resetDatabase(prisma: PrismaService): Promise<void> {
  await prisma.follower.deleteMany();
  await prisma.user.deleteMany();
  await prisma.creator.deleteMany();
}
