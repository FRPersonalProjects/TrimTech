jest.mock('src/database/prisma.service');
jest.mock('generated/prisma/client', () => ({ PrismaClient: class {} }));
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';

const prismaMock = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('deve criar um usuario com senha hasheada', async () => {
    prismaMock.user.create.mockImplementation(({ data }) =>
      Promise.resolve({ id: 'user-1', ...data }),
    );

    const result = await service.create({
      name: 'Felipe',
      email: 'felipe@email.com',
      password: 'senha123',
    });

    // a senha nao pode ser a mesma que entrou
    expect(result.password).not.toBe('senha123');
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
  });

  it('deve retornar todos os usuarios', async () => {
    prismaMock.user.findMany.mockResolvedValue([
      { id: 'user-1', name: 'Felipe' },
    ]);

    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });

  it('deve deletar um usuario', async () => {
    prismaMock.user.delete.mockResolvedValue({ id: 'user-1' });

    const result = await service.delete({ id: 'user-1' });
    expect(result.id).toBe('user-1');
    expect(prismaMock.user.delete).toHaveBeenCalledTimes(1);
  });
});
