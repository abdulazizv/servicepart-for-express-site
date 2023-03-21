import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException(
        'Not authorized, Your account is not verified',
      );
    }

    try {
      const decodedToken = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY,
      });
      if (
        decodedToken.is_creator === false ||
        decodedToken.is_active === false
      ) {
        throw new UnauthorizedException('This methods only for creator');
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, error.status);
    }
  }
}
