import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreatorsModule } from './creators/creators.module.js';
import { FollowersModule } from './followers/followers.module.js';
import { HealthCheckModule } from './health-check/health-check.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthCheckModule,
    UsersModule,
    CreatorsModule,
    FollowersModule,
  ],
})
export class AppModule {}
