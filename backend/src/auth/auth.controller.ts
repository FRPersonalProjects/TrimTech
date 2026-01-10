import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma/client';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  // responsavel pelo gerenciamento das rotas de autenticacao

  /*
    signIn()
    signUp()
    */

  // metodo para login
  @Post('signin') // rota para login - auth/signin
  @HttpCode(HttpStatus.OK) // definindo codigo de status 200 para o login
  async signIn(@Body() body: Prisma.UserCreateInput) {
    // rota para login - auth/signin // qual o tipo do body? // Prisma.UserCreateInput

    return this.authService.signIn(body);
    // maria ss22
  }
}
