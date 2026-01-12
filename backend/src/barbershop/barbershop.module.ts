import { Module } from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import { BarbershopController } from './barbershop.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BarbershopController],
  providers: [BarbershopService],
  exports: [BarbershopService],
})
export class BarbershopModule {}
