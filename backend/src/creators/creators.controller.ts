import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreatorResponseDto } from './dto/creator-response.dto.js';
import { CreatorsService } from './creators.service.js';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Get()
  findAll(): Promise<CreatorResponseDto[]> {
    return this.creatorsService.findAll();
  }

  @Get(':creatorId')
  findById(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
  ): Promise<CreatorResponseDto> {
    return this.creatorsService.findById(creatorId);
  }
}
