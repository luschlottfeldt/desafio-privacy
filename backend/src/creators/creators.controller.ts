import { Controller, Get } from '@nestjs/common';
import { CreatorResponseDto } from './dto/creator-response.dto.js';
import { CreatorsService } from './creators.service.js';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Get()
  findAll(): Promise<CreatorResponseDto[]> {
    return this.creatorsService.findAll();
  }
}
