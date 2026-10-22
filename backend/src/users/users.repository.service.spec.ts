import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersRepositoryService } from './users.repository.service.js';

describe('UsersRepositoryService', () => {
  let repository: UsersRepositoryService;
  const prisma = { user: { findMany: vi.fn(), findUnique: vi.fn() } };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepositoryService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get(UsersRepositoryService);
  });

  it('returns all users ordered by name', async () => {
    const users = [{ id: 'user-1', name: 'Ana', createdAt: new Date() }];
    prisma.user.findMany.mockResolvedValue(users);

    await expect(repository.findAll()).resolves.toEqual(users);
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });

  it('returns true when the user exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });

    await expect(repository.exists('user-1')).resolves.toBe(true);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      select: { id: true },
    });
  });

  it('returns false when the user does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(repository.exists('user-1')).resolves.toBe(false);
  });
});
