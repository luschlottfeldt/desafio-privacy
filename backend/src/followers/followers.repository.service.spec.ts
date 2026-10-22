import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { FollowersRepositoryService } from './followers.repository.service.js';

describe('FollowersRepositoryService', () => {
  let repository: FollowersRepositoryService;
  const prisma = {
    follower: {
      createManyAndReturn: vi.fn(),
      deleteMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
    },
  };
  const creatorId = 'creator-1';
  const userId = 'user-1';

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowersRepositoryService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get(FollowersRepositoryService);
  });

  describe('create', () => {
    it('returns the created follower', async () => {
      const follower = { creatorId, userId, createdAt: new Date() };
      prisma.follower.createManyAndReturn.mockResolvedValue([follower]);

      await expect(repository.create(creatorId, userId)).resolves.toEqual(
        follower,
      );
      expect(prisma.follower.createManyAndReturn).toHaveBeenCalledWith({
        data: [{ creatorId, userId }],
        skipDuplicates: true,
      });
    });

    it('returns null when the user already follows the creator', async () => {
      prisma.follower.createManyAndReturn.mockResolvedValue([]);

      await expect(repository.create(creatorId, userId)).resolves.toBeNull();
    });
  });

  describe('delete', () => {
    it('returns true when the follower is removed', async () => {
      prisma.follower.deleteMany.mockResolvedValue({ count: 1 });

      await expect(repository.delete(creatorId, userId)).resolves.toBe(true);
      expect(prisma.follower.deleteMany).toHaveBeenCalledWith({
        where: { creatorId, userId },
      });
    });

    it('returns false when there is nothing to remove', async () => {
      prisma.follower.deleteMany.mockResolvedValue({ count: 0 });

      await expect(repository.delete(creatorId, userId)).resolves.toBe(false);
    });
  });

  describe('countByCreator', () => {
    it('returns the number of followers of the creator', async () => {
      prisma.follower.count.mockResolvedValue(3);

      await expect(repository.countByCreator(creatorId)).resolves.toBe(3);
      expect(prisma.follower.count).toHaveBeenCalledWith({
        where: { creatorId },
      });
    });
  });

  describe('isFollowing', () => {
    it('returns true when the user follows the creator', async () => {
      prisma.follower.findUnique.mockResolvedValue({ userId });

      await expect(repository.isFollowing(creatorId, userId)).resolves.toBe(
        true,
      );
      expect(prisma.follower.findUnique).toHaveBeenCalledWith({
        where: { userId_creatorId: { userId, creatorId } },
        select: { userId: true },
      });
    });

    it('returns false when the user does not follow the creator', async () => {
      prisma.follower.findUnique.mockResolvedValue(null);

      await expect(repository.isFollowing(creatorId, userId)).resolves.toBe(
        false,
      );
    });
  });
});
