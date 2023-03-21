import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../admin/entities/admin.entity';
import { LoginAuthDto } from './dto/login.auth.dto';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto, res: Response) {
    const { user_name, password } = createAuthDto;
    const hashPassword = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminService.signup(user_name, hashPassword);
    const tokens = await this.generateToken(newAdmin);
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async signIn(loginAuthDto: LoginAuthDto, res: Response) {
    const { user_name, password } = loginAuthDto;
    const data = await this.adminService.getWithUsername(user_name);
    if (!data) {
      throw new HttpException(
        'Username is not correct',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const isDiffer = await bcrypt.compare(data.hashed_password, password);
    if (isDiffer) {
      const tokens = await this.generateToken(data);
      res.cookie('refresh_token', tokens.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return tokens;
    } else {
      throw new HttpException(
        'Password not matched',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  async refreshToken(refresh_token: string, res: Response) {
    try {
      const data = await this.verifyRefreshToken(refresh_token);
      const check = await this.adminService.findOne(data.sub);
      if (check) {
        const tokens = await this.generateToken(check);
        res.cookie('refresh_token', tokens.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return tokens;
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException('Unhandled Error', HttpStatus.BAD_GATEWAY);
    }
  }
  private async generateToken(admin: Admin) {
    const payload = {
      username: admin.user_name,
      id: admin.id,
      is_active: true,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async verifyRefreshToken(refresh_token: string) {
    const nToken = await this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });
    if (!nToken.is_active) {
      throw new UnauthorizedException('Error has been detected during verify');
    }
    return nToken;
  }
}
