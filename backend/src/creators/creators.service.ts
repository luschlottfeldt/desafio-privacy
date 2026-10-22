import { Injectable } from '@nestjs/common';
import { CreatorResponseDto } from './dto/creator-response.dto.js';
import { CreatorsRepositoryService } from './creators.repository.service.js';

@Injectable()
export class CreatorsService {
  constructor(private readonly repository: CreatorsRepositoryService) {}

  async findAll(): Promise<CreatorResponseDto[]> {
    const creators = await this.repository.findAll();
    return creators.map(({ id, name }) => ({ id, name }));
  }
}
