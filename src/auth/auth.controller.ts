import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login.auth.dto';

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
}
