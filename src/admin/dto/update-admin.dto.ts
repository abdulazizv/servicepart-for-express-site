import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsOptional()
  @IsString()
  readonly full_name: string;
  @IsOptional()
  @IsString()
  readonly user_name: string;
  @IsOptional()
  @IsString()
  readonly hashed_password: string;
  @IsOptional()
  @IsString()
  readonly phone_number: string;
  @IsOptional()
  @IsString()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly tg_link: string;
  @IsOptional()
  @IsString()
  readonly hashed_token: string;
  @IsOptional()
  @IsString()
  readonly is_active: boolean;
  @IsOptional()
  @IsString()
  readonly description: string;
}
