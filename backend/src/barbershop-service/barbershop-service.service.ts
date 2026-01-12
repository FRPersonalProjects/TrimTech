import { Inject, Injectable } from '@nestjs/common';
import { CreateBarbershopServiceDto } from './dto/create-barbershop-service.dto';
import { UpdateBarbershopServiceDto } from './dto/update-barbershop-service.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BarbershopService, Prisma } from 'generated/prisma/client';

@Injectable()
export class BarbershopServiceService {
  @Inject()
  private readonly prisma: PrismaService;

  /* create(createBarbershopServiceDto: CreateBarbershopServiceDto) {
    return 'This action adds a new barbershopService';
  } */

  async findAll(): Promise<BarbershopService[]> {
    return this.prisma.barbershopService.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        barbershopId: true,
      },
    });
  }

  async findOne(
    barbershopServiceWhereUniqueInput: Prisma.BarbershopServiceWhereUniqueInput,
  ): Promise<BarbershopService | null> {
    // retorna o usuario encontrado ou null
    return this.prisma.barbershopService.findUnique({
      where: barbershopServiceWhereUniqueInput, // id da barbearia
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        barbershopId: true,
      },
    });
  }

  /* update(id: number, updateBarbershopServiceDto: UpdateBarbershopServiceDto) {
    return `This action updates a #${id} barbershopService`;
  } */

  /* remove(id: number) {
    return `This action removes a #${id} barbershopService`;
  } */
}
