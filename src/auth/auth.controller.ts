import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login.auth.dto';
import { cookieGetterAdmin } from '../common/decorators/getterCookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    return this.authService.register(createAuthDto, res);
  }

  @Post('signin')
  signIn(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
    return this.authService.signIn(loginAuthDto, res);
  }
  @Post('refreshtoken')
  refreshToken(
    @cookieGetterAdmin() refreshToken: string,
    @Res() res: Response,
  ) {
    return this.authService.refreshToken(refreshToken, res);
  }
}
