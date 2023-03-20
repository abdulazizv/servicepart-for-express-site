import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports:[AdminModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
