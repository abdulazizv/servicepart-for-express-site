import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsString()
  full_name: string;
  @IsOptional()
  @IsString()
  phone_number: string;
  @IsOptional()
  @IsString()
  product_link: string;
  @IsOptional()
  @IsNumber()
  summa: number;

  @IsOptional()
  @IsNumber()
  currency_type_id: number;

  @IsOptional()
  @IsString()
  description: string;
}
