import { IsDateString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  serviceId: string;

  @IsDateString()
  date: string; // iso 8601 ex: "2026-07-10T14:00:00Z"
}
