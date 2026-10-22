import { Test, TestingModule } from '@nestjs/testing';
import { FollowersController } from './followers.controller.js';
import { FollowersService } from './followers.service.js';

describe('FollowersController', () => {
  let controller: FollowersController;
  const service = {
    follow: vi.fn(),
    unfollow: vi.fn(),
    count: vi.fn(),
  };
  const creatorId = 'creator-1';
  const userId = 'user-1';

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowersController],
      providers: [{ provide: FollowersService, useValue: service }],
    }).compile();

    controller = module.get(FollowersController);
  });

  it('follows the creator with the user from the body', async () => {
    const follower = { creatorId, userId, createdAt: new Date() };
    service.follow.mockResolvedValue(follower);

    await expect(controller.follow(creatorId, { userId })).resolves.toEqual(
      follower,
    );
    expect(service.follow).toHaveBeenCalledWith(creatorId, userId);
  });

  it('unfollows the creator', async () => {
    service.unfollow.mockResolvedValue(undefined);

    await expect(
      controller.unfollow(creatorId, userId),
    ).resolves.toBeUndefined();
    expect(service.unfollow).toHaveBeenCalledWith(creatorId, userId);
  });

  it('returns the followers count for the informed user', async () => {
    const response = { creatorId, count: 2, isFollowing: false };
    service.count.mockResolvedValue(response);

    await expect(controller.count(creatorId, { userId })).resolves.toEqual(
      response,
    );
    expect(service.count).toHaveBeenCalledWith(creatorId, userId);
  });

  it('returns the followers count without user', async () => {
    service.count.mockResolvedValue({ creatorId, count: 2 });

    await controller.count(creatorId, {});

    expect(service.count).toHaveBeenCalledWith(creatorId, undefined);
  });
});
