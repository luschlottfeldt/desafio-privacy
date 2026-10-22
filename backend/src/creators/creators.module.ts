import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller.js';
import { CreatorsRepositoryService } from './creators.repository.service.js';
import { CreatorsService } from './creators.service.js';

@Module({
  controllers: [CreatorsController],
  providers: [CreatorsService, CreatorsRepositoryService],
  exports: [CreatorsRepositoryService],
})
export class CreatorsModule {}
