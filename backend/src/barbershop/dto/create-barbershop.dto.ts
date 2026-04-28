import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBarbershopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @IsString({ each: true })
  phone: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  imageUrl: string;
}
