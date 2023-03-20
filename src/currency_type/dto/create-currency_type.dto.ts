import { IsOptional, IsString } from 'class-validator';

export class CreateCurrencyTypeDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
