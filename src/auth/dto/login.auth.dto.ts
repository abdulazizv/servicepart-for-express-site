import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  readonly user_name: string;
  @IsString()
  readonly password: string;
}