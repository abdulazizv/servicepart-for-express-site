import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../admin/entities/admin.entity';
import { LoginAuthDto } from './dto/login.auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { user_name, password } = createAuthDto;
    const hashPassword = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminService.signup(user_name, hashPassword);
    const tokens = await this.generateToken(newAdmin);
    return tokens;
  }

  async signIn(loginAuthDto: LoginAuthDto) {
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
      return { tokens };
    } else {
      throw new HttpException(
        'Password not matched',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  private async generateToken(admin: Admin) {
    const payload = { email: admin.user_name, id: admin.id };
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
}
