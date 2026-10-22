import { Injectable } from '@nestjs/common';
import { Follower } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FollowersRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(creatorId: string, userId: string): Promise<Follower | null> {
    const [follower] = await this.prisma.follower.createManyAndReturn({
      data: [{ creatorId, userId }],
      skipDuplicates: true,
    });
    return follower ?? null;
  }

  async delete(creatorId: string, userId: string): Promise<boolean> {
    const { count } = await this.prisma.follower.deleteMany({
      where: { creatorId, userId },
    });
    return count > 0;
  }

  countByCreator(creatorId: string): Promise<number> {
    return this.prisma.follower.count({ where: { creatorId } });
  }

  async isFollowing(creatorId: string, userId: string): Promise<boolean> {
    const follower = await this.prisma.follower.findUnique({
      where: { userId_creatorId: { userId, creatorId } },
      select: { userId: true },
    });
    return follower !== null;
  }
}
