import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersRepositoryService } from './users.repository.service.js';
import { UsersService } from './users.service.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoryService],
  exports: [UsersRepositoryService],
})
export class UsersModule {}
