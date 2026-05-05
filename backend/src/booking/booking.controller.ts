import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Req() req, @Body() createBookingDto: CreateBookingDto) {
    // pega o user do jwt, injetado pelo guard global
    return this.bookingService.create(req.user.id, createBookingDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.bookingService.findAllByUser(req.user.id);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    const booking = await this.bookingService.findOne({ id });
    if (!booking) throw new NotFoundException('Booking not found');
    // nao deixa ver agendamento de outro usuario
    if (booking.userId !== req.user.id) throw new ForbiddenException();
    return booking;
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const booking = await this.bookingService.findOne({ id });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId !== req.user.id) throw new ForbiddenException();

    return this.bookingService.update({ where: { id }, data: updateBookingDto });
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const booking = await this.bookingService.findOne({ id });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId !== req.user.id) throw new ForbiddenException();

    return this.bookingService.remove({ id });
  }
}
