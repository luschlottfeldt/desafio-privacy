import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller.js';
import { HealthCheckRepositoryService } from './health-check.repository.service.js';
import { HealthCheckService } from './health-check.service.js';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService, HealthCheckRepositoryService],
})
export class HealthCheckModule {}
