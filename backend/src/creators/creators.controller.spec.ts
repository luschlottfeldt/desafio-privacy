import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsController } from './creators.controller.js';
import { CreatorsService } from './creators.service.js';

describe('CreatorsController', () => {
  let controller: CreatorsController;
  const service = { findAll: vi.fn(), findById: vi.fn() };

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

  it('returns the creator provided by the service', async () => {
    const creator = { id: 'creator-1', name: 'Ana' };
    service.findById.mockResolvedValue(creator);

    await expect(controller.findById('creator-1')).resolves.toEqual(creator);
    expect(service.findById).toHaveBeenCalledWith('creator-1');
  });
});
