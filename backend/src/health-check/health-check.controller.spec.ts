import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller.js';
import { HealthCheckService } from './health-check.service.js';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  const service = { check: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [{ provide: HealthCheckService, useValue: service }],
    }).compile();

    controller = module.get(HealthCheckController);
  });

  it('returns the health status provided by the service', async () => {
    service.check.mockResolvedValue({ status: 'ok', database: 'up' });

    await expect(controller.check()).resolves.toEqual({
      status: 'ok',
      database: 'up',
    });
    expect(service.check).toHaveBeenCalledTimes(1);
  });
});
