import { Inject, Injectable } from '@nestjs/common';
import { CreateBarbershopServiceDto } from './dto/create-barbershop-service.dto';
import { UpdateBarbershopServiceDto } from './dto/update-barbershop-service.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BarbershopService, Prisma } from 'generated/prisma/client';

const serviceSelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  price: true,
  barbershopId: true,
};

@Injectable()
export class BarbershopServiceService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(data: CreateBarbershopServiceDto): Promise<BarbershopService> {
    return this.prisma.barbershopService.create({ data });
  }

  async findAll(): Promise<BarbershopService[]> {
    return this.prisma.barbershopService.findMany({ select: serviceSelect });
  }

  async findOne(
    barbershopServiceWhereUniqueInput: Prisma.BarbershopServiceWhereUniqueInput,
  ): Promise<BarbershopService | null> {
    // retorna o usuario encontrado ou null
    return this.prisma.barbershopService.findUnique({
      where: barbershopServiceWhereUniqueInput,
      select: serviceSelect,
    });
  }

  async update(params: {
    where: Prisma.BarbershopServiceWhereUniqueInput;
    data: UpdateBarbershopServiceDto;
  }): Promise<BarbershopService> {
    return this.prisma.barbershopService.update({
      where: params.where,
      data: params.data,
    });
  }

  async remove(
    where: Prisma.BarbershopServiceWhereUniqueInput,
  ): Promise<BarbershopService> {
    return this.prisma.barbershopService.delete({ where });
  }
}
