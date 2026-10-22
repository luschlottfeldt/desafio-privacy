import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto/health-check-response.dto.js';
import { HealthCheckRepositoryService } from './health-check.repository.service.js';

@Injectable()
export class HealthCheckService {
  constructor(private readonly repository: HealthCheckRepositoryService) {}

  async check(): Promise<HealthCheckResponseDto> {
    const isDatabaseUp = await this.repository.isDatabaseUp();

    if (!isDatabaseUp) {
      const response: HealthCheckResponseDto = {
        status: 'error',
        database: 'down',
      };
      throw new ServiceUnavailableException(response);
    }

    return { status: 'ok', database: 'up' };
  }
}
