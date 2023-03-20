import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Operation } from './entities/operation.entity';

@Module({
  imports: [SequelizeModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
