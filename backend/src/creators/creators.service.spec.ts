import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsRepositoryService } from './creators.repository.service.js';
import { CreatorsService } from './creators.service.js';

describe('CreatorsService', () => {
  let service: CreatorsService;
  const repository = { findAll: vi.fn(), findById: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatorsService,
        { provide: CreatorsRepositoryService, useValue: repository },
      ],
    }).compile();

    service = module.get(CreatorsService);
  });

  it('returns only id and name of every creator', async () => {
    repository.findAll.mockResolvedValue([
      { id: 'creator-1', name: 'Ana', createdAt: new Date() },
      { id: 'creator-2', name: 'Bruno', createdAt: new Date() },
    ]);

    await expect(service.findAll()).resolves.toEqual([
      { id: 'creator-1', name: 'Ana' },
      { id: 'creator-2', name: 'Bruno' },
    ]);
  });

  it('returns id and name of the creator found by id', async () => {
    repository.findById.mockResolvedValue({
      id: 'creator-1',
      name: 'Ana',
      createdAt: new Date(),
    });

    await expect(service.findById('creator-1')).resolves.toEqual({
      id: 'creator-1',
      name: 'Ana',
    });
    expect(repository.findById).toHaveBeenCalledWith('creator-1');
  });

  it('throws NotFoundException when the creator does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findById('creator-1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
