import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Booking, Prisma } from 'generated/prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

// inclui servico e barbearia junto, util pra mostrar na tela de agendamentos
const bookingInclude = {
  service: {
    include: { barbershop: true },
  },
};

@Injectable()
export class BookingService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(userId: string, data: CreateBookingDto): Promise<Booking> {
    return this.prisma.booking.create({
      data: {
        userId,
        serviceId: data.serviceId,
        date: new Date(data.date),
      },
      include: bookingInclude,
    });
  }

  // retorna todos os agendamentos do usuario autenticado
  async findAllByUser(userId: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: { userId },
      include: bookingInclude,
      orderBy: { date: 'asc' },
    });
  }

  async findOne(where: Prisma.BookingWhereUniqueInput): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where,
      include: bookingInclude,
    });
  }

  async update(params: {
    where: Prisma.BookingWhereUniqueInput;
    data: UpdateBookingDto;
  }): Promise<Booking> {
    const updateData: Prisma.BookingUpdateInput = {};
    if (params.data.serviceId) updateData.service = { connect: { id: params.data.serviceId } };
    if (params.data.date) updateData.date = new Date(params.data.date);

    return this.prisma.booking.update({
      where: params.where,
      data: updateData,
      include: bookingInclude,
    });
  }

  async remove(where: Prisma.BookingWhereUniqueInput): Promise<Booking> {
    return this.prisma.booking.delete({ where });
  }
}
