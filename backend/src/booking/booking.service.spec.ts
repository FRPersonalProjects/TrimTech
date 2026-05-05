jest.mock('src/database/prisma.service');
jest.mock('generated/prisma/client', () => ({ PrismaClient: class {} }));
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));

import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { PrismaService } from 'src/database/prisma.service';

const prismaMock = {
  booking: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    jest.clearAllMocks();
  });

  it('deve criar um agendamento', async () => {
    const created = {
      id: 'booking-1',
      userId: 'user-1',
      serviceId: 'service-1',
      date: new Date('2026-07-10T14:00:00Z'),
    };

    prismaMock.booking.create.mockResolvedValue(created);

    const result = await service.create('user-1', {
      serviceId: 'service-1',
      date: '2026-07-10T14:00:00Z',
    });

    expect(result.id).toBe('booking-1');
    expect(prismaMock.booking.create).toHaveBeenCalledTimes(1);
  });

  it('deve retornar os agendamentos do usuario', async () => {
    prismaMock.booking.findMany.mockResolvedValue([
      { id: 'booking-1', userId: 'user-1' },
    ]);

    const result = await service.findAllByUser('user-1');
    expect(result).toHaveLength(1);
  });

  it('deve retornar null se agendamento nao existir', async () => {
    prismaMock.booking.findUnique.mockResolvedValue(null);

    const result = await service.findOne({ id: 'nao-existe' });
    expect(result).toBeNull();
  });

  it('deve cancelar um agendamento', async () => {
    prismaMock.booking.delete.mockResolvedValue({ id: 'booking-1' });

    const result = await service.remove({ id: 'booking-1' });
    expect(result.id).toBe('booking-1');
  });
});
