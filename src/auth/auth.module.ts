import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from "../admin/admin.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports:[AdminModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
