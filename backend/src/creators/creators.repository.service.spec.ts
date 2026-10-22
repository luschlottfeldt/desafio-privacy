import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatorsRepositoryService } from './creators.repository.service.js';

describe('CreatorsRepositoryService', () => {
  let repository: CreatorsRepositoryService;
  const prisma = { creator: { findMany: vi.fn(), findUnique: vi.fn() } };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatorsRepositoryService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get(CreatorsRepositoryService);
  });

  it('returns all creators ordered by name', async () => {
    const creators = [{ id: 'creator-1', name: 'Ana', createdAt: new Date() }];
    prisma.creator.findMany.mockResolvedValue(creators);

    await expect(repository.findAll()).resolves.toEqual(creators);
    expect(prisma.creator.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });

  it('returns true when the creator exists', async () => {
    prisma.creator.findUnique.mockResolvedValue({ id: 'creator-1' });

    await expect(repository.exists('creator-1')).resolves.toBe(true);
    expect(prisma.creator.findUnique).toHaveBeenCalledWith({
      where: { id: 'creator-1' },
      select: { id: true },
    });
  });

  it('returns false when the creator does not exist', async () => {
    prisma.creator.findUnique.mockResolvedValue(null);

    await expect(repository.exists('creator-1')).resolves.toBe(false);
  });

  it('returns the creator found by id', async () => {
    const creator = { id: 'creator-1', name: 'Ana', createdAt: new Date() };
    prisma.creator.findUnique.mockResolvedValue(creator);

    await expect(repository.findById('creator-1')).resolves.toEqual(creator);
    expect(prisma.creator.findUnique).toHaveBeenCalledWith({
      where: { id: 'creator-1' },
    });
  });

  it('returns null when no creator is found by id', async () => {
    prisma.creator.findUnique.mockResolvedValue(null);

    await expect(repository.findById('creator-1')).resolves.toBeNull();
  });
});
