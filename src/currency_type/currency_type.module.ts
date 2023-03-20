import { Module } from '@nestjs/common';
import { CurrencyTypeService } from './currency_type.service';
import { CurrencyTypeController } from './currency_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CurrencyType } from './entities/currency_type.entity';

@Module({
  imports: [SequelizeModule.forFeature([CurrencyType])],
  controllers: [CurrencyTypeController],
  providers: [CurrencyTypeService],
})
export class CurrencyTypeModule {}
