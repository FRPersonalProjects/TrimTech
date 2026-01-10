import 'dotenv/config'; // carregar variaveis de ambiente do .env antes de tudo
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from 'src/database/database.module';

// console.log(process.env.SECRET_KEY);

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      // importar modulos para o servico de autenticacao
      global: true, // tornar o modulo global
      secret: process.env.SECRET_KEY, // chave secreta para assinar o token
      signOptions: { expiresIn: '3800s' }, // tempo de expiracao do token de pouco mais de 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard], // registrar tambem guardiao como provedor
  exports: [AuthGuard, AuthService], // exportar para uso em outros modulos
})
export class AuthModule {}
