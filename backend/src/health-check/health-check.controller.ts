import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto/health-check-response.dto.js';
import { HealthCheckService } from './health-check.service.js';

@Controller('healthcheck')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  check(): Promise<HealthCheckResponseDto> {
    return this.healthCheckService.check();
  }
}
