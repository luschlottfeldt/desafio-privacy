import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { HealthCheckRepositoryService } from './health-check.repository.service.js';

describe('HealthCheckRepositoryService', () => {
  let repository: HealthCheckRepositoryService;
  const prisma = { $queryRaw: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckRepositoryService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get(HealthCheckRepositoryService);
  });

  it('returns true when the database answers the ping query', async () => {
    prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    await expect(repository.isDatabaseUp()).resolves.toBe(true);
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('returns false when the ping query fails', async () => {
    prisma.$queryRaw.mockRejectedValue(new Error('connection refused'));

    await expect(repository.isDatabaseUp()).resolves.toBe(false);
  });
});
