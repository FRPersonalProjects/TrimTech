// mocka tudo que depende do banco/prisma gerado pra nao precisar do client
jest.mock('src/database/prisma.service');
jest.mock('generated/prisma/client', () => ({ PrismaClient: class {} }));
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));

import { Test, TestingModule } from '@nestjs/testing';
import { BarbershopService } from './barbershop.service';
import { PrismaService } from 'src/database/prisma.service';

const prismaMock = {
  barbershop: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('BarbershopService', () => {
  let service: BarbershopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarbershopService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BarbershopService>(BarbershopService);
    jest.clearAllMocks();
  });

  it('deve criar uma barbearia', async () => {
    const dto = {
      name: 'Barba & Cia',
      address: 'Rua das Flores, 10',
      phone: ['35999999999'],
      description: 'barbearia top',
      imageUrl: 'https://example.com/img.png',
    };

    prismaMock.barbershop.create.mockResolvedValue({ id: 'uuid-1', ...dto });

    const result = await service.create(dto);
    expect(result.id).toBe('uuid-1');
    expect(prismaMock.barbershop.create).toHaveBeenCalledTimes(1);
  });

  it('deve retornar todas as barbearias', async () => {
    prismaMock.barbershop.findMany.mockResolvedValue([
      { id: 'uuid-1', name: 'Barba & Cia' },
    ]);

    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(prismaMock.barbershop.findMany).toHaveBeenCalledTimes(1);
  });

  it('deve retornar null se barbearia nao existir', async () => {
    prismaMock.barbershop.findUnique.mockResolvedValue(null);

    const result = await service.findOne({ id: 'nao-existe' });
    expect(result).toBeNull();
  });

  it('deve atualizar uma barbearia', async () => {
    prismaMock.barbershop.update.mockResolvedValue({ id: 'uuid-1', name: 'Novo Nome' });

    const result = await service.update({
      where: { id: 'uuid-1' },
      data: { name: 'Novo Nome' },
    });

    expect(result.name).toBe('Novo Nome');
    expect(prismaMock.barbershop.update).toHaveBeenCalledTimes(1);
  });

  it('deve remover uma barbearia', async () => {
    prismaMock.barbershop.delete.mockResolvedValue({ id: 'uuid-1' });

    const result = await service.remove({ id: 'uuid-1' });
    expect(result.id).toBe('uuid-1');
    expect(prismaMock.barbershop.delete).toHaveBeenCalledTimes(1);
  });
});
