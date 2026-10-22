import { ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckRepositoryService } from './health-check.repository.service.js';
import { HealthCheckService } from './health-check.service.js';

describe('HealthCheckService', () => {
  let service: HealthCheckService;
  const repository = { isDatabaseUp: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckService,
        { provide: HealthCheckRepositoryService, useValue: repository },
      ],
    }).compile();

    service = module.get(HealthCheckService);
  });

  it('returns ok status when the database is up', async () => {
    repository.isDatabaseUp.mockResolvedValue(true);

    await expect(service.check()).resolves.toEqual({
      status: 'ok',
      database: 'up',
    });
  });

  it('throws ServiceUnavailableException when the database is down', async () => {
    repository.isDatabaseUp.mockResolvedValue(false);

    const result = service.check();

    await expect(result).rejects.toBeInstanceOf(ServiceUnavailableException);
    await expect(result).rejects.toMatchObject({
      response: { status: 'error', database: 'down' },
    });
  });
});
