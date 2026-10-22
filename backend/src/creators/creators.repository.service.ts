import { Injectable } from '@nestjs/common';
import { Creator } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CreatorsRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Creator[]> {
    return this.prisma.creator.findMany({ orderBy: { name: 'asc' } });
  }

  async exists(id: string): Promise<boolean> {
    const creator = await this.prisma.creator.findUnique({
      where: { id },
      select: { id: true },
    });
    return creator !== null;
  }
}
