import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { BarbershopModule } from './barbershop/barbershop.module';
import { BarbershopServiceModule } from './barbershop-service/barbershop-service.module';

@Module({
  imports: [
    AuthModule,
    BarbershopModule,
    UserModule,
    BarbershopServiceModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
