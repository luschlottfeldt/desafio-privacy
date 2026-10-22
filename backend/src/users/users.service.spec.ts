import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryService } from './users.repository.service.js';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;
  const repository = { findAll: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepositoryService, useValue: repository },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('returns only id and name of every user', async () => {
    repository.findAll.mockResolvedValue([
      { id: 'user-1', name: 'Ana', createdAt: new Date() },
      { id: 'user-2', name: 'Bruno', createdAt: new Date() },
    ]);

    await expect(service.findAll()).resolves.toEqual([
      { id: 'user-1', name: 'Ana' },
      { id: 'user-2', name: 'Bruno' },
    ]);
  });
});
