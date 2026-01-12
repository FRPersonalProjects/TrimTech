import { Module } from '@nestjs/common';
import { BarbershopServiceService } from './barbershop-service.service';
import { BarbershopServiceController } from './barbershop-service.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BarbershopServiceController],
  providers: [BarbershopServiceService],
})
export class BarbershopServiceModule {}
