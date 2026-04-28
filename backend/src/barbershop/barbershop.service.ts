import { Inject, Injectable } from '@nestjs/common';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Barbershop } from 'generated/prisma/client';

// campos que retornamos em todas as queries
const barbershopSelect = {
  id: true,
  name: true,
  address: true,
  phone: true,
  description: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class BarbershopService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(data: CreateBarbershopDto): Promise<Barbershop> {
    return this.prisma.barbershop.create({ data });
  }

  async findAll(): Promise<Barbershop[]> {
    return this.prisma.barbershop.findMany({ select: barbershopSelect });
  }

  async findOne(
    barbershopWhereUniqueInput: Prisma.BarbershopWhereUniqueInput,
  ): Promise<Barbershop | null> {
    // retorna o usuario encontrado ou null
    return this.prisma.barbershop.findUnique({
      where: barbershopWhereUniqueInput,
      select: barbershopSelect,
    });
  }

  async update(params: {
    where: Prisma.BarbershopWhereUniqueInput;
    data: UpdateBarbershopDto;
  }): Promise<Barbershop> {
    return this.prisma.barbershop.update({
      where: params.where,
      data: params.data,
    });
  }

  async remove(where: Prisma.BarbershopWhereUniqueInput): Promise<Barbershop> {
    return this.prisma.barbershop.delete({ where });
  }
}
