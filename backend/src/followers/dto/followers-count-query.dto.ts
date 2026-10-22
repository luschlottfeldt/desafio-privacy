import { IsOptional, IsUUID } from 'class-validator';

export class FollowersCountQueryDto {
  @IsOptional()
  @IsUUID()
  userId?: string;
}
