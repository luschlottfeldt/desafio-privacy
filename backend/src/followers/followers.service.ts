import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatorsRepositoryService } from '../creators/creators.repository.service.js';
import { Follower } from '../generated/prisma/client.js';
import { UsersRepositoryService } from '../users/users.repository.service.js';
import { FollowersCountResponseDto } from './dto/followers-count-response.dto.js';
import { FollowersRepositoryService } from './followers.repository.service.js';

@Injectable()
export class FollowersService {
  constructor(
    private readonly followersRepository: FollowersRepositoryService,
    private readonly creatorsRepository: CreatorsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async follow(creatorId: string, userId: string): Promise<Follower> {
    await this.ensureCreatorExists(creatorId);

    if (!(await this.usersRepository.exists(userId))) {
      throw new NotFoundException('User not found');
    }

    const follower = await this.followersRepository.create(creatorId, userId);

    if (!follower) {
      throw new ConflictException('User already follows this creator');
    }

    return follower;
  }

  async unfollow(creatorId: string, userId: string): Promise<void> {
    const deleted = await this.followersRepository.delete(creatorId, userId);

    if (!deleted) {
      throw new NotFoundException('User does not follow this creator');
    }
  }

  async count(
    creatorId: string,
    userId?: string,
  ): Promise<FollowersCountResponseDto> {
    await this.ensureCreatorExists(creatorId);

    const count = await this.followersRepository.countByCreator(creatorId);

    if (!userId) {
      return { creatorId, count };
    }

    const isFollowing = await this.followersRepository.isFollowing(
      creatorId,
      userId,
    );
    return { creatorId, count, isFollowing };
  }

  private async ensureCreatorExists(creatorId: string): Promise<void> {
    if (!(await this.creatorsRepository.exists(creatorId))) {
      throw new NotFoundException('Creator not found');
    }
  }
}
