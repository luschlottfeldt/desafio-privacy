import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

describe('UsersController', () => {
  let controller: UsersController;
  const service = { findAll: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();

    controller = module.get(UsersController);
  });

  it('returns the users provided by the service', async () => {
    const users = [{ id: 'user-1', name: 'Ana' }];
    service.findAll.mockResolvedValue(users);

    await expect(controller.findAll()).resolves.toEqual(users);
  });
});
