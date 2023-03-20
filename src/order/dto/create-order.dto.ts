import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  full_name: string;
  @IsString()
  phone_number: string;
  @IsString()
  product_link: string;

  @IsNumber()
  summa: number;

  @IsNumber()
  currency_type_id: number;

  @IsString()
  description: string;
}
