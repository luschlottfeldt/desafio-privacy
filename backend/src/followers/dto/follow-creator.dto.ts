import { IsUUID } from 'class-validator';

export class FollowCreatorDto {
  @IsUUID()
  userId: string;
}
