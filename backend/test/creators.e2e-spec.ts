import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { createTestApp, resetDatabase, TestApp } from './utils/test-app.js';

describe('Creators (e2e)', () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = await createTestApp();
  });

  beforeEach(async () => {
    await resetDatabase(testApp.prisma);
  });

  afterAll(async () => {
    await resetDatabase(testApp.prisma);
    await testApp.app.close();
  });

  it('GET /creators returns id and name of every creator ordered by name', async () => {
    const luna = await testApp.prisma.creator.create({
      data: { name: 'Luna' },
    });
    const bia = await testApp.prisma.creator.create({ data: { name: 'Bia' } });

    await request(testApp.app.getHttpServer())
      .get('/creators')
      .expect(200)
      .expect([
        { id: bia.id, name: 'Bia' },
        { id: luna.id, name: 'Luna' },
      ]);
  });

  it('GET /creators/:creatorId returns the creator', async () => {
    const luna = await testApp.prisma.creator.create({
      data: { name: 'Luna' },
    });

    await request(testApp.app.getHttpServer())
      .get(`/creators/${luna.id}`)
      .expect(200)
      .expect({ id: luna.id, name: 'Luna' });
  });

  it('GET /creators/:creatorId returns 404 when the creator does not exist', () => {
    return request(testApp.app.getHttpServer())
      .get(`/creators/${randomUUID()}`)
      .expect(404);
  });

  it('GET /creators/:creatorId returns 400 when the id is not a uuid', () => {
    return request(testApp.app.getHttpServer())
      .get('/creators/invalid-id')
      .expect(400);
  });
});
