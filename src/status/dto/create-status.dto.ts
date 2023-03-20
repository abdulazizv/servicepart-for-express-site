import { IsString } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
}
