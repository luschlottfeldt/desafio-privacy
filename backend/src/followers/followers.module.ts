import { Module } from '@nestjs/common';
import { CreatorsModule } from '../creators/creators.module.js';
import { UsersModule } from '../users/users.module.js';
import { FollowersController } from './followers.controller.js';
import { FollowersRepositoryService } from './followers.repository.service.js';
import { FollowersService } from './followers.service.js';

@Module({
  imports: [CreatorsModule, UsersModule],
  controllers: [FollowersController],
  providers: [FollowersService, FollowersRepositoryService],
})
export class FollowersModule {}
