import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusDto } from './create-status.dto';
import { IsString } from 'class-validator';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
}
