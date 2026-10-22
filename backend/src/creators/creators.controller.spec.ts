import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsController } from './creators.controller.js';
import { CreatorsService } from './creators.service.js';

describe('CreatorsController', () => {
  let controller: CreatorsController;
  const service = { findAll: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorsController],
      providers: [{ provide: CreatorsService, useValue: service }],
    }).compile();

    controller = module.get(CreatorsController);
  });

  it('returns the creators provided by the service', async () => {
    const creators = [{ id: 'creator-1', name: 'Ana' }];
    service.findAll.mockResolvedValue(creators);

    await expect(controller.findAll()).resolves.toEqual(creators);
  });
});
