import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FollowCreatorDto } from './dto/follow-creator.dto.js';
import { FollowerResponseDto } from './dto/follower-response.dto.js';
import { FollowersCountQueryDto } from './dto/followers-count-query.dto.js';
import { FollowersCountResponseDto } from './dto/followers-count-response.dto.js';
import { FollowersService } from './followers.service.js';

@Controller('creators/:creatorId/followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post()
  follow(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Body() { userId }: FollowCreatorDto,
  ): Promise<FollowerResponseDto> {
    return this.followersService.follow(creatorId, userId);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  unfollow(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return this.followersService.unfollow(creatorId, userId);
  }

  @Get('count')
  count(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Query() { userId }: FollowersCountQueryDto,
  ): Promise<FollowersCountResponseDto> {
    return this.followersService.count(creatorId, userId);
  }
}
