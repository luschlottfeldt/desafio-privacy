import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsRepositoryService } from '../creators/creators.repository.service.js';
import { UsersRepositoryService } from '../users/users.repository.service.js';
import { FollowersRepositoryService } from './followers.repository.service.js';
import { FollowersService } from './followers.service.js';

describe('FollowersService', () => {
  let service: FollowersService;
  const followersRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    countByCreator: vi.fn(),
    isFollowing: vi.fn(),
  };
  const creatorsRepository = { exists: vi.fn() };
  const usersRepository = { exists: vi.fn() };
  const creatorId = 'creator-1';
  const userId = 'user-1';

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowersService,
        { provide: FollowersRepositoryService, useValue: followersRepository },
        { provide: CreatorsRepositoryService, useValue: creatorsRepository },
        { provide: UsersRepositoryService, useValue: usersRepository },
      ],
    }).compile();

    service = module.get(FollowersService);
  });

  describe('follow', () => {
    it('creates the follower when creator and user exist', async () => {
      const follower = { creatorId, userId, createdAt: new Date() };
      creatorsRepository.exists.mockResolvedValue(true);
      usersRepository.exists.mockResolvedValue(true);
      followersRepository.create.mockResolvedValue(follower);

      await expect(service.follow(creatorId, userId)).resolves.toEqual(
        follower,
      );
      expect(followersRepository.create).toHaveBeenCalledWith(
        creatorId,
        userId,
      );
    });

    it('throws NotFoundException when the creator does not exist', async () => {
      creatorsRepository.exists.mockResolvedValue(false);
      usersRepository.exists.mockResolvedValue(true);

      await expect(service.follow(creatorId, userId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(followersRepository.create).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when the user does not exist', async () => {
      creatorsRepository.exists.mockResolvedValue(true);
      usersRepository.exists.mockResolvedValue(false);

      await expect(service.follow(creatorId, userId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(followersRepository.create).not.toHaveBeenCalled();
    });

    it('throws ConflictException when the user already follows the creator', async () => {
      creatorsRepository.exists.mockResolvedValue(true);
      usersRepository.exists.mockResolvedValue(true);
      followersRepository.create.mockResolvedValue(null);

      await expect(service.follow(creatorId, userId)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });
  });

  describe('unfollow', () => {
    it('removes the follower', async () => {
      followersRepository.delete.mockResolvedValue(true);

      await expect(
        service.unfollow(creatorId, userId),
      ).resolves.toBeUndefined();
      expect(followersRepository.delete).toHaveBeenCalledWith(
        creatorId,
        userId,
      );
    });

    it('throws NotFoundException when the user does not follow the creator', async () => {
      followersRepository.delete.mockResolvedValue(false);

      await expect(service.unfollow(creatorId, userId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('count', () => {
    it('returns only the count when no user is informed', async () => {
      creatorsRepository.exists.mockResolvedValue(true);
      followersRepository.countByCreator.mockResolvedValue(5);

      await expect(service.count(creatorId)).resolves.toEqual({
        creatorId,
        count: 5,
      });
      expect(followersRepository.isFollowing).not.toHaveBeenCalled();
    });

    it('returns the count and the follow state when a user is informed', async () => {
      creatorsRepository.exists.mockResolvedValue(true);
      followersRepository.countByCreator.mockResolvedValue(5);
      followersRepository.isFollowing.mockResolvedValue(true);

      await expect(service.count(creatorId, userId)).resolves.toEqual({
        creatorId,
        count: 5,
        isFollowing: true,
      });
      expect(followersRepository.isFollowing).toHaveBeenCalledWith(
        creatorId,
        userId,
      );
    });

    it('throws NotFoundException when the creator does not exist', async () => {
      creatorsRepository.exists.mockResolvedValue(false);

      await expect(service.count(creatorId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(followersRepository.countByCreator).not.toHaveBeenCalled();
    });
  });
});
