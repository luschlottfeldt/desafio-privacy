import request from 'supertest';
import { createTestApp, resetDatabase, TestApp } from './utils/test-app.js';

describe('Users (e2e)', () => {
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

  it('GET /users returns id and name of every user ordered by name', async () => {
    const bruno = await testApp.prisma.user.create({ data: { name: 'Bruno' } });
    const ana = await testApp.prisma.user.create({ data: { name: 'Ana' } });

    await request(testApp.app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        { id: ana.id, name: 'Ana' },
        { id: bruno.id, name: 'Bruno' },
      ]);
  });

  it('GET /users returns an empty list when there are no users', () => {
    return request(testApp.app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });
});
