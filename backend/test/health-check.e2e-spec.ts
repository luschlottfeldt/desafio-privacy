import request from 'supertest';
import { createTestApp, TestApp } from './utils/test-app.js';

describe('HealthCheck (e2e)', () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = await createTestApp();
  });

  afterAll(async () => {
    await testApp.app.close();
  });

  it('GET /healthcheck returns api and database status', () => {
    return request(testApp.app.getHttpServer())
      .get('/healthcheck')
      .expect(200)
      .expect({ status: 'ok', database: 'up' });
  });
});
