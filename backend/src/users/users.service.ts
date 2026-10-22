import { Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto.js';
import { UsersRepositoryService } from './users.repository.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepositoryService) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repository.findAll();
    return users.map(({ id, name }) => ({ id, name }));
  }
}
