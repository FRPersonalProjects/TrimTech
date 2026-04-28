import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateBarbershopServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsDecimal()
  price: string; // decimal vem como string no body

  @IsUUID()
  barbershopId: string;
}
