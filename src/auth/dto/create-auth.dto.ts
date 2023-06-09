import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  readonly user_name: string;
  @IsString()
  readonly password: string;
}
