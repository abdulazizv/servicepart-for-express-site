import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrencyTypeDto } from './create-currency_type.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCurrencyTypeDto extends PartialType(CreateCurrencyTypeDto) {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
