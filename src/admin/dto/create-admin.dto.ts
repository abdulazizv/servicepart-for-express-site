import { IsBoolean, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  readonly full_name: string;
  @IsString()
  readonly user_name: string;
  @IsString()
  readonly hashed_password: string;
  @IsString()
  readonly phone_number: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly tg_link: string;
  @IsString()
  readonly hashed_token: string;
  @IsBoolean()
  readonly is_active: boolean;
  @IsString()
  readonly description: string;
}
