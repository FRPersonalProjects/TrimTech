import { Inject, Injectable } from '@nestjs/common';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Barbershop } from 'generated/prisma/client';

@Injectable()
export class BarbershopService {
  @Inject()
  private readonly prisma: PrismaService;
  /* create(createBarbershopDto: CreateBarbershopDto) {
    return 'This action adds a new barbershop';
  } */

  async findAll(): Promise<Barbershop[]> {
    return this.prisma.barbershop.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(
    barbershopWhereUniqueInput: Prisma.BarbershopWhereUniqueInput,
  ): Promise<Barbershop | null> {
    // retorna o usuario encontrado ou null
    return this.prisma.barbershop.findUnique({
      where: barbershopWhereUniqueInput, // id da barbearia
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /* update(id: number, updateBarbershopDto: UpdateBarbershopDto) {
    return `This action updates a #${id} barbershop`;
  } */

  /* remove(id: number) {
    return `This action removes a #${id} barbershop`;
  } */
}
