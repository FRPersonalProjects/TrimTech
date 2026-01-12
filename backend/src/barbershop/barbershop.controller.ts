import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';

@Controller('barbershops')
export class BarbershopController {
  constructor(private readonly barbershopService: BarbershopService) {}

  /* @Post()
  create(@Body() createBarbershopDto: CreateBarbershopDto) {
    return this.barbershopService.create(createBarbershopDto);
  } */

  @Get()
  async findAll() {
    return this.barbershopService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const barbershop = await this.barbershopService.findOne({ id });
    if (!barbershop) throw new NotFoundException('Barbershop not found');
    return barbershop;
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBarbershopDto: UpdateBarbershopDto,
  ) {
    return this.barbershopService.update(+id, updateBarbershopDto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barbershopService.remove(+id);
  } */
}
