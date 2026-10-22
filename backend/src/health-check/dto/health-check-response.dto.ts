export type HealthStatus = 'ok' | 'error';
export type DatabaseStatus = 'up' | 'down';

export class HealthCheckResponseDto {
  status: HealthStatus;
  database: DatabaseStatus;
}
